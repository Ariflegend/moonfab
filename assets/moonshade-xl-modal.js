// document.addEventListener("DOMContentLoaded", function () {
//     let addToCartForms = document.querySelectorAll("#add-to-cart-form");
//     let modal = document.querySelector(".modal");
//     let cartDrawer = document.querySelector(".cart-drawer");

//     addToCartForms.forEach(form => {
//         form.addEventListener("submit", function (event) {
//           if (modal) modal.style.display = "block";
//             event.preventDefault();

//             let formData = new FormData(this);
//         });
//     });

//     // Close modal
//     let closeBtn = document.querySelector(".modal .close");
//     if (closeBtn) {
//         closeBtn.addEventListener("click", () => {
//             modal.style.display = "none";
//         });
//     }

// // When "without add-on" is clicked
// let withoutAdBtn = document.querySelector(".withoutt-addon");

// const withoutAddonBtn = document.querySelector(".withoutt-addon");

// if (withoutAddonBtn) {
//   withoutAddonBtn.addEventListener("click", function () {
// const confirmBtn = document.getElementById("confirm-selection2");

//     if (confirmBtn) {
//       confirmBtn.click();
//     }
//     // ✅ reset addon selection
//     selectedProductId = null;
//     selectedVariantId = null;

//     // hide all selected messages
//     document.querySelectorAll(".selected-info").forEach(info => {
//       info.style.display = "none";
//     });

//     // show all select buttons again
//     document.querySelectorAll(".select-btn").forEach(button => {
//       button.style.display = "inline-block";
//       button.disabled = true;
//     });
//    let moreDetailsBtn = this.parentElement.querySelectorAll(".more-details-btn");
//             if (moreDetailsBtn) {
//                moreDetailsBtn.forEach(button => {
//                 button.style.display = "inline-flex";
//                 button.classList.add("disabled");
//     });

//             }
//             document.querySelectorAll(".product-item").forEach(item => {
//   item.style.background = "none";
// });
//     // (optional) highlight this button
//     document.querySelectorAll(".select-btn").forEach(btn => btn.classList.remove("active"));
//     this.classList.add("activ");
//   });
// }
// });






// function refreshMainCartDrawer(html){
//      // Parse the returned HTML
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, "text/html");

//         // Extract the new cart drawer content
//         const newCartDrawerContent = doc.querySelector("cart-drawer").innerHTML;

//         // Update the existing cart drawer with the new content
//         const cartDrawer = document.querySelector("cart-drawer");
//         if (cartDrawer) {
//           cartDrawer.innerHTML = newCartDrawerContent;

//           // Open the cart drawer
//           // cartDrawer.classList.add("active");

//           // Remove "is-empty" class if present
//           if (cartDrawer.classList.contains("is-empty")) {
//             cartDrawer.classList.remove("is-empty");
//           }

//           // Reinitialize any necessary scripts to ensure functionality
//           reinitializeCartDrawerScripts();
//         }
// }
// function refreshCartDrawer() {
//   fetch('/?section_id=cart-drawer')
//     .then(res => res.text())
//     .then(html => {
//       const temp = document.createElement('div');
//       temp.innerHTML = html;

//       const newDrawer = temp.querySelector('#CartDrawer');
//       const oldDrawer = document.querySelector('#CartDrawer');

//       if (newDrawer && oldDrawer) {
//         oldDrawer.replaceWith(newDrawer);
//         console.log("Cart drawer refreshed.");
//       } else {
//         console.warn("Cart drawer section not found.");
//       }
//     })
//     .catch(err => console.error("Error refreshing cart drawer:", err));
// }

// // Function to reinitialize cart drawer scripts
// function reinitializeCartDrawerScripts() {
//   // Example: Reattach event listeners or reinitialize plugins
//   // This is a placeholder; actual implementation depends on the theme's scripts

//   // For instance, if the theme uses a specific function to initialize the cart drawer:
//   if (window.Shopify && Shopify.theme && typeof Shopify.theme.init === "function") {
//     Shopify.theme.init();
//   }

//   // If there are specific event listeners for cart drawer elements, reattach them here
//   // Example:
//   const closeButton = document.querySelector("cart-drawer .drawer__close");
//   if (closeButton) {
//     closeButton.addEventListener("click", function () {
//       const cartDrawer = document.querySelector("cart-drawer");
//       if (cartDrawer) {
//         cartDrawer.classList.remove("is-open");
//       }
//     });
//   }
// }


    
//   function refreshCartDrawers() {
//       console.log("Refreshing cart...");
  
//       fetch('/cart.js')
//           .then(response => response.json())
//           .then(data => {
//               const cartList = document.querySelector('.cart-items'); 
            
//               const cartDrawer = document.querySelector('#CartDrawer-Form'); 
            
            
            
//             console.log("cartList",cartDrawer,data)
//               const cartSubtotal = document.querySelector('.totals__total-value');
//             console.log("cartSubtotal",cartSubtotal)
//             console.log("cart",cartSubtotal)
//               if (!cartList || !cartSubtotal) return; // Ensure elements exist
  
//               cartList.innerHTML = ""; // Clear existing cart items
//               let subtotal = 0;
  
//               data.items.forEach(item => {
//                   subtotal += item.price * item.quantity;
              
                


  
//                   let cartDrawer = `
//                       <tr class="cart-item">
//                           <td class="cart-item__media">
//                               <a href="${item.url}" class="cart-item__link">
//                                   <img class="cart-item__image" src="${item.image ? item.image : 'fallback-image-url.jpg'}" alt="${item.product_title}" width="150" height="85">
//                               </a>
//                           </td>
//                           <td class="cart-item__details">
//                               <a href="${item.url}" class="cart-item__name h4">${item.product_title}</a>
//                               <div class="product-option">$${(item.price / 100).toFixed(2)} USD</div>
//                           </td>
//                           <td class="cart-item__totals right">
//                               <span class="price price--end">$${((item.price * item.quantity) / 100).toFixed(2)} USD</span>
//                           </td>
//                           <td class="cart-item__quantity">
//                               <div class="cart-item__quantity-wrapper">
//                                   <button class="quantity__button" data-id="${item.id}" data-action="decrease">−</button>
//                                   <input class="quantity__input" type="number" value="${item.quantity}" min="1">
//                                   <button class="quantity__button" data-id="${item.id}" data-action="increase">+</button>
//                               </div>
//                               <button class="cart-remove-button" data-id="${item.id}">Remove</button>
//                           </td>
//                       </tr>`;
                
//                 const cartItem=`
//                 <tr id="CartDrawer-Item-1" class="cart-item" role="row">
//     <td class="cart-item__media" role="cell" headers="CartDrawer-ColumnProductImage">
  
  
//       <a href="${item.url}" class="cart-item__link" tabindex="-1"
//         aria-hidden="true"> </a>
//       <img class="cart-item__image"
//         src="${item.image ? item.image : 'fallback-image-url.jpg'}" alt="" loading="lazy"
//         width="150" height="150">
  
//     </td>
  
//     <td class="cart-item__details" role="cell" headers="CartDrawer-ColumnProduct"><a
//         href="${item.url}" class="cart-item__name h4 break">${item.product_title}</a>
//       <div class="product-option">
//     $${(item.price / 100).toFixed(2)} USD
//       </div>
//       <dl></dl>
  
