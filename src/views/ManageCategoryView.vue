<script setup>
import SideBar from '../components/admin/SideBar.vue'
import ManageCatgory from '../components/admin/ManageCatgory.vue'
</script>
<template>
  <main class="admin-layout">
    <SideBar />
    <div class="content">
      <ManageCatgory />
    </div>
  </main>
</template>
<style scoped>
.admin-layout {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
  transition: all 0.3s ease;
  margin-left: 250px; /* để tránh đè sidebar */
}

/* Khi vào mobile, bỏ margin-left */
@media (max-width: 768px) {
  .content {
    margin-left: 100px;
  }
}
</style>

