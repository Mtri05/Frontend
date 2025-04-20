document.addEventListener("DOMContentLoaded", function () {
    setupTrendingSlider();
    setupSportsSlider();
    setupFavoriteIcons();
});

// 👉 Xử lý cuộn sản phẩm "Trending Now"
function setupTrendingSlider() {
    const btnLeft = document.getElementById("btnLeft");
    const btnRight = document.getElementById("btnRight");
    const productsContainer = document.getElementById("productsContainer");

    if (!btnLeft || !btnRight || !productsContainer) return;

    const productWidth = document.querySelector(".product-card")?.offsetWidth + 20 || 200;
    let scrollAmount = 0;
    const maxScroll = productsContainer.scrollWidth - productsContainer.clientWidth;

    function updateButtonState() {
        btnLeft.classList.toggle("disabled", scrollAmount <= 0);
        btnRight.classList.toggle("disabled", scrollAmount >= maxScroll);
    }

    btnRight.addEventListener("click", function () {
        if (scrollAmount < maxScroll) {
            scrollAmount += productWidth;
            productsContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
        updateButtonState();
    });

    btnLeft.addEventListener("click", function () {
        if (scrollAmount > 0) {
            scrollAmount -= productWidth;
            productsContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
        updateButtonState();
    });

    updateButtonState();
}

// 👉 Xử lý cuộn danh sách "Shop By Sport"
function setupSportsSlider() {
    const sportBtnLeft = document.getElementById("sportBtnLeft");
    const sportBtnRight = document.getElementById("sportBtnRight");
    const sportsContainer = document.getElementById("sportsContainer");

    if (!sportBtnLeft || !sportBtnRight || !sportsContainer) return;

    const sportWidth = document.querySelector(".product-card")?.offsetWidth + 20 || 200;
    let scrollAmount = 0;
    const maxScroll = sportsContainer.scrollWidth - sportsContainer.clientWidth;

    function updateButtonState() {
        sportBtnLeft.classList.toggle("disabled", scrollAmount <= 0);
        sportBtnRight.classList.toggle("disabled", scrollAmount >= maxScroll);
    }

    sportBtnRight.addEventListener("click", function () {
        if (scrollAmount < maxScroll) {
            scrollAmount += sportWidth;
            sportsContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
        updateButtonState();
    });

    sportBtnLeft.addEventListener("click", function () {
        if (scrollAmount > 0) {
            scrollAmount -= sportWidth;
            sportsContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
        updateButtonState();
    });

    updateButtonState();
}

// 👉 Xử lý biểu tượng yêu thích
function setupFavoriteIcons() {
    const favoriteIcons = document.querySelectorAll(".favorite-icon");

    favoriteIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            this.classList.toggle("active");
            toggleFavorite(this);
        });
    });
}

function toggleFavorite(icon) {
    let productId = icon.getAttribute("data-product-id");
    let isFavorite = icon.classList.contains("bi-heart-fill");

    let url = isFavorite ? `/user/favorite/remove/${productId}` : `/user/favorite/add/${productId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                icon.classList.toggle("bi-heart-fill");
                icon.classList.toggle("bi-heart");
                icon.classList.toggle("text-danger");
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error("Lỗi:", error));
}

document.addEventListener("DOMContentLoaded", () => {
    setupTrendingSlider();
    setupSportsSlider();
    setupFavoriteIcons();
    setupMainSlider(); // slide chính
});

function setupMainSlider() {
    const $next = document.querySelector('.next');
    const $prev = document.querySelector('.prev');
    const slide = document.querySelector('.slide');

    if ($next && $prev && slide) {
        $next.addEventListener('click', () => {
            const items = document.querySelectorAll('.item');
            slide.appendChild(items[0]);
        });

        $prev.addEventListener('click', () => {
            const items = document.querySelectorAll('.item');
            slide.prepend(items[items.length - 1]);
        });

        // Nếu muốn xử lý click vào từng item
        document.querySelectorAll('.item').forEach((item) => {
            item.addEventListener('click', () => {
                // Xử lý gì đó
            });
        });
        setInterval(() => {
            const items = document.querySelectorAll('.item');
            slide.appendChild(items[0]);
        }, 3000);
    }
}
