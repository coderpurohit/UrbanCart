"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Heart, Wallet, TicketPercent } from "lucide-react";

export default function QuickStats() {
  const router = useRouter();

  const stats = [
    {
      id: "orders",
      label: "Orders",
      icon: <ShoppingBag className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-500/10",
      action: () => router.push("/orders"),
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: <Heart className="w-5 h-5 text-red-500" />,
      bg: "bg-red-500/10",
      action: () => router.push("/favorites"),
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: <Wallet className="w-5 h-5 text-green-500" />,
      bg: "bg-green-500/10",
      action: () => router.push("/wallet"),
    },
    {
      id: "offers",
      label: "Offers",
      icon: <TicketPercent className="w-5 h-5 text-purple-500" />,
      bg: "bg-purple-500/10",
      action: () => router.push("/offers"),
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      {stats.map((stat) => (
        <button
          key={stat.id}
          onClick={stat.action}
          className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-secondary/30 border border-white/5 hover:bg-secondary/50 transition-all"
        >
          <div className={`p-2 rounded-full ${stat.bg}`}>
            {stat.icon}
          </div>
          <span className="text-xs font-medium text-gray-300">
            {stat.label}
          </span>
        </button>
      ))}
    </div>
  );
}
