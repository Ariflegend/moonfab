
function getParamFromURL(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param); // Get any parameter from URL if available
}
  


document.addEventListener("DOMContentLoaded", function () {
    let quantityInput = document.querySelector(".product-form__quantity");
    quantityInput.classList.add("show");
    // function showQuantityInput() {
    //       if (quantityInput) {
    //           if(getParamFromURL("variant") !== null){
    //             quantityInput.classList.remove("hide");
    //             quantityInput.classList.add("show");
    //           }
    //       }
    // }
  
    if(getParamFromURL("variant") !== null){
      showQuantityInput()
    }else{
     
       document.querySelectorAll('.product-form__input input[type=radio]').forEach(button => {
          button.removeAttribute("checked");    
       });
    }

  
    let giftBtn = document.querySelector('.giftcard-add-to-cart');
    if(getParamFromURL("variant") == null){
      //alert(getParamFromURL("variant"))
      giftBtn.setAttribute("disabled", "1");
    }
  
   giftBtn.setAttribute('data-product-id', getParamFromURL("variant"));
  
function updateGiftButton() {
      const checkoutBtn = document.querySelector("#check");
   
      const editCartBtn = document.querySelector("#edit-btn");
      
      let giftbtn = document.querySelector(".giftcard-add-to-cart");
      
      if(getParamFromURL("variant") != null){
        //setTimeout(() => {
            giftbtn.removeAttribute("disabled");
            const productId = document.querySelector('input[name="id"]')?.value;
            //const giftBtn = document.querySelector('.giftcard-add-to-cart');

            if (productId && giftbtn) {
                giftbtn.setAttribute('data-product-id', productId);
                //show quantity, add to cart button, hide edit cart, checkout button IF variant is not in the cart

                fetch('/cart.js')
                  .then(response => response.json())
                  .then(cart => {
                      const itemExists = cart.items.some(item => item.id == productId);
                      if (itemExists) {
                          //console.log("Variant is already in the cart.");
                          checkoutBtn.setAttribute("style", "display:block !important;");
                          editCartBtn.setAttribute("style", "display:block;");
                          
                          giftbtn.setAttribute("style", "display:none;");
                           setTimeout(() => {
                                 
                                //quantityInput.classList.remove("show");
                                //quantityInput.classList.add("hide");
                            }, 2000);

                          const notice_price = document.querySelector(".notice_price");
                          notice_price.setAttribute("style", "display:block;");
                          if (checkoutBtn) {
                              const priceElement = document.querySelector(".price-item--regular"); // Price element check
                              const price = priceElement ? priceElement.textContent.trim() : "$0.00"; // Default price if not found
                          
                              let noticeDiv = document.querySelector(".notice_price"); // Check if div already exists
                          
                              if (!noticeDiv) {
                                  // Create div if not exists
                                  noticeDiv = document.createElement("div");
                                  noticeDiv.classList.add("notice_price");
                                  checkoutBtn.parentNode.insertBefore(noticeDiv, checkoutBtn);
                              }
                          
                              // Update inner HTML (only changes text, no duplicate divs)
                              noticeDiv.innerHTML = `Moon Digital Gift Card - ${price} is in the cart.`;
                            // noticeDiv.innerHTML = `<span class="far fa-check"></span> Moon Digital Gift Card - ${price} is in the cart.`;
                          }
                      } else {
                          //console.log("Variant is NOT in the cart.");
                          showQuantityInput();

                          checkoutBtn.setAttribute("style", "display:none !important;");
                          editCartBtn.setAttribute("style", "display:none;");
                          
                          giftbtn.setAttribute("style", "display:block;");

                          const notice_price = document.querySelector(".notice_price");
                          notice_price.setAttribute("style", "display:none;");
                        
                          
                      }
                  })
                  .catch(error => console.error("Error fetching cart:", error));

              
                console.log("Updated Variant ID:", productId);
            }
       // }, 1500); // Ensure Shopify has updated the variant first
      }
}

    // Watch for any change in the `<variant-selects>` section
    const variantSelects = document.querySelector('.product');

    if (variantSelects) {
        // Shopify dynamically replaces the entire <variant-selects> section, so we observe the parent
        const observer = new MutationObserver(updateGiftButton);
        observer.observe(variantSelects, { childList: true, subtree: true });

        // Also listen for direct user interactions (radio buttons, dropdowns)
        variantSelects.addEventListener("change", function (event) {
            if (event.target.matches('input[type="radio"], select')) {
                updateGiftButton();
              
            }
        });
    }


    // document.querySelector("quantity-input").addEventListener("click", function (event) {
    //     // Check if the clicked element is a quantity button
    //     if (event.target.closest(".quantity__button")) {
    //         if (giftBtn) {
    //             giftBtn.setAttribute("disabled", "1");
    //             setTimeout(() => {
    //                 giftBtn.removeAttribute("disabled");
    //             }, 2000);
    //         }
    //     }
    // });
});


