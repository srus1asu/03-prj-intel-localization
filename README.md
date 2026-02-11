Project 3: Intel Site Localization - Adapting Your Website for RTL Languages
You'll adapt your Intel Journey webpage to support right-to-left (RTL) languages and improve its accessibility and interactivity.

You'll modify the layout, integrate Bootstrap, and add a subscription form to enhance user engagement.

---

## ✅ RTL Layout & Accessibility Validation

This project includes comprehensive RTL (Right-to-Left) language support and accessibility features.

### 🧪 Testing Tools Included

1. **[RTL Comparison Tool](http://localhost:8000/rtl-comparison.html)**
   - Side-by-side comparison of LTR and RTL layouts
   - Visual demonstration of layout changes
   - Interactive controls for testing

2. **[Accessibility Checker](http://localhost:8000/accessibility-checker.html)**
   - Automated accessibility testing tool
   - Checks for WCAG 2.1 compliance
   - Provides detailed test results and scores

3. **[Accessibility Report](accessibility-report.md)**
   - Comprehensive accessibility analysis
   - Estimated Lighthouse scores
   - Detailed feature checklist

4. **[RTL Testing Guide](RTL-TESTING-GUIDE.md)**
   - Step-by-step testing instructions
   - Visual checklist for verification
   - Browser compatibility testing guide

### 🌍 Supported Languages

**RTL (Right-to-Left):**
- Arabic (ar) - العربية
- Hebrew (he) - עברית
- Persian (fa) - فارسی
- Urdu (ur) - اردو

**LTR (Left-to-Right):**
- English (en)
- Spanish (es) - Español
- French (fr) - Français
- German (de) - Deutsch

### 🎯 How to Test RTL Layout

1. **Start the local server** (if not already running):
   ```bash
   python3 -m http.server 8000
   ```

2. **Open the main page**:
   - Navigate to: http://localhost:8000

3. **Test RTL switching**:
   - Use the language dropdown in the top-right corner
   - Select any RTL language (Arabic, Hebrew, Persian, Urdu)
   - Observe the layout mirror and text alignment change
   - Switch back to English to return to LTR layout

4. **View comparison**:
   - Open: http://localhost:8000/rtl-comparison.html
   - See LTR and RTL layouts side-by-side

5. **Run accessibility check**:
   - Open: http://localhost:8000/accessibility-checker.html
   - Click "Run Accessibility Check"
   - Review the results and score

### ✨ Key Features

- ✅ Automatic RTL/LTR direction switching
- ✅ Language-aware text alignment
- ✅ Semantic HTML5 structure
- ✅ WCAG 2.1 Level AA compliance
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Skip navigation links
- ✅ Proper ARIA labels
- ✅ Focus indicators
- ✅ Responsive design
- ✅ Bootstrap 5 RTL support

### 📊 Expected Accessibility Score

Based on implemented features:
- **Accessibility:** 95-100%
- **Best Practices:** 90-95%
- **SEO:** 90-95%

### 📚 Documentation Files

- `accessibility-report.md` - Full accessibility analysis
- `RTL-TESTING-GUIDE.md` - Comprehensive testing guide
- `accessibility-checker.html` - Automated testing tool
- `rtl-comparison.html` - Visual comparison tool
- `language-detector.js` - RTL detection script

---
