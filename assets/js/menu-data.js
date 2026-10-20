/* منيو هُتاف — من المنيو المطبوع (هايلايت «المنيو») وبوستات إنستجرام @h__utaf.
   price: null = صنف موجود بس سعره مش منشور → بيظهر من غير زرار إضافة.
   ⚠️ الأسعار والسعرات لازم تتأكد مع المحل قبل أي نشر رسمي. */
window.HUTAF_MENU = {
  categories: [
    { id: 'coffee', ar: 'قهوة مختصة', en: 'Coffee' },
    { id: 'drinks', ar: 'مشروبات', en: 'Drinks' },
    { id: 'sweets', ar: 'حلويات', en: 'Sweets' }
  ],
  items: [
    // قهوة مختصة
    { id: 'daily-s', cat: 'coffee', ar: 'قهوة اليوم — صغير', price: 5.5, cal: 2, img: 'daily' },
    { id: 'daily-l', cat: 'coffee', ar: 'قهوة اليوم — كبير', price: 7.5, cal: 4, img: 'daily' },
    { id: 'daily-s-esp', cat: 'coffee', ar: 'قهوة اليوم صغير + اسبريسو', price: 12, cal: 2 },
    { id: 'daily-l-esp', cat: 'coffee', ar: 'قهوة اليوم كبير + اسبريسو', price: 14, cal: 4 },
    { id: 'espresso', cat: 'coffee', ar: 'اسبريسو', price: 8, cal: 2 },
    { id: 'v60', cat: 'coffee', ar: 'V60', price: null, cal: null, img: 'v60', note: 'اسأل بالشبّاك' },
    { id: 'box', cat: 'coffee', ar: 'بوكس قهوة اليوم', price: 29, cal: 2, img: 'majlis' },

    // مشروبات
    { id: 'spanish', cat: 'drinks', ar: 'سبانش لاتيه', price: 13, cal: 160, img: 'spanish' },
    { id: 'latte', cat: 'drinks', ar: 'لاتيه', price: 11, cal: 150 },
    { id: 'americano', cat: 'drinks', ar: 'أمريكانو', price: 10, cal: 2 },
    { id: 'matcha', cat: 'drinks', ar: 'ماتشا', price: 11, cal: 160, img: 'matcha' },
    { id: 'matcha-frap', cat: 'drinks', ar: 'ماتشا فرابتشينو', price: 11, cal: 170 },
    { id: 'hibiscus', cat: 'drinks', ar: 'كركديه', price: 6.5, cal: 150 },
    { id: 'icetea', cat: 'drinks', ar: 'آيس تي باشن فروت وخوخ', price: null, cal: null, img: 'icetea', note: 'اسأل بالشبّاك' },
    { id: 'water', cat: 'drinks', ar: 'مياه', price: 1, cal: 0 },

    // حلويات
    { id: 'pudding', cat: 'sweets', ar: 'بودينغ هُتاف', price: 11, cal: 260, img: 'pudding' },
    { id: 'dolce', cat: 'sweets', ar: 'دولتشي شوكلت', price: 14.95, cal: null, img: 'dolce' },
    { id: 'dubai', cat: 'sweets', ar: 'شوكلت دبي', price: 7.5, cal: 270 },
    { id: 'cookies', cat: 'sweets', ar: 'كوكيز', price: 5.5, cal: 200, img: 'cookies' },
    { id: 'brownies', cat: 'sweets', ar: 'براونيز', price: 5.5, cal: 220 },
    { id: 'crunchy', cat: 'sweets', ar: 'كرانشي', price: 5.5, cal: 200 },
    { id: 'marble', cat: 'sweets', ar: 'ماربل كيك', price: 5.5, cal: 170 },

    // عروض (برّه الأقسام)
    { id: 'mug', cat: null, ar: 'مق هُتاف + مشروب', price: 30, cal: null, img: 'mug' }
  ],

  // Favorites — الكلام من كابشنات هُتاف نفسها
  favorites: [
    { id: 'pudding', en: 'Chocolate Pudding', line: 'المفضّل عند الكُل' },
    { id: 'dolce', en: 'Dolce Chocolate', line: 'كُل طبقة تحكي' },
    { id: 'spanish', en: 'Iced Spanish Latte', line: 'له مزاج مختلف' },
    { id: 'matcha', en: 'Iced Matcha', line: 'من أجود أنواع الماتشا' },
    { id: 'cookies', en: 'Cookies', line: 'طازجة كل يوم' },
    { id: 'v60', en: 'V60 Pour-over', line: 'بطريقتنا المميزة' }
  ]
};
