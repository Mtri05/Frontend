<script>
import axios from 'axios'

export default {
  data() {
    return {
      addresses: [],
    }
  },
  methods: {
    // Lấy giá trị cookie theo tên
    getCookie(name) {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop().split(';').shift()
      return null
    },

    // Gọi API lấy danh sách địa chỉ của user
    loadAddresses() {
      const token = localStorage.getItem('token');
      const userId = this.getCookie('userId') // Lấy userId từ cookie
      if (!userId) {
        alert('Không tìm thấy userId trong cookie!')
        return
      }

      // Gọi API để lấy địa chỉ của user dựa trên userId
      axios
        .get(`http://localhost:8080/api/user/addresses/${userId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.addresses = res.data // Cập nhật dữ liệu vào addresses
        })
        .catch((err) => {
          console.error('Lỗi khi lấy địa chỉ:', err)
        })
    },

    // Xóa địa chỉ
    deleteAddress(id) {
      const token = localStorage.getItem('token');
      if (confirm('Bạn có chắc chắn muốn xóa?')) {
        axios
          .delete(`http://localhost:8080/api/user/addresses/${id}`,{
            headers: {
            Authorization: `Bearer ${token}`,
            
          },
          })
          .then(() => {
            this.loadAddresses() // Tải lại danh sách địa chỉ sau khi xóa
          })
          .catch((err) => {
            console.error('Lỗi khi xóa:', err)
          })
      }
    },
  },
  mounted() {
    this.loadAddresses() // Gọi phương thức loadAddresses khi component được mount
  },
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center">📍 Danh Sách Địa Chỉ</h2>

    <div class="mb-3">
      <router-link to="/user/address/form" class="btn btn-primary">
        <i class="bi bi-plus-circle"></i> Thêm Địa Chỉ
      </router-link>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-hover text-center align-middle">
        <thead class="table-dark">
          <tr>
            <th>Tên Khách Hàng</th>
            <th>Số Điện Thoại</th>
            <th>Địa Chỉ</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="address in addresses" :key="address.id">
            <td>{{ address.customerName }}</td>
            <td>{{ address.phone }}</td>
            <td>{{ address.address }}</td>
            <td>
              <div class="d-flex justify-content-center gap-2">
                <router-link
                  :to="`/user/address/edit/${address.id}`"
                  class="btn btn-warning btn-sm"
                >
                  <i class="bi bi-pencil"></i> Sửa
                </router-link>
                <button class="btn btn-danger btn-sm" @click="deleteAddress(address.id)">
                  <i class="bi bi-trash"></i> Xóa
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