//       <p class="product-option"></p>
//       <ul class="discounts list-unstyled" role="list" aria-label="Discount"></ul>
//     </td>
  
//     <td class="cart-item__totals right" role="cell" headers="CartDrawer-ColumnTotal">
  
//       <div class="loading__spinner hidden">
//         <svg xmlns="http://www.w3.org/2000/svg" class="spinner" viewBox="0 0 66 66">
//           <circle stroke-width="6" cx="33" cy="33" r="30" fill="none" class="path"></circle>
//         </svg>
  
//       </div>
//       <div class="cart-item__price-wrapper"><span class="price price--end">
//       $${((item.price * item.quantity) / 100).toFixed(2)}USD
//         </span></div>
//     </td>
//     <td class="cart-item__quantity " role="cell" headers="CartDrawer-ColumnQuantity">
//       <quantity-popover>
//         <div class="cart-item__quantity-wrapper quantity-popover-wrapper">
//           <div class="quantity-popover-container">
//             <quantity-input class="quantity cart-quantity">
//               <button class="quantity__button" name="minus" type="button">
//                 <span class="visually-hidden">Decrease quantity for Sprinter Rail Anchors</span>
//                 <span class="svg-wrapper"><svg xmlns="http://www.w3.org/2000/svg" fill="none" class="icon icon-minus"
//                     viewBox="0 0 10 2">
//                     <path fill="currentColor" fill-rule="evenodd"
//                       d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 1 1 0 1H1A.5.5 0 0 1 .5 1" clip-rule="evenodd"></path>
//                   </svg>
//                 </span>
//               </button>
//               <input class="quantity__input" type="number" data-quantity-variant-id="39671684595801" name="updates[]"
//                 value="${item.quantity}" data-cart-quantity="1" min="0" data-min="1" step="1"
//                 aria-label="Quantity for Sprinter Rail Anchors" id="Drawer-quantity-1" data-index="1">
//               <button class="quantity__button" name="plus" type="button">
//                 <span class="visually-hidden">Increase quantity for Sprinter Rail Anchors</span>
//                 <span class="svg-wrapper"><svg xmlns="http://www.w3.org/2000/svg" fill="none" class="icon icon-plus"
//                     viewBox="0 0 10 10">
//                     <path fill="currentColor" fill-rule="evenodd"
//                       d="M1 4.51a.5.5 0 0 0 0 1h3.5l.01 3.5a.5.5 0 0 0 1-.01V5.5l3.5-.01a.5.5 0 0 0-.01-1H5.5L5.49.99a.5.5 0 0 0-1 .01v3.5l-3.5.01z"
//                       clip-rule="evenodd"></path>
//                   </svg>
//                 </span>
//               </button>
//             </quantity-input>
//           </div>
//           <cart-remove-button id="CartDrawer-Remove-1" data-index="1">
//             <button type="button" class="button button--tertiary cart-remove-button"
//               aria-label="Remove Sprinter Rail Anchors" data-variant-id="39671684595801">
//               <span class="svg-wrapper"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-remove"
//                   viewBox="0 0 16 16">
//                   <path fill="currentColor"
//                     d="M14 3h-3.53a3.07 3.07 0 0 0-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 0 0 5.53 3H2a.5.5 0 0 0 0 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 0 0 .5-.5V4H14a.5.5 0 0 0 0-1M6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02m4.84 11.52h-7.5V4h7.5z">
//                   </path>
//                   <path fill="currentColor"
//                     d="M6.55 5.25a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 1 0v-6a.5.5 0 0 0-.5-.5m2.9 0a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 1 0v-6a.5.5 0 0 0-.5-.5">
//                   </path>
//                 </svg>
//               </span>
//             </button>
//           </cart-remove-button>
//         </div>
//         <div id="CartDrawer-LineItemError-1" class="cart-item__error" role="alert">
//           <small class="cart-item__error-text"></small>
//           <span class="svg-wrapper"><svg class="icon icon-error" viewBox="0 0 13 13">
//               <circle cx="6.5" cy="6.5" r="5.5" stroke="#fff" stroke-width="2"></circle>
//               <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width=".7"></circle>
//               <path fill="#fff"
//                 d="m5.874 3.528.1 4.044h1.053l.1-4.044zm.627 6.133c.38 0 .68-.288.68-.656s-.3-.656-.68-.656-.681.288-.681.656.3.656.68.656">
//               </path>
//               <path fill="#fff" stroke="#EB001B" stroke-width=".7"
//                 d="M5.874 3.178h-.359l.01.359.1 4.044.008.341h1.736l.008-.341.1-4.044.01-.359H5.873Zm.627 6.833c.56 0 1.03-.432 1.03-1.006s-.47-1.006-1.03-1.006-1.031.432-1.031 1.006.47 1.006 1.03 1.006Z">
//               </path>
//             </svg>
//           </span>
//         </div>
//       </quantity-popover>
//     </td>
//   </tr> `
  
//                   cartList.insertAdjacentHTML("beforeend", cartItem);
//               });
//         cartDrawer.insertAdjacentHTML("beforeend", cartItem)
//               cartSubtotal.innerHTML = `$${(subtotal / 100).toFixed(2)} USD`;
            
//           })
//           .catch(error => console.error("Error refreshing cart:", error));
//   }


  

//     // ✅ Function to update cart count
//     function updateCartCount() {
//       console.log("i m here")
//        fetch('/cart.js')
//     .then(response => response.json())
//     .then(data => {
//       const cartCounter = document.querySelector('.cart-count-bubble');
//       if (cartCounter) {
//         cartCounter.innerText = data.item_count;
//       }
//     })
//     .catch(error => console.error("Error updating cart count:", error));
// }

  

//    const priceElement = document.querySelector(".price-popup");

//     if (priceElement) {
//         let priceText = priceElement.textContent.trim(); // Price text le rahe hain
//         priceText = priceText.replace("USD", "").trim(); // "USD" remove kar rahe hain
//         let priceValue = priceText.replace(/[^0-9]/g, ""); // Sirf numbers le rahe hain

//         priceElement.textContent = `$${priceValue}`; // Final price wapas set kar rahe hain
//     }




// let confirmSelection = document.querySelector("#confirm-selection2");

// document.addEventListener("click", function (event) {
//     if (event.target.classList.contains("select-btn")) {
//         confirmSelection.classList.remove("disabled"); 
//           let withoutAddonBtnss = document.querySelector(".withoutt-addon");
// if (withoutAddonBtnss) {
//   withoutAddonBtnss.classList.remove("activ");
// }
//     }
// });
//   let withoutAddonBtnss = document.querySelector(".withoutt-addon");
// if (withoutAddonBtnss) {
//   withoutAddonBtnss.addEventListener("click", function () {
//                 // Enable confirm button
//             // confirmSelection.classList.remove("disabled");
            
//   });
// }
//   //cofirmation selection 2 add to cart
// // Confirmation selection 2 add to cart
// let confirmSelection2 = document.querySelector("#confirm-selection2");
// let modal = document.querySelector(".modal");
// let cartDrawer = document.querySelector(".cart-drawer");
// let selectedVariantId = null; // Store selected variant ID

