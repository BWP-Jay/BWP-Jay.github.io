// Image Gallery functionality
class ImageGallery {
    constructor() {
        this.init();
    }

    init() {
        // Create lightbox if it doesn't exist
        if (!document.getElementById('lightbox')) {
            this.createLightbox();
        }
        
        // Add event listeners to product images
        this.setupImageListeners();
    }

    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 hidden flex items-center justify-center';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-label', 'Product image lightbox');
        
        lightbox.innerHTML = `
            <div class="relative max-w-4xl w-full mx-4">
                <button class="close-lightbox absolute top-4 right-4 text-white text-2xl hover:text-accent transition-colors duration-300" aria-label="Close lightbox">
                    <i class="fas fa-times"></i>
                </button>
                <button class="prev-image absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-accent transition-colors duration-300" aria-label="Previous image">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="next-image absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-accent transition-colors duration-300" aria-label="Next image">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="lightbox-image-container">
                    <img src="" alt="" class="max-h-[80vh] max-w-full mx-auto" id="lightbox-image">
                </div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Add event listeners for the lightbox
        const closeBtn = lightbox.querySelector('.close-lightbox');
        closeBtn.addEventListener('click', () => this.closeLightbox());
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                this.closeLightbox();
            }
        });
    }

    setupImageListeners() {
        // Add zoom functionality to main product image
        const mainImage = document.getElementById('mainImage');
        if (mainImage) {
            mainImage.addEventListener('mousemove', (e) => this.handleZoom(e, mainImage));
            mainImage.addEventListener('mouseleave', () => this.resetZoom(mainImage));
            mainImage.addEventListener('click', () => this.openLightbox(mainImage.src, mainImage.alt));
        }
        
        // Add click handlers to thumbnails
        const thumbnails = document.querySelectorAll('.thumbnail-image');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const mainImage = document.getElementById('mainImage');
                if (mainImage) {
                    mainImage.src = thumb.src;
                    mainImage.alt = thumb.alt;
                }
            });
        });
    }

    handleZoom(e, image) {
        const { left, top, width, height } = image.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        image.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        image.style.transform = 'scale(1.5)';
    }

    resetZoom(image) {
        image.style.transformOrigin = 'center';
        image.style.transform = 'scale(1)';
    }

    openLightbox(src, alt) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Setup navigation buttons
        this.setupLightboxNavigation();
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
    }

    setupLightboxNavigation() {
        const lightbox = document.getElementById('lightbox');
        const prevBtn = lightbox.querySelector('.prev-image');
        const nextBtn = lightbox.querySelector('.next-image');
        const thumbnails = document.querySelectorAll('.thumbnail-image');
        
        // Get current image index
        const currentSrc = document.getElementById('lightbox-image').src;
        let currentIndex = Array.from(thumbnails).findIndex(thumb => thumb.src === currentSrc);
        
        // Setup previous button
        prevBtn.onclick = () => {
            currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
            const prevThumb = thumbnails[currentIndex];
            document.getElementById('lightbox-image').src = prevThumb.src;
            document.getElementById('lightbox-image').alt = prevThumb.alt;
        };
        
        // Setup next button
        nextBtn.onclick = () => {
            currentIndex = (currentIndex + 1) % thumbnails.length;
            const nextThumb = thumbnails[currentIndex];
            document.getElementById('lightbox-image').src = nextThumb.src;
            document.getElementById('lightbox-image').alt = nextThumb.alt;
        };
        
        // Setup keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('hidden')) {
                if (e.key === 'ArrowLeft') {
                    prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    nextBtn.click();
                }
            }
        });
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.imageGallery = new ImageGallery();
}); 