"use client";

import React, { useEffect, useState, useRef } from "react";
import { MapPin, User, Search, Bell, X, LogOut } from "lucide-react";
import { supabase, isSupabaseConfigured, type NotificationItem } from "@/lib/supabase";
import AuthModal from "@/components/AuthModal";
import { filterCategories } from "@/data/filterCategories";

type Tab = "home" | "categories" | "cart" | "profile";

export default function Header({
  onSearchChange,
  onTabChange,
  selectedCategory,
  onCategoryChange,
  activeTab,
}: {
  onSearchChange?: (q: string) => void;
  onTabChange?: (tab: Tab) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  activeTab?: Tab;
}) {
  const [query, setQuery] = useState("");
  const [address, setAddress] = useState("Set delivery address");
  const [userId, setUserId] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  /* ------------------ GET AUTH USER ------------------ */
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user?.id ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  /* ------------------ FETCH ADDRESS ------------------ */
  useEffect(() => {
    if (!isSupabaseConfigured || !userId) return;

    const fetchAddress = async () => {
      const { data, error } = await supabase
        .from("addresses")
        .select("full_address")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1);

      if (!error && data && data.length > 0) {
        setAddress(data[0].full_address);
      }
    };

    fetchAddress();
  }, [userId]);

  /* ------------------ DEBOUNCED SEARCH (IMPORTANT) ------------------ */
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange?.(query.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [query, onSearchChange]);

  /* ------------------ AUTO-SCROLL SELECTED CATEGORY INTO VIEW ------------------ */
  useEffect(() => {
    if (selectedCategory && categoryScrollRef.current && activeTab === "home") {
      const selectedButton = categoryScrollRef.current.querySelector(
        `[data-category="${selectedCategory}"]`
      ) as HTMLElement;
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedCategory, activeTab]);

  /* ------------------ CHANGE ADDRESS ------------------ */
  const changeAddress = async () => {
    if (!userId) {
      setShowAuth(true);
      return;
    }

    const newAddress = prompt("Enter delivery address", address);
    if (!newAddress) return;

    setAddress(newAddress);

    await supabase.from("addresses").insert({
      user_id: userId,
      full_address: newAddress,
    });
  };

  /* ------------------ LOGOUT ------------------ */
  const logout = async () => {
    await supabase.auth.signOut();
    setUserId(null);
    setAddress("Set delivery address");
  };

  /* ------------------ NOTIFICATIONS ------------------ */
  const toggleNotifications = async () => {
    const next = !notificationsOpen;
    setNotificationsOpen(next);
    if (!next) return;

    if (!isSupabaseConfigured || !userId) {
      setNotifications([]);
      return;
    }

    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    setNotifications((data as NotificationItem[]) || []);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl pt-4 pb-2 px-4 border-b border-white/5 shadow-sm">

      {/* TOP ROW */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-extrabold text-primary tracking-widest uppercase">
            DELIVERY IN 8 MINS
          </span>

          <button
            onClick={changeAddress}
            className="flex items-center gap-1.5 text-foreground group"
          >
            <span className="font-bold text-xl group-hover:text-primary transition-colors">
              {address}
            </span>
            <MapPin className="w-4 h-4 text-primary" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleNotifications}
            className="p-2.5 rounded-full bg-secondary/40"
          >
            <Bell className="w-5 h-5" />
          </button>

          {userId ? (
            <button
              onClick={logout}
              className="p-2.5 rounded-full bg-secondary/40"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="p-2.5 rounded-full bg-secondary/40"
              title="Login"
            >
              <User className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* CATEGORY FILTERS - Only show on home page */}
      {activeTab === "home" && (
        <div 
          ref={categoryScrollRef}
          className="mb-3 overflow-hidden scrollbar-hide"
        >
          <div className="flex gap-3 pb-2 animate-scroll">
            {/* Duplicate categories for seamless loop */}
            {[...filterCategories, ...filterCategories].map((cat, index) => (
              <button
                key={`${cat.id}-${index}`}
                onClick={() => onCategoryChange?.(cat.id)}
                data-category={cat.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-secondary/30 text-gray-300 hover:bg-secondary/50"
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="text-sm font-semibold">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SEARCH BAR */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder='Search "milk", "bread", "eggs"...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-3.5 pl-11 pr-4 bg-secondary/30 border border-white/5 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
        />
      </div>

      {/* NOTIFICATIONS */}
      {notificationsOpen && (
        <div className="mt-3 bg-secondary/40 border border-white/5 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold">Notifications</span>
            <button onClick={() => setNotificationsOpen(false)}>
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="space-y-2">
            {notifications.length === 0 && (
              <div className="text-xs text-gray-500">No notifications</div>
            )}

            {notifications.map((n) => (
              <div key={n.id} className="p-2 rounded-lg bg-background/40">
                <div className="text-sm font-semibold">{n.title}</div>
                <div className="text-xs text-gray-500">{n.body}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </header>
  );
}
