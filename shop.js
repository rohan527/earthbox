// Shop page functionality

// Shopping cart
let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    showNotification(`${productName} added to cart!`);
    updateCartDisplay();
}

function showNotification(message) {
    const notification = document.getElementById('cart-notification');
    const messageElement = document.getElementById('cart-message');
    
    messageElement.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function updateCartDisplay() {
    // This would typically update a cart icon or sidebar
    console.log('Cart updated:', cart);
}

// Filter functionality
let activeFilters = {
    type: [],
    size: [],
    price: []
};

function initializeFilters() {
    // Type filters
    document.querySelectorAll('.filter-type').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateFilters('type', checkbox.value, checkbox.checked);
        });
    });

    // Size filters
    document.querySelectorAll('.filter-size').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateFilters('size', checkbox.value, checkbox.checked);
        });
    });

    // Price filters
    document.querySelectorAll('.filter-price').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateFilters('price', checkbox.value, checkbox.checked);
        });
    });
}

function updateFilters(filterType, value, isChecked) {
    if (isChecked) {
        activeFilters[filterType].push(value);
    } else {
        activeFilters[filterType] = activeFilters[filterType].filter(v => v !== value);
    }
    applyFilters();
}

function applyFilters() {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        let show = true;

        // Check type filter
        if (activeFilters.type.length > 0) {
            const productType = product.getAttribute('data-type');
            if (!activeFilters.type.includes(productType)) {
                show = false;
            }
        }

        // Check size filter
        if (activeFilters.size.length > 0) {
            const productSize = product.getAttribute('data-size');
            if (!activeFilters.size.includes(productSize)) {
                show = false;
            }
        }

        // Check price filter
        if (activeFilters.price.length > 0) {
            const productPrice = parseInt(product.getAttribute('data-price'));
            let priceMatch = false;
            
            activeFilters.price.forEach(range => {
                const [min, max] = range.split('-').map(Number);
                if (productPrice >= min && productPrice <= max) {
                    priceMatch = true;
                }
            });
            
            if (!priceMatch) {
                show = false;
            }
        }

        // Show or hide product
        product.style.display = show ? 'block' : 'none';
    });
}

function resetFilters() {
    // Clear all checkboxes
    document.querySelectorAll('.filters input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset active filters
    activeFilters = {
        type: [],
        size: [],
        price: []
    };

    // Show all products
    document.querySelectorAll('.product-card').forEach(product => {
        product.style.display = 'block';
    });
}

// Initialize filters on page load
if (document.querySelector('.filters')) {
    initializeFilters();
}
