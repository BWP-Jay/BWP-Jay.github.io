// Shopping cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Cart elements
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.shopping-cart');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total-amount');
    const cartCount = document.querySelector('.cart-count');
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Cart data
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count
    function updateCartCount() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    // Update cart total
    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
    
    // Render cart items
    function renderCartItems() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-gray-500 text-center py-4">Your cart is empty</p>';
            return;
        }
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item flex items-center gap-4 p-2 border-b border-gray-200';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-bold text-primary">${item.name}</h4>
                    <p class="text-sm text-gray-600">${item.size}${item.color ? ` - ${item.color}` : ''}</p>
                    <div class="flex items-center gap-2 mt-1">
                        <button class="decrease-quantity text-primary hover:text-accent" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity text-primary hover:text-accent" data-index="${index}">+</button>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-bold text-primary">$${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-item text-red-500 text-sm hover:text-red-700" data-index="${index}">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    showNotification(`${cart[index].name} quantity updated`);
                } else {
                    const itemName = cart[index].name;
                    cart.splice(index, 1);
                    showNotification(`${itemName} removed from cart`);
                }
                saveCart();
                renderCartItems();
                updateCartCount();
                updateCartTotal();
            });
        });
        
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart[index].quantity++;
                showNotification(`${cart[index].name} quantity updated`);
                saveCart();
                renderCartItems();
                updateCartCount();
                updateCartTotal();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const itemName = cart[index].name;
                cart.splice(index, 1);
                saveCart();
                renderCartItems();
                updateCartCount();
                updateCartTotal();
                showNotification(`${itemName} removed from cart`);
            });
        });
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-y-0 ${
            type === 'success' ? 'bg-primary text-white' : 'bg-red-500 text-white'
        }`;
        
        // Add icon based on type
        const icon = document.createElement('i');
        icon.className = `fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2`;
        notification.appendChild(icon);
        
        // Add message
        const messageSpan = document.createElement('span');
        messageSpan.textContent = message;
        notification.appendChild(messageSpan);
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateY(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card, .bg-white');
            const productName = productCard.querySelector('h1, h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.text-accent').textContent.replace('$', ''));
            const productImage = productCard.querySelector('#mainImage, img').src;
            
            // Get selected size
            const sizeSelector = document.querySelector('.size-selector');
            let selectedSize = '';
            if (sizeSelector) {
                const selectedSizeInput = sizeSelector.querySelector('input[type="radio"]:checked');
                if (selectedSizeInput) {
                    selectedSize = selectedSizeInput.value;
                } else {
                    showNotification('Please select a size', 'error');
                    return;
                }
            }
            
            // Get selected color if available
            const colorSelector = document.querySelector('.color-selector');
            let selectedColor = '';
            if (colorSelector) {
                const selectedColorInput = colorSelector.querySelector('input[type="radio"]:checked');
                if (selectedColorInput) {
                    selectedColor = selectedColorInput.value;
                }
            }
            
            // Check if product already in cart with same size and color
            const existingItemIndex = cart.findIndex(item => 
                item.name === productName && 
                item.size === selectedSize && 
                item.color === selectedColor
            );
            
            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity++;
                showNotification(`${productName} quantity updated in cart`);
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    size: selectedSize,
                    color: selectedColor,
                    quantity: 1
                });
                showNotification(`${productName} added to cart`);
            }
            
            saveCart();
            updateCartCount();
        });
    });
    
    // Cart sidebar functionality
    if (cartIcon && cartSidebar && cartOverlay && closeCart) {
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            renderCartItems();
            updateCartTotal();
        });
        
        function closeCartSidebar() {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
        }
        
        closeCart.addEventListener('click', closeCartSidebar);
        cartOverlay.addEventListener('click', closeCartSidebar);
    }
    
    // Initialize cart count
    updateCartCount();
    
    // Checkout button functionality
    const checkoutButton = document.querySelector('.shopping-cart button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty');
                return;
            }
            
            // Redirect to checkout page
            window.location.href = 'checkout.html';
        });
    }
    
    // Form validation for checkout page
    const shippingForm = document.getElementById('shipping-form');
    const paymentForm = document.getElementById('payment-form');
    
    if (shippingForm) {
        shippingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const requiredFields = shippingForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            // Validate email format
            const emailField = shippingForm.querySelector('#email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.classList.add('border-red-500');
            }
            
            // Validate ZIP code format
            const zipField = shippingForm.querySelector('#zip');
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (!zipRegex.test(zipField.value)) {
                isValid = false;
                zipField.classList.add('border-red-500');
            }
            
            if (isValid) {
                // Save shipping information to localStorage
                const shippingInfo = {
                    firstName: shippingForm.querySelector('#first-name').value,
                    lastName: shippingForm.querySelector('#last-name').value,
                    email: shippingForm.querySelector('#email').value,
                    address: shippingForm.querySelector('#address').value,
                    city: shippingForm.querySelector('#city').value,
                    state: shippingForm.querySelector('#state').value,
                    zip: shippingForm.querySelector('#zip').value,
                    saveInfo: shippingForm.querySelector('#save-info').checked
                };
                
                localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
                
                // Proceed to payment step
                navigateToStep(3);
            }
        });
    }
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const requiredFields = paymentForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            // Validate card number format
            const cardNumberField = paymentForm.querySelector('#card-number');
            const cardNumberRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
            if (!cardNumberRegex.test(cardNumberField.value.replace(/\s/g, ''))) {
                isValid = false;
                cardNumberField.classList.add('border-red-500');
            }
            
            // Validate expiry date format
            const expiryField = paymentForm.querySelector('#expiry');
            const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
            if (!expiryRegex.test(expiryField.value)) {
                isValid = false;
                expiryField.classList.add('border-red-500');
            }
            
            // Validate CVV format
            const cvvField = paymentForm.querySelector('#cvv');
            const cvvRegex = /^\d{3,4}$/;
            if (!cvvRegex.test(cvvField.value)) {
                isValid = false;
                cvvField.classList.add('border-red-500');
            }
            
            if (isValid) {
                // Save payment information to localStorage (in a real application, this would be handled securely)
                const paymentInfo = {
                    cardName: paymentForm.querySelector('#card-name').value,
                    cardNumber: paymentForm.querySelector('#card-number').value.replace(/\s/g, ''),
                    expiry: paymentForm.querySelector('#expiry').value,
                    saveCard: paymentForm.querySelector('#save-card').checked
                };
                
                localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
                
                // Proceed to confirmation step
                navigateToStep(4);
            }
        });
    }
    
    // Active section highlighting for navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 60) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Thank you for subscribing!';
    successMessage.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        z-index: 1000;
    `;
    document.body.appendChild(successMessage);
    
    // Clear form
    newsletterForm.reset();
    
    setTimeout(() => {
        successMessage.remove();
    }, 2000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 