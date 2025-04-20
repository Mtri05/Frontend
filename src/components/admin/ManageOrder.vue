<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

const orders = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/admin/order')
    orders.value = response.data
  } catch (err) {
    console.error(err)
    document.getElementById('error-message').style.display = 'block'
  }
})

const updateStatus = async (item) => {
  try {
    await axios.post(`http://localhost:8080/api/admin/order/update-status/${item.orderId}`, {
      status: item.status,
    })
    alert('Cập nhật trạng thái thành công!')
  } catch (err) {
    console.error(err)
    alert('Cập nhật thất bại!')
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
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center">DANH SÁCH ĐƠN HÀNG</h2>
    <hr />
    <div class="alert alert-danger" style="display: none" id="error-message"></div>
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
          <tr v-for="item in orders" :key="item.orderId">
            <td>{{ item.orderId }}</td>
            <td>{{ item.customerName }}</td>
            <td>{{ item.phone }}</td>
            <td>
              <select v-model="item.status" @change="updateStatus(item)">
                <option :value="0">Chưa duyệt</option>
                <option :value="1">Đã duyệt</option>
                <option :value="2">Đang giao</option>
                <option :value="3">Giao thành công</option>
                <option :value="4">Hủy đơn</option>
              </select>
            </td>
            <td>{{ item.orderDate }}</td>
            <td>{{ item.totalAmount.toLocaleString() }} VND</td>
            <td>{{ formatAddress(item.address) }}</td>
            <td>
              <a
                :href="`/admin/admin/order/detail?orderId=${item.orderId}`"
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
</style>
