<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

const products = ref([])
let dataTable = null

const token = localStorage.getItem('token');

const initDataTable = () => {
  const table = $('#productTable')
  if ($.fn.dataTable.isDataTable('#productTable')) {
    table.DataTable().destroy()
  }

  table.DataTable({
    responsive: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/vi.json',
    },
  })
}

const loadProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/admin/product/products',{
      headers: {
        Authorization: `Bearer ${token}`,
    
      },
    })
    products.value = response.data

    await nextTick() 
    initDataTable()
  } catch (error) {
    console.error('Lỗi khi tải sản phẩm:', error)
    const errorMessage = document.getElementById('error-message')
    if (errorMessage) {
      errorMessage.style.display = 'block'
      errorMessage.textContent = 'Không thể tải dữ liệu sản phẩm!'
    }
  }
}

onMounted(() => {
  loadProducts()
})
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center">DANH SÁCH SẢN PHẨM</h2>
    <hr />
    <div class="alert alert-danger" style="display: none" id="error-message"></div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <a href="/admin/product/form">
        <button type="button" class="btn btn-primary">Thêm mới</button>
      </a>
    </div>

    <div class="table-responsive">
      <table id="productTable" class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.id }}</td>
            <td>
              <img
                v-if="item.imageNames && item.imageNames.length > 0"
                :src="`http://localhost:8080/images/${item.imageNames[0]}`"
                alt="image"
                style="width: 50px; height: 50px"
              />
            </td>

            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ new Intl.NumberFormat('vi-VN').format(item.price) }} VND</td>
            <td>
              <span :class="item.status ? 'badge bg-success' : 'badge bg-danger'">
                {{ item.status ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td>{{ item.categoryName }}</td>
            <td>
              <a :href="`/admin/product/form?productId=${item.id}`">
                <button class="btn btn-warning btn-sm">Sửa</button>
              </a>
              <a :href="`/admin/product/images?productId=${item.id}`">
                <button class="btn btn-secondary btn-sm">Xem ảnh</button>
              </a>
              <a :href="`/admin/product/sizes?productId=${item.id}`">
                <button class="btn btn-primary btn-sm">Số Lượng</button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
