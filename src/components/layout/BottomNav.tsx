import React from "react";
import { Home, Grid, ShoppingBag, User } from "lucide-react";

type Tab = "home" | "categories" | "cart" | "profile";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-white/5 shadow-[0_-5px_20px_rgba(0,0,0,0.4)] pb-safe">
      <div className="flex justify-around items-center h-[4.5rem] px-2 pb-1">
        <NavItem
          icon={<Home className="w-[1.6rem] h-[1.6rem]" />}
          label="Home"
          active={activeTab === "home"}
          onClick={() => onTabChange("home")}
        />
        <NavItem
          icon={<Grid className="w-[1.6rem] h-[1.6rem]" />}
          label="Categories"
          active={activeTab === "categories"}
          onClick={() => onTabChange("categories")}
        />
        <NavItem
          icon={<ShoppingBag className="w-[1.6rem] h-[1.6rem]" />}
          label="Cart"
          active={activeTab === "cart"}
          onClick={() => onTabChange("cart")}
        />
        <NavItem
          icon={<User className="w-[1.6rem] h-[1.6rem]" />}
          label="Profile"
          active={activeTab === "profile"}
          onClick={() => onTabChange("profile")}
        />
      </div>
    </nav>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-full h-full gap-1.5 group relative"
    >
      {active && (
        <div className="absolute -top-3 w-12 h-1 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]" />
      )}
      <div
        className={`transition-all duration-300 ${active
            ? "text-primary scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            : "text-gray-500 group-hover:text-gray-300 group-hover:scale-105"
          }`}
      >
        {icon}
      </div>
      <span
        className={`text-[10px] font-bold tracking-wide transition-colors duration-300 ${active
            ? "text-primary"
            : "text-gray-500 group-hover:text-gray-300"
          }`}
      >
        {label}
      </span>
    </button>
  );
}
