<script>
import { Chart } from 'chart.js/auto'
import axios from 'axios'

export default {
  data() {
    return {
      orderCount: 0,
      userCount: 0,
      productCount: 0,
      categoryCount: 0,
      totalRevenue: 0,
    }
  },
  methods: {
    async loadStats() {
      try {
        const [orderRes, userRes, productRes, categoryRes] = await Promise.all([
          axios.get('http://localhost:8080/api/admin/order'),
          axios.get('http://localhost:8080/api/admin/users'),
          axios.get('http://localhost:8080/api/admin/product/products'),
          axios.get('http://localhost:8080/api/category/list'),
        ])

        const orders = orderRes.data
        const completedOrders = orders.filter((order) => order.status === 3)

        this.orderCount = orders.length
        this.userCount = userRes.data.length
        this.productCount = productRes.data.length
        this.categoryCount = categoryRes.data.length
        this.totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0)

        this.renderCharts(completedOrders, productRes.data)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error)
      }
    },

    renderCharts(orders, products) {
      const revenuePerDay = {}
      orders.forEach((order) => {
        const date = order.orderDate.slice(0, 10)
        revenuePerDay[date] = (revenuePerDay[date] || 0) + order.totalAmount
      })

      const labels = Object.keys(revenuePerDay)
      const data = Object.values(revenuePerDay)

      new Chart(this.$refs.revenueChart, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Doanh Thu (VND)',
              data,
              borderColor: '#007bff',
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
          },
        },
      })

      const categoryMap = {}
      products.forEach((product) => {
        const name = product.categoryName
        categoryMap[name] = (categoryMap[name] || 0) + 1
      })

      const prodLabels = Object.keys(categoryMap)
      const prodData = Object.values(categoryMap)

      new Chart(this.$refs.productChart, {
        type: 'bar',
        data: {
          labels: prodLabels,
          datasets: [
            {
              label: 'Số Lượng Sản Phẩm',
              data: prodData,
              backgroundColor: ['#007bff', '#28a745', '#ffc107', '#f44336'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
          },
        },
      })

      new Chart(this.$refs.customerChart, {
        type: 'pie',
        data: {
          labels: ['Online', 'Cửa Hàng', 'Đại Lý'],
          datasets: [
            {
              data: [60, 25, 15],
              backgroundColor: ['#007bff', '#28a745', '#ffc107'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
          },
        },
      })
    },
  },
  mounted() {
    this.loadStats()
  },
}
</script>
<template>
  <h2 class="text-center">DANH SÁCH ĐƠN HÀNG</h2>
  <br />
  <div class="stats-container">
    <!-- Đơn Hàng -->
    <div class="stat-card">
      <div class="icon-container bg-blue">
        <i class="fa fa-shopping-cart icon"></i>
      </div>
      <div class="stat-info">
        <div class="stat-title">ĐƠN HÀNG</div>
        <div class="stat-value">{{ orderCount }} <a href="/admin/order">(Chi tiết)</a></div>
      </div>
    </div>

    <!-- Khách Hàng -->
    <div class="stat-card">
      <div class="icon-container bg-red">
        <i class="fa fa-user icon"></i>
      </div>
      <div class="stat-info">
        <div class="stat-title">KHÁCH HÀNG</div>
        <div class="stat-value">{{ userCount }} <a href="/admin/user">(Chi tiết)</a></div>
      </div>
    </div>

    <!-- Sản Phẩm -->
    <div class="stat-card">
      <div class="icon-container bg-green">
        <i class="fa fa-box icon"></i>
      </div>
      <div class="stat-info">
        <div class="stat-title">SẢN PHẨM</div>
        <div class="stat-value">{{ productCount }} <a href="/admin/product">(Chi tiết)</a></div>
      </div>
    </div>

    <!-- Danh Mục -->
    <div class="stat-card">
      <div class="icon-container bg-purple">
        <i class="fa fa-list icon"></i>
      </div>
      <div class="stat-info">
        <div class="stat-title">DANH MỤC</div>
        <div class="stat-value">{{ categoryCount }} <a href="/admin/category">(Chi tiết)</a></div>
      </div>
    </div>
  </div>
  <!-- Biểu đồ doanh thu nằm riêng -->
  <div class="chart-container">
    <h3>Doanh Thu Theo Ngày</h3>
    <canvas ref="revenueChart" width="300" height="100"></canvas>
  </div>

  <!-- Hàng chứa 2 biểu đồ nằm ngang -->
  <div class="chart-row">
    <div class="chart-container half">
      <h3>Sản Phẩm</h3>
      <canvas ref="productChart" width="400" height="300"></canvas>
    </div>
    <div class="chart-container half">
      <h3>Nguồn Khách</h3>
      <canvas ref="customerChart" width="400" height="300"></canvas>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: white; /* Màu nền card tổng thể nếu cần */
  color: black;
  width: 260px;
  height: 100px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.stat-info {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Căn giữa theo chiều dọc */
  align-items: center; /* Căn giữa theo chiều ngang */
  text-align: center; /* Đảm bảo chữ căn giữa */
}

.stat-title {
  font-size: 16px;
  font-weight: bold; /* In đậm chữ tiêu đề */
}

.stat-value {
  font-size: 16px;
}

.icon {
  font-size: 28px;
  color: white;
}

/* Màu nền riêng cho icon */
.bg-blue {
  background-color: #00bcd4;
}

.bg-red {
  background-color: #e53935;
}

.bg-green {
  background-color: #43a047;
}

.bg-purple {
  background-color: #9c27b0;
}
.chart-row {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 30px;
}

.chart-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.chart-container.half {
  flex: 1;
}
</style>
