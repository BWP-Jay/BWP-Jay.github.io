// Snipcart Configuration
window.SnipcartSettings = {
    publicApiKey: 'NDZjZjYxOTItYTkwZS00MmEyLWE4NzEtMjQyYTIyMTA1ZWE1NjM4ODA0MDgyNjI3MzA0NDkx',
    loadStrategy: 'on-user-interaction',
    version: '3.0',
    timeoutDuration: 2750,
    domain: 'cdn.snipcart.com',
    protocol: 'https',
    currency: 'USD',
    modalStyle: 'side',
    configModalCloseText: 'Continue shopping',
    
    // Shipping settings
    shipping: {
        defaultRate: 5.99,
        freeShippingThreshold: 50,
        zones: [
            {
                name: 'United States',
                countries: ['US'],
                rate: 5.99
            }
        ]
    },
    
    // Cart settings
    cart: {
        expirationTime: 60,
        persistCart: true
    },
    
    // Checkout settings
    checkout: {
        requireShippingAddress: true,
        allowGuestCheckout: true,
        customFields: [
            {
                name: 'phone',
                type: 'text',
                required: true
            }
        ]
    }
};

// Initialize Snipcart
(() => {
    const m = ["focus", "mouseover", "touchmove", "scroll", "keydown"];
    let initialized = false;

    function initializeSnipcart() {
        if (initialized) return;
        initialized = true;

        const head = document.getElementsByTagName("head")[0];
        let snipcartElement = document.querySelector("#snipcart");
        
        if (!snipcartElement) {
            snipcartElement = document.createElement("div");
            snipcartElement.id = "snipcart";
            snipcartElement.setAttribute("hidden", "true");
            document.body.appendChild(snipcartElement);
        }

        // Set Snipcart attributes
        snipcartElement.dataset.apiKey = window.SnipcartSettings.publicApiKey;
        snipcartElement.dataset.currency = window.SnipcartSettings.currency;
        snipcartElement.dataset.configModalStyle = window.SnipcartSettings.modalStyle;
        snipcartElement.dataset.configModalCloseText = window.SnipcartSettings.configModalCloseText;

        // Add shipping configuration
        if (window.SnipcartSettings.shipping) {
            snipcartElement.dataset.configShipping = JSON.stringify(window.SnipcartSettings.shipping);
        }

        // Add checkout configuration
        if (window.SnipcartSettings.checkout) {
            snipcartElement.dataset.configCheckout = JSON.stringify(window.SnipcartSettings.checkout);
        }

        // Load Snipcart CSS and JS
        const cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        cssLink.href = `${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.css`;
        head.prepend(cssLink);

        const script = document.createElement("script");
        script.src = `${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.js`;
        script.async = true;
        head.appendChild(script);

        // Remove event listeners
        m.forEach(event => document.removeEventListener(event, initializeSnipcart));
    }

    // Initialize based on load strategy
    if (window.SnipcartSettings.loadStrategy === 'on-user-interaction') {
        m.forEach(event => document.addEventListener(event, initializeSnipcart));
        setTimeout(initializeSnipcart, window.SnipcartSettings.timeoutDuration);
    } else {
        initializeSnipcart();
    }
})(); 