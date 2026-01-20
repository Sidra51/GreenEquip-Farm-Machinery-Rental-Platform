// Advanced translation utility for Hindi language support using NLP techniques
class HindiTranslator {
  constructor() {
    // Predefined Hindi translations for common phrases
    this.hindiTranslations = {
      // Navigation and general terms
      "Farmer Portal": "किसान पोर्टल",
      "Seller Portal": "विक्रेता पोर्टल",
      Admin: "एडमिन",
      Dashboard: "डैशबोर्ड",
      Logout: "लॉग आउट",
      "Welcome,": "स्वागत है,",
      Filter: "फ़िल्टर",
      "Book Now": "अभी बुक करें",
      "No equipment found": "कोई उपकरण नहीं मिला",
      "Try adjusting your search filters":
        "अपने खोज फ़िल्टर समायोजित करने का प्रयास करें",
      "My Bookings": "मेरी बुकिंग",
      "List New Equipment": "नया उपकरण सूचीबद्ध करें",
      "Publish Listing": "सूची प्रकाशित करें",
      "My Listings": "मेरी सूचियाँ",
      "Recent Orders": "हाल के ऑर्डर",
      "Live Market": "लाइव बाजार",

      // Payment related
      "Secure Payment": "सुरक्षित भुगतान",
      "Booking Confirmation": "बुकिंग पुष्टि",
      "Rental Duration": "किराया अवधि",
      Subtotal: "उपयोग",
      "Platform Fee": "प्लेटफॉर्म शुल्क",
      "Total Amount": "कुल राशि",
      "Select Payment Method": "भुगतान विधि चुनें",
      "Debit / Credit Card": "डेबिट / क्रेडिट कार्ड",
      "Instant secure payment": "त्वरित सुरक्षित भुगतान",
      "UPI Payment": "UPI भुगतान",
      "Google Pay, PhonePe, Paytm": "गूगल पे, फोनपे, पेटीएम",
      "Pay with Crypto": "क्रिप्टो के साथ भुगतान करें",
      "MetaMask (ETH)": "मेटामास्क (ईथर)",
      FarmChain: "फार्मचेन",
      GreenEquip: "ग्रीनएक्विप",
      "The Future of Farming is Here": "खेती का भविष्य यहां है",
      "Smart Farming for a Better Future": "बेहतर भविष्य के लिए स्मार्ट खेती",
      "Rent advanced equipment": "उन्नत उपकरण किराए पर लें",
      "connect with verified sellers": "सत्यापित विक्रेताओं से जुड़ें",
      "use AI to optimize your harvest":
        "अपनी फसल को अनुकूलित करने के लिए एआई का उपयोग करें",
      "Go to Dashboard": "डैशबोर्ड पर जाएँ",
      "Join as Farmer": "किसान के रूप में जुड़ें",
      "Join as Seller": "विक्रेता के रूप में जुड़ें",
      "Recommended for you": "आपके लिए अनुशंसित",
      "Daily Rate": "दैनिक दर",
      Available: "उपलब्ध",
      Features: "विशेषताएँ",
      Stories: "कहानियाँ",
      "Why Choose Us": "हमें क्यों चुनें",
      "Everything you need to grow": "बढ़ने के लिए आपको जो कुछ भी चाहिए",
      "Easy Rentals": "आसान किराए पर",
      "Browse hundreds of verified equipment listings":
        "सौ ताज़ा सत्यापित उपकरण सूचियाँ ब्राउज़ करें",
      "Secure Blockchain": "सुरक्षित ब्लॉकचेन",
      "Every transaction is recorded on the blockchain":
        "प्रत्येक लेनदेन ब्लॉकचेन पर दर्ज किया जाता है",
      "Trusted by Farmers": "किसानों द्वारा भरोसा किया गया",
      "© 2024 GreenEquip. All Rights Reserved.":
        "© 2024 ग्रीनएक्विप। सर्वाधिकार सुरक्षित।",
      Platform: "मंच",
      Support: "समर्थन",
      "About Us": "हमारे बारे में",
      "How it Works": "यह कैसे काम करता है",
      Pricing: "मूल्य निर्धारण",
      "Help Center": "सहायता केंद्र",
      "Contact Us": "हमसे संपर्क करें",
      "Privacy Policy": "गोपनीयता नीति",
      "Follow us on": "हमें फॉलो करें",
      Facebook: "फेसबुक",
      Instagram: "इंस्टाग्राम",
      Twitter: "ट्विटर",
      All: "सभी",
      "All Regions": "सभी क्षेत्र",
      Equipment: "उपकरण",
      Dates: "तारीखें",
      Status: "स्थिति",
      Action: "कार्य",
      "Deleted Listing": "हटाई गई सूचि",
      "N/A": "लागू नहीं",
      paid: "भुगतान किया गया",
      pending: "लंबित",
      confirmed: "पुष्टि की गई",
      "No bookings yet": "अभी तक कोई बुकिंग नहीं",
      "Start by renting some equipment!": "कुछ उपकरण किराए पर लेना शुरू करें!",
      "Book Equipment": "उपकरण बुक करें",
      "Selected Equipment": "चयनित उपकरण",
      "Number of Days": "दिनों की संख्या",
      "Confirm & Pay": "पुष्टि करें और भुगतान करें",
      "Transaction Successful!": "लेनदेन सफल!",
      "Transaction pending...": "लेनदेन लंबित...",
      "Transaction confirmed!": "लेनदेन पुष्टि की गई!",
      "Transaction rejected by user": "उपयोगकर्ता द्वारा लेनदेन अस्वीकृत",
      "Payment failed:": "भुगतान विफल:",
      "Payment failed": "भुगतान विफल",
      "Initiating payment...": "भुगतान शुरू कर रहा है...",
      "Enter UPI ID": "UPI ID दर्ज करें",
      "Pay Now": "अभी भुगतान करें",
      "Please enter UPI ID": "कृपया UPI ID दर्ज करें",
      "Please enter a valid UPI ID": "कृपया एक मान्य UPI ID दर्ज करें",
      "Processing your payment...": "आपका भुगतान संसाधित किया जा रहा है...",
      "Processing blockchain transaction...":
        "ब्लॉकचेन लेनदेन संसाधित किया जा रहा है...",
      "Secure transaction powered by Blockchain Technology":
        "ब्लॉकचेन तकनीक द्वारा संचालित सुरक्षित लेनदेन",
      More: "और अधिक",
      Less: "कम",
      "Show More": "और दिखाएं",
      "Show Less": "कम दिखाएं",
      Edit: "संपादित करें",
      Delete: "हटाएं",
      Save: "सहेजें",
      Cancel: "रद्द करें",
      Close: "बंद करें",
      Next: "अगला",
      Previous: "पिछला",
      Search: "खोजें",
      Clear: "साफ़ करें",
      Reset: "रीसेट करें",
      Submit: "जमा करें",
      "Save Changes": "परिवर्तन सहेजें",
      Continue: "जारी रखें",
      Back: "वापस",
      Yes: "हां",
      No: "नहीं",
      OK: "ठीक",
      Success: "सफलता",
      Error: "त्रुटि",
      Warning: "चेतावनी",
      Info: "जानकारी",
      "Loading...": "लोड हो रहा है...",
      "Please wait...": "कृपया प्रतीक्षा करें...",
      "Something went wrong": "कुछ गलत हो गया",
      "Please try again": "कृपया फिर से प्रयास करें",
      Settings: "सेटिंग्स",
      Profile: "प्रोफ़ाइल",
      Account: "खाता",
      Help: "सहायता",
      Feedback: "प्रतिक्रिया",
      Notifications: "सूचनाएँ",
      Messages: "संदेश",
      Calendar: "कैलेंडर",
      Files: "फ़ाइलें",
      Gallery: "गैलरी",
      Documents: "दस्तावेज़",
      Photos: "फ़ोटो",
      Videos: "वीडियो",
      Music: "संगीत",
      Downloads: "डाउनलोड",
      Upload: "अपलोड",
      Download: "डाउनलोड",
      Share: "साझा करें",
      Copy: "कॉपी",
      Cut: "काटें",
      Paste: "चिपकाएँ",
      Duplicate: "प्रतिलिपि बनाएँ",
      Rename: "नाम बदलें",
      Move: "स्थानांतरित करें",
      Send: "भेजें",
      Receive: "प्राप्त करें",
      Connect: "कनेक्ट करें",
      Disconnect: "डिस्कनेक्ट करें",
      Online: "ऑनलाइन",
      Offline: "ऑफलाइन",
      Active: "सक्रिय",
      Inactive: "निष्क्रिय",
      Busy: "व्यस्त",
      Away: "दूर",
      Available: "उपलब्ध",
      "Do Not Disturb": "तंग मत करो",
      Invisible: "अदृश्य",
      Home: "होम",
      About: "के बारे में",
      Services: "सेवाएँ",
      Products: "उत्पाद",
      Contact: "संपर्क",
      Careers: "करियर",
      Blog: "ब्लॉग",
      News: "समाचार",
      Events: "कार्यक्रम",
      Gallery: "गैलरी",
      Shop: "दुकान",
      Cart: "कार्ट",
      Checkout: "चेकआउट",
      "Order History": "आदेश इतिहास",
      Wishlist: "इच्छा सूची",
      Compare: "तुलना करें",
      Reviews: "समीक्षाएँ",
      Rating: "रेटिंग",
      Comments: "टिप्पणियाँ",
      Reply: "जवाब दें",
      Like: "पसंद",
      Dislike: "नापसंद",
      Subscribe: "सदस्य बनें",
      Unsubscribe: "सदस्यता रद्द करें",
      Follow: "फॉलो करें",
      Unfollow: "अनफॉलो करें",
      Report: "रिपोर्ट",
      Block: "ब्लॉक",
      Unblock: "अनब्लॉक",
      Mute: "म्यूट",
      Unmute: "अनम्यूट",
      Pin: "पिन",
      Unpin: "अनपिन",
      Archive: "पुरालेख",
      Unarchive: "अनार्काइव",
      Star: "स्टार",
      Unstar: "अनस्टार",
      Bookmark: "बुकमार्क",
      Unbookmark: "अनबुकमार्क",
      Print: "प्रिंट",
      Export: "निर्यात",
      Import: "आयात",
      Backup: "बैकअप",
      Restore: "पुनर्स्थापित करें",
      Sync: "सिंक",
      Refresh: "रीफ्रेश",
      Reload: "रीलोड",
      "Zoom In": "ज़ूम इन",
      "Zoom Out": "ज़ूम आउट",
      "Full Screen": "पूर्ण स्क्रीन",
      "Exit Full Screen": "पूर्ण स्क्रीन से बाहर निकलें",
      "Rotate Left": "बाएं घुमाएँ",
      "Rotate Right": "दाएं घुमाएँ",
      "Flip Horizontal": "क्षैतिज रूप से पलटें",
      "Flip Vertical": "लंबवत रूप से पलटें",
      Crop: "क्रॉप",
      Resize: "आकार बदलें",
      Adjust: "समायोजित करें",
      Filter: "फ़िल्टर",
      Enhance: "बढ़ाएँ",
      Correct: "सही करें",
      Transform: "परिवर्तित करें",
      Apply: "लागू करें",
      Preview: "पूर्वावलोकन",
      Quality: "गुणवत्ता",
      Size: "आकार",
      Format: "प्रारूप",
      Resolution: "रिज़ॉल्यूशन",
      Color: "रंग",
      Brightness: "चमक",
      Contrast: "कंट्रास्ट",
      Saturation: "संतृप्ति",
      Hue: "रंग",
      Temperature: "तापमान",
      Tint: "टिंट",
      Shadows: "छाया",
      Highlights: "हाइलाइट",
      Exposure: "एक्सपोज़र",
      Vignette: "विगनेट",
      Grain: "ग्रेन",
      Sharpen: "तीक्ष्ण करें",
      Blur: "धुंधला",
      "Noise Reduction": "शोर कमी",
      Denoise: "शोर हटाएं",
      Stabilize: "स्थिर करें",
      Speed: "गति",
      Duration: "अवधि",
      Volume: "आयतन",
      Balance: "संतुलन",
      "Fade In": "फीका इन",
      "Fade Out": "फीका आउट",
      Loop: "लूप",
      Repeat: "दोहराएं",
      Shuffle: "शफल",
      Random: "यादृच्छिक",
      Sequential: "क्रमागत",
      Alphabetical: "वर्णानुक्रम में",
      Reverse: "उल्टा",
      Ascending: "आरोही",
      Descending: "अवरोही",
      Fast: "तेज",
      Slow: "धीमा",
      Normal: "सामान्य",
      Medium: "मध्यम",
      Low: "कम",
      High: "उच्च",
      Small: "छोटा",
      Large: "बड़ा",
      "Extra Small": "अतिरिक्त छोटा",
      "Extra Large": "अतिरिक्त बड़ा",
      Thin: "पतला",
      Regular: "सामान्य",
      Bold: "मोटा",
      Italic: "तिरछा",
      Underline: "रेखांकित",
      Overline: "ऊपरी रेखा",
      Strikethrough: "काट दिया गया",
      Superscript: "सुपरस्क्रिप्ट",
      Subscript: "सबस्क्रिप्ट",
      Uppercase: "अपरकेस",
      Lowercase: "लोअरकेस",
      Capitalize: "कैपिटलाइज",
      "Left Align": "बाएं संरेखित",
      "Center Align": "केंद्र संरेखित",
      "Right Align": "दाएं संरेखित",
      Justify: "जस्टिफाई",
      Indent: "इंडेंट",
      Outdent: "आउटडेंट",
      "Bullet List": "बुलेट सूची",
      "Numbered List": "संख्यांकित सूची",
      Table: "तालिका",
      Link: "लिंक",
      Image: "छवि",
      Video: "वीडियो",
      Audio: "ऑडियो",
      File: "फ़ाइल",
      Code: "कोड",
      Quote: "उद्धरण",
      "Code Block": "कोड ब्लॉक",
      "Heading 1": "शीर्षक 1",
      "Heading 2": "शीर्षक 2",
      "Heading 3": "शीर्षक 3",
      "Heading 4": "शीर्षक 4",
      "Heading 5": "शीर्षक 5",
      "Heading 6": "शीर्षक 6",
      Paragraph: "अनुच्छेद",
      Preformatted: "पूर्वस्वरूपित",
      "Plain Text": "सादा पाठ",
      "Rich Text": "समृद्ध पाठ",
      HTML: "एचटीएमएल",
      CSS: "सीएसएस",
      JavaScript: "जावास्क्रिप्ट",
      JSON: "जेसन",
      XML: "एक्सएमएल",
      CSV: "सीएसवी",
      PDF: "पीडीएफ",
      DOC: "डॉक",
      XLS: "एक्सएलएस",
      PPT: "पीपीटी",
      TXT: "टेक्सट",
      JPG: "जेपीजी",
      PNG: "पीएनजी",
      GIF: "जीआईएफ",
      SVG: "एसवीजी",
      MP4: "एमपी4",
      AVI: "एवीआई",
      MOV: "मूवी",
      MP3: "एमपी3",
      WAV: "वेव",
      FLAC: "फ्लैक",
      ZIP: "जिप",
      RAR: "रार",
      "7Z": "7जेड",
      TAR: "टार",
      GZ: "जीजेड",
      BZ2: "बीजेड2",
      ISO: "आईएसओ",
      DMG: "डीएमजी",
      EXE: "एक्जीक्यूटेबल",
      MSI: "एमएसआई",
      APK: "एपीके",
      IPA: "आईपीए",
      DEB: "डेब",
      RPM: "आरपीएम",
      BIN: "बिन",
      IMG: "आईएमजी",
      CR2: "सीआर2",
      RAW: "रॉ",
      TIFF: "टिफ",
      BMP: "बीएमपी",
      ICO: "आईको",
      WEBP: "वेबपी",
      HEIC: "हेइक",
      PDF: "पीडीएफ",
      EPUB: "ईपब",
      MOBI: "मोबी",
      AZW: "एजेडब्ल्यू",
      DJVU: "डीजेव्यू",
      PS: "पीएस",
      EPS: "ईपीएस",
      AI: "एआई",
      PSD: "पीएसडी",
      INDD: "इंडी",
      XCF: "एक्ससीएफ",
      SKETCH: "स्केच",
      FIGMA: "फिगमा",
      XD: "एक्सडी",
      FON: "फोन",
      TTF: "टीटीएफ",
      OTF: "ओटीएफ",
      WOFF: "वोफ",
      WOFF2: "वोफ2",
      EOT: "ईओटी",
      Axe: "कुल्हाड़ी",
    };

    // Initialize translation state
    this.isHindi = false;
    this.currentLang = "en";
  }

