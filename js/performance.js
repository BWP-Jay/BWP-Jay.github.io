// Performance optimization utilities
class PerformanceOptimizer {
    constructor() {
        this.initializeLazyLoading();
        this.setupServiceWorker();
        this.initializeCaching();
    }

    // Initialize lazy loading for images
    initializeLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            this.loadLazyLoadingPolyfill();
        }
    }

    // Load lazy loading polyfill for older browsers
    loadLazyLoadingPolyfill() {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Setup service worker for PWA features
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        // ServiceWorker registration successful
                    })
                    .catch(err => {
                        // ServiceWorker registration failed
                    });
            });
        }
    }

    // Initialize caching for static assets
    initializeCaching() {
        if ('caches' in window) {
            caches.open('static-assets').then(cache => {
                return cache.addAll([
                    '/styles.css',
                    '/script.js',
                    '/js/cart.js',
                    '/js/image-gallery.js',
                    '/images/products/logo.jpg'
                ]);
            });
        }
    }

    // Preload critical resources
    preloadCriticalResources() {
        const resources = [
            '/styles.css',
            '/script.js',
            '/js/cart.js'
        ];

        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.js') ? 'script' : 'style';
            document.head.appendChild(link);
        });
    }

    // Optimize images before loading
    optimizeImage(imageUrl) {
        // Add image optimization parameters
        return `${imageUrl}?w=800&q=80`;
    }
}

// Initialize performance optimizations
const performanceOptimizer = new PerformanceOptimizer(); 