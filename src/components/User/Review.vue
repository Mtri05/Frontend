<template>
  <div class="container mt-5">
    <!-- Tiêu đề -->
    <div class="text-center mb-4">
      <h2>Giày Sneaker XYZ</h2>
      <p class="text-muted">Đánh giá và nhận xét từ khách hàng</p>
    </div>

    <!-- Trung bình sao -->
    <div class="text-center mb-4">
      <h4>Đánh giá trung bình:</h4>
      <div class="d-flex justify-content-center align-items-center mb-2 rating-stars">
        <span
          v-for="n in 5"
          :key="n"
          :class="['star', n <= Math.round(averageRating) ? 'text-warning' : 'text-secondary']"
        >
          ★
        </span>
        <span class="ms-2 fw-bold">{{ averageRating }}/5</span>
      </div>
      <div>
        <small class="text-muted">({{ reviews.length }} đánh giá)</small>
      </div>
    </div>

    <!-- Danh sách đánh giá -->
    <h5 class="mb-3">Đánh giá gần đây</h5>

    <div v-for="(review, index) in limitedReviews" :key="review.id" class="card card-review mb-3">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <strong>{{ review.userName }}</strong>
          <small class="text-muted">{{ formatDate(review.reviewDate) }}</small>
        </div>
        <div class="rating-stars mt-1 mb-2">
          <span
            v-for="n in 5"
            :key="n"
            :class="['star', n <= review.rating ? 'text-warning' : 'text-secondary']"
          >
            ★
          </span>
        </div>

        <p>
          {{ review.comment.length > 100 ? review.comment.substring(0, 100) + '...' : review.comment }}
        </p>

        <button v-if="review.comment.length > 100" @click="toggleReview(index)" class="btn btn-link p-0">
          {{ review.isExpanded ? 'Thu gọn' : 'Xem thêm' }}
        </button>

        <p v-if="review.isExpanded">{{ review.comment }}</p>
      </div>
    </div>

    <!-- Nút điều khiển hiển thị -->
    <div class="text-center" v-if="reviews.length > 3">
      <button
        class="btn btn-outline-primary me-2"
        v-if="visibleCount < reviews.length"
        @click="visibleCount = reviews.length"
      >
        Xem thêm đánh giá
      </button>

      <button
        class="btn btn-outline-secondary"
        v-if="visibleCount >= reviews.length"
        @click="visibleCount = 3"
      >
        Ẩn bớt đánh giá
      </button>
    </div>
  </div>
</template>

<script>
import { getReviewsByProduct, createReview } from '@/assets/js/reviewAPI'

export default {
  props: {
    productId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      reviews: [],
      newReview: {
        rating: null,
        comment: '',
      },
      hoverRating: 0,
      averageRating: 0,
      hasPurchased: false,
      canReview: false,
      orderDetailId: null,
      visibleCount: 3,
    }
  },
  computed: {
    limitedReviews() {
      return this.reviews.slice(0, this.visibleCount)
    },
  },
  created() {
    this.fetchReviews()
    this.checkIfPurchased()
  },
  methods: {
    async fetchReviews() {
      try {
        const response = await getReviewsByProduct(this.productId)
        this.reviews = response.data.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate))
        this.reviews.forEach(r => r.isExpanded = false)
        this.calculateAverageRating()
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    },

    async checkIfPurchased() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/reviews/checkUser/${this.userId}/checkProduct/${this.productId}`
        )
        const data = await res.json()

        if (data.hasPurchased && !data.hasReviewed) {
          this.canReview = true
          this.orderDetailId = data.orderDetailId
        } else {
          this.canReview = false
        }
      } catch (error) {
        console.error('Lỗi kiểm tra đơn hàng:', error)
        this.canReview = false
      }
    },

    calculateAverageRating() {
      if (this.reviews.length === 0) return
      const total = this.reviews.reduce((sum, r) => sum + r.rating, 0)
      this.averageRating = (total / this.reviews.length).toFixed(1)
    },

    async submitReview() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/reviews/checkUser/${this.userId}/checkProduct/${this.productId}`
        )
        if (!res.ok) throw new Error('Không thể kiểm tra đơn hàng.')

        const data = await res.json()
        if (data.hasPurchased) {
          const orderDetailId = data.orderDetailId

          const reviewData = {
            orderDetailId,
            rating: this.newReview.rating,
            comment: this.newReview.comment,
          }

          console.log('Đánh giá mới:', reviewData)
          await createReview(reviewData)
          await this.fetchReviews()

          this.newReview = { rating: null, comment: '' }
          alert('Gửi đánh giá thành công!')
        } else {
          alert('Bạn chưa mua sản phẩm này để có thể đánh giá.')
        }
      } catch (err) {
        console.error(err)
        alert('Không thể gửi đánh giá. Có thể bạn chưa mua sản phẩm này.')
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },

    toggleReview(index) {
      this.reviews[index].isExpanded = !this.reviews[index].isExpanded
    },
  },
}
</script>

<style scoped>
.rating-stars .star {
  font-size: 1.4rem;
  margin-right: 3px;
  transition: color 0.3s ease;
}

button {
  cursor: pointer;
  color: #007bff;
}

/* button:hover {
  text-decoration: underline;
} */
</style>
