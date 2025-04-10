<script setup>
import { onMounted, nextTick } from 'vue'

onMounted(async () => {
  await nextTick()
  $('#productTable').DataTable({
    responsive: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/vi.json',
    },
  })
})
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center">DANH SÁCH SẢN PHẨM</h2>
    <hr />
    <div class="alert alert-danger" style="display: none" id="error-message"></div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <!-- Nút thêm mới -->
      <a href="/admin/product/form">
        <button type="button" class="btn btn-primary">Thêm mới</button>
      </a>
    </div>
    <div class="table-responsive">
      <!-- Bảng sản phẩm -->
      <table id="productTable" class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <!-- <th:block th:each="item : ${products}">
						<tr>
							<td th:text="${item.id}"></td>
							<td><img alt=""
								th:src="${'/images/'+item.images.get(0).name}"
								style="width: 50px; height: 50px;"></td>
							<td th:text="${item.name}"></td>
							<td th:text="${item.desc}"></td>
							<td th:text="${#numbers.formatDecimal(item.price, 0, 'COMMA', 0, 'POINT')} + ' VND'"></td>
							<td><span
								th:class="${item.status ? 'badge bg-success' : 'badge bg-danger'}"
								th:text="${item.status ? 'Active' : 'Inactive'}"></span></td>
							<td th:text="${item.category.name}"></td>

							<td class=""><a style="text-decoration: none;"
								th:href="${'/admin/product/form?productId='+item.id}">
									<button class="btn btn-warning btn-sm ">Sửa</button>
							</a> <a style="text-decoration: none;"
								th:href="${'/admin/product/image?productId='+ item.id}">
									<button class="btn btn-secondary btn-sm">Xem ảnh</button>
							</a> <a style="text-decoration: none;"
								th:href="${'/admin/product/size?productId='+item.id}">
									<button class="btn btn-primary btn-sm">Số Lượng</button>
							</a></td>
						</tr>
					</th:block> -->
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
@media (max-width: 768px) {
  #productTable td img {
    width: 40px;
    height: 40px;
  }

  #productTable td,
  #productTable th {
    font-size: 14px;
  }
}
</style>
