// Price Validator for Snipcart
class PriceValidator {
    constructor() {
        this.productPrices = {
            'fishin-dark-orange': 26.00,
            'fishin-dark-green': 26.00,
            'dtf': 26.00,
            'down-fish': 26.00,
            'wishin-fishin': 29.88,
            'master-baiters-sticker': 3.88,
            'bwp-sticker': 3.88
        };
        this.init();
    }

    init() {
        // Listen for cart item additions
        document.addEventListener('snipcart.cart.item.added', (event) => {
            this.validateItemPrice(event.detail.item);
        });

        // Listen for cart item updates
        document.addEventListener('snipcart.cart.item.updated', (event) => {
            this.validateItemPrice(event.detail.item);
        });

        // Listen for checkout start
        document.addEventListener('snipcart.checkout.start', () => {
            this.validateCartPrices();
        });
    }

    validateItemPrice(item) {
        const expectedPrice = this.productPrices[item.id];
        
        if (expectedPrice && Math.abs(item.price - expectedPrice) > 0.01) {
            console.warn(`Price mismatch for ${item.id}: expected ${expectedPrice}, got ${item.price}`);
            
            // Show warning to user
            this.showPriceWarning(item, expectedPrice);
            
            // Update the item price if it's significantly different
            if (window.Snipcart) {
                window.Snipcart.api.cart.updateItem(item.id, {
                    price: expectedPrice
                });
            }
        }
    }

    validateCartPrices() {
        if (!window.Snipcart) return;

        const cart = window.Snipcart.store.getState().cart;
        let hasPriceIssues = false;

        cart.items.forEach(item => {
            const expectedPrice = this.productPrices[item.id];
            if (expectedPrice && Math.abs(item.price - expectedPrice) > 0.01) {
                hasPriceIssues = true;
                console.warn(`Price mismatch detected for ${item.id}`);
            }
        });

        if (hasPriceIssues) {
            this.showCartPriceWarning();
        }
    }

    showPriceWarning(item, expectedPrice) {
        const warningMessage = `
            <div class="price-warning" style="
                background-color: #fef3c7;
                border: 1px solid #f59e0b;
                border-radius: 6px;
                padding: 12px;
                margin: 8px 0;
                color: #92400e;
                font-size: 14px;
            ">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>
                    <strong>Price Updated</strong>
                </div>
                <p>The price for ${item.name} has been updated to reflect current pricing.</p>
            </div>
        `;

        // Insert warning into Snipcart modal
        setTimeout(() => {
            const snipcartModal = document.querySelector('.snipcart-modal__container');
            if (snipcartModal) {
                const modalContent = snipcartModal.querySelector('.snipcart-modal__content');
                if (modalContent) {
                    // Remove existing warnings
                    const existingWarnings = modalContent.querySelectorAll('.price-warning');
                    existingWarnings.forEach(warning => warning.remove());
                    
                    // Add new warning
                    modalContent.insertAdjacentHTML('afterbegin', warningMessage);
                }
            }
        }, 100);
    }

    showCartPriceWarning() {
        const warningMessage = `
            <div class="cart-price-warning" style="
                background-color: #fef3c7;
                border: 1px solid #f59e0b;
                border-radius: 6px;
                padding: 12px;
                margin: 8px 0;
                color: #92400e;
                font-size: 14px;
            ">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>
                    <strong>Price Verification</strong>
                </div>
                <p>Some item prices have been updated to reflect current pricing. Please review your cart before proceeding.</p>
            </div>
        `;

        // Insert warning into checkout
        setTimeout(() => {
            const checkoutContainer = document.querySelector('.snipcart-checkout');
            if (checkoutContainer) {
                const checkoutContent = checkoutContainer.querySelector('.snipcart-checkout__content');
                if (checkoutContent) {
                    // Remove existing warnings
                    const existingWarnings = checkoutContent.querySelectorAll('.cart-price-warning');
                    existingWarnings.forEach(warning => warning.remove());
                    
                    // Add new warning
                    checkoutContent.insertAdjacentHTML('afterbegin', warningMessage);
                }
            }
        }, 100);
    }

    // Method to update product prices (call this when prices change)
    updateProductPrice(productId, newPrice) {
        this.productPrices[productId] = newPrice;
        console.log(`Updated price for ${productId} to ${newPrice}`);
    }

    // Method to get current product prices
    getProductPrices() {
        return { ...this.productPrices };
    }
}

// Initialize price validator
const priceValidator = new PriceValidator(); 