<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = ref(route.query.orderId)
const orderDetail = ref({})
const loading = ref(true)


const token = localStorage.getItem('token');

const formatPrice = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
  }).format(value) + ' VND'
}

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


onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:8080/api/admin/order/detail?orderId=${orderId.value}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: true 
      },
    })
    console.log('Order detail response:', res.data) // Log dữ liệu để kiểm tra
    orderDetail.value = res.data
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container-fluid p-4" v-if="!loading">
    <h2 class="text-center">CHI TIẾT ĐƠN HÀNG</h2>
    <hr />
    <div class="card p-3 mb-4">
      <h5>Thông tin đơn hàng</h5>
      <p><strong>ID Đơn Hàng:</strong> {{ orderDetail.orderId }}</p>
      <p><strong>Khách Hàng:</strong> {{ orderDetail.fullName }}</p>
      <p><strong>Ngày Tạo:</strong> {{formatDateVN(orderDetail.orderDate) }}</p>
      <p><strong>Địa chỉ:</strong> {{ orderDetail.address }}</p>
      <p>
        <strong>Trạng Thái:</strong>
        <span v-if="orderDetail.status === 0">Chưa duyệt</span>
        <span v-else-if="orderDetail.status === 1">Đã duyệt</span>
        <span v-else-if="orderDetail.status === 2">Đang giao</span>
        <span v-else-if="orderDetail.status === 3">Giao thành công</span>
      </p>
    </div>

    <h5 class="mb-3">Danh Sách Sản Phẩm</h5>
    <table class="table table-striped table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>Tên Sản Phẩm</th>
          <th>Giá</th>
          <th>Số Lượng</th>
          <th>Kích Cỡ</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="detail in orderDetail.items" :key="detail.id">
          <td>{{ detail.productName }}</td>
          <td>{{ formatPrice(detail.price) }}</td>
          <td>{{ detail.quantity }}</td>
          <td>{{ detail.size }}</td>
          <td>{{ formatPrice(detail.price * detail.quantity) }}</td>
        </tr>
      </tbody>
    </table>

    <a href="/admin/order" class="btn btn-primary">Quay Lại</a>
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
