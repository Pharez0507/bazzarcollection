// Checkout functionality
class Checkout {
    constructor() {
        this.form = document.getElementById('checkout-form');
        this.cardNumber = document.getElementById('card-number');
        this.expiry = document.getElementById('expiry');
        this.cvv = document.getElementById('cvv');
        this.shipping = 150; // R150 shipping fee
        this.init();
    }

    init() {
        this.initializeFormValidation();
        this.updateOrderSummary();
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    initializeFormValidation() {
        // Card number formatting
        this.cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value;
        });

        // Expiry date formatting (MM/YY)
        this.expiry.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            e.target.value = value;
        });

        // CVV validation
        this.cvv.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });

        // Phone number validation
        const phone = document.getElementById('phone');
        phone.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = '+27' + value;
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
            }
            e.target.value = value;
        });

        // Postal code validation
        const postal = document.getElementById('postal');
        postal.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    updateOrderSummary() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartContainer = document.querySelector('.cart-items');
        const subtotalElement = document.querySelector('.subtotal');
        const totalElement = document.querySelector('.total-amount');

        // Clear existing items
        cartContainer.innerHTML = '';

        // Add each item to the summary
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'summary-item';
            itemElement.innerHTML = `
                <div class="item-info">
                    <span class="item-name">${item.name} (${item.storage})</span>
                    <span class="item-quantity">x${item.quantity}</span>
                </div>
                <span class="item-price">R${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartContainer.appendChild(itemElement);
        });

        // Calculate and update totals
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const total = subtotal + this.shipping;

        subtotalElement.textContent = `R${subtotal.toFixed(2)}`;
        totalElement.textContent = `R${total.toFixed(2)}`;
    }

    validateForm() {
        // Card number validation
        const cardNumber = this.cardNumber.value.replace(/\s/g, '');
        if (cardNumber.length !== 16) {
            alert('Please enter a valid 16-digit card number');
            return false;
        }

        // Expiry validation
        const expiry = this.expiry.value;
        const [month, year] = expiry.split('/');
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;

        if (!month || !year || 
            parseInt(month) > 12 || 
            parseInt(year) < currentYear || 
            (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            alert('Please enter a valid expiry date');
            return false;
        }

        // CVV validation
        if (this.cvv.value.length !== 3) {
            alert('Please enter a valid 3-digit CVV');
            return false;
        }

        return true;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        const formData = new FormData(this.form);
        const orderData = {
            customer: {
                email: formData.get('email'),
                phone: formData.get('phone'),
                fullName: formData.get('fullname'),
                address: formData.get('address'),
                city: formData.get('city'),
                postal: formData.get('postal'),
                province: formData.get('province')
            },
            items: JSON.parse(localStorage.getItem('cart')) || [],
            shipping: this.shipping,
            total: parseFloat(document.querySelector('.total-amount').textContent.replace('R', ''))
        };

        try {
            // Here you would typically send the order to your backend
            // For now, we'll simulate a successful order
            await this.simulateOrderProcessing(orderData);

            // Clear the cart
            localStorage.removeItem('cart');

            // Show success message and redirect
            alert('Order placed successfully! Thank you for your purchase.');
            window.location.href = 'index.html';
        } catch (error) {
            alert('There was an error processing your order. Please try again.');
            console.error('Order processing error:', error);
        }
    }

    async simulateOrderProcessing(orderData) {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Order processed:', orderData);
                resolve({ success: true, orderId: Math.random().toString(36).substr(2, 9) });
            }, 2000);
        });
    }
}

// Initialize checkout
document.addEventListener('DOMContentLoaded', () => {
    new Checkout();
}); 