// // When a product is selected
// document.addEventListener("click", function (event) {
//     if (event.target.classList.contains("select-btn")) {
//         let productItem = event.target.closest(".product-item"); // Use event.target
//         if (!productItem) return; // Ensure productItem exists
        
//         selectedVariantId = productItem.dataset.variantId; // Get variant ID
//         console.log("Selected Variant ID:", selectedVariantId);
        
//         // Enable the confirm selection button
//         confirmSelection2.classList.remove("disabled");
//     }

// });

// // When "Confirm Selection" button is clicked
// confirmSelection2.addEventListener("click", function () {
// const items = [
//   {
//     id: parseInt(mainProductVariantId),
//     quantity: 1
//   }
// ];
// let skipAddon = false;

// // When "without add-on" is clicked
// const withoutAddonBtn = document.querySelector(".withoutt-addon");

// if (withoutAddonBtn) {
//   withoutAddonBtn.addEventListener("click", function () {
//     skipAddon = true;
//   });
// }

//     // show all select buttons again
//     document.querySelectorAll(".select-btn").forEach(button => {
//       button.style.display = "inline-block";
//       button.disabled = true;
//     });
// // When addon is selected
// function onAddonSelect(variantId) {
//     selectedVariantId = variantId;
//     skipAddon = false;
// }
// // ✅ Only add addon if NOT skipped
// if (!skipAddon && selectedVariantId) {
//   items.push({
//     id: parseInt(selectedVariantId),
//     quantity: 1
//   });
// }


//     // if (!selectedVariantId) {
//     //     alert("Please select an anchor hardware first!");
//     //     return;
//     // }
//     let firstModal = document.getElementById("first-modal");
//     let addingToCartModal = document.getElementById("confirmation-modal");
//     console.log("addingTOcart",addingToCartModal);

//     fetch("/cart/add.js", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ items }) // Use selectedVariantId
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log("Product added:", data);

//         // Fetch updated cart contents
//         return fetch("/?section_id=cart-drawer")
//             .then(response => response.text())
//             .then(html => ({ data, html }));
//     })
//     .then(({ data, html }) => {
//           const hasAddon = items.length > 1;
//       refreshCartDrawer();
//         refreshMainCartDrawer(html);
//         updateCartIconBubble();
//         refreshCartDrawer(); 
//         updateCartCount(); 

//         // Update cart count in header
//         const cartCount = document.querySelector(".cart-count-bubble .cart-count");
//         if (cartCount) {
//             const itemCountMatch = html.match(/"item_count":(\d+)/);
//             if (itemCountMatch) {
//                 const itemCount = parseInt(itemCountMatch[1], 10);
//                 cartCount.textContent = itemCount;
//             }
//         }

//         updateCartIconBubble();
//         // Update success message
//         let productName = data.product_title || "Product"; 
//         let successMessage = document.querySelector("#success-modal .modal-body p");
       
//         if (successMessage) {
//             if(hasAddon){
//               successMessage.textContent = `MoonShade and ${productName} are added to the cart successfully.`;
//             }else{
//             successMessage.textContent = `MoonShade is added to the cart successfully.`;
//         }
//       }
// setTimeout(() => {
// if (firstModal) {
//     firstModal.style.display = "none";  // Hide first modal

//     // Wait for 1 second, then show `addingToCartModal`
//     setTimeout(() => {
//         if (addingToCartModal) {
//             addingToCartModal.style.display = "block"; // Show it

//             // After another 1 second, hide it
//             setTimeout(() => {
//                 addingToCartModal.style.display = "none";
                
//                 // Now show the success modal
//                 let successModal = document.getElementById("success-modal");
//                 if (successModal) successModal.style.display = "block";
// resetSelectionState();
//             }, 1000); // Hide after 1 sec
//         }
//     }, 1000); // Show after 1 sec
// }
// }, 1000);


        
// })
//     .catch(error => console.error("Error adding to cart:", error));
// });

  
// document.addEventListener("DOMContentLoaded", function () {
//     document.querySelectorAll(".confirm-select").forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const confirmBnn = document.getElementById("confirm-selection2");

//     if (confirmBnn) {
//       confirmBnn.click();
//     }



          
//         });
//     });
// });



// document.addEventListener("DOMContentLoaded", function () {
//     let viewCartBtn = document.getElementById("view-cart-btn");
 
//     if (viewCartBtn) {
//         viewCartBtn.addEventListener("click", function (event) {
//             event.preventDefault(); // Prevent default link behavior
//             let cartDrawer = document.querySelector("cart-drawer"); // Select cart drawer
            
//             if (cartDrawer) {
//                 cartDrawer.classList.add("active"); // Add active class to open the drawer
//             }  
//                 let closeSuccessModall = document.querySelector("#success-modal");
//             closeSuccessModall.style.display = "none"; // ✅ Success modal hide karein             
//         });
//     }
// });
// function resetSelectionState() {
//   // selectedProductId = null;
//   // selectedVariantId = null;
//    let confirmSelectionBtn = document.getElementById("confirm-selection");
//       document.querySelectorAll(".select-btn").forEach(button => {
//       button.style.display = "inline-block";
//       button.disabled = false;
//     });
//     // confirmSelectionBtn.style.display = "none";
// }
// document.addEventListener("DOMContentLoaded", function () {
//     let selectedProductId = null;
//     let selectedVariantId = null;
//     let confirmSelectionBtn = document.getElementById("confirm-selection");
//     let selectButtons = document.querySelectorAll(".select-btn");
//   let withoutAddonBtnss = document.querySelector(".withoutt-addon");
//     // Initially disable confirm button
//     confirmSelectionBtn.disabled = true;


// if (withoutAddonBtnss) {
//   withoutAddonBtnss.addEventListener("click", function () {
//                 // Enable confirm button
//             // confirmSelectionBtn.disabled = false;
//   });
// }


//     selectButtons.forEach(button => {
//         button.addEventListener("click", function () {
//             let productItem = this.closest(".product-item");
//             let variantId = productItem.dataset.variantId;

//             selectedProductId = productItem.dataset.handle;
//             selectedVariantId = variantId;

//             // Hide all other selected-info messages
//             document.querySelectorAll(".selected-info").forEach(info => {
//                 info.style.display = "none";
//             });

//             // Show selected state for this product
//             let selectedInfo = productItem.querySelector(".selected-info");
//             if (selectedInfo) {
//                 selectedInfo.style.display = "block";
//             }

//             // Enable confirm button
//             confirmSelectionBtn.disabled = false;
//         });
//     });

//     // Confirm selection — now DOES NOT add product to cart


//     // Close modal
//     document.querySelectorAll(".close").forEach(closeBtn => {
//         closeBtn.addEventListener("click", function () {
//             document.getElementById("success-modal").style.display = "none";
//         });
//     });
// });

// // ✅ Confirmation Modal Handling
// document.addEventListener("DOMContentLoaded", function () {
//     // let confirmSelectionBtn = document.getElementById("confirm-selection");
//     let confirmationModal = document.getElementById("confirmation-modal");

  

//     // ✅ Modal close functionality
//     let closeConfirmModal = document.querySelector("#confirmation-modal .close");
//     if (closeConfirmModal) {
//         closeConfirmModal.addEventListener("click", function () {
//             confirmationModal.style.display = "none";
//         });
//     }
// });