document.addEventListener("DOMContentLoaded", function () {
    const checkoutBtn = document.querySelector("#check");
   
    const editCartBtn = document.querySelector("#edit-btn");
    
    let giftbtn = document.querySelector(".giftcard-add-to-cart");
  
    document.querySelectorAll(".giftcard-add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const productId = this.getAttribute("data-product-id");
            const quantity = document.querySelector('.quantity__input[name="quantity"]').value;
            // alert(quantity);
            fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: productId,
                    quantity: quantity
                })
            })
            .then(response => response.json())
            .then(data => {
    			console.log("Product added:", data);
    			
    			return fetch("/?section_id=cart-drawer").then(response => response.text());

              
    		}).then(html => {
              
    			const parser = new DOMParser();
    			const doc = parser.parseFromString(html, "text/html");
    
    			const newCartDrawerContent = doc.querySelector("cart-drawer").innerHTML;
    			const cartDrawer = document.querySelector("cart-drawer");
    
    			if (cartDrawer) {
    			  cartDrawer.innerHTML = newCartDrawerContent;
    			  cartDrawer.classList.add("active");
    
    			  if (cartDrawer.classList.contains("is-empty")) {
        				cartDrawer.classList.remove("is-empty");
    			  }
    
    			  reinitializeCartDrawerScripts();
    			}
    
    			updateCartIconBubble()

                //show edit buttons and hide quantity and add to cart
                checkoutBtn.setAttribute("style", "display:block !important;");
                editCartBtn.setAttribute("style", "display:block;");
                
                giftbtn.setAttribute("style", "display:none;");
                 setTimeout(() => {
                      const mustHideBtn = document.querySelector('a.edit-cart[href="javascript:void(0);"]');
                      let quantityInput = document.querySelector(".product-form__quantity");
                      mustHideBtn.setAttribute("style", "display:none !important;");
                      quantityInput.classList.remove("show");
                      quantityInput.classList.add("hide");
                  }, 2000);

                  
                
                  if (checkoutBtn) {
                    const priceElement = document.querySelector(".price-item--regular"); // Price element check
                    const price = priceElement ? priceElement.textContent.trim() : "$0.00"; // Default price if not found
                
                    let noticeDiv = document.querySelector(".notice_price"); // Check if div already exists
                
                    if (!noticeDiv) {
                        // Create div if not exists
                        noticeDiv = document.createElement("div");
                        noticeDiv.classList.add("notice_price");
                        checkoutBtn.parentNode.insertBefore(noticeDiv, checkoutBtn);
                    }
                
                    // Update inner HTML (only changes text, no duplicate divs)
                    noticeDiv.innerHTML = `<span class="far fa-check"></span> Moon Digital Gift Card - ${price} is in the cart.`;
                }


                
              
		  }).catch(error => console.error("Error adding to cart:", error));
          
        });
    });
});



  
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
  
