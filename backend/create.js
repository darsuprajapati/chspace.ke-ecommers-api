// Replace with your actual API endpoint
const API_URL = 'http://localhost:5000/api/product/create-product';

const products = [
    {
        "name": "iPhone 15 Pro",
        "brand": "Apple",
        "model": "iPhone 15 Pro",
        "price": 999,
        "mrp": 1099,
        "discount": 100,
        "colorOptions": [
            { "name": "Natural Titanium", "hexCode": "#8B7355" },
            { "name": "Blue Titanium", "hexCode": "#4A5D7C" }
        ],
        "selectedColor": "Natural Titanium",
        "images": ["https://res.cloudinary.com/dmfbshtrx/image/upload/v1752657655/iphone-15-pro-max-256gb_kfuvja.jpg", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752657713/apple-iphone-15promax_q90rmm.webp"],
        "rating": 4.5,
        "reviewsCount": 1250,
        "exchangeOffer": {
            "maxDiscount": 500,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 41,
            "duration": "24 months"
        },
        "inStock": true
    },
    {
        "name": "Samsung Galaxy S24 Ultra",
        "brand": "Samsung",
        "model": "S24 Ultra",
        "price": 1199,
        "mrp": 1299,
        "discount": 100,
        "colorOptions": [
            { "name": "Phantom Black", "hexCode": "#000000" },
            { "name": "Cream", "hexCode": "#F5F5DC" }
        ],
        "selectedColor": "Phantom Black",
        "images": ["https://res.cloudinary.com/dmfbshtrx/image/upload/v1752657793/71CXhVhpM0L_jamwka.jpg", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752657828/-original-imah2yyfxkbhrgbz_htmq2o.webp"],
        "rating": 4.6,
        "reviewsCount": 1023,
        "exchangeOffer": {
            "maxDiscount": 450,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 50,
            "duration": "24 months"
        },
        "inStock": true
    },
    {
        "name": "Google Pixel 8 Pro",
        "brand": "Google",
        "model": "Pixel 8 Pro",
        "price": 999,
        "mrp": 1099,
        "discount": 100,
        "colorOptions": [
            { "name": "Obsidian", "hexCode": "#353839" },
            { "name": "Porcelain", "hexCode": "#F7F0EB" }
        ],
        "selectedColor": "Obsidian",
        "images": ["https://res.cloudinary.com/dmfbshtrx/image/upload/v1752657927/images_1_g3uzsc.jpg", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752657889/images_lodmlj.jpg"],
        "rating": 4.4,
        "reviewsCount": 870,
        "exchangeOffer": {
            "maxDiscount": 400,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 42,
            "duration": "24 months"
        },
        "inStock": true
    },
    {
        "name": "OnePlus 12",
        "brand": "OnePlus",
        "model": "12",
        "price": 749,
        "mrp": 899,
        "discount": 150,
        "colorOptions": [
            { "name": "Emerald Green", "hexCode": "#50C878" },
            { "name": "Volcanic Black", "hexCode": "#1C1C1C" }
        ],
        "selectedColor": "Emerald Green",
        "images": ["https://res.cloudinary.com/dmfbshtrx/image/upload/v1752657978/61BAuSC0UnL._UF1000_1000_QL80__jer7r6.jpg", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658027/12-cph2573-oneplus-original-imahyzy8wvsewgxx_btna3h.webp"],
        "rating": 4.3,
        "reviewsCount": 910,
        "exchangeOffer": {
            "maxDiscount": 350,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 33,
            "duration": "24 months"
        },
        "inStock": true
    },
    {
        "name": "Nothing Phone (2)",
        "brand": "Nothing",
        "model": "Phone (2)",
        "price": 599,
        "mrp": 699,
        "discount": 100,
        "colorOptions": [
            { "name": "White", "hexCode": "#FFFFFF" },
            { "name": "Dark Grey", "hexCode": "#444444" }
        ],
        "selectedColor": "Dark Grey",
        "images": ["https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658097/NOthing-Phone-2-white_snfkx2.avif", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658160/1000128626_afy0at.webp"],
        "rating": 4.2,
        "reviewsCount": 720,
        "exchangeOffer": {
            "maxDiscount": 300,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 25,
            "duration": "24 months"
        },
        "inStock": true
    },
    {
        "name": "Motorola Edge 50 Pro",
        "brand": "Motorola",
        "model": "Edge 50 Pro",
        "price": 499,
        "mrp": 599,
        "discount": 100,
        "colorOptions": [
            { "name": "Lavender", "hexCode": "#E6E6FA" },
            { "name": "Black Beauty", "hexCode": "#000000" }
        ],
        "selectedColor": "Lavender",
        "images": ["https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658219/715aoVxQNTL_twejjv.jpg", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658255/71Y6p0MJYlL_pjzu0j.jpg"],
        "rating": 4.1,
        "reviewsCount": 530,
        "exchangeOffer": {
            "maxDiscount": 250,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 21,
            "duration": "24 months"
        },
        "inStock": true
    },
    {
        "name": "Realme GT Neo 6",
        "brand": "Realme",
        "model": "GT Neo 6",
        "price": 399,
        "mrp": 499,
        "discount": 100,
        "colorOptions": [
            { "name": "Cyber Blue", "hexCode": "#007FFF" },
            { "name": "Stellar Black", "hexCode": "#222222" }
        ],
        "selectedColor": "Cyber Blue",
        "images": ["https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658362/images_2_flb7sg.jpg", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658399/realme-gt-neo-6-se-111908796-16x9_0_e0chuu.avif"],
        "rating": 4.0,
        "reviewsCount": 470,
        "exchangeOffer": {
            "maxDiscount": 200,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 17,
            "duration": "24 months"
        },
        "inStock": true
    },
    {
        "name": "iQOO 12",
        "brand": "iQOO",
        "model": "12",
        "price": 599,
        "mrp": 699,
        "discount": 100,
        "colorOptions": [
            { "name": "Legend White", "hexCode": "#FFFFFF" },
            { "name": "Alpha Black", "hexCode": "#000000" }
        ],
        "selectedColor": "Legend White",
        "images": ["iqoo1.jpghttps://res.cloudinary.com/dmfbshtrx/image/upload/v1752658533/67bb7c6b3c28b0f6d2e6f11d283de05e_kukzgf.png", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658494/61TsYMoy2RL._UF1000_1000_QL80__tsewqw.jpg"],
        "rating": 4.1,
        "reviewsCount": 510,
        "exchangeOffer": {
            "maxDiscount": 250,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 25,
            "duration": "24 months"
        },
        "inStock": true
    },
    {
        "name": "ASUS ROG Phone 7",
        "brand": "ASUS",
        "model": "ROG Phone 7",
        "price": 1099,
        "mrp": 1199,
        "discount": 100,
        "colorOptions": [
            { "name": "Storm White", "hexCode": "#F8F8FF" },
            { "name": "Phantom Black", "hexCode": "#121212" }
        ],
        "selectedColor": "Storm White",
        "images": ["https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658585/81Vdy-mfVEL_ldce2o.jpg", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658639/4A2BCCC6-B9D8-47A5-AD7F-501E30A462A9_uwtyqr.png"],
        "rating": 4.5,
        "reviewsCount": 690,
        "exchangeOffer": {
            "maxDiscount": 500,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 46,
            "duration": "24 months"
        },
        "inStock": true
    },
    {
        "name": "Sony Xperia 1 V",
        "brand": "Sony",
        "model": "Xperia 1 V",
        "price": 1299,
        "mrp": 1399,
        "discount": 100,
        "colorOptions": [
            { "name": "Khaki Green", "hexCode": "#78866B" },
            { "name": "Matte Black", "hexCode": "#2F4F4F" }
        ],
        "selectedColor": "Khaki Green",
        "images": ["https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658685/images_3_boo0ta.jpg", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658733/81YofuHBMZL._UF894_1000_QL80__p1drvz.jpg"],
        "rating": 4.6,
        "reviewsCount": 610,
        "exchangeOffer": {
            "maxDiscount": 600,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 54,
            "duration": "24 months"
        },
        "inStock": true
    },
    {
        "name": "Vivo X100 Pro",
        "brand": "Vivo",
        "model": "X100 Pro",
        "price": 799,
        "mrp": 899,
        "discount": 100,
        "colorOptions": [
            { "name": "Twilight Blue", "hexCode": "#5D8AA8" },
            { "name": "Sunrise Gold", "hexCode": "#FFD700" }
        ],
        "selectedColor": "Twilight Blue",
        "images": ["https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658777/images_4_ex7mcc.jpg", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658815/235fc4fbe0277e6fc5f25fc84fabdd7f_qtregy.png"],
        "rating": 4.2,
        "reviewsCount": 450,
        "exchangeOffer": {
            "maxDiscount": 300,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 33,
            "duration": "24 months"
        },
        "inStock": true
    },
    {
        "name": "Honor Magic6 Pro",
        "brand": "Honor",
        "model": "Magic6 Pro",
        "price": 899,
        "mrp": 999,
        "discount": 100,
        "colorOptions": [
            { "name": "Epi Green", "hexCode": "#567E3A" },
            { "name": "Black", "hexCode": "#000000" }
        ],
        "selectedColor": "Epi Green",
        "images": ["https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658882/71_ztCd0AoL_n5jox1.jpg", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658897/images_5_wfbzvi.jpg"],
        "rating": 4.1,
        "reviewsCount": 390,
        "exchangeOffer": {
            "maxDiscount": 300,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 37,
            "duration": "24 months"
        },
        "inStock": true
    },
    {
        "name": "Redmi Note 13 Pro+",
        "brand": "Redmi",
        "model": "Note 13 Pro+",
        "price": 349,
        "mrp": 449,
        "discount": 100,
        "colorOptions": [
            { "name": "Fusion Purple", "hexCode": "#800080" },
            { "name": "Midnight Black", "hexCode": "#0A0A0A" }
        ],
        "selectedColor": "Fusion Purple",
        "images": ["https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658944/819sWoSDFRL_z25pil.jpg", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752658992/71nrf4zgq5L_p6m7ql.jpg"],
        "rating": 4.0,
        "reviewsCount": 510,
        "exchangeOffer": {
            "maxDiscount": 200,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 15,
            "duration": "24 months"
        },
        "inStock": true
    },
    {
        "name": "Poco F6 Pro",
        "brand": "Poco",
        "model": "F6 Pro",
        "price": 429,
        "mrp": 529,
        "discount": 100,
        "colorOptions": [
            { "name": "Carbon Black", "hexCode": "#1A1A1A" },
            { "name": "White Flame", "hexCode": "#F5F5F5" }
        ],
        "selectedColor": "Carbon Black",
        "images": ["https://res.cloudinary.com/dmfbshtrx/image/upload/v1752659057/images_6_emy3u6.jpg", "https://res.cloudinary.com/dmfbshtrx/image/upload/v1752659130/images_7_zbhckx.jpg"],
        "rating": 4.3,
        "reviewsCount": 410,
        "exchangeOffer": {
            "maxDiscount": 220,
            "isAvailable": true
        },
        "emiOption": {
            "monthly": 18,
            "duration": "24 months"
        },
        "inStock": true
    }
]


async function createProducts() {
    for (let i = 0; i < products.length; i++) {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' , 
             'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODc3NmEwOTFhNDdhNmQyZDg1NTRmY2YiLCJpYXQiOjE3NTI2NTYzOTcsImV4cCI6MTc1Mjc0Mjc5N30.kTzks2i_2cl5eIdWiGvp5yBe51SCVRvb4qdvkMiP4jQ`
          },
          body: JSON.stringify(products[i])
        });
  
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
  
        const data = await res.json();
        console.log(`✅ Product ${i + 1} created:`, data.message || data);
      } catch (err) {
        console.error(`❌ Error creating product ${i + 1}:`, err.message);
      }
    }
  }

createProducts();
