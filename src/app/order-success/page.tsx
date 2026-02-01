"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function OrderSuccessPage() {
    const router = useRouter();
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        // Generate random order ID
        setOrderId(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);

        // Trigger confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background mb-32"></div>

            <div className="relative z-10 animate-in zoom-in-50 duration-500">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/20">
                    <CheckCircle2 className="w-12 h-12 text-green-500 animate-in fade-in zoom-in duration-700 delay-200" />
                </div>

                <h1 className="text-3xl font-bold mb-2 tracking-tight">Order Placed Successfully!</h1>
                <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                    Thank you for your purchase. Your order has been received and is being processed.
                </p>

                <div className="bg-secondary/30 border border-white/5 rounded-2xl p-6 mb-8 max-w-sm mx-auto backdrop-blur-sm">
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Order ID</p>
                    <p className="text-xl font-mono font-bold tracking-widest text-primary">{orderId}</p>
                </div>

                <div className="flex gap-3 justify-center">
                    <Link
                        href="/"
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
                    >
                        Continue Shopping <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
