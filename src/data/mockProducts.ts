import { Product } from "@/lib/supabase";

export const mockProducts: Product[] = [
    // Dairy
    { id: "m1", name: "Fresh Milk", price: 60, category: "Dairy", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80", unit: "1L", delivery_time: "10 mins" },
    { id: "m2", name: "Butter Slab", price: 58, category: "Dairy", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80", unit: "100g", delivery_time: "12 mins" },
    { id: "m3", name: "Cheddar Cheese", price: 145, category: "Dairy", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=400&q=80", unit: "200g", delivery_time: "15 mins" },

    // Bakery
    { id: "b1", name: "Whole Wheat Bread", price: 45, category: "Bakery", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80", unit: "400g", delivery_time: "8 mins" },
    { id: "b2", name: "Croissant", price: 85, category: "Bakery", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80", unit: "2 pcs", delivery_time: "20 mins" },

    // Fruits
    { id: "f1", name: "Fresh Apples", price: 180, category: "Fruits", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80", unit: "1 kg", delivery_time: "15 mins" },
    { id: "f2", name: "Bananas", price: 40, category: "Fruits", image: "https://images.unsplash.com/photo-1571771896612-e63411190077?auto=format&fit=crop&w=400&q=80", unit: "6 pcs", delivery_time: "10 mins" },

    // Beverages
    { id: "bv1", name: "Orange Juice", price: 120, category: "Beverages", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80", unit: "1L", delivery_time: "10 mins" },
    { id: "bv2", name: "Cola Can", price: 40, category: "Beverages", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80", unit: "330ml", delivery_time: "8 mins" },

    // Instant
    { id: "i1", name: "Instant Noodles", price: 25, category: "Instant", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=400&q=80", unit: "70g", delivery_time: "5 mins" },

    // Breakfast
    { id: "br1", name: "Oats", price: 90, category: "Breakfast", image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=400&q=80", unit: "500g", delivery_time: "15 mins" },
];
