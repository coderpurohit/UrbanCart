"use client";

import React from "react";
import CategoryItem from "@/components/ui/CategoryItem";
import { categories } from "@/data/categories";

import QuickStats from "@/components/ui/QuickStats";

export default function CategoriesView({
  onCategorySelect,
}: {
  onCategorySelect?: (category: string) => void;
}) {
  return (
    <main className="px-4 pt-24 pb-6">
      <section>
        <QuickStats />
        <h2 className="text-2xl font-bold mb-6">All Categories</h2>

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
    </main>
  );
}