// // ✅ Hide main modal and show confirmation modal
// document.addEventListener("DOMContentLoaded", function () {
//     let confirmSelectionBtn = document.getElementById("confirm-selection");
//     let confirmationModal = document.getElementById("confirmation-modal");
//     let mainModal = document.querySelector(".modal"); // ✅ Main modal select karein

//     if (confirmSelectionBtn) {
//         // confirmSelectionBtn.addEventListener("click", function () {
//         //     if (confirmationModal) {
//         //         confirmationModal.style.display = "block";
//         //     }
//         //     if (mainModal) {
//         //         mainModal.style.display = "none"; // ✅ Main modal hide karein
//         //     }
//         // });
//     }

//     // ✅ Confirmation modal close karne ka function
//     let closeConfirmModal = document.querySelector("#confirmation-modal .close");
//     if (closeConfirmModal) {
//         closeConfirmModal.addEventListener("click", function () {
//             confirmationModal.style.display = "none";
//         });
//     }
// });

// // ✅ Success Modal Handling
// document.addEventListener("DOMContentLoaded", function () {
//     let confirmSelectionBtn = document.getElementById("confirm-selection");
//   console.log(confirmSelectionBtn)
//     let confirmationModal = document.getElementById("confirmation-modal");
//   console.log(confirmationModal)
  
//     let successModal = document.getElementById("success-modal"); // ✅ Naya success modal
//     let mainModal = document.querySelector(".modal"); // ✅ Pehla modal

//     if (confirmSelectionBtn) {
//         // confirmSelectionBtn.addEventListener("click", function () {
//         //     if (confirmationModal) {
//         //         confirmationModal.style.display = "block"; // ✅ Confirmation modal show karein
//         //     }
//         //     if (mainModal) {
//         //         mainModal.style.display = "none"; // ✅ Main modal hide karein
//         //     }

//         //     // ✅ 2 sec ke baad confirmationModal hide karke successModal show karein
//         //     setTimeout(function () {
//         //         confirmationModal.style.display = "none"; // ✅ Hide confirmation modal
//         //         if (successModal) {
//         //             successModal.style.display = "block"; // ✅ Success modal show karein
//         //         }
//         //     }, 2000); // ✅ 2 seconds delay
//         // });
//     }

//     // ✅ Success modal close button functionality
//     let closeSuccessModal = document.querySelector("#success-modal .close");
//     if (closeSuccessModal) {
//         closeSuccessModal.addEventListener("click", function () {
//             successModal.style.display = "none"; // ✅ Success modal hide karein
//         });
//     }
// });



//     document.querySelectorAll(".select-btn").forEach(function (button) {
//         button.addEventListener("click", function () {
//             let moreDetailsBtn = this.parentElement.querySelector(".more-details-btn");
//             if (moreDetailsBtn) {
//                 moreDetailsBtn.style.display = "none";
//             }
//         });
//     });

//   document.addEventListener("DOMContentLoaded", function () {
//     let selectedProductId = null; // Selected Product ID Store karne ke liye
//     let selectButtons = document.querySelectorAll(".select-btn");

//     selectButtons.forEach(btn => {
//         btn.addEventListener("click", function () {
//               // ✅ remove "without addon" active state
//     if (withoutAddonBtn) {
//       withoutAddonBtn.classList.remove("activ");
//     }
//             let productItem = this.closest(".product-item");
//             selectedProductId = productItem.getAttribute("data-handle"); // ✅ Store Selected Product ID
            
//             // Purane selected message ko remove karna
//             document.querySelectorAll(".selected-info").forEach(info => {
//                 info.style.display = "none";
//             });

//             // Purane "Select" buttons wapas show karna
//             document.querySelectorAll(".select-btn").forEach(button => {
//                 button.style.display = "inline-block";
//             });

//             // Selected wale ka button hide karna
//             this.style.display = "none";

//             // Selected message dikhana
//             let selectedInfo = productItem.querySelector(".selected-info");
//             selectedInfo.style.display = "block";

//             // Confirm button ko enable karna
//             let confirmBtn = selectedInfo.querySelector("#confirm-selection");
//             confirmBtn.style.display = "block";

//             // ✅ "Confirm Selection" pe click hone par Product ID update karna

//         });
//     });
// });



//   document.addEventListener("DOMContentLoaded", function () {
//     // ✅ Confirmation Modal Close Button
//     document.querySelectorAll("#confirmation-modal .close, #success-modal .close").forEach((btn) => {
//         btn.addEventListener("click", function () {
//             let modal = this.closest(".modal");
//             if (modal) {
//                 modal.style.display = "none";
//             }
//         });
//     });

//     // ✅ Success Modal ko close karne ka event
//     document.querySelector("#success-modal").addEventListener("click", function (event) {
//         if (event.target.classList.contains("modal")) {
//             this.style.display = "none";
//         }
//     });
// });


  
//   document.querySelector('body').addEventListener('click', (e) => {
//      let modal = document.getElementById('first-modal');
//     let modalContent = modal.querySelector('.modal-content');

//     // Check if clicked element is inside modal-content, if not, hide modal
//     if (!modalContent.contains(e.target)) {
//         modal.style.display = "none";
//     }
// })



//   function updateCartIconBubble() {
//     const cartIconBubble = document.querySelector("#cart-icon-bubble");
//     console.log("cartIconBubble",cartIconBubble)
//     if (!cartIconBubble) {
//         console.error("Cart icon bubble container not found!");
//         return;
//     }

//     // Check if the cart count bubble already exists
//     if (!cartIconBubble.querySelector(".cart-count-bubble")) {
//         // Create the cart count bubble
//         const bubble = document.createElement("div");
//         bubble.classList.add("cart-count-bubble");
//         bubble.innerHTML = `
//             <span aria-hidden="true">1</span>
//             <span class="visually-hidden">1 items</span>
//         `;
        
//         cartIconBubble.appendChild(bubble);
//         console.log("Cart count bubble added!");
//     } else {
//         console.log("Cart count bubble already exists, no changes made.");
//     }
// }


//   document.addEventListener("DOMContentLoaded", function () {
//   // Select all buttons with the class 'select-btn'
//   document.querySelectorAll(".select-btn").forEach(function (button) {
//     button.addEventListener("click", function () {
//       // Find the parent product item
//       let parentProductItem = this.closest(".product-item");

//       // Change the background color
//       parentProductItem.style.backgroundColor = "#fbf5e766";

//       // Show the selected-info section
//       let selectedInfo = parentProductItem.querySelector(".selected-info");
//       if (selectedInfo) {
//         selectedInfo.style.display = "block";
//       }

//       // Disable the select button
//       this.disabled = true;
//     });
//   });
// });









//   document.addEventListener("DOMContentLoaded", function () {
//   // Select all 'Select' buttons
//   document.querySelectorAll(".select-btn").forEach(function (button) {
//     button.addEventListener("click", function () {
//       // Remove selection from all product items
//       document.querySelectorAll(".product-item").forEach(function (item) {
//         item.style.backgroundColor = ""; // Reset background color
//         let selectedInfo = item.querySelector(".selected-info");
//         if (selectedInfo) {
//           selectedInfo.style.display = "none"; // Hide the selected info
//         }
//         let selectBtn = item.querySelector(".select-btn");
//         if (selectBtn) {
//           selectBtn.disabled = false; // Enable previously disabled button
//         }
//       });

