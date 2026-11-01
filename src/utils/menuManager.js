import menuData from '../data/menu.json';
import kitchenInfoData from '../data/kitchenInfo.json';
import { ICONS } from './linkParser.js';

// Local storage keys
const STORAGE_KEY_CART = 'rk_cart_state';
const STORAGE_KEY_CUSTOMER = 'rk_customer_info';

// Standard 1-Hour Cake Delivery Slots (Bakery open for delivery 10 AM to 12 AM Midnight)
const CAKE_DELIVERY_SLOTS = [
  { id: 'slot-10-11', label: '10:00 AM – 11:00 AM (Morning)', startHour: 10, endHour: 11 },
  { id: 'slot-11-12', label: '11:00 AM – 12:00 PM (Morning)', startHour: 11, endHour: 12 },
  { id: 'slot-12-13', label: '12:00 PM – 1:00 PM (Lunch)', startHour: 12, endHour: 13 },
  { id: 'slot-13-14', label: '1:00 PM – 2:00 PM (Early Afternoon)', startHour: 13, endHour: 14 },
  { id: 'slot-14-15', label: '2:00 PM – 3:00 PM (Afternoon)', startHour: 14, endHour: 15 },
  { id: 'slot-15-16', label: '3:00 PM – 4:00 PM (Tea Time)', startHour: 15, endHour: 16 },
  { id: 'slot-16-17', label: '4:00 PM – 5:00 PM (Tea Time)', startHour: 16, endHour: 17 },
  { id: 'slot-17-18', label: '5:00 PM – 6:00 PM (Early Evening)', startHour: 17, endHour: 18 },
  { id: 'slot-18-19', label: '6:00 PM – 7:00 PM (Evening)', startHour: 18, endHour: 19 },
  { id: 'slot-19-20', label: '7:00 PM – 8:00 PM (Evening Celebration)', startHour: 19, endHour: 20 },
  { id: 'slot-20-21', label: '8:00 PM – 9:00 PM (Dinner & Party)', startHour: 20, endHour: 21 },
  { id: 'slot-21-22', label: '9:00 PM – 10:00 PM (Late Night)', startHour: 21, endHour: 22 },
  { id: 'slot-22-23', label: '10:00 PM – 11:00 PM (Late Night)', startHour: 22, endHour: 23 },
  { id: 'slot-23-24', label: '11:00 PM – 12:00 AM (Midnight Delivery 🎂)', startHour: 23, endHour: 24 }
];

