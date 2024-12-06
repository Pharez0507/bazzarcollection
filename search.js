class Search {
    constructor() {
        this.modal = document.getElementById('search-modal');
        this.searchIcon = document.querySelector('.search-icon');
        this.closeBtn = this.modal.querySelector('.close');
        this.searchInput = this.modal.querySelector('#search-input');
        this.searchResults = this.modal.querySelector('.search-results');
        this.init();
    }

    init() {
        // Search icon click handler
        this.searchIcon.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        this.searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.openModal();
        });
        
        // Close button handler
        this.closeBtn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        this.closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.closeModal();
        });

        // Modal background click handler
        this.modal.addEventListener('mousedown', (e) => {
            if (e.target === this.modal) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal();
            }
        });

        // Modal content click handler
        const modalContent = this.modal.querySelector('.search-modal-content');
        modalContent.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        modalContent.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        // Search input handler
        this.searchInput.addEventListener('input', (e) => {
            const query = this.searchInput.value.toLowerCase().trim();
            if (query.length >= 2) {
                this.performSearch(query);
            } else {
                this.searchResults.innerHTML = '<div class="search-message">Type at least 2 characters to search</div>';
            }
        });

        // Escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal();
            }
        });
    }

    openModal() {
        this.modal.style.display = 'block';
        this.searchInput.value = '';
        this.searchResults.innerHTML = '<div class="search-message">Type at least 2 characters to search</div>';
        setTimeout(() => this.searchInput.focus(), 100);
    }

    closeModal() {
        this.modal.style.display = 'none';
        // Clear any existing timeouts
        setTimeout(() => {
            if (this.modal.style.display === 'none') {
                this.searchInput.value = '';
                this.searchResults.innerHTML = '<div class="search-message">Type at least 2 characters to search</div>';
            }
        }, 100);
    }

    performSearch(query) {
        // Get all products from localStorage or default to empty arrays
        const products = {
            iphones: [
                { name: 'iPhone 15 Pro Max', price: '29999', storage: ['256GB', '512GB', '1TB'], category: 'iphone' },
                { name: 'iPhone 15 Pro', price: '27999', storage: ['128GB', '256GB', '512GB'], category: 'iphone' },
                { name: 'iPhone 15 Plus', price: '24999', storage: ['128GB', '256GB'], category: 'iphone' },
                { name: 'iPhone 15', price: '22999', storage: ['128GB', '256GB'], category: 'iphone' },
                { name: 'iPhone 14 Pro Max', price: '26999', storage: ['256GB', '512GB'], category: 'iphone' },
                { name: 'iPhone 14 Pro', price: '24999', storage: ['128GB', '256GB'], category: 'iphone' },
                { name: 'iPhone 14 Plus', price: '22999', storage: ['128GB', '256GB'], category: 'iphone' },
                { name: 'iPhone 14', price: '19999', storage: ['128GB', '256GB'], category: 'iphone' },
                { name: 'iPhone 13 Pro Max', price: '23999', storage: ['256GB', '512GB'], category: 'iphone' },
                { name: 'iPhone 13 Pro', price: '21999', storage: ['128GB', '256GB'], category: 'iphone' },
                { name: 'iPhone 13', price: '17999', storage: ['128GB', '256GB'], category: 'iphone' },
                { name: 'iPhone 13 Mini', price: '15999', storage: ['128GB', '256GB'], category: 'iphone' }
            ],
            sneakers: [
                { name: 'Nike Air Max', price: '2999', sizes: ['7', '8', '9', '10', '11'], category: 'sneaker' },
                { name: 'Adidas Ultra Boost', price: '2799', sizes: ['7', '8', '9', '10', '11'], category: 'sneaker' },
                { name: 'Jordan 1 Retro', price: '3499', sizes: ['7', '8', '9', '10', '11'], category: 'sneaker' },
                { name: 'Yeezy Boost 350', price: '4999', sizes: ['7', '8', '9', '10', '11'], category: 'sneaker' }
            ]
        };

        // Combine all products
        const allProducts = [...products.iphones, ...products.sneakers];

        // Filter products based on search query
        const results = allProducts.filter(product => 
            product.name.toLowerCase().includes(query)
        );

        // Display results
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="search-message">No products found</div>';
            return;
        }

        this.searchResults.innerHTML = results.map(product => `
            <div class="search-item" onclick="window.location.href='${product.category === 'iphone' ? 'iphones' : 'sneakers'}.html'">
                <div class="search-item-details">
                    <h3>${product.name}</h3>
                    <div class="search-item-meta">
                        <span class="search-item-price">R${product.price}</span>
                        <span class="search-item-category">${product.category === 'iphone' ? 'iPhone' : 'Sneaker'}</span>
                    </div>
                    <div class="search-item-options">
                        ${product.category === 'iphone' 
                            ? `Storage: ${product.storage.join(', ')}` 
                            : `Sizes: ${product.sizes.join(', ')}`}
                    </div>
                </div>
                <div class="search-item-action">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        `).join('');
    }
}

// Initialize search
document.addEventListener('DOMContentLoaded', () => {
    new Search();
}); 