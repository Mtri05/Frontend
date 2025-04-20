<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import axios from "axios"

const route = useRoute()
const router = useRouter()
const productId = Number(route.query.productId)

const token = localStorage.getItem('token');

const form = ref({
  name: '',
  description: '',
  price: 0,
  status: true,
  categoryId: '',
  images: [],
})


const categories = ref([])
const errors = ref({})

// Load all categories
const loadCategories = async () => {
  const res = await axios.get('http://localhost:8080/api/admin/product/categories',{
    headers: {
    Authorization: `Bearer ${token}`,

  },
  })
  categories.value = res.data
}

// Load product details if editing
const loadProduct = async () => {
  if (!productId) return
  try {
    const res = await axios.get(`http://localhost:8080/api/admin/product/${productId}`,{
      headers: {
    Authorization: `Bearer ${token}`,

  },
    })
    const product = res.data
    console.log(product)

    form.value.name = product.name
    form.value.description = product.description
    form.value.price = product.price
    form.value.status = product.status
    form.value.categoryId = product.category.id
    form.value.categoryNames = product.categoryNames
  } catch (err) {
    console.error('Cannot load product', err)
  }
}

onMounted(async () => {
  await loadCategories()
  await loadProduct()
})

const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('description', form.value.description)
  formData.append('price', form.value.price)
  formData.append('status', form.value.status)
  formData.append('categoryId', form.value.categoryId)
  if (form.value.images.length > 0) {
    for (const img of form.value.images) {
      formData.append('images', img)
    }
  }

  try {
    if (productId) {
      await axios.post(`http://localhost:8080/api/admin/product/update/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' ,
          Authorization: `Bearer ${token}`,
        },
      })
      alert('Cập nhật thành công')
      router.push('/admin/product')
    } else {
      await axios.post('http://localhost:8080/api/admin/product/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
         },

      })
      alert('Thêm thành công')
      router.push('/admin/product')
    }

    form.value = {
      name: '',
      description: '',
      price: 0,
      status: true,
      categoryId: '',
      images: [],
    }
    errors.value = {}
  } catch (err) {
    if (err.response?.data) {
      errors.value = err.response.data
    } else {
      console.error('Unknown error', err)
    }
  }
}
</script>

<template>
  <div class="container p-3">
    <div class="form-container shadow p-4 rounded bg-light">
      <h5 class="text-center mb-4">{{ productId ? 'Sửa sản phẩm' : 'Thêm sản phẩm' }}</h5>
      <form @submit.prevent="handleSubmit">
        <!-- Tên sản phẩm -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Tên sản phẩm</label
          ><input
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
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
          <div class="text-danger">{{ errors.categoryId }}</div>
        </div>

        <!-- Trạng thái -->
        <div class="mb-3">
          <label for="status" class="form-label fw-semibold">Trạng thái</label>
          <select v-model="form.status" class="form-select" id="status" name="status">
            <option :value="true">Active</option>
            <option :value="false">Inactive</option>
          </select>
        </div>

        <!-- Hình ảnh -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Hình ảnh</label>
          <input
            type="file"
            accept="image/*"
            multiple
            @change="(e) => (form.images = Array.from(e.target.files))"
            class="form-control"
          />
          <div class="text-danger">{{ errors.images }}</div>
        </div>

        <!-- Nút hành động -->
        <div class="mb-2">
          <button type="submit" class="btn btn-primary me-2">
            {{ productId ? 'Sửa sản phẩm' : 'Thêm sản phẩm' }}
          </button>
          <a href="/admin/product" class="btn btn-secondary">Quay lại</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.text-danger {
  font-size: 13px;
  color: red;
}
</style>
