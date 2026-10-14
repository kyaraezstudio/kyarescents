/* ============================================
   KYARÉ — Interactive Scripts
   ============================================ */

// ---------- Product Data ----------
const products = [
  {
    id: 'moss',
    number: '01',
    name: 'MOSS',
    notes: 'Green Tea, Bergamot, Musk',
    personality: 'Calm, grounded, fresh',
    description: 'A quiet expression of nature, fresh greenery, and understated elegance.',
    color: '#18332F',
    category: 'woody',
    price: 850000,
    sizes: [
      { label: '30ml', price: 650000 },
      { label: '50ml', price: 850000 },
      { label: '100ml', price: 1250000 }
    ]
  },
  {
    id: 'rouge',
    number: '02',
    name: 'ROUGE',
    notes: 'Cherry, Jasmine, Vanilla',
    personality: 'Bold, warm, magnetic',
    description: 'A sensual and expressive fragrance with soft sweetness and a rich, memorable character.',
    color: '#551C25',
    category: 'floral',
    price: 850000,
    sizes: [
      { label: '30ml', price: 650000 },
      { label: '50ml', price: 850000 },
      { label: '100ml', price: 1250000 }
    ]
  },
  {
    id: 'iris',
    number: '03',
    name: 'IRIS',
    notes: 'Black Iris, Sandalwood, Amber',
    personality: 'Mysterious, clean, introspective',
    description: 'A sophisticated blend of dark florals and warm woods with a quietly intriguing presence.',
    color: '#2C3042',
    category: 'bold',
    price: 950000,
    sizes: [
      { label: '30ml', price: 720000 },
      { label: '50ml', price: 950000 },
      { label: '100ml', price: 1400000 }
    ]
  },
  {
    id: 'sol',
    number: '04',
    name: 'SOL',
    notes: 'Citrus, White Flowers, Sandalwood',
    personality: 'Bright, playful, spontaneous',
    description: 'A radiant fragrance inspired by golden sunlight, fresh citrus, and delicate florals.',
    color: '#D99A35',
    category: 'warm',
    price: 850000,
    sizes: [
      { label: '30ml', price: 650000 },
      { label: '50ml', price: 850000 },
      { label: '100ml', price: 1250000 }
    ]
  },
  {
    id: 'haze',
    number: '05',
    name: 'HAZE',
    notes: 'Hazelnut, Tonka Bean, Musk',
    personality: 'Soft, cozy, intimate',
    description: 'A warm, comforting scent with a smooth gourmand character.',
    color: '#8B6F4E',
    category: 'warm',
    price: 850000,
    sizes: [
      { label: '30ml', price: 650000 },
      { label: '50ml', price: 850000 },
      { label: '100ml', price: 1250000 }
    ]
  },
  {
    id: 'ivory',
    number: '06',
    name: 'IVORY',
    notes: 'White Tea, Peony, White Musk',
    personality: 'Delicate, graceful, effortless',
    description: 'A soft, clean fragrance that feels calm, understated, and timeless.',
    color: '#E8E0D0',
    category: 'floral',
    price: 800000,
    sizes: [
      { label: '30ml', price: 600000 },
      { label: '50ml', price: 800000 },
      { label: '100ml', price: 1200000 }
    ]
  },
  {
    id: 'mist',
    number: '07',
    name: 'MIST',
    notes: 'Aquatic Notes, Freesia, Cedarwood',
    personality: 'Airy, serene, refreshing',
    description: 'A fresh, breezy fragrance inspired by cool morning air and delicate florals.',
    color: '#A8C0D0',
    category: 'fresh',
    price: 800000,
    sizes: [
      { label: '30ml', price: 600000 },
      { label: '50ml', price: 800000 },
      { label: '100ml', price: 1200000 }
    ]
  },
  {
    id: 'ambre',
    number: '08',
    name: 'AMBRE',
    notes: 'Saffron, Amber, Vanilla',
    personality: 'Radiant, rich, confident',
    description: 'A warm, glowing fragrance with a refined and enveloping character.',
    color: '#C17F3A',
    category: 'warm',
    price: 950000,
    sizes: [
      { label: '30ml', price: 720000 },
      { label: '50ml', price: 950000 },
      { label: '100ml', price: 1400000 }
    ]
  },
  {
    id: 'blush',
    number: '09',
    name: 'BLUSH',
    notes: 'Rose, Lychee, Cashmere Musk',
    personality: 'Romantic, soft, graceful',
    description: 'A delicate floral-fruity fragrance with a gentle, velvety finish.',
    color: '#C48B8B',
    category: 'floral',
    price: 850000,
    sizes: [
      { label: '30ml', price: 650000 },
      { label: '50ml', price: 850000 },
      { label: '100ml', price: 1250000 }
    ]
  },
  {
    id: 'noir',
    number: '10',
    name: 'NOIR',
    notes: 'Black Pepper, Incense, Patchouli',
    personality: 'Dark, intense, enigmatic',
    description: 'A distinctive woody fragrance with smoky depth and a bold, elegant character.',
    color: '#2A1F1A',
    category: 'bold',
    price: 950000,
    sizes: [
      { label: '30ml', price: 720000 },
      { label: '50ml', price: 950000 },
      { label: '100ml', price: 1400000 }
    ]
  }
];

