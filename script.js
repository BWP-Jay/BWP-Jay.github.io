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
                } else {
                    cart.splice(index, 1);
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
                saveCart();
                renderCartItems();
                updateCartCount();
                updateCartTotal();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                saveCart();
                renderCartItems();
                updateCartCount();
                updateCartTotal();
            });
        });
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.text-accent').textContent.replace('$', ''));
            const productImage = productCard.querySelector('img').src;
            
            // Get selected size
            const sizeSelector = document.querySelector('.size-selector');
            let selectedSize = '';
            if (sizeSelector) {
                const selectedSizeInput = sizeSelector.querySelector('input[type="radio"]:checked');
                if (selectedSizeInput) {
                    selectedSize = selectedSizeInput.value;
                } else {
                    alert('Please select a size');
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
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    size: selectedSize,
                    color: selectedColor,
                    quantity: 1
                });
            }
            
            saveCart();
            updateCartCount();
            
            // Show confirmation
            const confirmation = document.createElement('div');
            confirmation.className = 'fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded shadow-lg z-50';
            confirmation.textContent = 'Added to cart!';
            document.body.appendChild(confirmation);
            
            setTimeout(() => {
                confirmation.remove();
            }, 2000);
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
            
            // Here you would typically redirect to a checkout page
            alert('Proceeding to checkout...');
            // For now, we'll just clear the cart
            cart = [];
            saveCart();
            updateCartCount();
            renderCartItems();
            updateCartTotal();
            closeCartSidebar();
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