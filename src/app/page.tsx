"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const Header = dynamic(
  () => import("@/components/layout/Header"),
  { ssr: false }
);

import BottomNav from "@/components/layout/BottomNav";
import HomeView from "@/components/views/HomeView";
import CategoriesView from "@/components/views/CategoriesView";
import CartView from "@/components/views/CartView";
import ProfileView from "@/components/views/ProfileView";
import CategoryProductsView from "@/components/views/CategoryProductsView";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "categories" | "cart" | "profile" | "category-products">("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header only shows on Home and Categories for now, or maybe always? 
          Usually Profile has a different header or none. 
          Let's keep it for Home and Categories for consistency, 
          but maybe hide it for Cart/Profile if they need custom headers.
          For now, I'll keep it simple and show it everywhere or conditionally.
          Blinkit usually shows the location header everywhere. 
      */}
      {/* Header only shows on main tabs, not on detailed views like category-products 
          to reduce clutter as requested 
      */}
      {activeTab !== "category-products" && (
        <Header
          onSearchChange={setSearchQuery}
          onTabChange={(tab) => setActiveTab(tab as any)}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          activeTab={(activeTab as string) === "category-products" ? "categories" : (activeTab as any)}
        />
      )}

      {activeTab === "home" && (
        <HomeView
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={(category) => {
            setSelectedCategory(category);
            setActiveTab("category-products");
          }}
        />
      )}
      {activeTab === "categories" && (
        <CategoriesView
          onCategorySelect={(category) => {
            setSelectedCategory(category);
            setActiveTab("category-products");
          }}
        />
      )}

      {activeTab === "category-products" && (
        <CategoryProductsView
          category={selectedCategory}
          onBack={() => setActiveTab("categories")}
        />
      )}
      {activeTab === "cart" && <CartView />}
      {activeTab === "profile" && <ProfileView />}

      <BottomNav
        activeTab={(activeTab as string) === "category-products" ? "categories" : (activeTab as any)}
        onTabChange={(tab) => setActiveTab(tab as any)}
      />
    </div>
  );
}