// Quiz recommendations map
const moodMap = {
  fresh: ['mist', 'moss'],
  floral: ['ivory', 'blush', 'rouge'],
  woody: ['moss', 'iris'],
  warm: ['sol', 'ambre', 'haze'],
  bold: ['noir', 'iris']
};

// ---------- State ----------
let cart = JSON.parse(localStorage.getItem('kyare_cart') || '[]');
let currentFilter = 'all';
let currentSort = 'default';

// ---------- Utilities ----------
function formatIDR(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

function saveCart() {
  localStorage.setItem('kyare_cart', JSON.stringify(cart));
  updateCartUI();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function createBottleHTML(product, size = 'normal') {
  // Prefer real product photo when available
  if (size !== 'mini' && product.id) {
    const imgClass = size === 'large' ? 'product-photo product-photo-lg' : 'product-photo';
    return `<img src="${product.id}.png" alt="KYARÉ ${product.name}" class="${imgClass}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling&&(this.nextElementSibling.style.display='block');">
    <div class="product-bottle bottle-${product.id}" style="display:none;width:${size==='large'?'110px':'70px'}">
      <div class="bottle-cap" style="background:${product.color}"></div>
      <div class="bottle-body" style="height:${size==='large'?'200px':'140px'}">
        <div class="bottle-label">
          <span class="label-brand">KYARÉ</span>
          <span class="label-num">${product.number}</span>
          <span class="label-name">${product.name}</span>
        </div>
      </div>
    </div>`;
  }
  const bodyH = size === 'large' ? '200px' : size === 'mini' ? '48px' : '140px';
  const width = size === 'large' ? '110px' : size === 'mini' ? '36px' : '70px';
  return `
    <div class="product-bottle bottle-${product.id}" style="width:${width}">
      <div class="bottle-cap" style="background:${product.color}"></div>
      <div class="bottle-body" style="height:${bodyH}">
        <div class="bottle-label">
          <span class="label-brand">KYARÉ</span>
          <span class="label-num">${product.number}</span>
          <span class="label-name">${product.name}</span>
        </div>
      </div>
    </div>
  `;
}

// ---------- Render Products ----------
function renderProducts() {
  let filtered = products.filter(p => {
    if (currentFilter === 'all') return true;
    return p.category === currentFilter;
  });

  if (currentSort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (currentSort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
  else filtered = [...filtered]; // keep original order for default

  const grid = document.getElementById('productGrid');
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:3rem;">No fragrances match this filter.</p>';
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-image" data-action="detail" data-id="${p.id}">
        ${createBottleHTML(p)}
      </div>
      <div class="product-info">
        <span class="product-num"><span class="color-dot" style="background:${p.color}"></span>${p.number}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-notes">${p.notes}</p>
        <p class="product-desc">${p.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatIDR(p.price)}</span>
          <div class="product-actions">
            <button class="btn-add" data-action="add" data-id="${p.id}">Add</button>
            <button class="btn-icon" data-action="detail" data-id="${p.id}" aria-label="View details">→</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

// ---------- Cart ----------
function updateCartUI() {
  const countEl = document.getElementById('cartCount');
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  countEl.textContent = totalItems;
  countEl.classList.toggle('visible', totalItems > 0);

  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  const emptyEl = document.getElementById('cartEmpty');

  if (cart.length === 0) {
    itemsEl.innerHTML = '';
    itemsEl.appendChild(emptyEl);
    emptyEl.style.display = 'block';
    footerEl.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  footerEl.style.display = 'block';

  itemsEl.innerHTML = cart.map((item, idx) => {
    const product = products.find(p => p.id === item.id) || { name: item.name, color: '#18332F', number: '' };
    const bottle = product.id ? createBottleHTML(product, 'mini') : `<div style="width:36px;height:48px;background:#e8e0d0;"></div>`;
    return `
      <div class="cart-item" data-idx="${idx}">
        <div class="cart-item-image">${bottle}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.size || '50ml'}</div>
          <div class="cart-item-price">${formatIDR(item.price * item.qty)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" data-action="dec" data-idx="${idx}">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-idx="${idx}">+</button>
          </div>
          <button class="cart-item-remove" data-action="remove" data-idx="${idx}">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById('cartTotal').textContent = formatIDR(total);
}

function addToCart(id, size = '50ml', price = null, name = null) {
  const product = products.find(p => p.id === id);
  if (product) {
    const sizeObj = product.sizes.find(s => s.label === size) || product.sizes[1];
    const existing = cart.find(item => item.id === id && item.size === sizeObj.label);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        size: sizeObj.label,
        price: sizeObj.price,
        qty: 1
      });
    }
  } else if (name && price) {
    // gift item
    const existing = cart.find(item => item.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, name, size: 'Set', price, qty: 1 });
  }
  saveCart();
  showToast('Added to cart');
}

function changeQty(idx, delta) {
  if (!cart[idx]) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart();
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  saveCart();
  showToast('Removed from cart');
}

// ---------- Checkout via WhatsApp ----------
function checkoutWhatsApp() {
  if (cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }
  let message = 'Halo KYARÉ, saya ingin memesan:\n\n';
  cart.forEach(item => {
    message += `• ${item.name} (${item.size}) x${item.qty} — ${formatIDR(item.price * item.qty)}\n`;
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  message += `\nTotal: ${formatIDR(total)}\n\nMohon info ketersediaan dan cara pembayaran. Terima kasih!`;

  const url = `https://wa.me/6285286707303?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ---------- Product Detail Modal ----------
function openProductModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  let selectedSize = product.sizes[1]; // default 50ml
  let qty = 1;

  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div class="modal-product">
      <div class="modal-product-image">
        ${createBottleHTML(product, 'large')}
      </div>
      <div class="modal-product-info">
        <p class="modal-product-num">${product.number} — ${product.personality}</p>
        <h2>${product.name}</h2>
        <p class="modal-notes">${product.notes}</p>
        <p class="modal-desc">${product.description}</p>
        <p class="modal-personality">${product.personality}</p>
        <p class="modal-size-label">Select Size</p>
        <div class="modal-sizes" id="modalSizes">
          ${product.sizes.map((s, i) => `
            <button class="size-btn ${i === 1 ? 'active' : ''}" data-size="${s.label}" data-price="${s.price}">${s.label}</button>
          `).join('')}
        </div>
        <p class="modal-price" id="modalPrice">${formatIDR(selectedSize.price)}</p>
        <div class="modal-actions">
          <div class="modal-qty">
            <button class="qty-btn" id="modalDec">−</button>
            <span id="modalQty">1</span>
            <button class="qty-btn" id="modalInc">+</button>
          </div>
          <button class="btn btn-primary" id="modalAdd">Add to Cart</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';

  // Size selection
  content.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      content.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = { label: btn.dataset.size, price: Number(btn.dataset.price) };
      document.getElementById('modalPrice').textContent = formatIDR(selectedSize.price * qty);
    });
  });

  document.getElementById('modalDec').addEventListener('click', () => {
    if (qty > 1) {
      qty--;
      document.getElementById('modalQty').textContent = qty;
      document.getElementById('modalPrice').textContent = formatIDR(selectedSize.price * qty);
    }
  });
  document.getElementById('modalInc').addEventListener('click', () => {
    qty++;
    document.getElementById('modalQty').textContent = qty;
    document.getElementById('modalPrice').textContent = formatIDR(selectedSize.price * qty);
  });
  document.getElementById('modalAdd').addEventListener('click', () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product.id, selectedSize.label);
    }
    closeProductModal();
  });
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ---------- Search ----------
function performSearch(query) {
  const results = document.getElementById('searchResults');
  if (!query.trim()) {
    results.innerHTML = '';
    return;
  }
  const q = query.toLowerCase();
  const matches = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.notes.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.personality.toLowerCase().includes(q)
  );
  if (matches.length === 0) {
    results.innerHTML = '<p style="color:var(--text-muted);padding:1rem 0;">No fragrances found.</p>';
    return;
  }
  results.innerHTML = matches.map(p => `
    <div class="search-result-item" data-id="${p.id}">
      <div class="mini-bottle">${createBottleHTML(p, 'mini')}</div>
      <div>
        <strong>${p.number} ${p.name}</strong>
        <div style="font-size:0.8rem;color:var(--text-muted);">${p.notes}</div>
      </div>
    </div>
  `).join('');

  results.querySelectorAll('.search-result-item').forEach(el => {
    el.addEventListener('click', () => {
      closeSearch();
      openProductModal(el.dataset.id);
    });
  });
}

function openSearch() {
  document.getElementById('searchOverlay').classList.add('open');
  document.getElementById('searchInput').focus();
}
function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('open');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
}

