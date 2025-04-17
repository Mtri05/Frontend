<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])

onMounted(async () => {
  try {
    const response = await fetch('/api/product/products')
    products.value = await response.json()
  } catch (err) {
    console.error('Lỗi khi lấy sản phẩm:', err)
  }
})

function toggleFavorite(productId) {
  console.log('Yêu thích:', productId)
}
</script>

<template>
    <div class="container my-4">
		<h2 class="fw-bold text-center mb-4">Danh Sách Sản Phẩm</h2>
    <div class="row g-3" id="productList">
      <div
        class="col-md-3 col-sm-6 mb-4"
        v-for="product in products"
        :key="product.id"
      >
        <div class="product-card text-center">
          <i class="favorite-icon" @click="toggleFavorite(product.id)">❤️</i>
          <img
            :src="'/images/' + product.imageNames[0]"
            :alt="product.name"
            class="img-fluid"
          />
          <h5>{{ product.name }}</h5>
          <p>{{ product.price.toLocaleString() }} VND</p>
          <a
            :href="`/product/detail?productId=${product.id}`"
            class="btn btn-primary btn-sm"
            >Chi Tiết</a
          >
        </div>
      </div>
    </div>

    <div class="row g-3" id="productList">
  <div class="col-md-3 col-sm-6 mb-4" v-for="product in products" :key="product.id">
    <div class="product-card text-center">
      <i class="favorite-icon" @click="toggleFavorite(product.id)">❤️</i>
      <img :src="'/images/' + product.images[0]?.name" :alt="product.name" class="img-fluid" />
      <h5>{{ product.name }}</h5>
      <p>{{ product.price.toLocaleString() }} VND</p>
      <a :href="`/product/detail?productId=${product.id}`" class="btn btn-primary btn-sm">Chi Tiết</a>
    </div>
  </div>
</div>

	</div>
</template>
<style></style>
