<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const addresses = ref([])
const route = useRoute()
const userId = ref(route.query.userId)

const token = localStorage.getItem('token')

const fetchAddresses = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/admin/addresses/${userId.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    addresses.value = response.data
    console.log('Danh sách địa chỉ:', addresses.value)

    await nextTick()
    initDataTable()
  } catch (error) {
    console.error('Lỗi khi lấy danh sách địa chỉ:', error)
  }
}

const initDataTable = () => {
  const table = $('#addressTable')
  if ($.fn.dataTable.isDataTable('#addressTable')) {
    table.DataTable().destroy()
  }

  table.DataTable({
    responsive: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/vi.json',
    },
  })
}

onMounted(() => {
  fetchAddresses()
})
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center">Danh Sách Địa Chỉ</h2>

    <div class="table-responsive">
      <table id="addressTable" class="table table-bordered table-hover text-center align-middle">
        <thead class="table-dark">
          <tr>
            <th>Tên Khách Hàng</th>
            <th>Số Điện Thoại</th>
            <th>Địa Chỉ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="address in addresses" :key="address.id">
            <td>{{ address.customerName }}</td>
            <td>{{ address.phone }}</td>
            <td>{{ address.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  #addressTable td img {
    width: 40px;
    height: 40px;
  }

  #addressTable td,
  #addressTable th {
    font-size: 14px;
  }
}
</style>