// ---------- Quiz ----------
function handleQuiz(mood) {
  const recs = moodMap[mood] || [];
  const recProducts = recs.map(id => products.find(p => p.id === id)).filter(Boolean);
  const resultEl = document.getElementById('quizResult');
  const recEl = document.getElementById('quizRecommendation');

  document.querySelector('.quiz-step').style.display = 'none';
  resultEl.style.display = 'block';

  recEl.innerHTML = recProducts.map(p => `
    <div style="display:flex;align-items:center;gap:1.5rem;margin-bottom:1.5rem;text-align:left;background:var(--cream);padding:1.25rem;border:1px solid var(--border);">
      ${createBottleHTML(p)}
      <div>
        <h4 style="font-family:var(--font-serif);font-size:1.3rem;margin-bottom:0.25rem;">${p.number} ${p.name}</h4>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.5rem;">${p.notes}</p>
        <p style="font-size:0.85rem;margin-bottom:0.75rem;">${p.description}</p>
        <button class="btn btn-outline btn-sm" data-id="${p.id}" onclick="openProductModal('${p.id}')">View Details</button>
      </div>
    </div>
  `).join('');
}

function resetQuiz() {
  document.querySelector('.quiz-step').style.display = 'block';
  document.getElementById('quizResult').style.display = 'none';
}

