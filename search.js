// Product data
const products = [
    {
        id: 'wishin-fishin',
        name: "Wishin' I was Fishin Unisex 100% Cotton Tee",
        price: 29.88,
        image: "images/products/wishin-fishin/wishin-fishin-front.jpg",
        description: "Experience the perfect blend of comfort and style with our Wishin' I was Fishin 100% Cotton T-Shirt.",
        keywords: ["wishin", "fishin", "cotton", "tee", "shirt", "fishing", "apparel"]
    },
    {
        id: 'fishin-dark',
        name: "Fishin' in the Dark Unisex Dri-Fit",
        price: 26.00,
        image: "images/products/fishin-dark/orange/fishin-dark-front.jpg",
        description: "A stylish and comfortable Dri-Fit shirt perfect for night fishing adventures.",
        keywords: ["fishin", "dark", "dri-fit", "shirt", "fishing", "night", "orange"]
    },
    {
        id: 'down-fish',
        name: "Down to Fish? Unisex Light Grey Dri-Fit",
        price: 26.00,
        image: "images/products/down-fish/down-fish-front.jpg",
        description: "A comfortable and stylish Dri-Fit shirt perfect for any fishing adventure.",
        keywords: ["down", "fish", "dri-fit", "shirt", "fishing", "grey", "light"]
    },
    {
        id: 'dtf',
        name: "DTF Unisex Dri-Fit",
        price: 26.00,
        image: "images/products/dtf/dtf-front.jpg",
        description: "A stylish Dri-Fit shirt with a unique design.",
        keywords: ["dtf", "dri-fit", "shirt", "fishing", "apparel"]
    },
    {
        id: 'master-baiters',
        name: "Master Baiters Sticker",
        price: 2.88,
        image: "images/products/mb-stick/master-baiters-sticker.jpg",
        description: "A humorous fishing-themed sticker.",
        keywords: ["master", "baiters", "sticker", "fishing", "humor"]
    },
    {
        id: 'bwp-sticker',
        name: "BWP Sticker",
        price: 2.88,
        image: "images/products/bwp-stick/bwp-stick.jpg",
        description: "Show your support with our BackWater Pursuits logo sticker.",
        keywords: ["bwp", "sticker", "logo", "fishing", "backwater", "pursuits"]
    }
];

// Product search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchResultsList = document.getElementById('search-results-list');
    const noResults = document.getElementById('search-no-results');
    
    if (!searchInput || !searchResults || !searchResultsList || !noResults) return;
    
    let searchTimeout;
    
    // Debounced search function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Search function
    function searchProducts(query) {
        query = query.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }
        
        const results = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.id.toLowerCase().includes(query)
        );
        
        displayResults(results);
    }
    
    // Display search results
    function displayResults(results) {
        if (results.length === 0) {
            searchResultsList.innerHTML = '';
            noResults.classList.remove('hidden');
            searchResults.classList.remove('hidden');
            return;
        }
        
        noResults.classList.add('hidden');
        searchResultsList.innerHTML = results.map(product => `
            <a href="products/${product.id}.html" class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded">
                <div>
                    <h4 class="text-sm font-medium text-primary">${product.name}</h4>
                    <p class="text-xs text-accent">$${product.price.toFixed(2)}</p>
                </div>
            </a>
        `).join('');
        
        searchResults.classList.remove('hidden');
    }
    
    // Event listeners
    const debouncedSearch = debounce(searchProducts, 300);
    
    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#search-input') && !e.target.closest('#search-results')) {
            searchResults.classList.add('hidden');
        }
    });
    
    // Handle keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchResults.classList.add('hidden');
            searchInput.blur();
        }
    });
    
    // Focus search on keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            searchInput.focus();
        }
    });
}); 