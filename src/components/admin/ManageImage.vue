<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = Number(route.query.productId)

const imageList = ref([])
const token = localStorage.getItem('token');


const loadImagesByProduct = async () => {
  try {
    if (!productId) return
    const res = await axios.get(`http://localhost:8080/api/admin/product/images?productId=${productId}`,{
      headers: {
    Authorization: `Bearer ${token}`,

  },
    })
    imageList.value = res.data
  } catch (err) {
    console.error('Lỗi khi load ảnh:', err)
  }
}
const deleteImage = async (id) => {
  if (!confirm('Bạn có chắc muốn xóa ảnh này?')) return
  try {
    const formData = new FormData()
    formData.append('id', id)


    const res = await axios.post(`http://localhost:8080/api/admin/product/image/delete`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },

    })


    imageList.value = imageList.value.filter((img) => img.id !== id)
  } catch (err) {
    console.error('Lỗi khi xóa ảnh:', err.response?.data || err.message)
    alert('Không thể xóa ảnh!')
  }
}


onMounted(() => {
  loadImagesByProduct()
})
</script>

<template>
  <div class="container p-3">
    <div class="form-container shadow p-4 rounded bg-light">
      <h5 class="text-center mb-4">Danh sách ảnh sản phẩm</h5>


      <div class="d-flex justify-content-between mb-3">
        <a href="/admin/product" class="btn btn-secondary">Quay lại</a>
        <!-- <button class="btn btn-primary" @click="handleAddImage">Thêm ảnh</button> -->
      </div>


      <div v-if="imageList.length" class="mb-4">
        <label class="form-label fw-semibold">Danh sách ảnh</label>
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ảnh</th>
              <th scope="col">Tên ảnh</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(img, index) in imageList" :key="img.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <img
                  :src="`http://localhost:8080/images/${img.name}`"
                  alt="product image"
                  style="max-width: 100px; max-height: 100px"
                  class="img-thumbnail"
                />
              </td>
              <td>{{ img.name }}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="deleteImage(img.id)">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      <div v-else>
        <p class="text-danger">Không có ảnh sản phẩm nào.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-danger {
  font-size: 13px;
  color: red;
}
</style>
