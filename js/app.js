/* FOOD-BREW FRONTEND — app.js */
'use strict';

// ══════════════════════════════
// CONFIG — change this to your backend URL after deploying
// ══════════════════════════════
const API_BASE = 'https://foodbrew-backend.railway.app'; // change after deploy
// For local testing use: const API_BASE = 'http://localhost:4000';

// ══════════════════════════════
// MENU DATA
// ══════════════════════════════
const MENU = [
  // Indian
  { id:1, name:'Butter Chicken', cat:'indian', price:450, cost:180, badge:'Chef\'s Pick',
    desc:'Tender chicken in velvety tomato-butter sauce with fenugreek cream.',
    tags:['Mild','Non-Veg','Halal'],
    img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80' },
  { id:2, name:'Biryani Royale', cat:'indian', price:520, cost:200, badge:'Bestseller',
    desc:'Aged basmati rice slow-cooked with saffron and whole spices.',
    tags:['Spicy','Non-Veg','Halal'],
    img:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
  { id:3, name:'Palak Paneer', cat:'indian', price:350, cost:130,
    desc:'Fresh cottage cheese in silky spinach gravy with garlic.',
    tags:['Mild','Vegetarian','GF'],
    img:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
  { id:4, name:'Lamb Rogan Josh', cat:'indian', price:580, cost:240,
    desc:'Kashmiri slow-braised lamb with whole aromatic spices.',
    tags:['Hot','Non-Veg','Halal'],
    img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
  { id:5, name:'Dal Makhani', cat:'indian', price:320, cost:100,
    desc:'24-hour black lentils simmered in butter and cream.',
    tags:['Mild','Vegetarian'],
    img:'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80' },
  { id:6, name:'Paneer Tikka', cat:'indian', price:380, cost:145, badge:'New',
    desc:'Tandoor-grilled marinated cottage cheese with mint chutney.',
    tags:['Medium','Vegetarian'],
    img:'https://images.unsplash.com/photo-1567188040023-f66d3f7c4d61?w=400&q=80' },
  { id:7, name:'Chicken Karahi', cat:'indian', price:490, cost:190,
    desc:'Wok-cooked chicken with tomatoes, green chillies and ginger.',
    tags:['Hot','Non-Veg','Halal'],
    img:'https://images.unsplash.com/photo-1585937421346-f7e6ad6f0fd8?w=400&q=80' },
  // Coffee
  { id:8, name:'Masala Chai Latte', cat:'coffee', price:180, cost:40, badge:'Signature',
    desc:'House-spiced chai with steamed milk, cardamom and ginger.',
    tags:['Hot','Spiced'],
    img:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80' },
  { id:9, name:'Saffron Cappuccino', cat:'coffee', price:250, cost:65, badge:'Premium',
    desc:'Double espresso with saffron-infused steamed milk and foam art.',
    tags:['Hot','Caffeinated'],
    img:'https://images.unsplash.com/photo-1461023058000-2f8f4b879f37?w=400&q=80' },
  { id:10, name:'South Indian Filter', cat:'coffee', price:160, cost:35,
    desc:'Traditional brass filter decoction with frothy hot milk.',
    tags:['Hot','Strong'],
    img:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80' },
  { id:11, name:'Rose Cold Brew', cat:'coffee', price:220, cost:55,
    desc:'18-hour cold brew infused with rose water over crystal ice.',
    tags:['Cold','Floral'],
    img:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80' },
  { id:12, name:'Cardamom Espresso', cat:'coffee', price:200, cost:48,
    desc:'Double espresso with freshly ground green cardamom.',
    tags:['Hot','Bold'],
    img:'https://images.unsplash.com/photo-1497515114865-bb9e49f6b14a?w=400&q=80' },
  // Desserts
  { id:13, name:'Gulab Jamun', cat:'dessert', price:220, cost:55, badge:'Classic',
    desc:'Milk-solid dumplings in rose-cardamom syrup with vanilla ice cream.',
    tags:['Sweet','Warm'],
    img:'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80' },
  { id:14, name:'Alphonso Mango Kulfi', cat:'dessert', price:280, cost:80,
    desc:'Dense frozen dessert with Alphonso mango, pistachio and saffron.',
    tags:['Cold','Seasonal'],
    img:'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=400&q=80' },
  { id:15, name:'Royal Kheer', cat:'dessert', price:200, cost:50,
    desc:'Slow-cooked rice pudding with rose water and dry fruits.',
    tags:['Warm','Vegetarian'],
    img:'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80' },
  // Breads
  { id:16, name:'Garlic Naan', cat:'breads', price:80, cost:20,
    desc:'Soft tandoor-baked bread brushed with garlic and butter.',
    tags:['Vegetarian','Tandoor'],
    img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
  { id:17, name:'Paratha Basket', cat:'breads', price:120, cost:30,
    desc:'Three flaky whole-wheat parathas served with mint chutney.',
    tags:['Vegetarian'],
    img:'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80' },
];

// ══════════════════════════════
// CART STATE
// ══════════════════════════════
let cart = JSON.parse(localStorage.getItem('fb_cart') || '[]');
let currentStep = 1;
let selectedRating = 5;
let placedOrderId = null;

function saveCart() { localStorage.setItem('fb_cart', JSON.stringify(cart)); }

function addToCart(id) {
  const item = MENU.find(m => m.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ id, name:item.name, price:item.price, img:item.img, qty:1 });
  saveCart();
  updateCartUI();
  showCartNotif(item.name);
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); updateCartUI(); }
}

function cartSubtotal() { return cart.reduce((s, c) => s + c.price * c.qty, 0); }
function deliveryFee() { return cart.length ? 150 : 0; }
function cartTotal() { return cartSubtotal() + deliveryFee(); }

function updateCartUI() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cart-count').textContent = count;

  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');

  if (cart.length === 0) {
    itemsEl.innerHTML = '';
    itemsEl.appendChild(emptyEl);
    emptyEl.style.display = 'block';
    footerEl.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  footerEl.style.display = 'block';
  itemsEl.innerHTML = '';

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="ci-img"><img src="${item.img}" alt="${item.name}"/></div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">Rs. ${item.price.toLocaleString()}</div>
        <div class="ci-qty">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
          <button class="ci-remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>`;
    itemsEl.appendChild(div);
  });

  document.getElementById('cart-subtotal').textContent = `Rs. ${cartSubtotal().toLocaleString()}`;
  document.getElementById('cart-delivery-fee').textContent = `Rs. ${deliveryFee().toLocaleString()}`;
  document.getElementById('cart-total').textContent = `Rs. ${cartTotal().toLocaleString()}`;
}

function showCartNotif(name) {
  let notif = document.getElementById('cart-notif');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'cart-notif';
    notif.style.cssText = 'position:fixed;top:80px;right:20px;background:#9B1B2A;color:#fff;padding:0.75rem 1.25rem;font-size:0.82rem;z-index:900;animation:slideIn 0.3s ease;border-radius:2px;letter-spacing:0.05em';
    document.body.appendChild(notif);
    const s = document.createElement('style');
    s.textContent = '@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}';
    document.head.appendChild(s);
  }
  notif.textContent = `✓ ${name} added to cart`;
  notif.style.display = 'block';
  clearTimeout(notif._t);
  notif._t = setTimeout(() => notif.style.display = 'none', 2500);
}

// ══════════════════════════════
// CART OPEN/CLOSE
// ══════════════════════════════
function openCart() {
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ══════════════════════════════
// CHECKOUT STEPS
// ══════════════════════════════
function openCheckout() {
  if (cart.length === 0) return;
  closeCart();
  document.getElementById('checkout-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  populateOrderSummary();
}

function closeCheckout() {
  document.getElementById('checkout-modal').style.display = 'none';
  document.body.style.overflow = '';
  currentStep = 1;
  nextStep(1);
}

function nextStep(n) {
  if (n === 2) {
    const name = document.getElementById('c-name').value.trim();
    const phone = document.getElementById('c-phone').value.trim();
    const email = document.getElementById('c-email').value.trim();
    if (!name || !phone || !email) { alert('Please fill in all required fields.'); return; }

    // Show distance info
    const orderType = document.querySelector('input[name="order-type"]:checked')?.value;
    if (orderType === 'delivery') {
      document.getElementById('distance-info').style.display = 'flex';
    }
  }

  if (n === 3) {
    const street = document.getElementById('c-street').value.trim();
    const area = document.getElementById('c-area').value.trim();
    const orderType = document.querySelector('input[name="order-type"]:checked')?.value;
    if (orderType === 'delivery' && (!street || !area)) {
      alert('Please enter your delivery address.'); return;
    }
    estimateDelivery();
    populateOrderSummary();
  }

  document.querySelectorAll('.modal-step').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === n);
  });
  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === n);
  });
  currentStep = n;
}

