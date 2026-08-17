/**
 * AQUAPRO Plumbing Supplies & Sanitary Fittings Store - Core JavaScript
 * Modern ES6+ Modular Architecture
 */

(function () {
  'use strict';

  // ==========================================================================
  // Global State & Data Store
  // ==========================================================================
  const STORE = {
    rfqItems: JSON.parse(localStorage.getItem('aquapro_rfq') || '[]'),
    theme: localStorage.getItem('aquapro_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    dir: localStorage.getItem('aquapro_dir') || 'ltr'
  };

  // Sample Product Database for Quick View & Dynamic Filters
  const PRODUCTS_DB = [
    {
      id: 'valve-01',
      title: 'Heavy-Duty Brass Angle Valve PN16',
      category: 'Valves',
      brand: 'Watts',
      price: '$18.50',
      numericPrice: 18.50,
      sku: 'WTT-AV-16',
      material: 'DZR Brass',
      rating: 'PN16 / 232 PSI',
      inStock: true,
      image: 'assets/images/products/prod-angle-valve.jpg',
      description: 'Corrosion-resistant DZR brass body with chrome finish and 1/4 turn ceramic disc cartridge. Ideal for geyser, basin, and WC inlet lines.'
    },
    {
      id: 'pipe-01',
      title: 'CPVC High-Pressure Tee & Elbow Fittings',
      category: 'Pipes & Fittings',
      brand: 'Astral',
      price: '$6.20',
      numericPrice: 6.20,
      sku: 'AST-CPVC-90',
      material: 'Chlorinated PVC',
      rating: 'SDR 11 / Class 1',
      inStock: true,
      image: 'assets/images/products/prod-cpvc-fittings.jpg',
      description: 'Engineered for high-temperature hot & cold potable water distribution. ASTM F441 compliant with superior tensile strength.'
    },
    {
      id: 'tap-01',
      title: 'Matte Graphite Ceramic Basin Mixer',
      category: 'Taps & Faucets',
      brand: 'Grohe',
      price: '$185.00',
      numericPrice: 185.00,
      sku: 'GRH-MX-402',
      material: 'Solid Brass / PVD',
      rating: 'WELS 5-Star',
      inStock: true,
      image: 'assets/images/products/prod-basin-mixer.jpg',
      description: 'Architectural single-lever basin mixer with SilkMove 35mm ceramic cartridge and scratch-resistant matte graphite PVD coating.'
    },
    {
      id: 'shower-01',
      title: 'Concealed Thermostatic Shower System 300mm',
      category: 'Taps & Faucets',
      brand: 'Kohler',
      price: '$450.00',
      numericPrice: 450.00,
      sku: 'KHL-SHW-300',
      material: 'Brushed Bronze',
      rating: '38°C Safety Stop',
      inStock: true,
      image: 'assets/images/products/prod-shower-system.jpg',
      description: 'Dual-outlet thermostatic shower system with 300mm ultra-slim stainless steel rainhead, anti-scald technology and hand shower.'
    },
    {
      id: 'sanitary-01',
      title: 'Wall-Hung Rimless Smart Ceramic WC',
      category: 'Sanitary Ware',
      brand: 'Geberit',
      price: '$320.00',
      numericPrice: 320.00,
      sku: 'GBR-WC-88',
      material: 'Vitreous China',
      rating: 'Dual Flush 4.5/3L',
      inStock: true,
      image: 'assets/images/products/prod-rimless-wc.jpg',
      description: 'Hygienic rimless ceramic pan with quick-release soft-close UF seat cover. Compatible with standard concealed cistern frames.'
    },
    {
      id: 'drain-01',
      title: '304 Stainless Steel Tile-Insert Linear Drain',
      category: 'Drainage',
      brand: 'Jaquar',
      price: '$75.00',
      numericPrice: 75.00,
      sku: 'JQR-DRN-600',
      material: 'AISI 304 Stainless',
      rating: 'DN50 High Flow',
      inStock: true,
      image: 'assets/images/products/prod-linear-drain.jpg',
      description: 'Reversible 2-in-1 tile-in drain channel with anti-odor siphon trap and hair catcher basket for luxury wetroom walk-in showers.'
    },
    {
      id: 'tank-01',
      title: '5-Layer Anti-Bacterial HDPE Water Storage Tank',
      category: 'Water Storage',
      brand: 'Supreme',
      price: '$480.00',
      numericPrice: 480.00,
      sku: 'SUP-TNK-2000',
      material: 'Virgin Food-Grade HDPE',
      rating: '2,000 Liters Capacity',
      inStock: true,
      image: 'assets/images/products/prod-water-tank.jpg',
      description: 'Multi-layer UV-stabilized heavy duty water tank with silver-nano anti-microbial inner barrier preventing algae growth.'
    },
    {
      id: 'valve-02',
      title: 'Industrial Full-Bore Flanged Ball Valve PN25',
      category: 'Valves',
      brand: 'Viega',
      price: '$110.00',
      numericPrice: 110.00,
      sku: 'VGA-BV-50',
      material: 'Forged Brass & Steel',
      rating: 'PN25 / 360 PSI',
      inStock: true,
      image: 'assets/images/products/prod-ball-valve.jpg',
      description: 'Heavy commercial quarter-turn ball valve for water, air, and neutral fluids. PTFE seats and blowout-proof stem.'
    },
    {
      id: 'pipe-02',
      title: 'PPR-AL-PPR Multi-Layer Composite Piping System',
      category: 'Pipes & Fittings',
      brand: 'Astral',
      price: '$14.80',
      numericPrice: 14.80,
      sku: 'AST-PPR-32',
      material: 'PPR + Aluminum Foil',
      rating: 'PN20 / DIN 8077',
      inStock: true,
      image: 'assets/images/products/prod-ppr-pipe.jpg',
      description: 'Oxygen-barrier composite pipe with negligible thermal expansion. Ideal for high-pressure concealed central heating and cooling.'
    },
    {
      id: 'tool-01',
      title: 'Heavy-Duty Pro Aluminum Pipe Wrench 18"',
      category: 'Plumbing Tools',
      brand: 'Ridgid',
      price: '$92.00',
      numericPrice: 92.00,
      sku: 'RDG-WR-18',
      material: 'Alloy Aluminum Body',
      rating: 'Up to 2.5" Pipe Cap',
      inStock: true,
      image: 'assets/images/products/prod-pipe-wrench.jpg',
      description: 'Professional contractor wrench offering 40% lighter weight than cast-iron with hardened alloy steel floating hook jaws.'
    },
    {
      id: 'hose-01',
      title: '316 Braided Stainless Steel Flexible Connector',
      category: 'Pipes & Fittings',
      brand: 'Watts',
      price: '$11.50',
      numericPrice: 11.50,
      sku: 'WTT-HOSE-500',
      material: '316 SS + EPDM Core',
      rating: '1/2" BSP Female x 500mm',
      inStock: true,
      image: 'assets/images/products/prod-flexible-hose.jpg',
      description: 'High-burst-pressure flexible supply line with brass hex nuts and captive silicone seals for water heaters and sanitary monoblocs.'
    },
    {
      id: 'pump-01',
      title: 'Stainless Steel Submersible Drainage Pump 1.5HP',
      category: 'Drainage',
      brand: 'Viega',
      price: '$340.00',
      numericPrice: 340.00,
      sku: 'VGA-PUMP-15',
      material: 'Cast Iron & 304 SS',
      rating: '1.5 HP / 350 L/min',
      inStock: true,
      image: 'assets/images/products/prod-submersible-pump.jpg',
      description: 'Heavy duty sump pump with integrated automatic float switch, thermal overload motor protection, and non-clog vortex impeller.'
    }
  ];

  // ==========================================================================
  // Initialization
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initDirection();
    initHeader();
    initMobileNav();
    initRfqDrawer();
    initQuickView();
    initShopFilters();
    initForms();
    initProductDetailsTabs();
    initProjectFinder();
    initBrandFilter();
    initCountdown();
    updateRfqBadge();
    initScrollToTop();
  });

  // ==========================================================================
  // Scroll To Top Button
  // ==========================================================================
  function initScrollToTop() {
    const btn = document.createElement('button');
    btn.id = 'scrollToTopBtn';
    btn.className = 'scroll-to-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = `
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // Theme Toggle (Dark / Light)
  // ==========================================================================
  function initTheme() {
    document.documentElement.setAttribute('data-theme', STORE.theme);
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');

    toggleBtns.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${STORE.theme === 'dark' ? 'Light' : 'Dark'} Mode`);
      btn.addEventListener('click', function () {
        STORE.theme = STORE.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', STORE.theme);
        localStorage.setItem('aquapro_theme', STORE.theme);
      });
    });
  }

  // ==========================================================================
  // RTL Support Toggle
  // ==========================================================================
  function initDirection() {
    document.documentElement.setAttribute('dir', STORE.dir);
    const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');

    rtlBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        STORE.dir = STORE.dir === 'rtl' ? 'ltr' : 'rtl';
        document.documentElement.setAttribute('dir', STORE.dir);
        localStorage.setItem('aquapro_dir', STORE.dir);
      });
    });
  }

  // ==========================================================================
  // Sticky Header Scroll
  // ==========================================================================
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ==========================================================================
  // Mobile Off-Canvas Navigation
  // ==========================================================================
  function initMobileNav() {
    const hamburger = document.querySelector('.hamburger-btn');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const closeBtn = document.querySelector('.drawer-close-btn');
    const backdrop = document.querySelector('.drawer-backdrop');

    if (!hamburger || !drawer) return;

    function openDrawer() {
      drawer.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeDrawer();
      }
    });
  }

  // ==========================================================================
  // RFQ (Request For Quote) Cart Drawer
  // ==========================================================================
  function initRfqDrawer() {
    const rfqDrawer = document.getElementById('rfqDrawer');
    const rfqTriggers = document.querySelectorAll('.rfq-cart-trigger');
    const rfqCloseBtn = document.querySelector('.rfq-close-btn');
    const backdrop = document.querySelector('.drawer-backdrop');
    const submitRfqBtn = document.getElementById('submitRfqBtn');

    if (!rfqDrawer) return;

    function openRfq() {
      renderRfqItems();
      rfqDrawer.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeRfq() {
      rfqDrawer.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    rfqTriggers.forEach(btn => btn.addEventListener('click', openRfq));
    if (rfqCloseBtn) rfqCloseBtn.addEventListener('click', closeRfq);

    // Global Add To RFQ Handler
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.add-to-rfq-btn');
      if (btn) {
        const prodId = btn.getAttribute('data-product-id');
        const qtyInput = document.getElementById('productQty');
        const quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
        addToRfq(prodId, quantity);
      }
    });

    if (submitRfqBtn) {
      submitRfqBtn.addEventListener('click', function () {
        if (STORE.rfqItems.length === 0) {
          showToast('Your quote tray is empty! Add products first.');
          return;
        }
        closeRfq();
        showToast('Redirecting to Bulk Pricing Enquiry with your items...');
        setTimeout(function () {
          window.location.href = 'bulk-pricing.html?rfq=active';
        }, 800);
      });
    }
  }

  function addToRfq(productId, quantity = 1) {
    const prod = PRODUCTS_DB.find(p => p.id === productId);
    if (!prod) {
      showToast('Product added to Quote List!');
      return;
    }

    const existing = STORE.rfqItems.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      STORE.rfqItems.push({
        id: prod.id,
        title: prod.title,
        sku: prod.sku,
        brand: prod.brand,
        price: prod.price,
        image: prod.image,
        quantity: quantity
      });
    }

    localStorage.setItem('aquapro_rfq', JSON.stringify(STORE.rfqItems));
    updateRfqBadge();
    showToast(`Added ${quantity}x "${prod.title}" to Quote List`);
  }

  function updateRfqBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const totalQty = STORE.rfqItems.reduce((acc, item) => acc + item.quantity, 0);
    badges.forEach(b => {
      b.textContent = totalQty;
      b.style.display = totalQty > 0 ? 'flex' : 'none';
    });
  }

  function renderRfqItems() {
    const container = document.getElementById('rfqItemList');
    const totalSpan = document.getElementById('rfqTotalItems');
    if (!container) return;

    if (totalSpan) totalSpan.textContent = STORE.rfqItems.length;

    if (STORE.rfqItems.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <svg style="width: 48px; height: 48px; margin: 0 auto 1rem; opacity: 0.4;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h4 style="margin-bottom: 0.5rem;">Your RFQ List is Empty</h4>
          <p style="font-size: 0.875rem;">Browse products in the shop and click "Add to Quote" to request trade pricing.</p>
        </div>
      `;
      return;
    }

    let html = '';
    STORE.rfqItems.forEach((item, idx) => {
      html += `
        <div class="rfq-item">
          <img src="${item.image}" alt="${item.title}" class="rfq-item-thumb">
          <div class="rfq-item-details">
            <h5 style="font-size: 0.9rem; margin-bottom: 0.2rem;">${item.title}</h5>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem;">SKU: ${item.sku} | ${item.brand}</div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-accent);">Qty: ${item.quantity}</div>
              <button class="remove-rfq-item-btn" data-index="${idx}" style="color: var(--color-danger); font-size: 0.75rem; font-weight: 600;">Remove</button>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach Remove listeners
    container.querySelectorAll('.remove-rfq-item-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-index'), 10);
        STORE.rfqItems.splice(idx, 1);
        localStorage.setItem('aquapro_rfq', JSON.stringify(STORE.rfqItems));
        updateRfqBadge();
        renderRfqItems();
      });
    });
  }

  // ==========================================================================
  // Product Quick View Modal
  // ==========================================================================
  function initQuickView() {
    const modalBackdrop = document.getElementById('quickViewModal');
    const closeBtn = document.querySelector('.modal-close-btn');

    if (!modalBackdrop) return;

    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.quick-view-trigger');
      if (btn) {
        const prodId = btn.getAttribute('data-product-id');
        openQuickView(prodId);
      }
    });

    function openQuickView(productId) {
      const prod = PRODUCTS_DB.find(p => p.id === productId) || PRODUCTS_DB[0];
      
      document.getElementById('qvTitle').textContent = prod.title;
      document.getElementById('qvCategory').textContent = prod.category;
      document.getElementById('qvBrand').textContent = prod.brand;
      document.getElementById('qvSku').textContent = prod.sku;
      document.getElementById('qvMaterial').textContent = prod.material;
      document.getElementById('qvRating').textContent = prod.rating;
      document.getElementById('qvPrice').textContent = prod.price;
      document.getElementById('qvDescription').textContent = prod.description;
      document.getElementById('qvImage').src = prod.image;
      document.getElementById('qvImage').alt = prod.title;

      const qvAddBtn = document.getElementById('qvAddRfqBtn');
      if (qvAddBtn) qvAddBtn.setAttribute('data-product-id', prod.id);

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ==========================================================================
  // Shop Filters & Live Search
  // ==========================================================================
  function initShopFilters() {
    const grid = document.getElementById('shopProductGrid');
    if (!grid) return;

    const categoryInputs = document.querySelectorAll('input[name="category_filter"]');
    const brandInputs = document.querySelectorAll('input[name="brand_filter"]');
    const priceSlider = document.getElementById('priceRangeSlider');
    const priceLabel = document.getElementById('priceRangeLabel');
    const searchInput = document.getElementById('shopSearchInput');
    const sortSelect = document.getElementById('shopSortSelect');
    const resultCount = document.getElementById('shopResultCount');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    function applyFilters() {
      const selectedCategories = Array.from(categoryInputs).filter(i => i.checked).map(i => i.value);
      const selectedBrands = Array.from(brandInputs).filter(i => i.checked).map(i => i.value);
      const maxPrice = priceSlider ? parseFloat(priceSlider.value) : 1000;
      const searchKw = searchInput ? searchInput.value.toLowerCase().trim() : '';
      const sortVal = sortSelect ? sortSelect.value : 'default';

      let filtered = PRODUCTS_DB.filter(prod => {
        const catMatch = selectedCategories.length === 0 || selectedCategories.includes(prod.category);
        const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(prod.brand);
        const priceMatch = prod.numericPrice <= maxPrice;
        const searchMatch = !searchKw || prod.title.toLowerCase().includes(searchKw) || prod.sku.toLowerCase().includes(searchKw) || prod.description.toLowerCase().includes(searchKw);
        return catMatch && brandMatch && priceMatch && searchMatch;
      });

      // Sorting
      if (sortVal === 'price-low') {
        filtered.sort((a, b) => a.numericPrice - b.numericPrice);
      } else if (sortVal === 'price-high') {
        filtered.sort((a, b) => b.numericPrice - a.numericPrice);
      } else if (sortVal === 'name-az') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      }

      renderShopProducts(filtered);
      if (resultCount) resultCount.textContent = `Showing ${filtered.length} products`;
    }

    if (priceSlider && priceLabel) {
      priceSlider.addEventListener('input', function () {
        priceLabel.textContent = `$${this.value}`;
        applyFilters();
      });
    }

    categoryInputs.forEach(i => i.addEventListener('change', applyFilters));
    brandInputs.forEach(i => i.addEventListener('change', applyFilters));
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (sortSelect) sortSelect.addEventListener('change', applyFilters);

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function () {
        categoryInputs.forEach(i => i.checked = false);
        brandInputs.forEach(i => i.checked = false);
        if (priceSlider) { priceSlider.value = 500; priceLabel.textContent = '$500'; }
        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'default';
        applyFilters();
      });
    }

    // Initial render
    applyFilters();
  }

  function renderShopProducts(items) {
    const grid = document.getElementById('shopProductGrid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <h4>No products found matching your criteria</h4>
          <p style="color: var(--text-muted); margin-top: 0.5rem;">Try clearing your filters or searching for another fitting or SKU.</p>
        </div>
      `;
      return;
    }

    let html = '';
    items.forEach(prod => {
      html += `
        <div class="product-card">
          <div class="product-thumb">
            <span class="badge badge-blue product-badge-top">${prod.category}</span>
            <img src="${prod.image}" alt="${prod.title}" loading="lazy">
            <button class="btn btn-secondary btn-sm product-quick-btn quick-view-trigger" data-product-id="${prod.id}">Quick View</button>
          </div>
          <div class="product-info">
            <div class="product-meta">
              <span>${prod.brand}</span>
              <span class="mono">${prod.sku}</span>
            </div>
            <h4 class="product-title"><a href="product-details.html?id=${prod.id}">${prod.title}</a></h4>
            <div class="product-specs-list">
              <span class="spec-pill">${prod.material}</span>
              <span class="spec-pill">${prod.rating}</span>
            </div>
            <div class="product-footer">
              <div class="product-price">${prod.price} <span class="unit">/ unit</span></div>
              <button class="btn btn-primary btn-sm add-to-rfq-btn" data-product-id="${prod.id}">+ Quote</button>
            </div>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
  }

  // ==========================================================================
  // Client-Side Form Validation & Handling
  // ==========================================================================
  function initForms() {
    const forms = document.querySelectorAll('form[data-validate="true"]');

    forms.forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');

        requiredInputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
          } else if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            input.classList.add('error');
          } else if (input.type === 'tel' && !validatePhone(input.value)) {
            isValid = false;
            input.classList.add('error');
          } else {
            input.classList.remove('error');
          }
        });

        if (isValid) {
          const submitBtn = form.querySelector('button[type="submit"]');
          const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
          if (submitBtn) {
            submitBtn.innerHTML = 'Submitting...';
            submitBtn.disabled = true;
          }

          setTimeout(() => {
            if (submitBtn) {
              submitBtn.innerHTML = 'Enquiry Sent Successfully!';
              submitBtn.style.background = 'var(--color-success)';
            }
            showToast('Your project enquiry has been submitted. Our MEP engineer will respond within 2 hours!');
            form.reset();
            setTimeout(() => {
              if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
              }
            }, 4000);
          }, 800);
        } else {
          showToast('Please fill in all required fields accurately.');
        }
      });
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    return /^[\d\+\-\(\)\s]{7,20}$/.test(phone);
  }

  // ==========================================================================
  // Product Details Tabs & Stepper
  // ==========================================================================
  function initProductDetailsTabs() {
    const tabBtns = document.querySelectorAll('.spec-tab-btn');
    const tabPanes = document.querySelectorAll('.spec-tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const target = this.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.style.display = 'none');

        this.classList.add('active');
        const activePane = document.getElementById(target);
        if (activePane) activePane.style.display = 'block';
      });
    });

    // Quantity Steppers
    document.querySelectorAll('.stepper-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const input = this.parentElement.querySelector('.stepper-input');
        if (!input) return;
        let val = parseInt(input.value, 10) || 1;
        if (this.getAttribute('data-action') === 'increase') {
          val++;
        } else if (this.getAttribute('data-action') === 'decrease' && val > 1) {
          val--;
        }
        input.value = val;
      });
    });
  }

  // ==========================================================================
  // Project-Based Product Finder (categories.html)
  // ==========================================================================
  function initProjectFinder() {
    const projectCards = document.querySelectorAll('.project-selector-card');
    const outputContainer = document.getElementById('projectFinderOutput');

    if (!projectCards.length || !outputContainer) return;

    const projectData = {
      residential: {
        title: 'High-End Residential Villa Package',
        desc: 'Recommended sanitary ware, CPVC water distribution, silent drainage, and thermostatic bath fittings.',
        items: ['CPVC SDR 11 Hot/Cold Piping', 'Rimless Wall-Hung Smart WCs', 'Concealed Thermostatic Shower Mixers', 'Tile-Insert 304 Linear Drains', 'Multi-Layer HDPE Overhead Water Tank']
      },
      commercial: {
        title: 'Commercial Office Tower & Mall Infrastructure',
        desc: 'Heavy-traffic sensor taps, cast iron gate valves, fire-rated PPR risers, and high-flow grease interceptors.',
        items: ['Full-Bore Industrial PN25 Ball Valves', 'Commercial Touchless Sensor Faucets', 'Cast Iron Sump Drainage Pumps', 'PPR-AL-PPR High-Rise Risers', 'Pressure Reducing Valve (PRV) Stations']
      },
      hospital: {
        title: 'Healthcare & Hospital Clinical Sanitation',
        desc: 'Sterile surgical scrub sinks, lead-free DZR brassware, anti-microbial fittings, and backflow preventers.',
        items: ['DZR Brass Clinical Elbow-Action Faucets', 'WRAS Approved Backflow Preventers', 'Anti-Bacterial Copper Distribution Lines', 'Thermostatic Anti-Scald Mixing Valves', 'Acid-Waste High-Density Polypropylene Pipes']
      },
      hospitality: {
        title: 'Luxury Hotel & Resort Suite Specification',
        desc: 'Designer matte graphite & brushed bronze tapware, freestanding tubs, acoustic insulated drain pipes.',
        items: ['Architectural Brushed Bronze Rain Showers', 'Custom Stone Basin Mixers', 'Acoustic Sound-Dampened Soil Pipes', 'Central Hot Water Circulation Manifolds', 'Wall-Mounted Touch Sensor Flush Plates']
      }
    };

    projectCards.forEach(card => {
      card.addEventListener('click', function () {
        projectCards.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        const pType = this.getAttribute('data-project');
        const data = projectData[pType] || projectData.residential;

        outputContainer.innerHTML = `
          <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-card);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <span class="badge badge-amber">Custom MEP Bill of Materials</span>
              <button class="btn btn-primary btn-sm add-to-rfq-btn" onclick="alert('All 5 core package items added to your RFQ Quote tray!')">Add All to Quote</button>
            </div>
            <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">${data.title}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${data.desc}</p>
            <ul style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem;">
              ${data.items.map(item => `
                <li style="display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.9rem; font-weight: 600;">
                  <span style="color: var(--color-success); font-weight: bold; margin-top: 1px;">✓</span> ${item}
                </li>
              `).join('')}
            </ul>
          </div>
        `;
      });
    });
  }

  // ==========================================================================
  // Brand Directory A-Z Filter (brands.html)
  // ==========================================================================
  function initBrandFilter() {
    const alphabetBtns = document.querySelectorAll('.brand-letter-btn');
    const brandCards = document.querySelectorAll('.brand-directory-item');

    if (!alphabetBtns.length || !brandCards.length) return;

    alphabetBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        alphabetBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const letter = this.getAttribute('data-letter');

        brandCards.forEach(card => {
          const brandName = card.getAttribute('data-brand-name') || '';
          if (letter === 'ALL' || brandName.toUpperCase().startsWith(letter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================================================
  // Live Countdown Timer (coming-soon.html)
  // ==========================================================================
  function initCountdown() {
    const daysEl = document.getElementById('cntDays');
    const hoursEl = document.getElementById('cntHours');
    const minsEl = document.getElementById('cntMins');
    const secsEl = document.getElementById('cntSecs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 45);

    function update() {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) return;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(minutes).padStart(2, '0');
      secsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  // ==========================================================================
  // Toast Notifications Utility
  // ==========================================================================
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg style="width: 18px; height: 18px; color: var(--color-accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Expose global helpers if needed
  window.AQUAPRO = {
    showToast,
    addToRfq
  };

})();
