<script setup>
import "@/assets/main.js";
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
    <div class="row g-3" id="productsContainer">
      <div class="col-md-3 col-sm-6 mb-4" th:each="favorite : ${favorites}">
        <div class="product-card text-center">
          <a
            class="bi bi-heart-fill text-danger favorite-icon"
            th:data-product-id="${favorite.product.id}"
            onclick="removeFavorite(this)"
          ></a>
          <!-- Kiểm tra nếu sản phẩm có ảnh -->
          <img
            th:if="${not #lists.isEmpty(favorite.product.images)}"
            th:src="@{'/images/' + ${favorite.product.images[0].name}}"
            th:alt="${favorite.product.name}"
            class="img-fluid"
          />

          <h5 class="mt-2" th:text="${favorite.product.name}"></h5>

          <p
            th:text="${#numbers.formatDecimal(favorite.product.price, 0, 'COMMA', 0, 'POINT')} + ' VND'"
          ></p>

          <a
            th:href="@{'/product/detail?productId=' + ${favorite.product.id}}"
            class="btn btn-primary btn-sm"
            >Chi Tiết</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./src/assets/css/main.css"></style>
