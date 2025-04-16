// Image optimization and lazy loading
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Image zoom functionality
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(img => {
        img.addEventListener('click', function() {
            const zoomContainer = document.createElement('div');
            zoomContainer.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center';
            
            const zoomedImage = document.createElement('img');
            zoomedImage.src = this.src;
            zoomedImage.className = 'max-w-[90%] max-h-[90vh] object-contain';
            
            zoomContainer.appendChild(zoomedImage);
            document.body.appendChild(zoomContainer);
            
            zoomContainer.addEventListener('click', () => {
                document.body.removeChild(zoomContainer);
            });
        });
    });
    
    // Add loading state to images
    const allImages = document.querySelectorAll('img:not([data-src])');
    
    allImages.forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
            
            img.addEventListener('load', () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                img.classList.remove('loading');
                img.classList.add('error');
                img.src = '/images/placeholder.jpg';
            });
        }
    });
}); 