<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const favorites = ref([])

const token = localStorage.getItem('token');

// Lấy userId từ cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

// Lấy danh sách yêu thích của user
const getFavorites = async () => {
  const userId = getCookie('userId') // Lấy userId từ cookie
  console.log('UserId:', userId) // Kiểm tra giá trị userId

  if (!userId) {
    console.log('Không tìm thấy userId trong cookie')
    return
  }

  try {
    const response = await axios.get(`http://localhost:8080/api/user/favorites/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('Dữ liệu nhận được từ API:', response.data) // Kiểm tra dữ liệu trả về từ API
    favorites.value = response.data
  } catch (error) {
    console.error('Lỗi khi lấy danh sách yêu thích:', error)
  }
}

// Gọi hàm khi component được gắn kết (mounted)
onMounted(() => {
  getFavorites()
})

// Hàm để xóa sản phẩm yêu thích
const removeFavorite = async (productId) => {
  const userId = getCookie('userId')
  if (!userId) {
    console.log('Không tìm thấy userId trong cookie')
    return
  }

  try {
    // Gọi API xóa sản phẩm yêu thích
    await axios.delete(`http://localhost:8080/api/user/favorites/${userId}/${productId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    // Sau khi xóa, cập nhật lại danh sách yêu thích
    getFavorites()
    console.log('Sản phẩm đã được xóa khỏi yêu thích')
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm yêu thích:', error)
  }
}

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Phương thức lấy URL của hình ảnh, trả về ảnh mặc định nếu không có hình ảnh
const getImageUrl = (imageName) => {
  return imageName
    ? `http://localhost:8080/images/${imageName}`
    : 'http://localhost:8080/images/default-product-image.jpg'
}
</script>

<template>
  <div class="container my-2">
    <div class="d-flex align-items-center mb-4">
      <a href="/" class="text-decoration-none d-flex align-items-center">
        <i class="bi bi-house-fill text-dark me-2"></i>
      </a>
      <span class="mx-1 text-muted">|</span>
      <span class="text-dark">Trang yêu thích</span>
    </div>

    <!-- Hiển thị danh sách sản phẩm yêu thích -->
    <div class="row g-3" id="productsContainer">
      <div v-if="favorites.length === 0" class="col-12">
        <p>Không có sản phẩm yêu thích nào.</p>
      </div>

      <div v-for="favorite in favorites" :key="favorite.id" class="col-md-3 col-sm-6 mb-4">
        <div class="product-card text-center">
          <!-- Biểu tượng yêu thích có thể được bấm để xóa sản phẩm khỏi danh sách -->
          <a
            class="bi bi-heart-fill text-danger favorite-icon"
            :data-product-id="favorite.productId"
            @click="removeFavorite(favorite.productId)"
          ></a>

          <!-- Kiểm tra nếu sản phẩm có ảnh, nếu không thì dùng ảnh mặc định -->
          <img :src="getImageUrl(favorite.productImage)" alt="Product Image" class="img-fluid" />

          <h5 class="mt-2">{{ favorite.productName }}</h5>

          <!-- Sử dụng phương thức formatCurrency để hiển thị giá tiền -->
          <p>{{ formatPrice(favorite.productPrice) }} VND</p>

          <a
            :href="'/product/detail?productId=' + favorite.productId"
            class="btn btn-primary btn-sm"
            >Chi Tiết</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./src/assets/css/main.css"></style>
