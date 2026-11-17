# -*- coding: utf-8 -*-
import json
import re

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

categories = [
    {
        "id": "c_electronics",
        "name": "Electronics",
        "slug": "electronics",
        "description": "Smartphones, laptops, audio systems, wearables, and computing instruments.",
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        "sort_order": 1
    },
    {
        "id": "c_fashion",
        "name": "Fashion & Clothing",
        "slug": "fashion",
        "description": "Tailored menswear, designer kurtis, sarees, athletic streetwear, luxury leather, and accessories.",
        "image_url": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        "sort_order": 2
    },
    {
        "id": "c_vehicles",
        "name": "Vehicles & Automotive",
        "slug": "automotive",
        "description": "Electric cars, performance motorcycles, urban e-scooters, bicycles, and automotive gear.",
        "image_url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        "sort_order": 3
    },
    {
        "id": "c_home_kitchen",
        "name": "Home & Kitchen",
        "slug": "home-kitchen",
        "description": "Architectural furniture, climate appliances, espresso machines, and ambient decor.",
        "image_url": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
        "sort_order": 4
    },
    {
        "id": "c_beauty",
        "name": "Beauty & Personal Care",
        "slug": "beauty-personal-care",
        "description": "Botanical skincare, fine perfumery, haircare technology, and grooming essentials.",
        "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        "sort_order": 5
    },
    {
        "id": "c_fitness",
        "name": "Health & Fitness",
        "slug": "health-fitness",
        "description": "Smart treadmills, ergonomic weights, recovery technology, and training gear.",
        "image_url": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        "sort_order": 6
    },
    {
        "id": "c_sports",
        "name": "Sports & Outdoor",
        "slug": "sports-outdoors",
        "description": "Professional cricket, badminton, trekking, mountaineering, and trail gear.",
        "image_url": "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
        "sort_order": 7
    },
    {
        "id": "c_books",
        "name": "Books & Stationery",
        "slug": "books-stationery",
        "description": "Bespoke notebooks, fountain pens, architectural monographs, and literary classics.",
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
        "sort_order": 8
    },
    {
        "id": "c_toys",
        "name": "Toys & Games",
        "slug": "toys-games",
        "description": "STEM educational kits, mechanical puzzles, artisan board games, and collectible toys.",
        "image_url": "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=800&q=80",
        "sort_order": 9
    },
    {
        "id": "c_grocery",
        "name": "Grocery & Daily Essentials",
        "slug": "grocery-essentials",
        "description": "Single-estate coffees, organic wild honey, cold-pressed olive oils, and artisanal spices.",
        "image_url": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
        "sort_order": 10
    },
    {
        "id": "c_travel",
        "name": "Travel Accessories",
        "slug": "travel-accessories",
        "description": "Polycarbonate luggage, leather weekenders, organizer folios, and noise-canceling kits.",
        "image_url": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
        "sort_order": 11
    }
]

for c in categories:
    c["created_at"] = "2024-01-01T00:00:00.000Z"

cat_map = {c["id"]: c for c in categories}
items = []
prod_counter = 1

