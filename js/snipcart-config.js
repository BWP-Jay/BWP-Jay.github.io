// Snipcart Configuration
const SNIPCART_CONFIG = {
    apiKey: 'NDZjZjYxOTItYTkwZS00MmEyLWE4NzEtMjQyYTIyMTA1ZWE1NjM4ODA0MDgyNjI3MzA0NDkx',
    currency: 'usd',
    taxRate: 0.07, // 7% tax rate
    shippingRates: [
        {
            name: 'Standard Shipping',
            price: 5.00,
            description: '3-5 business days'
        },
        {
            name: 'Express Shipping',
            price: 10.00,
            description: '1-2 business days'
        }
    ]
};

// Initialize Snipcart
document.addEventListener('DOMContentLoaded', function() {
    // Add Snipcart configuration
    const snipcartDiv = document.createElement('div');
    snipcartDiv.hidden = true;
    snipcartDiv.id = 'snipcart';
    snipcartDiv.setAttribute('data-api-key', SNIPCART_CONFIG.apiKey);
    snipcartDiv.setAttribute('data-currency', SNIPCART_CONFIG.currency);
    document.body.appendChild(snipcartDiv);

    // Add Snipcart scripts
    const preconnectLinks = [
        { rel: 'preconnect', href: 'https://app.snipcart.com' },
        { rel: 'preconnect', href: 'https://cdn.snipcart.com' }
    ];

    preconnectLinks.forEach(link => {
        const linkElement = document.createElement('link');
        Object.assign(linkElement, link);
        document.head.appendChild(linkElement);
    });

    // Add Snipcart CSS
    const snipcartCSS = document.createElement('link');
    snipcartCSS.rel = 'stylesheet';
    snipcartCSS.href = 'https://cdn.snipcart.com/themes/v3.2.2/default/snipcart.css';
    document.head.appendChild(snipcartCSS);

    // Add custom Snipcart CSS
    const customCSS = document.createElement('link');
    customCSS.rel = 'stylesheet';
    customCSS.href = '/css/snipcart-custom.css';
    document.head.appendChild(customCSS);

    // Add Snipcart script
    const snipcartScript = document.createElement('script');
    snipcartScript.async = true;
    snipcartScript.src = 'https://cdn.snipcart.com/themes/v3.2.2/default/snipcart.js';
    document.head.appendChild(snipcartScript);
}); 