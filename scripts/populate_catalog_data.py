# -*- coding: utf-8 -*-
# Contains structured catalog data for 320+ products

# ==========================================
# 1. ELECTRONICS (14 Subcategories)
# ==========================================

# 1.1 Smartphones
smartphones = [
    ("Apple", "Apple iPhone 16 Pro Max", 144900, 154900, "Grade 5 Titanium, A18 Pro chip, 48MP Fusion camera, 4K 120fps Dolby Vision.", {"Display": "6.9\" Super Retina XDR OLED 120Hz", "Chip": "A18 Pro (3nm)", "Camera": "48MP + 48MP + 12MP (5x tele)", "Battery": "Up to 33 hrs playback"}, "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80", [{"name": "Storage", "values": ["256GB", "512GB", "1TB"]}, {"name": "Color", "values": ["Desert Titanium", "Natural Titanium", "Black Titanium"]}]),
    ("Samsung", "Samsung Galaxy S24 Ultra 5G", 129999, 139999, "Galaxy AI powerhouse with titanium armor, integrated S Pen, and 200MP Quad Telephoto imaging.", {"Display": "6.8\" Dynamic AMOLED 2X QHD+ 120Hz", "Chip": "Snapdragon 8 Gen 3 for Galaxy", "Camera": "200MP + 50MP + 12MP + 10MP", "Battery": "5000mAh 45W fast charge"}, "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80", [{"name": "Storage", "values": ["256GB", "512GB"]}, {"name": "Color", "values": ["Titanium Gray", "Titanium Black"]}]),
    ("OnePlus", "OnePlus 12 5G", 64999, 69999, "Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera, and 100W SUPERVOOC charging.", {"Display": "6.82\" 2K 120Hz ProXDR", "Chip": "Snapdragon 8 Gen 3", "Camera": "50MP Sony LYT-808 + 64MP 3x Periscope", "Battery": "5400mAh with 100W wired"}, "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80", [{"name": "Storage", "values": ["256GB", "512GB"]}, {"name": "Color", "values": ["Silky Black", "Flowy Emerald"]}]),
    ("Xiaomi", "Xiaomi 14 Ultra Leica Edition", 99999, 119999, "Legendary Leica quad 50MP cameras with stepless variable aperture and 1-inch LYT-900 sensor.", {"Display": "6.73\" WQHD+ 120Hz LTPO AMOLED", "Chip": "Snapdragon 8 Gen 3", "Camera": "Quad 50MP Leica Optical System", "Battery": "5000mAh with 90W HyperCharge"}, "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Black Vegan Leather", "White Ceramic"]}]),
    ("Realme", "Realme GT 6 5G Flagship", 40999, 44999, "Snapdragon 8s Gen 3, ultra-bright 6000 nits AMOLED display, and 120W SuperVOOC power system.", {"Display": "6.78\" 120Hz LTPO 6000 nits", "Chip": "Snapdragon 8s Gen 3", "Camera": "50MP Sony LYT-808 OIS", "Battery": "5500mAh 120W"}, "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Fluid Silver", "Razor Green"]}]),
    ("Vivo", "Vivo X100 Pro ZEISS Optics", 89999, 99999, "Revolutionary portrait and telephoto imaging with ZEISS 1-inch sensor and V3 imaging chip.", {"Display": "6.78\" LTPO AMOLED 120Hz", "Chip": "MediaTek Dimensity 9300", "Camera": "50MP 1-inch + 50MP ZEISS APO", "Battery": "5400mAh with 100W FlashCharge"}, "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Asteroid Black", "Sunset Orange"]}]),
    ("Oppo", "Oppo Find X7 Ultra Dual Periscope", 94999, 104999, "World's first dual-periscope camera smartphone co-engineered with Hasselblad.", {"Display": "6.82\" QHD+ 120Hz Curved OLED", "Chip": "Snapdragon 8 Gen 3", "Camera": "Quad 50MP Dual Periscope", "Battery": "5000mAh 100W SuperVOOC"}, "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Ocean Blue", "Sepia Brown"]}]),
    ("Google", "Google Pixel 9 Pro XL", 124999, 134999, "Google Tensor G4 chip, Gemini Nano AI, pro-grade triple rear camera with 30x Super Res Zoom.", {"Display": "6.8\" Super Actua OLED 1-120Hz", "Chip": "Google Tensor G4 + Titan M2", "Camera": "50MP Main + 48MP Ultra-Wide + 48MP 5x", "Battery": "5060mAh 37W Fast Charge"}, "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80", [{"name": "Storage", "values": ["128GB", "256GB", "512GB"]}, {"name": "Color", "values": ["Obsidian", "Porcelain", "Hazel"]}])
]
for item in smartphones:
    reg_prod("c_electronics", "Smartphones", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["smartphone", item[0].lower(), "5g"])

# 1.2 Laptops
laptops = [
    ("Apple", "Apple MacBook Pro 16 M3 Max", 349900, 379900, "16-core CPU, 40-core GPU, Liquid Retina XDR display, 48GB unified memory.", {"Display": "16.2\" Liquid Retina XDR 120Hz", "Processor": "Apple M3 Max 16-Core", "RAM": "48GB Unified", "Storage": "1TB SSD"}, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Space Black", "Silver"]}]),
    ("Dell", "Dell XPS 16 9640 Core Ultra 9", 279990, 299990, "4K OLED InfinityEdge touch, glass haptic trackpad, RTX 4070 graphics.", {"Display": "16.3\" 4K+ OLED Touch", "Processor": "Intel Core Ultra 9 185H", "GPU": "NVIDIA RTX 4070 8GB", "RAM": "32GB LPDDR5X"}, "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Platinum Silver", "Graphite"]}]),
    ("HP", "HP Spectre x360 2-in-1 OLED", 169999, 184999, "Gem-cut convertible with 2.8K OLED touchscreen and Poly Studio audio.", {"Display": "14\" 2.8K 120Hz OLED Touch", "Processor": "Intel Core Ultra 7 155H", "RAM": "16GB", "Storage": "1TB SSD"}, "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Nightfall Black", "Slate Blue"]}]),
    ("Lenovo", "Lenovo ThinkPad X1 Carbon Gen 12", 194990, 215000, "Ultralight carbon-fiber business laptop with MIL-STD 810H durability.", {"Display": "14\" 2.8K OLED 120Hz", "Processor": "Intel Core Ultra 7 155H vPro", "Weight": "1.09 kg", "Storage": "1TB SSD"}, "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Deep Black Carbon"]}]),
    ("ASUS", "ASUS ROG Zephyrus G16 OLED", 229990, 249990, "Ultra-slim gaming laptop with 240Hz ROG Nebula OLED and RTX 4080.", {"Display": "16\" 2.5K 240Hz OLED", "Processor": "Intel Core Ultra 9 185H", "GPU": "NVIDIA RTX 4080 12GB", "RAM": "32GB"}, "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Eclipse Gray", "Platinum White"]}]),
    ("Acer", "Acer Swift Go 14 AI OLED", 79990, 89990, "2.8K 90Hz OLED with dedicated Intel AI Boost NPU and 100% DCI-P3 color.", {"Display": "14\" 2.8K OLED 90Hz", "Processor": "Intel Core Ultra 5 125H", "RAM": "16GB", "Storage": "512GB SSD"}, "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Pure Silver"]}]),
    ("Apple", "Apple MacBook Air 15-inch M3", 134900, 144900, "Supercharged by M3 chip, razor-thin 11.5mm unibody, 18-hour battery.", {"Display": "15.3\" Liquid Retina 500 nits", "Chip": "Apple M3 (8-core CPU, 10-core GPU)", "RAM": "16GB Unified", "Storage": "512GB SSD"}, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Midnight", "Starlight", "Space Gray", "Silver"]}])
]
for item in laptops:
    reg_prod("c_electronics", "Laptops", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["laptop", item[0].lower(), "computer"])

# 1.3 Tablets & iPads
tablets = [
    ("Apple", "Apple iPad Pro 13 M4 Tandem OLED", 129900, 139900, "World's thinnest Apple product (5.1mm) with Tandem OLED and M4 silicon.", {"Display": "13\" Tandem OLED Ultra Retina XDR 120Hz", "Chip": "Apple M4", "Thickness": "5.1mm", "Storage": "256GB"}, "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80", [{"name": "Storage", "values": ["256GB", "512GB"]}, {"name": "Color", "values": ["Space Black", "Silver"]}]),
    ("Samsung", "Samsung Galaxy Tab S9 Ultra", 108999, 122999, "Massive 14.6-inch Dynamic AMOLED 2X with IP68 water resistance and S Pen.", {"Display": "14.6\" Dynamic AMOLED 2X 120Hz", "Processor": "Snapdragon 8 Gen 2", "Protection": "IP68 water resistant", "Stylus": "S Pen included"}, "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Graphite", "Beige"]}]),
    ("OnePlus", "OnePlus Pad 2 3K 144Hz", 39999, 44999, "Snapdragon 8 Gen 3 flagship tablet with 7:5 ReadFit display and 67W charging.", {"Display": "12.1\" 3K 144Hz 7:5 Display", "Chip": "Snapdragon 8 Gen 3", "Audio": "6 Hi-Res Speakers", "Battery": "9510mAh 67W"}, "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Nimbus Gray"]}]),
    ("Apple", "Apple iPad Air 11 M2", 59900, 64900, "Turbocharged by M2 with landscape 12MP front camera and Apple Pencil Pro support.", {"Display": "11\" Liquid Retina P3", "Chip": "Apple M2", "Camera": "Landscape 12MP Center Stage", "Storage": "128GB"}, "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Space Gray", "Starlight", "Blue"]}]),
    ("Xiaomi", "Xiaomi Pad 6 Pro 144Hz", 28999, 32999, "Snapdragon 870 with WQHD+ 144Hz 7-stage variable refresh rate display.", {"Display": "11\" WQHD+ 144Hz Dolby Vision", "Chip": "Snapdragon 870", "Audio": "Quad Speakers with Dolby Atmos", "Battery": "8840mAh 33W"}, "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Gravity Gray", "Mist Blue"]}])
]
for item in tablets:
    reg_prod("c_electronics", "Tablets and iPads", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["tablet", "ipad", item[0].lower()])

# 1.4 Smartwatches
smartwatches = [
    ("Apple", "Apple Watch Ultra 2 GPS + Cellular", 89900, 94900, "49mm aerospace titanium case, 3000 nits sapphire display, dual GPS.", {"Case": "49mm Titanium", "Display": "3000 nits Always-On OLED", "Water Resistance": "100m water resistant / 40m dive", "Battery": "Up to 72 hrs low power"}, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", [{"name": "Band", "values": ["Alpine Loop Titanium", "Trail Loop Black", "Ocean Band Blue"]}]),
    ("Samsung", "Samsung Galaxy Watch Ultra LTE", 59999, 64999, "Grade 4 Titanium with dual-frequency GPS, BioActive Sensor, 10ATM rating.", {"Case": "47mm Grade 4 Titanium", "Display": "1.5\" Super AMOLED 3000 nits", "Durability": "10ATM + IP68 + MIL-STD-810H", "Battery": "Up to 100 hrs"}, "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Titanium Gray", "Titanium White"]}]),
    ("Garmin", "Garmin Epix Pro Gen 2 Sapphire", 111990, 124990, "Sapphire crystal AMOLED multisport GPS with built-in LED flashlight.", {"Display": "1.4\" AMOLED Always-On", "Flashlight": "Integrated Multi-LED", "Battery": "Up to 31 days smartwatch mode", "Maps": "Preloaded TopoActive maps"}, "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["47mm", "51mm"]}]),
    ("Fossil", "Fossil Gen 6 Touchscreen Smartwatch", 18995, 24995, "Stainless steel with Wear OS, continuous heart rate, SpO2, and rapid charging.", {"Case": "44mm Stainless Steel", "OS": "Wear OS by Google", "Charging": "80% in 30 mins", "Sensors": "Heart Rate, SpO2, Step Counter"}, "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80", [{"name": "Strap", "values": ["Black Silicone", "Brown Leather"]}]),
    ("Amazfit", "Amazfit Cheetah Pro Titanium Running Watch", 29999, 34999, "Titanium bezel, MaxTrack dual-band GPS antenna, AI Zepp Coach for athletes.", {"Bezel": "Premium Titanium Alloy", "GPS": "MaxTrack circularly-polarized GPS", "Display": "1.45\" AMOLED 1000 nits", "Battery": "14 days typical usage"}, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Speed Titanium"]}])
]
for item in smartwatches:
    reg_prod("c_electronics", "Smartwatches", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["smartwatch", item[0].lower(), "fitness"])

# 1.5 Wireless Earbuds and Headphones
audio_gear = [
    ("Sony", "Sony WH-1000XM5 Noise Canceling", 26990, 34990, "Dual processors, 8 mics, Hi-Res wireless audio with LDAC, 30-hour battery.", {"Drivers": "30mm Carbon Fiber Composite", "ANC": "Integrated Processor V1 + QN1", "Battery": "30 hrs with ANC", "Codec": "LDAC, AAC, SBC"}, "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Midnight Black", "Platinum Silver", "Smoky Pink"]}]),
    ("Apple", "Apple AirPods Pro 2 USB-C", 24900, 26900, "Apple H2 chip, 2x noise cancellation, Adaptive Audio, personalized Spatial Audio.", {"Chip": "Apple H2 + U1 in Case", "Features": "Adaptive Audio, Conversation Awareness", "Battery": "6 hrs earbud / 30 hrs with Case", "Rating": "IP54 water/sweat resistant"}, "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80", [{"name": "Case", "values": ["USB-C MagSafe Case"]}]),
    ("Bose", "Bose QuietComfort Ultra Headphones", 35900, 39900, "Bose Immersive Spatial Audio, custom noise cancellation, premium protein leather.", {"Audio": "Bose Immersive Spatial Sound", "Modes": "Quiet, Aware, Immersion", "Battery": "Up to 24 hrs playback", "Microphones": "Beamforming voice array"}, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Black", "White Smoke", "Sandstone"]}]),
    ("Sennheiser", "Sennheiser Momentum 4 Wireless", 24990, 34990, "Audiophile 42mm sound system with phenomenal 60-hour marathon battery life.", {"Transducer": "42mm audiophile dynamic", "Battery": "60 hours ANC on", "Bluetooth": "5.2 with aptX Adaptive", "EQ": "Smart Control sound personalizer"}, "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Matte Black", "Graphite Gray"]}]),
    ("Nothing", "Nothing Ear (a) Hi-Res Yellow", 7999, 9999, "Transparent bubble design, 45dB Smart ANC, Hi-Res LDAC audio certification.", {"Drivers": "11mm custom dynamic driver", "ANC": "45dB adaptive noise cancellation", "Battery": "42.5 hrs with charging case", "Design": "Signature transparent design"}, "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Vibrant Yellow", "Pure White", "Jet Black"]}])
]
for item in audio_gear:
    reg_prod("c_electronics", "Wireless Earbuds and Headphones", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["headphones", "earbuds", item[0].lower(), "audio"])

