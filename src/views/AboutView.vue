<script setup>
import Header from '../components/User/Header.vue'
import Footer from '../components/User/Footer.vue'
</script>

<template>
  <main>
    <Header />
    <section class="about-page">
    <div class="container">
      <div class="d-flex align-items-center mb-4">
      <a href="/" class="text-decoration-none d-flex align-items-center">
        <i class="bi bi-house-fill text-dark me-2"></i>
      </a>
      <span class="mx-1 text-muted">|</span>
      <span class="text-dark">Trang Giới Thiệu</span>
    </div>
      <h2 class="about-title">Về Fpoly Shop</h2>

      <!-- Giới thiệu -->
      <div class="about-content">
        <div class="about-text">
          <p>
            <strong>Fpoly Shop</strong> là cửa hàng thời trang chuyên cung cấp các sản phẩm **chính hãng (authentic)** từ những thương hiệu nổi tiếng như <strong>Nike, Adidas, Gucci, Balenciaga, Louis Vuitton</strong> và nhiều hơn nữa.
          </p>
          <p>
            Chúng tôi không chỉ bán hàng – chúng tôi mang đến **trải nghiệm thời trang cao cấp** cho khách hàng tại Việt Nam, đặc biệt là giới trẻ đam mê phong cách hiện đại, cá tính.
          </p>
          <p>
            ✅ Fpoly Shop cam kết:
          </p>
          <ul>
            <li>✔️ Hàng chính hãng 100%, nói không với hàng giả.</li>
            <li>🚀 Giao hàng toàn quốc, nhanh và an toàn.</li>
            <li>💬 Tư vấn tận tâm, hỗ trợ 24/7.</li>
            <li>🔁 Chính sách đổi trả trong vòng 7 ngày.</li>
            <li>🧾 Hóa đơn rõ ràng, minh bạch.</li>
          </ul>
        </div>
        <div class="about-image">
          <img src="@/assets/images/cuahang.jpg" alt="Fpoly Shop Store" />

        </div>
      </div>

      <!-- Câu hỏi thường gặp (FAQ) -->
      <div class="faq-section mt-5">
        <h3 class="faq-title">❓ Câu Hỏi Thường Gặp</h3>
        <div class="faq-list">
          <div class="faq-item">
            <h5>🔸 Fpoly Shop có cam kết hàng chính hãng không?</h5>
            <p>Có. Chúng tôi nhập khẩu trực tiếp từ các nguồn uy tín và đảm bảo 100% sản phẩm là hàng chính hãng.</p>
          </div>
          <div class="faq-item">
            <h5>🔸 Có thể đổi trả hàng sau khi nhận không?</h5>
            <p>Có, trong vòng 7 ngày kể từ khi nhận hàng, nếu sản phẩm chưa qua sử dụng và còn nguyên tem mác.</p>
          </div>
          <div class="faq-item">
            <h5>🔸 Thời gian giao hàng là bao lâu?</h5>
            <p>Thông thường từ 2–5 ngày làm việc, tùy thuộc vào khu vực.</p>
          </div>
          <div class="faq-item">
            <h5>🔸 Có cần thanh toán trước không?</h5>
            <p>Không bắt buộc. Fpoly Shop hỗ trợ **COD (thanh toán khi nhận hàng)** hoặc chuyển khoản.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
    <Footer />
  </main>
</template>

<style scoped>
.about-page {
  padding: 40px 20px;
  background-color: #f9f9f9;
}

.about-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: bold;
}

.about-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: center;
  margin-bottom: 50px;
}

.about-text {
  flex: 1 1 55%;
  font-size: 1.1rem;
  line-height: 1.7;
}

.about-text ul {
  padding-left: 20px;
  margin: 10px 0;
}

.about-text ul li {
  margin-bottom: 10px;
}

.about-image {
  flex: 1 1 40%;
  text-align: center;
}

.about-image img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

/* FAQ Section */
.faq-section {
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}

.faq-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.faq-item {
  margin-bottom: 20px;
}

.faq-item h5 {
  margin-bottom: 5px;
  color: #333;
  font-weight: 600;
}

.faq-item p {
  margin: 0;
  color: #555;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
  }

  .about-text,
  .about-image {
    flex: 1 1 100%;
  }

  .about-title {
    font-size: 1.6rem;
  }

  .faq-title {
    font-size: 1.3rem;
  }
}
</style>
