<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const address = ref({
  customerName: '',
  phone: '',
  address: '',
  user: { id: null }
})

const error = ref(null)
const successMessage = ref(null)
const router = useRouter()

// Lấy userId từ cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

// Tỉnh/Quận/Xã
const provinces = ref([])
const districts = ref([])
const wards = ref([])

const selectedProvince = ref(null)
const selectedDistrict = ref(null)
const selectedWard = ref(null)

onMounted(async () => {
  const res = await axios.get('https://provinces.open-api.vn/api/?depth=3')
  provinces.value = res.data
})

// Khi chọn tỉnh
const onProvinceChange = () => {
  const province = provinces.value.find(p => p.code == selectedProvince.value)
  districts.value = province?.districts || []
  wards.value = []
  selectedDistrict.value = null
  selectedWard.value = null
}

// Khi chọn quận/huyện
const onDistrictChange = () => {
  const district = districts.value.find(d => d.code == selectedDistrict.value)
  wards.value = district?.wards || []
  selectedWard.value = null
}

// Lưu địa chỉ
const saveAddress = async () => {
  error.value = null
  successMessage.value = null

  if (!address.value.customerName.trim()) {
    error.value = 'Tên không được bỏ trống.'
    return
  }

  if (!address.value.phone.trim()) {
    error.value = 'Số điện thoại không được bỏ trống.'
    return
  }

  const isTenDigits = /^[0-9]{10}$/.test(address.value.phone)
  if (!isTenDigits) {
    error.value = 'Số điện thoại phải có đúng 10 chữ số.'
    return
  }

  const validPrefix = /^(03|05|07|08|09)/.test(address.value.phone)
  if (!validPrefix) {
    error.value = 'Số điện thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09.'
    return
  }

  // Kiểm tra Tỉnh/Quận/Xã
  if (!selectedProvince.value || !selectedDistrict.value || !selectedWard.value) {
    error.value = 'Vui lòng chọn đầy đủ Tỉnh/Quận/Xã.'
    return
  }

  if (!address.value.address.trim()) {
    error.value = 'Vui lòng nhập địa chỉ cụ thể (số nhà, tên đường...).'
    return
  }

  // Lấy tên từ code
  const provinceName = provinces.value.find(p => p.code == selectedProvince.value)?.name || ''
  const districtName = districts.value.find(d => d.code == selectedDistrict.value)?.name || ''
  const wardName = wards.value.find(w => w.code == selectedWard.value)?.name || ''

  // Gộp địa chỉ đầy đủ
  address.value.address = `${address.value.address}, ${wardName}, ${districtName}, ${provinceName}`

  const userId = getCookie('userId')
  if (userId) {
    address.value.user.id = parseInt(userId)
  }

  try {
    const response = await axios.post('http://localhost:8080/api/addresses/create', address.value)
    successMessage.value = 'Địa chỉ đã được thêm thành công.'
    address.value.customerName = ''
    address.value.phone = ''
    address.value.address = ''
    selectedProvince.value = null
    selectedDistrict.value = null
    selectedWard.value = null
    districts.value = []
    wards.value = []
  } catch (err) {
    console.error('❌ Lỗi khi thêm địa chỉ:', err)
    error.value = err.response?.data || 'Đã xảy ra lỗi khi thêm địa chỉ.'
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <h2 class="text-center">Thêm Địa Chỉ</h2>

        <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>
        <div v-if="successMessage" class="alert alert-success text-center">{{ successMessage }}</div>

        <form @submit.prevent="saveAddress">
          <div class="mb-3">
            <label for="customerName" class="form-label">Tên người nhận:</label>
            <input v-model="address.customerName" type="text" class="form-control" id="customerName" />
          </div>

          <div class="mb-3">
            <label for="phone" class="form-label">Số điện thoại:</label>
            <input v-model="address.phone" type="text" class="form-control" id="phone" />
          </div>

          <!-- Chọn tỉnh -->
          <div class="mb-3">
            <label class="form-label">Tỉnh / Thành phố:</label>
            <select v-model="selectedProvince" @change="onProvinceChange" class="form-select">
              <option value="">-- Chọn Tỉnh --</option>
              <option v-for="province in provinces" :key="province.code" :value="province.code">
                {{ province.name }}
              </option>
            </select>
          </div>

          <!-- Chọn huyện -->
          <div class="mb-3" v-if="districts.length > 0">
            <label class="form-label">Quận / Huyện:</label>
            <select v-model="selectedDistrict" @change="onDistrictChange" class="form-select">
              <option value="">-- Chọn Quận/Huyện --</option>
              <option v-for="district in districts" :key="district.code" :value="district.code">
                {{ district.name }}
              </option>
            </select>
          </div>

          <!-- Chọn xã -->
          <div class="mb-3" v-if="wards.length > 0">
            <label class="form-label">Xã / Phường:</label>
            <select v-model="selectedWard" class="form-select">
              <option value="">-- Chọn Xã/Phường --</option>
              <option v-for="ward in wards" :key="ward.code" :value="ward.code">
                {{ ward.name }}
              </option>
            </select>
          </div>

          <!-- Nhập số nhà, tên đường -->
          <div class="mb-3">
            <label for="address" class="form-label">Địa chỉ cụ thể (Số nhà, tên đường...):</label>
            <input v-model="address.address" type="text" class="form-control" id="address" />
          </div>

          <div class="d-flex justify-content-start gap-2">
            <button type="submit" class="btn btn-primary">Thêm Địa Chỉ</button>
            <a href="/user/address" class="btn btn-secondary">Quay lại</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
