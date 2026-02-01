"use client";

import React, { useEffect, useState } from "react";
import CategoryItem from "@/components/ui/CategoryItem";
import QuickStats from "@/components/ui/QuickStats";
import ProductCard from "@/components/ui/ProductCard";
import { supabase, isSupabaseConfigured, Product } from "@/lib/supabase";
import { categories } from "@/data/categories"; // ✅ CENTRAL SOURCE
import { mockProducts } from "@/data/mockProducts";

export default function HomeView({
  searchQuery,
  selectedCategory = "all",
  onCategorySelect,
}: {
  searchQuery: string;
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
}) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      if (!isSupabaseConfigured) {
        console.log("Using mock data due to missing Supabase config");
        const sortedMock = mockProducts; // Already sorted or can sort here
        setAllProducts(sortedMock);
        setProducts(sortedMock);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error || !data || data.length === 0) {
        console.log("Supabase error or empty DB, falling back to mock data:", error);
        // Fallback to mock data
        setAllProducts(mockProducts);
        setProducts(mockProducts);
      } else {
        // Remove duplicate milk products (keep only the first one)
        const seenMilk = new Set<string>();
        const uniqueProducts = (data || []).filter((p) => {
          const nameLower = p.name.toLowerCase();
          if (nameLower.includes("milk")) {
            if (seenMilk.has("milk")) {
              return false; // Skip duplicate milk
            }
            seenMilk.add("milk");
          }
          return true;
        });

        // Sort: Milk first, then Sweets, then Apple, then others
        const sorted = uniqueProducts.sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();

          if (aName.includes("milk")) return -1;
          if (bName.includes("milk")) return 1;
          if (aName.includes("sweets")) return -1;
          if (bName.includes("sweets")) return 1;
          if (aName.includes("apple")) return -1;
          if (bName.includes("apple")) return 1;
          return 0;
        });

        setAllProducts(sorted);
        setProducts(sorted);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  /* ---------------- SEARCH AND CATEGORY FILTER ---------------- */
  useEffect(() => {
    let filtered = allProducts;

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) =>
        p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply search filter
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length > 0) {
      const q = trimmedQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    setProducts(filtered);
  }, [searchQuery, selectedCategory, allProducts]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <main className="px-4 pt-24 pb-6 space-y-6">

      {!isSearching && (
        <>
          {/* Tagline */}
          <div className="text-center -mt-6 mb-8">
            <h1 className="text-4xl font-black italic tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-in fade-in zoom-in duration-500 drop-shadow-sm leading-tight">
              Fresh. Fast. Reliable.
            </h1>
          </div>

          <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-primary to-black flex items-center justify-between px-6">
            <h2 className="text-2xl font-bold text-white">
              Get 50% OFF<br />on First Order
            </h2>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <span className="text-xl font-bold text-white tracking-wider">URBAN50</span>
            </div>
          </div>

          <QuickStats />

          <section>
            <h3 className="text-xl font-bold mb-5">Explore Categories</h3>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 sm:gap-6">
              {categories.map((cat) => (
                <CategoryItem
                  key={cat.id}
                  name={cat.name}
                  image={cat.image}
                  onClick={() => onCategorySelect?.(cat.name)}
                />
              ))}
            </div>
          </section>
        </>
      )}

      <section>
        <h3 className="text-xl font-bold mb-5">
          {isSearching ? "Search Results" : "Products"}
        </h3>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-secondary/30 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <p className="text-center text-sm text-gray-500">
            No products found
          </p>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
