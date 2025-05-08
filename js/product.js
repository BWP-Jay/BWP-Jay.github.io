import config from './config.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize size and color selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    const colorButtons = document.querySelectorAll('.color-btn');
    const addToCartButton = document.querySelector('.add-to-cart');
    
    let selectedSize = null;
    let selectedColor = null;
    
    // Handle size selection
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            sizeButtons.forEach(btn => {
                btn.classList.remove('border-primary', 'text-primary');
                btn.classList.add('border-gray-300');
            });
            
            // Add active class to selected button
            button.classList.remove('border-gray-300');
            button.classList.add('border-primary', 'text-primary');
            
            // Update selected size
            selectedSize = button.dataset.size;
            
            // Update add to cart button
            updateAddToCartButton();
        });
    });
    
    // Handle color selection
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            colorButtons.forEach(btn => {
                btn.classList.remove('border-primary', 'text-primary');
            });
            
            // Add active class to selected button
            button.classList.add('border-primary', 'text-primary');
            
            // Update selected color
            selectedColor = button.textContent.trim();
            
            // Update add to cart button
            updateAddToCartButton();
        });
    });
    
    // Update add to cart button state
    function updateAddToCartButton() {
        if (selectedSize && selectedColor) {
            addToCartButton.removeAttribute('disabled');
            addToCartButton.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            addToCartButton.setAttribute('disabled', 'disabled');
            addToCartButton.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
    
    // Handle add to cart
    addToCartButton.addEventListener('click', (e) => {
        if (!selectedSize || !selectedColor) {
            e.preventDefault();
            showNotification('Please select both size and color', 'error');
            return;
        }
        
        // Update custom fields
        addToCartButton.setAttribute('data-item-custom1-value', selectedSize);
        addToCartButton.setAttribute('data-item-custom2-value', selectedColor);
    });
    
    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            'bg-blue-500'
        } text-white transform translate-y-full transition-transform duration-300`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.remove('translate-y-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-y-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}); 