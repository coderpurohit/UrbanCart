import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight, Trash2, Minus, Plus } from "lucide-react";
import { supabase, type CartItem, isSupabaseConfigured } from "@/lib/supabase";
import { getLocalCart, updateLocalCartQuantity, removeFromLocalCart } from "@/lib/localCart";
import Image from "next/image";

export default function CartView() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const defaultImage =
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=500&q=80";

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    if (!isSupabaseConfigured) {
      setCartItems(getLocalCart());
      setLoading(false);
      return;
    }

    try {
      const userId = localStorage.getItem('urban_cart_user_id');
      if (!userId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('cart')
        .select(`
          *,
          products (*)
        `)
        .eq('user_id', userId);

      if (error) throw error;

      setCartItems(data || []);
    } catch (error) {
      console.log("Error fetching cart (likely demo mode), falling back to local:", error);
      setCartItems(getLocalCart());
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    if (!isSupabaseConfigured) {
      updateLocalCartQuantity(itemId, newQuantity);
      setCartItems(getLocalCart()); // Refresh from local
      return;
    }

    try {
      const { error } = await supabase
        .from('cart')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (error) throw error;
      setCartItems(prev => prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (itemId: string) => {
    if (!isSupabaseConfigured) {
      removeFromLocalCart(itemId);
      setCartItems(getLocalCart());
      return;
    }

    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.products?.price || 0) * item.quantity;
  }, 0);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="px-4 pt-6 pb-24 h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-500">
        <h2 className="text-2xl font-bold text-foreground mb-6">My Cart</h2>

        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center opacity-80">
          <div className="w-24 h-24 rounded-full bg-secondary/30 flex items-center justify-center mb-2">
            <ShoppingBag className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            Your cart is empty
          </h3>
          <p className="text-sm text-gray-500 max-w-[200px]">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          {!isSupabaseConfigured && (
            <div className="mt-4 px-4 py-2 bg-blue-500/10 text-blue-500 text-xs rounded border border-blue-500/20">
              Demo Mode: Items are saved locally
            </div>
          )}
          <button className="mt-4 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors flex items-center gap-2">
            Start Shopping <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-24 min-h-screen animate-in fade-in duration-500 flex flex-col">
      <h2 className="text-2xl font-bold text-foreground mb-6">My Cart ({cartItems.length})</h2>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {cartItems.map((item: CartItem) => (
          <div key={item.id} className="flex gap-4 p-3 bg-secondary/20 rounded-2xl border border-white/5">
            <div className="w-20 h-20 bg-secondary/40 rounded-xl relative overflow-hidden flex-shrink-0">
              <Image
                src={item.products?.image || defaultImage}
                alt={item.products?.name || "Product"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-200 line-clamp-1">{item.products?.name}</h3>
                <p className="text-xs text-gray-500">{item.products?.unit}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-white">₹{(item.products?.price || 0) * item.quantity}</span>

                <div className="flex items-center gap-3 bg-secondary/40 rounded-lg px-2 py-1">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                      else removeItem(item.id);
                    }}
                    className="p-1 hover:text-white text-gray-400"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:text-white text-gray-400"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-white/5 space-y-4">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Subtotal</span>
          <span className="text-white font-bold">₹{subtotal}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Delivery Fee</span>
          <span className="text-primary font-bold">Free</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold text-white pt-2">
          <span>Total</span>
          <span>₹{subtotal}</span>
        </div>
        <button
          onClick={() => router.push("/payment-methods")}
          className="w-full py-3.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          Proceed to Payment <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
