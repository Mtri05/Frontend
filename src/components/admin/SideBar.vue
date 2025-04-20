<script></script>
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
          <li><a class="dropdown-item" href="/login">Đăng xuất</a></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style src="./src/assets/css/sidebar.css"></style>
