import linksData from './data/links.json';
import specialsData from './data/specials.json';
import kitchenInfoData from './data/kitchenInfo.json';
import { parseLinkItem, ICONS } from './utils/linkParser.js';
import { menuManager } from './utils/menuManager.js';
import { checkServiceability, checkGPSLocation } from './utils/deliveryChecker.js';

const ARROW_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="m9 18 6-6-6-6"></path>
  </svg>
`;

/**
 * Render Links List
 */
export function renderLinks() {
  const container = document.getElementById('links-list');
  if (!container) return;

  container.innerHTML = '';

  linksData.forEach((item, index) => {
    const parsed = parseLinkItem(item);
    
    const a = document.createElement('a');
    a.className = `link-card ${parsed.isFeatured ? 'is-featured-btn' : ''}`;
    a.href = parsed.url;
    a.setAttribute('data-platform', parsed.platform);
    a.setAttribute('id', `link-${parsed.platform}-${index}`);
    
    if (parsed.isExternal && !parsed.url.startsWith('#')) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    // Intercept menu click to open the Menu Window right in the window
    if (parsed.platform === 'menu' || parsed.url.includes('menu')) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        menuManager.openMenuWindow();
      });
    } else if (parsed.url.startsWith('#')) {
      // Smooth scroll for internal hashes
      a.addEventListener('click', (e) => {
        const targetId = parsed.url.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          targetEl.classList.add('nav-focus-pulse');
          setTimeout(() => targetEl.classList.remove('nav-focus-pulse'), 1500);
        }
      });
    }

    a.innerHTML = `
      <div class="link-icon-box" aria-hidden="true">
        ${parsed.icon}
      </div>
      <div class="link-content">
        <span class="link-title">${escapeHTML(parsed.title)}</span>
        ${parsed.subtitle ? `<span class="link-subtitle">${escapeHTML(parsed.subtitle)}</span>` : ''}
      </div>
      <div class="link-arrow" aria-hidden="true">
        ${ARROW_SVG}
      </div>
    `;

    // Tap feedback
    a.addEventListener('click', () => {
      if (window.navigator?.vibrate) {
        window.navigator.vibrate(10);
      }
    });

    container.appendChild(a);
  });
}

/**
 * Render Daily Specials Section
 */
export function renderSpecials() {
  const container = document.getElementById('specials-container');
  if (!container || !specialsData?.enabled) return;

  container.innerHTML = `
    <section class="section-card specials-card" id="menu-section">
      <div class="section-header">
        <div class="section-badge">
          <span class="live-dot"></span>
          <span>${escapeHTML(specialsData.badge || "Today's Special")}</span>
        </div>
        <h2 class="section-heading">${escapeHTML(specialsData.title || "Daily Food Specials")}</h2>
      </div>

      <div class="special-food-image-wrapper">
        <img 
          src="${escapeHTML(specialsData.image)}" 
          alt="${escapeHTML(specialsData.imageAlt || specialsData.dishName)}" 
          class="special-food-img"
          loading="lazy"
        />
        <div class="special-dish-pill">${escapeHTML(specialsData.dishName)}</div>
      </div>

      <div class="special-body">
        <p class="special-description">${escapeHTML(specialsData.description)}</p>
        <p class="special-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="note-icon">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
          </svg>
          ${escapeHTML(specialsData.note)}
        </p>

        <a 
          href="https://wa.me/?text=Hello%20Riya%E2%80%99s%20Kitchen,%20I%20would%20like%20to%20order%20the%20${encodeURIComponent(specialsData.dishName)}" 
          class="order-special-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="btn-icon">${ICONS.whatsapp}</span>
          <span>Order Today's Special on WhatsApp</span>
        </a>
      </div>
    </section>
  `;
}

/**
 * Render Kitchen Info Section (Hours, Delivery, Service Area)
 */
export function renderKitchenInfo() {
  const container = document.getElementById('kitchen-info-container');
  if (!container || !kitchenInfoData?.enabled) return;

  const itemsHtml = (kitchenInfoData.details || []).map(item => {
    const icon = ICONS[item.icon] || ICONS.clock;
    return `
      <div class="info-row">
        <div class="info-icon-pill">
          ${icon}
        </div>
        <div class="info-text-group">
          <span class="info-row-title">${escapeHTML(item.title)}</span>
          <span class="info-row-desc">${escapeHTML(item.text)}</span>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <section class="section-card kitchen-info-card">
      <h3 class="info-card-title">${escapeHTML(kitchenInfoData.heading || "Kitchen & Ordering Info")}</h3>
      <div class="info-rows-list">
        ${itemsHtml}
      </div>
    </section>
  `;
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

/**
 * Setup Share Button & Toast
 */
function setupShare() {
  const shareBtn = document.getElementById('share-btn');
  const toast = document.getElementById('toast');

  if (!shareBtn) return;

  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: "Riya’s Kitchen | Homemade Goodness, Every Day",
      text: "Explore Riya’s Kitchen - Comforting food. Freshly prepared. Made with love.",
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  });

  function copyToClipboard() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => showToast("Link copied to clipboard!"))
        .catch(() => fallbackCopy());
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    try {
      const tempInput = document.createElement('input');
      tempInput.value = window.location.href;
      tempInput.style.position = 'fixed';
      tempInput.style.opacity = '0';
      document.body.appendChild(tempInput);
      tempInput.focus();
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showToast("Link copied to clipboard!");
    } catch {
      showToast("Link copied to clipboard!");
    }
  }

  function showToast(message) {
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-msg');
    if (msgEl) msgEl.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__toastTimeout);
    window.__toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/**
 * Setup 15 km Delivery Area Checker from Zensar Kharadi
 */
function setupDeliveryChecker() {
  const form = document.getElementById('area-check-form');
  const input = document.getElementById('area-query-input');
  const gpsBtn = document.getElementById('use-my-gps-btn');
  const resultBox = document.getElementById('checker-result-box');

  if (!form || !input || !resultBox) return;

  function renderLoading(msg = "Checking distance from Zensar Kharadi...") {
    resultBox.style.display = 'block';
    resultBox.className = 'checker-result-box result-loading';
    resultBox.innerHTML = `<span>⏳ ${escapeHTML(msg)}</span>`;
  }

  function renderResult(res) {
    resultBox.style.display = 'block';

    if (!res.success) {
      resultBox.className = 'checker-result-box result-warning';
      resultBox.innerHTML = `
        <div class="result-badge-row">
          <span class="status-icon">ℹ️</span>
          <strong>Notice</strong>
        </div>
        <p class="result-distance">${escapeHTML(res.message)}</p>
      `;
      return;
    }

    if (res.inZone) {
      resultBox.className = 'checker-result-box result-success';
      resultBox.innerHTML = `
        <div class="result-badge-row">
          <span class="status-icon">🎉</span>
          <strong>Delivery Available in ${escapeHTML(res.areaName)}!</strong>
        </div>
        <p class="result-distance">
          Approx <strong>${res.distanceKm} km</strong> from our kitchen at Zensar Kharadi (within our 15 km delivery radius).
        </p>
        <div class="result-perks">
          <span>⚡ Normal Cakes: 1–2 Hr Express</span> • <span>🌟 Premium Cakes: 4 Hr Slot</span>
        </div>
        <button type="button" id="open-cake-menu-from-checker" class="result-order-btn">
          Browse Cake Menu & Order ➔
        </button>
      `;

      const orderBtn = resultBox.querySelector('#open-cake-menu-from-checker');
      if (orderBtn) {
        orderBtn.addEventListener('click', () => {
          menuManager.openMenuWindow();
        });
      }
    } else {
      resultBox.className = 'checker-result-box result-warning';
      resultBox.innerHTML = `
        <div class="result-badge-row">
          <span class="status-icon">⚠️</span>
          <strong>${escapeHTML(res.areaName)} is outside our standard 15 km radius</strong>
        </div>
        <p class="result-distance">
          Calculated distance: <strong>${res.distanceKm} km</strong> from Zensar Kharadi. Standard delivery is up to 15 km.
        </p>
        <p class="result-whatsapp-hint">
          Ordering for a large party or special celebration? Contact us directly on WhatsApp to check if custom long-distance delivery is possible!
        </p>
      `;
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) {
      renderResult({ success: false, message: "Please enter your Pune area or pincode." });
      input.focus();
      return;
    }
    renderLoading(`Checking distance for "${query}"...`);
    const res = await checkServiceability(query);
    renderResult(res);
  });

  if (gpsBtn) {
    gpsBtn.addEventListener('click', async () => {
      renderLoading("Locating your device via GPS...");
      const res = await checkGPSLocation();
      renderResult(res);
    });
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderLinks();
  menuManager.init();
  setupDeliveryChecker();
  setupShare();

  if (window.location.hash === '#menu' || window.location.hash === '#digital-menu-section') {
    menuManager.openMenuWindow();
  }
});
