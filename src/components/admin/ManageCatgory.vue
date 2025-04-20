<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

const form = ref({
  id: null,
  name: '',
  status: true,
})

const errors = ref({})
const categories = ref([])
const modalTitle = ref('')
const isFormVisible = ref(false) // Hiển thị form

const fetchCategories = async () => {
  if ($.fn.DataTable.isDataTable('#categoryTable')) {
    $('#categoryTable').DataTable().destroy()
  }

  const res = await axios.get('http://localhost:8080/api/category/list')
  categories.value = res.data
  await nextTick()
  initDataTable()
}

onMounted(fetchCategories)

const openAddForm = () => {
  form.value = { id: null, name: '', status: true }
  modalTitle.value = 'Thêm Mới Danh Mục'
  errors.value = {}
  isFormVisible.value = true
}

const openEditForm = (category) => {
  form.value = { ...category }
  modalTitle.value = 'Cập Nhật Danh Mục'
  errors.value = {}
  isFormVisible.value = true
}

const handleSubmit = async () => {
  const categoryData = {
    name: form.value.name,
    status: form.value.status,
  }

  if (form.value.id) {
    await handleUpdate(categoryData)
  } else {
    await handleAdd(categoryData)
  }
}

const handleUpdate = async (categoryData) => {
  try {
    await axios.post(`http://localhost:8080/api/category/update/${form.value.id}`, categoryData)
    alert('Danh mục đã được cập nhật thành công')
    resetForm()
    isFormVisible.value = false
    await fetchCategories()
  } catch (err) {
    if (err.response?.data?.error) {
      errors.value = { name: err.response?.data.error }
    } else {
      errors.value = err.response?.data || {}
    }
  }
}

const handleAdd = async (categoryData) => {
  try {
    await axios.post('http://localhost:8080/api/category/add', categoryData)
    alert('Danh mục đã được thêm thành công')
    resetForm()
    isFormVisible.value = false
    await fetchCategories()
  } catch (err) {
    if (err.response?.data?.error) {
      errors.value = { name: err.response?.data.error }
    } else {
      errors.value = err.response?.data || {}
    }
  }
}

const resetForm = () => {
  form.value = {
    id: null,
    name: '',
    status: true,
  }
  errors.value = {}
}

const cancelForm = () => {
  resetForm()
  isFormVisible.value = false
}

const initDataTable = () => {
  $('#categoryTable').DataTable({
    responsive: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/vi.json',
    },
  })
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center">QUẢN LÝ DANH MỤC</h2>
    <hr />
    <button class="btn btn-primary mb-3" @click="openAddForm">Thêm Mới</button>

    <!-- Form trực tiếp trên trang -->
    <div v-if="isFormVisible" class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">{{ modalTitle }}</h5>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">Tên danh mục</label>
            <input
              v-model="form.name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Nhập tên danh mục"
            />
            <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
          </div>
          <div class="mb-3">
            <label for="status" class="form-label">Trạng thái</label>
            <select v-model="form.status" class="form-select" id="status">
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-success me-2">Lưu</button>
            <button type="button" class="btn btn-secondary" @click="cancelForm">Huỷ</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Bảng danh sách -->
    <div class="table-responsive">
      <table id="categoryTable" class="table table-striped table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>{{ category.status ? 'Active' : 'Inactive' }}</td>
            <td>
              <button class="btn btn-warning me-2" @click="openEditForm(category)">Sửa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Tuỳ chỉnh thêm nếu cần */
</style>
