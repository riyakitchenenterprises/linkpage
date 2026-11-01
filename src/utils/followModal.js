/**
 * Follow Modal Controller for Riya's Kitchen | Cakes
 * Provides combined popup for Instagram & Facebook
 */

const FOLLOW_MODAL_HTML = `
  <div id="follow-modal-backdrop" class="follow-modal-backdrop" aria-hidden="true"></div>

  <div id="follow-modal" class="follow-modal" role="dialog" aria-modal="true" aria-labelledby="follow-modal-title">
    <div class="follow-drag-pill" aria-hidden="true"></div>

    <div class="follow-modal-header">
      <div class="follow-title-wrap">
        <h2 id="follow-modal-title" class="follow-modal-title">Follow Riya’s Kitchen | Cakes</h2>
        <p class="follow-modal-tagline">Connect with our bakery for daily reels, cake designs & offers!</p>
      </div>
      <button id="close-follow-modal-btn" class="follow-close-btn" aria-label="Close follow options">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <div class="follow-modal-body">
      <!-- Instagram Option Card -->
      <a href="https://www.instagram.com/riyakitchenenterprises/" target="_blank" rel="noopener noreferrer" class="social-follow-card ig-card">
        <div class="social-icon-wrapper ig-icon-bg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </svg>
        </div>
        <div class="social-card-info">
          <div class="social-card-name-row">
            <span class="social-platform-name">Instagram</span>
            <span class="social-handle-badge">@riyakitchenenterprises</span>
          </div>
          <p class="social-card-desc">Cake reels, customer stories & fresh decoration videos</p>
        </div>
        <div class="social-action-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </a>

      <!-- Facebook Option Card -->
      <a href="https://www.facebook.com/riyakitchenenterprises/" target="_blank" rel="noopener noreferrer" class="social-follow-card fb-card">
        <div class="social-icon-wrapper fb-icon-bg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </div>
        <div class="social-card-info">
          <div class="social-card-name-row">
            <span class="social-platform-name">Facebook</span>
            <span class="social-handle-badge">riyakitchenenterprises</span>
          </div>
          <p class="social-card-desc">Customer reviews, community updates & bakery posts</p>
        </div>
        <div class="social-action-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </a>
    </div>
  </div>
`;

class FollowModalManager {
  constructor() {
    this.isInjected = false;
  }

  init() {
    if (this.isInjected) return;
    document.body.insertAdjacentHTML('beforeend', FOLLOW_MODAL_HTML);
    this.isInjected = true;
    this.bindEvents();
  }

  bindEvents() {
    const backdrop = document.getElementById('follow-modal-backdrop');
    const closeBtn = document.getElementById('close-follow-modal-btn');

    if (backdrop) backdrop.addEventListener('click', () => this.close());
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
  }

  open() {
    this.init();
    const modal = document.getElementById('follow-modal');
    const backdrop = document.getElementById('follow-modal-backdrop');

    if (modal && backdrop) {
      backdrop.classList.add('is-active');
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    const modal = document.getElementById('follow-modal');
    const backdrop = document.getElementById('follow-modal-backdrop');

    if (modal && backdrop) {
      modal.classList.remove('is-open');
      backdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }
}

export const followModalManager = new FollowModalManager();
