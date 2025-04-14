<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  name: '',
  description: '',
  price: 0,
  status: true,
  categoryId: '',
  images: [],
})

const errors = ref({})
const categories = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:8080/api/product/categories')
  categories.value = res.data
})

const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('description', form.value.description)
  formData.append('price', form.value.price)
  formData.append('status', form.value.status)
  formData.append('categoryId', form.value.categoryId)
  for (let file of form.value.images) {
    formData.append('images', file)
  }

  try {
    await axios.post('http://localhost:8080/api/product/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    alert('Lưu thành công')
    router.push('/admin/product')
  } catch (err) {
    errors.value = err.response.data
  }
}
</script>

<template>
  <div class="container p-3">
    <div class="form-container shadow p-4 rounded bg-light">
      <h5 class="text-center mb-4">Thêm Sản Phẩm Mới</h5>
      <form @submit.prevent="handleSubmit">
        <!-- Tên sản phẩm -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Tên sản phẩm</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            placeholder="Nhập tên sản phẩm"
          />
          <div class="text-danger">{{ errors.name }}</div>
        </div>

        <!-- Mô tả -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Mô tả</label>
          <textarea
            v-model="form.description"
            class="form-control"
            rows="3"
            placeholder="Nhập mô tả sản phẩm"
          ></textarea>
          <div class="text-danger">{{ errors.description }}</div>
        </div>

        <!-- Giá -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Giá</label>
          <input
            v-model="form.price"
            type="number"
            class="form-control"
            placeholder="Nhập giá sản phẩm"
          />
          <div class="text-danger">{{ errors.price }}</div>
        </div>

        <!-- Danh mục -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Danh mục</label>
          <select v-model="form.categoryId" class="form-select">
            <option disabled value="">Chọn danh mục</option>
            <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
          <div class="text-danger">{{ errors.categoryId }}</div>
        </div>

        <!-- Hình ảnh -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Hình ảnh</label>
          <input
            type="file"
            multiple
            @change="(e) => (form.images = Array.from(e.target.files))"
            class="form-control"
          />
          <div class="text-danger">{{ errors.images }}</div>
        </div>

        <!-- Nút hành động -->
        <div class="mb-2">
          <button type="submit" class="btn btn-primary me-2">Thêm sản phẩm</button>
          <a href="/admin/product" class="btn btn-secondary">Quay lại</a>
        </div>
      </form>
    </div>
  </div>
</template>
