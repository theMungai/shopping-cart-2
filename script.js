let productsHTML = "";
// Populated Producs dynamically
products.forEach((product) => {
    productsHTML += `
        <div class="products-grid-cell">
                        <picture class="product-image">
                            <source media="(max-width : 480px)" srcset="${product.image.mobile}">
                            <source media="(min-width : 481px) and (max-width : 1199px)" srcset="${product.image.tablet}">
                            <source media="(min-width : 1200px) and (max-width : 1900px)" srcset="${product.image.desktop}">
                            <img src="${product.image.thumbnail}" alt="">
                        </picture>

                    <div class="button-cart-container">
                        <button>
                            <img src="/assests/images/icon-add-to-cart.svg" alt="">
                            Add to Cart
                        </button>
                    </div>

                    <div class="product-details">
                        <p class="product-category">${product.category}</p>
                        <p class="product-name">${product.name}</p>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                    </div>
                </div>
    `;
});
document.querySelector(".products-grid").innerHTML = productsHTML

// Looping through Add To Cart Buttons
