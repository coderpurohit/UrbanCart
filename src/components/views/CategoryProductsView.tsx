import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { supabase, isSupabaseConfigured, Product } from "@/lib/supabase";
import { mockProducts } from "@/data/mockProducts";

export default function CategoryProductsView({
    category,
    onBack,
}: {
    category: string;
    onBack: () => void;
}) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            if (!isSupabaseConfigured) {
                console.log("Using mock data for category:", category);
                const filtered = mockProducts.filter(p =>
                    p.category.toLowerCase() === category.toLowerCase()
                );
                setProducts(filtered);
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from("products")
                    .select("*")
                    .ilike("category", category);

                if (error) throw error;

                if (!data || data.length === 0) {
                    throw new Error("No products found in DB");
                }

                setProducts(data);
            } catch (error) {
                console.error("Error fetching category products, falling back to mock:", error);
                const filtered = mockProducts.filter(p =>
                    p.category.toLowerCase() === category.toLowerCase()
                );
                setProducts(filtered);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    return (
        <div className="pt-6 pb-24 min-h-screen bg-background animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="px-4 mb-6 flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="p-2 rounded-full bg-secondary/50 hover:bg-secondary/70 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-foreground" />
                </button>
                <h1 className="text-2xl font-bold text-foreground capitalize">{category}</h1>
            </div>

            {/* Content */}
            <div className="px-4">
                {loading ? (
                    <div className="text-center text-gray-500 mt-10">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        No products found in {category}.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
