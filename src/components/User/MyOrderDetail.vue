<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import ReviewForm from './form/ReviewForm.vue'
const selectedDetail = ref(null)
const showReview = ref(false)
const route = useRoute()
const orderId = ref(route.query.orderId)
const orderDetail = ref({})
const loading = ref(true)

const formatPrice = (value) => {
  return (
    new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
    }).format(value) + ' VND'
  )
}
const openReviewModal = (detail) => {
  selectedDetail.value = detail
  showReview.value = true
}

const handleReviewSubmitted = (id) => {
  const found = orderDetail.value.items.find((i) => i.orderDetailId === id)
  if (found) found.hasReviewed = true
  showReview.value = false
}

const handleCloseReview = () => {
  showReview.value = false
}

onMounted(async () => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/user/order/detail?orderId=${orderId.value}`,
    )
    console.log('Order detail response:', res.data)
    orderDetail.value = res.data
  } catch (error) {
    console.error('Lỗi khi tải chi tiết đơn hàng:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container-fluid p-4" v-if="!loading">
    <h2 class="text-center mb-4">CHI TIẾT ĐƠN HÀNG</h2>

    <div class="card p-3 mb-4 shadow">
      <h5>Thông tin đơn hàng</h5>
      <p><strong>ID Đơn Hàng:</strong> {{ orderDetail.orderId }}</p>
      <p><strong>Khách Hàng:</strong> {{ orderDetail.fullName }}</p>
      <p><strong>Ngày Tạo:</strong> {{ new Date(orderDetail.orderDate).toLocaleString() }}</p>
      <p><strong>Địa chỉ:</strong> {{ orderDetail.address }}</p>
      <p>
        <strong>Trạng Thái:</strong>
        <span v-if="orderDetail.status === 0">Chưa duyệt</span>
        <span v-else-if="orderDetail.status === 1">Đã duyệt</span>
        <span v-else-if="orderDetail.status === 2">Đang giao</span>
        <span v-else-if="orderDetail.status === 3">Giao thành công</span>
        <span v-else-if="orderDetail.status === 4">Đã hủy</span>
        <span v-else>Không xác định</span>
      </p>
    </div>

    <h5 class="mb-3">Danh Sách Sản Phẩm</h5>
    <table
      class="table table-striped table-bordered table-hover"
      v-if="orderDetail.items && orderDetail.items.length"
    >
      <thead class="table-dark">
        <tr>
          <th>Tên Sản Phẩm</th>
          <th>Giá</th>
          <th>Số Lượng</th>
          <th>Kích Cỡ</th>
          <th>Thành tiền</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(detail, index) in orderDetail.items" :key="index">
          <td>{{ detail.productName }}</td>
          <td>{{ formatPrice(detail.price) }}</td>
          <td>{{ detail.quantity }}</td>
          <td>{{ detail.size }}</td>
          <td>{{ formatPrice(detail.price * detail.quantity) }}</td>
          <td>
            <button
              v-if="orderDetail.status === 3 && !detail.hasReviewed"
              class="review-btn"
              @click="openReviewModal(detail)"
            >
              Đánh giá
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-warning">Không có sản phẩm nào trong đơn hàng này.</div>

    <a href="/user/order/history" class="btn btn-primary mt-3">Quay Lại</a>
    <ReviewForm
      v-if="showReview"
      :show="showReview"
      :orderDetail="selectedDetail"
      @close="handleCloseReview"
      @submitted="handleReviewSubmitted"
    />
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  table td,
  table th {
    font-size: 14px;
  }
}
.review-btn {
  padding: 6px 12px;
  background-color: transparent;
  border: 1px solid #28a745;
  color: #28a745;
  border-radius: 4px;
  cursor: pointer;
}
.review-btn:hover {
  background-color: #28a745;
  color: white;
}
</style>
