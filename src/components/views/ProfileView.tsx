import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Settings, MapPin, CreditCard, Heart, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { supabase, isSupabaseConfigured, type UserProfile } from "@/lib/supabase";

export default function ProfileView() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setProfile({
        id: "demo",
        name: "John Doe",
        phone: "+91 98765 43210",
        address_label: "Home",
        address_line: "12th Main",
      });
      return;
    }
    const userId = typeof window !== "undefined"
      ? localStorage.getItem("urban_cart_user_id") || ""
      : "";
    if (!userId) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()
      .then(({ data }) => setProfile((data as UserProfile) || null));
  }, []);
  const router = useRouter();

  const menuItems = [
    { icon: <MapPin className="w-5 h-5" />, label: "Addresses", path: "/addresses" },
    { icon: <CreditCard className="w-5 h-5" />, label: "Payment Methods", path: "/payment-methods" },
    { icon: <Heart className="w-5 h-5" />, label: "Favorites", path: "/favorites" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", path: "/settings" },
    { icon: <HelpCircle className="w-5 h-5" />, label: "Help & Support", path: "/help" },
  ];

  return (
    <div className="px-4 pt-6 pb-24 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
          <User className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{profile?.name || "Guest"}</h2>
          <p className="text-sm text-gray-500">{profile?.phone || ""}</p>
        </div>
      </div>

      <div className="space-y-3">
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={() => item.path && router.push(item.path)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-white/5 hover:bg-secondary/50 transition-colors group"
          >
            <div className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
              <div className="text-gray-500 group-hover:text-primary transition-colors">
                {item.icon}
              </div>
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400" />
          </button>
        ))}

        <button className="w-full flex items-center gap-3 p-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors mt-6">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Log Out</span>
        </button>
      </div>
    </div>
  );
}
