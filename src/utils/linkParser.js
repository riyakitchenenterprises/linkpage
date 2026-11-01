/**
 * Link Parser & Platform Auto-Detector for Riya’s Kitchen
 */

export const ICONS = {
  whatsapp: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="link-icon-svg">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>`,

  menu: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="link-icon-svg">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
      <path d="M7 2v20"></path>
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
    </svg>`,

  instagram: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="link-icon-svg">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>`,

  facebook: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="link-icon-svg">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>`,

  email: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="link-icon-svg">
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>`,

  phone: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="link-icon-svg">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>`,

  clock: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="info-icon-svg">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>`,

  truck: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="info-icon-svg">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
      <path d="M15 18H9"></path>
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
      <circle cx="17" cy="18" r="2"></circle>
      <circle cx="7" cy="18" r="2"></circle>
    </svg>`,

  map: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="info-icon-svg">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>`,

  social: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="link-icon-svg">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>`,

  zomato: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="link-icon-svg">
      <path d="M4 11h16a1 1 0 0 1 1 1c0 4.97-4.03 9-9 9s-9-4.03-9-9a1 1 0 0 1 1-1z"></path>
      <path d="M6 8c1-1.5 1-2.5 0-4"></path>
      <path d="M12 8c1-1.5 1-2.5 0-4"></path>
      <path d="M18 8c1-1.5 1-2.5 0-4"></path>
    </svg>`,

  generic: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="link-icon-svg">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" x2="22" y1="12" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>`
};

export function parseLinkItem(item) {
  const rawUrl = typeof item === 'string' ? item : item.url;
  let url = (rawUrl || '').trim();

  const isDirectEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url);
  if (isDirectEmail && !url.startsWith('mailto:')) {
    url = `mailto:${url}`;
  }

  let platform = (typeof item === 'object' && item.platform) ? item.platform : 'generic';
  let defaultTitle = 'Visit Link';
  let defaultSubtitle = '';
  let iconName = platform;
  let isExternal = true;
  let isFeatured = !!(typeof item === 'object' && item.isFeatured);

  const lower = url.toLowerCase();

  if (lower.startsWith('mailto:')) {
    platform = 'email';
    iconName = 'email';
    isExternal = false;
    const emailAddress = url.replace(/^mailto:/i, '').split('?')[0];
    defaultTitle = 'Email Us Directly';
    defaultSubtitle = emailAddress;
  } else if (lower.startsWith('tel:')) {
    platform = 'phone';
    iconName = 'phone';
    isExternal = false;
    const phoneNumber = url.replace(/^tel:/i, '');
    defaultTitle = 'Call Our Kitchen';
    defaultSubtitle = phoneNumber;
  } else if (lower.includes('wa.me') || lower.includes('whatsapp.com')) {
    platform = 'whatsapp';
    iconName = 'whatsapp';
    defaultTitle = 'Order on WhatsApp';
    defaultSubtitle = 'Tap to order directly';
    isFeatured = true;
  } else if (lower.includes('instagram.com') || lower.includes('instagr.am')) {
    platform = 'instagram';
    iconName = 'instagram';
    defaultTitle = 'Follow Our Kitchen on Instagram';
    const match = url.match(/instagram\.com\/([a-zA-Z0-9._]+)/i);
    if (match && match[1] && !['p', 'reel', 'stories'].includes(match[1])) {
      defaultSubtitle = `@${match[1].replace(/\/$/, '')}`;
    } else {
      defaultSubtitle = '@riyakitchenenterprises';
    }
  } else if (lower.includes('facebook.com') || lower.includes('fb.com')) {
    platform = 'facebook';
    iconName = 'facebook';
    defaultTitle = 'Find Us on Facebook';
    const match = url.match(/facebook\.com\/([a-zA-Z0-9._-]+)/i);
    if (match && match[1]) {
      defaultSubtitle = match[1].replace(/\/$/, '');
    } else {
      defaultSubtitle = 'riyakitchenenterprises';
    }
  } else if (lower.includes('zomato.com')) {
    platform = 'zomato';
    iconName = 'zomato';
    defaultTitle = 'Order Food on Zomato';
    defaultSubtitle = 'Homestyle meals & daily specials • Kharadi';
    isExternal = true;
  } else if (lower.includes('social') || lower.includes('follow')) {
    platform = 'social';
    iconName = 'social';
    defaultTitle = 'Follow Us on Social Media';
    defaultSubtitle = 'Instagram & Facebook • @riyakitchenenterprises';
    isExternal = false;
  } else if (lower.startsWith('#') || lower.includes('menu')) {
    platform = 'menu';
    iconName = 'menu';
    defaultTitle = 'Explore Our Menu';
    defaultSubtitle = 'View daily varieties & specials';
    if (lower.startsWith('#')) isExternal = false;
  }

  const title = (typeof item === 'object' && item.title) ? item.title : defaultTitle;
  const subtitle = (typeof item === 'object' && item.subtitle) ? item.subtitle : defaultSubtitle;
  const icon = ICONS[iconName] || ICONS[platform] || ICONS.generic;

  return {
    url,
    title,
    subtitle,
    platform,
    icon,
    isExternal,
    isFeatured
  };
}
