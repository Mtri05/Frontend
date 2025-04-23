<script>
import axios from 'axios'

const token = localStorage.getItem('token')
export default {
  data() {
    return {
      orders: [],
    }
  },
  methods: {
    // Lấy userId từ cookie
    getCookie(name) {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop().split(';').shift()
      return null
    },

    // Lấy danh sách đơn hàng từ server
    loadOrders() {
      const userId = this.getCookie('userId')
      if (!userId) {
        alert('Bạn chưa đăng nhập!')
        return
      }

      axios
        .get(`http://localhost:8080/api/user/order/list?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        })

        .then((res) => {
          this.orders = res.data
        })
        .catch((err) => {
          console.error('Lỗi khi lấy đơn hàng:', err)
        })
    },

    formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN').format(amount) + ' VND'
    },

    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleString('vi-VN')
    },

    getStatusText(status) {
      switch (status) {
        case 0:
          return { text: 'Chưa duyệt', class: 'text-warning' }
        case 1:
          return { text: 'Đã duyệt', class: 'text-primary' }
        case 2:
          return { text: 'Đang giao', class: 'text-info' }
        case 3:
          return { text: 'Giao thành công', class: 'text-success' }
        case 4:
          return { text: 'Đã hủy', class: 'text-danger' }
        default:
          return { text: 'Không xác định', class: 'text-secondary' }
      }
    },

    confirmCancel(orderId) {
      if (confirm('Bạn có chắc muốn hủy đơn hàng này không?')) {
        axios
          .post(
            `http://localhost:8080/api/user/order/update-status/${orderId}`,
            {
              status: 4,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(() => {
            this.loadOrders()
          })
          .catch((err) => {
            console.error('Lỗi khi hủy đơn hàng:', err)
          })
      }
    },
  },

  mounted() {
    this.loadOrders()
  },
}
</script>

<template>
  <div class="container mt-3">
    <h2 class="text-center">Lịch Sử Đơn Hàng</h2>
    <table id="orderHistoryTable" class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>STT</th>
          <th>Ngày đặt</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Chi tiết</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order.orderId">
          <td>{{ index + 1 }}</td>
          <td>{{ formatDate(order.orderDate) }}</td>
          <td class="text-danger">{{ formatCurrency(order.totalAmount) }}</td>
          <td :class="getStatusText(order.status).class">
            {{ getStatusText(order.status).text }}
          </td>
          <td>
            <a :href="`/user/order/details?orderId=${order.orderId}`" class="btn btn-primary btn-sm me-2"
              >Xem</a
            >
            <button
              v-if="order.status === 0"
              @click="confirmCancel(order.orderId)"
              class="btn btn-danger btn-sm"
            >
              Hủy đơn hàng
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
}
</style>