// Function to update or insert the cart count
function updateCartIconBubble() {
    const cartIconBubble = document.querySelector("#cart-icon-bubble");
    if (!cartIconBubble) {
        console.error("Cart icon bubble container not found!");
        return;
    }
    
    // Get new quantity from input
    const quantityInput = document.querySelector('.quantity__input[name="quantity"]');
    const quantity = quantityInput ? parseInt(quantityInput.value, 10) || 1 : 1;

    // Check if the cart count bubble already exists
    let cartCountBubble = cartIconBubble.querySelector(".cart-count-bubble");
    
    if (!cartCountBubble) {
        // Create the cart count bubble
        cartCountBubble = document.createElement("div");
        cartCountBubble.classList.add("cart-count-bubble");
        cartCountBubble.innerHTML = `
            <span aria-hidden="true">${quantity}</span>
            <span class="visually-hidden">${quantity} items</span>
        `;
        cartIconBubble.appendChild(cartCountBubble);
        console.log("Cart count bubble added!");
    } else {
        console.log("Cart count bubble already exists, updating quantity.");

        // Fetch existing count
        const countSpan = cartCountBubble.querySelector("span[aria-hidden='true']");
        const hiddenSpan = cartCountBubble.querySelector(".visually-hidden");

        if (countSpan && hiddenSpan) {
            let currentCount = parseInt(countSpan.textContent, 10) || 0;
            let newCount = currentCount + quantity; // Add new quantity to existing one

            countSpan.textContent = newCount;
            hiddenSpan.textContent = `${newCount} items`;
        }
    }
}



         













// function getParamFromURL(param) {
//     const urlParams = new URLSearchParams(window.location.search);
  
//     return urlParams.get(param); // Get any parameter from URL if available
// }
  

// document.addEventListener("DOMContentLoaded", function () {

//     let quantityInput = document.querySelector(".product-form__quantity");

//   if(quantityInput){
//         quantityInput.classList.add("hide");
//     function showQuantityInput() {
//           if (quantityInput) {
//               if(getParamFromURL("variant") !== null){
//                 quantityInput.classList.remove("hide");
//                 quantityInput.classList.add("show");
//               }
//           }
//     }
  
//     if(getParamFromURL("variant") !== null){
//       showQuantityInput()
//     }else{
     
//        document.querySelectorAll('.product-form__input input[type=radio]').forEach(button => {
//           button.removeAttribute("checked");    
//        });
//     }

  
//     let giftBtn = document.querySelector('.giftcard-add-to-cart');
//     if(getParamFromURL("variant") == null){
//       //alert(getParamFromURL("variant"))
//       giftBtn.setAttribute("disabled", "1");
//     }
  
//    giftBtn.setAttribute('data-variant-id', getParamFromURL("variant"));
  
//    function updateGiftButton() {
     
//           const checkoutBtn = document.querySelector("#check");
       
//           const editCartBtn = document.querySelector("#edit-btn");
          
//           let giftbtn = document.querySelector(".giftcard-add-to-cart");
          
//           if(getParamFromURL("variant") != null){
//             setTimeout(() => {
//                 giftBtn.removeAttribute("disabled");
//                 const productId = document.querySelector('input[name="id"]')?.value;
//                 //const giftBtn = document.querySelector('.giftcard-add-to-cart');
    
//                 if (productId && giftBtn) {
//                     giftBtn.setAttribute('data-variant-id', productId);
//                     //show quantity, add to cart button, hide edit cart, checkout button IF variant is not in the cart
    
//                     fetch('/cart.js')
//                       .then(response => response.json())
//                       .then(cart => {
//                           const itemExists = cart.items.some(item => item.id == productId);
//                           if (itemExists) {
//                               //console.log("Variant is already in the cart.");
//                               checkoutBtn.setAttribute("style", "display:block !important;");
//                               editCartBtn.setAttribute("style", "display:block;");
                              
//                               giftbtn.setAttribute("style", "display:none;");
//                                setTimeout(() => {
                                     
//                                     //quantityInput.classList.remove("show");
//                                     //quantityInput.classList.add("hide");
//                                 }, 2000);
    
//                             //   const notice_price = document.querySelector(".notice_price");
//                             // if(notice_price){
//                             //   notice_price.setAttribute("style", "display:block;");
//                             // }
//                             //   if (checkoutBtn) {
//                             //       const priceElement = document.querySelector(".price-item--regular"); // Price element check
//                             //       const price = priceElement ? priceElement.textContent.trim() : "$0.00"; // Default price if not found
                              
//                             //       let noticeDiv = document.querySelector(".notice_price"); // Check if div already exists
                              
