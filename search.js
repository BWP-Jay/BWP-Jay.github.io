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

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchResultsGrid = document.getElementById('search-results-grid');
    const noResults = document.getElementById('no-results');
    const allProductsGrid = document.getElementById('all-products-grid');

    if (!searchInput) return;

    // Function to create a product card
    function createProductCard(product) {
        return `
            <div class="product-card bg-white rounded-lg shadow-md overflow-hidden" role="listitem">
                <a href="products/${product.id}.html" class="block">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover" width="400" height="256">
                </a>
                <div class="p-4">
                    <h3 class="text-lg font-bold text-primary mb-2">${product.name}</h3>
                    <p class="text-accent font-bold mb-4">$${product.price.toFixed(2)}</p>
                    <button class="w-full bg-primary text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300 add-to-cart" 
                            aria-label="Add ${product.name} to cart"
                            data-product-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }

    // Function to perform search
    function performSearch(query) {
        query = query.toLowerCase().trim();
        
        if (!query) {
            searchResults.classList.add('hidden');
            allProductsGrid.classList.remove('hidden');
            return;
        }

        const results = products.filter(product => {
            const searchableText = [
                product.name,
                product.description,
                ...product.keywords
            ].join(' ').toLowerCase();

            return searchableText.includes(query);
        });

        // Update UI
        searchResults.classList.remove('hidden');
        allProductsGrid.classList.add('hidden');
        searchResultsGrid.innerHTML = '';

        if (results.length === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
            results.forEach(product => {
                searchResultsGrid.innerHTML += createProductCard(product);
            });
        }
    }

    // Event listeners
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(e.target.value);
        }
    });

    // Initialize add to cart functionality for search results
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.dataset.productId;
            const product = products.find(p => p.id === productId);
            if (product) {
                // Add to cart logic here
                console.log(`Added ${product.name} to cart`);
            }
        }
    });
}); 