# 1.6 Bluetooth Speakers
speakers = [
    ("Marshall", "Marshall Stanmore III Bluetooth Speaker", 37999, 41999, "Classic rock 'n' roll brass dials, outward-angled tweeters, dynamic loudness.", {"Amplifiers": "50W Class D woofer + 2x 15W tweeters", "Inputs": "Bluetooth 5.2, 3.5mm AUX, RCA", "Frequency": "45–20,000 Hz", "Controls": "Solid brass analogue knobs"}, "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Vintage Black", "Cream", "Brown"]}]),
    ("JBL", "JBL Charge 5 Waterproof Speaker", 14999, 17999, "IP67 waterproof and dustproof with built-in power bank to charge mobile phones.", {"Output": "30W RMS woofer + 10W tweeter", "Protection": "IP67 Waterproof & Dustproof", "Battery": "20 Hours with 7500mAh bank", "Pairing": "JBL PartyBoost enabled"}, "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Midnight Black", "Squad Camo", "Forest Blue"]}]),
    ("Sonos", "Sonos Era 300 Spatial Audio Speaker", 49999, 54999, "Six acoustic drivers positioned all around to disperse Dolby Atmos spatial sound.", {"Audio": "Dolby Atmos Spatial Audio 6 Drivers", "Connectivity": "WiFi 6, Bluetooth 5.0, AirPlay 2", "Microphones": "Far-field Trueplay tuning", "Control": "Touch and voice control"}, "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Matte Black", "Matte White"]}]),
    ("Harman Kardon", "Harman Kardon Aura Studio 4", 27999, 32999, "Transparent dome with diamond ambient lighting and 360-degree omni sound.", {"Output": "130W RMS with 132mm Subwoofer", "Lighting": "5 Distinct diamond lighting themes", "Sound": "360-degree omnidirectional", "Design": "Transparent dome with recycled fabric"}, "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=800&q=80", [{"name": "Style", "values": ["Diamond Amber Glass"]}]),
    ("Bose", "Bose SoundLink Revolve+ II Bluetooth", 29900, 31900, "True 360 sound with aluminum body, flexible fabric handle, and 17 hours battery.", {"Coverage": "360-degree acoustic deflector", "Durability": "IP55 water and dust resistant", "Battery": "17 hours rechargeable battery", "Handle": "Flexible fabric carry handle"}, "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Triple Black", "Luxe Silver"]}])
]
for item in speakers:
    reg_prod("c_electronics", "Bluetooth Speakers", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["speaker", item[0].lower(), "bluetooth"])

# 1.7 Televisions
tvs = [
    ("LG", "LG 65-inch OLED evo C3 4K Smart TV", 174990, 239990, "Self-lit OLED pixels, alpha9 AI Processor Gen6, 0.1ms response time, 4x HDMI 2.1.", {"Display": "65\" 4K Self-Lit OLED 120Hz", "Chip": "α9 AI Processor 4K Gen6", "Gaming": "0.1ms, G-Sync, FreeSync, 4x HDMI 2.1", "Audio": "Dolby Vision & Dolby Atmos 9.1.2"}, "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80", [{"name": "Screen Size", "values": ["55-inch", "65-inch", "77-inch"]}]),
    ("Sony", "Sony Bravia XR 65 OLED 4K TV", 219990, 279990, "Cognitive Processor XR, Acoustic Surface Audio+ vibrating screen, pure blacks.", {"Display": "65\" 4K HDR XR OLED 120Hz", "Chip": "Cognitive Processor XR", "Audio": "Acoustic Surface Audio+", "OS": "Google TV with Voice Control"}, "https://images.unsplash.com/photo-1577975882846-431adc8c2009?auto=format&fit=crop&w=800&q=80", [{"name": "Screen Size", "values": ["65-inch", "77-inch"]}]),
    ("Samsung", "Samsung 65-inch Neo QLED 4K TV", 149990, 189990, "Quantum Matrix Mini LEDs, NeoSlim bezel, 144Hz refresh rate for flawless gaming.", {"Display": "65\" Neo QLED 4K 144Hz Mini LED", "Chip": "NQ4 AI Gen2 Processor", "Design": "NeoSlim Infinity Design", "Audio": "Object Tracking Sound+"}, "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80", [{"name": "Screen Size", "values": ["55-inch", "65-inch"]}]),
    ("TCL", "TCL 65-inch C755 QD-Mini LED 4K", 89990, 119990, "Quantum Dot Mini LED with 500+ local dimming zones, 144Hz VRR, and ONKYO 2.1 sound.", {"Display": "65\" QD-Mini LED 144Hz VRR", "Brightness": "1300 nits peak brightness", "Audio": "ONKYO 2.1 Subwoofer Sound", "OS": "Google TV with Game Master 2.0"}, "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80", [{"name": "Screen Size", "values": ["65-inch"]}])
]
for item in tvs:
    reg_prod("c_electronics", "Televisions", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["tv", item[0].lower(), "4k", "oled"])

# 1.8 Gaming Consoles
consoles = [
    ("Sony", "PlayStation 5 Slim 1TB Console", 54990, 59990, "Ultra-high-speed 1TB SSD, ray tracing, 4K 120fps, DualSense haptic feedback.", {"Storage": "1TB Custom NVMe SSD", "Performance": "Custom AMD Zen 2 + RDNA 2 10.3 TFLOPS", "Controller": "DualSense with Adaptive Triggers", "Drive": "Ultra HD Blu-ray Disc Edition"}, "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80", [{"name": "Edition", "values": ["Disc Edition 1TB", "Digital Edition 1TB"]}]),
    ("Microsoft", "Xbox Series X 1TB Console", 52990, 55990, "12 teraflops raw graphical performance, DirectX ray tracing, Quick Resume.", {"Performance": "12 TFLOPS 52 CUs RDNA 2", "Storage": "1TB NVMe Velocity Architecture", "Resolution": "True 4K Gaming up to 120FPS", "Compatibility": "Backward compatible 4 generations"}, "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Matte Carbon Black"]}]),
    ("Nintendo", "Nintendo Switch OLED Model", 31999, 34999, "Vibrant 7-inch OLED screen, wide adjustable stand, LAN dock, 64GB storage.", {"Display": "7\" Multi-touch OLED 720p/1080p", "Storage": "64GB Internal (microSD expandable)", "Battery": "4.5 to 9 hours portable play", "Audio": "Enhanced stereo speakers"}, "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["White Joy-Con", "Neon Red & Blue"]}]),
    ("Valve", "Steam Deck OLED 1TB Handheld PC", 68999, 74999, "7.4-inch 90Hz HDR OLED, custom AMD APU, anti-glare etched glass, 1TB SSD.", {"Display": "7.4\" 90Hz HDR OLED 1000 nits", "Chip": "6nm AMD Sephiroth APU", "Storage": "1TB High-speed NVMe SSD", "Battery": "Up to 12 hours play"}, "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", [{"name": "Storage", "values": ["512GB OLED", "1TB OLED Etched"]}]),
    ("ASUS", "ASUS ROG Ally X Handheld Gaming PC", 89990, 94990, "AMD Ryzen Z1 Extreme, 24GB LPDDR5X RAM, 1TB SSD, 80Wh double-sized battery.", {"Processor": "AMD Ryzen Z1 Extreme 8c/16t", "Display": "7\" FHD 120Hz 500 nits FreeSync", "RAM": "24GB LPDDR5X-7500", "Battery": "80Wh capacity"}, "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Stealth Black"]}])
]
for item in consoles:
    reg_prod("c_electronics", "Gaming Consoles", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["gaming", "console", item[0].lower()])

# 1.9 Cameras
cameras = [
    ("Sony", "Sony Alpha A7 IV Full-Frame Camera", 209990, 242990, "33MP Exmor R sensor, BIONZ XR, 4K 60p 10-bit 4:2:2, AI Real-Time Eye AF.", {"Sensor": "33MP Full-Frame Exmor R CMOS", "Autofocus": "759 phase-detection points with AI", "Video": "4K 60p 10-bit 4:2:2 internal", "IBIS": "5-axis 5.5-step in-body stabilization"}, "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80", [{"name": "Kit", "values": ["Body Only", "With 28-70mm Lens"]}]),
    ("Canon", "Canon EOS R6 Mark II Mirrorless", 215995, 243995, "24.2MP full-frame, 40fps electronic burst, 6K oversampled 4K 60p, Dual Pixel AF II.", {"Sensor": "24.2MP Full-Frame CMOS", "Speed": "Up to 40 fps electronic shutter", "Autofocus": "Dual Pixel CMOS AF II", "Stabilization": "Up to 8 stops coordinated IBIS"}, "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80", [{"name": "Kit", "values": ["Body Only", "With RF 24-105mm Lens"]}]),
    ("Fujifilm", "Fujifilm X-T5 Mirrorless Camera", 169999, 189999, "40.2MP X-Trans CMOS 5 HR, dedicated analog dials, 19 film simulation modes.", {"Sensor": "40.2MP APS-C X-Trans CMOS 5 HR", "Modes": "19 Legendary Film Simulations", "Video": "6.2K 30p 10-bit internal", "Stabilization": "7.0-stop in-body stabilization"}, "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Silver Vintage", "Black Classic"]}]),
    ("Nikon", "Nikon Z6 III Full-Frame Camera", 239990, 259990, "World's first partially-stacked CMOS sensor with 6K 60p N-RAW video recording.", {"Sensor": "24.5MP Partially-Stacked CMOS", "Video": "6K 60p N-RAW & 4K 120p", "EVF": "Ultra-bright 4000 nits 5.76M-dot EVF", "Burst": "Up to 120 fps continuous shooting"}, "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80", [{"name": "Kit", "values": ["Body Only", "With Z 24-70mm f/4 S Lens"]}])
]
for item in cameras:
    reg_prod("c_electronics", "Cameras", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["camera", item[0].lower(), "photography"])

# 1.10 Computer Accessories & Peripherals
accessories = [
    ("Logitech", "Logitech MX Master 3S Wireless Mouse", 8995, 10995, "Quiet clicks, 8000 DPI track-on-glass, MagSpeed electromagnetic scroll wheel.", {"Sensor": "8000 DPI Darkfield track-on-glass", "Scroll": "MagSpeed scrolls 1,000 lines/sec", "Battery": "70 days battery on full charge", "Connection": "Bluetooth + Logi Bolt USB"}, "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Graphite Black", "Pale Gray"]}]),
    ("Keychron", "Keychron Q1 Pro Custom Mechanical Keyboard", 18499, 20999, "CNC aluminum body, double-gasket acoustic structure, hot-swappable switches.", {"Frame": "Full CNC Machined Aluminum", "Structure": "Double-Gasket acoustic mount", "Switches": "Hot-swappable Keychron K Pro", "Keycaps": "KSA Double-shot PBT keycaps"}, "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80", [{"name": "Switch Type", "values": ["K Pro Red Linear", "K Pro Brown Tactile"]}]),
    ("Apple", "Apple Magic Keyboard with Touch ID & Numeric Keypad", 17500, 19500, "Wireless Bluetooth keyboard with integrated Touch ID sensor and scissor key travel.", {"Features": "Touch ID biometric sensor", "Layout": "Extended layout with numeric keypad", "Connectivity": "Bluetooth, Lightning/USB-C charging", "Material": "Woven braided cable included"}, "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["White Keys with Silver", "Black Keys with Space Black"]}]),
    ("Razer", "Razer DeathAdder V3 Pro Esports Mouse", 12999, 14999, "63g ultra-lightweight ergonomic mouse with Focus Pro 30K Optical Sensor.", {"Sensor": "Focus Pro 30K Optical Sensor", "Weight": "63 grams ultra-lightweight", "Switches": "Gen-3 Optical Mouse Switches 90M clicks", "Battery": "Up to 90 hours continuous play"}, "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Classic Black", "Mercury White"]}]),
    ("Dell", "Dell UltraSharp 32-inch 4K Monitor U3223QE", 72990, 86990, "IPS Black technology with 2000:1 contrast, 98% DCI-P3, 90W USB-C Hub with RJ45.", {"Panel": "31.5\" 4K IPS Black 3840x2160", "Contrast": "2000:1 contrast ratio", "Hub": "USB-C 90W PD + RJ45 Ethernet", "Color": "98% DCI-P3, Delta E < 2"}, "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80", [{"name": "Stand", "values": ["Height-Adjustable Stand"]}]),
    ("Apple", "Apple Studio Display 27 5K Retina", 159900, 169900, "27-inch 5K Retina display, 12MP Ultra Wide camera with Center Stage, 6-speaker audio.", {"Display": "27\" 5K Retina 5120x2880 600 nits", "Camera": "12MP Ultra Wide with Center Stage", "Speakers": "Studio-quality 6-speaker system", "Ports": "One Thunderbolt 3 + 3 USB-C ports"}, "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80", [{"name": "Stand", "values": ["Tilt-Adjustable Stand"]}]),
    ("HP", "HP Smart Tank 580 All-in-One Printer", 13999, 16999, "Refillable ink tank printer with up to 12,000 black pages ink in box and smart Wi-Fi.", {"Functions": "Print, Scan, Copy", "Yield": "Up to 12,000 black / 6,000 color pages", "Connectivity": "Self-healing Dual Band Wi-Fi", "Speed": "Up to 12 ppm black"}, "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80", [{"name": "Model", "values": ["Tank 580"]}]),
    ("Canon", "Canon PIXMA G3020 All-in-One InkTank", 14499, 17499, "High-volume color printing with replaceable maintenance cartridge and wireless support.", {"Functions": "Print, Scan, Copy", "Page Yield": "7,700 color / 6,000 black pages", "Cartridge": "User-replaceable maintenance box", "Mobile": "Canon PRINT Inkjet app enabled"}, "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Navy Blue", "Classic Black"]}]),
    ("Anker", "Anker Prime 200W GaN Charging Station", 12999, 14999, "Ultra-compact 6-port desktop charging station with GaNPrime power distribution.", {"Output": "200W Total Maximum Output", "Ports": "4x USB-C + 2x USB-A ports", "Safety": "ActiveShield 2.0 temperature sensor", "Size": "Ultra-compact desktop form factor"}, "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Space Black", "Silver Gray"]}]),
    ("Belkin", "Belkin BoostCharge Pro 3-in-1 MagSafe", 14999, 16999, "Fast wireless charging for iPhone 15/16, Apple Watch Ultra, and AirPods simultaneously.", {"Compatibility": "Official 15W MagSafe Fast Charging", "Stations": "iPhone 15W + Apple Watch Fast + AirPods 5W", "Design": "Architectural stainless steel tree stand", "Power": "Includes AC wall adapter"}, "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Black Chrome", "Pure White"]}])
]
for item in accessories:
    reg_prod("c_electronics", "Computer Accessories", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["accessories", item[0].lower(), "peripherals"])

# ==========================================
# 2. FASHION AND CLOTHING (18 Subcategories)
# ==========================================

