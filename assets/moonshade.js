document.addEventListener("DOMContentLoaded", function () {
  let popup = document.getElementById("popup-container");
  let popup_anchors = document.getElementById("popup-container-anchors");
  let view_anchors = document.getElementById("view_anchors");
  

  if (!popup) {
    console.error("🚨 Pop-up elements not found! Check your HTML.");
    return;
  }

  // ✅ Listen for Add to Cart form submissions dynamically
  document.body.addEventListener("submit", function (event) {
    let form = event.target.closest("form[action='/cart/add']");

    if (form) {
      event.preventDefault(); // ❌ Default form submission roko

      let formData = new FormData(form); // 🔄 Form data le lo

      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log("✅ Product added to cart:", data);

        // ✅ Pop-up Show Karo
        popup.style.display = "flex";
        refreshCartDrawer();
        updateCartCounter();

        // ✅ Cart count update ke liye fetch request
        return fetch("/cart.js").then(response => response.json());
      })
      .then(cartData => {
        let cartCount = document.querySelector(".cart-count-bubble .cart-count");
        if (cartCount) {
          cartCount.textContent = cartData.item_count; // 🔢 Cart count update
        }
      })
      .catch(error => console.error("❌ Error adding to cart:", error));
    }
  });

  document.querySelectorAll(".close-btn").forEach(function (closeBtn) {
    // ❌ Close button click kare to pop-up hide karo
    closeBtn.addEventListener("click", function () {
      popup.style.display = "none";
      popup_anchors.style.display = "none";
    });
  });

  // ❌ Agar background pe click kare to bhi pop-up band ho
  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });

  view_anchors.addEventListener("click", function () {
    popup.style.display = "none";
    popup_anchors.style.display = "flex";
    fetchCartItems();
  });

  popup_anchors.addEventListener("click", function (event) {
    if (event.target === popup_anchors) {
      popup_anchors.style.display = "none";
    }
  });

  // Event delegation to handle click on dynamically added remove buttons
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("cart-remove")) {
      event.preventDefault();
      const itemId = event.target.getAttribute("data-id");
      removeCartItem(itemId);
       
    }
  });

  
});

function refreshCartDrawer() {
    
        // Fetch the latest cart contents
        fetch("/?section_id=cart-drawer").then(html => {
          
           refreshMainCartDrawer(html) 
        }).catch(error => console.error("Error refreshing cart drawer:", error));
}



document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("#add-to-cart-form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      let formData = new FormData(this);

      fetch("/cart/add.js", {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log("Product added:", data);

        // Fetch the latest cart contents
        return fetch("/?section_id=cart-drawer").then(response => response.text());
      })
      .then(html => {
          refreshMainCartDrawer(html)
        
          // Update cart count in header
          const cartCount = document.querySelector(".cart-count-bubble .cart-count");
          if (cartCount) {
            // Extract item count from the new cart data
            const itemCountMatch = html.match(/"item_count":(\d+)/);
            if (itemCountMatch) {
              const itemCount = parseInt(itemCountMatch[1], 10);
              cartCount.textContent = itemCount;
            }
          }

          // Call this function when cart updates
          updateCartIconBubble();
        
      })
      .catch(error => console.error("Error adding to cart:", error));
    });
  });
});

function updateCartIconBubble() {
    const cartIconBubble = document.querySelector("#cart-icon-bubble");

    if (!cartIconBubble) {
        console.error("Cart icon bubble container not found!");
        return;
    }

    // Check if the cart count bubble already exists
    if (!cartIconBubble.querySelector(".cart-count-bubble")) {
        // Create the cart count bubble
        const bubble = document.createElement("div");
        bubble.classList.add("cart-count-bubble");
        bubble.innerHTML = `
            <span aria-hidden="true">1</span>
            <span class="visually-hidden">1 items</span>
        `;
        
        cartIconBubble.appendChild(bubble);
        console.log("Cart count bubble added!");
    } else {
        console.log("Cart count bubble already exists, no changes made.");
    }
}




