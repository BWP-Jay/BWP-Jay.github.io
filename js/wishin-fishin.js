// Wishin' Fishin' product page functionality
let selectedSize = 'M';

// Update Snipcart button data
function updateSnipcartButton() {
    const button = document.querySelector('.snipcart-add-item');
    if (!button) return;

    // Update size
    button.setAttribute('data-item-custom1-value', selectedSize);
    
    // Update product ID based on size
    const productId = `wishin-fishin-${selectedSize}`;
    button.setAttribute('data-item-id', productId);
}

// Size selection
function selectSize(size) {
    selectedSize = size;
    
    // Update UI
    document.querySelectorAll('.size-btn').forEach(btn => {
        if (btn.textContent.trim() === size) {
            btn.classList.add('border-primary', 'text-primary');
            btn.classList.remove('border-gray-300');
        } else {
            btn.classList.remove('border-primary', 'text-primary');
            btn.classList.add('border-gray-300');
        }
    });
    
    // Update Snipcart button
    updateSnipcartButton();
}

// Image change
function changeImage(imagePath) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        if (imagePath === 'back') {
            mainImage.src = '../images/products/wishin-fishin/wishin-fishin-back.jpg';
            mainImage.alt = 'Wishin\' I was Fishin T-shirt - Back View';
        } else {
            mainImage.src = imagePath;
            mainImage.alt = 'Wishin\' I was Fishin T-shirt - Front View';
        }
    }
}

// Initialize product page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial size
    selectSize('M');
    
    // Initialize Snipcart button
    updateSnipcartButton();
}); 