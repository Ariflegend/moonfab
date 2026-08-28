document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const steps = document.querySelectorAll(".quiz-step");
    const progressContainer = document.querySelector(".progress"); // Get progress wrapper
    const progressBar = document.querySelector(".progress-bar");
    let userSelections = {};

    function showStep(step) {
        steps.forEach((s, index) => {
            s.style.display = index === step ? "block" : "none";
        });
        updateProgress();
    }

    function updateProgress() {
        let progress = (currentStep / (steps.length - 1)) * 100;
        progressBar.style.width = progress + "%";
        progressBar.setAttribute("aria-valuenow", progress);

        // Show or hide progress bar based on progress value
        progressContainer.style.display = progress === 0 ? "none" : "block";
    }

    // Handle "Begin" button (Step 1)
    document.querySelector("#beginQuiz").addEventListener("click", function () {
        currentStep = 1;
        showStep(currentStep);
    });

    // Handle Answer Selection
    document.querySelectorAll(".btn-quiz").forEach((btn) => {
        btn.addEventListener("click", function () {
            let parentStep = this.closest(".quiz-step");
            let question = parentStep.dataset.question;
            let answer = this.innerText.trim();

            // Save selection
            userSelections[question] = answer;

            // Highlight selected answer
            parentStep.querySelectorAll(".btn-quiz").forEach((b) => b.classList.remove("active"));
            this.classList.add("active");

            // Enable next button
            let nextBtn = parentStep.querySelector(".btn-next");
            if (nextBtn) {
                nextBtn.classList.remove("disabled");
            }
        });
    });

    // Handle "Next" button
    document.querySelectorAll(".btn-next").forEach((btn) => {
        btn.addEventListener("click", function () {
            if (currentStep < steps.length - 1) {
                if (userSelections["hardware"] === "Sprinter w/ Roof Rails") {
                    currentStep = steps.length - 1;
                    showStep(currentStep);
                    loadProducts(["moonshade", "sprinter-rail-anchors"]);
                    return;
                }

                if (currentStep === 1 && userSelections["hardware"] === "Awning Rail") {
                    currentStep = 2;
                    showStep(currentStep);
                    return;
                }

                if (currentStep === 2 && userSelections["awning-rail-size"]) {
                    currentStep = steps.length - 1;
                    showStep(currentStep);
                    loadAwningRailProducts();
                    return;
                }

                if (currentStep === 1 && (userSelections["hardware"] === "Roof Rack" || userSelections["hardware"] === "Bare Roof")) {
                    currentStep = 3;
                    showStep(currentStep);
                    return;
                }

                if (currentStep === 3 && userSelections["roof-material"]) {
                    if (userSelections["roof-material"] === "Steel") {
                        currentStep = steps.length - 1;
                        showStep(currentStep);
                        loadProducts(getSteelProducts(userSelections["hardware"]));
                        return;
                    } else {
                        currentStep = 4;
                        showStep(currentStep);
                        return;
                    }
                }

                if (currentStep === 4 && userSelections["roof-texture"]) {
                    currentStep = steps.length - 1;
                    showStep(currentStep);
                    loadProducts(getTextureProducts(userSelections["hardware"], userSelections["roof-texture"]));
                    return;
                }

                currentStep++;
                showStep(currentStep);
            }
        });
    });

    //  Handle "Back" button correctly
    document.querySelectorAll(".btn-back").forEach((btn) => {
        btn.addEventListener("click", function () {
            if (currentStep > 0) {
                if (currentStep === steps.length - 1 && userSelections["hardware"] === "Sprinter w/ Roof Rails") {
                    currentStep = 1;
                } else if (currentStep === 2 && userSelections["hardware"] === "Awning Rail") {
                    currentStep = 1;
                } else if (currentStep === 3 && (userSelections["hardware"] === "Roof Rack" || userSelections["hardware"] === "Bare Roof")) {
                    currentStep = 1;
                } else if (currentStep === 4 && userSelections["roof-material"]) {
                    currentStep = 3;
                } else if (currentStep === steps.length - 1) {
                    if (userSelections["roof-texture"]) {
                        currentStep = 4;
                    } else if (userSelections["roof-material"]) {
                        currentStep = 3;
                    } else if (userSelections["awning-rail-size"]) {
                        currentStep = 2;
                    }
                } else {
                    currentStep--;
                }

                showStep(currentStep);
            }
        });
    });

    function getSteelProducts(hardware) {
        return hardware === "Roof Rack"
            ? ["moonshade", "magnet-anchors", "nite-ize-gear-tie-loopable-twist-tie"]
            : ["moonshade", "magnet-anchors", "pad-eye-anchors"];
    }

    function getTextureProducts(hardware, texture) {
        if (hardware === "Roof Rack") {
            return texture === "Smooth"
                ? ["moonshade", "nite-ize-gear-tie-loopable-twist-tie", "suction-cup-anchors", "large-suction-cup-anchors", "adhesive-aluminum-anchor"]
                : ["moonshade", "nite-ize-gear-tie-loopable-twist-tie", "adhesive-aluminum-anchor"];
        } else {
            return texture === "Smooth"
                ? ["moonshade", "pad-eye-anchors", "suction-cup-anchors", "large-suction-cup-anchors", "adhesive-aluminum-anchor"]
                : ["moonshade", "pad-eye-anchors", "adhesive-aluminum-anchor"];
        }
    }

