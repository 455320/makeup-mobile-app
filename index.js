// ==================== CONFIGURATION ====================
const API_BASE_URL = window.location.origin + '/api';

// ==================== STATE MANAGEMENT ====================
let products = [];
let cart = [];
let selectedCategory = 'all';

// Load cart from localStorage, normalizing to { productId, quantity } format
try {
    const saved = JSON.parse(localStorage.getItem('cart'));
    if (Array.isArray(saved)) {
        cart = saved.filter(item => item && item.productId && item.quantity);
    }
} catch (e) {
    cart = [];
}

// ==================== START AFTER DOM LOAD ====================
document.addEventListener("DOMContentLoaded", () => {

    // ==================== DOM ELEMENTS ====================
    const elements = {
        loading: document.getElementById('loading'),
        productsGrid: document.getElementById('productsGrid'),
        categoryFilter: document.getElementById('categoryFilter'),
        cartBtn: document.getElementById('cartBtn'),
        cartCount: document.getElementById('cartCount'),
        cartSidebar: document.getElementById('cartSidebar'),
        cartOverlay: document.getElementById('cartOverlay'),
        closeCart: document.getElementById('closeCart'),
        cartItems: document.getElementById('cartItems'),
        totalAmount: document.getElementById('totalAmount'),
        checkoutBtn: document.getElementById('checkoutBtn'),
        checkoutModal: document.getElementById('checkoutModal'),
        modalOverlay: document.getElementById('modalOverlay'),
        closeCheckout: document.getElementById('closeCheckout'),
        checkoutForm: document.getElementById('checkoutForm'),
        checkoutItems: document.getElementById('checkoutItems'),
        successModal: document.getElementById('successModal'),
        closeSuccess: document.getElementById('closeSuccess'),
        orderId: document.getElementById('orderId')
    };

    // ==================== PRODUCTS (NO API NEEDED) ====================
    async function fetchProducts() {
        products = [
            {
                id: "1",
                name: "Lakme Foundation",
                category: "Foundation",
                price: 350,
                rating: 4.5,
                reviews_count: 120,
                description: "Smooth matte finish foundation",
                image_url: "51aXLC28FgL_Zawa.jpg"
            },
            {
                id: "2",
                name: "Maybelline Lipstick",
                category: "Lipstick",
                price: 925,
                rating: 4.6,
                reviews_count: 200,
                description: "Long lasting matte lipstick",
                image_url: "618CcxfdKfL_imgupscaler.ai_V1(Fast)_2K.png"
            },
            {
                id: "3",
                name: "Nude Edition 18 Color Eyeshadow Palette",
                category: "Eyeshadow",
                price: 250,
                rating: 4.4,
                reviews_count: 90,
                description: "Beautiful color shades",
                image_url: "anBn-artguru.png"
            },
            {
                id: "4",
                name: "Lakme Eyeconic Kajal",
                category: "Eyeshadow",
                price: 180,
                rating: 4.4,
                reviews_count: 1005,
                description: "Deep Black Twist Up Pencil With Matte Finish, Lasts 24 hrs",
                image_url: "a5d57eeLAKME00000333_4.avif"
            },
            {
                id: "5",
                name: "Cheek It Up Blush",
                category: "Blush",
                price: 350,
                rating: 4.3,
                reviews_count: 70,
                description: "Natural glow blush",
                image_url: "SB-886_02_FOP-artguru.png"
            },
            {
                id: "6",
                name: "Lakme Precision Brush Liner Black",
                category: "Eyeshadow",
                price: 290,
                rating: 4.4,
                reviews_count: 123,
                description: "24-hour long wear liquid eyeliner with flexi-tip brush for sharp lines",
                image_url: "24894_H-8901030979552_Zawa.jpg"
            },
            {
                id: "7",
                name: "24 HRS Glam Mascara",
                category: "Eyeshadow",
                price: 445,
                rating: 4.6,
                reviews_count: 89,
                description: "Extreme length, long-lasting hold, waterproof formula",
                image_url: "mascara_24hr_glam_fexi_queen_EN_brush.webp"
            },
            {
                id: "8",
                name: "ETUDE House Glass Rouge Tint-K-Beauty SKin",
                category: "Lipstick",
                price: 899,
                rating: 5.0,
                reviews_count: 167,
                description: " A glossy lip tint giving your lips a luscious and radiant look.",
                image_url: "31B0oF2GFPL_Zawa.jpg"
            },
            {
                id: "9",
                name: "INSIGHT HIGHLIGHTER",
                category: "Blush",
                price: 125,
                rating: 4.3,
                reviews_count: 87,
                description: "H-01 06 COSMIC POWER",
                image_url: "61rqN3-HH_L,_SL1200-Picsart-AiImageEnhancer.webp"
            },
            {
                id: "10",
                name: "Maybelline Fit Me Matte + Poreless Compact",
                category: "Foundation",
                price: 200,
                rating: 4.8,
                reviews_count: 226,
                description: "Oil-control compact powder for smooth matte skin and pore blur effect",
                image_url: "Maybelline-Compact-Powder-1024x512.-pxbee-minitools-enhance-2026032714912.jpg"
            },
            {
                id: "11",
                name: " One Step Color Corrector Face Primer",
                category: "Foundation",
                price: 799,
                rating: 4.6,
                reviews_count: 567,
                description: "3 In 1Primer for Face Before Makeup,Sunscreen Isolation Cream, SPF 50",
                image_url: "712GS4coT5L_imgupscaler.ai_V1(Fast)_2K.png"
            },
            {
                id: "12",
                name: "Maybelline New York Instant Age Rewind Dark Circles Treatment Concealer",
                category: "Foundation",
                price: 424,
                rating: 4.1,
                reviews_count: 376,
                description: "Erase dark circles & fine lines, Long Lasting Concealer",
                image_url: "41JH2Raft3L._SX522_.jpg"
            },
            {
                id: "13",
                name: "Glam21 4-in-1 Eyebrow Palette",
                category: "Eyeshadow",
                price: 224,
                rating: 4.3,
                reviews_count: 48,
                description: "Micro Pigments for Precise Brows | Smudge-Proof & Long Lasting | All-in-One Eye Makeup Kit",
                image_url: "51HkrrB1WZL._SL1500_.jpg"
            },
            {
                id: "14",
                name: "Recode RE08 Featherlight Faux Mink Eyelashes",
                category: "Eyeshadow",
                price: 639,
                rating: 4.8,
                reviews_count: 69,
                description: "Transparent Band,Pack of 10",
                image_url: "71em1llKsGL._SY679_PIbundle-10,TopRight,0,0_SX509SY679SH20_.jpg"
            },
            {
                id: "15",
                name: "NSIGHT Color Rich Lip Liner| Intense Pigment",
                category: "Lipstick",
                price: 100,
                rating: 4.0,
                reviews_count: 84,
                description: "Defines, Shapes & Nourishes Lips | Long-Lasting ",
                image_url: "61Bx9LAhepL._SX522_.jpg"
            }
        ];
    }

    // ==================== RENDER PRODUCTS ====================
    function renderProducts(filterCategory = 'all') {
        const filteredProducts = filterCategory === 'all'
            ? products
            : products.filter(p => p.category === filterCategory);

        elements.productsGrid.innerHTML = filteredProducts.map((product, index) => `
    <div class="product-card id-${index + 1}">
        <img src="${product.image_url}" class="product-image">
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">₹${product.price}</div>
            <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
   🛒 Add to Cart
</button>
        </div>
    </div>
`).join('');
    }

    // ==================== CART ====================//

    // Single global addToCart function
    window.addToCart = function(productId) {
        const existingItem = cart.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ productId, quantity: 1 });
        }
        saveCart();
        renderCart();
        // Cart no longer opens automatically; user can open via cart button.
    };

    // Increment quantity
    window.incrementItem = function(productId) {
        const item = cart.find(item => item.productId === productId);
        if (item) {
            item.quantity += 1;
            saveCart();
            renderCart();
        }
    };

    // Decrement quantity
    window.decrementItem = function(productId) {
        const item = cart.find(item => item.productId === productId);
        if (item) {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.productId !== productId);
            }
            saveCart();
            renderCart();
        }
    };

    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.productId !== productId);
        saveCart();
        renderCart();
    };

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // ==================== CALCULATE TOTAL ====================
    function calculateTotal() {
        return cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return sum;
            return sum + product.price * item.quantity;
        }, 0);
    }

    // ==================== UPDATE ALL PRICES EVERYWHERE ====================
    function updateAllPrices() {
        const total = calculateTotal();
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        // 1. Cart badge count
        elements.cartCount.textContent = totalCount;

        // 2. Cart sidebar total
        elements.totalAmount.textContent = `₹${total}`;

        // 3. Cart-total span (below overlay)
        const cartTotalEl = document.getElementById("cart-total");
        if (cartTotalEl) {
            cartTotalEl.innerText = "₹" + total;
        }

        // 4. Checkout total
        const checkoutTotalEl = document.getElementById("checkout-total");
        if (checkoutTotalEl) {
            checkoutTotalEl.innerText = "₹" + total;
        }

        // 5. Save to localStorage for any external use
        localStorage.setItem("cartTotal", total);
    }

    // ==================== RENDER CART ====================
    function renderCart() {
        if (cart.length === 0) {
            elements.cartItems.innerHTML = `<p style="text-align:center; color:#999; padding:40px 0;">Your cart is empty</p>`;
        } else {
            elements.cartItems.innerHTML = cart.map(item => {
                const product = products.find(p => p.id === item.productId);
                if (!product) return '';
                const itemTotal = product.price * item.quantity;
                return `
                    <div class="cart-item" style="display:flex; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid #eee;">
                        <img src="${product.image_url}" alt="${product.name}" style="width:55px; height:55px; object-fit:cover; border-radius:8px;">
                        <div style="flex:1;">
                            <div style="font-weight:600; font-size:14px;">${product.name}</div>
                            <div style="color:#888; font-size:12px;">₹${product.price} each</div>
                            <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
                                <button onclick="decrementItem('${product.id}')" style="width:28px; height:28px; border:1px solid #ddd; background:#f5f5f5; border-radius:6px; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center;">−</button>
                                <span style="font-weight:600; min-width:20px; text-align:center;">${item.quantity}</span>
                                <button onclick="incrementItem('${product.id}')" style="width:28px; height:28px; border:1px solid #ddd; background:#f5f5f5; border-radius:6px; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center;">+</button>
                            </div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-weight:700; color:#c2185b;">₹${itemTotal}</div>
                            <button onclick="removeFromCart('${product.id}')" style="background:none; border:none; color:#e53935; cursor:pointer; font-size:12px; margin-top:4px;">✕ Remove</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Update ALL price displays everywhere
        updateAllPrices();

        // Also update checkout items if checkout modal is open
        renderCheckoutItems();
    }

    // ==================== RENDER CHECKOUT ITEMS ====================
    function renderCheckoutItems() {
        if (!elements.checkoutItems) return;

        if (cart.length === 0) {
            elements.checkoutItems.innerHTML = '<p>No items</p>';
            return;
        }

        elements.checkoutItems.innerHTML = cart.map(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return '';
            const itemTotal = product.price * item.quantity;
            return `
                <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f0f0f0;">
                    <span>${product.name} × ${item.quantity}</span>
                    <span style="font-weight:600;">₹${itemTotal}</span>
                </div>
            `;
        }).join('');
    }

    // ==================== UI ====================
    function openCart() {
        elements.cartSidebar.classList.add('active');
        elements.cartOverlay.classList.add('active');
    }

    function closeCart() {
        elements.cartSidebar.classList.remove('active');
        elements.cartOverlay.classList.remove('active');
    }

    function openCheckout() {
        if (cart.length === 0) return;
        // Refresh checkout items and total before showing
        renderCheckoutItems();
        updateAllPrices();
        elements.checkoutModal.classList.add('active');
        elements.modalOverlay.classList.add('active');
    }

    function closeCheckout() {
        elements.checkoutModal.classList.remove('active');
        elements.modalOverlay.classList.remove('active');
    }

    function openSuccess() {
        elements.successModal.classList.add('active');
        elements.modalOverlay.classList.add('active');
        elements.orderId.textContent = Math.floor(Math.random() * 100000);
    }

    function closeSuccess() {
        elements.successModal.classList.remove('active');
        elements.modalOverlay.classList.remove('active');
        location.reload();
    }

    // ==================== EVENTS ====================
    elements.cartBtn.addEventListener('click', openCart);
    elements.closeCart.addEventListener('click', closeCart);
    elements.cartOverlay.addEventListener('click', closeCart);
    elements.checkoutBtn.addEventListener('click', openCheckout);
    elements.closeCheckout.addEventListener('click', closeCheckout);
    elements.closeSuccess.addEventListener('click', closeSuccess);

    elements.categoryFilter.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            document.querySelectorAll('.category-btn')
                .forEach(btn => btn.classList.remove('active'));

            e.target.classList.add('active');
            renderProducts(e.target.dataset.category);
        }
    });

    elements.checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        cart = [];
        saveCart();
        renderCart();
        closeCheckout();
        openSuccess();
    });

    // ==================== INIT ====================
    async function init() {
        await fetchProducts();
        renderProducts();
        renderCart();
        setTimeout(() => elements.loading.style.display = 'none', 500);
    }

    init();
});
