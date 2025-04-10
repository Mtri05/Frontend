<script></script>

<template>
  <div class="forgotpassword-container">
    <div class="card p-4 shadow" style="max-width: 400px; width: 100%">
      <!-- Logo -->
      <div class="d-flex justify-content-center align-items-center mb-3">
        <img src="@/assets/images/Nike.png" alt="Nike" class="img-fluid" style="max-width: 50px" />
        <img
          src="@/assets/images/Jordan.png"
          alt="Jordan"
          class="img-fluid"
          style="max-width: 50px"
        />
      </div>

      <h2 class="text-center mb-4">Quên Mật Khẩu</h2>

      <!-- Hiển thị thông báo lỗi nếu có -->
      <div class="alert alert-danger text-center" id="error-message" style="display: none">
        <span id="error-text"></span>
      </div>

      <!-- Hiển thị thông báo thành công nếu có -->
      <div class="alert alert-success text-center" id="success-message" style="display: none">
        <span id="success-text"></span>
      </div>

      <form action="/forgot-password" method="POST">
        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            name="email"
            placeholder="Nhập email của bạn"
          />
        </div>

        <!-- Nút gửi -->
        <div class="d-grid">
          <button type="submit" class="btn btn-dark">Gửi Yêu Cầu</button>
        </div>
      </form>

      <!-- Liên kết khác -->
      <div class="mt-3 text-center">
        <p class="mb-1">
          <a href="/login" class="text-secondary text-decoration-underline">Quay lại Đăng Nhập</a>
        </p>
        <p>
          Chưa có tài khoản?
          <a href="/register/otp" class="text-secondary text-decoration-underline">Đăng ký ngay</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<style src="./src/assets/css/forgotpassword.css"></style>
