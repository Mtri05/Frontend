<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { addToCart } from '@/assets/api/cartAPI'
const products = ref([])
const selectedProductSizeIds = ref({})
const quantities = ref({})
const router = useRouter()

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/product/products')
    products.value = response.data
  } catch (error) {
    console.error('Lỗi khi load sản phẩm:', error)
  }
})

const addToCartHandler = async (productId) => {
  const selectedSizeId = selectedProductSizeIds.value[productId]
  const qty = quantities.value[productId] || 1
  console.log('>>> Sending to cart:', {
  productSizeId: selectedSizeId,
  quantity: qty
})



  if (!selectedSizeId) {
    alert('Vui lòng chọn kích cỡ!')
    return
  }

  try {
    await addToCart(selectedSizeId, qty)
    alert('Đã thêm vào giỏ hàng')
    router.push('/cart')
  } catch (err) {
    alert(err.message || 'Lỗi khi thêm vào giỏ')
  }
}
</script>
<template>
  <div class="container my-1">
    <div class="section" data-aos="fade-up">
      <div class="slide-container">
        <div class="slide">
          <div
            class="item"
            style="
              background-image: url(https://taothuonghieu.com/wp-content/uploads/2023/10/3-khac-biet-chien-luoc-thuong-hieu-Nike.webp.webp);
            "
          >
            <div class="content">
              <div class="name">Switzerland</div>
              <div class="des">Lorem ipsum dolor, sit amet!</div>
              <button class="view-more">see more</button>
            </div>
          </div>

          <div
            class="item"
            style="
              background-image: url(https://taothuonghieu.com/wp-content/uploads/2023/10/3-khac-biet-chien-luoc-thuong-hieu-Nike.webp.webp);
            "
          >
            <div class="content">
              <div class="name">Finland</div>
              <div class="des">Lorem ipsum dolor, sit amet!</div>
              <button class="view-more">see more</button>
            </div>
          </div>

          <div
            class="item"
            style="
              background-image: url(https://taothuonghieu.com/wp-content/uploads/2023/10/3-khac-biet-chien-luoc-thuong-hieu-Nike.webp.webp);
            "
          >
            <div class="content">
              <div class="name">Iceland</div>
              <div class="des">Lorem ipsum dolor, sit amet!</div>
              <button class="view-more">see more</button>
            </div>
          </div>

          <div
            class="item"
            style="
              background-image: url(https://taothuonghieu.com/wp-content/uploads/2023/10/3-khac-biet-chien-luoc-thuong-hieu-Nike.webp.webp);
            "
          >
            <div class="content">
              <div class="name">Australia</div>
              <div class="des">Lorem ipsum dolor, sit amet!</div>
              <button class="view-more">see more</button>
            </div>
          </div>

          <div
            class="item"
            style="
              background-image: url(https://taothuonghieu.com/wp-content/uploads/2023/10/3-khac-biet-chien-luoc-thuong-hieu-Nike.webp.webp);
            "
          >
            <div class="content">
              <div class="name">Netherland</div>
              <div class="des">Lorem ipsum dolor, sit amet!</div>
              <button class="view-more">see more</button>
            </div>
          </div>
        </div>
        <div class="button">
          <button class="prev"><i class="bi bi-arrow-left"></i></button>
          <button class="next"><i class="bi bi-arrow-right"></i></button>
        </div>
      </div>
    </div>
    <div class="trending-section mt-4">
      <div class="section" data-aos="fade-up">
        <div class="container">
          <!-- Tiêu đề và nút Shop với nút điều hướng -->
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="fw-bold">Trending Now: Espresso</h2>
            <div class="shop-controls">
              <button class="shop-btn">Shop</button>
              <button class="nav-btn nav-btn-left disabled" id="btnLeft">
                <i class="bi bi-chevron-left"></i>
              </button>
              <button class="nav-btn nav-btn-right" id="btnRight">
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
          <div class="col-md-3" v-for="product in products" :key="product.id">
            <div class="card text-center p-2 h-100">
              <img
                :src="'/images/' + product.imageNames[0]"
                :alt="product.name"
                class="img-fluid mb-2"
              />
              <h5>{{ product.name }}</h5>
              <p class="text-danger">{{ product.price.toLocaleString() }} VND</p>

              <select v-model="selectedProductSizeIds[product.id]" class="form-select mb-2">
                <option
                  v-for="productSize in product.productSizes"
                  :key="productSize.id"
                  :value="productSize.id"
                >
                  {{ productSize.size.name }} (Còn: {{ productSize.stock }})
                </option>
              </select>

              <input
                type="number"
                v-model="quantities[product.id]"
                min="1"
                class="form-control mb-2"
              />

              <button class="btn btn-sm btn-outline-primary" @click="addToCartHandler(product.id)">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="section" data-aos="fade-up">
        <div class="container mt-5">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="fw-bold">Shop By Sport</h2>
            <div class="shop-controls">
              <button class="nav-btn nav-btn-left" id="sportBtnLeft">
                <i class="bi bi-chevron-left"></i>
              </button>
              <button class="nav-btn nav-btn-right" id="sportBtnRight">
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between position-relative">
            <!-- Danh sách các môn thể thao -->
            <div class="products-container" id="sportsContainer">
              <div class="product-card">
                <img src="@/assets/images/Running.jpg" class="card-img-top" alt="Running" />
                <button class="sport-btn">Running</button>
              </div>
              <div class="product-card">
                <img src="@/assets/images/Football.jpg" class="card-img-top" alt="Football" />
                <button class="sport-btn">Football</button>
              </div>
              <div class="product-card">
                <img src="@/assets/images/Basketball.jpg" class="card-img-top" alt="Basketball" />
                <button class="sport-btn">Basketball</button>
              </div>
              <div class="product-card">
                <img
                  src="@/assets/images/Training & Gym.jpg"
                  class="card-img-top"
                  alt="Training & Gym"
                />
                <button class="sport-btn">Training & Gym</button>
              </div>
              <div class="product-card">
                <img src="@/assets/images/Tennis.jpg" class="card-img-top" alt="Tennis" />
                <button class="sport-btn">Tennis</button>
              </div>
              <div class="product-card">
                <img src="@/assets/images/Yoga.jpg" class="card-img-top" alt="Yoga" />
                <button class="sport-btn">Yoga</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./src/assets/css/main.css"></style>
