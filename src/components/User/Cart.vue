<template>
  <div class="cart-container-modern">
    <h2 class="cart-title-modern">Giỏ hàng của bạn</h2>

    <div
      v-if="!cart.cartDetails || cart.cartDetails.length === 0"
      class="cart-empty-msg-modern"
    >
      Không có sản phẩm trong giỏ hàng
    </div>

    <div v-else>
      <table class="cart-table-modern">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Sản phẩm</th>
            <th>Size</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.cartDetails" :key="item.id" class="cart-item-row-modern">
            <td class="text-center">
              <img
                :src="'/images/' + item.productImage"
                alt="Ảnh sản phẩm"
                class="cart-item-img-modern"
              />
            </td>
            <td class="cart-product-name-modern">{{ item.productName }}</td>
            <td>
              <select class="cart-size-select-modern" v-model="item.size.id" @change="updateSize(item)">
                <option v-for="size in item.availableSizes" :key="size.id" :value="size.id">
                  {{ size.name }}
                </option>
              </select>
            </td>
            <td>
              <input
                type="number"
                min="1"
                :max="item.stock"
                class="cart-qty-input-modern"
                v-model.number="item.quantity"
                @change="updateQuantity(item)"
              />
            </td>

            <td class="cart-price-highlight-modern">{{ item.price.toLocaleString('vi-VN') }}₫</td>
            <td class="text-center">
              <button class="cart-remove-btn-modern" @click="handleRemoveFromCart(item.id)">
                Xoá
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end cart-total-price-modern">
        Tổng tiền:
        {{
          cart.cartDetails
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toLocaleString('vi-VN')
        }}₫
      </div>

      <div class="text-end">
        <button class="cart-clear-btn-modern" @click="clearCart">Xoá tất cả</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  addToCart,
  getCart,
  updateSizeInCart as apiUpdateSizeInCart,
  updateQuantityInCart as apiUpdateQuantityInCart,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
} from '@/assets/api/cartAPI'

const cart = ref({ cartDetails: [] })

function getCookieValue(name) {
  const value = document.cookie.split('; ').find((row) => row.startsWith(name + '='))
  return value ? value.split('=')[1] : null
}

const token = getCookieValue('token')

async function fetchCart() {
  try {
    cart.value = await getCart()
  } catch (error) {
    console.error('loi fetch:', error)
  }
}
async function handleRemoveFromCart(cartDetailId) {
  try {
    await apiRemoveFromCart(cartDetailId)
    fetchCart()
  } catch (error) {
    if (error.response?.status === 401) {
      console.error('loi 401:', error)
    } else {
      console.error('Product:', error)
    }
  }
}

async function updateSize(item) {
  try {
    await apiUpdateSizeInCart(item.id, item.size.id)
    fetchCart()
  } catch (error) {
    console.error('size:', error)
  }
}

async function updateQuantity(item) {
  try {
    await apiUpdateQuantityInCart(item.id, item.quantity)
    fetchCart()
  } catch (error) {
    console.error('Quantity:', error)
  }
}

async function clearCart() {
  try {
    await apiClearCart()
    fetchCart()
  } catch (error) {
    console.error('clearing:', error)
  }
}

onMounted(() => {
  fetchCart()
})
</script>
