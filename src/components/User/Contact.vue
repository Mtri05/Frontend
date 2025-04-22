<template>
<div class="container contact-section">
    <div class="d-flex align-items-center mb-4">
      <a href="/" class="text-decoration-none d-flex align-items-center">
        <i class="bi bi-house-fill text-dark me-2"></i>
      </a>
      <span class="mx-1 text-muted">|</span>
      <span class="text-dark">Trang Liên Hệ</span>
    </div>
        <div class="row">
            <!-- Thông tin liên hệ -->
            <div class="col-lg-5 mb-4">
                <div class="info-box p-4">
                    <p><i class="bi bi-geo-alt"></i> 
                        Toà nhà FPT Polytechnic, đường số 22, phường Thường Thạnh, quận Cái Răng, TP Cần Thơ</p>
                    <p><i class="bi bi-telephone"></i> 19006750</p>
                    <p><i class="bi bi-envelope"></i> bangcutenecon@gmail.com</p>
                </div>
                <!-- Form liên hệ -->
                <h5 class="mt-4">Liên hệ với chúng tôi</h5>
                <form>
                    <input type="text" class="form-control mt-2" placeholder="Họ và tên" required>
                    <input type="email" class="form-control mt-2" placeholder="Email" required>
                    <textarea class="form-control mt-2" placeholder="Nội dung" rows="4" required></textarea>
                    <button type="submit" class="btn btn-success btn-sm float-end mt-2">Gửi liên hệ</button>
                </form>
            </div>
            <!-- Bản đồ -->
            <div class="col-lg-7">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.747226599098!2d105.8128714758967!3d21.002429988059197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab935b7bba8f%3A0xa8a86e1ffdc6e14c!2zMjY2IMSQLiDEkOG7iWMgQ8OibiwgTGlldSBHaWFpLCBCYSDEkGluaCwgSGFub2k!5e0!3m2!1sen!2s!4v1711600000000"
                    width="100%" height="500" style="border:0;" allowfullscreen="" loading="lazy">
                </iframe>
            </div>
        </div>
    </div>
    </template>
    
    <style>
        .contact-section {
            padding: 40px 0;
        }

        .info-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
        }

        .info-box i {
            color: #28a745;
            margin-right: 10px;
            transition: transform 0.3s ease-in-out;
            border: 2px solid #28a745;
            /* Viền xanh lá */
            border-radius: 50%;
            /* Bo tròn */
            padding: 8px;
            /* Tạo khoảng cách giữa viền và icon */
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            /* Đảm bảo hình tròn */
            height: 35px;
        }


        .info-box i:hover {
            transform: scale(1.2);
        }

    </style>
    