//       // Find the parent product item of the clicked button
//       let parentProductItem = this.closest(".product-item");

//       // Change the background color for the selected item
//       parentProductItem.style.backgroundColor = "#fbf5e766";

//       // Show the selected info section
//       let selectedInfo = parentProductItem.querySelector(".selected-info");
//       if (selectedInfo) {
//         selectedInfo.style.display = "block";
//       }

//       // Disable the clicked select button
//       this.disabled = true;
//     });
//   });
// });



document.addEventListener("DOMContentLoaded", function () {
  let isMoonSurfacePDP = document.body.classList.contains("moon-surface-pdp"); 
  if (!isMoonSurfacePDP) {
  document.querySelectorAll(".trigrctabtn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
         e.stopPropagation();
        const confirmBnn = document.getElementById("confirm-selection2");

  if (confirmBnn) {
    confirmBnn.click();
  }
        
      });
  });
}
});

document.addEventListener("DOMContentLoaded", function () {
  let addToCartForms = document.querySelectorAll("#add-to-cart-form");
  let modal = document.querySelector(".modal");
  let cartDrawer = document.querySelector(".cart-drawer");

  addToCartForms.forEach(form => {
      form.addEventListener("submit", function (event) {
        if (modal) modal.style.display = "block";
          event.preventDefault();

          let formData = new FormData(this);
          
      });
      
  });

  // Close modal (vehicle-checker: add pending lines then drawer; else hide only)
  let closeBtn = document.querySelector("#first-modal .close");
  if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        
          if (window.__msVehicleCheckerPendingAdd && typeof window.msFinalizeVehicleCheckerPendingMainOnly === "function") {
            window.msFinalizeVehicleCheckerPendingMainOnly();
            return;
          }
          let fm = document.getElementById("first-modal");
          if (fm) fm.style.display = "none";
      });
  }

// When "without add-on" is clicked
let withoutAdBtn = document.querySelector(".withoutt-addon");

const withoutAddonBtn = document.querySelector(".withoutt-addon");

