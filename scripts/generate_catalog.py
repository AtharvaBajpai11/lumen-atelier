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
        "description": "Smartphones, laptops, audio systems, wearables, and high-performance computing instruments.",
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
        "description": "Electric cars, performance motorcycles, urban e-scooters, bicycles, and precision automotive accessories.",
        "image_url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        "sort_order": 3
    },
    {
        "id": "cat_home_kitchen",
        "name": "Home & Kitchen",
        "slug": "home-kitchen",
        "description": "Architectural furniture, climate appliances, espresso instruments, and ambient artisan decor.",
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
        "description": "Smart treadmills, ergonomic weights, recovery technology, and outdoor training essentials.",
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
        "name": "Grocery & Gourmet Essentials",
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

# Write generator code
with open("scripts/data_definitions.py", "w", encoding="utf-8") as f:
    f.write("# data definitions\n")

print("Created data definitions placeholder")
