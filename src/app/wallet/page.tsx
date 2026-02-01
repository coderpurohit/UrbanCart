"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WalletPage() {
    const router = useRouter();
    const [balance, setBalance] = React.useState(0);
    const [amount, setAmount] = React.useState("");

    const handleAddMoney = () => {
        if (!amount) return;
        setBalance((prev) => prev + Number(amount));
        setAmount("");
    };

    return (
        <div className="min-h-screen bg-background p-4 pb-20">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">Wallet</h1>
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-2xl border border-primary/20 mb-8">
                <p className="text-sm text-gray-400 mb-1">Total Balance</p>
                <h2 className="text-4xl font-bold text-primary">₹{balance.toFixed(2)}</h2>
            </div>

            {/* Add Money Section */}
            <div className="space-y-6">
                <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Add Money</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">₹</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-secondary/30 border border-white/10 rounded-xl p-4 pl-10 text-xl font-bold focus:outline-none focus:border-primary transition-colors"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="flex gap-3 flex-wrap">
                    {[100, 200, 500, 2000].map((val) => (
                        <button
                            key={val}
                            onClick={() => setAmount(val.toString())}
                            className="px-4 py-2 rounded-full bg-secondary/30 border border-white/5 text-sm font-medium hover:bg-primary/20 hover:border-primary/50 transition-all"
                        >
                            +₹{val}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleAddMoney}
                    disabled={!amount}
                    className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                    Add Money
                </button>
            </div>
        </div>
    );
}
