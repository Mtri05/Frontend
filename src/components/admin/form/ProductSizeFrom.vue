<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const productId = Number(route.query.productId)

const allSizes = ref([])
const selectedSizeIds = ref([])
const quantities = ref({})
const productName = ref('')

const loadSizes = async () => {
  const res = await axios.get('http://localhost:8080/api/admin/product/size')
  allSizes.value = res.data
}

const loadProductName = async () => {
  const res = await axios.get(`http://localhost:8080/api/admin/product/${productId}`)
  productName.value = res.data.name
}

const submitSizes = async () => {
  const dataToSend = selectedSizeIds.value.map((sizeId) => ({
    productId,
    sizeId,
    stock: quantities.value[sizeId] || 0,
  }))

  if (dataToSend.length === 0) {
    alert('Vui lòng chọn ít nhất một size và nhập số lượng.')
    return
  }

  try {
    await axios.post('http://localhost:8080/api/admin/product/productSize/add', dataToSend)
    alert('Thêm size thành công!')
    router.push(`/admin/product/sizes?productId=${productId}`)
  } catch (err) {
    console.error('Lỗi khi thêm size:', err)
    alert('Thêm size thất bại!')
  }
}

onMounted(() => {
  loadSizes()
  loadProductName()
})
</script>

<template>
  <div class="container mt-4">
    <h3 class="text-center">
      THÊM SIZE CHO SẢN PHẨM: <strong>{{ productName }}</strong>
    </h3>
    <hr />

    <!-- Select chọn nhiều size -->
    <div class="mb-3">
      <label for="sizeSelect" class="form-label">Chọn size:</label>
      <select id="sizeSelect" class="form-select" multiple v-model="selectedSizeIds">
        <option v-for="size in allSizes" :value="size.id" :key="size.id">
          {{ size.name }}
        </option>
      </select>
    </div>

    <!-- Nhập số lượng cho từng size được chọn -->
    <div class="row">
      <div class="col-md-4 mb-3" v-for="sizeId in selectedSizeIds" :key="sizeId">
        <label class="form-label">
          Nhập số lượng cho size:
          <strong>{{ allSizes.find((s) => s.id === sizeId)?.name }}</strong>
        </label>
        <input
          type="number"
          class="form-control"
          v-model="quantities[sizeId]"
          min="0"
          placeholder="Số lượng tồn"
        />
      </div>
    </div>

    <div class="text-end">
      <button class="btn btn-primary" @click="submitSizes">Xác nhận thêm</button>
    </div>
  </div>
</template>
