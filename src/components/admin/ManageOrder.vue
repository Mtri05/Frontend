<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const orders = ref([])

const token = localStorage.getItem('token')

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/admin/order', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    orders.value = response.data
  } catch (err) {
    console.error(err)
    document.getElementById('error-message').style.display = 'block'
  }
})

const formatDateVN = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const updateStatus = async (item) => {
  try {
    await axios.post(
      `http://localhost:8080/api/admin/order/update-status/${item.orderId}`,
      {
        status: item.status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    alert('Cập nhật trạng thái thành công!')
  } catch (err) {
    console.error(err)
    alert('Cập nhật thất bại!')
  }
}
// mau cho trang thai
const getStatusClass = (status) => {
  switch (status) {
    case 0:
      return 'text-secondary'
    case 1:
      return 'text-primary'
    case 2:
      return 'text-warning'
    case 3:
      return 'text-success'
    case 4:
      return 'text-danger'
    default:
      return ''
  }
}

const formatAddress = (address) => {
  if (!address) return ''
  const parts = address.split(',')
  // Bỏ phần cuối cùng nếu có ít nhất 2 phần (ví dụ: tên, số điện thoại)
  if (parts.length > 2) {
    return parts
      .slice(0, parts.length - 2)
      .join(',')
      .trim()
  }
  return address.trim()
}
const selectedStatus = ref('') // Mặc định không lọc

const filteredOrders = computed(() => {
  if (selectedStatus.value === '') return orders.value
  return orders.value.filter(order => order.status === parseInt(selectedStatus.value))
})

</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center">DANH SÁCH ĐƠN HÀNG</h2>
    <hr />
    <div class="alert alert-danger" style="display: none" id="error-message"></div>
    <div class="mb-3">
  <label for="statusFilter" class="form-label">Lọc theo trạng thái:</label>
  <select v-model="selectedStatus" id="statusFilter" class="form-select" style="width: 200px;">
    <option value="">Tất cả</option>
    <option value="0">Chưa duyệt</option>
    <option value="1">Đã duyệt</option>
    <option value="2">Đang giao</option>
    <option value="3">Giao thành công</option>
    <option value="4">Hủy đơn</option>
  </select>
</div>

    <div class="table-responsive">
      <!-- Bảng danh sách đơn hàng -->
      <table id="orderTable" class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Tổng tiền</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in filteredOrders" :key="item.orderId">
            <td>{{ item.orderId }}</td>
            <td>{{ item.customerName }}</td>
            <td>{{ item.phone }}</td>
            <td>
              <select
                v-model="item.status"
                @change="updateStatus(item)"
                class="form-select"
                :class="`select-status-${item.status}`"
              >
                <option :value="0">Chưa duyệt</option>
                <option :value="1">Đã duyệt</option>
                <option :value="2">Đang giao</option>
                <option :value="3">Giao thành công</option>
                <option :value="4">Hủy đơn</option>
              </select>
            </td>
            <td>{{ formatDateVN(item.orderDate) }}</td>
            <td>{{ item.totalAmount.toLocaleString() }} VND</td>
            <td>{{ formatAddress(item.address) }}</td>
            <td>
              <a
                :href="`/admin/order/detail?orderId=${item.orderId}`"
                class="btn btn-primary btn-sm"
                >Chi tiết</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
@media (max-width: 768px) {
  #orderTable td img {
    width: 40px;
    height: 40px;
  }

  #orderTable td,
  #orderTable th {
    font-size: 14px;
  }
}
.select-status-0 {
  background-color: #dee2e6;
}

.select-status-1 {
  background-color: #cfe2ff;
}

.select-status-2 {
  background-color: #fff3cd;
}
.select-status-3 {
  background-color: #d1e7dd;
}
.select-status-4 {
  background-color: #f8d7da;
}
</style>