def reg_prod(cat_id, subcategory, brand, title, price, orig_price, desc, specs, img_url, options, tags, is_vehicle=False, vehicle_specs=None):
    global prod_counter
    pid = f"prod_{prod_counter:03d}"
    psku = f"LMN-{brand[:3].upper()}-{prod_counter:04d}"
    pslug = slugify(f"{brand} {title} {prod_counter}")
    prod_counter += 1
    
    # Calculate discount
    discount = 0
    if orig_price and orig_price > price:
        discount = round(((orig_price - price) / orig_price) * 100)

    # Build variants from options
    variants = []
    if options:
        opt0 = options[0]
        for val in opt0.get("values", []):
            variants.append({
                "id": f"var_{pid}_{slugify(val)}",
                "product_id": pid,
                "sku": f"{psku}-{val[:3].upper()}",
                "price": price,
                "stock_quantity": 15,
                "option_values": [{"name": opt0["name"], "value": val}]
            })

    # Images
    images = [
        {"id": f"img_{pid}_1", "product_id": pid, "image_url": img_url, "sort_order": 1, "alt_text": title},
        {"id": f"img_{pid}_2", "product_id": pid, "image_url": img_url, "sort_order": 2, "alt_text": f"{title} Angle View"}
    ]

    opt_objs = []
    if options:
        for idx, opt in enumerate(options):
            opt_id = f"opt_{pid}_{idx+1}"
            opt_objs.append({
                "id": opt_id,
                "product_id": pid,
                "name": opt["name"],
                "sort_order": idx + 1,
                "values": [{"id": f"val_{opt_id}_{v_idx+1}", "option_id": opt_id, "value": v, "sort_order": v_idx + 1} for v_idx, v in enumerate(opt.get("values", []))]
            })

    item = {
        "id": pid,
        "title": title,
        "brand": brand,
        "slug": pslug,
        "sku": psku,
        "description": f"<p>{desc}</p>",
        "category_id": cat_id,
        "category": cat_map.get(cat_id),
        "subcategory": subcategory,
        "price": price,
        "sale_price": price if (orig_price and orig_price > price) else None,
        "original_price": orig_price or price,
        "discount_percentage": discount,
        "stock_quantity": 25 if not is_vehicle else 5,
        "track_inventory": True,
        "allow_backorders": False,
        "status": "active",
        "specifications": specs,
        "tags": tags,
        "images": images,
        "options": opt_objs,
        "variants": variants,
        "avg_rating": round(4.6 + (prod_counter % 5) * 0.08, 1),
        "total_reviews": 15 + (prod_counter * 3) % 150,
        "is_vehicle": is_vehicle,
        "vehicle_specs": vehicle_specs,
        "created_at": "2024-06-01T10:00:00.000Z",
        "updated_at": "2024-06-01T10:00:00.000Z"
    }
    items.append(item)

# Build subcategory generators
exec(open("scripts/populate_catalog_data.py", encoding="utf-8").read())

print(f"Successfully generated {len(items)} products!")

# Write TypeScript file
with open("lib/expandedProducts.ts", "w", encoding="utf-8") as f:
    f.write("// AUTO-GENERATED EXPANDED PRODUCT CATALOG WITH 300+ REALISTIC PRODUCTS\n")
    f.write("import { Product, Category } from '@/types';\n\n")
    f.write("export const expandedCategories: Category[] = " + json.dumps(categories, indent=2) + ";\n\n")
    f.write("export const expandedProducts: Product[] = " + json.dumps(items, indent=2) + ";\n")

print("Wrote lib/expandedProducts.ts")

# Write PostgreSQL seed file
with open("supabase/seed_catalog.sql", "w", encoding="utf-8") as f:
    f.write("-- ====================================================================\n")
    f.write("-- LUMEN ATELIER 300+ MULTI-CATEGORY CATALOG DATABASE SEED SCRIPT\n")
    f.write("-- ====================================================================\n\n")
    
    # Categories
    for c in categories:
        desc_escaped = c['description'].replace("'", "''")
        name_escaped = c['name'].replace("'", "''")
        f.write(f"INSERT INTO categories (id, name, slug, description, image_url, sort_order) VALUES ('{c['id']}', '{name_escaped}', '{c['slug']}', '{desc_escaped}', '{c['image_url']}', {c['sort_order']}) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, image_url = EXCLUDED.image_url;\n")
    f.write("\n")

    # Products
    for p in items:
        t_esc = p['title'].replace("'", "''")
        d_esc = p['description'].replace("'", "''")
        brand_esc = p['brand'].replace("'", "''")
        sub_esc = p['subcategory'].replace("'", "''")
        tags_arr = "{" + ",".join([f'"{t}"' for t in p['tags']]) + "}"
        sale_val = p['sale_price'] if p['sale_price'] is not None else "NULL"
        
        f.write(f"INSERT INTO products (id, title, slug, description, category_id, price, sale_price, sku, stock_quantity, track_inventory, allow_backorders, status, tags) VALUES ('{p['id']}', '{t_esc}', '{p['slug']}', '{d_esc}', '{p['category_id']}', {p['price']}, {sale_val}, '{p['sku']}', {p['stock_quantity']}, true, false, 'active', '{tags_arr}') ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, price = EXCLUDED.price, stock_quantity = EXCLUDED.stock_quantity;\n")

        # Product Image
        img_url = p['images'][0]['image_url']
        f.write(f"INSERT INTO product_images (id, product_id, image_url, sort_order, alt_text) VALUES ('{p['images'][0]['id']}', '{p['id']}', '{img_url}', 1, '{t_esc}') ON CONFLICT DO NOTHING;\n")

    f.write("\n-- COMPLETED SEED OF 300+ PRODUCTS\n")

print("Wrote supabase/seed_catalog.sql")
