<script setup>
import "@/assets/main.js";
</script>
<template>
  <div class="container my-1">
    <div class="section" data-aos="fade-up">
      <div class="slide-container">
        <div class="slide">
          <div
            class="item"
            style="
              background-image: url(https://mcdn.wallpapersafari.com/medium/37/81/JIORP3.jpg);
            "
          >
            <div class="content">
              <div class="name">Nike</div>
              <div class="des">Thương hiệu thể thao toàn cầu, dẫn đầu về phong cách và công nghệ.</div>
              <a href="/product"><button class="view-more">Xem sản phẩm</button></a>
            </div>
          </div>

          <div
            class="item"
            style="
              background-image: url(https://mcdn.wallpapersafari.com/medium/10/28/372VtH.jpg);
            "
          >
            <div class="content">
              <div class="name">Adidas</div>
              <div class="des">Hãng thời trang thể thao đẳng cấp, nổi bật với thiết kế sáng tạo.</div>
              <a href="/product"><button class="view-more">Xem sản phẩm</button></a>
            </div>
          </div>

          <div
            class="item"
            style="
              background-image: url(https://mcdn.wallpapersafari.com/medium/22/52/0kxYfX.png);
            "
          >
            <div class="content">
              <div class="name">Puma</div>
              <div class="des">Phong cách thể thao mạnh mẽ, nổi bật với các dòng sản phẩm hiện đại.</div>
              <a href="/product"><button class="view-more">Xem sản phẩm</button></a>
            </div>
          </div>

          <div
            class="item"
            style="
              background-image: url(https://w0.peakpx.com/wallpaper/163/418/HD-wallpaper-reebok-logo-blue-background-reebok-3d-logo-3d-art-reebok-brands-logo-blue-3d-reebok-logo.jpg);
            "
          >
            <div class="content">
              <div class="name">Reebok</div>
              <div class="des">Giày thể thao và thời trang sáng tạo, dành cho mọi tín đồ yêu thể thao.</div>
              <a href="/product"><button class="view-more">Xem sản phẩm</button></a>
            </div>
          </div>

          <div
            class="item"
            style="
              background-image: url(https://w0.peakpx.com/wallpaper/174/722/HD-wallpaper-under-armour-carbon-logo-grunge-art-carbon-background-creative-under-armour-black-logo-fashion-brands-under-armour-logo-under-armour.jpg);
            "
          >
            <div class="content">
              <div class="name">Under Armour</div>
              <div class="des">Nổi bật với sản phẩm thể thao chất lượng cao, bảo vệ và hỗ trợ cơ thể tối ưu.</div>
              <a href="/product"><button class="view-more">Xem sản phẩm</button></a>
            </div>
          </div>
          <!-- <div class="item"
                        style="background-image: url(https://taothuonghieu.com/wp-content/uploads/2023/10/3-khac-biet-chien-luoc-thuong-hieu-Nike.webp.webp);">
                        <div class="content">
                            <div class="name">Ireland</div>
                            <div class="des">Lorem ipsum dolor, sit amet!</div>
                            <button>see more</button>
                        </div>
                    </div> -->
        </div>
        <div class="button">
          <button class="prev"><i class="bi bi-arrow-left"></i></button>
          <button class="next"><i class="bi bi-arrow-right"></i></button>
        </div>
      </div>
    </div>
    <div class="trending-section mt-4">
      <div class="section" data-aos="fade-up">
        <div class="container">
          <!-- Tiêu đề và nút Shop với nút điều hướng -->
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="fw-bold">Trending Now: Espresso</h2>
            <div class="shop-controls">
              <button class="shop-btn">Shop</button>
              <button class="nav-btn nav-btn-left disabled" id="btnLeft">
                <i class="bi bi-chevron-left"></i>
              </button>
              <button class="nav-btn nav-btn-right" id="btnRight">
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
          <!-- <div class="products-container" id="productsContainer">
          <div class="col-md-3 col-sm-6 mb-4">
            <div class="product-card text-center">
              <i
                class="favorite-icon bi bi-heart"
                data-product-id="${product.id}"
                onclick="toggleFavorite(this)"
              >
              </i>
              <img
                src="/images/${product.images[0].name}"
                alt="${product.name}"
                class="img-fluid"
              />
              <h5>${product.name}</h5>
              <p class="text-danger">${product.price} VND</p>
              <a href="/product/detail?productId=${product.id}" class="btn btn-primary">
                Chi Tiết
              </a>
            </div>
          </div>
        </div> -->
        </div>
      </div>
      <div class="section" data-aos="fade-up">
        <div class="container mt-5">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="fw-bold">Shop By Sport</h2>
            <div class="shop-controls">
              <button class="nav-btn nav-btn-left" id="sportBtnLeft">
                <i class="bi bi-chevron-left"></i>
              </button>
              <button class="nav-btn nav-btn-right" id="sportBtnRight">
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
          <div
            class="d-flex align-items-center justify-content-between position-relative"
          >
            <!-- Danh sách các môn thể thao -->
            <div class="products-container" id="sportsContainer">
              <div class="product-card">
                <img
                  src="@/assets/images/Running.jpg"
                  class="card-img-top"
                  alt="Running"
                />
                <button class="sport-btn">Running</button>
              </div>
              <div class="product-card">
                <img
                  src="@/assets/images/Football.jpg"
                  class="card-img-top"
                  alt="Football"
                />
                <button class="sport-btn">Football</button>
              </div>
              <div class="product-card">
                <img
                  src="@/assets/images/Basketball.jpg"
                  class="card-img-top"
                  alt="Basketball"
                />
                <button class="sport-btn">Basketball</button>
              </div>
              <div class="product-card">
                <img
                  src="@/assets/images/Training & Gym.jpg"
                  class="card-img-top"
                  alt="Training & Gym"
                />
                <button class="sport-btn">Training & Gym</button>
              </div>
              <div class="product-card">
                <img src="@/assets/images/Tennis.jpg" class="card-img-top" alt="Tennis" />
                <button class="sport-btn">Tennis</button>
              </div>
              <div class="product-card">
                <img src="@/assets/images/Yoga.jpg" class="card-img-top" alt="Yoga" />
                <button class="sport-btn">Yoga</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./src/assets/css/main.css"></style>
