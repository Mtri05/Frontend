<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as bootstrap from 'bootstrap'

const sizes = ref([])
const productName = ref('')

const editStock = ref(0)
const editingId = ref(null)
let modalInstance = null

const route = useRoute()
const productId = Number(route.query.productId)

const token = localStorage.getItem('token');

const loadSizes = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/api/admin/product/sizes?productId=${productId}`,{
      headers: {
    Authorization: `Bearer ${token}`,
    
  },
    })
    sizes.value = res.data
  } catch (err) {
    console.error('Lỗi tải size:', err)
  }
}

const loadProductName = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/api/admin/product/${productId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
    
      },
    })
    productName.value = res.data.name
  } catch (err) {
    console.error('Không thể tải tên sản phẩm:', err)
  }
}
const deleteProductSize = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xóa size này không?')) return

  try {
    await axios.post(`http://localhost:8080/api/admin/product/productSize/delete?id=${id}`,{},{
      
      headers: {
        Authorization: `Bearer ${token}`,
    
      },
    }
    )
    sizes.value = sizes.value.filter((item) => item.id !== id)
    alert('xóa thành công')
  } catch (err) {
    console.error('Lỗi khi xóa:', err)
    const errorBox = document.getElementById('error-message')
    alert('Không thể xóa size. Vui lòng thử lại')
    errorBox.style.display = 'block'
  }
}

const openEditModal = async (item) => {
  editStock.value = item.stock
  editingId.value = item.id

  await nextTick() // Đảm bảo DOM đã render modal
  const modalEl = document.getElementById('editModal')
  if (modalEl) {
    modalInstance = new bootstrap.Modal(modalEl)
    modalInstance.show()
  } else {
    console.error('Không tìm thấy modal DOM')
  }
}

const confirmEdit = async () => {
  try {
    await axios.post('http://localhost:8080/api/admin/product/productSize/update',{
      
      id: editingId.value,
      stock: editStock.value,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    })
    await loadSizes()
    modalInstance.hide()
    alert('Cập nhật thành công')
  } catch (err) {
    console.error('Lỗi cập nhật số lượng:', err)
    alert('Không thể cập nhật số lượng.')
  }
}

onMounted(() => {
  loadProductName()
  loadSizes()
})
</script>

<template>
  <div class="container mt-4">
    <h3 class="text-center">
      DANH SÁCH SIZE CỦA SẢN PHẨM: <strong>{{ productName }}</strong>
    </h3>
    <hr />
    <div class="alert alert-danger" style="display: none" id="error-message"></div>
    <div class="d-flex justify-content-between mb-3">
      <a href="/admin/product" class="btn btn-secondary">Quay lại</a>
      <a :href="`/admin/product/productSizeForm?productId=${productId}`" class="btn btn-primary">
        Thêm size
      </a>
    </div>
    <table class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Size</th>
          <th>Số lượng tồn</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="sizes.length === 0">
          <td colspan="3" class="text-center">Không có size nào</td>
        </tr>
        <tr v-for="item in sizes" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.sizeName }}</td>
          <td>{{ item.stock }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="openEditModal(item)">Sửa</button>
            <button @click="deleteProductSize(item.id)" class="btn btn-danger btn-sm">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal Sửa Số Lượng -->
  <div
    class="modal fade"
    id="editModal"
    tabindex="-1"
    aria-labelledby="editModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editModalLabel">Chỉnh sửa số lượng</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Đóng"
          ></button>
        </div>
        <div class="modal-body">
          <label>Số lượng mới:</label>
          <input type="number" class="form-control" v-model="editStock" min="0" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
          <button type="button" class="btn btn-primary" @click="confirmEdit">Lưu thay đổi</button>
        </div>
      </div>
    </div>
  </div>
</template>