function refreshMainCartDrawer(html){
     // Parse the returned HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Extract the new cart drawer content
        const newCartDrawerContent = doc.querySelector("cart-drawer").innerHTML;

        // Update the existing cart drawer with the new content
        const cartDrawer = document.querySelector("cart-drawer");
        if (cartDrawer) {
          cartDrawer.innerHTML = newCartDrawerContent;

          // Open the cart drawer
          // cartDrawer.classList.add("active");

          // Remove "is-empty" class if present
          if (cartDrawer.classList.contains("is-empty")) {
            cartDrawer.classList.remove("is-empty");
          }

          // Reinitialize any necessary scripts to ensure functionality
          reinitializeCartDrawerScripts();
        }
}

// Function to reinitialize cart drawer scripts
function reinitializeCartDrawerScripts() {
  // Example: Reattach event listeners or reinitialize plugins
  // This is a placeholder; actual implementation depends on the theme's scripts

  // For instance, if the theme uses a specific function to initialize the cart drawer:
  if (window.Shopify && Shopify.theme && typeof Shopify.theme.init === "function") {
    Shopify.theme.init();
  }

  // If there are specific event listeners for cart drawer elements, reattach them here
  // Example:
  const closeButton = document.querySelector("cart-drawer .drawer__close");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      const cartDrawer = document.querySelector("cart-drawer");
      if (cartDrawer) {
        cartDrawer.classList.remove("is-open");
      }
    });
  }
}


document.addEventListener("DOMContentLoaded", function () {
  let editCartButton = document.querySelector(".edit-cart-here");
  let cartDrawer = document.querySelector("cart-drawer");

  if (editCartButton && cartDrawer) {
    editCartButton.addEventListener("click", function () {
      cartDrawer.classList.add("active"); // Cart drawer open karne ke liye
    });
  } else {
    console.error("🚨 Edit cart button ya cart drawer nahi mila!");
  }
});


function fetchCartItems() {
  fetch('/cart.js')
    .then(response => response.json())
    .then(data => {
      const cartList = document.getElementById('cart-items');
      const cartSubtotal = document.getElementById('cart-subtotal');

      cartList.innerHTML = ""; // Clear previous items
      let subtotal = 0;

      data.items.forEach(item => {
        subtotal += item.price * item.quantity;

        let cartItem = `
          <li class="cart-item">
            <a href="javascript:void(0)" class="cart-remove" data-id="${item.id}">×</a>
            <a href="${item.url}" class="cart-image">
              <img width="60" height="60" src="${item.image}" alt="${item.product_title}">
            </a>
            <div class="cart-item-details">
              <a href="${item.url}" class="cart-item-title">${item.product_title}</a>
            </div>
            <span class="cart-item-quantity">
              <span class="cart-item-price">$${(item.price / 100).toFixed(2)}</span>
              <span class="cart-item-count"> × ${item.quantity}</span>
            </span>
          </li>`;
        
        cartList.innerHTML += cartItem;
      });

      cartSubtotal.innerHTML = `$${(subtotal / 100).toFixed(2)}`;
    })
    .catch(error => console.error("Error fetching cart:", error));
}

function removeCartItem(itemId) {
  fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: itemId, quantity: 0 })
  })
  .then(response => response.json())
  .then(data => {
    
     fetchCartItems(); // Refresh the cart drawer after removing item
      fetch("/cart.js")
            .then(response => response.json())
            .then(cart => {
                highlightCartProducts(cart.items);
            })
            .catch(error => console.error("Error updating cart:", error));
        refreshCartDrawer()
  })
  .catch(error => console.error("Error removing item:", error));
}

