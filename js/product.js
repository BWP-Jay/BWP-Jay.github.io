// Product page functionality
let selectedSize = 'M';
let selectedColor = 'Orange';

// Update Snipcart button data
function updateSnipcartButton() {
    const button = document.querySelector('.snipcart-add-item');
    if (!button) return;

    // Update size
    button.setAttribute('data-item-custom1-value', selectedSize);
    
    // Update color
    button.setAttribute('data-item-custom2-value', selectedColor);
    
    // Update product ID based on color and size
    const productId = `fishin-dark-${selectedColor.toLowerCase()}-${selectedSize}`;
    button.setAttribute('data-item-id', productId);
    
    // Update image based on color
    const imagePath = `../images/products/fishin-dark/${selectedColor.toLowerCase()}/fishin-dark-front.jpg`;
    button.setAttribute('data-item-image', imagePath);
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

// Color selection
function changeColor(color) {
    selectedColor = color;
    
    // Update UI
    document.querySelectorAll('.color-btn').forEach(btn => {
        if (btn.textContent.trim() === color) {
            btn.classList.add('border-primary', 'text-primary');
        } else {
            btn.classList.remove('border-primary', 'text-primary');
        }
    });
    
    // Update main image
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = `../images/products/fishin-dark/${color.toLowerCase()}/fishin-dark-front.jpg`;
        mainImage.alt = `Fishin' in the Dark Unisex Dri-Fit - ${color} - Front View`;
    }
    
    // Update thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail-image');
    thumbnails[0].src = `../images/products/fishin-dark/${color.toLowerCase()}/fishin-dark-front.jpg`;
    thumbnails[0].alt = `Fishin' in the Dark Unisex Dri-Fit - ${color} - Front View Thumbnail`;
    thumbnails[1].src = `../images/products/fishin-dark/${color.toLowerCase()}/fishin-dark-back.jpg`;
    thumbnails[1].alt = `Fishin' in the Dark Unisex Dri-Fit - ${color} - Back View Thumbnail`;
    
    // Update Snipcart button
    updateSnipcartButton();
}

// Image change
function changeImage(imagePath) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        if (imagePath === 'back') {
            mainImage.src = `../images/products/fishin-dark/${selectedColor.toLowerCase()}/fishin-dark-back.jpg`;
            mainImage.alt = `Fishin' in the Dark Unisex Dri-Fit - ${selectedColor} - Back View`;
        } else {
            mainImage.src = imagePath;
            mainImage.alt = `Fishin' in the Dark Unisex Dri-Fit - ${selectedColor} - Front View`;
        }
    }
}

// Initialize product page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial size
    selectSize('M');
    
    // Set initial color
    changeColor('Orange');
    
    // Initialize Snipcart button
    updateSnipcartButton();
}); 