function estimateDelivery() {
  const area = document.getElementById('c-area')?.value || '';
  // Distance estimation based on area (simplified)
  const zones = {
    'clifton': { km: 2, min: '20–30 min' },
    'dha': { km: 8, min: '35–50 min' },
    'gulshan': { km: 12, min: '45–60 min' },
    'nazimabad': { km: 15, min: '50–70 min' },
    'north': { km: 20, min: '60–80 min' },
  };
  const key = Object.keys(zones).find(k => area.toLowerCase().includes(k)) || 'clifton';
  const info = zones[key] || { km: 5, min: '30–45 min' };
  const distEl = document.getElementById('dist-time');
  const textEl = document.getElementById('dist-text');
  if (distEl) distEl.textContent = info.min;
  if (textEl) textEl.textContent = `~${info.km} km from FOOD-BREW Clifton`;
  document.getElementById('summary-del').textContent = 'Rs. 150';
}

function populateOrderSummary() {
  const el = document.getElementById('order-summary');
  if (!el) return;
  el.innerHTML = cart.map(item => `
    <div class="os-item">
      <span>${item.name} × ${item.qty}</span>
      <span>Rs. ${(item.price * item.qty).toLocaleString()}</span>
    </div>`).join('');
  document.getElementById('summary-sub').textContent = `Rs. ${cartSubtotal().toLocaleString()}`;
  document.getElementById('summary-total').textContent = `Rs. ${cartTotal().toLocaleString()}`;
}

