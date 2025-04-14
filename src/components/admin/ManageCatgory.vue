<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";

const form = ref({
  id: null,
  name: "",
  status: true,
});

const errors = ref({});
const categories = ref([]);
const modalTitle = ref("");
const modalInstance = ref(null);

const fetchCategories = async () => {
  // Nếu DataTable đã khởi tạo thì phá huỷ trước
  if ($.fn.DataTable.isDataTable("#categoryTable")) {
    $("#categoryTable").DataTable().destroy();
  }

  const res = await axios.get("http://localhost:8080/api/category/list");
  categories.value = res.data;

  // Chờ DOM render xong dữ liệu
  await nextTick();

  // Khởi tạo lại DataTable
  initDataTable();
};

onMounted(fetchCategories);

const openAddModal = () => {
  form.value = { id: null, name: "", status: true };
  modalTitle.value = "Thêm Mới Danh Mục";
  errors.value = {};
  const modal = new bootstrap.Modal(document.getElementById("categoryModal"));
  modalInstance.value = modal;
  modal.show();
};

const openEditModal = (category) => {
  form.value = { ...category };
  modalTitle.value = "Cập Nhật Danh Mục";
  errors.value = {};
  const modal = new bootstrap.Modal(document.getElementById("categoryModal"));
  modalInstance.value = modal;
  modal.show();
};

// Gửi dữ liệu
const handleSubmit = async () => {
  const categoryData = {
    name: form.value.name,
    status: form.value.status,
  };

  if (form.value.id) {
    await handleUpdate(categoryData);
  } else {
    await handleAdd(categoryData);
  }
};

const handleUpdate = async (categoryData) => {
  try {
    await axios.post(
      `http://localhost:8080/api/category/update/${form.value.id}`,
      categoryData
    );
    alert("Danh mục đã được cập nhật thành công");
    resetForm();
    modalInstance.value.hide(); // đóng modal
    await fetchCategories(); // load lại
  } catch (err) {
    if (err.response?.data?.error) {
      // Hiển thị lỗi từ backend nếu có
      errors.value = { name: err.response?.data.error };
    } else {
      // Xử lý các lỗi khác (nếu có)
      errors.value = err.response?.data || {};
    }
  }
};

const handleAdd = async (categoryData) => {
  try {
    await axios.post("http://localhost:8080/api/category/add", categoryData);
    alert("Danh mục đã được thêm thành công");
    resetForm();
    modalInstance.value.hide(); // đóng modal
    await fetchCategories(); // load lại
  } catch (err) {
    if (err.response?.data?.error) {
      // Hiển thị lỗi từ backend nếu có
      errors.value = { name: err.response?.data.error };
    } else {
      // Xử lý các lỗi khác (nếu có)
      errors.value = err.response?.data || {};
    }
  }
};

// Reset form
const resetForm = () => {
  form.value = {
    id: null,
    name: "",
    status: true,
  };
  errors.value = {};
};

const initDataTable = () => {
  $("#categoryTable").DataTable({
    responsive: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/vi.json",
    },
  });
};
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center">QUẢN LÝ DANH MỤC</h2>
    <hr />
    <button class="btn btn-primary mb-3" @click="openAddModal">Thêm Mới</button>
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
            <td>{{ category.status ? "Active" : "Inactive" }}</td>
            <td>
              <button class="btn btn-warning me-2" @click="openEditModal(category)">
                Sửa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="categoryModal"
    tabindex="-1"
    aria-labelledby="categoryModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="categoryModalLabel">{{ modalTitle }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
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
                <option :value="true">Active</option>
                <option :value="false">Inactive</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Lưu</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tuỳ chỉnh thêm nếu cần */
</style>
