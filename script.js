const cart = []
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
                <button class = "add-to-cart js-add-to-cart-btn" data-product-name = "${product.name}" data-product-price = "${product.price}">
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
const addToCartButtons = document.querySelectorAll(".js-add-to-cart-btn");
addToCartButtons.forEach((addButton) => {
    addButton.addEventListener("click", () => {
        const productName = addButton.dataset.productName;
        const productPrice = addButton.dataset.productPrice;

        // If product already exists in the cart, the quantity should be increased
        const existingProduct = cart.find((item) => item.name === productName)
        
        if(existingProduct){
            existingProduct.quantity += 1
        }
        else{
            cart.push({
                name : productName,
                price : productPrice,
                quantity : 1
            });
        }
        updateCart()
        
    });
});

const emptyCart = document.querySelector(".empty-cart");
const cartContainer = document.querySelector(".cart-with-items");

const popupContainer = document.querySelector(".popup-dialog-container");
function updateCart(){
    // Populating cart dynamically
    let cartHTML = ""
    cartContainer.innerHTML = ""

    let totalAmount = 0;
    cart.forEach((item) => {
        cartHTML = `
            <div class="cart-added-items">
                <div class="added-items-details">
                    <div class="added-item-name">${item.name}</div>
                    <div class="quantity-and-price">
                        <p class="item-quantity">${item.quantity}x</p>
                        <p class="price-per-item">@$${(item.price * 1).toFixed(2)}</p>
                        <p class="quantity-and-price-product">$${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                </div>

                <div class="remove-button-container">
                    <button class="remove-button">
                        <img src="/assests/images/icon-remove-item.svg" alt="">
                    </button>
                    
                </div>

            </div>
        `;
        totalAmount += item.quantity * item.price
        cartContainer.innerHTML += cartHTML
    });

    // Update cartQuantity
    const cartQuantity = document.querySelector(".cart-quantity");

    cartQuantity.textContent = cart.reduce((acc, item) => acc + item.quantity, 0)

    const totalHTML = `
        <div class="total-container">
            <p>Order Total</p>
            <h1>$${totalAmount.toFixed(2)}</h1>
        </div>

        <div class="confirm-order-container">
            <button class = "confirm-order-btn">Confirm Your Order</button>
        </div>
    `;
    cartContainer.innerHTML += totalHTML

    // Handling Confirm Order Button
    const confirmOrder = document.querySelector(".confirm-order-btn");
    confirmOrder.addEventListener("click", () => {      
        popupContainer.style.display = "block"
        displayOrderConfirmed(totalAmount)
    });
    
    
    if(cart.length > 0){
        emptyCart.style.display = "none";
        cartContainer.style.display = "block"
    }
    else{
        emptyCart.style.display = "block"
    } 
}

function displayOrderConfirmed(totalAmount){
    
    let modalHTML = `
        <div class="order-confirmed">
            <div class="order-confirmed-header">
                <img src="/assests/images/icon-order-confirmed.svg" alt="">
                <h1>Order Confirmed</h1>
                <p>We hope you enjoy your food!</p>
            </div>
    `;

    popupContainer.innerHTML = modalHTML

    cart.forEach((item) => {
        const product = products.find((product) => product.name === item.name)
        modalHTML += `
            <div class="confirmed-cart-item">
                <div class="confirmed-item-details">
                    <div class="thumbnail-container">
                        <img src="${product.image.thumbnail}" alt="">
                    </div>
                    <div class="confirmed-product-name-and-price">
                        <p class="confrimed-product-name">${item.name}</p>
                        <div class="confirmed-quantity-and-price">
                            <p class="confirmed-quantity">${item.quantity}x</p>
                            <p class="confirmed-price-per-item">@$${(item.price * 1).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div class="confirmed-quantity-and-price-product">$${(item.quantity * item.price).toFixed(2)}</div>
            </div>
        `;
    });

    modalHTML += `
        <div class="total-container">
                <p>Order Total</p>
                <h1>$${totalAmount.toFixed(2)}</h1>
            </div>

            <button class="start-new-order">Start New Order</button>
        </div>
    `;

    popupContainer.innerHTML = modalHTML

    const startNewOrder = document.querySelector(".start-new-order");
    startNewOrder.addEventListener("click", () => {
        window.location.reload(true)
    })
}
