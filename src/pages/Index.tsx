
import { useState, useMemo, useEffect } from "react";
import { Heart, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductGrid from "@/components/ProductGrid";
import ProductDetailPage from "@/components/ProductDetailPage";
import WishlistPage from "@/components/WishlistPage";
import CartPage from "@/components/CartPage";
import BottomNav from "@/components/BottomNav";
import Contact from "@/pages/Contact";
import Search from "@/pages/Search";
import OfflineIndicator from "@/components/OfflineIndicator";
import CategoryDropdown from "@/components/CategoryDropdown";
import { Product } from "@/types/Product";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useOfflineStorage } from "@/hooks/useOfflineStorage";
import PWAInstallPopup from "@/components/PWAInstallPopup";

const mockProducts: Product[] = [
  // Electronics - Mobile Phones
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Latest iPhone with advanced camera system and A17 Pro chip.",
    brand: "Apple",
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 1099,
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Premium Android phone with S Pen and AI features.",
    brand: "Samsung",
    rating: 4.7,
    inStock: true
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    price: 899,
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Google's flagship with advanced AI photography.",
    brand: "Google",
    rating: 4.6,
    inStock: true
  },
  {
    id: 4,
    name: "OnePlus 12",
    price: 699,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Fast charging flagship with premium design.",
    brand: "OnePlus",
    rating: 4.5,
    inStock: true
  },
  {
    id: 5,
    name: "Xiaomi 14 Ultra",
    price: 799,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Photography-focused smartphone with Leica partnership.",
    brand: "Xiaomi",
    rating: 4.4,
    inStock: true
  },
  {
    id: 6,
    name: "iPhone 14",
    price: 799,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Reliable iPhone with great camera and performance.",
    brand: "Apple",
    rating: 4.6,
    inStock: true
  },
  {
    id: 7,
    name: "Samsung Galaxy A54",
    price: 449,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Mid-range phone with premium features.",
    brand: "Samsung",
    rating: 4.3,
    inStock: true
  },
  {
    id: 8,
    name: "Nothing Phone 2",
    price: 599,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Unique transparent design with Glyph interface.",
    brand: "Nothing",
    rating: 4.2,
    inStock: true
  },
  {
    id: 9,
    name: "Oppo Find X6 Pro",
    price: 849,
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Premium phone with excellent camera capabilities.",
    brand: "Oppo",
    rating: 4.4,
    inStock: true
  },
  {
    id: 10,
    name: "Realme GT 5 Pro",
    price: 549,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Gaming-focused smartphone with fast performance.",
    brand: "Realme",
    rating: 4.3,
    inStock: true
  },

  // Electronics - Laptops & Computers
  {
    id: 11,
    name: "MacBook Pro 16-inch M3",
    price: 2499,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Professional laptop with M3 chip for demanding tasks.",
    brand: "Apple",
    rating: 4.9,
    inStock: true
  },
  {
    id: 12,
    name: "Dell XPS 13",
    price: 1299,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Ultra-portable laptop with premium build quality.",
    brand: "Dell",
    rating: 4.6,
    inStock: true
  },
  {
    id: 13,
    name: "HP Spectre x360",
    price: 1199,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "2-in-1 convertible laptop with touch screen.",
    brand: "HP",
    rating: 4.5,
    inStock: true
  },
  {
    id: 14,
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1599,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Business laptop with military-grade durability.",
    brand: "Lenovo",
    rating: 4.7,
    inStock: true
  },
  {
    id: 15,
    name: "ASUS ROG Strix G15",
    price: 1399,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Gaming laptop with RTX graphics and RGB lighting.",
    brand: "ASUS",
    rating: 4.4,
    inStock: true
  },
  {
    id: 16,
    name: "Surface Laptop 5",
    price: 999,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Microsoft's premium laptop with Windows 11.",
    brand: "Microsoft",
    rating: 4.5,
    inStock: true
  },
  {
    id: 17,
    name: "Acer Swift 3",
    price: 699,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Affordable laptop with good performance for everyday use.",
    brand: "Acer",
    rating: 4.2,
    inStock: true
  },
  {
    id: 18,
    name: "MSI Creator Z16",
    price: 2199,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Content creation laptop with professional display.",
    brand: "MSI",
    rating: 4.6,
    inStock: true
  },
  {
    id: 19,
    name: "MacBook Air M2",
    price: 1199,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Lightweight laptop perfect for students and professionals.",
    brand: "Apple",
    rating: 4.8,
    inStock: true
  },
  {
    id: 20,
    name: "Razer Blade 15",
    price: 1899,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Premium gaming laptop with sleek design.",
    brand: "Razer",
    rating: 4.5,
    inStock: true
  },

  // Fashion - Women's Clothing
  {
    id: 21,
    name: "Elegant Silk Dress",
    price: 299,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A timeless silk dress perfect for special occasions.",
    rating: 4.7,
    inStock: true
  },
  {
    id: 22,
    name: "Casual Summer Dress",
    price: 129,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Light and breezy summer dress in soft cotton.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 23,
    name: "Business Blazer",
    price: 189,
    image: "https://images.unsplash.com/photo-1566479179817-3d823a12ad96?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Professional blazer perfect for office wear.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 24,
    name: "Denim Jacket",
    price: 89,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Classic denim jacket for casual styling.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 25,
    name: "Yoga Leggings",
    price: 59,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "High-performance leggings for workout and leisure.",
    rating: 4.3,
    inStock: true
  },
  {
    id: 26,
    name: "Knit Sweater",
    price: 79,
    image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Cozy knit sweater for cold weather.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 27,
    name: "Formal Pants",
    price: 99,
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Tailored pants for professional settings.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 28,
    name: "Bohemian Skirt",
    price: 69,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Flowing skirt with bohemian patterns.",
    rating: 4.2,
    inStock: true
  },
  {
    id: 29,
    name: "White Button Shirt",
    price: 49,
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Classic white shirt for versatile styling.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 30,
    name: "Evening Gown",
    price: 399,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Elegant gown for formal events.",
    rating: 4.8,
    inStock: true
  },

  // Home & Living - Furniture
  {
    id: 31,
    name: "Modern Sofa",
    price: 899,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Comfortable 3-seater sofa with modern design.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 32,
    name: "Dining Table Set",
    price: 1299,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "6-seater dining table with matching chairs.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 33,
    name: "Queen Size Bed Frame",
    price: 699,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Sturdy wooden bed frame with headboard.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 34,
    name: "Office Chair",
    price: 299,
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Ergonomic office chair with lumbar support.",
    rating: 4.3,
    inStock: true
  },
  {
    id: 35,
    name: "Bookshelf",
    price: 199,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "5-tier wooden bookshelf for storage.",
    rating: 4.2,
    inStock: true
  },
  {
    id: 36,
    name: "Coffee Table",
    price: 249,
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Glass top coffee table with storage.",
    rating: 4.1,
    inStock: true
  },
  {
    id: 37,
    name: "Wardrobe",
    price: 799,
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "3-door wardrobe with mirror and drawers.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 38,
    name: "TV Stand",
    price: 179,
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Modern TV stand with cable management.",
    rating: 4.0,
    inStock: true
  },
  {
    id: 39,
    name: "Recliner Chair",
    price: 599,
    image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Comfortable reclining chair with footrest.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 40,
    name: "Study Desk",
    price: 329,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Compact study desk with built-in storage.",
    rating: 4.3,
    inStock: true
  },

  // Beauty & Personal Care - Skincare
  {
    id: 41,
    name: "Vitamin C Serum",
    price: 29,
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Brightening serum with 20% Vitamin C.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 42,
    name: "Hydrating Face Moisturizer",
    price: 24,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Daily moisturizer for all skin types.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 43,
    name: "Gentle Face Cleanser",
    price: 18,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Sulfate-free cleanser for sensitive skin.",
    rating: 4.3,
    inStock: true
  },
  {
    id: 44,
    name: "Retinol Night Cream",
    price: 39,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Anti-aging night cream with retinol.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 45,
    name: "Sunscreen SPF 50",
    price: 22,
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Broad spectrum sun protection.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 46,
    name: "Hyaluronic Acid Serum",
    price: 26,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Intense hydration serum.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 47,
    name: "Clay Face Mask",
    price: 16,
    image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Purifying clay mask for oily skin.",
    rating: 4.2,
    inStock: true
  },
  {
    id: 48,
    name: "Eye Cream",
    price: 32,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Anti-aging eye cream with peptides.",
    rating: 4.3,
    inStock: true
  },
  {
    id: 49,
    name: "Facial Toner",
    price: 20,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Balancing toner with witch hazel.",
    rating: 4.1,
    inStock: true
  },
  {
    id: 50,
    name: "Exfoliating Scrub",
    price: 19,
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Gentle exfoliating scrub for smooth skin.",
    rating: 4.0,
    inStock: true
  },

  // Books & Stationery - Novels
  {
    id: 51,
    name: "The Great Gatsby",
    price: 12,
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Classic American novel by F. Scott Fitzgerald.",
    rating: 4.8,
    inStock: true
  },
  {
    id: 52,
    name: "1984",
    price: 14,
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Dystopian novel by George Orwell.",
    rating: 4.7,
    inStock: true
  },
  {
    id: 53,
    name: "To Kill a Mockingbird",
    price: 13,
    image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Pulitzer Prize winning novel by Harper Lee.",
    rating: 4.9,
    inStock: true
  },
  {
    id: 54,
    name: "Pride and Prejudice",
    price: 11,
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Romance novel by Jane Austen.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 55,
    name: "The Catcher in the Rye",
    price: 15,
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Coming-of-age novel by J.D. Salinger.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 56,
    name: "Harry Potter Series",
    price: 89,
    image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Complete 7-book series by J.K. Rowling.",
    rating: 4.9,
    inStock: true
  },
  {
    id: 57,
    name: "The Lord of the Rings",
    price: 45,
    image: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Epic fantasy trilogy by J.R.R. Tolkien.",
    rating: 4.8,
    inStock: true
  },
  {
    id: 58,
    name: "Agatha Christie Collection",
    price: 34,
    image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Mystery novels collection.",
    rating: 4.7,
    inStock: true
  },
  {
    id: 59,
    name: "The Alchemist",
    price: 16,
    image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Philosophical novel by Paulo Coelho.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 60,
    name: "Dune",
    price: 18,
    image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Science fiction epic by Frank Herbert.",
    rating: 4.6,
    inStock: true
  }
];