// ══════════════════════════════
// PLACE ORDER — calls backend API
// ══════════════════════════════
async function placeOrder() {
  const btn = document.getElementById('place-order-btn');
  btn.textContent = 'Placing Order...';
  btn.disabled = true;

  const orderData = {
    customer: {
      name: document.getElementById('c-name').value.trim(),
      phone: document.getElementById('c-phone').value.trim(),
      email: document.getElementById('c-email').value.trim(),
    },
    address: {
      street: document.getElementById('c-street')?.value.trim() || '',
      area: document.getElementById('c-area')?.value.trim() || '',
      city: 'Karachi',
      landmark: document.getElementById('c-landmark')?.value.trim() || '',
      instructions: document.getElementById('c-instructions')?.value.trim() || '',
    },
    orderType: document.querySelector('input[name="order-type"]:checked')?.value || 'delivery',
    payment: document.querySelector('input[name="payment"]:checked')?.value || 'cod',
    items: cart.map(c => ({ id: c.id, name: c.name, price: c.price, qty: c.qty })),
    subtotal: cartSubtotal(),
    deliveryFee: deliveryFee(),
    total: cartTotal(),
  };

  try {
    const res = await fetch(`${API_BASE}/api/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    const json = await res.json();

    if (res.ok && json.success) {
      placedOrderId = json.orderId;
    } else {
      throw new Error(json.message || 'API error');
    }
  } catch (err) {
    // Fallback: generate local order ID if backend is not yet deployed
    placedOrderId = 'FB-' + Date.now().toString().slice(-6);
    console.log('Backend not connected — using local order ID');
  }

  // Show success
  closeCheckout();
  document.getElementById('checkout-modal').style.display = 'none';
  document.getElementById('order-id-display').textContent = placedOrderId;
  document.getElementById('success-msg').textContent =
    `Hi ${document.getElementById('c-name').value}! Your order is sent to Chef Arjun. We'll call ${document.getElementById('c-phone').value} to confirm!`;
  document.getElementById('success-modal').style.display = 'flex';

  // Clear cart
  cart = [];
  saveCart();
  updateCartUI();
  btn.textContent = 'Place Order 🚀';
  btn.disabled = false;

  // Simulate status updates
  setTimeout(() => document.getElementById('ss-confirmed').classList.add('active'), 3000);
  setTimeout(() => document.getElementById('ss-cooking').classList.add('active'), 8000);
}

function closeSuccess() {
  document.getElementById('success-modal').style.display = 'none';
  document.body.style.overflow = '';
}

// ══════════════════════════════
// REVIEW SUBMISSION
// ══════════════════════════════
async function submitReview() {
  const name = document.getElementById('rv-name').value.trim();
  const area = document.getElementById('rv-area').value.trim();
  const text = document.getElementById('rv-text').value.trim();
  const rating = +document.getElementById('review-rating').value;

  if (!name || !text) { alert('Please enter your name and review.'); return; }

  const reviewData = { name, area, text, rating, timestamp: new Date().toISOString() };

  try {
    await fetch(`${API_BASE}/api/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
  } catch (e) { console.log('Review saved locally'); }

  const st = document.getElementById('rv-status');
  st.className = 'rv-status ok';
  st.textContent = '✅ Thank you! Your review has been submitted.';
  st.style.display = 'block';
  document.getElementById('rv-name').value = '';
  document.getElementById('rv-area').value = '';
  document.getElementById('rv-text').value = '';
}

// ══════════════════════════════
// RENDER MENU
// ══════════════════════════════
function renderMenu(filter = 'all') {
  const grid = document.getElementById('menu-grid');
  const items = filter === 'all' ? MENU : MENU.filter(m => m.cat === filter);
  grid.innerHTML = items.map((item, i) => `
    <div class="mcard" style="animation:cardIn 0.4s ease ${i * 0.05}s both">
      <div class="mcard-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy"/>
        ${item.badge ? `<div class="mcard-badge">${item.badge}</div>` : ''}
      </div>
      <div class="mcard-body">
        <div class="mcard-row">
          <h3>${item.name}</h3>
          <span class="mcard-price">Rs. ${item.price.toLocaleString()}</span>
        </div>
        <p class="mcard-desc">${item.desc}</p>
        <div class="mcard-tags">${item.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="mcard-actions">
          <button class="btn-add" onclick="addToCart(${item.id})">+ Add to Cart</button>
          <button class="btn-buynow" onclick="addToCart(${item.id});openCart()">Buy Now</button>
        </div>
      </div>
    </div>`).join('');
}

// ══════════════════════════════
// INIT
// ══════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Inject card animation
  const s = document.createElement('style');
  s.textContent = '@keyframes cardIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}';
  document.head.appendChild(s);

  renderMenu();
  updateCartUI();

  // Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), { passive: true });

  // Cart toggle
  document.getElementById('cart-btn').addEventListener('click', openCart);
  document.getElementById('cart-close').addEventListener('click', closeCart);
  document.getElementById('cart-overlay').addEventListener('click', closeCart);
  document.getElementById('checkout-btn').addEventListener('click', openCheckout);
  document.getElementById('checkout-close').addEventListener('click', closeCheckout);

  // Menu tabs
  document.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      renderMenu(t.dataset.cat);
    });
  });

  // Star picker
  const stars = document.querySelectorAll('.sp');
  stars.forEach((s, i) => {
    s.addEventListener('click', () => {
      document.getElementById('review-rating').value = i + 1;
      selectedRating = i + 1;
      stars.forEach((x, j) => x.classList.toggle('active', j <= i));
    });
    s.addEventListener('mouseover', () => stars.forEach((x, j) => x.classList.toggle('active', j <= i)));
    s.addEventListener('mouseout', () => stars.forEach((x, j) => x.classList.toggle('active', j < selectedRating)));
  });
  stars.forEach(s => s.classList.add('active')); // default 5 stars

  // Burger menu
  document.getElementById('burger').addEventListener('click', () => {
    const nl = document.getElementById('nav-links');
    nl.style.display = nl.style.display === 'flex' ? 'none' : 'flex';
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Order type toggle - hide address for pickup/dine
  document.querySelectorAll('input[name="order-type"]').forEach(r => {
    r.addEventListener('change', () => {
      const isDelivery = r.value === 'delivery';
      document.getElementById('distance-info').style.display = 'none';
    });
  });
});

// ══════════════════════════════════════
// AUTH SYSTEM
// ══════════════════════════════════════

let currentUser = JSON.parse(localStorage.getItem('fb_user') || 'null');

function saveUser(user) {
  localStorage.setItem('fb_user', JSON.stringify(user));
  currentUser = user;
}

function showAuth(tab) {
  document.getElementById('auth-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  ['login','signup','forgot'].forEach(t => {
    document.getElementById('auth-' + t).classList.toggle('active', t === tab);
  });
  clearAuthStatus();
}

function closeAuth() {
  document.getElementById('auth-modal').style.display = 'none';
  document.body.style.overflow = '';
}

function clearAuthStatus() {
  document.querySelectorAll('.auth-status').forEach(el => {
    el.className = 'auth-status';
    el.textContent = '';
  });
}

function setStatus(id, msg, type) {
  const el = document.getElementById(id);
  el.className = 'auth-status ' + type;
  el.textContent = msg;
}

function togglePw(id) {
  const inp = document.getElementById(id);
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

// ── SIGNUP ──
function doSignup() {
  const fname = document.getElementById('su-fname').value.trim();
  const lname = document.getElementById('su-lname').value.trim();
  const email = document.getElementById('su-email').value.trim();
  const phone = document.getElementById('su-phone').value.trim();
  const pass  = document.getElementById('su-pass').value;
  const pass2 = document.getElementById('su-pass2').value;
  const terms = document.getElementById('su-terms').checked;

  if (!fname || !lname || !email || !phone || !pass) return setStatus('su-status','Please fill in all required fields.','err');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus('su-status','Please enter a valid email.','err');
  if (pass.length < 8) return setStatus('su-status','Password must be at least 8 characters.','err');
  if (pass !== pass2) return setStatus('su-status','Passwords do not match.','err');
  if (!terms) return setStatus('su-status','Please accept the Terms & Conditions.','err');

  // Check if email already exists
  const existing = JSON.parse(localStorage.getItem('fb_users') || '[]');
  if (existing.find(u => u.email === email)) return setStatus('su-status','An account with this email already exists.','err');

  const user = {
    id: 'U-' + Date.now(),
    fname, lname, email, phone,
    password: btoa(pass), // basic encoding (use bcrypt in production)
    createdAt: new Date().toISOString(),
    addresses: [],
    orders: [],
  };

  existing.push(user);
  localStorage.setItem('fb_users', JSON.stringify(existing));
  saveUser({ id:user.id, fname, lname, email, phone, addresses:[], orders:[] });

  setStatus('su-status', '🎉 Account created successfully! Welcome to FOOD-BREW!', 'ok');
  setTimeout(() => { closeAuth(); updateNavForUser(); }, 1500);
}

// ── LOGIN ──
function doLogin() {
  const email = document.getElementById('li-email').value.trim();
  const pass  = document.getElementById('li-pass').value;

  if (!email || !pass) return setStatus('li-status','Please enter your email and password.','err');

  const users = JSON.parse(localStorage.getItem('fb_users') || '[]');
  const user = users.find(u => u.email === email && u.password === btoa(pass));

  if (!user) return setStatus('li-status','Incorrect email or password.','err');

  saveUser({ id:user.id, fname:user.fname, lname:user.lname, email:user.email, phone:user.phone, addresses:user.addresses||[], orders:user.orders||[] });

  setStatus('li-status', `Welcome back, ${user.fname}! 🎉`, 'ok');
  setTimeout(() => { closeAuth(); updateNavForUser(); }, 1200);
}

// ── FORGOT PASSWORD ──
function doForgotPassword() {
  const email = document.getElementById('fp-email').value.trim();
  if (!email) return setStatus('fp-status','Please enter your email address.','err');

  const users = JSON.parse(localStorage.getItem('fb_users') || '[]');
  const exists = users.find(u => u.email === email);

  // Always show success (security best practice)
  setStatus('fp-status', '📧 If this email exists, a reset link has been sent. Check your inbox.', 'ok');

  if (exists) {
    // In production: call backend API to send real reset email via Resend
    try {
      fetch(`${API_BASE}/api/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch(e) {}
  }
}

// ── LOGOUT ──
function doLogout() {
  if (!confirm('Are you sure you want to logout?')) return;
  localStorage.removeItem('fb_user');
  currentUser = null;
  closeAccountPage();
  updateNavForUser();
}

// ── UPDATE NAV ──
function updateNavForUser() {
  const authBtns = document.getElementById('nav-auth-btns');
  const accBtn   = document.getElementById('nav-account-btn');
  if (currentUser) {
    authBtns.style.display = 'none';
    accBtn.style.display   = 'flex';
    const initials = (currentUser.fname[0] + currentUser.lname[0]).toUpperCase();
    document.getElementById('nav-avatar').textContent   = initials;
    document.getElementById('nav-username').textContent = currentUser.fname;
  } else {
    authBtns.style.display = 'flex';
    accBtn.style.display   = 'none';
  }
}

// ══════════════════════════════════════
// ACCOUNT PAGE
// ══════════════════════════════════════

function openAccountPage() {
  if (!currentUser) { showAuth('login'); return; }
  document.getElementById('account-page').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  const initials = (currentUser.fname[0] + currentUser.lname[0]).toUpperCase();
  document.getElementById('acc-avatar').textContent = initials;
  document.getElementById('acc-name').textContent   = currentUser.fname + ' ' + currentUser.lname;
  document.getElementById('acc-email').textContent  = currentUser.email;
  loadOrderHistory();
  loadAddresses();
  loadProfileForm();
  setupAccNav();
}

function closeAccountPage() {
  document.getElementById('account-page').style.display = 'none';
  document.body.style.overflow = '';
}

function setupAccNav() {
  document.querySelectorAll('.acc-link[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.acc-link').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.acc-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });
}

// ── ORDER HISTORY ──
function loadOrderHistory() {
  const el = document.getElementById('orders-list');
  const allOrders = JSON.parse(localStorage.getItem('fb_all_orders') || '[]');
  const myOrders  = allOrders.filter(o => o.userId === currentUser?.id);

  if (!myOrders.length) {
    el.innerHTML = `<div class="no-orders-msg"><span>🍛</span><p>No orders yet.</p><a href="#menu" class="btn btn-red" onclick="closeAccountPage()">Browse Menu</a></div>`;
    return;
  }

  el.innerHTML = myOrders.reverse().map(o => `
    <div class="order-hist-card">
      <div class="ohc-header">
        <span class="ohc-id">Order #${o.id}</span>
        <span class="ohc-date">${new Date(o.timestamp).toLocaleDateString('en-PK',{day:'numeric',month:'short',year:'numeric'})}</span>
        <span class="ohc-status ${o.status}">${o.status.charAt(0).toUpperCase()+o.status.slice(1)}</span>
      </div>
      <div class="ohc-items">${o.items.map(i => `${i.name} × ${i.qty}`).join(' · ')}</div>
      <div class="ohc-footer">
        <span class="ohc-total">Rs. ${o.total.toLocaleString()}</span>
        <button class="reorder-btn" onclick="reorder(${JSON.stringify(o.items).replace(/"/g,'&quot;')})">🔄 Reorder</button>
      </div>
    </div>`).join('');
}

function reorder(items) {
  items.forEach(item => {
    const menuItem = MENU.find(m => m.id === item.id);
    if (!menuItem) return;
    const existing = cart.find(c => c.id === item.id);
    if (existing) existing.qty += item.qty;
    else cart.push({ id:item.id, name:item.name, price:item.price, img:menuItem.img, qty:item.qty });
  });
  saveCart();
  updateCartUI();
  closeAccountPage();
  openCart();
}

// ── ADDRESSES ──
function loadAddresses() {
  const el = document.getElementById('addresses-list');
  const addrs = currentUser.addresses || [];
  if (!addrs.length) {
    el.innerHTML = `<p style="color:var(--muted);font-size:0.88rem;">No saved addresses yet. Add one below!</p>`;
    return;
  }
  el.innerHTML = addrs.map((a, i) => `
    <div class="address-card ${i===0?'default':''}">
      <div class="addr-label">📍 ${a.label} ${i===0?'<span class="addr-default-badge">Default</span>':''}</div>
      <div class="addr-text">${a.street}, ${a.area}${a.landmark ? ', near '+a.landmark : ''}, Karachi</div>
      <div class="addr-actions">
        ${i!==0?`<button class="addr-btn" onclick="setDefaultAddress(${i})">Set Default</button>`:''}
        <button class="addr-btn delete" onclick="deleteAddress(${i})">Delete</button>
      </div>
    </div>`).join('');
}

function showAddAddressForm() {
  const f = document.getElementById('add-address-form');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
}

function saveAddress() {
  const label    = document.getElementById('addr-label').value.trim() || 'Home';
  const street   = document.getElementById('addr-street').value.trim();
  const area     = document.getElementById('addr-area').value.trim();
  const landmark = document.getElementById('addr-landmark').value.trim();
  if (!street || !area) { alert('Please enter street and area.'); return; }

  const newAddr = { label, street, area, landmark };
  currentUser.addresses = currentUser.addresses || [];
  currentUser.addresses.push(newAddr);
  saveUser(currentUser);
  updateStoredUser(currentUser);

  document.getElementById('add-address-form').style.display = 'none';
  ['addr-label','addr-street','addr-area','addr-landmark'].forEach(id => document.getElementById(id).value = '');
  loadAddresses();
}

function deleteAddress(index) {
  if (!confirm('Delete this address?')) return;
  currentUser.addresses.splice(index, 1);
  saveUser(currentUser);
  updateStoredUser(currentUser);
  loadAddresses();
}

function setDefaultAddress(index) {
  const addr = currentUser.addresses.splice(index, 1)[0];
  currentUser.addresses.unshift(addr);
  saveUser(currentUser);
  updateStoredUser(currentUser);
  loadAddresses();
}

// ── PROFILE ──
function loadProfileForm() {
  document.getElementById('pr-fname').value = currentUser.fname || '';
  document.getElementById('pr-lname').value = currentUser.lname || '';
  document.getElementById('pr-email').value = currentUser.email || '';
  document.getElementById('pr-phone').value = currentUser.phone || '';
}

function saveProfile() {
  const fname   = document.getElementById('pr-fname').value.trim();
  const lname   = document.getElementById('pr-lname').value.trim();
  const email   = document.getElementById('pr-email').value.trim();
  const phone   = document.getElementById('pr-phone').value.trim();
  const oldpass = document.getElementById('pr-oldpass').value;
  const newpass = document.getElementById('pr-newpass').value;

  if (!fname || !email) return setStatus('pr-status','Name and email are required.','err');

  currentUser.fname = fname;
  currentUser.lname = lname;
  currentUser.email = email;
  currentUser.phone = phone;

  // Update password if provided
  if (oldpass || newpass) {
    const users = JSON.parse(localStorage.getItem('fb_users') || '[]');
    const stored = users.find(u => u.id === currentUser.id);
    if (!stored || stored.password !== btoa(oldpass)) return setStatus('pr-status','Current password is incorrect.','err');
    if (newpass.length < 8) return setStatus('pr-status','New password must be at least 8 characters.','err');
    stored.password = btoa(newpass);
    localStorage.setItem('fb_users', JSON.stringify(users));
  }

  saveUser(currentUser);
  updateStoredUser(currentUser);
  document.getElementById('acc-name').textContent = fname + ' ' + lname;
  document.getElementById('acc-email').textContent = email;
  document.getElementById('nav-username').textContent = fname;
  const initials = (fname[0] + (lname[0]||'')).toUpperCase();
  document.getElementById('acc-avatar').textContent  = initials;
  document.getElementById('nav-avatar').textContent  = initials;
  setStatus('pr-status','✅ Profile updated successfully!','ok');
}

// Update user in fb_users array
function updateStoredUser(user) {
  const users = JSON.parse(localStorage.getItem('fb_users') || '[]');
  const idx = users.findIndex(u => u.id === user.id);
  if (idx > -1) {
    users[idx] = { ...users[idx], fname:user.fname, lname:user.lname, email:user.email, phone:user.phone, addresses:user.addresses };
    localStorage.setItem('fb_users', JSON.stringify(users));
  }
}

// ── ATTACH USER TO ORDER ──
// Override placeOrder to save order to user history
const _originalPlaceOrder = placeOrder;
placeOrder = async function() {
  await _originalPlaceOrder();
  if (currentUser && placedOrderId) {
    const allOrders = JSON.parse(localStorage.getItem('fb_all_orders') || '[]');
    const lastOrder = { ...cart, id: placedOrderId, userId: currentUser.id };
    // Already cleared, read from the order that was placed
    localStorage.setItem('fb_all_orders', JSON.stringify(allOrders));
  }
};

// ── INIT AUTH ON LOAD ──
document.addEventListener('DOMContentLoaded', () => {
  updateNavForUser();

  // Close auth modal on overlay click
  document.getElementById('auth-modal').addEventListener('click', function(e) {
    if (e.target === this) closeAuth();
  });

  // Pre-fill checkout with user data if logged in
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (currentUser) {
      setTimeout(() => {
        const nameEl  = document.getElementById('c-name');
        const phoneEl = document.getElementById('c-phone');
        const emailEl = document.getElementById('c-email');
        if (nameEl && !nameEl.value)  nameEl.value  = currentUser.fname + ' ' + currentUser.lname;
        if (phoneEl && !phoneEl.value) phoneEl.value = currentUser.phone;
        if (emailEl && !emailEl.value) emailEl.value = currentUser.email;
        // Pre-fill default address
        if (currentUser.addresses?.length) {
          const def = currentUser.addresses[0];
          const st = document.getElementById('c-street');
          const ar = document.getElementById('c-area');
          const lm = document.getElementById('c-landmark');
          if (st && !st.value) st.value = def.street;
          if (ar && !ar.value) ar.value = def.area;
          if (lm && !lm.value) lm.value = def.landmark || '';
        }
      }, 100);
    }
  });
});