document.addEventListener("click", (event) => {
    if (event.target.matches(".btn--add-to-cart")) {  // Adjust selector to your remove button
      setTimeout(function(){
         fetch("/cart.js")
          .then(response => response.json())
          .then(cart => {
              highlightCartProducts(cart.items);
          })
          .catch(error => console.error("Error updating cart:", error));
      }, 2000);
       
    }
});


  
// Function to refresh cart drawer content
function refreshCartDrawer() {
  //alert(22)
  fetch('/cart.js')
    .then(response => response.json())
    .then(data => {
      const cartList = document.getElementById('cart-items');
      const cartSubtotal = document.getElementById('cart-subtotal');

      if (!cartList) return; // Prevent errors if cart drawer is not visible

      cartList.innerHTML = ""; // Clear existing items
      let subtotal = 0;

      data.items.forEach(item => {
        subtotal += item.price * item.quantity;
        let cartItem = `
          <li class="cart-item">
            <a href="javascript:void(0)" class="cart-remove" data-id="${item.id}">×</a>
            <a href="${item.url}" class="cart-image">
              <img src="${item.image}" alt="${item.product_title}" width="60" height="60">
            </a>
            <div class="cart-item-details">
              <a href="${item.url}" class="cart-item-title">${item.product_title}</a>
              <span class="cart-item-quantity">
                <span class="cart-item-price">$${(item.price / 100).toFixed(2)}</span>
                <span class="cart-item-count"> × ${item.quantity}</span>
              </span>
            </div>
          </li>`;
        cartList.innerHTML += cartItem;
      });

      cartSubtotal.innerHTML = `$${(subtotal / 100).toFixed(2)}`;
    })
    .catch(error => console.error("Error refreshing cart:", error));
}

// Function to update cart icon counter
function updateCartCounter() {
  fetch('/cart.js')
    .then(response => response.json())
    .then(data => {
      const cartCounter = document.querySelector('.cart-count-bubble');
      if (cartCounter) {
        cartCounter.innerText = data.item_count;
      }
    })
    .catch(error => console.error("Error updating cart count:", error));
}


document.addEventListener("DOMContentLoaded", async function () {
    const cartData = await fetchCart();
    highlightCartProducts(cartData);

    document.querySelectorAll(".add-cart").forEach(button => {
        button.addEventListener("click", async function (event) {
            event.preventDefault(); // ⬅️ Prevent form submission
            const variantId = this.dataset.productId;
            console.log("Adding variant ID:", variantId);
            await addToCartMoonshade(variantId);
        });
    });
});
// Fetch cart data
async function fetchCart() {
    try {
        const response = await fetch("/cart.js");
        const cart = await response.json();
        return cart.items;
    } catch (error) {
        console.error("Error fetching cart:", error);
        return [];
    }
}

// Highlight products that are already in the cart
function highlightCartProducts(cartItems) {
    // Remove "in-cart" class from all products
    document.querySelectorAll(".product-item.in-cart").forEach(item => {
        item.classList.remove("in-cart");
    });

    // Add "in-cart" class only to products in the cart
    cartItems.forEach(item => {
        const productItem = document.querySelector(`.product-item[data-handle='${item.id}']`);
        if (productItem) {
            productItem.classList.add("in-cart");
         
        }
    });
}

// Add product to the cart
async function addToCartMoonshade(variantId) {
    try {
        const response = await fetch("/cart/add.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: parseInt(variantId), quantity: 1 })
        }).then(response => response.json())
        .then(data => {
        console.log("Product added:", data);

        // Fetch the latest cart contents
        return fetch("/?section_id=cart-drawer").then(response => response.text());
      })
      .then(html => {
         refreshMainCartDrawer(html)
        
        // Update cart count in header
        const cartCount = document.querySelector(".cart-count-bubble .cart-count");
        if (cartCount) {
          // Extract item count from the new cart data
          const itemCountMatch = html.match(/"item_count":(\d+)/);
          if (itemCountMatch) {
            const itemCount = parseInt(itemCountMatch[1], 10);
            cartCount.textContent = itemCount;
          }
        }

        document.querySelector(`.product-item[data-handle='${variantId}']`).classList.add("in-cart");

        refreshCartDrawer();
        updateCartCounter();
          openCartDrawer();
      })
      .catch(error => console.error("Error adding to cart:", error));
        
        
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
}

// Open the cart drawer
function openCartDrawer() {
    const cartDrawer = document.querySelector("cart-drawer");
    let popup_anchors = document.getElementById("popup-container-anchors");
    if (cartDrawer) {
        popup_anchors.style.display = "none";
        cartDrawer.classList.add("is-open");
        cartDrawer.classList.add("active");
        
        console.log("🛍️ Cart drawer opened.");
    } else {
        console.warn("⚠️ Cart drawer not found, redirecting...");
        window.location.href = "/cart";
    }
}
