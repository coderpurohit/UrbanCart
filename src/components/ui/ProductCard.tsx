"use client";

import Image from "next/image";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useState } from "react";
import { addToLocalCart } from "@/lib/localCart";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  unit: string;
  delivery_time: string;
};

type Props = {
  product?: Product;
};

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);

  const defaultImage =
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80"; // Groceries/Shopping

  // 🚨 Guard: if product is undefined
  if (!product) return null;

  // ✅ SAFE image handling (FIX)
  const [imgSrc, setImgSrc] = useState(
    product.image && product.image.startsWith("http")
      ? product.image
      : defaultImage
  );

  // If product changes, reset image
  if (product && product.image !== imgSrc && imgSrc !== defaultImage) {
    if (product.image && product.image.startsWith("http")) {
      setImgSrc(product.image);
    }
  }

  const handleAddToCart = async () => {
    if (!isSupabaseConfigured) {
      addToLocalCart({ ...product, image: product.image || "" });
      alert(`Added ${product.name} to cart`);
      return;
    }

    try {
      setLoading(true);

      const userId =
        typeof window !== "undefined"
          ? localStorage.getItem("urban_cart_user_id") || crypto.randomUUID()
          : null;

      if (userId) localStorage.setItem("urban_cart_user_id", userId);

      const { error } = await supabase.from("cart").insert([
        {
          product_id: product.id,
          quantity: 1,
          user_id: userId,
        },
      ]);

      if (error) throw error;

      alert("Added to cart 🛒");
    } catch (e) {
      console.error(e);
      addToLocalCart({ ...product, image: product.image || "" });
      alert("Supabase unavailable — saved to local cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-secondary/30 border border-white/5 p-4 flex flex-col gap-3">

      {/* IMAGE */}
      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-black/30">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
          onError={(e) => {
            console.error(`Failed to load image for ${product.name}: ${imgSrc}`);
            setImgSrc(defaultImage);
          }}
        />
      </div>

      {/* INFO */}
      <div>
        <h3 className="text-sm font-semibold">{product.name}</h3>
        <p className="text-xs text-white/60">{product.unit}</p>
      </div>

      {/* PRICE + ADD */}
      <div className="flex items-center justify-between">
        <span className="font-bold">₹{product.price}</span>

        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold
                     bg-blue-600 hover:bg-blue-700
                     transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? "ADDING..." : "ADD"}
        </button>
      </div>
    </div>
  );
}
