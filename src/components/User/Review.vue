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
      <div class="d-flex justify-content-center align-items-center mb-2">
        <span class="star">{{ averageRating }}☆☆☆☆☆</span>
      </div>
      <div>
        <small class="text-muted">({{ reviews.length }} đánh giá)</small>
      </div>
    </div>

    <!-- Form đánh giá -->
    <div class="card mb-5" v-if="canReview">
      <div class="card-header bg-primary text-white">Gửi đánh giá của bạn</div>
      <div class="card-body">
        <form @submit.prevent="submitReview">
          <div class="mb-5">
            <!-- Star Rating Interactive -->
            <div class="rating-stars text-center mb-4">
              <span
                v-for="star in 5"
                :key="star"
                class="star"
                :class="{ hovered: star <= hoverRating, selected: star <= newReview.rating }"
                @mouseover="hoverRating = star"
                @mouseleave="hoverRating = 0"
                @click="newReview.rating = star"
              >
                ★
              </span>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Nhận xét</label>
            <textarea
              v-model="newReview.comment"
              class="form-control"
              rows="3"
              placeholder="Chia sẻ trải nghiệm của bạn..."
              required
            ></textarea>
          </div>

          <div class="text-end">
            <button type="submit" class="btn btn-success px-4">Gửi</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Danh sách đánh giá -->
    <h5 class="mb-3">Đánh giá gần đây</h5>

    <div v-for="review in reviews" :key="review.id" class="card card-review mb-3">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <strong>{{ review.userName }}</strong>
          <small class="text-muted">{{ review.reviewDate }}</small>
        </div>
        <div class="star mt-1 mb-2">
          {{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}
        </div>
        <p>{{ review.comment }}</p>
      </div>
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
      orderDetailId: null
    }
  },
  created() {
    this.fetchReviews(), this.checkIfPurchased()
  },
  methods: {
    async fetchReviews() {
      try {
        const response = await getReviewsByProduct(this.productId)
        this.reviews = response.data
        this.calculateAverageRating()
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    },

    async checkIfPurchased() {
  try {
    const res = await fetch(
      `http://localhost:8080/api/reviews/checkUser/${this.userId}/checkProduct/${this.productId}`
    );
    const data = await res.json();

    if (data.hasPurchased && !data.hasReviewed) {
      this.canReview = true;
      this.orderDetailId = data.orderDetailId;
    } else {
      this.canReview = false;
    }
  } catch (error) {
    console.error('Lỗi kiểm tra đơn hàng:', error);
    this.canReview = false;
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
          `http://localhost:8080/api/reviews/checkUser/${this.userId}/checkProduct/${this.productId}`,
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
    async getOrderDetailId() {
      const res = await fetch(`/api/orders/user/${this.userId}/product/${this.productId}`)
      if (!res.ok) throw new Error('Không tìm thấy đơn hàng')
      const data = await res.json()
      return data.orderDetailId
    },
  },
}
</script>
<style src="./src/assets/css/review.css"></style>
