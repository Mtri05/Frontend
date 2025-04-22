<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const product = ref(null)
const selectedSize = ref(null)
const quantity = ref(1)

const reviews = ref([])

const fetchReviews = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/api/reviews/product/${product.value.id}`)
    reviews.value = res.data
  } catch (err) {
    console.log(err)
  }
}
const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const total = reviews.value.reduce((sum, r) => sum + r.rating, 0)
  return (total / reviews.value.length).toFixed(1)
})

const totalReviews = computed(() => reviews.value.length)

const showAllReviews = ref(false)

const displayedReviews = computed(() => {
  return showAllReviews.value ? reviews.value : reviews.value.slice(0, 3)
})

const getProductIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get('productId')
}

const changeMainImage = (imgName) => {
  const mainImage = document.getElementById('mainImage')
  if (mainImage) {
    mainImage.src = `http://localhost:8080/images/${imgName}`
  }
}

const openCartModal = () => {
  // Implement your modal opening logic here
  console.log('Opening cart modal for product:', product.value)
}

const changeQuantity = (delta) => {
  const newQuantity = quantity.value + delta
  if (newQuantity >= 1) {
    quantity.value = newQuantity
  } else {
    alert('Số lượng phải lớn hơn 0.')
  }
}

const userId = ref(null)

onMounted(async () => {
  const token = getCookie('userId')
  if (token) userId.value = parseInt(token)

  const productId = getProductIdFromUrl()
  if (productId) {
    try {
      const res = await axios.get(`http://localhost:8080/api/productne/${productId}`)
      product.value = res.data
      if (product.value.sizes?.length) {
        selectedSize.value = product.value.sizes[0]
      }
      await fetchReviews()
    } catch (err) {
      console.error('Error fetching product:', err)
    }
  }
})

const addToCart = async () => {
  const userId = getCookie('userId')
  if (!userId) {
    alert('Vui lòng đăng nhập để thêm vào giỏ hàng.')
    return
  }

  if (!selectedSize.value) {
    alert('Vui lòng chọn size trước khi thêm vào giỏ.')
    return
  }

  // 👉 Kiểm tra số lượng yêu cầu so với số lượng còn lại trong kho
  if (quantity.value > selectedSize.value.stock) {
    alert(
      `Số lượng bạn chọn vượt quá số lượng còn lại trong kho. Chỉ còn ${selectedSize.value.stock} sản phẩm.`,
    )
    return
  }

  if (quantity.value <= 0) {
    alert(`số lượng phải từ 1`)
    return
  }

  const cartId = userId // vì cartId = userId
  const productSizeId = selectedSize.value.id
  const qty = quantity.value
  const token = localStorage.getItem('token')

  try {
    const res = await axios.post(`http://localhost:8080/api/user/cart/add`, null, {
      params: {
        cartId,
        productSizeId,
        quantity: qty,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('Đã thêm vào giỏ:', res.data)
    alert('Đã thêm sản phẩm vào giỏ hàng!')
    openCartModal()
  } catch (err) {
    console.error('Lỗi khi thêm vào giỏ:', err)
    alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.')
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}
</script>

<template>
  <div class="container mt-3" v-if="product">
    <div class="row product-container">
      <div class="col-md-5 product-image text-center">
        <img
          :src="'http://localhost:8080/images/' + product.imageNames[0]"
          alt="Product Image"
          class="img-fluid main-image"
          id="mainImage"
        />
      </div>

      <div class="col-md-6 product-info">
        <h2>{{ product.name }}</h2>
        <p class="price text-danger">{{ product.price.toLocaleString() }} VND</p>
        <p class="text-dark">{{ product.description }}</p>
        <p class="text-muted">Bạn cần tìm size/màu khác? Liên hệ Bele ngay nhé!</p>

        <div class="mb-3">
          <label for="sizeSelect" class="form-label fw-semibold">Chọn size:</label>
          <select id="sizeSelect" v-model="selectedSize" class="form-select rounded-3">
            <option v-for="size in product.sizes" :key="size.id" :value="size">
              {{ size.sizeName }} (Còn lại: {{ size.stock }})
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Số lượng:</label>
          <div class="input-group">
            <button type="button" class="btn btn-outline-dark fw-bold" @click="changeQuantity(-1)">
              -
            </button>
            <input
              type="number"
              v-model="quantity"
              class="form-control text-center"
              min="1"
              :max="selectedSize?.stock || 1"
            />
            <button type="button" class="btn btn-outline-dark fw-bold" @click="changeQuantity(1)">
              +
            </button>
          </div>
        </div>

        <div class="d-flex justify-content-between">
          <button class="btn btn-dark btn-custom" @click="addToCart">🛒 Thêm vào giỏ hàng</button>

          <button class="btn btn-danger btn-custom">⚡ Mua ngay</button>
        </div>

        <br />
        <div v-if="totalReviews > 0" class="mb-3">
          <h6>
            ⭐ Đánh giá trung bình:
            <span class="text-warning fw-bold">{{ averageRating }}</span> / 5 ({{ totalReviews }}
            lượt đánh giá)
          </h6>
          <div>
            <span v-for="i in 5" :key="i">
              <i
                :class="
                  i <= Math.round(averageRating)
                    ? 'bi bi-star-fill text-warning'
                    : 'bi bi-star text-secondary'
                "
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <h4>Đánh giá sản phẩm</h4>
      <div v-if="reviews.length === 0">
        <p class="text-muted">Chưa có đánh giá nào cho sản phẩm này.</p>
      </div>
      <div v-else>
        <div v-for="(review, index) in displayedReviews" :key="review.id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ review.userName }}</h5>
            <p class="card-text">{{ review.comment }}</p>
            <p class="card-text">
              <small class="text-warning">
                <span v-for="i in 5" :key="i">
                  <i :class="i <= review.rating ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                </span>
              </small>
            </p>
          </div>
        </div>

        <div v-if="reviews.length > 3 && !showAllReviews" class="text-center mt-3">
          <button class="btn btn-outline-primary" @click="showAllReviews = true">
            Xem thêm đánh giá
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}
</style>
