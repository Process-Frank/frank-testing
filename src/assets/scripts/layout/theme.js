// Import our stylesheets
import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

// Import Shopify tools
import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';
import { cookiesEnabled } from '@shopify/theme-cart';

// Common a11y fixes
focusHash();
bindInPageLinks();

// Mark in CSS whether cookies are available / not available.
if (cookiesEnabled()) {
  document.documentElement.className = document.documentElement.className.replace(
    'cookies-unavailable',
    'cookies-available',
  );
}