// ---------- Policy Modals ----------
const policies = {
  privacy: {
    title: 'Privacy Policy',
    body: `<p>KYARÉ respects your privacy. This website currently operates as a frontend demonstration. Any information you choose to share (such as via WhatsApp or email) is handled with care and used solely to respond to your inquiry.</p>
    <p style="margin-top:1rem;">We do not store payment details on this site. No personal data is collected automatically beyond what you voluntarily provide through contact channels.</p>
    <p style="margin-top:1rem;">This policy is a placeholder and can be updated with formal terms when the business is fully operational.</p>`
  },
  shipping: {
    title: 'Shipping Policy',
    body: `<p>Shipping details are confirmed individually after your order inquiry via WhatsApp.</p>
    <p style="margin-top:1rem;">Estimated delivery times and costs will be provided based on your location. We aim to pack every order carefully with branded packaging.</p>
    <p style="margin-top:1rem;">This policy is editable and does not currently guarantee specific delivery windows or rates.</p>`
  },
  returns: {
    title: 'Returns Policy',
    body: `<p>Due to the nature of fragrance products, returns of opened items are generally not accepted for hygiene reasons.</p>
    <p style="margin-top:1rem;">If you receive a damaged or incorrect item, please contact us via WhatsApp within 48 hours of delivery so we can assist you.</p>
    <p style="margin-top:1rem;">This policy is a general guideline and can be refined as the brand grows.</p>`
  }
};

