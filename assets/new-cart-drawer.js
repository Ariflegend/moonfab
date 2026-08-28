document.addEventListener("DOMContentLoaded", function () {
    fetch('/cart.js')
        .then(response => response.json())
        .then(data => {
            console.log("🛒 Cart Data:", data);

            if (data.currency) {
                shopCurrency = data.currency; // Set currency dynamically
            }

            if (data.items.length > 0) {
                let productId = Number(data.items[0].product_id); // Ensure it's a number
                console.log("✅ First product ID:", productId);

                if (!isNaN(productId)) {
                    fetchRecommendations(productId);
                } else {
                    console.error("❌ Invalid product ID:", productId);
                }
            } else {
                console.warn("⚠ Cart is empty!");
            }
        })
        .catch(error => console.error("❌ Error fetching cart:", error));
});

function fetchRecommendations(productId) {
    let recommendationsUrl = `/recommendations/products.json?product_id=${productId}&limit=8`;

    fetch(recommendationsUrl)
        .then(response => response.json())
        .then(data => {
            console.log("🔍 Recommendations API Response:", data);

            if (data && data.products && data.products.length > 0) {
                renderRecommendations(data.products);
                initializeSwiper(); // Initialize Swiper after rendering
                enableGrabScroll(); // Enable drag scrolling after rendering
            } else {
                console.warn("⚠ No products found in recommendations!");
            }
        })
        .catch(error => console.error("❌ Error fetching recommendations:", error));
}

// Default currency (will be updated dynamically)
let shopCurrency = "USD"; 

// Function to format price correctly
function formatPrice(cents) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: shopCurrency,
    }).format(cents / 100);
}

function renderRecommendations(products) {
    let container = document.querySelector("#cart-recommendations-containerr .swiper-wrapper");
    let loader = document.querySelector("#cart-recommendations-loader");
    let nextBtn = document.querySelector(".swiper-button-next");
    let prevBtn = document.querySelector(".swiper-button-prev");

    if (!container) {
        console.warn("⚠ Recommendation container not found!");
        return;
    }

    // Show loader, hide navigation buttons
    if (loader) loader.style.display = "block";
    if (nextBtn) nextBtn.classList.add("hidden");
    if (prevBtn) prevBtn.classList.add("hidden");

    // Clear existing recommendations
    container.innerHTML = "";

    setTimeout(() => {
        // Inject new recommendations
        container.innerHTML = products
            .map((product) => {
                const imageUrl = product.featured_image ? product.featured_image : 'https://cdn.shopify.com/s/files/1/0549/2637/7049/files/no-image-icon-6.png?v=1742840739';
                const variantId = product.variants[0]?.id || "";

                const truncateText = (text, maxLength) => {
                    return text.length > maxLength ? text.substring(0, maxLength).trim() + "..." : text;
                };

                const truncatedTitle = truncateText(product.title, 22);

                return `
                <div class="swiper-slide">
                    <a href="${product.url}">
                        <div class="crt-img"><img src="${imageUrl}" alt="${product.title}"></div>
                        <div class="recommnd-cart-info">
                            <p>${truncatedTitle}</p>
                            <span>${formatPrice(product.price)}</span>
                        </div>
                        <div class="recommnd-btns">
                            <button class="add-to-cart-btnn btn btn-primary" data-product-id="${variantId}">Add</button>
                            <a href="${product.url}" class="view-btn btn btn-outline-primary">View</a>
                        </div>
                    </a>
                </div>
                `;
            })
            .join("");

        // Hide loader, show navigation buttons
        if (loader) loader.style.display = "none";
        if (nextBtn) nextBtn.classList.remove("hidden");
        if (prevBtn) prevBtn.classList.remove("hidden");

        // Attach event listeners after rendering
        document.querySelectorAll(".add-to-cart-btnn").forEach(button => {
            button.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                const productId = button.getAttribute("data-product-id");
                if (productId) {
                    addToCart(productId, button);
                } else {
                    console.warn("⚠ No valid variant ID found for this product.");
                }
            });
        });

        // Reinitialize Swiper
        if (window.swiperInstance) {
            window.swiperInstance.destroy(true, true);
        }
        window.swiperInstance = new Swiper(".mySwiper", {
            slidesPerView: 3,
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            scrollbar: {
                el: ".swiper-scrollbar",
                hide: true,
            },
        });

    }, 500); // Delay to simulate loading effect
}


