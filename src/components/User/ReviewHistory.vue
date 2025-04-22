<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Lấy token và userId từ cookie
const token = localStorage.getItem('token')

// Helper function to get cookie value
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

// Lấy userId từ cookie
const userId = getCookie('userId') // Giả sử userId được lưu trong cookie dưới key 'userId'

// Khai báo biến để lưu dữ liệu đánh giá và lỗi
const reviews = ref([])
const errorMessage = ref('')

// Hàm gọi API để lấy lịch sử đánh giá
const fetchReviews = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/user/reviews', {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token trong header
      },
      params: {
        userId: userId, // Sử dụng userId lấy từ cookie
      },
    })
    reviews.value = response.data // Lưu dữ liệu đánh giá vào biến reviews
  } catch (error) {
    console.log(error)
    errorMessage.value = 'Lỗi khi tải lịch sử đánh giá' // Ghi nhận lỗi nếu có
  }
}

// Gọi API khi component được mount
onMounted(() => {
  fetchReviews()
})

// Hàm để định dạng ngày theo định dạng Việt Nam
const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long', // Hiển thị ngày trong tuần
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // Hiển thị theo định dạng 12 giờ (AM/PM)
    timeZone: 'Asia/Ho_Chi_Minh', // Cài đặt múi giờ Việt Nam
  }).format(new Date(date))
}

// Hàm để hiển thị icon sao theo rating
const renderStars = (rating) => {
  let stars = ''
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? '★' : '☆'
  }
  return stars
}
</script>

<template>
  <div class="container mt-3">
    <div class="d-flex align-items-center mb-4">
      <a href="/" class="text-decoration-none d-flex align-items-center">
        <i class="bi bi-house-fill text-dark me-2"></i>
      </a>
      <span class="mx-1 text-muted">|</span>
      <span class="text-dark">Trang Lịch Sử Đánh Giá</span>
    </div>

    <!-- Hiển thị thông báo lỗi nếu có -->
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <!-- Hiển thị lịch sử đánh giá nếu có -->
    <div v-if="reviews.length > 0">
      <div v-for="review in reviews" :key="review.id" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Đánh giá sản phẩm: {{ review.productName }}</h5>
          <p class="card-text">
            Đánh giá: <span class="stars">{{ renderStars(review.rating) }}</span> ({{
              review.rating
            }}
            sao)
          </p>
          <p class="card-text">Nhận xét: {{ review.comment }}</p>
          <p class="card-text">Size: {{ review.sizeName || 'Không có thông tin' }}</p>
          <!-- Hiển thị size nếu có -->
          <p class="card-text">
            <small class="text-muted">Ngày đánh giá: {{ formatDate(review.reviewDate) }}</small>
          </p>
        </div>
      </div>
    </div>

    <!-- Nếu không có lịch sử đánh giá -->
    <div v-else class="text-center">
      <p >Chưa có đánh giá nào.</p>
    </div>
  </div>
</template>

<style scoped>
/* .container {
  max-width: 900px;
  margin: auto;
} */

.card {
  background-color: #f8f9fa;
}

.card-title {
  font-size: 1.25rem;
}

.card-text {
  font-size: 1rem;
}

.alert {
  margin-top: 10px;
}

/* CSS để làm sao màu vàng cho ngôi sao */
.stars {
  color: #ffcc00; /* Màu vàng */
  font-size: 1.5rem; /* Điều chỉnh kích thước sao */
}
</style>