if (withoutAddonBtn) {
withoutAddonBtn.addEventListener("click", function () {
  selectedProductId = null;
  selectedVariantId = null;

  document.querySelectorAll(".selected-info").forEach(info => {
    info.style.display = "none";
  });

  document.querySelectorAll(".select-btn").forEach(button => {
    button.style.display = "inline-block";
    button.disabled = true;
  });
 let moreDetailsBtn = this.parentElement.querySelectorAll(".more-details-btn");
          if (moreDetailsBtn) {
             moreDetailsBtn.forEach(button => {
              button.style.display = "inline-flex";
              button.classList.add("disabled");
  });

          }
          document.querySelectorAll(".product-item").forEach(item => {
item.style.background = "none";
});
  document.querySelectorAll(".select-btn").forEach(btn => btn.classList.remove("active"));
  this.classList.add("activ");

  const confirmBtn = document.getElementById("confirm-selection2");
  if (confirmBtn) {
    confirmBtn.classList.remove("disabled");
  }
});
}
});






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
function refreshCartDrawer() {
fetch('/?section_id=cart-drawer')
  .then(res => res.text())
  .then(html => {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    const newDrawer = temp.querySelector('#CartDrawer');
    const oldDrawer = document.querySelector('#CartDrawer');

    if (newDrawer && oldDrawer) {
      oldDrawer.replaceWith(newDrawer);
      console.log("Cart drawer refreshed.");
    } else {
      console.warn("Cart drawer section not found.");
    }
  })
  .catch(err => console.error("Error refreshing cart drawer:", err));
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


  
function refreshCartDrawers() {
    console.log("Refreshing cart...");

    fetch('/cart.js')
        .then(response => response.json())
        .then(data => {
            const cartList = document.querySelector('.cart-items'); 
          
            const cartDrawer = document.querySelector('#CartDrawer-Form'); 
          
          
          
          console.log("cartList",cartDrawer,data)
            const cartSubtotal = document.querySelector('.totals__total-value');
          console.log("cartSubtotal",cartSubtotal)
          console.log("cart",cartSubtotal)
            if (!cartList || !cartSubtotal) return; // Ensure elements exist

            cartList.innerHTML = ""; // Clear existing cart items
            let subtotal = 0;

            data.items.forEach(item => {
                subtotal += item.price * item.quantity;
            
              



                let cartDrawer = `
                    <tr class="cart-item">
                        <td class="cart-item__media">
                            <a href="${item.url}" class="cart-item__link">
                                <img class="cart-item__image" src="${item.image ? item.image : 'fallback-image-url.jpg'}" alt="${item.product_title}" width="150" height="85">
                            </a>
                        </td>
                        <td class="cart-item__details">
                            <a href="${item.url}" class="cart-item__name h4">${item.product_title}</a>
                            <div class="product-option">$${(item.price / 100).toFixed(2)} USD</div>
                        </td>
                        <td class="cart-item__totals right">
                            <span class="price price--end">$${((item.price * item.quantity) / 100).toFixed(2)} USD</span>
                        </td>
                        <td class="cart-item__quantity">
                            <div class="cart-item__quantity-wrapper">
                                <button class="quantity__button" data-id="${item.id}" data-action="decrease">−</button>
                                <input class="quantity__input" type="number" value="${item.quantity}" min="1">
                                <button class="quantity__button" data-id="${item.id}" data-action="increase">+</button>
                            </div>
                            <button class="cart-remove-button" data-id="${item.id}">Remove</button>
                        </td>
                    </tr>`;
              
              const cartItem=`
              <tr id="CartDrawer-Item-1" class="cart-item" role="row">
  <td class="cart-item__media" role="cell" headers="CartDrawer-ColumnProductImage">


    <a href="${item.url}" class="cart-item__link" tabindex="-1"
      aria-hidden="true"> </a>
    <img class="cart-item__image"
      src="${item.image ? item.image : 'fallback-image-url.jpg'}" alt="" loading="lazy"
      width="150" height="150">

  </td>

  <td class="cart-item__details" role="cell" headers="CartDrawer-ColumnProduct"><a
      href="${item.url}" class="cart-item__name h4 break">${item.product_title}</a>
    <div class="product-option">
  $${(item.price / 100).toFixed(2)} USD
    </div>
    <dl></dl>

    <p class="product-option"></p>
    <ul class="discounts list-unstyled" role="list" aria-label="Discount"></ul>
  </td>

  <td class="cart-item__totals right" role="cell" headers="CartDrawer-ColumnTotal">

    <div class="loading__spinner hidden">
      <svg xmlns="http://www.w3.org/2000/svg" class="spinner" viewBox="0 0 66 66">
        <circle stroke-width="6" cx="33" cy="33" r="30" fill="none" class="path"></circle>
      </svg>

    </div>
    <div class="cart-item__price-wrapper"><span class="price price--end">
    $${((item.price * item.quantity) / 100).toFixed(2)}USD
      </span></div>
  </td>
  <td class="cart-item__quantity " role="cell" headers="CartDrawer-ColumnQuantity">
    <quantity-popover>
      <div class="cart-item__quantity-wrapper quantity-popover-wrapper">
        <div class="quantity-popover-container">
          <quantity-input class="quantity cart-quantity">
            <button class="quantity__button" name="minus" type="button">
              <span class="visually-hidden">Decrease quantity for Sprinter Rail Anchors</span>
              <span class="svg-wrapper"><svg xmlns="http://www.w3.org/2000/svg" fill="none" class="icon icon-minus"
                  viewBox="0 0 10 2">
                  <path fill="currentColor" fill-rule="evenodd"
                    d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 1 1 0 1H1A.5.5 0 0 1 .5 1" clip-rule="evenodd"></path>
                </svg>
              </span>
            </button>
            <input class="quantity__input" type="number" data-quantity-variant-id="39671684595801" name="updates[]"
              value="${item.quantity}" data-cart-quantity="1" min="0" data-min="1" step="1"
              aria-label="Quantity for Sprinter Rail Anchors" id="Drawer-quantity-1" data-index="1">
            <button class="quantity__button" name="plus" type="button">
              <span class="visually-hidden">Increase quantity for Sprinter Rail Anchors</span>
              <span class="svg-wrapper"><svg xmlns="http://www.w3.org/2000/svg" fill="none" class="icon icon-plus"
                  viewBox="0 0 10 10">
                  <path fill="currentColor" fill-rule="evenodd"
                    d="M1 4.51a.5.5 0 0 0 0 1h3.5l.01 3.5a.5.5 0 0 0 1-.01V5.5l3.5-.01a.5.5 0 0 0-.01-1H5.5L5.49.99a.5.5 0 0 0-1 .01v3.5l-3.5.01z"
                    clip-rule="evenodd"></path>
                </svg>
              </span>
            </button>
          </quantity-input>
        </div>
        <cart-remove-button id="CartDrawer-Remove-1" data-index="1">
          <button type="button" class="button button--tertiary cart-remove-button"
            aria-label="Remove Sprinter Rail Anchors" data-variant-id="39671684595801">
            <span class="svg-wrapper"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-remove"
                viewBox="0 0 16 16">
                <path fill="currentColor"
                  d="M14 3h-3.53a3.07 3.07 0 0 0-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 0 0 5.53 3H2a.5.5 0 0 0 0 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 0 0 .5-.5V4H14a.5.5 0 0 0 0-1M6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02m4.84 11.52h-7.5V4h7.5z">
                </path>
                <path fill="currentColor"
                  d="M6.55 5.25a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 1 0v-6a.5.5 0 0 0-.5-.5m2.9 0a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 1 0v-6a.5.5 0 0 0-.5-.5">
                </path>
              </svg>
            </span>
          </button>
        </cart-remove-button>
      </div>
      <div id="CartDrawer-LineItemError-1" class="cart-item__error" role="alert">
        <small class="cart-item__error-text"></small>
        <span class="svg-wrapper"><svg class="icon icon-error" viewBox="0 0 13 13">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="#fff" stroke-width="2"></circle>
            <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width=".7"></circle>
            <path fill="#fff"
              d="m5.874 3.528.1 4.044h1.053l.1-4.044zm.627 6.133c.38 0 .68-.288.68-.656s-.3-.656-.68-.656-.681.288-.681.656.3.656.68.656">
            </path>
            <path fill="#fff" stroke="#EB001B" stroke-width=".7"
              d="M5.874 3.178h-.359l.01.359.1 4.044.008.341h1.736l.008-.341.1-4.044.01-.359H5.873Zm.627 6.833c.56 0 1.03-.432 1.03-1.006s-.47-1.006-1.03-1.006-1.031.432-1.031 1.006.47 1.006 1.03 1.006Z">
            </path>
          </svg>
        </span>
      </div>
    </quantity-popover>
  </td>
</tr> `

                cartList.insertAdjacentHTML("beforeend", cartItem);
            });
      cartDrawer.insertAdjacentHTML("beforeend", cartItem)
            cartSubtotal.innerHTML = `$${(subtotal / 100).toFixed(2)} USD`;
          
        })
        .catch(error => console.error("Error refreshing cart:", error));
}




  // ✅ Function to update cart count
  function updateCartCount() {
    console.log("i m here")
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



 const priceElement = document.querySelector(".price-popup");

  if (priceElement) {
      let priceText = priceElement.textContent.trim(); // Price text le rahe hain
      priceText = priceText.replace("USD", "").trim(); // "USD" remove kar rahe hain
      let priceValue = priceText.replace(/[^0-9]/g, ""); // Sirf numbers le rahe hain

      priceElement.textContent = `$${priceValue}`; // Final price wapas set kar rahe hain
  }




let confirmSelection = document.querySelector("#confirm-selection2");

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("select-btn")) {
      confirmSelection.classList.remove("disabled"); 
        let withoutAddonBtnss = document.querySelector(".withoutt-addon");
if (withoutAddonBtnss) {
withoutAddonBtnss.classList.remove("activ");
}
  }
});
let withoutAddonBtnss = document.querySelector(".withoutt-addon");
if (withoutAddonBtnss) {
withoutAddonBtnss.addEventListener("click", function () {
              // Enable confirm button
          // confirmSelection.classList.remove("disabled");
          
});
}
//cofirmation selection 2 add to cart
// Confirmation selection 2 add to cart
let confirmSelection2 = document.querySelector("#confirm-selection2");
let modal = document.querySelector(".modal");
let cartDrawer = document.querySelector(".cart-drawer");
let selectedVariantId = null; // Store selected variant ID

// When a product is selected
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("select-btn")) {
      let productItem = event.target.closest(".product-item"); // Use event.target
      if (!productItem) return; // Ensure productItem exists
      
      selectedVariantId = productItem.dataset.variantId; // Get variant ID
      console.log("Selected Variant ID:", selectedVariantId);
      
      // Enable the confirm selection button
      confirmSelection2.classList.remove("disabled");
  }

});