# 2.1 Men's T-Shirts & Shirts
fashion_tops_men = [
    ("Lumen Atelier", "Heavyweight Supima Cotton Minimalist Tee", 2499, 2999, "Crafted from 280gsm American long-staple Supima cotton with pre-washed softened drape.", {"Material": "100% Long-Staple Supima Cotton", "Weight": "280 GSM Heavyweight Jersey", "Fit": "Relaxed architectural boxy fit", "Care": "Machine wash cold gentle"}, "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["S", "M", "L", "XL"]}, {"name": "Color", "values": ["Oatmeal Heather", "Midnight Ash", "Chalk White"]}]),
    ("Lumen Atelier", "Normandy Raw Unbleached Linen Crewneck", 3499, 3999, "Spun from raw Normandy flax fibers for breathable thermal regulation and natural organic slub.", {"Material": "100% Pure Normandy Flax Linen", "Texture": "Natural organic slub weave", "Origin": "Woven in northern France", "Cut": "Classic crewneck with reinforced collar"}, "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["S", "M", "L", "XL"]}, {"name": "Color", "values": ["Natural Flax", "Washed Slate"]}]),
    ("Lumen Atelier", "Normandy Pure Raw Linen Overshirt", 6499, 7499, "Heavyweight 340gsm linen overshirt with genuine horn buttons and twin chest patch pockets.", {"Material": "340 GSM Heavyweight French Linen", "Buttons": "Carved natural horn button closures", "Cut": "Relaxed studio overshirt layering cut", "Pockets": "Dual architectural breast pockets"}, "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["S", "M", "L", "XL"]}, {"name": "Color", "values": ["Sand Dune", "Midnight Slate", "Olive Drab"]}]),
    ("Lumen Atelier", "Italian Poplin Tailored Dress Shirt", 5499, 6499, "Woven in Albini mills from two-ply 120s Egyptian Giza cotton with mother-of-pearl buttons.", {"Fabric": "120/2 Two-Ply Italian Poplin", "Collar": "Semi-spread spread collar with removable stays", "Buttons": "Australian Mother-of-Pearl", "Fit": "Tailored slim fit"}, "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80", [{"name": "Collar Size", "values": ["38", "39", "40", "42"]}, {"name": "Color", "values": ["Crisp White", "Sky Blue Stripe"]}]),
    ("Lumen Atelier", "Vintage Oxford Button-Down Shirt", 4299, 4999, "Sturdy 210gsm combed cotton Oxford cloth that softens gracefully with each laundering cycle.", {"Fabric": "100% Combed Heavy Oxford Cloth", "Collar": "Soft rolled button-down collar", "Details": "Box pleat and locker loop at back", "Fit": "Traditional regular fit"}, "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["S", "M", "L", "XL"]}, {"name": "Color", "values": ["Oxford Blue", "Optic White", "Pale Pink"]}]),
    ("Lumen Atelier", "Camp-Collar Mulberry Silk Shirt", 7999, 8999, "Tailored from 22-momme sandwashed mulberry silk with effortless Cuban collar drape.", {"Fabric": "100% Sandwashed Mulberry Silk 22-Momme", "Collar": "Relaxed Cuban camp collar", "Buttons": "Matte smoked shell buttons", "Feel": "Ultra-soft fluid liquid drape"}, "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["S", "M", "L"]}, {"name": "Color", "values": ["Terracotta", "Obsidian Black"]}])
]
for item in fashion_tops_men:
    reg_prod("c_fashion", "Men's T-Shirts", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["fashion", "menswear", "tshirt", "shirt"])

# 2.2 Jeans & Trousers
pants_men = [
    ("Levi's", "Levi's 501 Original Selvedge Denim", 7999, 9999, "The timeless straight leg jean crafted from premium Cone Mills raw redline selvedge denim.", {"Denim": "14 oz Kaihara Japanese Selvedge Denim", "Rise": "Mid rise with signature button fly", "Leg": "Straight leg opening", "Shrinkage": "Sanforized raw indigo"}, "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80", [{"name": "Waist Size", "values": ["30", "32", "34", "36"]}, {"name": "Wash", "values": ["Raw Rigid Indigo", "Light Vintage Wash"]}]),
    ("Nudie Jeans", "Nudie Jeans Lean Dean Organic Comfort", 11999, 13999, "Slim fit tapered leg denim made with 99% certified organic Turkish cotton and 1% elastane.", {"Material": "12.5 oz Organic Comfort Stretch Denim", "Fit": "Slim fit with tapered leg opening", "Details": "Orange stitching on all seams, copper trims", "Certification": "Fairtrade & GOTS certified organic"}, "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80", [{"name": "Waist Size", "values": ["30", "32", "34"]}, {"name": "Inseam", "values": ["32", "34"]}]),
    ("Lumen Atelier", "Tailored Pleated Wool Flannel Trouser", 7499, 8999, "Spun from Super 120s Italian wool flannel with single forward pleats and side waist tab adjusters.", {"Fabric": "100% Super 120s Wool Flannel", "Details": "Forward single pleats & brass side adjusters", "Pockets": "Slash side pockets, jetted back pockets", "Hem": "Unfinished hem for bespoke tailoring"}, "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80", [{"name": "Waist", "values": ["30", "32", "34", "36"]}, {"name": "Color", "values": ["Charcoal Melange", "Warm Camel"]}]),
    ("Lumen Atelier", "Relaxed Japanese Chino Trouser", 4999, 5999, "High-density Japanese cotton twill washed with volcanic pumice stone for a soft broken-in feel.", {"Fabric": "100% Compact Japanese Cotton Twill", "Wash": "Enzyme and volcanic stone washed", "Closure": "Corozo nut button fly", "Fit": "Relaxed tapered silhouette"}, "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80", [{"name": "Waist", "values": ["30", "32", "34"]}, {"name": "Color", "values": ["Khaki Beige", "Olive Green", "Washed Black"]}])
]
for item in pants_men:
    reg_prod("c_fashion", "Jeans", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["fashion", "menswear", "jeans", "trousers"])

# 2.3 Jackets, Hoodies & Suits
outerwear_men = [
    ("Barbour", "Barbour Bedale Waxed Cotton Jacket", 28999, 32999, "Iconic British thornproof waxed cotton jacket with sit-down corduroy collar and tartan lining.", {"Outer": "6oz Sylkoil Waxed Cotton", "Collar": "Pure Cotton Corduroy studded for optional hood", "Pockets": "Two large bellow pockets & moleskin handwarmers", "Origin": "Crafted in South Shields, England"}, "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["38", "40", "42", "44"]}, {"name": "Color", "values": ["Sage Green", "Rustic Brown"]}]),
    ("Schott NYC", "Schott NYC Classic Leather Moto Jacket", 64999, 74999, "Heavyweight steerhide leather motorcycle jacket with asymmetric zipper and bi-swing back.", {"Leather": "100% Heavyweight Full-Grain Steerhide", "Hardware": "Chrome plated brass zippers and snap closures", "Lining": "Quilted insulated nylon body lining", "Cut": "Athletic rider cut with kidney extension"}, "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=800&q=80", [{"name": "Chest", "values": ["38", "40", "42", "44"]}, {"name": "Color", "values": ["Black Aniline Leather"]}]),
    ("Lumen Atelier", "Heavyweight 450gsm French Terry Hoodie", 4499, 5499, "Zero polyester. Pure heavyweight combed cotton loops with double-layered hood and rib cuffs.", {"Fabric": "450 GSM 100% Combed Cotton French Terry", "Hood": "Double-layered sculptural hood without drawstrings", "Seams": "Flatlock seam stitching across all stress points", "Fit": "Boxy drop-shoulder aesthetic"}, "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["S", "M", "L", "XL"]}, {"name": "Color", "values": ["Heather Grey", "Vintage Black", "Dune Sand"]}]),
    ("Lumen Atelier", "Super 130s Merino Wool Two-Piece Suit", 24999, 29999, "Tailored from Italian Vitale Barberis Canonico cloth with half-canvas chest construction.", {"Jacket": "Single-breasted 2-button with notch lapel & horn buttons", "Trouser": "Flat front with internal shirt-gripping waistband", "Cloth": "100% Super 130s Pure Australian Merino Wool", "Lining": "Cupro Bemberg breathable silk-like lining"}, "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["38R", "40R", "42R", "44R"]}, {"name": "Color", "values": ["Navy Pinstripe", "Charcoal Solid"]}])
]
for item in outerwear_men:
    reg_prod("c_fashion", "Jackets", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["fashion", "menswear", "jackets", "suits"])

# 2.4 Women's Ethnic: Kurtis & Sarees
womens_ethnic = [
    ("Lumen Atelier", "Chanderi Silk Zari Embroidered Long Kurti", 6999, 8499, "Handwoven pure Chanderi silk with delicate golden zari booti embroidery and silk lining.", {"Fabric": "Pure Chanderi Silk with Cotton Mulmul lining", "Weave": "Handloom with fine gold tissue borders", "Neckline": "Keyhole neckline with potli button accents", "Length": "Calf length straight silhouette"}, "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["XS", "S", "M", "L", "XL"]}, {"name": "Color", "values": ["Dusty Rose", "Emerald Green", "Ivory Gold"]}]),
    ("Lumen Atelier", "Hand-Block Bagru Printed Anarkali Kurta", 4999, 5999, "Crafted in Rajasthan using natural vegetable indigo and madder dyes on breathable 60s count cambric.", {"Material": "100% Organic Cotton Cambric 60s Count", "Print": "Traditional Dabu wooden hand-block print", "Flare": "Generous 3.5 meter flared kalidar silhouette", "Wash": "Dry clean recommended for first cycle"}, "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["S", "M", "L", "XL"]}, {"name": "Color", "values": ["Indigo & Rust"]}]),
    ("Lumen Atelier", "Banarasi Pure Katan Silk Handloom Saree", 28999, 34999, "Handwoven in Varanasi over 45 days. Pure silk katan body adorned with intricate kadwa floral zari jaal.", {"Silk Mark": "Certified Silk Mark Guarantee", "Zari": "Tested pure silver-gilt zari threads", "Pallu": "Elaborate traditional shikargah motif pallu", "Length": "6.5 meters inclusive of unstitched blouse piece"}, "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Royal Vermilion Red", "Peacock Midnight Blue", "Rani Magenta"]}]),
    ("Lumen Atelier", "Kanjivaram Pure Mulberry Zari Silk Saree", 32999, 39999, "Heavyweight Korvai handloom weaving from Tamil Nadu featuring temple borders and pure gold zari.", {"Weave": "Authentic Korvai interlocking border technique", "Weight": "Heavy 850 grams pure mulberry silk", "Zari": "Traditional 3-ply twisted silver zari with gold wash", "Occasion": "Bridal, festive, and heirloom collection"}, "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Mustard & Crimson Border", "Deep Violet & Antique Gold"]}])
]
for item in womens_ethnic:
    reg_prod("c_fashion", "Sarees", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["fashion", "womenswear", "saree", "ethnic", "handloom"])

# 2.5 Women's Dresses, Tops & Western
womens_western = [
    ("Lumen Atelier", "Pure Silk Charmeuse Bias Maxi Dress", 9499, 11499, "Cut on the bias from 19-momme silk charmeuse that skims the silhouette with liquid luminescence.", {"Fabric": "100% Pure Mulberry Silk Charmeuse", "Cut": "True bias cut with gentle fluted hemline", "Straps": "Adjustable delicate spaghetti straps", "Back": "Subtle low scoop back design"}, "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["XS", "S", "M", "L"]}, {"name": "Color", "values": ["Champagne Gold", "Olive Drab", "Midnight Black"]}]),
    ("Lumen Atelier", "Tiered French Linen Midi Sun Dress", 5999, 6999, "Pre-washed breathable Normandy linen dress with fitted smocked bodice and tiered sweeping skirt.", {"Material": "100% Certified French Normandy Linen", "Bodice": "Elasticated smocked bodice with comfortable stretch", "Pockets": "Two hidden on-seam side pockets", "Length": "Midi length below the knee"}, "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["XS", "S", "M", "L"]}, {"name": "Color", "values": ["Terracotta Rust", "Chalk White"]}]),
    ("Lumen Atelier", "High-Rise Wide-Leg Vintage Wash Denim", 4499, 5499, "Structured 13oz ring-spun denim with fitted contoured waist that opens to a dramatic 70s wide leg.", {"Denim": "100% Ring-Spun Cotton 13oz Rigid", "Rise": "Super high-rise 12.5 inch front rise", "Leg": "Dramatic wide-leg silhouette with clean hem", "Hardware": "Antiqued brass rivets and button closure"}, "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80", [{"name": "Waist Size", "values": ["26", "28", "30", "32"]}, {"name": "Wash", "values": ["Vintage Stone Indigo", "Ecru Natural"]}]),
    ("Lumen Atelier", "Mulberry Silk Georgette Tie-Neck Blouse", 6499, 7499, "Semi-sheer silk georgette blouse featuring an integrated pussy-bow necktie and gathered pearl cuffs.", {"Fabric": "100% Mulberry Silk Georgette", "Neck": "Versatile tie collar worn bowed or draped loose", "Sleeve": "Blouson sleeve with mother-of-pearl buttons", "Transparency": "Delicate ethereal semi-sheer texture"}, "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["S", "M", "L"]}, {"name": "Color", "values": ["Ivory Cream", "Smoky Plum"]}])
]
for item in womens_western:
    reg_prod("c_fashion", "Women's Dresses", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["fashion", "womenswear", "dresses", "denim"])

# 2.6 Shoes, Watches, Bags & Sunglasses
shoes_accessories = [
    ("Common Projects", "Common Projects Original Achilles Low", 28990, 34990, "Minimalist Italian leather sneaker with gold foil stamped serial number and vulcanized rubber sole.", {"Leather": "Supple Italian Nappa Leather upper and lining", "Sole": "Stitched Margom rubber cupsole", "Stamp": "Signature gold foil style, size and color code", "Origin": "Artisanal bench-crafted in Italy"}, "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80", [{"name": "EU Size", "values": ["40", "41", "42", "43", "44"]}, {"name": "Color", "values": ["Triple White", "Matte Black"]}]),
    ("Nike", "Nike Air Jordan 1 Retro High OG", 16995, 19995, "Iconic silhouette featuring premium full-grain leather, encapsulated Air-Sole cushioning.", {"Upper": "Full-grain leather with perforations at toe", "Cushioning": "Encapsulated Nike Air unit in the heel", "Tread": "Solid rubber outsole with deep flex grooves", "Logo": "Embossed Jordan Wings emblem at collar"}, "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80", [{"name": "US Size", "values": ["8", "9", "10", "11"]}, {"name": "Colorway", "values": ["Chicago Lost & Found", "Shadow 2.0"]}]),
    ("Birkenstock", "Birkenstock Boston Oiled Suede Clogs", 12990, 14990, "Legendary anatomical cork-latex footbed with adjustable brass pin buckle strap and soft suede upper.", {"Upper": "Thick oiled leather and velour suede", "Footbed": "Anatomically shaped cork and natural latex", "Insole": "Suede footbed lining absorbs moisture", "Outsole": "Lightweight shock-absorbing EVA"}, "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80", [{"name": "EU Size", "values": ["40", "41", "42", "43"]}, {"name": "Color", "values": ["Taupe Suede", "Habana Oiled Leather"]}]),
    ("Rolex", "Rolex Submariner Date 41mm Oystersteel", 890000, 950000, "The archetype of the diver watch. Unidirectional Cerachrom bezel, 300m waterproofness, Calibre 3235.", {"Case": "41mm Oystersteel 904L alloy", "Bezel": "Unidirectional 60-minute Cerachrom ceramic", "Movement": "Rolex Calibre 3235 Perpetual with 70-hr power reserve", "Water Resistance": "300 meters / 1,000 feet with Triplock crown"}, "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80", [{"name": "Dial", "values": ["Black Ceramic Bezel", "Green Kermit Bezel"]}]),
    ("Omega", "Omega Speedmaster Professional Moonwatch", 640000, 690000, "The watch worn on the Moon. Calibre 3861 Co-Axial Master Chronometer with hesalite crystal.", {"Case": "42mm Stainless Steel with dot over 90 bezel", "Crystal": "Hesalite crystal with embossed OMEGA logo", "Movement": "OMEGA Co-Axial Master Chronometer Calibre 3861", "Magnetic Resistance": "Resistant to fields up to 15,000 gauss"}, "https://images.unsplash.com/photo-1547996160-71dfabb1a7b4?auto=format&fit=crop&w=800&q=80", [{"name": "Bracelet", "values": ["Brushed Steel Bracelet", "Coated Nylon Fabric Strap"]}]),
    ("Cartier", "Cartier Tank Must Large Model Leather", 295000, 320000, "Iconic Art Deco rectangular design with blued-steel sword hands and sapphire cabochon crown.", {"Case": "33.7mm x 25.5mm Polished Stainless Steel", "Crown": "Beaded crown set with synthetic cabochon spinel", "Strap": "Interchangeable black grained calfskin strap", "Movement": "High autonomy quartz movement (up to 8 years)"}, "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80", [{"name": "Strap", "values": ["Black Grained Calfskin", "Burgundy Alligator Embossed"]}]),
    ("Lumen Atelier", "Italian Vegetable-Tanned Leather Weekender", 18999, 22999, "Handcrafted in Florence from 2.5mm full-grain Tuscan vacchetta leather with solid brass hardware.", {"Leather": "100% Full-Grain Vegetable-Tanned Tuscan Vacchetta", "Hardware": "Solid antiqued brass YKK Excella zippers", "Dimensions": "52cm x 30cm x 26cm (TSA carry-on approved)", "Interior": "Reinforced herringbone cotton canvas lining"}, "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Cognac Tan", "Espresso Brown", "Nero Black"]}]),
    ("Persol", "Persol 714 Series Foldable Polarized Sunglasses", 24500, 28500, "The original folding sunglasses made famous by Steve McQueen. Handcrafted in Italy with Meflecto temples.", {"Frame": "Handmade Italian Havana Acetate with 10 hinges", "Lenses": "Crystal tempered Barberini polarized blue lenses", "Technology": "Patented Meflecto flexible stem system", "Origin": "Artisanal hand-assembled in Lauriano, Italy"}, "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80", [{"name": "Lens Color", "values": ["Polarized Blue Gradient", "Classic Green Polarized"]}])
]
for item in shoes_accessories:
    reg_prod("c_fashion", "Shoes and Sneakers" if "Shoes" in item[1] or "Sneaker" in item[1] or "Clog" in item[1] else "Watches" if "Rolex" in item[1] or "Omega" in item[1] or "Cartier" in item[1] else "Bags" if "Leather" in item[1] else "Sunglasses", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["fashion", "luxury", "footwear", "accessories"])

# ==========================================
# 3. VEHICLES AND AUTOMOTIVE (12 Subcategories)
# Note: Marked as is_vehicle=True where applicable
# ==========================================

# 3.1 Cars & Electric Cars
cars = [
    ("Mercedes-Benz", "Mercedes-Benz C-Class C200 Luxury Sedan", 6185000, 6450000, "Mild-hybrid turbocharged luxury sedan with vertical 11.9-inch portrait infotainment and Burmester 3D sound.", {"Engine": "1.5L 4-Cylinder Turbo with 48V EQ Boost", "Power": "204 bhp & 300 Nm Torque", "Transmission": "9G-TRONIC 9-Speed Automatic", "Top Speed": "246 km/h", "Acceleration": "0-100 km/h in 7.3 secs"}, "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80", [{"name": "Paint", "values": ["Obsidian Black", "Selenite Grey", "Polar White"]}], True, {"model": "C200 Luxury", "fuel_type": "Petrol + 48V Mild Hybrid", "transmission": "9-Speed Automatic", "mileage_range": "16.9 km/l ARAI", "top_speed": "246 km/h", "engine_battery": "1496cc Turbo Petrol"}),
    ("BMW", "BMW 3 Series Gran Limousine M Sport", 6060000, 6300000, "Extended wheelbase offering executive rear legroom, BMW Curved Display with iDrive 8, and TwinPower Turbo.", {"Engine": "2.0L 4-Cylinder TwinPower Turbo Petrol", "Power": "258 bhp & 400 Nm Torque", "Transmission": "8-Speed Steptronic Sport Automatic", "Wheelbase": "Extended 2,961 mm limousine wheelbase"}, "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Portimao Blue", "Carbon Black", "Mineral White"]}], True, {"model": "330Li M Sport", "fuel_type": "Petrol", "transmission": "8-Speed Steptronic", "mileage_range": "15.3 km/l", "top_speed": "250 km/h", "engine_battery": "1998cc TwinPower Turbo"}),
    ("Tesla", "Tesla Model 3 Long Range All-Wheel Drive", 4800000, 5200000, "Dual-motor all-wheel drive electric performance with 629 km WLTP range, acoustic glass, and Autopilot.", {"Motors": "Dual Motor All-Wheel Drive", "Range": "629 km (WLTP estimated)", "Acceleration": "0-100 km/h in 4.4 seconds", "Charging": "Supercharging up to 282 km in 15 minutes"}, "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Stealth Grey", "Pearl White Multi-Coat", "Deep Blue Metallic"]}], True, {"model": "Model 3 Long Range", "fuel_type": "100% Electric", "transmission": "Single Speed Direct Drive", "mileage_range": "629 km per charge", "top_speed": "201 km/h", "engine_battery": "75 kWh Lithium-ion Pack"}),
    ("Hyundai", "Hyundai Ioniq 5 AWD Long Range", 4605000, 4850000, "Parametric Pixel retro-futuristic electric CUV on 800V E-GMP platform with vehicle-to-load charging.", {"Platform": "800V Electric-Global Modular Platform (E-GMP)", "Battery": "72.6 kWh High-Voltage Battery Pack", "Range": "631 km ARAI certified range", "Charging": "10% to 80% charge in 18 minutes (350kW DC)"}, "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Gravity Gold Matte", "Midnight Black Pearl", "Optic White"]}], True, {"model": "Ioniq 5 Long Range AWD", "fuel_type": "100% Electric", "transmission": "Single Speed Reduction Gear", "mileage_range": "631 km ARAI", "top_speed": "185 km/h", "engine_battery": "72.6 kWh Battery Pack"}),
    ("Tata", "Tata Safari Dark Edition Accomplished+", 2699000, 2850000, "Blackstone interior, 10-speaker JBL audio, Level 2 ADAS suite, and panoramic sunroof with mood lighting.", {"Engine": "2.0L Kryotec Turbocharged Diesel", "Power": "170 PS & 350 Nm Torque", "Safety": "7 Airbags + 5-Star Bharat NCAP crash rating", "Seating": "6 or 7 Seater configuration with ventilated seats"}, "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80", [{"name": "Seating", "values": ["6-Seater Captain Seats", "7-Seater Bench"]}], True, {"model": "Safari Dark Accomplished+ AT", "fuel_type": "Diesel", "transmission": "6-Speed Torque Converter AT", "mileage_range": "14.5 km/l", "top_speed": "180 km/h", "engine_battery": "1956cc Kryotec Diesel"})
]
for item in cars:
    reg_prod("c_vehicles", "Cars" if "Tesla" not in item[1] and "Ioniq" not in item[1] else "Electric Cars", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["automotive", "car", item[0].lower()], item[8], item[9])

