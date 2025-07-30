// Price Checker - Verify all product prices are consistent
class PriceChecker {
    constructor() {
        this.expectedPrices = {
            'wishin-fishin': 29.88,
            'fishin-dark-orange': 26.00,
            'fishin-dark-green': 26.00,
            'down-fish': 26.00,
            'dtf': 26.00,
            'master-baiters-sticker': 3.88,
            'bwp-sticker': 3.88
        };
    }

    checkAllPrices() {
        console.log('🔍 Checking all product prices...');
        
        const addToCartButtons = document.querySelectorAll('.snipcart-add-item');
        let issuesFound = 0;

        addToCartButtons.forEach(button => {
            const itemId = button.getAttribute('data-item-id');
            const itemPrice = parseFloat(button.getAttribute('data-item-price'));
            const expectedPrice = this.expectedPrices[itemId];

            if (expectedPrice === undefined) {
                console.warn(`⚠️  Unknown product ID: ${itemId}`);
                issuesFound++;
            } else if (Math.abs(itemPrice - expectedPrice) > 0.01) {
                console.error(`❌ Price mismatch for ${itemId}: Expected $${expectedPrice}, Found $${itemPrice}`);
                issuesFound++;
            } else {
                console.log(`✅ ${itemId}: $${itemPrice} (correct)`);
            }
        });

        if (issuesFound === 0) {
            console.log('🎉 All prices are consistent!');
        } else {
            console.error(`❌ Found ${issuesFound} price issues that need to be fixed.`);
        }

        return issuesFound;
    }

    // Method to run price check on page load
    init() {
        // Wait for page to load
        setTimeout(() => {
            this.checkAllPrices();
        }, 1000);
    }
}

// Initialize price checker
const priceChecker = new PriceChecker();

// Run price check when page loads
document.addEventListener('DOMContentLoaded', () => {
    priceChecker.init();
});

// Also expose for manual checking
window.checkPrices = () => priceChecker.checkAllPrices(); 