//                             //       if (!noticeDiv) {
//                             //           // Create div if not exists
//                             //           noticeDiv = document.createElement("div");
//                             //           noticeDiv.classList.add("notice_price");
//                             //           checkoutBtn.parentNode.insertBefore(noticeDiv, checkoutBtn);
//                             //       }
                              
//                             //       // Update inner HTML (only changes text, no duplicate divs)
//                             //       noticeDiv.innerHTML = `<span class="far fa-check"></span> Moon Digital Gift Card - ${price} is in the cart.`;
//                             //   }
//                           } else {
//                               //console.log("Variant is NOT in the cart.");
//                               showQuantityInput();
    
//                               checkoutBtn.setAttribute("style", "display:none !important;");
//                               editCartBtn.setAttribute("style", "display:none;");
                              
//                               giftbtn.setAttribute("style", "display:block;");
    
//                               // const notice_price = document.querySelector(".notice_price");
//                               // notice_price.setAttribute("style", "display:none;");
                            
                              
//                           }
//                       })
//                       .catch(error => console.error("Error fetching cart:", error));
    
                  
//                     console.log("Updated Variant ID:", productId);
//                 }
//             }, 1500); // Ensure Shopify has updated the variant first
//           }
//     }

//     // Watch for any change in the `<variant-selects>` section
//     const variantSelects = document.querySelector('.product');

//     if (variantSelects) {
//         // Shopify dynamically replaces the entire <variant-selects> section, so we observe the parent
//         const observer = new MutationObserver(updateGiftButton);
//         observer.observe(variantSelects, { childList: true, subtree: true });

//         // Also listen for direct user interactions (radio buttons, dropdowns)
//         variantSelects.addEventListener("change", function (event) {
//             if (event.target.matches('input[type="radio"], select')) {
//                 updateGiftButton();
              
//             }
//         });
//     }

//   }


//     document.querySelector("quantity-input").addEventListener("click", function (event) {
//       // alert("dfdfdfdfd")
//       //alert(22)
//         // Check if the clicked element is a quantity button
//         if (event.target.closest(".quantity__button")) {
//             if (giftBtn) {
//                 giftBtn.setAttribute("disabled", "1");
//                 setTimeout(() => {
//                     giftBtn.removeAttribute("disabled");
//                 }, 2000);
//             }
//         }
//     });

//     let val = document.querySelector(".form__label").innerHTML;
//     //alert(val);
//     if(val == "Denominations"){
//       document.querySelector(".form__label").innerHTML = "Select Denominations";
//     }

//     if(val == "Title"){
//       document.querySelector(".form__label").innerHTML = "Select Title";
//     }
  
// });

//  // Wait until the DOM is loaded
// document.addEventListener("DOMContentLoaded", function () {
//   setTimeout(()=>{
//      // Get all the radio inputs with name starting with "Denominations"
//     const radioButtons = document.querySelectorAll('input[type="radio"][name^="Denominations"]');
    
//     if (radioButtons.length > 0) {
//       const firstValue = radioButtons[0].value;
//       const lastValue = radioButtons[radioButtons.length - 1].value;

//       const rangeText = `${firstValue} - ${lastValue}`;

//       // Find the div and set its text content
//       const price_item = document.querySelector('#price_item');
//       if (price_item) {
//         price_item.textContent = rangeText;
//       }
//     }
//   }, 1000)
   
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const checkoutBtn = document.querySelector("#check");
//     const editCartBtn = document.querySelector("#edit-btn");
//     let giftbtn = document.querySelector(".giftcard-add-to-cart");
//   giftBtn.setAttribute("disabled", "1");

//     document.querySelectorAll(".giftcard-add-to-cart").forEach(button => {
//         button.addEventListener("click", function (event) {
//         console.log("sdsndmsndm")
       
//   // event.stopPropagation(); 
//         console.log("sdsndmsndm")
          
//             const productId = this.getAttribute("data-variant-id");
//           // console.log("productID",productId)
//             const quantity = document.querySelector('.quantity__input[name="quantity"]').value;
//           // console.log("quantity",quantity)
//           console.log("quantity",quantity)
          
