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
    <!-- Logo Bar -->
    <div class="bg-light">
      <div class="container d-flex justify-content-between align-items-center py-2">
        <!-- Logo -->
        <a href="#">
          <img src="@/assets/images/Jordan.png" alt="Nike Logo" height="24" />
        </a>

        <!-- Menu điều hướng -->
        <div class="d-flex align-items-center">
          <a href="/contact" class="text-dark text-decoration-none me-3">Tìm cửa hàng</a>
          <a href="/about" class="text-dark text-decoration-none me-3">Giới thiệu</a>
          <!-- Chỉ hiển thị khi đã đăng nhập -->
          <a v-if="isLoggedIn" @click.prevent="logout" class="text-dark text-decoration-none me-3"
            >Đăng xuất</a
          >
          <router-link v-else to="/login" class="text-dark text-decoration-none me-3"
            >Đăng nhập</router-link
          >
        </div>
      </div>
    </div>

    <!-- Thanh Điều Hướng -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="@/assets/images/Nike.png" alt="Nike Logo" height="24" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Chuyển đổi điều hướng"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto fw-bold text-dark">
            <li class="nav-item dropdown position-static">
              <a class="nav-link no-arrow" href="/" id="navbarDropdown">Trang Chủ</a>
            </li>
            <!-- Menu Dropdown -->
            <li class="nav-item dropdown position-static">
              <a class="nav-link no-arrow" href="/product" id="navbarDropdown">Sản Phẩm</a>
            </li>

            <!-- Mục Nam -->
            <li class="nav-item dropdown position-static">
              <a class="nav-link no-arrow" href="#" id="navbarDropdownMen">Nam</a>
              <div class="dropdown-menu custom-dropdown w-100" aria-labelledby="navbarDropdownMen">
                <div class="container">
                  <div class="row">
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Nổi Bật</h6>
                      <a class="dropdown-item" href="#">Hàng Mới Về</a>
                      <a class="dropdown-item" href="#">Bán Chạy Nhất</a>
                      <a class="dropdown-item" href="#">Tất Cả Khuyến Mãi</a>
                    </div>
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Giày</h6>
                      <a class="dropdown-item" href="#">Tất Cả Giày</a>
                      <a class="dropdown-item" href="#">Phong Cách Đời Thường</a>
                      <a class="dropdown-item" href="#">Chạy Bộ</a>
                      <a class="dropdown-item" href="#">Bóng Rổ</a>
                      <a class="dropdown-item" href="#">Bóng Đá</a>
                      <a class="dropdown-item" href="#">Tập Luyện & Gym</a>
                      <a class="dropdown-item" href="#">Jordan</a>
                      <a class="dropdown-item" href="#">Dép & Sandal</a>
                    </div>
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Quần Áo</h6>
                      <a class="dropdown-item" href="#">Tất Cả Quần Áo</a>
                      <a class="dropdown-item" href="#">Áo Thun</a>
                      <a class="dropdown-item" href="#">Quần Shorts</a>
                      <a class="dropdown-item" href="#">Áo Hoodie & Áo Nỉ</a>
                      <a class="dropdown-item" href="#">Áo Khoác & Gile</a>
                      <a class="dropdown-item" href="#">Quần & Quần Tập</a>
                    </div>
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Mua Theo Môn Thể Thao</h6>
                      <a class="dropdown-item" href="#">Chạy Bộ</a>
                      <a class="dropdown-item" href="#">Bóng Rổ</a>
                      <a class="dropdown-item" href="#">Bóng Đá</a>
                      <a class="dropdown-item" href="#">Golf</a>
                      <a class="dropdown-item" href="#">Quần Vợt</a>
                      <a class="dropdown-item" href="#">Gym & Tập Luyện</a>
                    </div>
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Phụ Kiện</h6>
                      <a class="dropdown-item" href="#">Tất Cả Phụ Kiện</a>
                      <a class="dropdown-item" href="#">Túi & Ba Lô</a>
                      <a class="dropdown-item" href="#">Tất</a>
                      <a class="dropdown-item" href="#">Mũ & Nón</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown position-static">
              <a class="nav-link no-arrow" href="#" id="navbarDropdownWomen">Nữ</a>
              <div
                class="dropdown-menu custom-dropdown w-100"
                aria-labelledby="navbarDropdownWomen"
              >
                <div class="container">
                  <div class="row">
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Nổi Bật</h6>
                      <a class="dropdown-item" href="#">Hàng Mới Về</a>
                      <a class="dropdown-item" href="#">Bán Chạy Nhất</a>
                      <a class="dropdown-item" href="#">Tất Cả Sản Phẩm Giảm Giá</a>
                    </div>
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Giày</h6>
                      <a class="dropdown-item" href="#">Tất Cả Giày</a>
                      <a class="dropdown-item" href="#">Phong Cách Đời Thường</a>
                      <a class="dropdown-item" href="#">Jordan</a>
                      <a class="dropdown-item" href="#">Chạy Bộ</a>
                      <a class="dropdown-item" href="#">Tập Luyện & Gym</a>
                      <a class="dropdown-item" href="#">Bóng Đá</a>
                      <a class="dropdown-item" href="#">Bóng Rổ</a>
                      <a class="dropdown-item" href="#">Dép & Sandal</a>
                      <a class="dropdown-item" href="#">Nike By You</a>
                    </div>
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Quần Áo</h6>
                      <a class="dropdown-item" href="#">Tất Cả Quần Áo</a>
                      <a class="dropdown-item" href="#">Trang Phục Hiệu Suất</a>
                      <a class="dropdown-item" href="#">Áo Thun & Áo Sơ Mi</a>
                      <a class="dropdown-item" href="#">Áo Ngực Thể Thao</a>
                      <a class="dropdown-item" href="#">Quần Dài & Legging</a>
                      <a class="dropdown-item" href="#">Quần Shorts</a>
                      <a class="dropdown-item" href="#">Áo Hoodie & Áo Nỉ</a>
                      <a class="dropdown-item" href="#">Áo Khoác & Gile</a>
                      <a class="dropdown-item" href="#">Váy & Đầm</a>
                      <a class="dropdown-item" href="#">Trang Phục Kín Đáo</a>
                      <a class="dropdown-item" href="#">Trang Phục Dành Cho Bà Bầu</a>
                      <a class="dropdown-item" href="#">Cỡ Đại (Plus Size)</a>
                    </div>
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Mua Sắm Theo Thể Thao</h6>
                      <a class="dropdown-item" href="#">Yoga</a>
                      <a class="dropdown-item" href="#">Chạy Bộ</a>
                      <a class="dropdown-item" href="#">Tập Luyện & Gym</a>
                      <a class="dropdown-item" href="#">Bóng Rổ</a>
                      <a class="dropdown-item" href="#">Tennis</a>
                      <a class="dropdown-item" href="#">Golf</a>
                      <a class="dropdown-item" href="#">Bóng Đá</a>
                      <a class="dropdown-item" href="#">Trượt Ván</a>
                    </div>
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Phụ Kiện & Thiết Bị</h6>
                      <a class="dropdown-item" href="#">Tất Cả Phụ Kiện & Thiết Bị</a>
                      <a class="dropdown-item" href="#">Ba Lô & Túi Xách</a>
                      <a class="dropdown-item" href="#">Tất/Vớ</a>
                      <a class="dropdown-item" href="#">Mũ & Phụ Kiện Đầu</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown position-static">
              <a class="nav-link no-arrow" href="#" id="navbarDropdownKids">Trẻ Em</a>
              <div class="dropdown-menu custom-dropdown w-100" aria-labelledby="navbarDropdownKids">
                <div class="container">
                  <div class="row">
                    <!-- Cột 1: Nổi Bật -->
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Nổi Bật</h6>
                      <a class="dropdown-item" href="#">Hàng Mới Về</a>
                      <a class="dropdown-item" href="#">Bán Chạy Nhất</a>
                      <a class="dropdown-item" href="#">Chuẩn Bị Đến Trường</a>
                      <a class="dropdown-item" href="#">Dụng Cụ Thể Thao</a>
                      <a class="dropdown-item" href="#">Phong Cách Đời Thường</a>
                    </div>
                    <!-- Cột 2: Giày -->
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Giày</h6>
                      <a class="dropdown-item" href="#">Tất Cả Giày</a>
                      <a class="dropdown-item" href="#">Phong Cách Đời Thường</a>
                      <a class="dropdown-item" href="#">Jordan</a>
                      <a class="dropdown-item" href="#">Bóng Đá</a>
                      <a class="dropdown-item" href="#">Chạy Bộ</a>
                      <a class="dropdown-item" href="#">Bóng Rổ</a>
                    </div>
                    <!-- Cột 3: Quần Áo -->
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Quần Áo</h6>
                      <a class="dropdown-item" href="#">Tất Cả Quần Áo</a>
                      <a class="dropdown-item" href="#">Áo Thun & Áo Sơ Mi</a>
                      <a class="dropdown-item" href="#">Áo Ngực Thể Thao</a>
                      <a class="dropdown-item" href="#">Áo Hoodie & Áo Nỉ</a>
                      <a class="dropdown-item" href="#">Quần Dài & Legging</a>
                      <a class="dropdown-item" href="#">Quần Shorts</a>
                    </div>
                    <!-- Cột 4: Trẻ Em Theo Độ Tuổi -->
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Trẻ Em Theo Độ Tuổi</h6>
                      <a class="dropdown-item" href="#">Trẻ Lớn (7 - 14 tuổi)</a>
                      <a class="dropdown-item" href="#">Trẻ Nhỏ (4 - 7 tuổi)</a>
                      <a class="dropdown-item" href="#">Trẻ Sơ Sinh & Tập Đi (0 - 4 tuổi)</a>
                    </div>
                    <!-- Cột 5: Mua Sắm Theo Môn Thể Thao -->
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Mua Sắm Theo Môn Thể Thao</h6>
                      <a class="dropdown-item" href="#">Bóng Đá</a>
                      <a class="dropdown-item" href="#">Chạy Bộ</a>
                      <a class="dropdown-item" href="#">Bóng Rổ</a>
                      <a class="dropdown-item" href="#">Tập Luyện & Gym</a>
                    </div>
                    <!-- Cột 6: Phụ Kiện & Thiết Bị -->
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Phụ Kiện & Thiết Bị</h6>
                      <a class="dropdown-item" href="#">Tất Cả Phụ Kiện & Thiết Bị</a>
                      <a class="dropdown-item" href="#">Ba Lô & Túi Xách</a>
                      <a class="dropdown-item" href="#">Tất/Vớ</a>
                      <a class="dropdown-item" href="#">Mũ & Phụ Kiện Đầu</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown position-static">
              <a class="nav-link no-arrow" href="#" id="navbarDropdownSale">Khuyến Mãi</a>
              <div class="dropdown-menu custom-dropdown w-100" aria-labelledby="navbarDropdownSale">
                <div class="container">
                  <div class="row">
                    <!-- Cột 1: Giảm Giá & Ưu Đãi -->
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Giảm Giá & Ưu Đãi</h6>
                      <a class="dropdown-item" href="#">Tất Cả Khuyến Mãi</a>
                      <a class="dropdown-item" href="#">Sản Phẩm Bán Chạy</a>
                      <a class="dropdown-item" href="#">Cơ Hội Cuối Cùng</a>
                    </div>
                    <!-- Cột 2: Giảm Giá Nam -->
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Giảm Giá Nam</h6>
                      <a class="dropdown-item" href="#">Giày</a>
                      <a class="dropdown-item" href="#">Quần Áo</a>
                      <a class="dropdown-item" href="#">Phụ Kiện & Thiết Bị</a>
                    </div>
                    <!-- Cột 3: Giảm Giá Nữ -->
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Giảm Giá Nữ</h6>
                      <a class="dropdown-item" href="#">Giày</a>
                      <a class="dropdown-item" href="#">Quần Áo</a>
                      <a class="dropdown-item" href="#">Phụ Kiện & Thiết Bị</a>
                    </div>
                    <!-- Cột 4: Giảm Giá Trẻ Em -->
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Giảm Giá Trẻ Em</h6>
                      <a class="dropdown-item" href="#">Giày</a>
                      <a class="dropdown-item" href="#">Quần Áo</a>
                      <a class="dropdown-item" href="#">Phụ Kiện & Thiết Bị</a>
                    </div>
                    <!-- Cột 5: Mua Sắm Theo Môn Thể Thao -->
                    <div class="col-md-2">
                      <h6 class="dropdown-header">Mua Sắm Theo Môn Thể Thao</h6>
                      <a class="dropdown-item" href="#">Bóng Đá</a>
                      <a class="dropdown-item" href="#">Chạy Bộ</a>
                      <a class="dropdown-item" href="#">Bóng Rổ</a>
                      <a class="dropdown-item" href="#">Tập Luyện & Gym</a>
                      <a class="dropdown-item" href="#">Quần Vợt</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <!-- Icon Yêu Thích (Trái Tim) -->
            <a href="/user/favorite" class="text-dark text-decoration-none mx-2">
              <i class="fa-solid fa-heart fs-5"></i>
            </a>

            <!-- Icon Giỏ Hàng -->
            <a href="/user/cart" class="text-dark text-decoration-none mx-2">
              <i class="fa-solid fa-shopping-cart fs-5"></i>
            </a>

            <!-- User Icon Dropdown -->
            <div class="dropdown d-inline">
              <a
                href="#"
                class="text-dark text-decoration-none mx-2"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa-solid fa-user-circle fs-4"></i>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-start shadow-sm border-0 rounded-3 mt-3"
                aria-labelledby="userDropdown"
                style="min-width: 220px"
              >
                <li>
                  <a class="dropdown-item py-2" href="/user/profile">
                    <i class="fa-solid fa-user-pen me-2 text-primary"></i> Cập nhật thông tin
                  </a>
                </li>
                <li>
                  <a class="dropdown-item py-2" href="/user/change-password">
                    <i class="fa-solid fa-key me-2 text-warning"></i> Đổi mật khẩu
                  </a>
                </li>
                <li>
                  <a class="dropdown-item py-2" href="/user/address">
                    <i class="fa-solid fa-location-dot me-2 text-success"></i> Địa chỉ của tôi
                  </a>
                </li>
                <li>
                  <a class="dropdown-item py-2" href="/user/order/history">
                    <i class="fa-solid fa-box-archive me-2 text-danger"></i> Đơn hàng
                  </a>
                </li>
                <li>
                  <a class="dropdown-item py-2" href="/user/Review/history">
                    <i class="fa-solid fa-star me-2 text-warning"></i>
                    Lịch sử đánh giá
                  </a>
                </li>
              </ul>
            </div>

            <!-- Ô tìm kiếm -->
            <div class="search-box d-flex align-items-center ms-3">
              <i class="fa-solid fa-magnifying-glass me-2"></i>
              <input type="text" class="form-control" placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Message Section -->
    <div class="text-center py-3 bg-light border-bottom">
      <h6 class="mb-1">Di chuyển, Mua sắm, Tùy chỉnh & Cùng chúc mừng với chúng tôi</h6>
      <p class="mb-0">
        Dù hôm nay bạn muốn làm gì, trải nghiệm sẽ tuyệt vời hơn khi trở thành Thành viên.
        <a href="#" class="fw-bold text-dark">Tham gia ngay</a>
      </p>
    </div>
  </header>
</template>
<style src="./src/assets/css/header.css"></style>
