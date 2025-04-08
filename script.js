// Shopping Cart Functionality
let cart = [];

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        cart.push({
            name: productName,
            price: productPrice
        });
        
        updateCartCount();
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.textContent = 'Added to cart!';
        feedback.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #28a745;
            color: white;
            padding: 1rem;
            border-radius: 4px;
            z-index: 1000;
        `;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    });
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