/**
 * Instagram-specific DOM selectors and extraction patterns
 *
 * Instagram uses a React-based UI with minimal semantic HTML.
 * These selectors are based on actual DOM structure observed in 2025.
 *
 * Note: Instagram's DOM may change frequently. Update selectors as needed.
 */

export const INSTAGRAM_SELECTORS = {
  /**
   * Caption extraction selectors
   * Try in order until one returns meaningful content
   */
  caption: [
    // Method 1: Main heading (sometimes contains caption)
    {
      selector: 'article h1',
      extract: (el) => el?.innerText?.trim() || '',
      note: 'Post heading - may contain caption'
    },

    // Method 2: Caption after username in post structure
    {
      selector: 'article ul > div li:nth-child(1) span',
      extract: (el) => {
        // Skip if it looks like a username
        const text = el?.innerText?.trim() || '';
        if (text.length < 10 || text.match(/^@\w+$/)) return '';
        return text;
      },
      note: 'Caption in first list item'
    },

    // Method 3: Look for spans with line-height styling (captions often have this)
    {
      selector: 'article span[style*="line-height"]',
      extract: (el) => {
        const text = el?.innerText?.trim() || '';
        // Filter out short UI elements
        if (text.length < 20) return '';
        // Filter out language selector text
        if (text.includes('English\nAfrikaans\nالعربية')) return '';
        return text;
      },
      note: 'Span with line-height style'
    }
  ],

  /**
   * Date/time selectors
   */
  date: {
    selector: 'article time[datetime], article time',
    extract: (el) => {
      return el?.getAttribute('datetime') ||
             el?.getAttribute('title') ||
             '';
    },
    note: 'Time element with datetime attribute'
  },

  /**
   * Media selectors
   */
  media: {
    videos: {
      selector: 'article video',
      extractUrls: (elements) => {
        const urls = [];
        elements.forEach(video => {
          if (video.src) urls.push(video.src);
          video.querySelectorAll('source').forEach(source => {
            if (source.src) urls.push(source.src);
          });
        });
        return [...new Set(urls)];
      },
      note: 'Video elements and sources'
    },

    images: {
      selector: 'article img[srcset], article img[src]',
      extractUrls: (elements) => {
        const urls = [];
        elements.forEach(img => {
          // Skip profile/avatar images
          const alt = img.alt || '';
          if (alt.match(/profile|avatar/i)) return;

          // Prefer srcset for higher quality
          if (img.srcset) {
            const srcsetParts = img.srcset.split(',');
            const lastSrc = srcsetParts[srcsetParts.length - 1];
            const url = lastSrc.trim().split(' ')[0];
            if (url && !url.includes('/profile/')) {
              urls.push(url);
            }
          } else if (img.src && !img.src.includes('/profile/')) {
            urls.push(img.src);
          }
        });
        return [...new Set(urls)];
      },
      note: 'Image elements, preferring high-res srcset'
    }
  },

  /**
   * Format detection
   */
  format: {
    isReel: () => window.location.pathname.includes('/reel/'),
    hasVideo: () => !!document.querySelector('article video'),
    hasCarousel: () => {
      // Check for next/previous buttons
      const hasButton = !!document.querySelector('article button[aria-label*="Next"], article button[aria-label*="Próximo"]');
      if (hasButton) return true;

      // Check for multiple media items
      const mediaCount = document.querySelectorAll('article img[alt], article video').length;
      return mediaCount > 3; // More than just profile pics
    },
    note: 'Format detection based on URL and DOM elements'
  },

  /**
   * Post metadata
   */
  metadata: {
    creator: {
      // Extract from URL pathname
      extract: () => window.location.pathname.split('/')[1] || '',
      note: 'Username from URL'
    },

    postId: {
      // Extract from URL
      extract: () => {
        const match = window.location.pathname.match(/\/(p|reel)\/([^/?]+)/);
        return match ? match[2] : '';
      },
      note: 'Post shortcode from URL'
    }
  }
};

/**
 * UI text patterns to filter out (not real content)
 */
export const UI_NOISE_PATTERNS = [
  /^(Follow|Like|Comment|Share|Send|Save)$/i,
  /English\nAfrikaans\nالعربية/,
  /^@\w+$/, // Just a username
  /^[0-9,]+ (likes?|comments?|views?)$/i
];

/**
 * Check if text is likely UI noise vs real content
 */
export function isUIText(text) {
  if (!text || text.length < 5) return true;
  return UI_NOISE_PATTERNS.some(pattern => pattern.test(text));
}

/**
 * Helper function to try multiple selectors in order
 */
export function trySelectors(selectorConfigs, context = document) {
  for (const config of selectorConfigs) {
    const element = context.querySelector(config.selector);
    if (element) {
      const result = config.extract(element);
      if (result && result.length > 0 && !isUIText(result)) {
        return result;
      }
    }
  }
  return '';
}

export default INSTAGRAM_SELECTORS;