# 3.2 Motorcycles & Scooters
two_wheelers = [
    ("Royal Enfield", "Royal Enfield Hunter 350 Rebel", 174655, 185000, "Compact urban geometry powered by the smooth 349cc J-series engine with dual-channel ABS.", {"Engine": "349cc Single Cylinder J-Series Air-Oil Cooled", "Power": "20.2 bhp @ 6100 rpm", "Torque": "27 Nm @ 4000 rpm", "Weight": "181 kg kerb weight with 17-inch alloy wheels"}, "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Rebel Blue", "Rebel Black", "Dapper Grey"]}], True, {"model": "Hunter 350 Rebel", "fuel_type": "Petrol", "transmission": "5-Speed Manual", "mileage_range": "36.2 km/l", "top_speed": "114 km/h", "engine_battery": "349cc J-Series Engine"}),
    ("Triumph", "Triumph Speed 400 Roadster", 234497, 249000, "Liquid-cooled TR-Series engine producing 40PS, 43mm upside-down big piston forks, switchable traction control.", {"Engine": "398.15cc Liquid-Cooled 4-Valve DOHC Single", "Power": "40 PS @ 8000 rpm & 37.5 Nm @ 6500 rpm", "Suspension": "43mm upside down Big Piston forks", "Weight": "176 kg light agile chassis"}, "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Carnival Red", "Caspian Blue", "Phantom Black"]}], True, {"model": "Speed 400", "fuel_type": "Petrol", "transmission": "6-Speed with Assist Clutch", "mileage_range": "30 km/l", "top_speed": "145 km/h", "engine_battery": "398cc TR-Series Engine"}),
    ("Ather", "Ather 450X Gen 3 Pro Electric Scooter", 144999, 159999, "0-40 km/h in 3.3 secs, 3.7 kWh battery with TrueRange 111 km, Google Maps navigation dashboard.", {"Battery": "3.7 kWh Lithium-ion IP67 Battery Pack", "Acceleration": "0 to 40 km/h in 3.3 seconds (Warp Mode)", "TrueRange": "111 km in SmartEco mode", "Display": "7-inch Touchscreen with onboard Google Maps"}, "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Space Grey", "True Red", "Salt Green"]}], True, {"model": "450X Gen 3 (3.7kWh)", "fuel_type": "100% Electric", "transmission": "Belt Drive Automatic", "mileage_range": "111 km TrueRange", "top_speed": "90 km/h", "engine_battery": "3.7 kWh IP67 Battery"}),
    ("Ola", "Ola S1 Pro Gen 2 Electric Scooter", 134999, 149999, "11 kW peak motor power, 195 km certified range, flat floorboard, MoveOS 4 software features.", {"Motor": "Mid-drive IPM motor with 11 kW peak power", "Battery": "4 kWh Lithium-ion Pack", "Range": "195 km ARAI certified range", "Top Speed": "120 km/h hyper mode"}, "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Jet Black", "Matte White", "Amethyst"]}], True, {"model": "S1 Pro Gen 2", "fuel_type": "100% Electric", "transmission": "Hubless Automatic", "mileage_range": "195 km certified", "top_speed": "120 km/h", "engine_battery": "4 kWh Battery"}),
    ("Honda", "Honda Activa 6G Smart Key Deluxe", 82990, 89990, "Silent start with ACG starter, enhanced smart key with anti-theft immobilizer, telescopic suspension.", {"Engine": "109.51cc Fan Cooled 4-Stroke PGM-FI", "Power": "7.79 PS @ 8000 rpm & 8.84 Nm @ 5500 rpm", "Features": "Honda Smart Key with Remote Unlock", "Brakes": "Combi-Brake System (CBS) with Equalizer"}, "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Decent Blue", "Pearl Siren Blue", "Matte Axis Grey"]}], True, {"model": "Activa 6G H-Smart", "fuel_type": "Petrol", "transmission": "V-Matic Automatic", "mileage_range": "50 km/l", "top_speed": "85 km/h", "engine_battery": "109cc PGM-FI Engine"})
]
for item in two_wheelers:
    reg_prod("c_vehicles", "Motorcycles" if "Royal" in item[1] or "Triumph" in item[1] else "Electric Scooters" if "Ather" in item[1] or "Ola" in item[1] else "Scooters", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["automotive", "twowheeler", item[0].lower()], item[8], item[9])

# 3.3 Bicycles, Helmets & Automotive Gear
gear_automotive = [
    ("Trek", "Trek Marlin 7 Gen 3 Mountain Bike", 69999, 76999, "Alpha Silver Aluminum frame with RockShox Judy fork, 1x10 Shimano Deore drivetrain.", {"Frame": "Alpha Silver Aluminum with internal routing", "Fork": "RockShox Judy Silver with hydraulic lockout", "Drivetrain": "Shimano Deore M4100 1x10 speed", "Brakes": "Shimano MT200 hydraulic disc brakes"}, "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80", [{"name": "Frame Size", "values": ["Medium (17.5\")", "Large (19.5\")"]}, {"name": "Wheel Size", "values": ["29-inch"]}]),
    ("Giant", "Giant Escape 3 All-Road Hybrid Bicycle", 39999, 44999, "ALUXX-grade aluminum frame with upright endurance geometry, puncture-resistant 700x38c tyres.", {"Frame": "ALUXX-Grade Aluminum lightweight tubing", "Gears": "Shimano Tourney 21-speed drivetrain", "Tyres": "Giant S-X3 puncture protect 700x38c", "Mounts": "Integrated rack and fender mounts"}, "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80", [{"name": "Frame Size", "values": ["S", "M", "L"]}]),
    ("70mai", "70mai Omni 4K 360-Degree Smart Dashcam", 16999, 19999, "First 360-degree rotating vehicle camera with AI motion detection and night owl vision sensor.", {"Resolution": "Ultra HD 4K 3840x2160 at 60 FPS", "Field of View": "340-degree motorized pan rotation", "Storage": "Built-in 64GB eMMC high endurance memory", "Features": "AI Motion & Collision Detection, Voice Control"}, "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Matte Black", "Red Accent"]}]),
    ("AGV", "AGV K1 S Full-Face Aerodynamic Helmet", 18999, 21999, "ECE 22.06 certified aerodynamic racing helmet with Integrated Ventilation System and anti-scratch visor.", {"Shell": "High-Resistance Thermoplastic Resin shell", "Safety": "ECE 22.06 & DOT certified protection", "Ventilation": "5 front vents and 2 rear extractors", "Weight": "1,500 grams lightweight aerodynamic balance"}, "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80", [{"name": "Helmet Size", "values": ["M", "L", "XL"]}, {"name": "Graphic", "values": ["Matt Black", "Warmup Black/Red"]}]),
    ("Michelin", "Michelin Pilot Sport 5 Dynamic Tyre (225/45 R17)", 11499, 12999, "Dual Sport tread design engineered for longevity, wet braking supremacy, and steering responsiveness.", {"Size": "225/45 R17 94Y XL", "Technology": "Dynamic Response Aramid & Nylon hybrid belt", "Tread": "Dual Sport tread for wet & dry grip", "Rim Protection": "Integrated deep rim protector flange"}, "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80", [{"name": "Quantity", "values": ["Single Tyre", "Set of 4 Tyres"]}]),
    ("Brembo", "Brembo High Performance Sintered Brake Pads", 4999, 5999, "High friction coefficient sintered compound providing immediate bite and fade resistance under high thermal stress.", {"Compound": "Sintered metal friction formulation", "Thermal Range": "0°C to 450°C fade-free operating range", "Compatibility": "Direct OEM caliper replacement", "Application": "High performance street and trackday"}, "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", [{"name": "Fitment", "values": ["Front Axle Set", "Rear Axle Set"]}])
]
for item in gear_automotive:
    reg_prod("c_vehicles", "Bicycles" if "Bike" in item[1] or "Bicycle" in item[1] else "Car Accessories" if "Dashcam" in item[1] else "Helmets" if "Helmet" in item[1] else "Tyres" if "Tyre" in item[1] else "Vehicle Spare Parts", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["automotive", "gear", item[0].lower()])

# ==========================================
# 4. HOME AND KITCHEN (12 Subcategories)
# ==========================================

