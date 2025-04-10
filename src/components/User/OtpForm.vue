<script setup></script>
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-lg">
          <div class="card-header bg-primary text-white text-center">
            <h3>Xác thực Email</h3>
          </div>
          <div class="card-body">
            <!-- Form gửi OTP -->
            <form action="/register/otp" method="post">
              <div class="mb-3">
                <label for="email" class="form-label">Nhập email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="form-control"
                  th:value="${email}"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">Gửi OTP</button>
            </form>

            <!-- Hiển thị form nhập OTP nếu email đã được xác thực -->
            <div th:if="${message}" class="mt-4">
              <h5 class="text-center">Nhập mã OTP</h5>
              <form action="/register/otp" method="post">
                <input type="hidden" name="email" th:value="${email}" />
                <div class="mb-3">
                  <label for="otp" class="form-label">Mã OTP:</label>
                  <input type="text" id="otp" name="otp" class="form-control" required />
                </div>
                <button type="submit" class="btn btn-success w-100">Xác nhận</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src=""></style>