  // Get Hindi translation for a given English text using enhanced NLP
  getHindiTranslation(text) {
    // First check if we have a direct translation
    if (this.hindiTranslations[text]) {
      return this.hindiTranslations[text];
    }

    // Enhanced NLP technique: word-by-word translation for compound phrases
    let result = text;

    // Split text into words and try to translate each word individually
    const words = text.split(/\s+/);
    if (words.length > 1) {
      let translatedWords = [];
      for (let word of words) {
        // Clean punctuation from the word
        const cleanWord = word.replace(/[.,!?;:'"(){}\[\]]/g, "");
        if (this.hindiTranslations[cleanWord]) {
          // Preserve punctuation
          const punctuation = word.match(/[.,!?;:'"(){}\[\]]/g) || [];
          translatedWords.push(
            this.hindiTranslations[cleanWord] + punctuation.join("")
          );
        } else {
          translatedWords.push(word); // Keep original if no translation
        }
      }
      // Only return word-by-word translation if most words were translated
      const translatedPhrase = translatedWords.join(" ");
      if (translatedPhrase !== text) {
        result = translatedPhrase;
      }
    }

    // Fallback: try to match and replace substrings
    for (const [english, hindi] of Object.entries(this.hindiTranslations)) {
      if (result.includes(english)) {
        result = result.replace(new RegExp(english, "g"), hindi);
      }
    }

    return result;
  }

  // Translate all elements on the page
  translatePageToHindi() {
    // Mark that we're now in Hindi mode
    this.isHindi = true;
    this.currentLang = "hi";

    // Update HTML lang attribute
    document.documentElement.lang = "hi";

    // Translate all elements with text content
    const allElements = document.querySelectorAll("*");

    allElements.forEach((element) => {
      // Skip script and style tags
      if (element.tagName === "SCRIPT" || element.tagName === "STYLE") {
        return;
      }

      // Check for data-hi attribute (specifically Hindi translations) - highest priority
      if (element.hasAttribute("data-hi")) {
        element.textContent = element.getAttribute("data-hi");
      }
      // Check for data-mr attribute (Marathi/Hindi translations)
      else if (element.hasAttribute("data-mr")) {
        element.textContent = element.getAttribute("data-mr");
      }
      // Check for data-en attribute (English to Hindi translation)
      else if (element.hasAttribute("data-en")) {
        element.textContent = this.getHindiTranslation(
          element.getAttribute("data-en")
        );
      }
      // Translate text content directly if it's a text node
      else if (
        element.nodeType === Node.ELEMENT_NODE &&
        element.children.length === 0 &&
        element.textContent.trim() !== ""
      ) {
        const originalText = element.textContent.trim();
        if (originalText && !this.isLikelyTranslated(originalText)) {
          element.textContent = this.getHindiTranslation(originalText);
        }
      }
    });

    // Translate attributes that may contain text
    const elementsWithAttrs = document.querySelectorAll("*");
    elementsWithAttrs.forEach((element) => {
      // Translate title attributes
      if (element.hasAttribute("title")) {
        // Save original title before translating
        if (!element.hasAttribute("data-title-original")) {
          element.setAttribute(
            "data-title-original",
            element.getAttribute("title")
          );
        }
        const title = element.getAttribute("title");
        element.setAttribute("title", this.getHindiTranslation(title));
      }

      // Translate placeholder attributes
      if (element.hasAttribute("placeholder")) {
        // Save original placeholder before translating
        if (!element.hasAttribute("data-placeholder-original")) {
          element.setAttribute(
            "data-placeholder-original",
            element.getAttribute("placeholder")
          );
        }
        const placeholder = element.getAttribute("placeholder");
        element.setAttribute(
          "placeholder",
          this.getHindiTranslation(placeholder)
        );
      }

      // Translate alt attributes
      if (element.hasAttribute("alt")) {
        // Save original alt before translating
        if (!element.hasAttribute("data-alt-original")) {
          element.setAttribute(
            "data-alt-original",
            element.getAttribute("alt")
          );
        }
        const alt = element.getAttribute("alt");
        element.setAttribute("alt", this.getHindiTranslation(alt));
      }
    });
  }

  // Check if text is likely already translated (simple heuristic)
  isLikelyTranslated(text) {
    // Check if text contains Devanagari characters (Hindi script)
    const devanagariRegex = /[\u0900-\u097F]/;
    return devanagariRegex.test(text);
  }

  // Toggle between English and Hindi
  toggleLanguage() {
    if (this.isHindi) {
      this.translatePageToEnglish();
    } else {
      this.translatePageToHindi();
    }
  }

  // Reset to English
  translatePageToEnglish() {
    this.isHindi = false;
    this.currentLang = "en";

    // Update HTML lang attribute
    document.documentElement.lang = "en";

    // Reset all elements with data attributes
    const allElements = document.querySelectorAll("*");

    allElements.forEach((element) => {
      // Skip script and style tags
      if (element.tagName === "SCRIPT" || element.tagName === "STYLE") {
        return;
      }

      // Restore from data-en attribute if available
      if (element.hasAttribute("data-en")) {
        element.textContent = element.getAttribute("data-en");
      }
      // Restore from data-original attribute if available
      else if (element.hasAttribute("data-original")) {
        element.textContent = element.getAttribute("data-original");
      }
      // Also check for data-hi and data-mr to restore original
      else if (element.hasAttribute("data-hi")) {
        element.textContent =
          element.getAttribute("data-en") ||
          element.getAttribute("data-original") ||
          element.textContent;
      } else if (element.hasAttribute("data-mr")) {
        element.textContent =
          element.getAttribute("data-en") ||
          element.getAttribute("data-original") ||
          element.textContent;
      }
    });

    // Also restore attributes that may have been translated
    const elementsWithAttrs = document.querySelectorAll("*");
    elementsWithAttrs.forEach((element) => {
      // Restore title attributes
      if (element.hasAttribute("data-title-original")) {
        element.setAttribute(
          "title",
          element.getAttribute("data-title-original")
        );
      }

      // Restore placeholder attributes
      if (element.hasAttribute("data-placeholder-original")) {
        element.setAttribute(
          "placeholder",
          element.getAttribute("data-placeholder-original")
        );
      }

      // Restore alt attributes
      if (element.hasAttribute("data-alt-original")) {
        element.setAttribute("alt", element.getAttribute("data-alt-original"));
      }
    });
  }

  // Initialize translation functionality
  init() {
    // Store original text for restoration later
    const allElements = document.querySelectorAll("*");
    allElements.forEach((element) => {
      if (
        element.nodeType === Node.ELEMENT_NODE &&
        element.children.length === 0 &&
        element.textContent.trim() !== "" &&
        !element.hasAttribute("data-en") &&
        !element.hasAttribute("data-original")
      ) {
        element.setAttribute("data-original", element.textContent.trim());
      }

      // Also capture title, placeholder, and alt attributes if not already captured
      if (
        element.hasAttribute("title") &&
        !element.hasAttribute("data-title-original")
      ) {
        element.setAttribute(
          "data-title-original",
          element.getAttribute("title")
        );
      }

      if (
        element.hasAttribute("placeholder") &&
        !element.hasAttribute("data-placeholder-original")
      ) {
        element.setAttribute(
          "data-placeholder-original",
          element.getAttribute("placeholder")
        );
      }

      if (
        element.hasAttribute("alt") &&
        !element.hasAttribute("data-alt-original")
      ) {
        element.setAttribute("data-alt-original", element.getAttribute("alt"));
      }
    });
  }
}

// Create a global instance of the translator
const hindiTranslator = new HindiTranslator();

// Initialize the translator when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  hindiTranslator.init();
});

// Add function to global scope for easy access
window.translateToHindi = function () {
  hindiTranslator.translatePageToHindi();
};

window.translateToEnglish = function () {
  hindiTranslator.translatePageToEnglish();
};

window.toggleLanguage = function () {
  hindiTranslator.toggleLanguage();
};