//             //alert(productId);
//             fetch('/cart/add.js', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     id: productId,
//                     quantity: quantity
//                 })
//             })
//             .then(response => response.json())
//             .then(data => {
//     			console.log("Product added:", data);
    			
//     			return fetch("/?section_id=cart-drawer").then(response => response.text());

              
//     		}).then(html => {
              
//     			const parser = new DOMParser();
//     			const doc = parser.parseFromString(html, "text/html");
    
//     			const newCartDrawerContent = doc.querySelector("cart-drawer").innerHTML;
//     			const cartDrawer = document.querySelector("cart-drawer");
    
//     			if (cartDrawer) {
//     			  cartDrawer.innerHTML = newCartDrawerContent;
//     			  cartDrawer.classList.add("active");
    
//     			  if (cartDrawer.classList.contains("is-empty")) {
//         				cartDrawer.classList.remove("is-empty");
//     			  }
    
//     			  reinitializeCartDrawerScripts();
//     			}
    
//     			updateCartIconBubble()

//                 //show edit buttons and hide quantity and add to cart
//                 checkoutBtn.setAttribute("style", "display:block !important;");
//                 editCartBtn.setAttribute("style", "display:block;");
                
//                 giftbtn.setAttribute("style", "display:none;");
//                  setTimeout(() => {
//                       const mustHideBtn = document.querySelector('a.edit-cart[href="javascript:void(0);"]');
//                       let quantityInput = document.querySelector(".product-form__quantity");
//                       mustHideBtn.setAttribute("style", "display:none !important;");
//                       quantityInput.classList.remove("show");
//                       quantityInput.classList.add("hide");
//                   }, 2000);

                  
                
//                   if (checkoutBtn) {
//                     const priceElement = document.querySelector(".price-item--regular"); // Price element check
//                     const price = priceElement ? priceElement.textContent.trim() : "$0.00"; // Default price if not found
                
//                     let noticeDiv = document.querySelector(".notice_price"); // Check if div already exists
                
//                     if (!noticeDiv) {
//                         // Create div if not exists
//                         noticeDiv = document.createElement("div");
//                         noticeDiv.classList.add("notice_price");
//                         checkoutBtn.parentNode.insertBefore(noticeDiv, checkoutBtn);
//                     }
                
//                     // Update inner HTML (only changes text, no duplicate divs)
//                     noticeDiv.innerHTML = `<span class="far fa-check"></span> Moon Digital Gift Card - ${price} is in the cart.`



                
              
// 		  }).catch(error => console.error("Error adding to cart:", error));
          
//         });
//     });
// });



  
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
  
// // Function to update or insert the cart count
// function updateCartIconBubble() {
//     const cartIconBubble = document.querySelector("#cart-icon-bubble");
//     if (!cartIconBubble) {
//         console.error("Cart icon bubble container not found!");
//         return;
//     }
    
//     // Get new quantity from input
//     const quantityInput = document.querySelector('.quantity__input[name="quantity"]');
//     const quantity = quantityInput ? parseInt(quantityInput.value, 10) || 1 : 1;

//     // Check if the cart count bubble already exists
//     let cartCountBubble = cartIconBubble.querySelector(".cart-count-bubble");
    
//     if (!cartCountBubble) {
//         // Create the cart count bubble
//         cartCountBubble = document.createElement("div");
//         cartCountBubble.classList.add("cart-count-bubble");
//         cartCountBubble.innerHTML = `
//             <span aria-hidden="true">${quantity}</span>
//             <span class="visually-hidden">${quantity} items</span>
//         `;
//         cartIconBubble.appendChild(cartCountBubble);
//         console.log("Cart count bubble added!");
//     } else {
//         console.log("Cart count bubble already exists, updating quantity.");

//         // Fetch existing count
//         const countSpan = cartCountBubble.querySelector("span[aria-hidden='true']");
//         const hiddenSpan = cartCountBubble.querySelector(".visually-hidden");

//         if (countSpan && hiddenSpan) {
//             let currentCount = parseInt(countSpan.textContent, 10) || 0;
//             let newCount = currentCount + quantity; // Add new quantity to existing one

//             countSpan.textContent = newCount;
//             hiddenSpan.textContent = `${newCount} items`;
//         }
//     }
// }