# 4.1 Appliances: Refrigerators, Washers, AC, Microwaves, Kitchen
appliances = [
    ("Samsung", "Samsung 653L French Door Smart Refrigerator", 112990, 134990, "Convertible 5-in-1 Smart Convertible French Door with Twin Cooling Plus and SpaceMax technology.", {"Capacity": "653 Litres Net Capacity", "Compressor": "Digital Inverter with 20-Year Warranty", "Cooling": "Twin Cooling Plus independent evaporators", "Connectivity": "SmartThings Wi-Fi with AI Energy Mode"}, "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80", [{"name": "Finish", "values": ["Refined Inox Steel", "Black Caviar Glass"]}]),
    ("Bosch", "Bosch Series 6 8kg Front Load Washing Machine", 42990, 51990, "EcoSilence Drive brushless motor, AntiStain technology, 1400 RPM spin speed, ActiveWater Plus.", {"Capacity": "8 kg Wash Load", "Motor": "EcoSilence Drive with 10-year warranty", "Speed": "1400 RPM high spin extraction", "Hygiene": "AllergyPlus wash cycle kills 99.9% germs"}, "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Silver Inox", "White Ceramic"]}]),
    ("Daikin", "Daikin 1.5 Ton 5-Star Triple Display Inverter AC", 45990, 52990, "Dew Clean technology, PM2.5 filter, Triple Display energy monitor, 100% copper condenser.", {"Tonnage": "1.5 Ton (Suitable for 150-180 sq ft)", "Energy Rating": "5 Star ISEER 5.2", "Coil": "100% Grooved Pure Copper Condenser", "Features": "PM2.5 filtration & Coanda airflow technology"}, "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80", [{"name": "Capacity", "values": ["1.5 Ton", "1.0 Ton"]}]),
    ("Panasonic", "Panasonic 27L Convection Microwave Oven", 15490, 18990, "Magic Grill 360-degree heat distribution, 101 auto cook menus, zero-oil air fryer capabilities.", {"Capacity": "27 Litres Stainless Steel Cavity", "Power": "900W Microwave / 1400W Convection Grill", "Features": "Zero Oil Air Fryer & 101 Auto-Cook Pre-sets", "Turntable": "Glass 315mm rotating turntable"}, "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Black Mirror Glass"]}]),
    ("De'Longhi", "De'Longhi Magnifica S Espresso Machine", 52990, 62990, "Bean-to-cup automated espresso machine with integrated 13-grind conical burr grinder and manual frother.", {"Pressure": "15 Bar Italian High Pressure Pump", "Grinder": "Silent integrated conical steel burr grinder", "Milk": "Manual Cappuccino System steam wand", "Maintenance": "Removable brewing unit for effortless cleaning"}, "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Classic Black & Silver", "Matte White"]}]),
    ("KitchenAid", "KitchenAid Artisan 4.8L Stand Mixer", 54990, 62990, "Full die-cast metal construction with planetary 59-point mixing action and 10 speed settings.", {"Capacity": "4.8 Litre Polished Stainless Steel Bowl", "Construction": "Solid die-cast zinc metal body", "Motion": "Original 59-point planetary mixing action", "Includes": "Flat beater, dough hook, 6-wire whip included"}, "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Empire Red", "Matte Black", "Pistachio Green"]}]),
    ("Dyson", "Dyson V15 Detect Cordless Vacuum Cleaner", 59900, 65900, "Illumination reveals invisible dust, acoustic piezo sensor calculates particle size, 240AW suction.", {"Suction": "240 Air Watts Dyson Hyperdymium Motor", "Filtration": "Fully-sealed 5-stage filtration trapping 99.99%", "Battery": "Up to 60 minutes run time (click-in battery)", "Sensor": "Piezo sensor continuously sizes and counts dust"}, "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80", [{"name": "Edition", "values": ["Detect Absolute Yellow/Iron"]}])
]
for item in appliances:
    reg_prod("c_home_kitchen", "Refrigerators" if "Refrigerator" in item[1] else "Washing Machines" if "Washing" in item[1] else "Air Conditioners" if "AC" in item[1] else "Microwaves" if "Microwave" in item[1] else "Kitchen Appliances", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["home", "appliances", item[0].lower()])

# 4.2 Furniture: Sofas, Beds, Tables, Chairs, Decor, Lighting
furniture = [
    ("Lumen Atelier", "Italian Full-Grain Aniline Leather 3-Seater Sofa", 84999, 99999, "Saddle-stitched cognac aniline leather that develops rich patinas over solid kiln-dried oak frame.", {"Leather": "100% Full-Grain Tuscan Aniline Leather", "Frame": "Kiln-dried European FSC certified oak", "Suspension": "High-resiliency foam with goose feather top", "Dimensions": "220cm W x 92cm D x 74cm H"}, "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80", [{"name": "Leather Shade", "values": ["Cognac Caramel", "Espresso Chocolate", "Nero Black"]}]),
    ("Lumen Atelier", "Solid White American Oak Low Platform Bed", 48999, 58999, "Low-slung minimalist Japanese platform bed with floating cantilevered bedside nightstands.", {"Wood": "Solid Grade-A American White Oak", "Joinery": "Traditional Japanese mortise and tenon joinery", "Slats": "Heavyweight ventilated solid pine wood slats", "Finish": "Zero-VOC natural plant-based hardwax oil"}, "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["King (76\" x 80\")", "Queen (60\" x 80\")"]}]),
    ("Lumen Atelier", "Monolithic Tuscan Travertine Dining Table", 124999, 149999, "Carved from solid Italian travertine stone with bullnose edge and two cylindrical stone pedestals.", {"Stone": "Honest Unfilled Roman Travertine Stone", "Capacity": "Seats 8 to 10 guests comfortably", "Weight": "165 kg monolithic table top + dual pillars", "Sealing": "Treated with invisible penetrating mineral sealer"}, "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80", [{"name": "Dimensions", "values": ["240cm x 100cm (8-Seater)", "280cm x 110cm (10-Seater)"]}]),
    ("Herman Miller", "Eames Lounge Chair & Ottoman in Walnut", 465000, 495000, "The 1956 mid-century icon by Charles and Ray Eames. Molded walnut veneer shells with glove-soft leather.", {"Shells": "7-ply molded wood veneer in Santos Palisander", "Leather": "MCL supple semi-aniline black leather", "Base": "Die-cast aluminum swivel mechanism and glides", "Certificate": "Numbered Certificate of Authenticity by Herman Miller"}, "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80", [{"name": "Wood Shell", "values": ["Walnut Veneer", "Santos Palisander"]}]),
    ("Flos", "Flos Arco Spun Aluminum Arc Floor Lamp", 185000, 210000, "Designed by Achille and Pier Giacomo Castiglioni in 1962. Solid White Carrara marble base with spun dome.", {"Base": "Solid White Carrara Marble block with beveled edges", "Stem": "Telescopic 3-piece stainless steel arc channel", "Shade": "Spun and perforated polished aluminum dome", "Origin": "Authentic piece hand-manufactured in Italy"}, "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80", [{"name": "Version", "values": ["LED Dimmable Modern Edition"]}])
]
for item in furniture:
    reg_prod("c_home_kitchen", "Furniture" if "Sofa" not in item[1] and "Bed" not in item[1] and "Table" not in item[1] and "Chair" not in item[1] and "Lamp" not in item[1] else "Sofas" if "Sofa" in item[1] else "Beds" if "Bed" in item[1] else "Tables" if "Table" in item[1] else "Chairs" if "Chair" in item[1] else "Lighting", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["home", "furniture", item[0].lower()])

# ==========================================
# 5. ADDITIONAL CATEGORIES
# ==========================================

# 5.1 Beauty & Personal Care
beauty = [
    ("Dyson", "Dyson Airwrap Multi-Styler Complete Long", 45900, 49900, "Dry, curl, shape and hide flyaways using the Coanda effect with no extreme heat damage.", {"Technology": "Enhanced Coanda airflow without extreme heat", "Motor": "Dyson digital motor V9 spinning at 110,000 RPM", "Barrels": "Re-engineered barrels that curl in both directions", "Included": "6 styling attachments & Prussian Blue presentation case"}, "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Nickel & Copper", "Strawberry Bronze"]}]),
    ("Le Labo", "Le Labo Santal 33 Eau de Parfum 100ml", 26500, 29000, "Cardamom, iris, violet, and ambrox crackle alongside spicy, leathery, musky Australian sandalwood.", {"Volume": "100 ml / 3.4 fl oz glass flacon", "Concentration": "Eau de Parfum with high essential oil load", "Notes": "Australian sandalwood, cedarwood, cardamom, violet", "Craft": "Compounded with freshly bottled personalized label"}, "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["100ml Bottle", "50ml Travel Bottle"]}]),
    ("Aesop", "Aesop Resurrection Aromatique Hand Care Trio", 7900, 8900, "Mandarin rind, rosemary leaf, and cedar atlas botanicals cleansing and conditioning hands.", {"Set Contains": "Resurrection Hand Wash 500ml + Hand Balm 500ml", "Aroma": "Citrus, woody, herbal apothecary scent", "Packaging": "Signature recycled amber apothecary pump bottles", "Formulation": "Vegan, cruelty-free botanically rich salve"}, "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80", [{"name": "Set", "values": ["500ml Duo with Brass Pump"]}])
]
for item in beauty:
    reg_prod("c_beauty", "Beauty and Personal Care", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["beauty", "fragrance", item[0].lower()])

# 5.2 Health & Fitness Equipment
fitness = [
    ("Peloton", "Peloton Bike+ Immersive Exercise Bike", 195000, 225000, "23.8-inch rotating HD anti-reflective touchscreen, Auto-Follow digital resistance, Apple GymKit.", {"Display": "23.8\" Rotating 360-degree HD Touchscreen", "Resistance": "Digitally controlled magnetic resistance with Auto-Follow", "Audio": "Front-facing 4-channel stereo speakers with woofer", "Metrics": "Real-time output, cadence, resistance & heart rate"}, "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80", [{"name": "Package", "values": ["Bike+ Basics", "Bike+ Ultimate Starter"]}]),
    ("Bowflex", "Bowflex SelectTech 552 Adjustable Dumbbells Pair", 39999, 46999, "Replaces 15 sets of weights. Adjusts from 2.5 kg to 24 kg with the simple turn of a mechanical dial.", {"Weight Range": "2.5 to 24 kg (5 to 52.5 lbs) per dumbbell", "Settings": "15 distinct weight increments on dial", "Trays": "Heavy-duty storage trays included", "Coating": "Durable molding around metal plates for smooth quiet lift"}, "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80", [{"name": "Option", "values": ["Pair of Dumbbells (2x24kg)"]}]),
    ("Theragun", "Theragun PRO Wireless Deep Tissue Massager", 44990, 49990, "Professional-grade percussive therapy reaching 16mm deep into muscle tissue with 60 lbs stall force.", {"Amplitude": "16mm deep tissue percussive amplitude", "Speed": "Customizable 1750-2400 PPM speed range", "Motor": "QuietForce Technology brushless commercial motor", "Battery": "Two swappable lithium-ion batteries (150 mins each)"}, "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Matte Black", "Desert Stone"]}])
]
for item in fitness:
    reg_prod("c_fitness", "Health and Fitness Equipment", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["fitness", "health", item[0].lower()])

# 5.3 Sports & Outdoor
sports = [
    ("SS", "SS Ton Reserve Edition Grade 1 English Willow Cricket Bat", 54999, 64999, "Hand-selected unbleached Grade 1 air-dried English willow with 9-12 straight grains and huge 40mm edges.", {"Willow": "Super Grade 1 Air-Dried English Willow", "Grains": "9 to 12 clear, straight, equidistant grains", "Edges": "Massive 38mm to 40mm contoured edges", "Handle": "Round 12-piece cane handle with rubber cork inserts"}, "https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=800&q=80", [{"name": "Weight", "values": ["2lb 8oz (1140g)", "2lb 9oz (1165g)"]}]),
    ("Yonex", "Yonex Astrox 99 Pro High-Modulus Badminton Racket", 18990, 21990, "Head-heavy power smash weapon developed with Kento Momota using Volume Cut Resin and Namd graphite.", {"Flex": "Extra Stiff for explosive smashes", "Frame": "HM Graphite + Namd + Tungsten + Volume Cut Resin", "Weight / Grip": "3U (88g) G4 / 4U (83g) G5", "String Tension": "Recommended 20-28 lbs"}, "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80", [{"name": "Weight Spec", "values": ["4UG5 (83g)", "3UG4 (88g)"]}]),
    ("Osprey", "Osprey Atmos AG 65 Anti-Gravity Trekking Backpack", 26999, 29999, "Anti-Gravity continuous backpanel suspension system seamlessly contours to your back and hips.", {"Capacity": "65 Litres Volume Load Rating", "Suspension": "Anti-Gravity 3D suspended tensioned mesh", "Fabric": "210D High Tenacity Nylon with PFC-free DWR", "Features": "Integrated raincover and Stow-on-the-Go pole carry"}, "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", [{"name": "Torso Size", "values": ["S/M", "L/XL"]}, {"name": "Color", "values": ["Mythic Blue", "Black Iron"]}])
]
for item in sports:
    reg_prod("c_sports", "Sports and Outdoor", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["sports", "outdoors", item[0].lower()])

# 5.4 Books & Stationery
stationery = [
    ("Montblanc", "Montblanc Meisterstück 149 Gold-Coated Fountain Pen", 78500, 85000, "The icon of writing culture since 1924. Deep black precious resin with hand-ground 18K gold nib.", {"Nib": "Handcrafted Au 750 / 18K gold with rhodium inlay", "Barrel": "Deep black precious resin with gold-coated clip", "Filling": "Piston filling mechanism for bottled ink", "Dimensions": "147.3mm length x 17.3mm diameter"}, "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80", [{"name": "Nib Width", "values": ["Fine (F)", "Medium (M)"]}]),
    ("Midori", "Midori Traveler's Notebook Full-Grain Leather Journal", 4999, 5999, "Vegetable-tanned raw leather cover from Chiang Mai, Thailand that deepens in soul with each voyage.", {"Leather": "Rustic full-grain cowhide leather cover", "Paper": "Refillable MD Paper (bleed-resistant for fountain pens)", "Origin": "Leather made in Thailand, paper crafted in Japan", "Included": "Cotton bag, spare rubber band, blank notebook insert"}, "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80", [{"name": "Leather Shade", "values": ["Camel Tan", "Deep Brown", "Black"]}]),
    ("TASCHEN", "TASCHEN The Ultimate Architecture Atlas Monograph", 14999, 17999, "Over 800 pages detailing the seminal architectural structures of the 20th and 21st century.", {"Format": "Hardcover linen-bound oversized monograph (30 x 40 cm)", "Pages": "824 high-definition archival glossy pages", "Language": "Multilingual English, German, French commentary", "Weight": "6.8 kg monumental coffee table volume"}, "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80", [{"name": "Edition", "values": ["Collector Hardcover Boxed"]}])
]
for item in stationery:
    reg_prod("c_books", "Books and Stationery", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["books", "stationery", item[0].lower()])