const categoryData = {
  Electronics: [
    "Mobile Phones",
    "Laptops & Computers", 
    "Cameras",
    "Accessories (Chargers, Earphones, etc.)"
  ],
  Fashion: [
    "Men's Clothing",
    "Women's Clothing",
    "Kid's Clothing", 
    "Footwear",
    "Watches, Bags, Jewelry"
  ],
  "Home & Living": [
    "Furniture",
    "Kitchen & Dining",
    "Home Decor",
    "Bedding",
    "Cleaning Supplies"
  ],
  "Beauty & Personal Care": [
    "Skincare",
    "Makeup", 
    "Hair Care",
    "Fragrances",
    "Men's Grooming"
  ],
  "Grocery & Food": [
    "Fruits & Vegetables",
    "Beverages",
    "Snacks",
    "Rice, Oils, Spices",
    "Frozen Food"
  ],
  "Books & Stationery": [
    "Academic Books",
    "Novels",
    "Office Supplies", 
    "Art & Craft Materials"
  ],
  "Toys & Baby Products": [
    "Toys by Age",
    "Baby Clothing",
    "Diapers & Wipes",
    "Baby Food"
  ],
  "Sports & Outdoors": [
    "Exercise Equipment",
    "Sportswear",
    "Outdoor Gear",
    "Cycling, Football, Cricket items"
  ],
  Automotive: [
    "Car Accessories",
    "Motorbike Gear",
    "Oils & Fluids",
    "Car Tools"
  ],
  "Health & Wellness": [
    "Vitamins & Supplements",
    "Medical Equipment",
    "First Aid",
    "Eye & Dental Care"
  ]
};

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useLocalStorage<Array<{ product: Product; size: string; quantity: number }>>('cart-items', []);
  const [wishlist, setWishlist] = useLocalStorage<number[]>('wishlist', []);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "search" | "contact" | "cart" | "product-detail">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use offline storage hook
  const { isOnline, addOfflineAction, cacheData, getCachedData } = useOfflineStorage();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Ensure product details page starts from the top
  useEffect(() => {
    if (currentPage === "product-detail" && selectedProduct) {
      window.scrollTo(0, 0);
    }
  }, [currentPage, selectedProduct]);

  const navigationHandlers = useMemo(() => ({
    onHomeClick: () => {
      setCurrentPage("home");
      setSelectedProduct(null);
    },
    onSearchClick: () => {
      setCurrentPage("search");
      setSelectedProduct(null);
    },
    onCartClick: () => {
      setCurrentPage("cart");
    },
    onContactClick: () => {
      setCurrentPage("contact");
      setSelectedProduct(null);
    }
  }), []);

  const addToCart = (product: Product, size: string = "Default") => {
    const existingItem = cartItems.find(item => item.product.id === product.id && item.size === size);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.product.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { product, size, quantity: 1 }]);
    }

    // Cache the action for offline support
    if (!isOnline) {
      addOfflineAction('add-to-cart', { productId: product.id, size, quantity: 1 });
    }
    
    setSelectedProduct(null);
    setCurrentPage("home");
  };

  const buyNow = (product: Product, size: string = "Default") => {
    // Copy product details to clipboard
    const productDetails = `Product: ${product.name}\nSize: ${size}\nPrice: ৳${product.price}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(productDetails).catch(() => {
        // Fallback for browsers that don't support clipboard API
        console.log('Product details:', productDetails);
      });
    }
    
    // Open the Google Form URL directly
    window.open("https://forms.gle/pCunH9M1Z3ez9VnU9", "_blank");
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      const newWishlist = prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      
      // Cache the action for offline support
      if (!isOnline) {
        addOfflineAction('add-to-wishlist', { productId, action: prev.includes(productId) ? 'remove' : 'add' });
      }
      
      return newWishlist;
    });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("product-detail");
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      if (selectedCategory === "All") return true;
      
      const matchesCategory = product.category === selectedCategory;
      
      if (selectedSubcategory) {
        return matchesCategory && product.subcategory === selectedSubcategory;
      }
      
      return matchesCategory;
    });
  }, [selectedCategory, selectedSubcategory]);

  const wishlistProducts = mockProducts.filter(product => wishlist.includes(product.id));

  if (currentPage === "product-detail" && selectedProduct) {
    return (
      <div>
        <OfflineIndicator />
        <ProductDetailPage
          product={selectedProduct}
          allProducts={mockProducts}
          wishlist={wishlist}
          onBack={() => setCurrentPage("home")}
          onAddToCart={addToCart}
          onBuyNow={buyNow}
          onToggleWishlist={toggleWishlist}
          onProductClick={handleProductClick}
          onHomeClick={navigationHandlers.onHomeClick}
          onSearchClick={navigationHandlers.onSearchClick}
          onCartClick={navigationHandlers.onCartClick}
          onContactClick={navigationHandlers.onContactClick}
          cartCount={cartItemsCount}
        />
      </div>
    );
  }

  if (currentPage === "cart") {
    return (
      <div>
        <OfflineIndicator />
        <CartPage
          items={cartItems}
          onUpdateQuantity={(productId, size, quantity) => {
            if (quantity === 0) {
              setCartItems(cartItems.filter(item => !(item.product.id === productId && item.size === size)));
            } else {
              setCartItems(cartItems.map(item => 
                item.product.id === productId && item.size === size
                  ? { ...item, quantity }
                  : item
              ));
            }
          }}
          onClose={() => {
            setCurrentPage("home");
          }}
          onHomeClick={navigationHandlers.onHomeClick}
          onSearchClick={navigationHandlers.onSearchClick}
          onContactClick={navigationHandlers.onContactClick}
          cartCount={cartItemsCount}
        />
      </div>
    );
  }

  if (currentPage === "contact") {
    return (
      <div>
        <OfflineIndicator />
        <Contact 
          onBack={() => setCurrentPage("home")}
          onHomeClick={navigationHandlers.onHomeClick}
          onSearchClick={navigationHandlers.onSearchClick}
          onCartClick={navigationHandlers.onCartClick}
          cartCount={cartItemsCount}
        />
      </div>
    );
  }

  if (currentPage === "search") {
    return (
      <div>
        <OfflineIndicator />
        <Search
          products={mockProducts}
          wishlist={wishlist}
          onBack={() => setCurrentPage("home")}
          onProductClick={handleProductClick}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
          onHomeClick={navigationHandlers.onHomeClick}
          onCartClick={navigationHandlers.onCartClick}
          onContactClick={navigationHandlers.onContactClick}
          cartCount={cartItemsCount}
        />
      </div>
    );
  }

  if (isWishlistOpen) {
    return (
      <div>
        <OfflineIndicator />
        <WishlistPage
          products={wishlistProducts}
          wishlist={wishlist}
          onProductClick={handleProductClick}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
          onBack={() => setIsWishlistOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <OfflineIndicator />
      
      {/* PWA Install Popup */}
      <PWAInstallPopup />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-extralight tracking-widest">Netlistore</h1>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-gray-50 h-8 w-8"
              onClick={() => setIsWishlistOpen(true)}
            >
              <Heart className="h-4 w-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  {wishlist.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Simple Category Navigation with better mobile scrolling */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <div className="w-full overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max">
            <Button
              variant="ghost"
              onClick={() => handleCategorySelect("All")}
              className={`px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 hover:scale-105 flex-shrink-0 ${
                selectedCategory === "All"
                  ? "bg-black text-white hover:bg-gray-800 shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:text-black"
              }`}
            >
              All Products
            </Button>
            
            {Object.keys(categoryData).map((category) => (
              <Button
                key={category}
                variant="ghost"
                onClick={() => handleCategorySelect(category)}
                className={`px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 hover:scale-105 flex-shrink-0 ${
                  selectedCategory === category
                    ? "bg-black text-white hover:bg-gray-800 shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-medium">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h2>
            {selectedSubcategory && (
              <p className="text-sm text-gray-600 mt-1">{selectedSubcategory}</p>
            )}
          </div>
          <span className="text-sm text-gray-500">{filteredProducts.length} items</span>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-gray-500">Try selecting a different category or subcategory</p>
          </div>
        ) : (
          <ProductGrid 
            products={filteredProducts}
            wishlist={wishlist}
            onProductClick={handleProductClick}
            onToggleWishlist={toggleWishlist}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
          />
        )}
      </section>

      {/* Bottom Navigation */}
      <BottomNav 
        cartCount={cartItemsCount}
        onHomeClick={navigationHandlers.onHomeClick}
        onSearchClick={navigationHandlers.onSearchClick}
        onCartClick={navigationHandlers.onCartClick}
        onContactClick={navigationHandlers.onContactClick}
        activeTab={currentPage}
      />
    </div>
  );
};

export default Index;
