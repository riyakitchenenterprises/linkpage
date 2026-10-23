import linksData from './data/links.json';
import specialsData from './data/specials.json';
import kitchenInfoData from './data/kitchenInfo.json';
import { parseLinkItem, ICONS } from './utils/linkParser.js';

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

    // Smooth scroll for internal hashes
    if (parsed.url.startsWith('#')) {
      a.addEventListener('click', (e) => {
        const targetId = parsed.url.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderLinks();
  renderSpecials();
  renderKitchenInfo();
  setupShare();
});
