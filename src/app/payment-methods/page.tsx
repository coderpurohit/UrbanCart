"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, CreditCard, Plus, X, Smartphone, Banknote, Clock, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PaymentMethodsPage() {
    const router = useRouter();
    const [showAddUPI, setShowAddUPI] = useState(false);
    const [showAddCard, setShowAddCard] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // QR Code States
    const [showQR, setShowQR] = useState(false);
    const [qrTimer, setQrTimer] = useState(60);
    const [selectedApp, setSelectedApp] = useState("");

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (showQR && qrTimer > 0) {
            interval = setInterval(() => {
                setQrTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showQR, qrTimer]);

    const handlePaymentSelect = (appName: string) => {
        setSelectedApp(appName);
        setQrTimer(60);
        setShowQR(true);
    };

    const closeQR = () => {
        setShowQR(false);
        setQrTimer(60);
        setSelectedApp("");
    };

    const simulatePaymentSuccess = () => {
        setIsProcessing(true);
        setTimeout(() => {
            router.push("/order-success");
        }, 2000);
    };

    const handleCODOrder = () => {
        if (confirm("Place order with Cash on Delivery?")) {
            simulatePaymentSuccess();
        }
    };

    // Form states
    const [newUpiId, setNewUpiId] = useState("");
    const [newCard, setNewCard] = useState({ number: "", holder: "", expiry: "", cvv: "" });

    const [savedCards, setSavedCards] = useState([
        { id: 1, type: "Visa", number: "**** **** **** 4242", expiry: "12/28", holder: "John Doe", logo: "/visa.png" },
        { id: 2, type: "Mastercard", number: "**** **** **** 8888", expiry: "09/25", holder: "John Doe", logo: "/mastercard.png" },
    ]);

    const [upiMethods, setUpiMethods] = useState([
        { id: "upi1", app: "Google Pay", id_val: "john.doe@okhdfcbank", logo: "/gpay.png" },
        { id: "upi2", app: "PhonePe", id_val: "john.doe@ybl", logo: "/phonepe.png" },
    ]);

    const handleAddUPI = () => {
        if (newUpiId) {
            setUpiMethods([...upiMethods, {
                id: `upi-${Date.now()}`,
                app: "Custom UPI",
                id_val: newUpiId,
                logo: "" // Placeholder or generic
            }]);
            setNewUpiId("");
            setShowAddUPI(false);
        }
    };

    const handleAddCard = () => {
        if (newCard.number && newCard.expiry) {
            setSavedCards([...savedCards, {
                id: Date.now(),
                type: "Visa", // Mock type detection
                number: `**** **** **** ${newCard.number.slice(-4)}`,
                expiry: newCard.expiry,
                holder: newCard.holder,
                logo: "/visa.png"
            }]);
            setNewCard({ number: "", holder: "", expiry: "", cvv: "" });
            setShowAddCard(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 pb-20 relative">
            {/* Loading Overlay */}
            {isProcessing && (
                <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <h3 className="text-xl font-bold animate-pulse">Processing Payment...</h3>
                    <p className="text-gray-400 text-sm mt-2">Please do not close this window</p>
                </div>
            )}

            {/* QR Code Modal */}
            {showQR && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-[#1a1a1a] rounded-3xl w-full max-w-sm p-6 relative border border-white/10 shadow-2xl">
                        <button
                            onClick={closeQR}
                            className="absolute right-4 top-4 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold mb-1">Payment via {selectedApp}</h3>
                            <p className="text-gray-400 text-sm">Scan the QR code to pay</p>
                        </div>

                        <div className="bg-white p-4 rounded-2xl aspect-square w-full max-w-[250px] mx-auto mb-6 flex items-center justify-center">
                            {qrTimer > 0 ? (
                                <Image
                                    src="/payment-qr.png"
                                    alt="QR Code"
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="text-center text-black">
                                    <p className="font-bold mb-2">QR Expired</p>
                                    <button
                                        onClick={() => setQrTimer(60)}
                                        className="text-primary text-sm font-medium hover:underline"
                                    >
                                        Click to refresh
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="text-center mb-6">
                            <p className="text-sm font-medium text-gray-400 mb-2">Time Remaining</p>
                            <div className={`text-3xl font-mono font-bold ${qrTimer < 10 ? 'text-red-500' : 'text-primary'}`}>
                                00:{qrTimer.toString().padStart(2, '0')}
                            </div>
                        </div>

                        <button
                            onClick={simulatePaymentSuccess}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-green-900/20"
                        >
                            I have completed the payment
                        </button>

                        <div className="mt-4 text-center text-xs text-gray-500">
                            Please complete payment within the time limit.
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">Payment Methods</h1>
            </div>

            <div className="space-y-6">
                {/* UPI Section */}
                <section>
                    <h2 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">UPI Options</h2>
                    <div className="space-y-3">
                        {upiMethods.map((upi) => (
                            <div
                                key={upi.id}
                                onClick={() => handlePaymentSelect(upi.app)}
                                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-white/5 cursor-pointer hover:bg-secondary/50 transition-colors active:scale-[0.98]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden p-1">
                                        {upi.logo ? (
                                            <Image src={upi.logo} alt={upi.app} width={40} height={40} className="w-full h-full object-contain" />
                                        ) : (
                                            <span className="text-black font-bold text-xs">UPI</span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white">{upi.app}</h3>
                                        <p className="text-xs text-gray-400">{upi.id_val}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {!showAddUPI ? (
                            <button
                                onClick={() => setShowAddUPI(true)}
                                className="flex items-center gap-3 p-4 w-full rounded-xl border border-dashed border-white/20 hover:bg-white/5 transition-colors text-primary"
                            >
                                <Plus className="w-5 h-5" />
                                <span className="font-medium">Add New UPI ID</span>
                            </button>
                        ) : (
                            <div className="p-4 rounded-xl bg-secondary/30 border border-white/10 space-y-3 animate-in fade-in zoom-in-95">
                                <div className="flexjustify-between items-center mb-2">
                                    <h3 className="text-sm font-medium">Add UPI ID</h3>
                                </div>
                                <input
                                    type="text"
                                    placeholder="john@upi"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-primary"
                                    value={newUpiId}
                                    onChange={(e) => setNewUpiId(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddUPI}
                                        className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium"
                                    >
                                        Verify & Save
                                    </button>
                                    <button
                                        onClick={() => setShowAddUPI(false)}
                                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Cards Section */}
                <section>
                    <h2 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Credit / Debit Cards</h2>
                    <div className="space-y-3">
                        {savedCards.map((card) => (
                            <div key={card.id} className="p-4 rounded-xl bg-gradient-to-br from-secondary/40 to-secondary/20 border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    {/* Background decoration */}
                                    <CreditCard className="w-24 h-24" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="font-bold text-lg tracking-wider opacity-80">{card.type}</span>
                                        <div className="w-10 h-6 bg-white rounded overflow-hidden flex items-center justify-center p-0.5">
                                            <Image src={card.logo} alt={card.type} width={40} height={24} className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                    <p className="text-xl font-mono tracking-widest mb-4 text-gray-300">{card.number}</p>
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <div>
                                            <p className="mb-1 uppercase tracking-wider text-[10px]">Card Holder</p>
                                            <p className="text-white font-medium">{card.holder}</p>
                                        </div>
                                        <div>
                                            <p className="mb-1 uppercase tracking-wider text-[10px]">Expires</p>
                                            <p className="text-white font-medium">{card.expiry}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {!showAddCard ? (
                            <button
                                onClick={() => setShowAddCard(true)}
                                className="flex items-center gap-3 p-4 w-full rounded-xl border border-dashed border-white/20 hover:bg-white/5 transition-colors text-primary"
                            >
                                <Plus className="w-5 h-5" />
                                <span className="font-medium">Add New Card</span>
                            </button>
                        ) : (
                            <div className="p-4 rounded-xl bg-secondary/30 border border-white/10 space-y-3 animate-in fade-in zoom-in-95">
                                <h3 className="text-sm font-medium mb-2">Add Card Details</h3>
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-primary"
                                    value={newCard.number}
                                    onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                                />
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="w-1/2 bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-primary"
                                        value={newCard.expiry}
                                        onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        className="w-1/2 bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-primary"
                                        value={newCard.cvv}
                                        onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Card Holder Name"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-primary"
                                    value={newCard.holder}
                                    onChange={(e) => setNewCard({ ...newCard, holder: e.target.value })}
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddCard}
                                        className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium"
                                    >
                                        Save Card
                                    </button>
                                    <button
                                        onClick={() => setShowAddCard(false)}
                                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* More Payment Options */}
                <section>
                    <h2 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">More Payment Options</h2>
                    <div className="space-y-3">
                        {/* Pay Later */}
                        <div
                            onClick={simulatePaymentSuccess}
                            className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-white/5 cursor-pointer hover:bg-secondary/50 transition-colors active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-white">Pay Later</h3>
                                    <p className="text-xs text-gray-400">Simpl, Lazypay, etc.</p>
                                </div>
                            </div>
                            <ArrowLeft className="w-4 h-4 text-gray-500 rotate-180" />
                        </div>

                        {/* Cash on Delivery */}
                        <div
                            onClick={handleCODOrder}
                            className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-white/5 cursor-pointer hover:bg-secondary/50 transition-colors active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                    <Banknote className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-white">Cash on Delivery</h3>
                                    <p className="text-xs text-gray-400">Pay cash/UPI at doorstep</p>
                                </div>
                            </div>
                            <ArrowLeft className="w-4 h-4 text-gray-500 rotate-180" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
