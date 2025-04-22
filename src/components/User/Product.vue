<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Lấy userId từ cookie
const getUserIdFromCookie = () => {
  const match = document.cookie.match(/(?:^|;\s*)userId=(\d+)/)
  return match ? parseInt(match[1]) : null
}

const userId = getUserIdFromCookie()

const products = ref([])
const favorites = ref([]) // Danh sách productId yêu thích
const searchQuery = ref('')
const selectedCategory = ref('')
const sortOrder = ref('')
const categories = ref([])
const ratings = ref({})

const fetchRatings = async () => {
  for (const product of products.value) {
    const res = await axios.get(`http://localhost:8080/api/reviews/product/${product.id}/summary`)
    ratings.value[product.id] = res.data
  }
}

const fetchProducts = async () => {
  const res = await axios.get('http://localhost:8080/api/products')
  products.value = res.data
}

const fetchCategories = async () => {
  const res = await axios.get('http://localhost:8080/api/categories')
  categories.value = res.data
}
const token = localStorage.getItem('token')
// Lấy danh sách yêu thích từ backend
const fetchFavorites = async () => {
  if (!userId) return
  const res = await axios.get(`http://localhost:8080/api/user/favorites/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  favorites.value = res.data.map((fav) => fav.productId)
}

const isFavorite = (productId) => favorites.value.includes(productId)

const addToFavorites = async (productId) => {
  await axios.post('http://localhost:8080/api/user/favorites/favorites', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { userId, productId },
  })
  favorites.value.push(productId)
}

const removeFromFavorites = async (productId) => {
  await axios.delete(`http://localhost:8080/api/user/favorites/${userId}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  favorites.value = favorites.value.filter((id) => id !== productId)
}

const toggleFavorite = async (productId) => {
  if (!userId) {
    alert('Vui lòng đăng nhập để sử dụng chức năng yêu thích!')
    return
  }
  if (isFavorite(productId)) {
    await removeFromFavorites(productId)
  } else {
    await addToFavorites(productId)
  }
}

const filteredProducts = computed(() => {
  let filtered = products.value
  if (searchQuery.value) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }
  if (selectedCategory.value) {
    filtered = filtered.filter((p) => p.category?.id === parseInt(selectedCategory.value))
  }
  if (sortOrder.value === 'asc') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortOrder.value === 'desc') {
    filtered.sort((a, b) => b.price - a.price)
  }
  return filtered
})

const getImageUrl = (imageName) => {
  return imageName
    ? `http://localhost:8080/images/${imageName}`
    : 'http://localhost:8080/images/default-product-image.jpg'
}

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

onMounted(async () => {
  await fetchProducts()
  await fetchCategories()
  await fetchFavorites()
  await fetchRatings()
})
</script>

<template>
  <div class="container my-2">
    <div class="d-flex align-items-center mb-4">
      <a href="/" class="text-decoration-none d-flex align-items-center">
        <i class="bi bi-house-fill text-dark me-2"></i>
      </a>
      <span class="mx-1 text-muted">|</span>
      <span class="text-dark">Trang sản phẩm</span>
    </div>
    <div class="row mb-4">
      <div class="col-md-4">
        <input
          type="text"
          class="form-control"
          v-model="searchQuery"
          placeholder="Tìm sản phẩm theo tên..."
        />
      </div>
      <div class="col-md-4">
        <select class="form-select" v-model.number="selectedCategory">
          <option value="">Tất cả danh mục</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="col-md-4">
        <select class="form-select" v-model="sortOrder">
          <option value="">Sắp xếp theo giá</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </div>
    </div>
    <div class="row g-3" id="productsContainer">
      <template v-for="product in filteredProducts" :key="product.id">
        <div class="col-md-3 col-sm-6 mb-4" v-if="product.status && product.category?.status">
          <div class="product-card text-center">
            <!-- Nút yêu thích -->
            <a
              class="bi favorite-icon"
              :class="isFavorite(product.id) ? 'bi-heart-fill text-danger' : 'bi-heart text-muted'"
              @click.prevent="toggleFavorite(product.id)"
              style="position: absolute; cursor: pointer"
            ></a>

            <!-- Ảnh sản phẩm -->
            <img
              :src="getImageUrl(product.imageNames?.[0])"
              alt="Product Image"
              class="img-fluid"
            />

            <!-- Tên sản phẩm -->
            <h5 class="mt-2">{{ product.name }}</h5>

            <!-- Giá -->
            <p>{{ formatPrice(product.price) }} VND</p>

            <!-- Nút chi tiết -->
            <router-link
              :to="`/product/detail?productId=${product.id}`"
              class="btn btn-primary btn-sm"
            >
              Chi tiết
            </router-link>
            <!-- Hiển thị số sao và lượt đánh giá -->
            <p v-if="ratings[product.id]">
              ⭐ {{ ratings[product.id].averageRating.toFixed(1) }} /
              {{ ratings[product.id].totalReviews }} đánh giá
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style src="./src/assets/css/main.css"></style>
