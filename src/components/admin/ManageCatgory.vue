<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

const token = localStorage.getItem('token')

const form = ref({
  id: null,
  name: '',
  status: true,
})

const errors = ref({})
const categories = ref([])
const modalTitle = ref('')
const isFormVisible = ref(false)

const fetchCategories = async () => {
  if ($.fn.DataTable.isDataTable('#categoryTable')) {
    $('#categoryTable').DataTable().destroy()
  }

  const res = await axios.get('http://localhost:8080/api/admin/category/list', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
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
  showModal()
}

const openEditForm = (category) => {
  form.value = { ...category }
  modalTitle.value = 'Cập Nhật Danh Mục'
  errors.value = {}
  isFormVisible.value = true
  showModal()
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
    await axios.post(
      `http://localhost:8080/api/admin/category/update/${form.value.id}`,
      categoryData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    alert('Danh mục đã được cập nhật thành công')
    resetForm()
    hideModal()
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
    await axios.post('http://localhost:8080/api/admin/category/add', categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    alert('Danh mục đã được thêm thành công')
    resetForm()
    hideModal()
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

const showModal = () => {
  const modal = new bootstrap.Modal(document.getElementById('categoryModal'))
  modal.show()
}

const hideModal = () => {
  const modalEl = document.getElementById('categoryModal')
  const modalInstance = bootstrap.Modal.getInstance(modalEl)
  modalInstance.hide()
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

    <!-- Modal -->
    <div class="modal fade" id="categoryModal" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="handleSubmit">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitle">{{ modalTitle }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
            </div>
            <div class="modal-body">
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
                  <option :value="true">Hoạt Động</option>
                  <option :value="false">Ngừng Hoạt Động</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button type="submit" class="btn btn-success">Lưu</button>
            </div>
          </form>
        </div>
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
            <td>
              <span :class="category.status ? 'badge bg-success' : 'badge bg-danger'">
                {{ category.status ? 'Hoạt Động' : 'Ngừng Bán' }}
              </span>
            </td>
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