# 5.5 Toys & Games
toys = [
    ("LEGO", "LEGO Icons Titanic 10294 Giant Building Set", 62999, 69999, "1:200 scale replica consisting of 9,090 pieces, functional steering gear, cargo cranes, swimming pool.", {"Pieces": "9,090 precision interlocking elements", "Dimensions": "Over 135 cm (53 in.) long and 44 cm high", "Interior": "Divides into 3 cross-sections showing cabins and boilers", "Age": "18+ Adult builder collector challenge"}, "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80", [{"name": "Edition", "values": ["10294 Collector Set"]}]),
    ("DGT", "DGT Smart Electronic Walnut Chessboard", 42999, 49999, "Tournament-size wooden electronic board connecting via Bluetooth/USB to record moves on Chess.com and Lichess.", {"Board": "Handcrafted walnut and maple wood with 55mm squares", "Pieces": "Weighted DGT Timeless wood pieces with embedded sensors", "Compatibility": "Direct integration with Chess.com, Lichess, Fritz", "Connection": "Bluetooth wireless and USB-C connectivity"}, "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80", [{"name": "Wood", "values": ["Walnut & Maple Board"]}]),
    ("DJI", "DJI Mini 4 Pro Drone Fly More Combo", 98990, 109990, "Under 249g folding drone with omnidirectional obstacle sensing, 4K/60fps HDR true vertical video, 20km video transmission.", {"Weight": "Under 249 grams (no FAA/DGCA registration needed in most zones)", "Camera": "1/1.3-inch CMOS with dual native ISO fusion 4K 60fps", "Sensing": "Omnidirectional active obstacle avoidance", "Flight Time": "Up to 34 minutes per battery (3 included)"}, "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80", [{"name": "Remote", "values": ["DJI RC 2 Screen Controller Combo"]}])
]
for item in toys:
    reg_prod("c_toys", "Toys & Games", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["toys", "games", item[0].lower()])

# 5.6 Grocery & Daily Essentials
grocery = [
    ("Blue Tokai", "Blue Tokai Single-Estate Vienna Roast Arabica 1kg", 1850, 2100, "100% specialty grade Arabica beans harvested from the micro-lot altitudes of Attikan Estate, Biligiriranga Hills.", {"Origin": "Attikan Estate, Karnataka, India (Altitude: 1650m)", "Roast": "Vienna Dark Roast (Cocoa, Oak, Caramel notes)", "Grind": "Whole Roasted Beans or Moka Pot grind", "Process": "Washed and sun-dried on raised African beds"}, "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80", [{"name": "Grind Type", "values": ["Whole Coffee Beans", "French Press Grind", "Espresso Fine Grind"]}]),
    ("Lumen Atelier", "Pure Kashmiri Mongra Grade A1 Vacuum Saffron 5g", 2499, 2999, "Hand-harvested in the high-altitude plateau of Pampore, Kashmir. Highest crocin color content and intense aroma.", {"Grade": "Grade A1 Pure Mongra Stigmas Only (No yellow style)", "Origin": "Pampore, Jammu & Kashmir (GI Tag Certified)", "Color Reading": "Exceeds 240+ Crocin coloring strength", "Packaging": "Airtight brass sealed collectible tin"}, "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", [{"name": "Weight", "values": ["5g Tin", "10g Glass Jar"]}]),
    ("Terra Creta", "Terra Creta Organic Extra Virgin Olive Oil PDO 1L", 2199, 2499, "Cold-extracted single-variety Koroneiki olives cultivated organically in Kolymvari, Chania, Crete.", {"Acidity": "Ultra-low acidity (< 0.3%) at time of extraction", "Cultivar": "100% Monovarietal Koroneiki Olives", "Certification": "Protected Designation of Origin (PDO) Crete", "Notes": "Fresh cut grass, green almond, and peppery finish"}, "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80", [{"name": "Bottle Size", "values": ["1 Litre Dark Glass Bottle"]}]),
    ("Makaibari", "Makaibari First Flush Organic Darjeeling Tea 100g", 1499, 1799, "Plucked during the spring equinox from the world's first biodynamic tea estate in the Himalayas.", {"Estate": "Makaibari Estate, Kurseong, Darjeeling", "Flush": "Spring First Flush Silver Tips", "Certifications": "Demeter Biodynamic & USDA Organic", "Flavor": "Crisp muscatel with notes of wild summer peach"}, "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80", [{"name": "Quantity", "values": ["100g Canister", "250g Pouch"]}])
]
for item in grocery:
    reg_prod("c_grocery", "Grocery & Daily Essentials", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["grocery", "gourmet", item[0].lower()])

# 5.7 Travel Accessories
travel = [
    ("Rimowa", "Rimowa Classic Cabin Aluminium 36L Suitcase", 115000, 125000, "High-end anodized aluminum grooved alloy with hand-riveted aluminum corners and Multiwheel ball-bearing system.", {"Shell": "High-grade anodized aluminum alloy", "Dimensions": "55 x 40 x 23 cm (Fits airline overhead cabin)", "Locks": "Dual TSA-approved mechanical combination locks", "Wheels": "Patented Multiwheel system with cushioned axles"}, "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Classic Silver Aluminum", "Matte Black Aluminum"]}]),
    ("Bellroy", "Bellroy Apex Leather Passport Travel Wallet", 14999, 16999, "Precision-molded pre-formed leather with magnetic closures and hidden micro travel pen.", {"Material": "Premium eco-tanned Dutch leather", "Closure": "Single-handed magnetic snap open/close", "Security": "RFID blocking protection for passports & cards", "Includes": "Micro travel pen with refillable ink"}, "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80", [{"name": "Leather Color", "values": ["Onyx Black", "Caramel Tan"]}]),
    ("Tumi", "Tumi Alpha 3 Ballistic Continental Carry-On", 84990, 94990, "Ultra-durable FXT ballistic nylon with dual-access entry to main compartment and built-in USB port.", {"Material": "Patented FXT Ballistic Nylon", "Expansion": "Lever Lock two-stage expansion system up to 2 inches", "Tracking": "Integrated Tumi Tracer metal recovery plate", "Wheels": "Recessed dual-spinning wheels for stability"}, "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", [{"name": "Color", "values": ["Black Chrome Hardware", "Navy Accent"]}])
]
for item in travel:
    reg_prod("c_travel", "Travel Accessories", item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], ["travel", "luggage", item[0].lower()])

# =========================================================================
# SYSTEMATIC FILLER GENERATOR TO BRING THE CATALOG TO EXACTLY 330+ PRODUCTS
# Across all 60+ subcategories
# =========================================================================
extra_definitions = [
    # Electronics subcategories
    ("c_electronics", "Smartphones", [
        ("Realme", "Realme 12 Pro+ 5G Periscope", 29999, 34999, "Submarine-inspired luxury watch dial design with 64MP periscope telephoto camera.", {"Camera": "64MP Periscope + 50MP Sony IMX890", "Display": "120Hz Curved Vision AMOLED", "Design": "Luxury Watch Dial Vegan Leather"}),
        ("Vivo", "Vivo V30 Pro ZEISS Portrait", 41999, 46999, "Slimmest 5000mAh phone with ZEISS Triple 50MP cameras and Smart Aura Light.", {"Camera": "Triple 50MP Sony Sensors", "Thickness": "7.45mm ultra-slim", "Battery": "5000mAh with 80W FlashCharge"}),
        ("Motorola", "Motorola Edge 50 Ultra Pantone Wooden Edition", 59999, 64999, "Real natural wood back panel, Snapdragon 8s Gen 3, and IP68 underwater protection.", {"Back": "Authentic Nordic Wood finish", "Display": "6.7\" 144Hz 1.5K pOLED Pantone Validated", "Charging": "125W TurboPower + 50W Wireless"}),
        ("Nothing", "Nothing Phone (2) Glyph Interface", 36999, 44999, "Transparent back with customizable Glyph LED lighting sequences and Snapdragon 8+ Gen 1.", {"Interface": "Glyph LED notification strips", "Chip": "Snapdragon 8+ Gen 1", "OS": "Nothing OS 2.5 with zero bloatware"}),
        ("Xiaomi", "Redmi Note 13 Pro+ 5G Curved", 31999, 35999, "200MP OIS camera, IP68 water resistance, and 120W HyperCharge in a curved vegan leather body.", {"Camera": "200MP Samsung ISOCELL HP3", "Charging": "120W charges 100% in 19 mins", "Protection": "Corning Gorilla Glass Victus + IP68"})
    ]),
    ("c_electronics", "Laptops", [
        ("MSI", "MSI Stealth 16 AI Studio OLED", 189990, 219990, "Magnesium-aluminum alloy chassis with RTX 4070, Core Ultra 7, and 99.9Wh battery.", {"Display": "16\" 4K 120Hz OLED 100% DCI-P3", "GPU": "NVIDIA GeForce RTX 4070 8GB", "Weight": "1.99 kg thin-and-light"}),
        ("ASUS", "ASUS Zenbook 14 OLED Ultra 7", 109990, 119990, "1.2 kg all-metal featherweight ultrabook with 3K 120Hz ASUS Lumina OLED touchscreen.", {"Display": "14\" 3K 120Hz Lumina OLED Touch", "Processor": "Intel Core Ultra 7 155H", "Battery": "75Wh lasting up to 15 hours"}),
        ("Apple", "Apple MacBook Air 13 M3", 114900, 124900, "Incredible portability, fanless silent operation, 1080p FaceTime HD camera, MagSafe 3.", {"Display": "13.6\" Liquid Retina Display", "Chip": "Apple M3 (8-core CPU, 10-core GPU)", "Weight": "1.24 kg fanless aluminum"}),
        ("Dell", "Dell Inspiron 14 Plus Intel Core Ultra", 89990, 99990, "Military-grade tested chassis, ExpressCharge, and Intel Arc built-in graphics.", {"Display": "14\" 2.2K 300 nits Anti-Glare", "Processor": "Intel Core Ultra 7 155H", "RAM": "16GB LPDDR5X"})
    ]),
    ("c_electronics", "Tablets and iPads", [
        ("Lenovo", "Lenovo Tab P12 Pro with Precision Pen", 34999, 39999, "12.6-inch 2K AMOLED 120Hz display with JBL quad speakers and wireless stylus.", {"Display": "12.6\" 2K AMOLED 120Hz", "Audio": "Quad JBL speakers with Dolby Atmos", "Battery": "10,200mAh with 45W Quick Charge"}),
        ("Apple", "Apple iPad Mini 6 A15 Bionic", 49900, 54900, "Pocketable 8.3-inch Liquid Retina display, Touch ID, USB-C, and Apple Pencil 2 support.", {"Display": "8.3\" Liquid Retina with True Tone", "Chip": "A15 Bionic with Neural Engine", "Camera": "12MP Ultra Wide with Center Stage"})
    ]),
    ("c_electronics", "Smartwatches", [
        ("OnePlus", "OnePlus Watch 2 Dual-Engine Architecture", 24999, 27999, "Wear OS 4 with dual Snapdragon W5 and BES2700 chipsets giving 100 hours battery.", {"OS": "Wear OS by Google + RTOS dual architecture", "Battery": "Up to 100 hours Smart Mode", "Material": "Stainless Steel chassis with Sapphire Crystal"}),
        ("Google", "Google Pixel Watch 2 Polished Silver", 34990, 39990, "Fitbit health tracking with continuous electrodermal activity sensor and heart rate.", {"Case": "100% Recycled Aluminum", "Sensors": "Multi-path heart rate, cEDA, skin temperature", "Integration": "Deep Google & Fitbit ecosystem"})
    ]),
    ("c_electronics", "Wireless Earbuds and Headphones", [
        ("JBL", "JBL Tour Pro 2 Smart Case Touchscreen", 19999, 24999, "World's first smart charging case with 1.45\" LED touchscreen for music and notifications.", {"Case": "1.45\" full-color touch display on case", "Audio": "10mm dynamic drivers with JBL Pro Sound", "ANC": "True Adaptive Noise Cancelling with 4 mics"}),
        ("Marshall", "Marshall Motif II A.N.C. Earbuds", 19999, 22999, "Marshall signature sound in a pocketable pocket case with 30 hours of wireless playtime.", {"Design": "Textured black vinyl vintage finish", "Battery": "30 hours playtime with ANC", "Connection": "Bluetooth LE Audio ready"})
    ]),
    ("c_electronics", "Bluetooth Speakers", [
        ("Bang & Olufsen", "B&O Beosound Explore Outdoor Speaker", 21500, 24500, "Type II anodized aluminum scratch-resistant cylindrical waterproof speaker.", {"Material": "Type II hard-anodized aluminum", "Protection": "IP67 dust and waterproof", "Sound": "True360 omnidirectional acoustic dispersal"}),
        ("Anker", "Soundcore Motion X600 Spatial Hi-Res Speaker", 16999, 19999, "World's first portable high-fidelity speaker with sky-channel spatial audio architecture.", {"Drivers": "5 drivers and 3 amplifiers delivering 50W", "Audio": "Hi-Res Audio Wireless with LDAC", "Design": "Metal grille with integrated curved carry handle"})
    ]),
    ("c_electronics", "Televisions", [
        ("Xiaomi", "Xiaomi 65-inch 4K Ultra HD Smart QLED TV", 59999, 69999, "Quantum Dot panel with Dolby Vision IQ, 30W stereo speakers, and PatchWall+.", {"Display": "65\" 4K QLED 98.8% DCI-P3", "Audio": "30W 6-driver speaker system with Dolby Atmos", "OS": "Google TV with PatchWall UI integration"}),
        ("Hisense", "Hisense 65-inch Mini-LED ULED 144Hz TV", 74999, 89999, "Mini-LED local dimming zones, 144Hz Game Mode Pro, and Filmmaker Mode calibrated.", {"Panel": "65\" Mini-LED ULED with Quantum Dot", "Gaming": "144Hz VRR, AMD FreeSync Premium Pro", "Peak Brightness": "1000 nits high dynamic contrast"})
    ]),
    ("c_electronics", "Gaming Consoles", [
        ("Logitech", "Logitech G CLOUD Gaming Handheld", 34999, 39999, "7-inch 1080p gaming handheld optimized for Xbox Cloud Gaming and GeForce NOW.", {"Display": "7\" 1080p 60Hz IPS touchscreen", "Battery": "Over 12 hours continuous cloud play", "Weight": "463 grams lightweight ergonomic grips"}),
        ("Ayaneo", "AYANEO 2S AMD Ryzen 7 7840U Handheld", 94999, 104999, "Bezel-less front glass with AMD 7840U processing, Hall sensor joysticks and triggers.", {"APU": "AMD Ryzen 7 7840U Zen 4", "Display": "7\" 1920x1200 IPS bezel-less glass", "Controls": "Master controller with Hall sensing sticks"})
    ]),
    ("c_electronics", "Cameras", [
        ("Panasonic", "Panasonic Lumix S5 IIX Full-Frame Mirrorless", 219990, 249990, "Phase Hybrid AF, ProRes internal SSD recording, and 5.8K Apple ProRes RAW output.", {"Autofocus": "779-point Phase Detection AF system", "Video": "ProRes internal 5.8K and live streaming", "Cooling": "Built-in fan for unlimited recording time"}),
        ("DJI", "DJI Osmo Pocket 3 4K Gimbal Camera", 44990, 49990, "1-inch CMOS sensor with 4K 120fps video and 2-inch rotatable OLED touchscreen.", {"Sensor": "1-inch CMOS Sensor with 4K 120fps", "Stabilization": "3-Axis mechanical gimbal stabilization", "Screen": "2-inch rotatable OLED touchscreen display"})
    ]),
    ("c_electronics", "Computer Accessories", [
        ("CalDigit", "CalDigit TS4 Thunderbolt 4 18-Port Dock", 38999, 44999, "The undisputed king of Thunderbolt 4 docking with 18 ports and 98W laptop charging.", {"Ports": "18 versatile ports (3x TB4, 5x USB-A, 3x USB-C)", "Charging": "98W Power Delivery to host laptop", "Displays": "Supports dual 6K 60Hz displays"}),
        ("SanDisk", "SanDisk Extreme PRO 2TB Portable SSD", 19999, 24999, "2000 MB/s read and write speeds encased in forged aluminum chassis with carabiner loop.", {"Speed": "NVMe performance up to 2000MB/s read/write", "Durability": "IP65 water/dust resistance and 3-meter drop protection", "Interface": "USB 3.2 Gen 2x2 Type-C"})
    ]),
    ("c_electronics", "Keyboards and Mouse", [
        ("NuPhy", "NuPhy Air75 V2 Ultra-Slim Wireless Keyboard", 14999, 16999, "Ultra-thin mechanical keyboard with Gateron low-profile switches and QMK/VIA support.", {"Switches": "Gateron Low-Profile 2.0 Mechanical switches", "Keycaps": "Coast PBT dye-sublimated low profile caps", "Battery": "2500mAh with up to 220 hours runtime"}),
        ("SteelSeries", "SteelSeries Apex Pro TKL Mechanical Keyboard", 21999, 24999, "OmniPoint 2.0 adjustable hyper-magnetic switches with 0.1mm to 4.0mm actuation point.", {"Switches": "OmniPoint 2.0 adjustable magnetic switches", "Actuation": "40 levels of per-key actuation adjustments", "OLED": "Smart Display shows gaming stats and Discord alerts"})
    ]),
    ("c_electronics", "Monitors", [
        ("Samsung", "Samsung 49-inch Odyssey OLED G9 Curved", 139990, 169990, "0.03ms response time, 240Hz refresh rate, Dual QHD 32:9 aspect ratio curved OLED.", {"Display": "49\" Curved OLED 5120x1440 240Hz 0.03ms", "Curvature": "1800R curve wraps around vision", "Gaming": "Neo Quantum Processor Pro with FreeSync Premium Pro"}),
        ("BenQ", "BenQ PD3220U 32-inch 4K Designer Monitor", 99990, 114990, "Calman Verified & Pantone Validated 4K monitor with Thunderbolt 3 and Hotkey Puck G2.", {"Display": "31.5\" 4K UHD IPS 100% sRGB & 95% DCI-P3", "Connectivity": "Dual Thunderbolt 3 daisy-chaining with 85W power", "Controls": "Hotkey Puck G2 for instant color space switching"})
    ]),
    ("c_electronics", "Printers", [
        ("Epson", "Epson EcoTank L3250 Wi-Fi All-in-One", 14999, 17999, "Spill-free ink refilling with heat-free printing technology and Wi-Fi Direct support.", {"Yield": "4,500 black / 7,500 color pages per bottle set", "Technology": "Epson Heat-Free Micro Piezo print head", "App": "Epson Smart Panel mobile printing"}),
        ("Brother", "Brother HL-L2321D Compact Laser Printer", 10990, 12990, "Automatic 2-sided duplex printing with fast 30 ppm print speeds and 250-sheet paper tray.", {"Speed": "Up to 30 pages per minute", "Duplex": "Automatic double-sided printing", "Tray": "250-sheet enclosed dust-free paper tray"})
    ]),
    ("c_electronics", "Chargers and Power Banks", [
        ("Baseus", "Baseus Blade 100W Ultra-Thin Laptop Power Bank", 6999, 8999, "Ultra-thin 18mm power bank outputting 100W PD fast charge with digital status display.", {"Capacity": "20,000mAh airline safe capacity", "Power": "100W single port USB-C Power Delivery", "Display": "Digital screen showing time remaining and wattage"}),
        ("Xiaomi", "Xiaomi 50W 20000mAh Power Bank 3 Pro", 3999, 4999, "Triple port output charging laptops, tablets, and phones with 50W max flash charging.", {"Output": "50W MAX Type-C fast charging", "Capacity": "20000mAh high-density lithium polymer", "Ports": "Dual USB-A + One Type-C bidirectional port"})
    ])
]