// When "Confirm Selection" button is clicked
confirmSelection2.addEventListener("click", function () {
 console.count("Confirm clicked");

  const urlParams = new URLSearchParams(window.location.search);
const urlVariantId = urlParams.get("variant") 
  ? parseInt(urlParams.get("variant"), 10)
  : null;
var strutOnlyFlow =
  window.__msVehicleCheckerPendingAdd === true &&
  window.__msVehicleCheckerPendingStrutOnly === true &&
  window.__msVehicleCheckerPendingStrutVariantId != null &&
  window.__msVehicleCheckerPendingStrutVariantId !== "";
var primaryLineId;
if (strutOnlyFlow) {
  primaryLineId = parseInt(String(window.__msVehicleCheckerPendingStrutVariantId), 10);
} else if (window.__msVehicleCheckerPendingAdd && window.__msVehicleCheckerPendingVariantId != null) {
  primaryLineId = parseInt(String(window.__msVehicleCheckerPendingVariantId), 10);
}
  else if (urlVariantId) {
  primaryLineId = urlVariantId; // ✅ NEW: URL override fallback

} 
 else {
  primaryLineId = parseInt(String(mainProductVariantId), 10);
}
const items = [
{
  id: primaryLineId,
  quantity: 1
}
];
let skipAddon = false;

// When "without add-on" is clicked
const withoutAddonBtn = document.querySelector(".withoutt-addon");

if (withoutAddonBtn) {
withoutAddonBtn.addEventListener("click", function () {
  skipAddon = true;
});
}

  // show all select buttons again
  document.querySelectorAll(".select-btn").forEach(button => {
    button.style.display = "inline-block";
    button.disabled = true;
  });
// When addon is selected
function onAddonSelect(variantId) {
  
  selectedVariantId = variantId;
  skipAddon = false;
}
let isMoonSurfacePDP =
  document.body.classList.contains("moon-surface-pdp");

if (isMoonSurfacePDP) {

  document.querySelectorAll(".product-item.active").forEach(item => {
    items.push({
      id: parseInt(item.dataset.variantId, 10),
      quantity: 1
    });
  });

} else {

  if (!skipAddon && selectedVariantId) {
    items.push({
      id: parseInt(selectedVariantId, 10),
      quantity: 1
    });
  }

}


  // if (!selectedVariantId) {
  //     alert("Please select an anchor hardware first!");
  //     return;
  // }
  let firstModal = document.getElementById("first-modal");
  let addingToCartModal = document.getElementById("confirmation-modal");
  console.log("addingTOcart",addingToCartModal);

  fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }) // Use selectedVariantId
  })
  .then(response => {
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      return response.json();
  })
  .then(data => {
      console.log("Product added:", data);

      // Fetch updated cart contents
      return fetch("/?section_id=cart-drawer")
          .then(response => response.text())
          .then(html => ({ data, html }));
  })
  .then(({ data, html }) => {
        window.__msVehicleCheckerPendingAdd = false;
        window.__msVehicleCheckerPendingVariantId = null;
        window.__msVehicleCheckerPendingStrutOnly = false;
        window.__msVehicleCheckerPendingStrutVariantId = null;
        const hasAddon = items.length > 1;
    refreshCartDrawer();
      refreshMainCartDrawer(html);
      updateCartIconBubble();
      refreshCartDrawer(); 
      updateCartCount(); 

      // Update cart count in header
      const cartCount = document.querySelector(".cart-count-bubble .cart-count");
      if (cartCount) {
          const itemCountMatch = html.match(/"item_count":(\d+)/);
          if (itemCountMatch) {
              const itemCount = parseInt(itemCountMatch[1], 10);
              cartCount.textContent = itemCount;
          }
      }

      updateCartIconBubble();
      // Update success message
      let productName = data.product_title || "Product"; 
      let successMessage = document.querySelector("#success-modal .modal-body p");
     
      if (successMessage) {
          if (strutOnlyFlow) {
            successMessage.textContent = hasAddon
              ? `Strut pole and ${productName} are added to the cart successfully.`
              : "Strut pole is added to the cart successfully.";
          } else if (hasAddon) {
            successMessage.textContent = `MoonShade and ${productName} are added to the cart successfully.`;
          } else {
            successMessage.textContent = `MoonShade is added to the cart successfully.`;
          }
    }
setTimeout(() => {
if (firstModal) {
  firstModal.style.display = "none";  // Hide first modal

  // Wait for 1 second, then show `addingToCartModal`
  setTimeout(() => {
      if (addingToCartModal) {
          addingToCartModal.style.display = "block"; // Show it

          // After another 1 second, hide it
          setTimeout(() => {
              addingToCartModal.style.display = "none";
              
              // Now show the success modal
              let successModal = document.getElementById("success-modal");
              if (successModal) successModal.style.display = "block";
resetSelectionState();
          }, 1000); // Hide after 1 sec
      }
  }, 1000); // Show after 1 sec
}
}, 1000);


      
})
  .catch(function (error) {
    window.__msVehicleCheckerPendingAdd = false;
    window.__msVehicleCheckerPendingVariantId = null;
    window.__msVehicleCheckerPendingStrutOnly = false;
    window.__msVehicleCheckerPendingStrutVariantId = null;
    console.error("Error adding to cart:", error);
  });
});






document.addEventListener("DOMContentLoaded", function () {
  let viewCartBtn = document.getElementById("view-cart-btn");

  if (viewCartBtn) {
      viewCartBtn.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent default link behavior
          let cartDrawer = document.querySelector("cart-drawer"); // Select cart drawer
          
          if (cartDrawer) {
              cartDrawer.classList.add("active"); // Add active class to open the drawer
          }  
              let closeSuccessModall = document.querySelector("#success-modal");
          closeSuccessModall.style.display = "none"; // ✅ Success modal hide karein             
      });
  }
});
function resetSelectionState() {
// selectedProductId = null;
// selectedVariantId = null;
 let confirmSelectionBtn = document.getElementById("confirm-selection");
    document.querySelectorAll(".select-btn").forEach(button => {
    button.style.display = "inline-block";
    button.disabled = false;
  });
  // confirmSelectionBtn.style.display = "none";
    let isMoonSurfacePDP = document.body.classList.contains("moon-surface-pdp");
  let productItem = document.querySelectorAll(".product-item");
  if (isMoonSurfacePDP) {
    productItem.forEach(item => {
  item.classList.remove('active');
             let selectedInfo = item.querySelector(".selected-info");
          if (selectedInfo) {
              selectedInfo.style.display = "none";
          }
    });
}
}
document.addEventListener("DOMContentLoaded", function () {
  let selectedProductId = null;
  let selectedVariantId = null;
  let isMoonSurfacePDP = document.body.classList.contains("moon-surface-pdp");
  let productItem = document.querySelectorAll(".product-item");
  if (isMoonSurfacePDP) {
    productItem.forEach(item => {
  item.classList.remove('active');
    });
}
  let confirmSelectionBtn = document.getElementById("confirm-selection");
  let selectButtons = document.querySelectorAll(".select-btn");
let withoutAddonBtnss = document.querySelector(".withoutt-addon");
  // Initially disable confirm button
  confirmSelectionBtn.disabled = true;


if (withoutAddonBtnss) {
withoutAddonBtnss.addEventListener("click", function () {
              // Enable confirm button
          // confirmSelectionBtn.disabled = false;
});
}


  selectButtons.forEach(button => {
      button.addEventListener("click", function () {
          let productItem = this.closest(".product-item");
          let variantId = productItem.dataset.variantId;
let isMoonSurfacePDP = document.body.classList.contains("moon-surface-pdp");
          selectedProductId = productItem.dataset.handle;
          selectedVariantId = variantId;
if (!isMoonSurfacePDP) {
          // Hide all other selected-info messages
          document.querySelectorAll(".selected-info").forEach(info => {
              info.style.display = "none";
          });
        }
          // Show selected state for this product
          let selectedInfo = productItem.querySelector(".selected-info");
          if (selectedInfo) {
              selectedInfo.style.display = "block";
          }

          // Enable confirm button
          confirmSelectionBtn.disabled = false;
      });
  });

  // Confirm selection — now DOES NOT add product to cart


  // Close modal
  document.querySelectorAll(".close").forEach(closeBtn => {
      closeBtn.addEventListener("click", function () {
          document.getElementById("success-modal").style.display = "none";
      });
  });
});

// ✅ Confirmation Modal Handling
document.addEventListener("DOMContentLoaded", function () {
  // let confirmSelectionBtn = document.getElementById("confirm-selection");
  let confirmationModal = document.getElementById("confirmation-modal");



  // ✅ Modal close functionality
  let closeConfirmModal = document.querySelector("#confirmation-modal .close");
  if (closeConfirmModal) {
      closeConfirmModal.addEventListener("click", function () {
          confirmationModal.style.display = "none";
      });
  }
});

