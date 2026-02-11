/**
 * Language Detection and RTL Auto-Adjustment Script
 * Automatically detects language changes (e.g., Google Translate) 
 * and applies RTL layout for right-to-left languages
 */

// List of RTL (Right-to-Left) language codes
const RTL_LANGUAGES = [
  'ar',    // Arabic
  'arc',   // Aramaic
  'he',    // Hebrew
  'iw',    // Hebrew (old code)
  'fa',    // Persian/Farsi
  'ur',    // Urdu
  'yi',    // Yiddish
  'ji',    // Yiddish (old code)
  'ug',    // Uyghur
  'ps',    // Pashto
  'sd',    // Sindhi
  'ku',    // Kurdish (Sorani)
  'ckb'    // Central Kurdish
];

/**
 * Check if a language code represents an RTL language
 * @param {string} lang - Language code (e.g., 'ar', 'en', 'he')
 * @returns {boolean} - True if language is RTL
 */
function isRTLLanguage(lang) {
  if (!lang) return false;
  
  // Normalize language code (take first part before hyphen, convert to lowercase)
  const normalizedLang = lang.toLowerCase().split('-')[0];
  
  return RTL_LANGUAGES.includes(normalizedLang);
}

/**
 * Apply the appropriate text direction (RTL or LTR) to the page
 * @param {string} lang - Language code
 */
function applyTextDirection(lang) {
  const htmlElement = document.documentElement;
  const isRTL = isRTLLanguage(lang);
  
  // Set the dir attribute
  const newDir = isRTL ? 'rtl' : 'ltr';
  
  // Always update to ensure it's set correctly
  const currentDir = htmlElement.getAttribute('dir');
  htmlElement.setAttribute('dir', newDir);
  htmlElement.setAttribute('lang', lang);
  
  // Log the change for debugging
  console.log(`Language: ${lang} | Direction: ${newDir} | RTL: ${isRTL}`);
  
  // Visual feedback for testing
  if (currentDir !== newDir) {
    console.log(`✓ Direction changed from ${currentDir} to ${newDir}`);
    
    // Dispatch custom event for other scripts to react if needed
    const event = new CustomEvent('languageChanged', {
      detail: { language: lang, direction: newDir }
    });
    document.dispatchEvent(event);
  }
}

/**
 * Detect the current language from various sources
 * @returns {string} - Detected language code
 */
function detectLanguage() {
  // Priority 1: Check if Google Translate is active
  const googleTranslateElement = document.querySelector('.goog-te-banner-frame');
  if (googleTranslateElement) {
    // Try to get language from Google Translate
    const translateSelect = document.querySelector('select.goog-te-combo');
    if (translateSelect && translateSelect.value) {
      return translateSelect.value;
    }
  }
  
  // Priority 2: Check the html lang attribute
  const htmlLang = document.documentElement.getAttribute('lang');
  if (htmlLang && htmlLang !== 'en') {
    return htmlLang;
  }
  
  // Priority 3: Check meta tags
  const metaLang = document.querySelector('meta[http-equiv="content-language"]');
  if (metaLang) {
    return metaLang.getAttribute('content');
  }
  
  // Priority 4: Check browser language
  const browserLang = navigator.language || navigator.userLanguage;
  
  return htmlLang || browserLang || 'en';
}

/**
 * Initialize the language detector
 */
function initLanguageDetector() {
  console.log('Initializing language detector...');
  
  // Initial detection and application
  const initialLang = detectLanguage();
  console.log('Initial language detected:', initialLang);
  applyTextDirection(initialLang);
  
  // Set up manual language switcher if it exists
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    console.log('Language switcher found');
    // Set initial value
    languageSelect.value = initialLang;
    
    // Add change event listener
    languageSelect.addEventListener('change', (e) => {
      const selectedLang = e.target.value;
      console.log('Language changed to:', selectedLang);
      switchLanguage(selectedLang);
    });
  } else {
    console.warn('Language switcher not found in DOM');
  }
  
  // Watch for changes in the html lang attribute
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
        const newLang = document.documentElement.getAttribute('lang');
        applyTextDirection(newLang);
      }
    });
  });
  
  // Start observing the html element for lang attribute changes
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });
  
  // Watch for Google Translate changes
  const bodyObserver = new MutationObserver((mutations) => {
    // Check if Google Translate elements appeared or changed
    const hasGoogleTranslate = document.querySelector('.goog-te-banner-frame');
    if (hasGoogleTranslate) {
      const translateSelect = document.querySelector('select.goog-te-combo');
      if (translateSelect) {
        // Monitor select changes
        translateSelect.addEventListener('change', (e) => {
          const selectedLang = e.target.value;
          if (selectedLang) {
            setTimeout(() => {
              applyTextDirection(selectedLang);
            }, 500); // Small delay to let Google Translate apply changes
          }
        });
      }
    }
  });
  
  // Observe body for Google Translate injection
  bodyObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  console.log('Language detector initialized successfully!');
  console.log('Current direction:', document.documentElement.getAttribute('dir'));
}

/**
 * Manual language switcher (optional UI control)
 * Call this function to manually switch languages
 * @param {string} langCode - Language code to switch to
 */
function switchLanguage(langCode) {
  console.log('switchLanguage called with:', langCode);
  applyTextDirection(langCode);
  document.documentElement.setAttribute('lang', langCode);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageDetector);
} else {
  // DOM is already ready
  initLanguageDetector();
}

// Export functions for external use (if module system is used)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isRTLLanguage,
    applyTextDirection,
    detectLanguage,
    switchLanguage,
    RTL_LANGUAGES
  };
}