function openPolicy(key) {
  const policy = policies[key];
  if (!policy) return;
  document.getElementById('policyContent').innerHTML = `
    <h2 style="font-family:var(--font-serif);font-size:1.6rem;margin-bottom:1.25rem;">${policy.title}</h2>
    ${policy.body}
  `;
  document.getElementById('policyModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ---------- Event Listeners ----------
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();

  // Announcement close
  document.querySelector('.announcement-close')?.addEventListener('click', () => {
    document.getElementById('announcement').style.display = 'none';
  });

  // Mobile menu
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileBtn.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Navbar scroll
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 600);
  });

  // Search
  document.getElementById('searchBtn').addEventListener('click', openSearch);
  document.getElementById('searchClose').addEventListener('click', closeSearch);
  document.getElementById('searchOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeSearch();
  });
  document.getElementById('searchInput').addEventListener('input', (e) => performSearch(e.target.value));

  // Cart
  document.getElementById('cartBtn').addEventListener('click', () => {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
  });
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
  }

  document.getElementById('cartItems').addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    const idx = Number(e.target.dataset.idx);
    if (action === 'inc') changeQty(idx, 1);
    if (action === 'dec') changeQty(idx, -1);
    if (action === 'remove') removeFromCart(idx);
  });

  document.getElementById('checkoutBtn').addEventListener('click', checkoutWhatsApp);

  // Product grid clicks
  document.getElementById('productGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.dataset.action === 'add') addToCart(id);
    if (btn.dataset.action === 'detail') openProductModal(id);
  });

  // Filters
  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    currentFilter = e.target.value;
    renderProducts();
  });
  document.getElementById('sortFilter').addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });

  // Mood links
  document.querySelectorAll('.mood-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.dataset.filter;
      currentFilter = filter;
      document.getElementById('categoryFilter').value = filter;
      renderProducts();
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Quiz
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => handleQuiz(btn.dataset.mood));
  });
  document.getElementById('quizReset').addEventListener('click', resetQuiz);

  // Gift add
  document.querySelectorAll('.add-gift').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.id, 'Set', Number(btn.dataset.price), btn.dataset.name);
    });
  });

  // Newsletter
  document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value.trim();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email');
      return;
    }
    document.getElementById('newsletterForm').style.display = 'none';
    document.getElementById('newsletterNote').style.display = 'none';
    document.getElementById('newsletterSuccess').style.display = 'block';
  });

  // Modal close
  document.getElementById('modalClose').addEventListener('click', closeProductModal);
  document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeProductModal();
  });
  document.getElementById('policyClose').addEventListener('click', () => {
    document.getElementById('policyModal').classList.remove('open');
    document.body.style.overflow = '';
  });
  document.getElementById('policyModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      document.getElementById('policyModal').classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Policy links
  document.getElementById('privacyLink').addEventListener('click', (e) => { e.preventDefault(); openPolicy('privacy'); });
  document.getElementById('shippingLink').addEventListener('click', (e) => { e.preventDefault(); openPolicy('shipping'); });
  document.getElementById('returnsLink').addEventListener('click', (e) => { e.preventDefault(); openPolicy('returns'); });

  // Back to top
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeCart();
      closeProductModal();
      document.getElementById('policyModal').classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// Expose for inline handlers
window.openProductModal = openProductModal;
