import json
import re

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

categories = [
    {
        "id": "cat_electronics",
        "name": "Electronics",
        "slug": "electronics",
        "description": "Smartphones, laptops, audio systems, wearables, and computing instruments.",
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        "sort_order": 1
    },
    {
        "id": "cat_fashion",
        "name": "Fashion & Clothing",
        "slug": "fashion",
        "description": "Tailored menswear, designer kurtis, sarees, athletic streetwear, luxury leather, and accessories.",
        "image_url": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        "sort_order": 2
    },
    {
        "id": "cat_vehicles",
        "name": "Vehicles & Automotive",
        "slug": "automotive",
        "description": "Electric cars, performance motorcycles, urban e-scooters, bicycles, and automotive gear.",
        "image_url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        "sort_order": 3
    },
    {
        "id": "cat_home_kitchen",
        "name": "Home & Kitchen",
        "slug": "home-kitchen",
        "description": "Architectural furniture, climate appliances, espresso machines, and ambient decor.",
        "image_url": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
        "sort_order": 4
    },
    {
        "id": "cat_beauty",
        "name": "Beauty & Personal Care",
        "slug": "beauty-personal-care",
        "description": "Botanical skincare, fine perfumery, haircare technology, and grooming essentials.",
        "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        "sort_order": 5
    },
    {
        "id": "cat_fitness",
        "name": "Health & Fitness",
        "slug": "health-fitness",
        "description": "Smart treadmills, ergonomic weights, recovery technology, and training gear.",
        "image_url": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        "sort_order": 6
    },
    {
        "id": "cat_sports",
        "name": "Sports & Outdoor",
        "slug": "sports-outdoors",
        "description": "Professional cricket, badminton, trekking, mountaineering, and trail gear.",
        "image_url": "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
        "sort_order": 7
    },
    {
        "id": "cat_books",
        "name": "Books & Stationery",
        "slug": "books-stationery",
        "description": "Bespoke notebooks, fountain pens, architectural monographs, and literary classics.",
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
        "sort_order": 8
    },
    {
        "id": "cat_toys",
        "name": "Toys & Games",
        "slug": "toys-games",
        "description": "STEM educational kits, mechanical puzzles, artisan board games, and collectible toys.",
        "image_url": "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=800&q=80",
        "sort_order": 9
    },
    {
        "id": "cat_grocery",
        "name": "Grocery & Daily Essentials",
        "slug": "grocery-essentials",
        "description": "Single-estate coffees, organic wild honey, cold-pressed olive oils, and artisanal spices.",
        "image_url": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
        "sort_order": 10
    },
    {
        "id": "cat_travel",
        "name": "Travel Accessories",
        "slug": "travel-accessories",
        "description": "Polycarbonate luggage, leather weekenders, organizer folios, and noise-canceling kits.",
        "image_url": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
        "sort_order": 11
    }
]

# We will create raw definition items across each subcategory
raw_items = []