// ✅ Hide main modal and show confirmation modal
document.addEventListener("DOMContentLoaded", function () {
  let confirmSelectionBtn = document.getElementById("confirm-selection");
  let confirmationModal = document.getElementById("confirmation-modal");
  let mainModal = document.querySelector(".modal"); // ✅ Main modal select karein

  if (confirmSelectionBtn) {
      // confirmSelectionBtn.addEventListener("click", function () {
      //     if (confirmationModal) {
      //         confirmationModal.style.display = "block";
      //     }
      //     if (mainModal) {
      //         mainModal.style.display = "none"; // ✅ Main modal hide karein
      //     }
      // });
  }

  // ✅ Confirmation modal close karne ka function
  let closeConfirmModal = document.querySelector("#confirmation-modal .close");
  if (closeConfirmModal) {
      closeConfirmModal.addEventListener("click", function () {
          confirmationModal.style.display = "none";
      });
  }
});

// ✅ Success Modal Handling
document.addEventListener("DOMContentLoaded", function () {
  let confirmSelectionBtn = document.getElementById("confirm-selection");
console.log(confirmSelectionBtn)
  let confirmationModal = document.getElementById("confirmation-modal");
console.log(confirmationModal)

  let successModal = document.getElementById("success-modal"); // ✅ Naya success modal
  let mainModal = document.querySelector(".modal"); // ✅ Pehla modal

  if (confirmSelectionBtn) {
      // confirmSelectionBtn.addEventListener("click", function () {
      //     if (confirmationModal) {
      //         confirmationModal.style.display = "block"; // ✅ Confirmation modal show karein
      //     }
      //     if (mainModal) {
      //         mainModal.style.display = "none"; // ✅ Main modal hide karein
      //     }

      //     // ✅ 2 sec ke baad confirmationModal hide karke successModal show karein
      //     setTimeout(function () {
      //         confirmationModal.style.display = "none"; // ✅ Hide confirmation modal
      //         if (successModal) {
      //             successModal.style.display = "block"; // ✅ Success modal show karein
      //         }
      //     }, 2000); // ✅ 2 seconds delay
      // });
  }

  // ✅ Success modal close button functionality
  let closeSuccessModal = document.querySelector("#success-modal .close");
  if (closeSuccessModal) {
      closeSuccessModal.addEventListener("click", function () {
          successModal.style.display = "none"; // ✅ Success modal hide karein
      });
  }
});



  document.querySelectorAll(".select-btn").forEach(function (button) {
      button.addEventListener("click", function () {
          let moreDetailsBtn = this.parentElement.querySelector(".more-details-btn");
          if (moreDetailsBtn) {
              moreDetailsBtn.style.display = "none";
          }
      });
  });

document.addEventListener("DOMContentLoaded", function () {
  let selectedProductId = null; // Selected Product ID Store karne ke liye
  let selectButtons = document.querySelectorAll(".select-btn");

  selectButtons.forEach(btn => {
      btn.addEventListener("click", function () {
            // ✅ remove "without addon" active state
  if (withoutAddonBtn) {
    withoutAddonBtn.classList.remove("activ");
  }
  let isMoonSurfacePDP = document.body.classList.contains("moon-surface-pdp");
          let productItem = this.closest(".product-item");
          selectedProductId = productItem.getAttribute("data-handle"); // ✅ Store Selected Product ID
          if (!isMoonSurfacePDP) {
          // Purane selected message ko remove karna
          document.querySelectorAll(".selected-info").forEach(info => {
              info.style.display = "none";
          });

          // Purane "Select" buttons wapas show karna
          document.querySelectorAll(".select-btn").forEach(button => {
              button.style.display = "inline-block";
          });
}


          // Selected wale ka button hide karna
          this.style.display = "none";

          // Selected message dikhana
          let selectedInfo = productItem.querySelector(".selected-info");
          selectedInfo.style.display = "block";

          // Confirm button ko enable karna
          let confirmBtn = selectedInfo.querySelector("#confirm-selection");
          confirmBtn.style.display = "block";

          // ✅ "Confirm Selection" pe click hone par Product ID update karna

      });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  // ✅ Confirmation Modal Close Button
  document.querySelectorAll("#confirmation-modal .close, #success-modal .close").forEach((btn) => {
      btn.addEventListener("click", function () {
          let modal = this.closest(".modal");
          if (modal) {
              modal.style.display = "none";
          }
      });
  });

  // ✅ Success Modal ko close karne ka event
  document.querySelector("#success-modal").addEventListener("click", function (event) {
      if (event.target.classList.contains("modal")) {
          this.style.display = "none";
      }
  });
});



document.querySelector('body').addEventListener('click', (e) => {
  if (e.target && e.target.closest && e.target.closest('#ms-vehicle-checker')) return;
  let modal = document.getElementById('first-modal');
  if (!modal || modal.style.display !== 'block') return;
  let modalContent = modal.querySelector('.modal-content');
  if (!modalContent) return;
  if (!modalContent.contains(e.target)) {
      if (window.__msVehicleCheckerPendingAdd && typeof window.msFinalizeVehicleCheckerPendingMainOnly === "function") {
        window.msFinalizeVehicleCheckerPendingMainOnly();
        return;
      }
      modal.style.display = "none";
  }
})



function updateCartIconBubble() {
  const cartIconBubble = document.querySelector("#cart-icon-bubble");
  console.log("cartIconBubble",cartIconBubble)
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


document.addEventListener("DOMContentLoaded", function () {
// Select all buttons with the class 'select-btn'
document.querySelectorAll(".select-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    // Find the parent product item
    let parentProductItem = this.closest(".product-item");

    // Change the background color
    parentProductItem.style.backgroundColor = "#fbf5e766";

    // Show the selected-info section
    let selectedInfo = parentProductItem.querySelector(".selected-info");
    if (selectedInfo) {
      selectedInfo.style.display = "block";
    }

    // Disable the select button
    this.disabled = true;
  });
});
});




document.addEventListener("DOMContentLoaded", function () {
    let isMoonSurfacePDP = document.body.classList.contains("moon-surface-pdp");
// Select all 'Select' buttons
document.querySelectorAll(".select-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    // Remove selection from all product items
    document.querySelectorAll(".product-item").forEach(function (item) {
      item.style.backgroundColor = ""; // Reset background color
      let selectedInfo = item.querySelector(".selected-info");
      if (!isMoonSurfacePDP) {
      if (selectedInfo) {
        selectedInfo.style.display = "none"; // Hide the selected info
      }
    
      let selectBtn = item.querySelector(".select-btn");
      if (selectBtn) {
        selectBtn.disabled = false; // Enable previously disabled button
      }
      }
    });

    // Find the parent product item of the clicked button
    let parentProductItem = this.closest(".product-item");

    // Change the background color for the selected item
    parentProductItem.style.backgroundColor = "#fbf5e766";
if (isMoonSurfacePDP) {
  parentProductItem.classList.add('active');
}
    // Show the selected info section
    let selectedInfo = parentProductItem.querySelector(".selected-info");
    if (selectedInfo) {
      selectedInfo.style.display = "block";
    }

    // Disable the clicked select button
    this.disabled = true;
  });
});
});


