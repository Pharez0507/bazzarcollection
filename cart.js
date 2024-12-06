// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.modal = document.getElementById('cart-modal');
        this.cartCount = document.querySelector('.cart-count');
        this.cartIcon = document.querySelector('.cart-icon');
        this.closeBtn = document.querySelector('.close');
        this.init();
    }

    init() {
        // Initialize event listeners
        this.cartIcon.addEventListener('click', () => this.toggleModal());
        this.closeBtn.addEventListener('click', () => this.toggleModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.toggleModal();
        });

        // Initialize quantity buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quantity-btn')) {
                const input = e.target.parentElement.querySelector('input');
                if (e.target.classList.contains('increase')) {
                    input.value = parseInt(input.value) + 1;
                } else {
                    input.value = Math.max(1, parseInt(input.value) - 1);
                }
                this.updateQuantity(input);
            }
        });

        // Initialize remove buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item') || 
                e.target.parentElement.classList.contains('remove-item')) {
                const item = e.target.closest('.cart-item');
                const itemId = item.dataset.id;
                this.removeItem(itemId);
            }
        });

        // Update cart display
        this.updateDisplay();
    }

    toggleModal() {
        this.modal.style.display = this.modal.style.display === 'block' ? 'none' : 'block';
    }

    addItem(item) {
        const existingItem = this.items.find(i => 
            i.id === item.id && i.storage === item.storage
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...item,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateDisplay();
        this.showAddedNotification();
    }

    showAddedNotification() {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = 'Item added to cart';
        document.body.appendChild(notification);

        // Add animation class after a small delay to trigger the animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove the notification after animation
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateDisplay();
    }

    updateQuantity(input) {
        const item = input.closest('.cart-item');
        const itemId = item.dataset.id;
        const quantity = parseInt(input.value);
        
        const cartItem = this.items.find(i => i.id === itemId);
        if (cartItem) {
            cartItem.quantity = quantity;
            this.saveCart();
            this.updateDisplay();
        }
    }

    calculateTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    formatPrice(price) {
        return `R${price.toFixed(2)}`;
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateDisplay() {
        // Update cart count
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCount.textContent = totalItems;

        // Update cart items display
        const cartItems = document.querySelector('.cart-items');
        const template = document.getElementById('cart-item-template');
        
        if (cartItems) {
            cartItems.innerHTML = '';
            
            this.items.forEach(item => {
                const clone = template.content.cloneNode(true);
                
                clone.querySelector('.cart-item').dataset.id = item.id;
                clone.querySelector('.item-image img').src = item.image;
                clone.querySelector('.item-image img').alt = item.name;
                clone.querySelector('.item-name').textContent = item.name;
                clone.querySelector('.storage').textContent = `${item.storage}`;
                clone.querySelector('.item-price').textContent = this.formatPrice(item.price);
                clone.querySelector('.item-quantity input').value = item.quantity;
                clone.querySelector('.item-total').textContent = 
                    this.formatPrice(item.price * item.quantity);

                cartItems.appendChild(clone);
            });
        }

        // Update summary
        const total = this.calculateTotal();
        document.querySelectorAll('.total-amount').forEach(el => {
            el.textContent = this.formatPrice(total);
        });
        
        const subtotal = document.querySelector('.subtotal');
        if (subtotal) {
            subtotal.textContent = this.formatPrice(total);
        }
    }
}

// Initialize cart
const cart = new Cart();

// Add to cart functionality for product pages
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const activeStorage = card.querySelector('.storage-btn.active');
            
            if (!activeStorage) {
                alert('Please select a storage option');
                return;
            }

            const item = {
                id: card.dataset.id || Math.random().toString(36).substr(2, 9),
                name: card.querySelector('h4').textContent,
                price: parseFloat(activeStorage.dataset.price),
                storage: activeStorage.textContent,
                image: card.querySelector('.product-image img').src
            };

            cart.addItem(item);
        });
    });
}); 