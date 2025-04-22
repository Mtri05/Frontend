<script setup>
import { ref, computed, onMounted } from 'vue'
import cartAPI from '@/assets/js/cartAPI'
import axios from 'axios'

const cart = ref([])
const cartId = getCookie('userId')

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

// Danh sách địa chỉ
const addresses = ref([])

// Trạng thái chọn địa chỉ
const selectedAddressId = ref(null)
const showAddressList = ref(false)
const isPlacingOrder = ref(false)

// Lọc sản phẩm trong cart hợp lệ
const filteredCart = computed(() =>
  cart.value.filter((item) => item?.product?.status === true && item?.category?.status === true),
)

// Gọi API lấy giỏ hàng
async function fetchCart() {
  try {
    const response = await cartAPI.viewCart(cartId)
    cart.value = response.data
  } catch (error) {
    console.error('Lỗi lấy giỏ hàng:', error)
  }
}

// Gọi API xóa sản phẩm khỏi giỏ
async function handleRemoveFromCart(productSizeId) {
  try {
    await cartAPI.deleteItem(cartId, productSizeId)
    fetchCart()
  } catch (error) {
    console.error('Lỗi xoá sản phẩm:', error)
  }
}

// Gọi API cập nhật số lượng
async function updateQuantity(item) {
  try {
    await cartAPI.updateQuantity(cartId, item.productSize.id, item.quantity)
    fetchCart()
  } catch (error) {
    console.error('Lỗi cập nhật số lượng:', error)
  }
}

// Gọi API xóa toàn bộ
async function clearCart() {
  try {
    await cartAPI.clearCart(cartId)
    fetchCart()
  } catch (error) {
    console.error('Lỗi xoá toàn bộ:', error)
  }
}
const token = localStorage.getItem('token')
// Gọi API lấy địa chỉ của người dùng
async function fetchAddresses() {
  try {
    const response = await axios.get(`http://localhost:8080/api/user/addresses/${cartId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    addresses.value = response.data

    if (addresses.value.length > 0) {
      const defaultAddr = addresses.value.find((addr) => addr.isDefault)
      selectedAddressId.value = defaultAddr ? defaultAddr.id : addresses.value[0].id
    }
  } catch (error) {
    console.error('Lỗi khi lấy địa chỉ:', error)
  }
}

// Mở form chọn địa chỉ
function openAddressList() {
  showAddressList.value = true
  fetchAddresses()
}

// Gửi đơn hàng
async function placeOrder() {
  if (!selectedAddressId.value) {
    alert('Vui lòng chọn địa chỉ!')
    return
  }

  const selectedAddress = addresses.value.find((addr) => addr.id === selectedAddressId.value)
  if (!selectedAddress) {
    alert('Không tìm thấy địa chỉ!')
    return
  }

  isPlacingOrder.value = true
  try {
    const response = await axios.post(
      `http://localhost:8080/api/user/order/checkout`,
      {
        userId: cartId,
        address: `${selectedAddress.address}, ${selectedAddress.customerName}, ${selectedAddress.phone}`,
        items: filteredCart.value.map((item) => ({
          productSizeId: item.productSize.id,
          quantity: item.quantity,
        })),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    alert('Đặt hàng thành công!')
    showAddressList.value = false
    clearCart()
    fetchCart()
  } catch (error) {
    console.error('Lỗi đặt hàng:', error)
    alert('Đặt hàng thất bại!')
  } finally {
    isPlacingOrder.value = false
  }
}
function validateAndUpdateQuantity(item) {
  if (item.quantity < 1) {
    alert('Số lượng tối thiểu là 1!')
    item.quantity = 1
    return
  }

  if (item.quantity > item.productSize.stock) {
    alert(`Chỉ còn ${item.productSize.stock} sản phẩm trong kho!`)
    item.quantity = item.productSize.stock
    return
  }

  updateQuantity(item)
}

onMounted(() => {
  fetchCart()
})
</script>
t>

<template>
  <div class="cart-container-modern">
    <h2 class="cart-title-modern">Giỏ hàng của bạn</h2>
    <div v-if="!cart || cart.length === 0" class="cart-empty-msg-modern">
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
          <tr v-for="item in filteredCart" :key="item.id" class="cart-item-row-modern">
            <td class="text-center">
              <img
                :src="'http://localhost:8080/images/' + item.product.imageNames[0]"
                alt="Ảnh sản phẩm"
                class="cart-item-img-modern"
              />
            </td>
            <td class="cart-product-name-modern">{{ item.product.name }}</td>
            <td>{{ item.productSize.sizeName }}</td>
            <td>
              <input
                type="number"
                min="1"
                :max="item.productSize.stock"
                class="cart-qty-input-modern"
                v-model.number="item.quantity"
                @change="validateAndUpdateQuantity(item)"
              />
            </td>
            <td class="cart-price-highlight-modern">
              {{ (item.product.price * item.quantity).toLocaleString('vi-VN') }} VND
            </td>
            <td class="text-center">
              <button
                class="cart-remove-btn-modern"
                @click="handleRemoveFromCart(item.productSize.id)"
              >
                Xoá
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-end cart-total-price-modern">
        Tổng tiền:
        {{
          filteredCart
            .reduce((total, item) => total + item.product.price * item.quantity, 0)
            .toLocaleString('vi-VN')
        }}
        VND
      </div>

      <div class="text-end">
        <button class="cart-clear-btn-modern" @click="clearCart">Xoá tất cả</button>
      </div>
      <!-- Nút Mua ngay -->
      <!-- Nút Mua ngay -->
      <div class="text-end mt-3">
        <button class="btn btn-success" @click="openAddressList">Mua ngay</button>
      </div>

      <!-- Component hiển thị danh sách địa chỉ -->
      <div v-if="showAddressList" class="address-section mt-4 p-3 border rounded">
        <h3 class="mb-3">Chọn địa chỉ giao hàng</h3>
        <div v-if="addresses.length === 0">Không có địa chỉ nào!</div>
        <ul v-else class="list-unstyled">
          <li v-for="addr in addresses" :key="addr.id" class="mb-2">
            <label>
              <input type="radio" :value="addr.id" v-model="selectedAddressId" />
              {{ addr.customerName }} - {{ addr.phone }} - {{ addr.address }}
            </label>
          </li>
        </ul>
        <div class="mb-3">
          <router-link to="/user/address/form" class="btn btn-primary">
            <i class="bi bi-plus-circle"></i> Thêm Địa Chỉ
          </router-link>
        </div>
        <div class="text-end mt-3">
          <button :disabled="isPlacingOrder" @click="placeOrder" class="btn btn-primary me-2">
            {{ isPlacingOrder ? 'Đang đặt...' : 'Xác nhận đặt hàng' }}
          </button>
          <button @click="showAddressList = false" class="btn btn-secondary">Huỷ</button>
        </div>
      </div>
    </div>
  </div>
</template>
