"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OffersPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">Offers for You</h1>
            </div>
            <div className="flex items-center justify-center h-[50vh] text-gray-400">
                No active offers
            </div>
        </div>
    );
}
