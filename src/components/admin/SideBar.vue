<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const isLoggedIn = ref(false)

onMounted(() => {
  // Kiểm tra từ localStorage hoặc cookie
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
})

const logout = async () => {
  try {
    axios.post('http://localhost:8080/api/login/logout', null, {
      withCredentials: true,
    })

    // Xoá cookie client
    document.cookie = 'userId=; path=/; max-age=0'
    document.cookie = 'userRole=; path=/; max-age=0'
    document.cookie = 'userName=; path=/; max-age=0'
    document.cookie = 'userEmail=; path=/; max-age=0'
    document.cookie = 'userAvatar=; path=/; max-age=0'
    document.cookie = 'token=; path=/; max-age=0'

    // Xóa token và role lưu trong localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')

    // Chuyển hướng về trang đăng nhập
    router.push('/login')
  } catch (error) {
    console.error('Lỗi khi đăng xuất:', error)
  }
}
</script>

<template>
  <header>
    <nav class="sidebar">
      <div class="logo"><img src="@/assets/images/Nike.png" alt="Nike Logo" /></div>
      <ul class="menu">
        <li class="menu-item">
          <a href="/admin" class="menu-link active"
            ><i class="fa fa-home"></i> <span class="menu-text">Trang Chủ</span></a
          >
        </li>
        <li class="menu-item">
          <a href="/admin/category" class="menu-link"
            ><i class="fa fa-list"></i> <span class="menu-text">Danh Mục</span></a
          >
        </li>
        <li class="menu-item">
          <a href="/admin/product" class="menu-link"
            ><i class="fa fa-box"></i> <span class="menu-text">Sản Phẩm</span></a
          >
        </li>
        <li class="menu-item">
          <a href="/admin/order" class="menu-link"
            ><i class="fa fa-shopping-cart"></i> <span class="menu-text">Đơn Hàng</span></a
          >
        </li>
        <li class="menu-item">
          <a href="/admin/user" class="menu-link"
            ><i class="fa fa-user"></i> <span class="menu-text">Khách Hàng</span></a
          >
        </li>
      </ul>
      <div
        class="dropdown profile-dropdown"
        style="position: absolute; bottom: 20px; left: 20px; width: calc(100% - 40px)"
      >
        <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
          <img src="https://github.com/mdo.png" width="32" height="32" class="rounded-circle" />
          <strong class="dropdown-text">Admin</strong>
        </a>
        <ul class="dropdown-menu shadow">
          <li><a class="dropdown-item" href="#">Cài đặt</a></li>
          <li><a class="dropdown-item" href="#">Hồ sơ</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a @click.prevent="logout" class="dropdown-item" href="/login">Đăng xuất</a></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style src="./src/assets/css/sidebar.css"></style>
