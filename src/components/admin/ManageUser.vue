<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

const users = ref([])

const initDataTable = () => {
  const table = $('#userTable')
  if ($.fn.dataTable.isDataTable('#userTable')) {
    table.DataTable().destroy()
  }

  table.DataTable({
    responsive: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/vi.json',
    },
  })
}

const loadUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/admin/users')
    console.log(response.data)
    users.value = response.data

    await nextTick()
    initDataTable()
  } catch (error) {
    console.error('Lỗi khi tải danh sách khách hàng:', error)
    const errorMessage = document.getElementById('error-message')
    if (errorMessage) {
      errorMessage.style.display = 'block'
      errorMessage.textContent = 'Không thể tải dữ liệu khách hàng!'
    }
  }
}

onMounted(() => {
  loadUsers()
})

const updateStatus = async (userId, newStatus) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/admin/users/${userId}/status`,
      newStatus,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log('Trạng thái đã được cập nhật')
    alert('Cập nhật trạng thái thành công!')
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái:', error)
    const errorMessage = document.getElementById('error-message')
    if (errorMessage) {
      errorMessage.style.display = 'block'
      errorMessage.textContent = 'Không thể cập nhật trạng thái!'
    }
  }
}
</script>
<template>
  <div class="container mt-4">
    <h2 class="text-center">DANH SÁCH NGƯỜI DÙNG</h2>
    <hr />
    <div class="alert alert-danger" style="display: none" id="error-message"></div>
    <div class="table-responsive">
      <!-- Bảng danh sách người dùng -->
      <table id="userTable" class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Avatar</th>
            <th>Email</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <!-- Lặp qua danh sách người dùng -->
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>
              <img
                :src="
                  user.avatar
                    ? `http://localhost:8080/images/${user.avatar}`
                    : '/default-avatar.png'
                "
                alt="avatar"
                width="40"
                height="40"
              />
            </td>

            <td>{{ user.email }}</td>
            <td>
              <select
                v-model="user.status"
                class="form-select form-select-sm"
                @change="updateStatus(user.id, user.status)"
              >
                <option :value="true" :selected="user.status">Hoạt động</option>
                <option :value="false" :selected="!user.status">Không hoạt động</option>
              </select>
            </td>
            <td>
              <a :href="`/admin/address/list?userId=${user.id}`">
                <button class="btn btn-primary btn-sm">Xem địa chỉ</button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  #userTable td img {
    width: 40px;
    height: 40px;
  }

  #userTable td,
  #userTable th {
    font-size: 14px;
  }
}
</style>