function formatYMD(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatFriendlyDate(d) {
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

// SVG Icons for the Menu & Cart
const MENU_ICONS = {
  cart: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="cart-svg-icon">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
      <path d="M3 6h18"></path>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  `,
  trash: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trash-icon">
      <path d="M3 6h18"></path>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  `,
  search: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,
  close: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `,
  arrowRight: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  `,
  check: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `,
  menuBook: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
      <path d="M6 6h10"></path>
      <path d="M6 10h10"></path>
    </svg>
  `,
  image: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
      <circle cx="9" cy="9" r="2"></circle>
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
    </svg>
  `
};

function getDietaryBadge(dietary) {
  if (dietary === 'egg') {
    return `
      <span class="diet-badge diet-egg" title="Contains Egg" aria-label="Egg Dish">
        <span class="diet-dot"></span>
      </span>
    `;
  }
  if (dietary === 'non-veg') {
    return `
      <span class="diet-badge diet-nonveg" title="Non-Vegetarian (Chicken)" aria-label="Non-Vegetarian">
        <span class="diet-dot"></span>
      </span>
    `;
  }
  return `
    <span class="diet-badge diet-veg" title="100% Pure Vegetarian" aria-label="Vegetarian">
      <span class="diet-dot"></span>
    </span>
  `;
}

/**
 * Menu Manager handles state, UI rendering, cart mutations, modal window, and WhatsApp messaging
 */
class MenuManager {
  constructor() {
    this.cart = this.loadCart();
    this.activeCategory = 'all';
    this.activeDietary = 'all'; // 'all' | 'veg' | 'egg' | 'non-veg'
    this.activeViewMode = 'digital'; // 'digital' | 'card'
    this.searchQuery = '';
    this.selectedDateType = 'today'; // 'today' | 'tomorrow' | 'custom'
    this.selectedDate = ''; // 'YYYY-MM-DD'
    this.selectedTimeSlot = '';
    this.selectedPaymentMode = 'pay_confirmation'; // 'pay_confirmation' | 'razorpay_link'
    this.lastGeneratedWhatsAppUrl = '';
    this.lastOrderSummaryText = '';
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }

  saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(this.cart));
    } catch {
      // Ignore
    }
  }

  loadCustomerInfo() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOMER);
      return saved ? JSON.parse(saved) : { name: '', phone: '', address: '', notes: '' };
    } catch {
      return { name: '', phone: '', address: '', notes: '' };
    }
  }

  saveCustomerInfo(info) {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOMER, JSON.stringify(info));
    } catch {
      // Ignore
    }
  }

  getItemById(id) {
    return menuData.items.find(item => item.id === id);
  }

  getCartCount(id) {
    return this.cart[id] || 0;
  }

  getCartTotals() {
    let totalItems = 0;
    let itemsTotal = 0;
    const itemsList = [];

    for (const [id, qty] of Object.entries(this.cart)) {
      if (qty > 0) {
        const item = this.getItemById(id);
        if (item) {
          totalItems += qty;
          itemsTotal += item.price * qty;
          itemsList.push({ ...item, quantity: qty, itemTotal: item.price * qty });
        }
      }
    }

    const deliveryFee = totalItems > 0 ? 30 : 0;
    const grandTotal = itemsTotal + deliveryFee;

    return { totalItems, itemsTotal, deliveryFee, grandTotal, totalPrice: grandTotal, itemsList };
  }

  setItemQuantity(id, qty) {
    if (qty <= 0) {
      delete this.cart[id];
    } else {
      this.cart[id] = qty;
    }
    this.saveCart();
    this.updateUI();
  }

  changeItemQuantity(id, delta) {
    const current = this.getCartCount(id);
    const newQty = Math.max(0, current + delta);
    this.setItemQuantity(id, newQty);
    
    if (window.navigator?.vibrate) {
      window.navigator.vibrate(12);
    }
  }

  clearCart() {
    this.cart = {};
    this.saveCart();
    this.updateUI();
  }

  /**
   * Initialize digital menu & modal window
   */
  init() {
    this.injectMenuWindowModal();
    this.injectCartUI();
    this.updateUI();
    this.setupEventListeners();
  }

  /**
   * Open the dedicated Menu Window Modal
   */
  openMenuWindow(initialMode = 'digital') {
    this.closeDrawer();
    this.activeViewMode = initialMode;
    const modal = document.getElementById('menu-window-modal');
    const backdrop = document.getElementById('menu-window-backdrop');
    if (modal && backdrop) {
      this.syncViewModeTabs();
      backdrop.classList.add('is-active');
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      
      // Render content
      this.renderItemsList();
    }
  }

  closeMenuWindow() {
    const modal = document.getElementById('menu-window-modal');
    const backdrop = document.getElementById('menu-window-backdrop');
    if (modal && backdrop) {
      modal.classList.remove('is-open');
      backdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  syncViewModeTabs() {
    const digitalTab = document.getElementById('tab-mode-digital');
    const cardTab = document.getElementById('tab-mode-card');
    const digitalView = document.getElementById('menu-view-digital');
    const cardView = document.getElementById('menu-view-card');

    if (this.activeViewMode === 'digital') {
      digitalTab?.classList.add('is-active');
      cardTab?.classList.remove('is-active');
      if (digitalView) digitalView.style.display = 'block';
      if (cardView) cardView.style.display = 'none';
    } else {
      cardTab?.classList.add('is-active');
      digitalTab?.classList.remove('is-active');
      if (cardView) cardView.style.display = 'block';
      if (digitalView) digitalView.style.display = 'none';
    }
  }

  /**
   * Inject Full Menu Window Modal into the DOM
   */
  injectMenuWindowModal() {
    if (document.getElementById('menu-window-modal')) return;

    const modalHtml = `
      <div id="menu-window-backdrop" class="menu-window-backdrop" aria-hidden="true"></div>

      <div id="menu-window-modal" class="menu-window-modal" role="dialog" aria-modal="true" aria-labelledby="menu-win-title">
        <!-- Top App Bar -->
        <header class="menu-win-header">
          <div class="menu-win-title-wrap">
            <h2 id="menu-win-title" class="menu-win-title">Riya’s Kitchen | Cakes</h2>
            <span class="menu-win-tagline">Freshly Baked on Order • Express & Premium Deliveries</span>
          </div>
          <button id="close-menu-win-btn" class="menu-win-close-btn" aria-label="Close cake menu">
            ${MENU_ICONS.close}
          </button>
        </header>

        <!-- View Mode Switcher: Cake Menu vs Delivery Rules -->
        <div class="menu-mode-switcher" role="tablist">
          <button id="tab-mode-digital" class="mode-tab-btn is-active" data-mode="digital">
            <span class="tab-icon">🎂</span>
            <span>Cake Menu</span>
          </button>
          <button id="tab-mode-card" class="mode-tab-btn" data-mode="card">
            <span class="tab-icon">⏰</span>
            <span>Delivery Rules & Timings</span>
          </button>
        </div>

        <!-- Scrollable Menu Content Area -->
        <div class="menu-win-body">
          
          <!-- TAB 1: Digital Interactive Menu -->
          <div id="menu-view-digital" class="menu-view-content">
            <!-- Search Bar -->
            <div class="menu-search-wrapper">
              <span class="search-icon-slot" aria-hidden="true">${MENU_ICONS.search}</span>
              <input 
                type="search" 
                id="menu-search-input" 
                class="menu-search-input" 
                placeholder="Search chocolate truffle, pineapple, bento, red velvet..." 
                autocomplete="off"
                aria-label="Search cake menu"
              />
              <button id="menu-search-clear" class="search-clear-btn" style="display: none;" aria-label="Clear search">
                ✕
              </button>
            </div>

            <!-- Dietary Filter Chips (Veg / Egg / Non-Veg) -->
            <div class="dietary-filter-bar" role="group" aria-label="Filter by dietary preference">
              <button class="diet-chip is-active" data-diet="all">All Dishes (${menuData.items.length})</button>
              <button class="diet-chip" data-diet="veg">
                <span class="chip-dot veg-dot"></span>
                <span>Pure Veg</span>
              </button>
              <button class="diet-chip" data-diet="egg">
                <span class="chip-dot egg-dot"></span>
                <span>Egg</span>
              </button>
              <button class="diet-chip" data-diet="non-veg">
                <span class="chip-dot nonveg-dot"></span>
                <span>Chicken</span>
              </button>
            </div>

            <!-- Category Filter Tabs -->
            <div class="category-tabs-container" role="tablist" aria-label="Menu Categories">
              ${menuData.categories.map(cat => `
                <button 
                  class="cat-tab ${cat.id === this.activeCategory ? 'is-active' : ''}" 
                  data-cat-id="${cat.id}"
                  role="tab"
                  aria-selected="${cat.id === this.activeCategory}"
                >
                  <span>${cat.name}</span>
                </button>
              `).join('')}
            </div>

            <!-- Items List -->
            <div class="menu-items-grid" id="modal-menu-items-grid">
              <!-- Rendered dynamically -->
            </div>
          </div>

          <!-- TAB 2: Delivery Rules & Timings -->
          <div id="menu-view-card" class="menu-view-content" style="display: none;">
            <div class="cake-rules-card">
              <div class="rule-box express-rule">
                <div class="rule-badge">⚡ Express Delivery (1–2 Hours)</div>
                <h4 class="rule-title">Normal Cakes</h4>
                <p class="rule-desc">Baked 100% fresh upon order. Delivered to your doorstep in <strong>1 to 2 hours</strong>. Last delivery slot is available until <strong>12:00 AM midnight</strong>.</p>
              </div>

              <div class="rule-box premium-rule">
                <div class="rule-badge">🌟 Premium 4-Hour Delivery</div>
                <h4 class="rule-title">Premium & Designer Cakes</h4>
                <p class="rule-desc">Baking starts at <strong>8:00 AM</strong>. Delivered in <strong>4 hours</strong>. Deliveries start at <strong>1:00 PM</strong> and run till <strong>12:00 AM midnight</strong>.</p>
              </div>

              <div class="rule-box cutoff-rule">
                <div class="rule-badge">🕒 Order Cutoffs & Next-Day Slots</div>
                <ul class="rule-list">
                  <li><strong>Same-Day Cutoff:</strong> Last order at <strong>8:00 PM</strong> so your cake is freshly baked and delivered by 12:00 AM midnight.</li>
                  <li><strong>Late Evening Orders (After 9:00 PM):</strong> Automatically booked for <strong>next-day 1:00 PM delivery</strong>.</li>
                  <li><strong>Advance Bookings:</strong> You can pre-order for any upcoming date and preferred time slot.</li>
                </ul>
              </div>

              <div class="menu-card-floating-action">
                <button id="switch-to-picker-btn" class="order-from-card-btn">
                  <span>Browse Cakes & Place Order ➔</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  renderItemsList() {
    const grid = document.getElementById('modal-menu-items-grid');
    if (!grid) return;

    const query = this.searchQuery.trim().toLowerCase();
    
    // Filter items by category, dietary, and search query
    const filtered = menuData.items.filter(item => {
      const matchesCat = this.activeCategory === 'all' || item.category === this.activeCategory;
      const matchesDiet = this.activeDietary === 'all' || item.dietary === this.activeDietary;
      const matchesQuery = !query || 
        item.name.toLowerCase().includes(query) || 
        (item.description && item.description.toLowerCase().includes(query));
      return matchesCat && matchesDiet && matchesQuery;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="menu-empty-state">
          <div class="empty-icon">🍲</div>
          <h4>No matching dishes found</h4>
          <p>Try resetting filters or searching for another dish.</p>
          <button id="reset-filter-btn" class="empty-reset-btn">View All Dishes</button>
        </div>
      `;
      const resetBtn = grid.querySelector('#reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.activeCategory = 'all';
          this.activeDietary = 'all';
          this.searchQuery = '';
          const searchInput = document.getElementById('menu-search-input');
          if (searchInput) searchInput.value = '';
          
          document.querySelectorAll('.cat-tab').forEach(t => t.classList.toggle('is-active', t.getAttribute('data-cat-id') === 'all'));
          document.querySelectorAll('.diet-chip').forEach(c => c.classList.toggle('is-active', c.getAttribute('data-diet') === 'all'));
          this.renderItemsList();
        });
      }
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const qty = this.getCartCount(item.id);
      const dietaryBadgeHtml = getDietaryBadge(item.dietary);

      return `
        <article class="dish-card ${qty > 0 ? 'in-cart' : ''}" data-item-id="${item.id}">
          <div class="dish-main-row">
            <div class="dish-details">
              <div class="dish-meta">
                ${dietaryBadgeHtml}
                ${item.badge ? `<span class="dish-badge">${escapeHTML(item.badge)}</span>` : ''}
              </div>
              <h3 class="dish-name">${escapeHTML(item.name)}</h3>
              <div class="dish-price">₹${item.price}</div>
              <p class="dish-desc">${escapeHTML(item.description)}</p>
            </div>

            <div class="dish-action-col">
              <div class="dish-stepper-wrapper">
                ${qty === 0 ? `
                  <button class="add-to-cart-btn" data-action="add" data-item-id="${item.id}">
                    <span class="plus-sign">+</span>
                    <span>ADD</span>
                  </button>
                ` : `
                  <div class="stepper-controls">
                    <button class="step-btn step-minus" data-action="decrease" data-item-id="${item.id}" aria-label="Decrease quantity">
                      ${qty === 1 ? MENU_ICONS.trash : '−'}
                    </button>
                    <span class="step-count">${qty}</span>
                    <button class="step-btn step-plus" data-action="increase" data-item-id="${item.id}" aria-label="Increase quantity">
                      +
                    </button>
                  </div>
                `}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Inject Bottom Floating Cart & Checkout Drawer
   */
  injectCartUI() {
    if (document.getElementById('floating-cart-bar')) return;

    const cartHtml = `
      <!-- Sticky Bottom Floating Cart Bar -->
      <aside id="floating-cart-bar" class="floating-cart-bar" aria-label="Order Cart" style="display: none;">
        <div class="cart-bar-inner">
          <div class="cart-summary-group">
            <div class="cart-icon-wrapper">
              ${MENU_ICONS.cart}
              <span id="cart-badge-count" class="cart-badge-count">0</span>
            </div>
            <div class="cart-price-info">
              <span id="cart-total-price" class="cart-total-price">₹0</span>
              <span class="cart-tax-hint">incl. ₹30 delivery</span>
            </div>
          </div>

          <button id="open-cart-btn" class="view-cart-btn">
            <span>View Cart & Order</span>
            <span class="btn-arrow" aria-hidden="true">${MENU_ICONS.arrowRight}</span>
          </button>
        </div>
      </aside>

      <!-- Slide-Up Checkout Drawer & Backdrop -->
      <div id="checkout-backdrop" class="checkout-backdrop" aria-hidden="true"></div>
      
      <section id="checkout-drawer" class="checkout-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div class="drawer-drag-pill" aria-hidden="true"></div>

        <div class="drawer-header">
          <div class="drawer-title-group">
            <h2 id="drawer-title" class="drawer-title">Your Order Summary</h2>
            <span class="drawer-subtitle">Riya’s Kitchen • Freshly Prepared</span>
          </div>
          <button id="close-drawer-btn" class="drawer-close-btn" aria-label="Close cart">
            ${MENU_ICONS.close}
          </button>
        </div>

        <div class="drawer-body">
          <!-- Cart Items List -->
          <div class="drawer-cart-items" id="drawer-cart-items">
            <!-- Dynamically populated in updateUI() -->
          </div>

          <!-- Price Breakdown Summary -->
          <div class="bill-summary-card">
            <div class="bill-row">
              <span>Cakes Subtotal</span>
              <span id="bill-subtotal" class="bill-subtotal-val">₹0</span>
            </div>
            <div class="bill-row delivery-row">
              <span>Standard Delivery</span>
              <span id="bill-delivery" class="bill-delivery-val">₹30</span>
            </div>
            <div class="bill-divider"></div>
            <div class="bill-row total-row">
              <span class="total-label">Grand Total</span>
              <span id="bill-grandtotal" class="bill-grandtotal-val">₹0</span>
            </div>
          </div>

          <!-- Customer Delivery Form -->
          <form id="order-checkout-form" class="order-checkout-form" onsubmit="return false;">
            <div class="form-section-title">
              <span class="form-title-badge">1</span>
              <span>Delivery Details</span>
            </div>

            <div class="form-group">
              <label for="cust-name" class="form-label">Full Name <span class="req">*</span></label>
              <input 
                type="text" 
                id="cust-name" 
                class="form-input" 
                placeholder="Enter your full name" 
                required 
                autocomplete="name"
              />
            </div>

            <div class="form-group">
              <label for="cust-phone" class="form-label">WhatsApp Mobile Number <span class="req">*</span></label>
              <div class="phone-input-wrapper">
                <span class="phone-country-code">+91</span>
                <input 
                  type="tel" 
                  id="cust-phone" 
                  class="form-input phone-field" 
                  placeholder="98765 43210" 
                  maxlength="10" 
                  required 
                  autocomplete="tel"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="cust-address" class="form-label">Full Delivery Address <span class="req">*</span></label>
              <textarea 
                id="cust-address" 
                class="form-textarea" 
                rows="2" 
                placeholder="Flat / House No, Building, Street, Area & Landmark" 
                required
              ></textarea>
            </div>

            <!-- Delivery Date & Time Selector (2-4 Hours Advance Notice) -->
            <div class="form-group datetime-slot-group">
              <div class="datetime-label-row">
                <label class="form-label" for="delivery-date-input">Delivery Date & Time Slot <span class="req">*</span></label>
                <span class="advance-pill-badge">⚡ 2–4 hrs advance notice</span>
              </div>

              <!-- Quick Date Chips -->
              <div class="date-chips-row" id="date-chips-row" role="group" aria-label="Select delivery date">
                <button type="button" class="date-chip is-selected" data-date-type="today">
                  <span class="chip-title">Today</span>
                  <span class="chip-subtitle" id="quick-date-today-sub">--</span>
                </button>
                <button type="button" class="date-chip" data-date-type="tomorrow">
                  <span class="chip-title">Tomorrow</span>
                  <span class="chip-subtitle" id="quick-date-tomorrow-sub">--</span>
                </button>
                <button type="button" class="date-chip" data-date-type="custom">
                  <span class="chip-title">Pick Date</span>
                  <span class="chip-subtitle">📅 Calendar</span>
                </button>
              </div>

              <!-- Custom Date Picker Field -->
              <div class="custom-date-field-wrap" id="custom-date-field-wrap" style="display: none;">
                <input 
                  type="date" 
                  id="delivery-date-input" 
                  class="form-input date-input-control" 
                />
              </div>

              <!-- Time Slot Dropdown -->
              <div class="time-slot-wrapper">
                <label for="delivery-time-select" class="time-field-label">
                  <span>Select Delivery Time Window:</span>
                </label>
                <div class="select-input-container">
                  <span class="select-prefix-icon" aria-hidden="true">🕒</span>
                  <select id="delivery-time-select" class="form-select time-dropdown" required>
                    <!-- Populated dynamically based on 2-4 hrs advance calculation -->
                  </select>
                </div>
              </div>

              <!-- Advance Notice Helper -->
              <div id="advance-notice-info" class="advance-notice-info">
                <span class="notice-icon" aria-hidden="true">🎂</span>
                <span id="advance-notice-text">All cakes are baked 100% fresh upon order. Please allow 2–4 hours advance notice.</span>
              </div>
            </div>

            <!-- Cake Customization Notes -->
            <div class="form-group">
              <label for="cust-notes" class="form-label">Message on Cake / Customization (Optional)</label>
              <input 
                type="text" 
                id="cust-notes" 
                class="form-input" 
                placeholder="e.g. Message: Happy Birthday Priya! • Less sweet • Add candles" 
              />
            </div>

            <!-- Payment Preference Option -->
            <div class="form-section-title payment-section-title">
              <span class="form-title-badge">2</span>
              <span>Payment Preference</span>
            </div>

            <div class="payment-options-grid">
              <label class="payment-card-option">
                <input type="radio" name="payment_mode" value="pay_confirmation" checked />
                <div class="payment-card-content">
                  <div class="payment-title">Pay on Confirmation (UPI / Cash)</div>
                  <div class="payment-desc">Pay via GPay, PhonePe, or Cash after your order is confirmed.</div>
                </div>
              </label>

              <label class="payment-card-option">
                <input type="radio" name="payment_mode" value="razorpay_link" />
                <div class="payment-card-content">
                  <div class="payment-title">Send Razorpay / UPI Link</div>
                  <div class="payment-desc">Kitchen will send an instant payment link on WhatsApp.</div>
                </div>
              </label>
            </div>

            <!-- Validation Error Alert -->
            <div id="checkout-error-msg" class="form-error-alert" style="display: none;"></div>

            <!-- Submit CTA -->
            <div class="drawer-cta-wrapper">
              <button type="button" id="place-order-whatsapp-btn" class="whatsapp-submit-btn">
                <span class="wa-btn-icon">${ICONS.whatsapp}</span>
                <span class="wa-btn-text">Send Order to WhatsApp (1-Tap)</span>
              </button>
              <p class="drawer-security-hint">
                🔒 Direct order to Riya’s Kitchen • Fast personal confirmation
              </p>
            </div>
          </form>
        </div>
      </section>

      <!-- Order Sent Success Modal -->
      <div id="order-success-backdrop" class="success-backdrop" style="display: none;">
        <div class="order-success-modal" role="dialog" aria-modal="true">
          <div class="success-icon-box">
            ${MENU_ICONS.check}
          </div>
          <h3 class="success-title">Order Generated! 🎉</h3>
          <p class="success-body">
            Your WhatsApp has been opened with your complete order details. 
            <strong>Please tap "Send" in WhatsApp</strong> so Riya’s Kitchen receives your order!
          </p>

          <div class="success-actions">
            <a id="success-whatsapp-reopen-btn" class="success-action-primary" target="_blank" rel="noopener noreferrer">
              <span>Open WhatsApp Again</span>
            </a>
            <button id="success-copy-order-btn" class="success-action-secondary">
              <span>Copy Order Text</span>
            </button>
            <button id="success-done-btn" class="success-action-close">
              <span>Back to Menu</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', cartHtml);

    // Prepopulate customer details if saved
    const savedCustomer = this.loadCustomerInfo();
    const nameInput = document.getElementById('cust-name');
    const phoneInput = document.getElementById('cust-phone');
    const addrInput = document.getElementById('cust-address');
    const notesInput = document.getElementById('cust-notes');

    if (nameInput && savedCustomer.name) nameInput.value = savedCustomer.name;
    if (phoneInput && savedCustomer.phone) phoneInput.value = savedCustomer.phone;
    if (addrInput && savedCustomer.address) addrInput.value = savedCustomer.address;
    if (notesInput && savedCustomer.notes) notesInput.value = savedCustomer.notes;
  }

  /**
   * Update Floating Cart and Drawer Content
   */
  updateUI() {
    const { totalItems, itemsTotal, deliveryFee, grandTotal, itemsList } = this.getCartTotals();

    // 1. Update Floating Cart Bar
    const floatingBar = document.getElementById('floating-cart-bar');
    const badgeCount = document.getElementById('cart-badge-count');
    const totalPriceEl = document.getElementById('cart-total-price');

    if (floatingBar) {
      if (totalItems > 0) {
        floatingBar.style.display = 'block';
        floatingBar.classList.add('is-visible');
      } else {
        floatingBar.classList.remove('is-visible');
        setTimeout(() => {
          if (this.getCartTotals().totalItems === 0) {
            floatingBar.style.display = 'none';
          }
        }, 300);
      }
    }

    if (badgeCount) badgeCount.textContent = totalItems;
    if (totalPriceEl) totalPriceEl.textContent = `₹${grandTotal}`;

    // 2. Update Drawer Cart Items
    const drawerItemsContainer = document.getElementById('drawer-cart-items');
    const billSubtotal = document.getElementById('bill-subtotal');
    const billDelivery = document.getElementById('bill-delivery');
    const billGrandtotal = document.getElementById('bill-grandtotal');

    if (billSubtotal) billSubtotal.textContent = `₹${itemsTotal}`;
    if (billDelivery) billDelivery.textContent = `₹${deliveryFee}`;
    if (billGrandtotal) billGrandtotal.textContent = `₹${grandTotal}`;

    if (drawerItemsContainer) {
      if (itemsList.length === 0) {
        drawerItemsContainer.innerHTML = `
          <div class="drawer-empty-cart">
            <span class="empty-cart-emoji">🍽️</span>
            <p>Your cart is empty. Add delicious homestyle items from the menu!</p>
          </div>
        `;
      } else {
        drawerItemsContainer.innerHTML = itemsList.map(item => `
          <div class="cart-drawer-item">
            <div class="drawer-item-info">
              <span class="drawer-item-title">${escapeHTML(item.name)}</span>
              <span class="drawer-item-price">₹${item.price} each</span>
            </div>

            <div class="drawer-item-controls">
              <div class="stepper-controls drawer-stepper">
                <button class="step-btn step-minus" data-action="decrease" data-item-id="${item.id}" aria-label="Decrease quantity">
                  ${item.quantity === 1 ? MENU_ICONS.trash : '−'}
                </button>
                <span class="step-count">${item.quantity}</span>
                <button class="step-btn step-plus" data-action="increase" data-item-id="${item.id}" aria-label="Increase quantity">
                  +
                </button>
              </div>
              <div class="drawer-item-subtotal">₹${item.itemTotal}</div>
            </div>
          </div>
        `).join('');
      }
    }

    // 3. Re-render items in modal
    this.renderItemsList();
  }

  setupEventListeners() {
    // 1. Menu Grid Delegated Click Listener
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.getAttribute('data-action');
      const itemId = btn.getAttribute('data-item-id');
      if (!itemId) return;

      if (action === 'add' || action === 'increase') {
        this.changeItemQuantity(itemId, 1);
      } else if (action === 'decrease') {
        this.changeItemQuantity(itemId, -1);
      }
    });

    // 2. View Mode Tabs (Digital Menu vs Original Menu Card)
    const digitalTab = document.getElementById('tab-mode-digital');
    const cardTab = document.getElementById('tab-mode-card');
    const switchToPicker = document.getElementById('switch-to-picker-btn');

    if (digitalTab) {
      digitalTab.addEventListener('click', () => {
        this.activeViewMode = 'digital';
        this.syncViewModeTabs();
      });
    }

    if (cardTab) {
      cardTab.addEventListener('click', () => {
        this.activeViewMode = 'card';
        this.syncViewModeTabs();
      });
    }

    if (switchToPicker) {
      switchToPicker.addEventListener('click', () => {
        this.activeViewMode = 'digital';
        this.syncViewModeTabs();
      });
    }

    // 3. Dietary Filter Chips
    const dietFilterBar = document.querySelector('.dietary-filter-bar');
    if (dietFilterBar) {
      dietFilterBar.addEventListener('click', (e) => {
        const chip = e.target.closest('.diet-chip');
        if (!chip) return;

        const diet = chip.getAttribute('data-diet');
        if (diet) {
          this.activeDietary = diet;
          dietFilterBar.querySelectorAll('.diet-chip').forEach(c => c.classList.remove('is-active'));
          chip.classList.add('is-active');
          this.renderItemsList();
        }
      });
    }

    // 4. Category Tab Clicks
    const catContainer = document.querySelector('.category-tabs-container');
    if (catContainer) {
      catContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.cat-tab');
        if (!tab) return;

        const catId = tab.getAttribute('data-cat-id');
        if (catId) {
          this.activeCategory = catId;
          catContainer.querySelectorAll('.cat-tab').forEach(t => {
            t.classList.remove('is-active');
            t.setAttribute('aria-selected', 'false');
          });
          tab.classList.add('is-active');
          tab.setAttribute('aria-selected', 'true');
          this.renderItemsList();
        }
      });
    }

    // 5. Search Input
    const searchInput = document.getElementById('menu-search-input');
    const searchClear = document.getElementById('menu-search-clear');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        if (searchClear) {
          searchClear.style.display = this.searchQuery ? 'block' : 'none';
        }
        this.renderItemsList();
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          this.searchQuery = '';
          searchClear.style.display = 'none';
          this.renderItemsList();
          searchInput.focus();
        }
      });
    }

    // 6. Close Menu Window Modal
    const closeWinBtn = document.getElementById('close-menu-win-btn');
    const winBackdrop = document.getElementById('menu-window-backdrop');
    if (closeWinBtn) {
      closeWinBtn.addEventListener('click', () => this.closeMenuWindow());
    }
    if (winBackdrop) {
      winBackdrop.addEventListener('click', () => this.closeMenuWindow());
    }

    // 7. Open / Close Checkout Drawer
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const backdrop = document.getElementById('checkout-backdrop');

    if (openCartBtn) {
      openCartBtn.addEventListener('click', () => this.openDrawer());
    }

    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => this.closeDrawer());
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeDrawer());
    }

    // 8. Delivery Date & Time Picker Listeners
    const dateChipsRow = document.getElementById('date-chips-row');
    const dateInput = document.getElementById('delivery-date-input');
    const timeSelect = document.getElementById('delivery-time-select');

    if (dateChipsRow) {
      dateChipsRow.addEventListener('click', (e) => {
        const chip = e.target.closest('.date-chip');
        if (!chip || chip.classList.contains('is-disabled')) return;

        const dateType = chip.getAttribute('data-date-type');
        const todayObj = new Date();
        const tomorrowObj = new Date(todayObj.getTime() + 86400000);

        this.selectedDateType = dateType;

        if (dateType === 'today') {
          this.selectedDate = formatYMD(todayObj);
          if (dateInput) dateInput.value = this.selectedDate;
        } else if (dateType === 'tomorrow') {
          this.selectedDate = formatYMD(tomorrowObj);
          if (dateInput) dateInput.value = this.selectedDate;
        } else if (dateType === 'custom') {
          if (dateInput) {
            this.selectedDate = dateInput.value || formatYMD(todayObj);
            dateInput.focus();
          }
        }

        this.syncDateChipsUI();
        this.renderTimeSlots();
      });
    }

    if (dateInput) {
      dateInput.addEventListener('change', () => {
        this.selectedDate = dateInput.value;
        const todayObj = new Date();
        const tomorrowObj = new Date(todayObj.getTime() + 86400000);

        if (this.selectedDate === formatYMD(todayObj)) {
          this.selectedDateType = 'today';
        } else if (this.selectedDate === formatYMD(tomorrowObj)) {
          this.selectedDateType = 'tomorrow';
        } else {
          this.selectedDateType = 'custom';
        }

        this.syncDateChipsUI();
        this.renderTimeSlots();
      });
    }

    if (timeSelect) {
      timeSelect.addEventListener('change', () => {
        this.selectedTimeSlot = timeSelect.value;
      });
    }

    // 9. Payment Mode Radio Change
    const paymentRadios = document.querySelectorAll('input[name="payment_mode"]');
    paymentRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.selectedPaymentMode = e.target.value;
      });
    });

    // 10. WhatsApp Order Submission
    const submitBtn = document.getElementById('place-order-whatsapp-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.handleOrderSubmission());
    }

    // 11. Order Success Modal actions
    const successClose = document.getElementById('success-done-btn');
    const successCopy = document.getElementById('success-copy-order-btn');
    const successBackdrop = document.getElementById('order-success-backdrop');

    if (successClose) {
      successClose.addEventListener('click', () => {
        if (successBackdrop) successBackdrop.style.display = 'none';
      });
    }

    if (successCopy) {
      successCopy.addEventListener('click', () => {
        if (navigator.clipboard && this.lastOrderSummaryText) {
          navigator.clipboard.writeText(this.lastOrderSummaryText).then(() => {
            successCopy.querySelector('span').textContent = 'Copied to Clipboard! ✓';
            setTimeout(() => {
              successCopy.querySelector('span').textContent = 'Copy Order Text';
            }, 2500);
          });
        }
      });
    }
  }

  setupDateTimePicker() {
    const todayObj = new Date();
    const tomorrowObj = new Date(todayObj.getTime() + 86400000);

    const todayYMD = formatYMD(todayObj);
    const tomorrowYMD = formatYMD(tomorrowObj);

    const todaySub = document.getElementById('quick-date-today-sub');
    const tomorrowSub = document.getElementById('quick-date-tomorrow-sub');
    const dateInput = document.getElementById('delivery-date-input');

    if (todaySub) todaySub.textContent = todayObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    if (tomorrowSub) tomorrowSub.textContent = tomorrowObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

    // Calculate if any slots are left today (requires at least 2 hours advance notice before 12 AM midnight)
    const currentHour = todayObj.getHours();
    const currentMin = todayObj.getMinutes();
    const earliestHour = currentHour + 2 + (currentMin > 15 ? 1 : 0);
    const todayAvailableSlots = CAKE_DELIVERY_SLOTS.filter(s => s.startHour >= earliestHour);

    const todayChip = document.querySelector('[data-date-type="today"]');

    if (dateInput) {
      dateInput.min = todayYMD;
    }

    if (todayAvailableSlots.length === 0) {
      // Today is closed for fresh 2-4 hr baking
      if (todayChip) {
        todayChip.classList.add('is-disabled');
        todayChip.setAttribute('title', 'Today closed (requires 2-4 hrs advance booking before 12 AM)');
      }
      this.selectedDateType = 'tomorrow';
      this.selectedDate = tomorrowYMD;
      if (dateInput) dateInput.value = tomorrowYMD;
    } else {
      if (todayChip) {
        todayChip.classList.remove('is-disabled');
        todayChip.removeAttribute('title');
      }
      if (!this.selectedDate || this.selectedDateType === 'today') {
        this.selectedDateType = 'today';
        this.selectedDate = todayYMD;
        if (dateInput) dateInput.value = todayYMD;
      }
    }

    this.syncDateChipsUI();
    this.renderTimeSlots();
  }

  syncDateChipsUI() {
    const chips = document.querySelectorAll('.date-chip');
    chips.forEach(chip => {
      const type = chip.getAttribute('data-date-type');
      chip.classList.toggle('is-selected', type === this.selectedDateType);
    });

    const customWrap = document.getElementById('custom-date-field-wrap');
    if (customWrap) {
      customWrap.style.display = this.selectedDateType === 'custom' ? 'block' : 'none';
    }
  }

  renderTimeSlots() {
    const select = document.getElementById('delivery-time-select');
    const noticeEl = document.getElementById('advance-notice-info');
    const noticeText = document.getElementById('advance-notice-text');
    if (!select) return;

    const todayObj = new Date();
    const todayYMD = formatYMD(todayObj);
    const isToday = this.selectedDate === todayYMD;

    let availableSlots = [];
    if (isToday) {
      const currentHour = todayObj.getHours();
      const currentMin = todayObj.getMinutes();
      const earliestHour = currentHour + 2 + (currentMin > 15 ? 1 : 0);
      availableSlots = CAKE_DELIVERY_SLOTS.filter(s => s.startHour >= earliestHour);

      if (availableSlots.length === 0) {
        if (noticeEl && noticeText) {
          noticeEl.className = 'advance-notice-info is-warning';
          noticeText.textContent = "⚠️ Today's 2–4 hr advance booking cutoff has passed. Please select Tomorrow or a future date.";
        }
      } else {
        if (noticeEl && noticeText) {
          noticeEl.className = 'advance-notice-info';
          noticeText.textContent = `⚡ 2–4 hrs advance baking: Earliest delivery available today starts from ${availableSlots[0].label}.`;
        }
      }
    } else {
      availableSlots = [...CAKE_DELIVERY_SLOTS];
      if (noticeEl && noticeText) {
        noticeEl.className = 'advance-notice-info';
        noticeText.textContent = "🌟 Advance booking confirmed! We bake your cake fresh on your chosen delivery date.";
      }
    }

    if (availableSlots.length === 0) {
      select.innerHTML = `<option value="">No slots available for today</option>`;
      this.selectedTimeSlot = '';
    } else {
      select.innerHTML = availableSlots.map(slot => `
        <option value="${escapeHTML(slot.label)}">${escapeHTML(slot.label)}</option>
      `).join('') + `<option value="Custom Time (Mention in Notes below)">Custom Time (Mention in Notes below)</option>`;

      this.selectedTimeSlot = select.value;
    }
  }

  openDrawer() {
    const drawer = document.getElementById('checkout-drawer');
    const backdrop = document.getElementById('checkout-backdrop');
    if (drawer && backdrop) {
      this.setupDateTimePicker();
      backdrop.classList.add('is-active');
      drawer.classList.add('is-open');
    }
  }

  closeDrawer() {
    const drawer = document.getElementById('checkout-drawer');
    const backdrop = document.getElementById('checkout-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-active');
    }
  }

  /**
   * Validate and generate WhatsApp order
   */
  handleOrderSubmission() {
    const { totalItems, itemsTotal, deliveryFee, grandTotal, itemsList } = this.getCartTotals();
    const errorEl = document.getElementById('checkout-error-msg');

    if (totalItems === 0) {
      this.showFormError("Your cart is empty! Please add dishes to proceed.");
      return;
    }

    const nameInput = document.getElementById('cust-name');
    const phoneInput = document.getElementById('cust-phone');
    const addrInput = document.getElementById('cust-address');
    const notesInput = document.getElementById('cust-notes');

    const name = (nameInput?.value || '').trim();
    const phone = (phoneInput?.value || '').trim().replace(/\D/g, '');
    const address = (addrInput?.value || '').trim();
    const notes = (notesInput?.value || '').trim();

    // Validation
    if (!name) {
      this.showFormError("Please enter your Full Name.");
      nameInput?.focus();
      return;
    }

    if (!phone || phone.length < 10) {
      this.showFormError("Please enter a valid 10-digit WhatsApp phone number.");
      phoneInput?.focus();
      return;
    }

    if (!address || address.length < 5) {
      this.showFormError("Please enter your complete delivery address & landmark.");
      addrInput?.focus();
      return;
    }

    if (!this.selectedDate) {
      this.showFormError("Please select a Preferred Delivery Date.");
      return;
    }

    if (!this.selectedTimeSlot || this.selectedTimeSlot.includes("No slots available")) {
      this.showFormError("Please select an available Delivery Time Slot (requires 2–4 hours advance booking).");
      return;
    }

    // Verify 2-4 hours advance notice if ordering for today
    const now = new Date();
    const todayYMD = formatYMD(now);
    const tomorrowYMD = formatYMD(new Date(now.getTime() + 86400000));

    if (this.selectedDate === todayYMD) {
      const currentHour = now.getHours();
      const currentMin = now.getMinutes();
      const earliestHour = currentHour + 2 + (currentMin > 15 ? 1 : 0);
      const matchedSlot = CAKE_DELIVERY_SLOTS.find(s => s.label === this.selectedTimeSlot);

      if (matchedSlot && matchedSlot.startHour < earliestHour) {
        this.showFormError("Please select a slot at least 2 to 4 hours in advance so our bakery has time to freshly bake your cake.");
        return;
      }
    }

    let dateText = '';
    if (this.selectedDate === todayYMD) {
      dateText = `Today (${formatFriendlyDate(now)})`;
    } else if (this.selectedDate === tomorrowYMD) {
      dateText = `Tomorrow (${formatFriendlyDate(new Date(now.getTime() + 86400000))})`;
    } else {
      const parts = this.selectedDate.split('-');
      const customD = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      dateText = formatFriendlyDate(customD);
    }

    // Clear error
    if (errorEl) errorEl.style.display = 'none';

    // Save customer details to localStorage for future orders
    this.saveCustomerInfo({ name, phone, address, notes });

    // Generate unique order reference (e.g. #RK-7241)
    const orderRef = `RK-${Math.floor(1000 + Math.random() * 9000)}`;

    // Build Items list text
    const itemsFormatted = itemsList.map(item => 
      `• ${item.quantity}x ${item.name} (₹${item.itemTotal})`
    ).join('\n');

    const paymentLabel = this.selectedPaymentMode === 'razorpay_link'
      ? '⚡ Request Razorpay / Online Payment Link'
      : '💵 Pay on Confirmation (UPI / GPay / Cash)';

    // Compile WhatsApp Message Text
    const whatsappMessage = 
`🎂 *NEW CAKE ORDER — Riya's Kitchen | Cakes*
*Order Reference:* #${orderRef}
━━━━━━━━━━━━━━━━━━━━
👤 *Customer:* ${name}
📞 *Phone:* ${phone}
📍 *Delivery Address:*
${address}

📅 *Delivery Date:* ${dateText}
🕒 *Delivery Time Slot:* ${this.selectedTimeSlot}
⏱️ *Notice:* Booked 2–4 hrs in advance (Freshly Baked)
${notes ? `✨ *Message on Cake / Notes:* ${notes}\n` : ''}━━━━━━━━━━━━━━━━━━━━
📋 *CAKE SELECTION:*
${itemsFormatted}
━━━━━━━━━━━━━━━━━━━━
💰 *Cakes Subtotal:* ₹${itemsTotal}
🚚 *Delivery Fee:* ₹${deliveryFee}
💵 *Grand Total:* ₹${grandTotal}
💳 *Payment Preference:* ${paymentLabel}
━━━━━━━━━━━━━━━━━━━━
_Order submitted via Riya's Kitchen | Cakes_`;

    this.lastOrderSummaryText = whatsappMessage;

    const kitchenPhone = (kitchenInfoData.whatsappPhone || '').replace(/\D/g, '');
    let waUrl = '';

    if (kitchenPhone) {
      waUrl = `https://wa.me/${kitchenPhone}?text=${encodeURIComponent(whatsappMessage)}`;
    } else {
      waUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
    }

    this.lastGeneratedWhatsAppUrl = waUrl;

    // Trigger WhatsApp launch
    window.open(waUrl, '_blank');

    // Close checkout drawer
    this.closeDrawer();

    // Show Success Modal
    const successBackdrop = document.getElementById('order-success-backdrop');
    const reopenBtn = document.getElementById('success-whatsapp-reopen-btn');
    if (reopenBtn) reopenBtn.href = waUrl;
    if (successBackdrop) successBackdrop.style.display = 'flex';
  }

  showFormError(msg) {
    const errorEl = document.getElementById('checkout-error-msg');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.style.display = 'block';
      errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Export singleton
export const menuManager = new MenuManager();
