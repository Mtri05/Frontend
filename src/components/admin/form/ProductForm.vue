<script></script>

<template>
  <div class="container p-3">
    <div class="form-container shadow p-3 rounded bg-light">
      <h3 class="text-center mb-3">Thêm Sản Phẩm Mới</h3>
      <form action="/admin/product/add" method="post" enctype="multipart/form-data">
        <!-- Product Name -->
        <div class="mb-2">
          <label for="name" class="form-label fw-semibold">Tên sản phẩm</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            placeholder="Nhập tên sản phẩm"
          />
          <div class="text-danger" id="error-name"></div>
        </div>

        <!-- Product Description -->
        <div class="mb-2">
          <label for="description" class="form-label fw-semibold">Mô tả</label>
          <textarea
            class="form-control"
            id="description"
            name="desc"
            rows="2"
            placeholder="Nhập mô tả sản phẩm"
          ></textarea>
          <div class="text-danger" id="error-desc"></div>
        </div>

        <!-- Product Price -->
        <div class="mb-2">
          <label for="price" class="form-label fw-semibold">Giá</label>
          <input
            type="number"
            class="form-control"
            id="price"
            name="price"
            placeholder="Nhập giá sản phẩm"
            step="1000"
          />
          <div class="text-danger" id="error-price"></div>
        </div>

        <!-- Product Status -->
        <div class="mb-2">
          <label for="status" class="form-label fw-semibold">Trạng thái</label>
          <select class="form-select" id="status" name="status">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <!-- Product Category -->
        <div class="mb-2">
          <label for="category" class="form-label fw-semibold">Danh mục</label>
          <select class="form-select" name="category" id="category">
            <option selected value="-1">---------Chọn danh mục---------</option>
            <!-- Danh sách danh mục sẽ được thêm bằng JavaScript hoặc server-side -->
          </select>
          <div class="text-danger" id="error-category"></div>
        </div>

        <!-- Product Image -->
        <div class="mb-2">
          <label for="image" class="form-label fw-semibold">Hình ảnh</label>
          <input
            type="file"
            class="form-control"
            id="image"
            name="images"
            accept="image/*"
            multiple
          />
          <div id="image-preview"></div>
          <div class="text-danger" id="error-image"></div>
        </div>

        <!-- Submit and Cancel Buttons -->
        <div class="mb-2">
          <button type="submit" class="btn btn-primary me-2">Thêm sản phẩm</button>
          <a href="/admin/product" class="btn btn-secondary">Hủy</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style src="./src/assets/css/login.css"></style>
