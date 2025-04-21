<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = ref(route.query.orderId)
const orderDetail = ref({})
const loading = ref(true)

const showReview = ref(false)
const currentItem = ref({})
const reviewComment = ref('')
const reviewRating = ref(5)

const token = localStorage.getItem('token')

// Hàm mở modal để đánh giá
const openReviewModal = (item) => {
  currentItem.value = item
  showReview.value = true
}
const checkReviewStatus = async (orderDetailId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/user/reviews/checkReview/${orderDetailId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    console.log('hasReviewed from API:', response.data.hasReviewed)
    return response.data.hasReviewed
  } catch (error) {
    console.error('Lỗi khi kiểm tra đánh giá:', error)
    return false
  }
}

// Lấy chi tiết đơn hàng khi component được tải
onMounted(async () => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/user/order/detail?orderId=${orderId.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    orderDetail.value = res.data

    if (orderDetail.value.status === 3) {
      const checks = await Promise.all(
        orderDetail.value.items.map(async (item) => {
          const hasReviewed = await checkReviewStatus(item.orderDetailId)
          return {
            ...item,
            hasReviewed,  // Đảm bảo cập nhật chính xác giá trị hasReviewed
          }
        }),
      )
      orderDetail.value.items = checks  // Cập nhật lại danh sách items
    }
  } catch (error) {
    console.error('Lỗi khi tải chi tiết đơn hàng:', error)
  } finally {
    loading.value = false
  }
})


// Hàm gửi đánh giá
const submitReview = async () => {
  try {
    await axios.post(
      `http://localhost:8080/api/user/reviews`,
      {
        orderDetailId: currentItem.value.id,
        productId: currentItem.value.productId,
        rating: reviewRating.value,
        comment: reviewComment.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    currentItem.value.hasReviewed = true // Đánh dấu sản phẩm đã được đánh giá
    showReview.value = false
    alert('Đánh giá thành công!')
  } catch (error) {
    console.error('Lỗi khi gửi đánh giá:', error)
    alert('Đánh giá thất bại!')
  }
}

// Định dạng giá
const formatPrice = (value) => {
  return (
    new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
    }).format(value) + ' VND'
  )
}

// Định dạng ngày
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
</script>

<template>
  <div class="container-fluid p-4" v-if="!loading">
    <h2 class="text-center mb-4">CHI TIẾT ĐƠN HÀNG</h2>

    <div class="card p-3 mb-4 shadow">
      <h5>Thông tin đơn hàng</h5>
      <p><strong>ID Đơn Hàng:</strong> {{ orderDetail.orderId }}</p>
      <p><strong>Khách Hàng:</strong> {{ orderDetail.fullName }}</p>
      <p><strong>Ngày Tạo:</strong> {{ formatDateVN(orderDetail.orderDate) }}</p>
      <p><strong>Địa chỉ:</strong> {{ orderDetail.address }}</p>
      <p>
        <strong>Trạng Thái: </strong>
        <span v-if="orderDetail.status === 0">Chưa duyệt</span>
        <span v-else-if="orderDetail.status === 1">Đã duyệt</span>
        <span v-else-if="orderDetail.status === 2">Đang giao</span>
        <span v-else-if="orderDetail.status === 3">Giao thành công</span>
        <span v-else-if="orderDetail.status === 4">Đã hủy</span>
        <span v-else>Không xác định</span>
      </p>
      <p><strong>Tổng tiền: </strong> {{ formatPrice(orderDetail.totalAmount) }}</p>
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
          <th>Đánh giá</th>
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
              v-if="!detail.hasReviewed"
              class="btn btn-sm btn-outline-primary"
              @click="openReviewModal(detail)"
            >
              Đánh giá
            </button>

            <span v-else class="text-success">Đã đánh giá</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-warning">Không có sản phẩm nào trong đơn hàng này.</div>

    <a href="/user/order/history" class="btn btn-primary mt-3">Quay Lại</a>
  </div>

  <!-- Modal Đánh giá sản phẩm -->
  <div v-if="showReview" class="modal d-block" style="background: rgba(0, 0, 0, 0.5)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-3">
        <h5 class="mb-3">Đánh giá sản phẩm</h5>

        <div class="mb-2">
          <strong>Tên sản phẩm:</strong> {{ currentItem.productName }} <br />
          <strong>Giá:</strong> {{ formatPrice(currentItem.price) }} <br />
          <strong>Kích cỡ:</strong> {{ currentItem.size }}
        </div>

        <label class="form-label">Chọn số sao:</label>
        <div class="mb-3">
          <span
            v-for="star in 5"
            :key="star"
            @click="reviewRating = star"
            style="font-size: 24px; cursor: pointer"
          >
            <i
              class="bi"
              :class="reviewRating >= star ? 'bi-star-fill text-warning' : 'bi-star text-secondary'"
            ></i>
          </span>
        </div>

        <textarea
          v-model="reviewComment"
          placeholder="Viết nhận xét của bạn..."
          class="form-control mb-3"
          rows="3"
        ></textarea>

        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-success" @click="submitReview">Gửi đánh giá</button>
          <button class="btn btn-secondary" @click="showReview = false">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Các style tùy chỉnh cho modal */
.modal-content {
  max-width: 500px;
}
</style>
