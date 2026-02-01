"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const submit = async () => {
    setLoading(true);

    const { error } =
      mode === "login"
        ? await signIn(email, password)
        : await signUp(email, password);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert(mode === "login" ? "Logged in!" : "Account created!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-background p-6 rounded-2xl w-[90%] max-w-sm">
        <h2 className="text-xl font-bold mb-4">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 rounded-lg bg-secondary/30"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-lg bg-secondary/30"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Login"
            : "Create Account"}
        </button>

        <button
          onClick={() =>
            setMode(mode === "login" ? "signup" : "login")
          }
          className="mt-3 text-sm text-primary"
        >
          {mode === "login"
            ? "New user? Create account"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
