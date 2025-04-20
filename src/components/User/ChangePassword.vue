<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref(null)
const successMessage = ref(null)
const router = useRouter()

const token = localStorage.getItem('token');

const changePassword = async () => {
  error.value = null
  successMessage.value = null

  // Kiểm tra mật khẩu hiện tại không được để trống
  if (!currentPassword.value) {
    error.value = 'Mật khẩu hiện tại không được để trống.'
    return
  }

  // Kiểm tra mật khẩu mới không được để trống
  if (!newPassword.value) {
    error.value = 'Mật khẩu mới không được để trống.'
    return
  }

  // Kiểm tra xác nhận mật khẩu không được để trống
  if (!confirmPassword.value) {
    error.value = 'Vui lòng xác nhận mật khẩu.'
    return
  }

  // Kiểm tra mật khẩu mới và xác nhận mật khẩu không khớp
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Mật khẩu mới và xác nhận mật khẩu không khớp.'
    return
  }

  try {
    const userId = getCookie('userId') // Lấy id người dùng từ cookie

    const response = await axios.post('http://localhost:8080/api/user/change-password', {
      id: userId,
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
  )

    successMessage.value = 'Đổi mật khẩu thành công.'
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err) {
    console.error('❌ Lỗi khi đổi mật khẩu:', err)
    error.value = err.response?.data || 'Đổi mật khẩu thất bại.'
  }
}

// Hàm để lấy giá trị cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <h2 class="text-center">Đổi Mật Khẩu</h2>

        <!-- Hiển thị thông báo lỗi -->
        <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>

        <!-- Hiển thị thông báo thành công -->
        <div v-if="successMessage" class="alert alert-success text-center">{{ successMessage }}</div>

        <!-- Form đổi mật khẩu -->
        <form @submit.prevent="changePassword">
          <!-- Mật khẩu hiện tại -->
          <div class="mb-3">
            <label for="currentPassword" class="form-label">Mật khẩu hiện tại:</label>
            <input v-model="currentPassword" type="password" class="form-control" id="currentPassword" />
          </div>

          <!-- Mật khẩu mới -->
          <div class="mb-3">
            <label for="newPassword" class="form-label">Mật khẩu mới:</label>
            <input v-model="newPassword" type="password" class="form-control" id="newPassword" />
          </div>

          <!-- Xác nhận mật khẩu mới -->
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Xác nhận mật khẩu mới:</label>
            <input v-model="confirmPassword" type="password" class="form-control" id="confirmPassword" />
          </div>

          <div class="d-flex justify-content-start gap-2">
            <button type="submit" class="btn btn-primary">Cập Nhật</button>
            <a href="/" class="btn btn-secondary">Quay lại</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
