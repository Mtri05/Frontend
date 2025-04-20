<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const address = ref({
  customerName: '',
  phone: '',
  address: '',
  user: {
    id: null,
  },
})

const error = ref(null)
const successMessage = ref(null)

// Hàm lấy cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

// Load dữ liệu địa chỉ theo id từ URL
const loadAddress = async () => {
  const id = route.params.id
  try {
    const response = await axios.get(`http://localhost:8080/api/user/addresses/${id}`)
    console.log('Address data:', response.data)

    // Gán trực tiếp nếu là object, không cần truy cập addresses[0]
    address.value = response.data
  } catch (err) {
    error.value = 'Không thể tải dữ liệu địa chỉ.'
    console.error(err)
  }
}

const updateAddress = async () => {
  error.value = null
  successMessage.value = null

  if (!address.value.customerName || !address.value.phone || !address.value.address) {
    error.value = 'Vui lòng điền đầy đủ thông tin.'
    return
  }

  const isTenDigits = /^[0-9]{10}$/.test(address.value.phone)
  if (!isTenDigits) {
    error.value = 'Số điện thoại phải có đúng 10 chữ số.'
    return
  }

  const validPrefix = /^(03|05|07|08|09)/.test(address.value.phone)
  if (!validPrefix) {
    error.value = 'Số điện thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09.'
    return
  }

  const userId = getCookie('userId')
  if (userId) {
    // Kiểm tra user có tồn tại không
    if (!address.value.user) {
      address.value.user = {}
    }
    address.value.user.id = parseInt(userId)
  }

  try {
    await axios.put(`http://localhost:8080/api/user/addresses/${address.value.id}`, address.value)
    successMessage.value = 'Cập nhật địa chỉ thành công.'
    setTimeout(() => {
      router.push('/user/address')
    }, 1000)
  } catch (err) {
    error.value = 'Cập nhật thất bại.'
    console.error(err)
  }
}

onMounted(loadAddress)
</script>

<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Chỉnh sửa địa chỉ</h2>

    <!-- Thông báo lỗi -->
    <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>

    <!-- Thông báo thành công -->
    <div v-if="successMessage" class="alert alert-success text-center">{{ successMessage }}</div>

    <form @submit.prevent="updateAddress">
      <!-- Tên người nhận -->
      <div class="mb-3">
        <label for="customerName" class="form-label">Tên người nhận:</label>
        <input v-model="address.customerName" type="text" class="form-control" id="customerName" />
      </div>

      <!-- Số điện thoại -->
      <div class="mb-3">
        <label for="phone" class="form-label">Số điện thoại:</label>
        <input v-model="address.phone" type="text" class="form-control" id="phone" />
      </div>

      <!-- Địa chỉ -->
      <div class="mb-3">
        <label for="address" class="form-label">Địa chỉ:</label>
        <input v-model="address.address" type="text" class="form-control" id="address" />
      </div>

      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary">Cập nhật</button>
        <router-link to="/user/address" class="btn btn-secondary">Quay lại</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
}
</style>