# ========================================================
# 1. ELECTRONICS
# ========================================================
# Smartphones (Apple, Samsung, OnePlus, Xiaomi, Realme, Vivo, Oppo)
raw_items.extend([
    {
        "cat": "cat_electronics",
        "sub": "Smartphones",
        "brand": "Apple",
        "title": "Apple iPhone 16 Pro Max",
        "price": 144900, "original_price": 154900,
        "sku": "ELC-SMP-APL-16PM",
        "desc": "Engineered with Grade 5 Titanium and the blazing A18 Pro chip. Features Camera Control, 48MP Fusion system, and the longest iPhone battery life ever.",
        "specs": {"Display": "6.9-inch Super Retina XDR OLED 120Hz", "Processor": "Apple A18 Pro (3nm)", "Camera": "48MP Main + 48MP Ultra-Wide + 12MP 5x Telephoto", "Battery": "Up to 33 hours video playback", "OS": "iOS 18 with Apple Intelligence"},
        "img": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Storage", "values": ["256GB", "512GB", "1TB"]}, {"name": "Color", "values": ["Desert Titanium", "Natural Titanium", "Black Titanium"]}],
        "tags": ["smartphone", "apple", "iphone", "flagship", "bestseller"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Smartphones",
        "brand": "Samsung",
        "title": "Samsung Galaxy S24 Ultra 5G",
        "price": 129999, "original_price": 139999,
        "sku": "ELC-SMP-SAM-S24U",
        "desc": "The apex of Android engineering featuring Galaxy AI, built-in S Pen, Titanium frame, and a 200MP Quad Telephoto imaging system.",
        "specs": {"Display": "6.8-inch Dynamic AMOLED 2X QHD+ 120Hz", "Processor": "Snapdragon 8 Gen 3 for Galaxy", "Camera": "200MP Main + 50MP 5x + 12MP Ultra-Wide", "Battery": "5000mAh with 45W Fast Charging", "Stylus": "Integrated S Pen"},
        "img": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Storage", "values": ["256GB", "512GB", "1TB"]}, {"name": "Color", "values": ["Titanium Gray", "Titanium Black", "Titanium Violet"]}],
        "tags": ["smartphone", "samsung", "galaxy", "ai", "bestseller"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Smartphones",
        "brand": "OnePlus",
        "title": "OnePlus 12 5G",
        "price": 64999, "original_price": 69999,
        "sku": "ELC-SMP-1PL-12",
        "desc": "Elite performance crafted with Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System, and 100W SUPERVOOC hyper-fast charging.",
        "specs": {"Display": "6.82-inch 2K 120Hz ProXDR Display", "Processor": "Snapdragon 8 Gen 3", "Camera": "50MP Sony LYT-808 + 64MP 3x Periscope", "Battery": "5400mAh with 100W wired & 50W wireless", "RAM": "16GB LPDDR5X"},
        "img": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Storage", "values": ["256GB", "512GB"]}, {"name": "Color", "values": ["Silky Black", "Flowy Emerald"]}],
        "tags": ["smartphone", "oneplus", "flagship", "hasselblad"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Smartphones",
        "brand": "Xiaomi",
        "title": "Xiaomi 14 Ultra Leica Optics",
        "price": 99999, "original_price": 119999,
        "sku": "ELC-SMP-XIA-14U",
        "desc": "A legendary photographic optical system co-engineered with Leica. Quad 50MP cameras with stepless variable aperture and 1-inch LYT-900 sensor.",
        "specs": {"Display": "6.73-inch WQHD+ 120Hz LTPO AMOLED", "Processor": "Snapdragon 8 Gen 3", "Sensor": "1-inch Sony LYT-900", "Aperture": "f/1.63 to f/4.0 Stepless Variable", "Battery": "5000mAh with 90W HyperCharge"},
        "img": "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Black Vegan Leather", "White Ceramic"]}],
        "tags": ["smartphone", "xiaomi", "leica", "camera"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Smartphones",
        "brand": "Realme",
        "title": "Realme GT 6 5G",
        "price": 40999, "original_price": 44999,
        "sku": "ELC-SMP-RLM-GT6",
        "desc": "The Flagship Killer Powered by Snapdragon 8s Gen 3, ultra-bright 6000 nits AMOLED display, and 120W SuperVOOC power system.",
        "specs": {"Display": "6.78-inch 120Hz 8T LTPO AMOLED 6000 nits", "Processor": "Snapdragon 8s Gen 3", "Camera": "50MP Sony LYT-808 OIS", "Battery": "5500mAh with 120W fast charging"},
        "img": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Storage", "values": ["256GB", "512GB"]}, {"name": "Color", "values": ["Fluid Silver", "Razor Green"]}],
        "tags": ["smartphone", "realme", "performance"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Smartphones",
        "brand": "Vivo",
        "title": "Vivo X100 Pro ZEISS Co-Engineered",
        "price": 89999, "original_price": 99999,
        "sku": "ELC-SMP-VIV-X100P",
        "desc": "Revolutionary portrait and telephoto imaging featuring the ZEISS 1-inch main sensor and custom V3 imaging processor.",
        "specs": {"Display": "6.78-inch LTPO AMOLED 120Hz", "Processor": "MediaTek Dimensity 9300", "Camera": "50MP 1-inch + 50MP ZEISS APO Telephoto", "Charging": "100W FlashCharge + 50W Wireless"},
        "img": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Asteroid Black", "Sunset Orange"]}],
        "tags": ["smartphone", "vivo", "zeiss", "camera"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Smartphones",
        "brand": "Oppo",
        "title": "Oppo Find X7 Ultra",
        "price": 94999, "original_price": 104999,
        "sku": "ELC-SMP-OPP-FX7U",
        "desc": "The world's first dual-periscope camera smartphone, calibrated by Hasselblad with Quad Main Camera system and leather back.",
        "specs": {"Display": "6.82-inch QHD+ 120Hz Curved OLED", "Processor": "Snapdragon 8 Gen 3", "Camera": "Quad 50MP with Dual Periscope 3x & 6x", "Battery": "5000mAh with 100W SuperVOOC"},
        "img": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Ocean Blue Leather", "Sepia Brown Leather"]}],
        "tags": ["smartphone", "oppo", "hasselblad"]
    }
])

# Laptops (HP, Dell, Lenovo, ASUS, Acer, Apple)
raw_items.extend([
    {
        "cat": "cat_electronics",
        "sub": "Laptops",
        "brand": "Apple",
        "title": "Apple MacBook Pro 16-inch M3 Max",
        "price": 349900, "original_price": 379900,
        "sku": "ELC-LPT-APL-MBP16",
        "desc": "Unprecedented computational power for creators and architects. Featuring M3 Max chip with 16-core CPU, 40-core GPU, and Liquid Retina XDR display.",
        "specs": {"Display": "16.2-inch Liquid Retina XDR 120Hz ProMotion", "Chip": "Apple M3 Max (16-core CPU, 40-core GPU)", "Memory": "48GB Unified Memory", "Storage": "1TB PCIe NVMe SSD", "Battery": "Up to 22 hours"},
        "img": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Space Black", "Silver"]}],
        "tags": ["laptop", "apple", "macbook", "workstation", "bestseller"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Laptops",
        "brand": "Dell",
        "title": "Dell XPS 16 9640 Core Ultra 9",
        "price": 279990, "original_price": 299990,
        "sku": "ELC-LPT-DEL-XPS16",
        "desc": "Seamless glass haptic touchpad, zero-lattice keyboard, and 4K OLED InfinityEdge touch display encased in machined aluminum.",
        "specs": {"Display": "16.3-inch 4K+ 3840x2400 OLED Touch", "Processor": "Intel Core Ultra 9 185H (16-core)", "Graphics": "NVIDIA GeForce RTX 4070 8GB GDDR6", "RAM": "32GB LPDDR5X", "Storage": "1TB SSD"},
        "img": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Platinum Silver", "Graphite"]}],
        "tags": ["laptop", "dell", "xps", "oled", "premium"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Laptops",
        "brand": "HP",
        "title": "HP Spectre x360 2-in-1 OLED",
        "price": 169999, "original_price": 184999,
        "sku": "ELC-LPT-HP-SPX360",
        "desc": "Convertible precision crafted with gem-cut edges, 2.8K IMAX Enhanced OLED touchscreen, and AI-tuned audio by Poly Studio.",
        "specs": {"Display": "14-inch 2.8K 120Hz OLED Touch 360-degree", "Processor": "Intel Core Ultra 7 155H", "RAM": "16GB LPDDR5X", "Storage": "1TB SSD", "Stylus": "HP Rechargeable MPP 2.0 Tilt Pen included"},
        "img": "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Nightfall Black", "Slate Blue"]}],
        "tags": ["laptop", "hp", "convertible", "touch"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Laptops",
        "brand": "Lenovo",
        "title": "Lenovo ThinkPad X1 Carbon Gen 12",
        "price": 194990, "original_price": 215000,
        "sku": "ELC-LPT-LNV-X1C12",
        "desc": "The gold standard in enterprise security and featherweight carbon-fiber construction. MIL-STD 810H durability certified.",
        "specs": {"Display": "14-inch 2.8K OLED Anti-Glare 120Hz", "Processor": "Intel Core Ultra 7 155H vPro", "Weight": "1.09 kg ultra-lightweight", "Security": "dTPM 2.0 + Fingerprint + IR camera", "Battery": "57Wh with Rapid Charge"},
        "img": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Deep Black Carbon"]}],
        "tags": ["laptop", "lenovo", "thinkpad", "business"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Laptops",
        "brand": "ASUS",
        "title": "ASUS ROG Zephyrus G16 OLED Gaming Laptop",
        "price": 229990, "original_price": 249990,
        "sku": "ELC-LPT-ASU-ROG16",
        "desc": "Ultra-slim CNC machined aluminum gaming rig with ROG Nebula OLED display, Slash Lighting lid, and RTX 4080 graphics.",
        "specs": {"Display": "16-inch 2.5K 240Hz ROG Nebula OLED", "Processor": "Intel Core Ultra 9 185H", "Graphics": "NVIDIA GeForce RTX 4080 12GB GDDR6", "Cooling": "ROG Intelligent Cooling Vapor Chamber", "Weight": "1.85 kg"},
        "img": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Eclipse Gray", "Platinum White"]}],
        "tags": ["laptop", "asus", "gaming", "rtx4080"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Laptops",
        "brand": "Acer",
        "title": "Acer Swift Go 14 AI OLED",
        "price": 79990, "original_price": 89990,
        "sku": "ELC-LPT-ACR-SWF14",
        "desc": "Everyday productivity elevated with 2.8K 90Hz OLED display, dedicated Intel AI Boost NPU, and uncompromised battery longevity.",
        "specs": {"Display": "14-inch 2.8K 2880x1800 CineCrystal OLED 100% DCI-P3", "Processor": "Intel Core Ultra 5 125H", "RAM": "16GB LPDDR5X", "Storage": "512GB NVMe SSD"},
        "img": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Pure Silver"]}],
        "tags": ["laptop", "acer", "oled", "productivity"]
    }
])

# Tablets and iPads
raw_items.extend([
    {
        "cat": "cat_electronics",
        "sub": "Tablets and iPads",
        "brand": "Apple",
        "title": "Apple iPad Pro 13-inch M4 Ultra Retina OLED",
        "price": 129900, "original_price": 139900,
        "sku": "ELC-TAB-APL-IPD13",
        "desc": "The thinnest Apple product ever made (5.1mm). Features breakthrough Tandem OLED Ultra Retina XDR display and the revolutionary M4 chip.",
        "specs": {"Display": "13-inch Tandem OLED Ultra Retina XDR 120Hz", "Chip": "Apple M4 (9-core CPU, 10-core GPU)", "Thickness": "5.1 mm ultra-thin", "Compatibility": "Apple Pencil Pro & Magic Keyboard"},
        "img": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Storage", "values": ["256GB", "512GB", "1TB"]}, {"name": "Color", "values": ["Space Black", "Silver"]}],
        "tags": ["tablet", "ipad", "apple", "m4", "bestseller"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Tablets and iPads",
        "brand": "Samsung",
        "title": "Samsung Galaxy Tab S9 Ultra 5G",
        "price": 108999, "original_price": 122999,
        "sku": "ELC-TAB-SAM-S9U",
        "desc": "Colossal 14.6-inch Dynamic AMOLED 2X canvas with IP68 water resistance and included low-latency S Pen.",
        "specs": {"Display": "14.6-inch Dynamic AMOLED 2X 120Hz", "Processor": "Snapdragon 8 Gen 2 for Galaxy", "Durability": "IP68 water and dust resistant", "Stylus": "S Pen included with bidirectional charging"},
        "img": "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Graphite", "Beige"]}],
        "tags": ["tablet", "samsung", "amoled", "spen"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Tablets and iPads",
        "brand": "OnePlus",
        "title": "OnePlus Pad 2 3K 144Hz",
        "price": 39999, "original_price": 44999,
        "sku": "ELC-TAB-1PL-PAD2",
        "desc": "Snapdragon 8 Gen 3 flagship tablet with 7:5 ReadFit display ratio, 6-speaker omni-bearing sound, and 67W SUPERVOOC charging.",
        "specs": {"Display": "12.1-inch 3K 144Hz 7:5 ReadFit LCD", "Processor": "Snapdragon 8 Gen 3", "Audio": "6 Hi-Res Speakers", "Battery": "9510mAh with 67W fast charging"},
        "img": "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Nimbus Gray"]}],
        "tags": ["tablet", "oneplus", "fast"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Tablets and iPads",
        "brand": "Apple",
        "title": "Apple iPad Air 11-inch M2",
        "price": 59900, "original_price": 64900,
        "sku": "ELC-TAB-APL-AIR11",
        "desc": "Redesigned iPad Air turbocharged by the M2 chip. Landscape 12MP Ultra Wide front camera and support for Apple Pencil Pro.",
        "specs": {"Display": "11-inch Liquid Retina Display with P3 wide color", "Chip": "Apple M2 (8-core CPU, 10-core GPU)", "Camera": "Landscape 12MP Center Stage camera", "Security": "Touch ID in top button"},
        "img": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Space Gray", "Starlight", "Purple", "Blue"]}],
        "tags": ["tablet", "ipad", "apple", "m2"]
    }
])

# Smartwatches
raw_items.extend([
    {
        "cat": "cat_electronics",
        "sub": "Smartwatches",
        "brand": "Apple",
        "title": "Apple Watch Ultra 2 GPS + Cellular",
        "price": 89900, "original_price": 94900,
        "sku": "ELC-WAT-APL-ULT2",
        "desc": "The ultimate sports and adventure watch. 49mm aerospace-grade titanium case, 3000 nits display, precision dual-frequency GPS, and 72-hour Low Power battery.",
        "specs": {"Case": "49mm Aerospace Titanium Case", "Display": "3000 nits Sapphire Crystal Always-On OLED", "Water Resistance": "100m water resistant / 40m recreational dive", "Battery": "Up to 36 hours normal / 72 hours Low Power Mode"},
        "img": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Band", "values": ["Alpine Loop Titanium", "Trail Loop Black", "Ocean Band Blue"]}],
        "tags": ["smartwatch", "apple", "ultra", "titanium", "bestseller"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Smartwatches",
        "brand": "Samsung",
        "title": "Samsung Galaxy Watch Ultra LTE",
        "price": 59999, "original_price": 64999,
        "sku": "ELC-WAT-SAM-WULT",
        "desc": "Cushion design titanium chassis with dual-frequency GPS, BioActive Sensor, sleep apnea detection, and 100-hour Power Saving endurance.",
        "specs": {"Case": "47mm Grade 4 Titanium", "Durability": "10ATM + IP68 + MIL-STD-810H", "Display": "1.5-inch Super AMOLED 3000 nits", "Sensors": "BioActive 13-LED optical heart rate & ECG"},
        "img": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Titanium Gray", "Titanium White", "Titanium Silver"]}],
        "tags": ["smartwatch", "samsung", "wearos"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Smartwatches",
        "brand": "Garmin",
        "title": "Garmin Epix Pro Gen 2 Sapphire Edition",
        "price": 111990, "original_price": 124990,
        "sku": "ELC-WAT-GAR-EPX2",
        "desc": "Premium multisport smartwatch with stunning AMOLED display, built-in LED flashlight, multi-continent TopoActive maps, and 31-day battery life.",
        "specs": {"Lens": "Sapphire Crystal with Titanium Bezel", "Display": "1.4-inch AMOLED Always-On", "Flashlight": "Integrated Multi-LED with strobe", "Battery": "Up to 31 days in smartwatch mode"},
        "img": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Size", "values": ["47mm", "51mm"]}],
        "tags": ["smartwatch", "garmin", "adventure", "maps"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Smartwatches",
        "brand": "Fossil",
        "title": "Fossil Gen 6 Wellness Edition Touchscreen",
        "price": 18995, "original_price": 24995,
        "sku": "ELC-WAT-FOS-G6W",
        "desc": "Classic horological aesthetics merged with modern Wear OS health telemetry, SpO2 monitoring, and fast 30-minute rapid charging.",
        "specs": {"Case": "44mm Stainless Steel", "OS": "Wear OS by Google", "Charging": "80% charge in 30 minutes", "Sensors": "Continuous Heart Rate, SpO2, Step Counter"},
        "img": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Strap", "values": ["Black Silicone", "Brown Leather"]}],
        "tags": ["smartwatch", "fossil", "classic"]
    }
])

# Wireless Earbuds and Headphones
raw_items.extend([
    {
        "cat": "cat_electronics",
        "sub": "Wireless Earbuds and Headphones",
        "brand": "Sony",
        "title": "Sony WH-1000XM5 Noise Canceling Headphones",
        "price": 26990, "original_price": 34990,
        "sku": "ELC-AUD-SNY-XM5",
        "desc": "Industry-leading noise cancellation powered by two processors and 8 microphones. Hi-Res Audio wireless with LDAC support and 30-hour battery life.",
        "specs": {"Drivers": "30mm Precision Engineered Carbon Fiber", "Noise Cancellation": "Auto NC Optimizer with Integrated Processor V1", "Codec": "LDAC, AAC, SBC", "Battery": "30 hours with ANC on (3-min quick charge = 3 hours)"},
        "img": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Midnight Black", "Platinum Silver", "Smoky Pink"]}],
        "tags": ["headphones", "sony", "anc", "audiophile", "bestseller"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Wireless Earbuds and Headphones",
        "brand": "Apple",
        "title": "Apple AirPods Pro 2 USB-C with MagSafe",
        "price": 24900, "original_price": 26900,
        "sku": "ELC-AUD-APL-APP2",
        "desc": "Powered by the Apple H2 chip delivering up to 2x more Active Noise Cancellation, Adaptive Audio, and personalized Spatial Audio with dynamic head tracking.",
        "specs": {"Chip": "Apple H2 Headphone Chip + U1 in Case", "Features": "Adaptive Audio, Transparency mode, Conversation Awareness", "Battery": "Up to 6 hours listening (30 hours with MagSafe Case)", "Resistance": "IP54 dust, sweat, and water resistant"},
        "img": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Case", "values": ["USB-C MagSafe Case"]}],
        "tags": ["earbuds", "apple", "airpods", "spatial-audio", "bestseller"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Wireless Earbuds and Headphones",
        "brand": "Bose",
        "title": "Bose QuietComfort Ultra Wireless Headphones",
        "price": 35900, "original_price": 39900,
        "sku": "ELC-AUD-BSE-QCU",
        "desc": "World-class noise cancellation accompanied by revolutionary Bose Immersive Audio that takes what you're hearing out of your head and places it in front of you.",
        "specs": {"Audio": "Bose Immersive Spatial Audio", "Modes": "Quiet Mode, Aware Mode, Immersion Mode", "Battery": "Up to 24 hours playback (18 hours with Immersive Audio)", "Microphones": "Built-in beam-forming array"},
        "img": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Black", "White Smoke", "Sandstone"]}],
        "tags": ["headphones", "bose", "comfort", "anc"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Wireless Earbuds and Headphones",
        "brand": "Sennheiser",
        "title": "Sennheiser Momentum 4 Wireless Audiophile",
        "price": 24990, "original_price": 34990,
        "sku": "ELC-AUD-SNN-M4",
        "desc": "Sensational high-fidelity acoustic performance backed by an astonishing 60-hour marathon battery life and adaptive noise cancellation.",
        "specs": {"Transducer": "42mm audiophile-inspired system", "Battery": "60 hours battery life with ANC enabled", "Bluetooth": "Bluetooth 5.2 class 1 with aptX Adaptive", "EQ": "Customizable via Sennheiser Smart Control App"},
        "img": "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Matte Black", "Graphite Gray"]}],
        "tags": ["headphones", "sennheiser", "audiophile", "battery"]
    }
])

# Bluetooth Speakers
raw_items.extend([
    {
        "cat": "cat_electronics",
        "sub": "Bluetooth Speakers",
        "brand": "Marshall",
        "title": "Marshall Stanmore III Bluetooth Home Speaker",
        "price": 37999, "original_price": 41999,
        "sku": "ELC-SPK-MSH-STN3",
        "desc": "Iconic vintage rock 'n' roll aesthetic housing room-filling Marshall signature sound with outward-angled tweeters and updated waveguides.",
        "specs": {"Amplifiers": "One 50 Watt Class D for woofer + Two 15 Watt Class D for tweeters", "Connectivity": "Bluetooth 5.2, 3.5mm Aux, RCA inputs", "Frequency": "45–20,000 Hz", "Controls": "Analogue brass control knobs for volume, bass, treble"},
        "img": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Vintage Black", "Cream", "Brown"]}],
        "tags": ["speaker", "marshall", "vintage", "bluetooth", "bestseller"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Bluetooth Speakers",
        "brand": "JBL",
        "title": "JBL Charge 5 Portable Waterproof Speaker",
        "price": 14999, "original_price": 17999,
        "sku": "ELC-SPK-JBL-CHG5",
        "desc": "Take the concert anywhere. Rugged IP67 waterproof and dustproof speaker with built-in power bank to charge your devices while streaming.",
        "specs": {"Output": "30W RMS woofer + 10W RMS tweeter", "Durability": "IP67 Waterproof and Dustproof", "Battery": "20 Hours Playtime with 7500mAh built-in power bank", "Feature": "JBL PartyBoost stereo pairing"},
        "img": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Midnight Black", "Squad Camo", "Forest Blue"]}],
        "tags": ["speaker", "jbl", "waterproof", "portable"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Bluetooth Speakers",
        "brand": "Sonos",
        "title": "Sonos Era 300 Spatial Audio Speaker",
        "price": 49999, "original_price": 54999,
        "sku": "ELC-SPK-SNS-ERA300",
        "desc": "Groundbreaking acoustic architecture featuring six optimally positioned drivers all around the front, sides, and top to support Dolby Atmos Spatial Audio.",
        "specs": {"Audio": "Dolby Atmos Spatial Audio 6 Class-D digital amplifiers", "Connectivity": "WiFi 6, Bluetooth 5.0, USB-C Line In, Apple AirPlay 2", "Microphones": "Far-field microphone array with Trueplay tuning"},
        "img": "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Matte Black", "Matte White"]}],
        "tags": ["speaker", "sonos", "spatial-audio", "dolby-atmos"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Bluetooth Speakers",
        "brand": "Harman Kardon",
        "title": "Harman Kardon Aura Studio 4 Ambient Light Speaker",
        "price": 27999, "original_price": 32999,
        "sku": "ELC-SPK-HK-AS4",
        "desc": "Sculptural transparent dome casting a diamond-effect ambient illumination that pulses rhythmically to 360-degree room acoustic dispersal.",
        "specs": {"Output": "130W RMS Power with 132mm Subwoofer", "Lighting": "5 Distinct diamond lighting ambient themes", "Design": "Transparent dome crafted with recycled fabric and aluminum", "Audio": "Omni-directional 360 soundstage"},
        "img": "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Style", "values": ["Diamond Amber Glass"]}],
        "tags": ["speaker", "harman-kardon", "ambient", "design"]
    }
])

# Televisions
raw_items.extend([
    {
        "cat": "cat_electronics",
        "sub": "Televisions",
        "brand": "LG",
        "title": "LG 65-inch OLED evo C3 4K Smart Cinema TV",
        "price": 174990, "original_price": 239990,
        "sku": "ELC-TV-LG-65C3",
        "desc": "Self-lit OLED pixels delivering infinite contrast, 100% color fidelity, and the α9 AI Processor Gen6 for ultra-realistic picture and sound.",
        "specs": {"Display": "65-inch 4K Self-Lit OLED evo 120Hz", "Processor": "α9 AI Processor 4K Gen6", "Gaming": "0.1ms response time, G-Sync, FreeSync, 4x HDMI 2.1", "Sound": "Dolby Vision & Dolby Atmos 9.1.2 Virtual Surround"},
        "img": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Screen Size", "values": ["55-inch", "65-inch", "77-inch"]}],
        "tags": ["tv", "lg", "oled", "4k", "gaming", "bestseller"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Televisions",
        "brand": "Sony",
        "title": "Sony Bravia XR 65-inch Cognitive Processor XR OLED",
        "price": 219990, "original_price": 279990,
        "sku": "ELC-TV-SNY-XR65",
        "desc": "Cognitive Processor XR understands how humans see and hear to deliver intense pure blacks and cinematic acoustic surface sound directly from the screen.",
        "specs": {"Display": "65-inch 4K HDR XR OLED 120Hz", "Processor": "Cognitive Processor XR with XR Triluminos Pro", "Audio": "Acoustic Surface Audio+ with screen vibrating sound", "OS": "Google TV with Hands-free Voice Search"},
        "img": "https://images.unsplash.com/photo-1577975882846-431adc8c2009?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Screen Size", "values": ["65-inch", "77-inch"]}],
        "tags": ["tv", "sony", "bravia", "oled"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Televisions",
        "brand": "Samsung",
        "title": "Samsung 65-inch Neo QLED 4K Smart TV",
        "price": 149990, "original_price": 189990,
        "sku": "ELC-TV-SAM-65QN",
        "desc": "Quantum Matrix Technology with Quantum Mini LEDs reveals ultra-fine details in both dark and bright scenes with zero burn-in risk.",
        "specs": {"Display": "65-inch Neo QLED 4K 144Hz Quantum Mini LED", "Processor": "NQ4 AI Gen2 Processor with 4K Upscaling", "Design": "NeoSlim Infinity Design", "Audio": "Object Tracking Sound+ (OTS+)"},
        "img": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Screen Size", "values": ["55-inch", "65-inch"]}],
        "tags": ["tv", "samsung", "qled", "miniled"]
    }
])

# Gaming Consoles
raw_items.extend([
    {
        "cat": "cat_electronics",
        "sub": "Gaming Consoles",
        "brand": "Sony",
        "title": "PlayStation 5 Slim 1TB Console",
        "price": 54990, "original_price": 59990,
        "sku": "ELC-CON-SNY-PS5S",
        "desc": "Slimmer profile packed with 1TB ultra-high-speed SSD storage, ray tracing immersion, 4K-TV gaming at up to 120fps, and Tempest 3D AudioTech.",
        "specs": {"Storage": "1TB Custom High-Speed NVMe SSD", "Performance": "Custom AMD Zen 2 CPU + RDNA 2 GPU 10.3 TFLOPS", "Controller": "DualSense Wireless Controller with Haptic Feedback & Adaptive Triggers", "Disc Drive": "Ultra HD Blu-ray Disc Edition"},
        "img": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Edition", "values": ["Disc Edition 1TB", "Digital Edition 1TB"]}],
        "tags": ["gaming", "playstation", "ps5", "console", "bestseller"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Gaming Consoles",
        "brand": "Microsoft",
        "title": "Xbox Series X 1TB Gaming Console",
        "price": 52990, "original_price": 55990,
        "sku": "ELC-CON-MSF-XSX",
        "desc": "The most powerful Xbox ever. 12 teraflops of raw graphic processing power, DirectX ray tracing, and Quick Resume across multiple titles.",
        "specs": {"Performance": "12 TFLOPS 52 CUs RDNA 2 GPU", "Storage": "1TB Custom NVMe SSD with Xbox Velocity Architecture", "Resolution": "True 4K Gaming up to 120FPS, 8K HDR ready"},
        "img": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Matte Carbon Black"]}],
        "tags": ["gaming", "xbox", "console", "4k"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Gaming Consoles",
        "brand": "Nintendo",
        "title": "Nintendo Switch OLED Model",
        "price": 31999, "original_price": 34999,
        "sku": "ELC-CON-NTD-SWO",
        "desc": "Features a vibrant 7-inch OLED screen, wide adjustable tabletop stand, dock with wired LAN port, and 64 GB internal storage.",
        "specs": {"Display": "7-inch Multi-touch Capacitive OLED 720p (1080p docked)", "Storage": "64GB Internal (expandable via microSD)", "Battery": "4.5 to 9 hours portable play", "Audio": "Enhanced onboard stereo speakers"},
        "img": "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["White Joy-Con", "Neon Red & Blue"]}],
        "tags": ["gaming", "nintendo", "switch", "oled", "portable"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Gaming Consoles",
        "brand": "Valve",
        "title": "Steam Deck OLED 1TB Handheld PC",
        "price": 68999, "original_price": 74999,
        "sku": "ELC-CON-VLV-STDO",
        "desc": "Definitive handheld PC gaming. 7.4-inch 90Hz HDR OLED display, custom AMD APU, larger battery with up to 12 hours play, and premium anti-glare etched glass.",
        "specs": {"Display": "7.4-inch 90Hz HDR OLED 1000 nits peak", "APU": "6nm AMD Sephiroth APU (Zen 2 4c/8t)", "Storage": "1TB High-speed NVMe SSD", "Connectivity": "WiFi 6E + Bluetooth 5.3 with separate antenna"},
        "img": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Storage", "values": ["512GB OLED", "1TB OLED Etched Glass"]}],
        "tags": ["gaming", "steamdeck", "valve", "handheld"]
    }
])

# Cameras
raw_items.extend([
    {
        "cat": "cat_electronics",
        "sub": "Cameras",
        "brand": "Sony",
        "title": "Sony Alpha A7 IV Full-Frame Mirrorless Camera",
        "price": 209990, "original_price": 242990,
        "sku": "ELC-CAM-SNY-A7M4",
        "desc": "The benchmark hybrid full-frame camera. 33MP Exmor R sensor, BIONZ XR processing, 4K 60p 10-bit 4:2:2 video, and real-time human/animal/bird eye tracking.",
        "specs": {"Sensor": "33MP Full-Frame Exmor R Back-Illuminated CMOS", "Autofocus": "759 phase-detection points with AI Real-Time Eye AF", "Video": "4K 60p in Super35, 4K 30p 7K oversampled Full-Frame", "Stabilization": "5-axis optical in-body 5.5-step stabilization"},
        "img": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Kit", "values": ["Body Only", "With 28-70mm Lens"]}],
        "tags": ["camera", "sony", "fullframe", "mirrorless", "bestseller"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Cameras",
        "brand": "Canon",
        "title": "Canon EOS R6 Mark II Mirrorless Camera",
        "price": 215995, "original_price": 243995,
        "sku": "ELC-CAM-CAN-R6M2",
        "desc": "Master speed and low light. 24.2MP full-frame CMOS sensor shooting up to 40fps electronic shutter, 6K oversampled uncropped 4K 60p, and Dual Pixel CMOS AF II.",
        "specs": {"Sensor": "24.2 Megapixel Full-Frame CMOS", "Speed": "Up to 40 fps electronic shutter / 12 fps mechanical", "Autofocus": "Dual Pixel CMOS AF II with vehicle, horse, train detection", "Stabilization": "Up to 8 stops in-body image stabilization (IBIS)"},
        "img": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Kit", "values": ["Body Only", "With RF 24-105mm F4-7.1 IS STM"]}],
        "tags": ["camera", "canon", "eos", "mirrorless"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Cameras",
        "brand": "Fujifilm",
        "title": "Fujifilm X-T5 Mirrorless Digital Camera",
        "price": 169999, "original_price": 189999,
        "sku": "ELC-CAM-FUJ-XT5",
        "desc": "Classic dials and analog soul. 40.2MP X-Trans CMOS 5 HR sensor, 5-axis 7.0-stop in-body stabilization, and iconic film simulation modes.",
        "specs": {"Sensor": "40.2MP APS-C X-Trans CMOS 5 HR Sensor", "Color": "19 Legendary Film Simulation Modes including Nostalgic Neg", "Video": "6.2K at 30p 10-bit internal recording", "Viewfinder": "3.69M-dot OLED EVF with 0.8x magnification"},
        "img": "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Silver Vintage", "Black Classic"]}],
        "tags": ["camera", "fujifilm", "retro", "filmsimulation"]
    }
])

# Computer Accessories, Keyboards, Monitors, Printers, Chargers
raw_items.extend([
    {
        "cat": "cat_electronics",
        "sub": "Keyboards and Mouse",
        "brand": "Logitech",
        "title": "Logitech MX Master 3S Wireless Performance Mouse",
        "price": 8995, "original_price": 10995,
        "sku": "ELC-ACC-LOG-MX3S",
        "desc": "Quiet click switches, 8000 DPI track-on-glass sensor, and the MagSpeed electromagnetic scroll wheel that scrolls 1,000 lines per second.",
        "specs": {"Sensor": "Darkfield high precision 8000 DPI track-on-glass", "Scroll": "MagSpeed SmartShift electromagnetic scroll", "Battery": "70 days on full charge, 3 hours from 1-min charge", "Connectivity": "Bluetooth + Logi Bolt USB Receiver across 3 devices"},
        "img": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Graphite Black", "Pale Gray"]}],
        "tags": ["mouse", "logitech", "ergonomic", "bestseller"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Keyboards and Mouse",
        "brand": "Keychron",
        "title": "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
        "price": 18499, "original_price": 20999,
        "sku": "ELC-ACC-KCH-Q1P",
        "desc": "Double-gasket aluminum body, programmable rotary knob, hot-swappable Keychron K Pro switches, and QMK/VIA key remapping support.",
        "specs": {"Frame": "CNC machined 6063 aluminum body", "Structure": "Double-Gasket design with sound absorbing foam", "Switches": "Hot-swappable K Pro Red Linear switches", "Backlight": "South-facing RGB with 22 dynamic modes"},
        "img": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Switch Type", "values": ["K Pro Red Linear", "K Pro Brown Tactile"]}],
        "tags": ["keyboard", "keychron", "mechanical", "custom"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Monitors",
        "brand": "Dell",
        "title": "Dell UltraSharp 32-inch 4K USB-C Hub Monitor (U3223QE)",
        "price": 72990, "original_price": 86990,
        "sku": "ELC-MON-DEL-U32",
        "desc": "IPS Black technology delivering a 2,000:1 contrast ratio, 98% DCI-P3 color coverage, and single-cable 90W USB-C hub connectivity with RJ45 Ethernet.",
        "specs": {"Panel": "31.5-inch 4K 3840x2160 IPS Black Technology", "Contrast": "2000:1 contrast ratio with VESA DisplayHDR 400", "Hub": "USB-C with 90W Power Delivery, RJ45 Ethernet, DisplayPort", "Color": "98% DCI-P3 & 100% sRGB calibrated delta E < 2"},
        "img": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Stand", "values": ["Factory Height Adjustable Stand"]}],
        "tags": ["monitor", "dell", "4k", "ultrasharp", "workstation"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Monitors",
        "brand": "Apple",
        "title": "Apple Studio Display 27-inch 5K Retina",
        "price": 159900, "original_price": 169900,
        "sku": "ELC-MON-APL-STD27",
        "desc": "Stunning 27-inch 5K Retina display with 14.7 million pixels, 12MP Ultra Wide camera with Center Stage, studio-quality mics, and six-speaker soundstage.",
        "specs": {"Display": "27-inch 5K Retina 5120x2880 with 600 nits brightness", "Glass": "Standard Glass with Anti-Reflective coating", "Camera": "12MP Ultra Wide camera with Center Stage", "Speakers": "Six-speaker sound system with Spatial Audio"},
        "img": "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Stand Option", "values": ["Tilt-Adjustable Stand", "Tilt & Height-Adjustable Stand"]}],
        "tags": ["monitor", "apple", "5k", "retina"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Printers",
        "brand": "HP",
        "title": "HP Smart Tank 580 All-in-One Wireless Printer",
        "price": 13999, "original_price": 16999,
        "sku": "ELC-PRN-HP-ST580",
        "desc": "High-capacity refillable ink tank printer delivering ultra-low running costs (up to 12,000 black or 6,000 color pages in box) with self-healing WiFi.",
        "specs": {"Functions": "Print, Copy, Scan with flatbed scanner", "Yield": "Up to 12,000 black or 6,000 color pages from inbox ink", "Speed": "Up to 12 ppm black / 5 ppm color", "Connectivity": "Dual-Band Wi-Fi with self-healing, USB 2.0, HP Smart App"},
        "img": "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Model", "values": ["Standard Tank Edition"]}],
        "tags": ["printer", "hp", "inktank", "wireless"]
    },
    {
        "cat": "cat_electronics",
        "sub": "Chargers and Power Banks",
        "brand": "Anker",
        "title": "Anker Prime 200W GaN Charging Station",
        "price": 12999, "original_price": 14999,
        "sku": "ELC-CHG-ANK-PR200",
        "desc": "Ultra-compact 6-port desktop charging station outputting 200W total with GaNPrime power distribution and ActiveShield 2.0 temperature monitoring.",
        "specs": {"Total Output": "200W Max with GaNPrime architecture", "Ports": "4x USB-C + 2x USB-A simultaneous fast charging", "Safety": "ActiveShield 2.0 monitoring temperatures 3 million times per day", "Compatibility": "Charges 2 MacBook Pro 16 laptops simultaneously at full speed"},
        "img": "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80",
        "options": [{"name": "Color", "values": ["Space Black", "Silver Gray"]}],
        "tags": ["charger", "anker", "gan", "fast-charging"]
    }
])

print(f"Total Electronics products drafted: {len(raw_items)}")