# Process and register extra items for Electronics
for cat_id, sub_name, prod_list in extra_definitions:
    for brand, title, price, orig_price, desc, specs in prod_list:
        reg_prod(cat_id, sub_name, brand, title, price, orig_price, desc, specs, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", [{"name": "Option", "values": ["Standard", "Pro Pack"]}], ["electronics", sub_name.lower(), brand.lower()])

# Add Fashion extra subcategories
fashion_extras = [
    ("c_fashion", "Trousers", [
        ("Lumen Atelier", "Linen Gurkha Military Trousers", 5499, 6499, "Double pleated British military Gurkha trousers with double buckle crossover waistband.", {"Fabric": "100% Normandy Linen", "Closure": "Double buckle crossover waistband"}),
        ("Zara", "Wide-Leg Flowing Pleated Trousers", 3990, 4590, "Relaxed fit pleated trousers with fluid drape and concealed hook-and-eye fastening.", {"Fit": "Wide leg flowing cut", "Material": "Viscose-wool blended twill"})
    ]),
    ("c_fashion", "Kids' Clothing", [
        ("Lumen Atelier", "Organic Cotton Toddler Ribbed Set", 2199, 2699, "GOTS certified ultra-soft organic cotton waffle knit top and bottoms for infants.", {"Material": "100% GOTS Organic Cotton", "Certification": "OEKO-TEX Standard 100"}),
        ("H&M", "Kids Utility Denim Dungarees", 1999, 2499, "Soft washed denim dungarees with adjustable metal snap suspenders and front pocket.", {"Fabric": "100% Softened Cotton Denim", "Fit": "Relaxed room-to-grow silhouette"}),
        ("Zara", "Kids Merino Wool Knitted Cardigan", 2990, 3490, "Fine 19.5-micron merino wool cardigan with natural wood button fastenings.", {"Material": "100% Extra Fine Merino Wool", "Care": "Hand wash cold gentle"})
    ]),
    ("c_fashion", "Sportswear", [
        ("Nike", "Nike Dri-FIT ADV Aeroswift Singlet", 4295, 4995, "Engineered with advanced sweat-wicking knit fabric tested with elite world runners.", {"Technology": "Dri-FIT ADV moisture management", "Fit": "Slim racing fit with bonded neck seam"}),
        ("Lululemon", "Lululemon Align High-Rise Pant 25", 8900, 9900, "Buttery-soft Nulu fabric delivering weightless coverage and unrestricted freedom.", {"Fabric": "Weightless four-way stretch Nulu fabric", "Features": "Hidden waistband pocket holds a key"}),
        ("Under Armour", "UA HeatGear Compression Long Sleeve", 3499, 3999, "Super-light compression shirt acting as an ergonomic second skin with mesh panels.", {"Fabric": "HeatGear 4-way stretch compression", "Antimicrobial": "Anti-odor technology prevents bacterial growth"})
    ]),
    ("c_fashion", "Sunglasses", [
        ("Ray-Ban", "Ray-Ban Original Wayfarer Classic G-15", 10890, 12890, "The most recognizable sunglasses style in history since 1952 with crystal green G-15 lenses.", {"Lenses": "Crystal Green G-15 absorbing 85% of visible light", "Frame": "Polished Black Acetate with iconic silver rivets"}),
        ("Oliver Peoples", "Oliver Peoples Gregory Peck Vintage Frame", 26500, 29500, "Retro round acetate frame inspired by the optical glasses worn in To Kill a Mockingbird.", {"Design": "Vintage keyhole bridge and custom functional plaque", "Origin": "Handcrafted in Italy with genuine glass lenses"}),
        ("Celine", "Celine Triomphe Oval Acetate Sunglasses", 38000, 42000, "Bold oval sunglasses adorned with the iconic gold-tone metal Parisian Triomphe emblem.", {"Frame": "Glossy Black Acetate with gold-tone hardware", "Protection": "100% UVA and UVB filter tinted lenses"})
    ]),
    ("c_fashion", "Bags", [
        ("Fjallraven", "Fjallraven Kanken No. 2 Leather Trim Backpack", 11999, 13999, "Heavy-duty G-1000 Eco canvas with vegetable-tanned leather handles and seating pad.", {"Fabric": "G-1000 HeavyDuty Eco (65% polyester, 35% cotton)", "Trim": "100% vegetable-tanned leather handles and badge"}),
        ("Bellroy", "Bellroy Tokyo Tote 15L Work Bag", 11900, 13900, "Dedicated padded laptop pocket, pop-out bottle pockets, and water-resistant recycled fabric.", {"Capacity": "15 Litres Volume", "Laptop": "Padded sleeve fits up to 14-inch laptops"})
    ])
]
for cat_id, sub_name, prod_list in fashion_extras:
    for brand, title, price, orig_price, desc, specs in prod_list:
        reg_prod(cat_id, sub_name, brand, title, price, orig_price, desc, specs, "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80", [{"name": "Size", "values": ["S", "M", "L"]}], ["fashion", sub_name.lower(), brand.lower()])

# Add Automotive extra subcategories
automotive_extras = [
    ("c_vehicles", "Cars", [
        ("Mahindra", "Mahindra XUV700 AX7 Luxury AWD", 2649000, 2799000, "2.2L mHawk diesel producing 185PS, Sony 12-speaker 3D audio, Level 2 ADAS suite.", {"Engine": "2.2L Turbo mHawk Diesel", "Transmission": "6-Speed Automatic AWD", "Features": "Dual 10.25\" screens, Sony 3D Sound", "ADAS": "Autonomous Emergency Braking, Lane Keep"}, True, {"model": "XUV700 AX7 L AWD", "fuel_type": "Diesel", "transmission": "6-Speed AT", "mileage_range": "15 km/l", "top_speed": "190 km/h", "engine_battery": "2198cc mHawk Diesel"}),
        ("Hyundai", "Hyundai Tucson 2.0 Signature AWD", 3590000, 3800000, "Parametric jewel grille, 2.0L CRDi diesel with HTRAC all-wheel drive and panoramic sunroof.", {"Engine": "2.0L VGT Diesel 186 PS & 416 Nm", "Drivetrain": "HTRAC All-Wheel Drive with Terrain modes", "Safety": "Hyundai SmartSense Level 2 ADAS"}, True, {"model": "Tucson Signature AWD", "fuel_type": "Diesel", "transmission": "8-Speed Automatic", "mileage_range": "15.38 km/l", "top_speed": "200 km/h", "engine_battery": "1997cc CRDi Diesel"})
    ]),
    ("c_vehicles", "Electric Cars", [
        ("BMW", "BMW i4 eDrive40 M Sport Electric", 7250000, 7600000, "Electric gran coupe with 590 km WLTP range, 340 hp rear-wheel drive, and BMW IconicSounds.", {"Range": "Up to 590 km (WLTP)", "Power": "340 hp & 430 Nm electric torque", "Battery": "83.9 kWh Lithium-ion Pack", "Acceleration": "0-100 km/h in 5.7 seconds"}, True, {"model": "i4 eDrive40", "fuel_type": "100% Electric", "transmission": "Automatic Single-Speed", "mileage_range": "590 km WLTP", "top_speed": "190 km/h", "engine_battery": "83.9 kWh Battery"}),
        ("Tata", "Tata Nexon EV Max Empowered+", 1949000, 2049000, "40.5 kWh battery pack delivering 465 km ARAI range, electronic parking brake, ventilated seats.", {"Range": "465 km ARAI certified", "Motor": "Permanent Magnet Synchronous Motor 143 PS", "Charging": "7.2 kW AC fast charging + 50 kW DC fast", "Safety": "5-Star Global NCAP safety rating"}, True, {"model": "Nexon EV Max", "fuel_type": "100% Electric", "transmission": "Automatic", "mileage_range": "465 km ARAI", "top_speed": "140 km/h", "engine_battery": "40.5 kWh Pack"})
    ]),
    ("c_vehicles", "Motorcycles", [
        ("Ducati", "Ducati Scrambler Icon Dark", 949000, 999000, "803cc Desmodromic L-twin engine, cornering ABS, interchangeable teardrop fuel tank covers.", {"Engine": "803cc L-Twin Desmodromic Air-Cooled", "Power": "73 hp @ 8250 rpm", "Electronics": "Bosch Cornering ABS & Ducati Traction Control", "Weight": "176 kg dry weight"}, True, {"model": "Scrambler Icon Dark", "fuel_type": "Petrol", "transmission": "6-Speed with Slipper Clutch", "mileage_range": "19 km/l", "top_speed": "198 km/h", "engine_battery": "803cc Desmodromic"}),
        ("Harley-Davidson", "Harley-Davidson X440 S", 279500, 299500, "440cc long-stroke single-cylinder engine with deep Harley exhaust note, 38mm inverted forks.", {"Engine": "440cc Air-Oil Cooled Single Cylinder", "Torque": "38 Nm @ 4000 rpm (90% torque at 2000 rpm)", "Features": "TFT Display with Turn-by-Turn Navigation & eSIM", "Lighting": "Full LED headlamp with signature DRL"}, True, {"model": "X440 S", "fuel_type": "Petrol", "transmission": "6-Speed Manual", "mileage_range": "35 km/l", "top_speed": "135 km/h", "engine_battery": "440cc Single Cylinder"}),
        ("BMW", "BMW G 310 R Roadster", 290000, 310000, "Agile 313cc water-cooled single with reverse cylinder design, upside-down gold forks.", {"Engine": "313cc Liquid-Cooled 4-Valve DOHC Single", "Power": "34 hp @ 9250 rpm & 28 Nm @ 7500 rpm", "Throttle": "Ride-by-wire electronic throttle", "Clutch": "Self-boosting anti-hopping slipper clutch"}, True, {"model": "G 310 R", "fuel_type": "Petrol", "transmission": "6-Speed with Slipper Clutch", "mileage_range": "30 km/l", "top_speed": "143 km/h", "engine_battery": "313cc Liquid Cooled"})
    ]),
    ("c_vehicles", "Electric Bicycles", [
        ("EMotorad", "EMotorad E-Rex E-MTB 36V", 38999, 44999, "Hardtail electric mountain bike with 250W high-torque motor and 36V 7.8Ah removable battery.", {"Motor": "250W High-Torque Rear Hub Motor", "Battery": "36V 7.8Ah Removable Lithium-ion with lock", "Range": "Up to 45 km on pedal assist / 35 km on throttle", "Brakes": "Dual mechanical disc brakes with auto cut-off"}),
        ("Hero", "Hero Lectro C8 Smart Electric Cycle", 32999, 36999, "Integrated in-tube battery, 7-speed Shimano gears, 4 riding modes with RFID key lock.", {"Battery": "36V 5.8Ah in-tube concealed battery", "Range": "30 km per charge with pedelec assist", "Frame": "Lightweight alloy 6061 internal routed frame"})
    ]),
    ("c_vehicles", "Bike Accessories", [
        ("RAM Mounts", "RAM Quick-Grip Handlebar Phone Mount", 4999, 5999, "High-strength composite cradle with spring-loaded mechanism and 1-inch rubber ball vibration damper.", {"Compatibility": "Fits smartphones from 4.75\" to 5.75\" height", "Mount": "U-bolt base fits handlebars from 0.5\" to 1.25\" diameter"}),
        ("Rynox", "Rynox Navigator 50L Waterproof Saddlebags", 8450, 9450, "Heavy-duty TPU welded waterproof roll-top saddlebags with heat-resistant exhaust shields.", {"Capacity": "50 Litres combined volume (25L each side)", "Waterproof": "100% seam-sealed waterproof drybag technology"})
    ])
]
for cat_id, sub_name, prod_list in automotive_extras:
    for item in prod_list:
        is_veh = item[6] if len(item) > 6 else False
        v_specs = item[7] if len(item) > 7 else None
        reg_prod(cat_id, sub_name, item[0], item[1], item[2], item[3], item[4], item[5], "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", [{"name": "Option", "values": ["Standard", "Performance Pack"]}], ["automotive", sub_name.lower(), item[0].lower()], is_veh, v_specs)

# Add Home & Kitchen extra subcategories
home_extras = [
    ("c_home_kitchen", "Sofas", [
        ("Lumen Atelier", "Curved Boucle Textured Sectional Lounge", 74999, 89999, "Sculptural organic silhouette wrapped in tactile cream bouclé fabric with high-resilience foam.", {"Fabric": "Heavyweight tactile wool-blend bouclé", "Frame": "FSC-certified kiln-dried solid pine", "Seating": "Dual layer high-density memory foam cushioning"}),
        ("Lumen Atelier", "Danish Minimalist Undyed Wool 3-Seater Couch", 59999, 69999, "Clean mid-century lines with solid turned oak legs and 100% undyed natural wool upholstery.", {"Fabric": "100% Pure Undyed Wool Weave", "Legs": "Solid natural oiled oak conical legs"})
    ]),
    ("c_home_kitchen", "Beds", [
        ("Lumen Atelier", "Belgian Linen Upholstered King Bed Frame", 52999, 62999, "Flanged edge headboard upholstered in natural stonewashed Belgian linen over hardwood frame.", {"Fabric": "100% Pre-Washed Belgian Flax Linen", "Structure": "Solid beechwood internal load-bearing frame"}),
        ("Lumen Atelier", "Japanese Hinoki Cypress Tatami Platform Bed", 64999, 74999, "Aromatic Japanese hinoki cypress platform bed with natural woven rush grass tatami mats.", {"Wood": "Solid Japanese Hinoki Cypress with natural aroma", "Mats": "Two authentic woven igusa rush tatami insets"})
    ]),
    ("c_home_kitchen", "Tables", [
        ("Lumen Atelier", "Solid Walnut Extendable Architectural Table", 78999, 89999, "Solid American black walnut dining table with smooth hidden butterfly leaf expansion.", {"Wood": "100% Solid American Black Walnut", "Mechanism": "Smooth German-engineered butterfly leaf mechanism", "Capacity": "Expands from 6 to 10 guests"})
    ]),
    ("c_home_kitchen", "Chairs", [
        ("Marcel Breuer", "Marcel Breuer Cesca Cane Armchair", 28500, 32500, "The 1928 Bauhaus classic. Cantilevered tubular chrome steel frame with natural woven cane.", {"Frame": "Tubular chrome-plated 25mm steel tubing", "Insert": "Natural machine-woven cane webbing with beechwood frame"}),
        ("Hans Wegner", "Hans Wegner CH24 Wishbone Chair in Beech", 34990, 39990, "Hand-woven paper cord seat over steam-bent solid beechwood frame with signature Y-back.", {"Wood": "FSC-Certified Solid European Beechwood", "Seat": "120 meters of hand-woven durable natural paper cord"})
    ]),
    ("c_home_kitchen", "Home Decoration", [
        ("Lumen Atelier", "Brutalist Travertine Floor Vase", 14999, 17999, "Hand-chiseled from a single block of raw Roman travertine retaining natural geological cavities.", {"Stone": "Solid unpolished Roman Travertine", "Weight": "18.5 kg monolithic structural sculpture"}),
        ("Lumen Atelier", "Cast Sand Bronze Incense Vessel", 8499, 9999, "Heavyweight sand-cast raw bronze vessel with elongated parabolic ash-catching trough.", {"Material": "Solid Sand-Cast Bronze with natural patina", "Finish": "Matures with individual antique luster over time"})
    ]),
    ("c_home_kitchen", "Lighting", [
        ("Artemide", "Artemide Tolomeo Mega Floor Lamp", 68500, 78500, "Architectural cantilevered floor lamp with polished aluminum arms and parchment paper diffuser.", {"Arm": "Fully adjustable cantilevered polished aluminum", "Diffuser": "36cm diameter neutral parchment paper shade"}),
        ("Lumen Atelier", "Hand-Spun Brass Dome Dining Pendant", 18999, 22999, "Solid spun raw brass dome shade casting warm ambient illumination over dining tables.", {"Shade": "Heavy gauge hand-spun solid brass dome 45cm diameter", "Cord": "Braided graphite cloth-covered electrical cord with brass canopy"})
    ])
]
for cat_id, sub_name, prod_list in home_extras:
    for brand, title, price, orig_price, desc, specs in prod_list:
        reg_prod(cat_id, sub_name, brand, title, price, orig_price, desc, specs, "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80", [{"name": "Material", "values": ["Natural", "Dark Finish"]}], ["home", sub_name.lower(), brand.lower()])

# Complete automated filler generator to guarantee at least 330 products
# Let's inspect current count and dynamically fill remaining slots across all subcategories
all_subcats = [
    ("c_electronics", "Smartphones", "Apple", "Smartphones"),
    ("c_electronics", "Smartphones", "Samsung", "Smartphones"),
    ("c_electronics", "Smartphones", "OnePlus", "Smartphones"),
    ("c_electronics", "Smartphones", "Xiaomi", "Smartphones"),
    ("c_electronics", "Smartphones", "Realme", "Smartphones"),
    ("c_electronics", "Smartphones", "Vivo", "Smartphones"),
    ("c_electronics", "Smartphones", "Oppo", "Smartphones"),
    ("c_electronics", "Laptops", "HP", "Laptops"),
    ("c_electronics", "Laptops", "Dell", "Laptops"),
    ("c_electronics", "Laptops", "Lenovo", "Laptops"),
    ("c_electronics", "Laptops", "ASUS", "Laptops"),
    ("c_electronics", "Laptops", "Acer", "Laptops"),
    ("c_electronics", "Laptops", "Apple", "Laptops"),
    ("c_electronics", "Tablets and iPads", "Apple", "Tablets"),
    ("c_electronics", "Tablets and iPads", "Samsung", "Tablets"),
    ("c_electronics", "Smartwatches", "Apple", "Smartwatches"),
    ("c_electronics", "Smartwatches", "Samsung", "Smartwatches"),
    ("c_electronics", "Smartwatches", "Garmin", "Smartwatches"),
    ("c_electronics", "Wireless Earbuds and Headphones", "Sony", "Audio"),
    ("c_electronics", "Wireless Earbuds and Headphones", "Bose", "Audio"),
    ("c_electronics", "Wireless Earbuds and Headphones", "Sennheiser", "Audio"),
    ("c_electronics", "Bluetooth Speakers", "Marshall", "Audio"),
    ("c_electronics", "Bluetooth Speakers", "JBL", "Audio"),
    ("c_electronics", "Televisions", "LG", "Displays"),
    ("c_electronics", "Televisions", "Sony", "Displays"),
    ("c_electronics", "Televisions", "Samsung", "Displays"),
    ("c_electronics", "Gaming Consoles", "Sony", "Gaming"),
    ("c_electronics", "Gaming Consoles", "Microsoft", "Gaming"),
    ("c_electronics", "Cameras", "Canon", "Cameras"),
    ("c_electronics", "Cameras", "Sony", "Cameras"),
    ("c_electronics", "Computer Accessories", "Anker", "Accessories"),
    ("c_electronics", "Keyboards and Mouse", "Logitech", "Peripherals"),
    ("c_electronics", "Monitors", "Dell", "Displays"),
    ("c_electronics", "Printers", "HP", "Printers"),
    ("c_electronics", "Chargers and Power Banks", "Anker", "Chargers"),
    
    # Fashion
    ("c_fashion", "Men's T-Shirts", "Lumen Atelier", "Menswear"),
    ("c_fashion", "Shirts", "Lumen Atelier", "Menswear"),
    ("c_fashion", "Jeans", "Levi's", "Denim"),
    ("c_fashion", "Trousers", "Lumen Atelier", "Tailoring"),
    ("c_fashion", "Jackets", "Barbour", "Outerwear"),
    ("c_fashion", "Hoodies", "Lumen Atelier", "Streetwear"),
    ("c_fashion", "Suits", "Lumen Atelier", "Tailoring"),
    ("c_fashion", "Women's Dresses", "Lumen Atelier", "Womenswear"),
    ("c_fashion", "Kurtis", "Lumen Atelier", "Ethnic"),
    ("c_fashion", "Sarees", "Lumen Atelier", "Ethnic"),
    ("c_fashion", "Tops", "Lumen Atelier", "Womenswear"),
    ("c_fashion", "Women's Jeans", "Levi's", "Denim"),
    ("c_fashion", "Kids' Clothing", "Lumen Atelier", "Kids"),
    ("c_fashion", "Sportswear", "Nike", "Activewear"),
    ("c_fashion", "Shoes and Sneakers", "Nike", "Footwear"),
    ("c_fashion", "Watches", "Rolex", "Horology"),
    ("c_fashion", "Bags", "Lumen Atelier", "Leather"),
    ("c_fashion", "Sunglasses", "Ray-Ban", "Eyewear"),

    # Vehicles
    ("c_vehicles", "Cars", "BMW", "Automotive"),
    ("c_vehicles", "Electric Cars", "Tesla", "Electric Vehicles"),
    ("c_vehicles", "Motorcycles", "Royal Enfield", "Two Wheelers"),
    ("c_vehicles", "Scooters", "Honda", "Two Wheelers"),
    ("c_vehicles", "Electric Scooters", "Ather", "Electric Vehicles"),
    ("c_vehicles", "Bicycles", "Trek", "Cycles"),
    ("c_vehicles", "Electric Bicycles", "EMotorad", "Electric Vehicles"),
    ("c_vehicles", "Car Accessories", "Michelin", "Accessories"),
    ("c_vehicles", "Bike Accessories", "Rynox", "Accessories"),
    ("c_vehicles", "Helmets", "AGV", "Safety"),
    ("c_vehicles", "Tyres", "Michelin", "Automotive"),
    ("c_vehicles", "Vehicle Spare Parts", "Brembo", "Performance"),

    # Home
    ("c_home_kitchen", "Refrigerators", "Samsung", "Major Appliances"),
    ("c_home_kitchen", "Washing Machines", "Bosch", "Major Appliances"),
    ("c_home_kitchen", "Air Conditioners", "Daikin", "Climate"),
    ("c_home_kitchen", "Microwaves", "Panasonic", "Kitchen"),
    ("c_home_kitchen", "Kitchen Appliances", "KitchenAid", "Kitchen"),
    ("c_home_kitchen", "Furniture", "Lumen Atelier", "Living"),
    ("c_home_kitchen", "Sofas", "Lumen Atelier", "Living"),
    ("c_home_kitchen", "Beds", "Lumen Atelier", "Bedroom"),
    ("c_home_kitchen", "Tables", "Lumen Atelier", "Dining"),
    ("c_home_kitchen", "Chairs", "Lumen Atelier", "Seating"),
    ("c_home_kitchen", "Home Decoration", "Lumen Atelier", "Decor"),
    ("c_home_kitchen", "Lighting", "Flos", "Lighting"),

    # Additional
    ("c_beauty", "Beauty and Personal Care", "Aesop", "Skincare"),
    ("c_fitness", "Health and Fitness Equipment", "Bowflex", "Training"),
    ("c_sports", "Sports and Outdoor", "Yonex", "Athletics"),
    ("c_books", "Books and Stationery", "Montblanc", "Writing"),
    ("c_toys", "Toys and Games", "LEGO", "Collectible"),
    ("c_grocery", "Grocery & Daily Essentials", "Blue Tokai", "Gourmet"),
    ("c_travel", "Travel Accessories", "Rimowa", "Luggage")
]

# Curated image banks for diverse categories
category_images = {
    "c_electronics": [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    "c_fashion": [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
    ],
    "c_vehicles": [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80"
    ],
    "c_home_kitchen": [
        "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ],
    "c_beauty": ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"],
    "c_fitness": ["https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"],
    "c_sports": ["https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80"],
    "c_books": ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"],
    "c_toys": ["https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=800&q=80"],
    "c_grocery": ["https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"],
    "c_travel": ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"]
}

# Generate till we reach exactly 330 products
fill_idx = 0
while len(items) < 330:
    cat_spec = all_subcats[fill_idx % len(all_subcats)]
    fill_idx += 1
    c_id, s_name, b_name, tag_type = cat_spec
    
    # Calculate price based on category
    if c_id == "c_vehicles":
        if "Car" in s_name:
            base_price = 1850000 + (fill_idx * 95000) % 2500000
            orig_price = round(base_price * 1.08)
            is_veh = True
            v_specs = {"model": f"{b_name} Series {fill_idx}", "fuel_type": "Hybrid/Petrol", "transmission": "Automatic", "mileage_range": "18.5 km/l", "top_speed": "210 km/h"}
        elif "Cycle" in s_name or "Bicycle" in s_name:
            base_price = 28000 + (fill_idx * 1500) % 45000
            orig_price = round(base_price * 1.15)
            is_veh = False
            v_specs = None
        else:
            base_price = 115000 + (fill_idx * 12000) % 180000
            orig_price = round(base_price * 1.12)
            is_veh = True
            v_specs = {"model": f"{b_name} Edition {fill_idx}", "fuel_type": "Petrol", "transmission": "Manual 5-Speed", "mileage_range": "38 km/l", "top_speed": "125 km/h"}
    elif c_id == "c_electronics":
        base_price = 12999 + (fill_idx * 3400) % 145000
        orig_price = round(base_price * 1.18)
        is_veh = False
        v_specs = None
    elif c_id == "c_fashion":
        base_price = 1999 + (fill_idx * 850) % 18000
        orig_price = round(base_price * 1.25)
        is_veh = False
        v_specs = None
    elif c_id == "c_home_kitchen":
        base_price = 8999 + (fill_idx * 4200) % 85000
        orig_price = round(base_price * 1.15)
        is_veh = False
        v_specs = None
    else:
        base_price = 1299 + (fill_idx * 750) % 25000
        orig_price = round(base_price * 1.20)
        is_veh = False
        v_specs = None

    p_title = f"{b_name} {s_name} Series {fill_idx}"
    p_desc = f"Handcrafted excellence in {s_name}. Engineered with rigorous quality control, ergonomic precision, and enduring material durability for sophisticated daily living."
    p_specs = {"Series": f"Model {fill_idx}", "Standard": "Certified ISO/CE", "Warranty": "2-Year Manufacturer Warranty", "Materiality": "Premium Grade"}
    
    c_imgs = category_images.get(c_id, ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"])
    img = c_imgs[fill_idx % len(c_imgs)]
    
    opts = [{"name": "Variant", "values": ["Standard Edition", "Signature Edition"]}]
    reg_prod(c_id, s_name, b_name, p_title, base_price, orig_price, p_desc, p_specs, img, opts, [tag_type.lower(), s_name.lower(), b_name.lower()], is_veh, v_specs)

print(f"Populate script finished with {len(items)} items")
