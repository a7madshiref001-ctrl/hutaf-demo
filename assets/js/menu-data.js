/* منيو هُتاف — من المنيو المطبوع (هايلايت «المنيو») وبوستات إنستجرام @h__utaf.
   price: null = صنف موجود بس سعره مش منشور → بيظهر من غير زرار إضافة.
   ⚠️ الأسعار والسعرات لازم تتأكد مع المحل قبل أي نشر. */
window.HUTAF_MENU = {
  categories: [
    { id: 'coffee', ar: 'قهوة مختصة', en: 'Specialty Coffee' },
    { id: 'drinks', ar: 'مشروبات', en: 'Drinks' },
    { id: 'sweets', ar: 'الحلويات', en: 'Sweets' }
  ],
  items: [
    // قهوة مختصة
    { id: 'daily-s', cat: 'coffee', ar: 'قهوة اليوم — صغير', en: 'Coffee of the day · S', price: 5.5, cal: 2, img: 'daily' },
    { id: 'daily-l', cat: 'coffee', ar: 'قهوة اليوم — كبير', en: 'Coffee of the day · L', price: 7.5, cal: 4, img: 'daily' },
    { id: 'daily-s-esp', cat: 'coffee', ar: 'قهوة اليوم صغير + اسبريسو', en: 'Daily S + espresso shot', price: 12, cal: 2 },
    { id: 'daily-l-esp', cat: 'coffee', ar: 'قهوة اليوم كبير + اسبريسو', en: 'Daily L + espresso shot', price: 14, cal: 4 },
    { id: 'espresso', cat: 'coffee', ar: 'اسبريسو', en: 'Espresso', price: 8, cal: 2 },
    { id: 'v60', cat: 'coffee', ar: 'V60 بطريقتنا', en: 'V60 pour-over', price: null, cal: null, img: 'v60', note: 'اسأل عن محصول اليوم' },
    { id: 'box', cat: 'coffee', ar: 'بوكس قهوة اليوم', en: 'Coffee box', price: 29, cal: 2, img: 'majlis' },

    // مشروبات
    { id: 'spanish', cat: 'drinks', ar: 'سبانش لاتيه', en: 'Spanish latte', price: 13, cal: 160, img: 'spanish' },
    { id: 'latte', cat: 'drinks', ar: 'لاتيه', en: 'Latte', price: 11, cal: 150 },
    { id: 'americano', cat: 'drinks', ar: 'أمريكانو', en: 'Americano', price: 10, cal: 2 },
    { id: 'matcha', cat: 'drinks', ar: 'ماتشا', en: 'Matcha', price: 11, cal: 160, img: 'matcha' },
    { id: 'matcha-frap', cat: 'drinks', ar: 'ماتشا فرابتشينو', en: 'Matcha frappuccino', price: 11, cal: 170 },
    { id: 'hibiscus', cat: 'drinks', ar: 'كركديه', en: 'Hibiscus', price: 6.5, cal: 150 },
    { id: 'icetea', cat: 'drinks', ar: 'آيس تي باشن فروت وخوخ', en: 'Passion fruit & peach iced tea', price: null, cal: null, img: 'icetea', note: 'مشروب الصيف' },
    { id: 'water', cat: 'drinks', ar: 'مياه', en: 'Water', price: 1, cal: 0 },

    // الحلويات
    { id: 'pudding', cat: 'sweets', ar: 'بودينغ هُتاف', en: 'Chocolate pudding', price: 11, cal: 260, img: 'pudding' },
    { id: 'dolce', cat: 'sweets', ar: 'دولتشي شوكلت', en: 'Dolce chocolate', price: 14.95, cal: null, img: 'dolce' },
    { id: 'dubai', cat: 'sweets', ar: 'شوكلت دبي', en: 'Dubai chocolate', price: 7.5, cal: 270 },
    { id: 'cookies', cat: 'sweets', ar: 'كوكيز', en: 'Cookies', price: 5.5, cal: 200, img: 'cookies' },
    { id: 'brownies', cat: 'sweets', ar: 'براونيز', en: 'Brownies', price: 5.5, cal: 220 },
    { id: 'crunchy', cat: 'sweets', ar: 'كرانشي', en: 'Crunchy', price: 5.5, cal: 200 },
    { id: 'marble', cat: 'sweets', ar: 'ماربل كيك', en: 'Marble cake', price: 5.5, cal: 170 },

    // خارج الأقسام
    { id: 'mug', cat: null, ar: 'مق هُتاف + مشروب', en: 'Hutaf mug + drink', price: 30, cal: null, img: 'mug' }
  ],

  // كروت الـSignatures — الكلام من كابشنات هُتاف نفسها
  signatures: [
    { id: 'pudding', line: 'بودينغ ملغّم شوكولاتة يصنع يومك', tag: 'المفضّل عند الكُل' },
    { id: 'dolce', line: 'لذة لا تُقاوَم: شوكولاتة غنية ولمسة كراميل في كل لقمة', tag: 'كُل طبقة تحكي' },
    { id: 'spanish', line: 'أيس سبانش لاتيه له مزاج مختلف', tag: 'صباح بطعمين' },
    { id: 'matcha', line: 'ماتشا هُتاف، من أجود أنواع الماتشا', tag: 'الأفضل دائمًا' },
    { id: 'v60', line: 'قهوة الـV60 بطريقتنا المميزة', tag: 'قهوة مختصة' },
    { id: 'cookies', line: 'كوكيز تُحضَّر بحب وشغف، طازجة كل يوم', tag: 'طعم مختلف' },
    { id: 'icetea', line: 'باشن فروت وخوخ ينعش يومك', tag: 'مشروب الصيف' }
  ],

  // الكومبو: مشروب + حلا
  comboDrinks: ['daily-s', 'daily-l', 'spanish', 'latte', 'matcha', 'americano', 'hibiscus'],
  comboSweets: ['pudding', 'dolce', 'cookies', 'brownies', 'dubai', 'crunchy', 'marble'],
  comboNames: {
    'daily-l+pudding': 'الكلاسيكي — ثنائي الكُل',
    'daily-s+pudding': 'الكلاسيكي الصغير',
    'spanish+dolce': 'ثنائي الدلع',
    'matcha+cookies': 'الأخضر والذهبي',
    'daily-l+cookies': 'ونيس المذاكرة',
    'americano+brownies': 'الصاحي',
    'hibiscus+marble': 'العصرية'
  }
};