function addToCart(productId, button) {
  // Show loading state
  button.textContent = "Adding...";
  button.disabled = true;
  button.classList.add("loading");

  fetch("/cart/add.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: [{ id: productId, quantity: 1 }],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("✅ Product added to cart:", data);

      // Refresh cart drawer HTML (Shopify section render)
      fetch("/?sections=cart-drawer")
        .then((res) => res.json())
        .then((data) => {
          const html = data["cart-drawer"];
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");

          const newDrawer = doc.querySelector("#CartDrawer");
          const currentDrawer = document.querySelector("#CartDrawer");

          if (newDrawer && currentDrawer) {
            currentDrawer.innerHTML = newDrawer.innerHTML;
          }

          // Optional: open the drawer automatically
          const drawer = document.querySelector("cart-drawer");
          if (drawer) drawer.classList.add("active");
        });

      // Update button state
      button.textContent = "Added";
      button.classList.remove("loading");
      button.classList.add("added-to-cart");
    })
    .catch((error) => {
      console.error("❌ Error adding to cart:", error);
      button.textContent = "Add to Cart";
      button.disabled = false;
      button.classList.remove("loading");
    });
}
function appendCartItem(item) {
  const cartTable = document.querySelector("#CartDrawer table tbody");
  if (!cartTable) return;

  const itemHTML = `
    <tr id="CartDrawer-Item-${item.key}" class="cart-item" role="row">
      <td class="cart-item__media mainn-itm-media" role="cell">
        <a href="${item.url}" class="cart-item__link" tabindex="-1" aria-hidden="true"></a>
        <div class="crt-media-div">
          <img
            class="cart-item__image"
            src="${item.image}"
            alt="${item.product_title}"
            loading="lazy"
            width="150"
          >
        </div>
      </td>

      <td class="cart-item__details" role="cell">
        <a href="${item.url}" class="cart-item__name h4 break">${item.product_title}</a>
        <div class="product-option">${(item.final_price / 100).toFixed(2)} ${Shopify.currency.active}</div>
        <div class="cart-item__quantity">
          <span>x${item.quantity}</span>
        </div>
      </td>

      <td class="cart-item__totals right" role="cell">
        <span class="price price--end">${(item.final_line_price / 100).toFixed(2)} ${Shopify.currency.active}</span>
      </td>
    </tr>
  `;

  // Append to the cart table
  cartTable.insertAdjacentHTML("beforeend", itemHTML);
}



function updateCartCount() {
    fetch('/cart.js')
        .then(res => res.json())
        .then(cart => {
            const cartCount = document.querySelector(".cart-count-bubble");
            if (cartCount) cartCount.textContent = cart.item_count;
        });
}





function updateCartAndRecommendations() {
    fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
            console.log("🛒 Updated Cart:", cart);

            // Update cart count bubble
            let cartCount = document.querySelector(".cart-count-bubble");
            if (cartCount) {
                cartCount.textContent = cart.item_count;
            }

            // **Render recommendations only if cart is not empty**
            if (cart.item_count > 0) {
                if (cart.items.length > 0) {
                    let productId = Number(cart.items[0].product_id);
                    console.log("🔄 Fetching recommendations for product ID:", productId);

                    if (!isNaN(productId)) {
                        fetchRecommendations(productId);
                    }
                }
            } else {
                console.log("🚫 Cart is empty, not rendering recommendations.");
                clearRecommendations();
            }
        })
        .catch(error => console.error("❌ Error fetching cart:", error));
}

// Function to clear recommendations if cart is empty
function clearRecommendations() {
    let container = document.querySelector("#cart-recommendations-containerr .swiper-wrapper");
    if (container) {
        container.innerHTML = ""; // Remove recommendations
    }
}

let previousCartCount = 0;

setInterval(function () {
    fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
            if (cart.item_count !== previousCartCount) {
                console.log("🛒 Cart count changed, updating recommendations...");
                previousCartCount = cart.item_count;
                updateCartAndRecommendations();
            }
        });
}, 3000); // Check every 3 seconds


function initializeSwiper() {
    if (document.querySelector(".mySwiper")) {
        new Swiper("#CartDrawer .mySwiper", {
            slidesPerView: 2, // Adjust as needed
            spaceBetween: 10,
            loop: true,
            grabCursor: true, // Enables grab-and-drag behavior
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 3, // More slides on tablets
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 4, // More slides on desktops
                    spaceBetween: 20,
                },
            },
        });
    }
}

// ✅ Function: Enable Grab Scrolling
function enableGrabScroll() {
    const swiperWrapper = document.querySelector("#CartDrawer .swiper-wrapper");

    if (!swiperWrapper) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    swiperWrapper.addEventListener("mousedown", (e) => {
        isDown = true;
        swiperWrapper.classList.add("grabbing");
        startX = e.pageX - swiperWrapper.offsetLeft;
        scrollLeft = swiperWrapper.scrollLeft;
    });

    swiperWrapper.addEventListener("mouseleave", () => {
        isDown = false;
        swiperWrapper.classList.remove("grabbing");
    });

    swiperWrapper.addEventListener("mouseup", () => {
        isDown = false;
        swiperWrapper.classList.remove("grabbing");
    });

    swiperWrapper.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - swiperWrapper.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed
        swiperWrapper.scrollLeft = scrollLeft - walk;
    });
}