// Function to load products dynamically
   // Function to load products dynamically
 function loadProducts(productHandles) {
    const finalStepContent = document.querySelector(".final-step-content");

    // Show loading GIF
    finalStepContent.innerHTML = `
        <div class="loading-container">
            <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading.gif" alt="Loading..." class="loading-gif">
            <p>Loading products...</p>
        </div>
    `;

    console.log("Loading GIF added...");

    let productRequests = productHandles.map(handle =>
        fetch(`/products/${handle}.json`)
            .then(response => response.json())
            .then(data => {
                const product = data.product;

                return `
                    <div class="product-cardd">
                        <div class="prdt-img">
                            <img src="${product.images[0].src}" alt="${product.title}" class="product-image">
                        </div>
                        <div class="prdt-info">
                            <div class="mb-0 prdt-cntnt">
                                <h4>${product.title}</h4>
                                <p class="product-price" data-raw-price="${product.variants[0].price}">
                                    ${product.variants[0].price} ${Shopify.currency.active || "USD"}
                                </p>
                            </div>
                            <div class="ad-btnns">
                                <button class="btn btn-primary add-to-cartt" data-id="${product.variants[0].id}">
                                    Add ${product.variants[0].price}
                                </button>
                                <a href="/products/${handle}" class="btn btn-outline-primary">View</a>
                            </div>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                console.error("Error fetching product:", error);
                return `<p class="error">Could not load ${handle}.</p>`;
            })
    );

    // Remove loading GIF after fetching all products
    Promise.all(productRequests).then(productHtmlArray => {
        setTimeout(() => {  // Small delay to show the loading effect
            console.log("Removing loading GIF and showing products...");
            finalStepContent.innerHTML = productHtmlArray.join("");

            // Add "Add Full Package" button
            finalStepContent.innerHTML += `
                <button id="add-full-package" class="btn btn-dark full-package-btn btn-primary">
                    ADD FULL PACKAGE
                </button>
            `;

            // Attach event listener to the new button
            document.getElementById("add-full-package").addEventListener("click", addFullPackage);
        }, 1000); // 1-second delay before showing products
    });
}






    function loadAwningRailProducts() {
        let products = ["moonshade"];
        if (userSelections["awning-rail-size"] === "1/2\" (Basecamp)") {
            products.push("basecamp-rail-anchors", "awning-rail-anchors-5-16");
        } else if (userSelections["awning-rail-size"] === "3/8\"") {
            products.push("awning-rail-anchors-3-8", "awning-rail-anchors-5-16");
        } else if (userSelections["awning-rail-size"] === "5/6\"") {
            products.push("awning-rail-anchors-5-16");
        }
        loadProducts(products);
    }


  // Function to add all products to the cart
    function addFullPackage() {
        const variantIds = [];

        // Collect all product variant IDs dynamically
        document.querySelectorAll(".add-to-cartt").forEach(button => {
            variantIds.push(button.getAttribute("data-id"));
        });

        // Create items array for Shopify cart API
        const items = variantIds.map(id => ({ id: parseInt(id), quantity: 1 }));

        fetch('/cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items })
        })
        .then(response => response.json())
        .then(() => {
            alert("Full package added to cart!");
            location.reload(); // Refresh the page after adding to cart
        })
        .catch(error => console.error("Error adding full package:", error));
    }

    // Add to Cart and Refresh Page
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cartt")) {
            const variantId = event.target.getAttribute("data-id");
            fetch('/cart/add.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: variantId, quantity: 1 })
            })
            .then(response => response.json())
            .then(() => {
                location.reload(); // Refresh the page after adding to cart
            })
            .catch(error => {
                console.error("Add to cart error:", error);
            });
        }
    });

  
});


