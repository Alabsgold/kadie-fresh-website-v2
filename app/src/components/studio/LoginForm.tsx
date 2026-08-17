"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/app/actions/auth";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [shakeToken, setShakeToken] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      setShakeToken((t) => t + 1);
      return;
    }
    router.push("/studio");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm">
      <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-forest-900">
        Sign in
      </h1>
      <p className="mt-2 mb-6 text-sm text-gray-500">Use the address the account was set up with.</p>

      {error && (
        <div
          key={shakeToken}
          className="mb-4 animate-shake rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="femi@kadiefresh.com"
        className="mb-4 w-full rounded-xl border border-forest-800/14 px-4 py-3.25 text-[15px] outline-none"
      />

      <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        className="mb-5 w-full rounded-xl border border-forest-800/14 px-4 py-3.25 text-[15px] outline-none"
      />

      <button type="submit" disabled={submitting} className="btn-cta w-full py-3.5 text-[15px] disabled:opacity-60">
        {submitting ? "Checking…" : "Sign in"}
      </button>

      <div className="mt-5 flex items-center justify-between text-sm">
        <Link href="#" className="text-gray-400">
          Forgot password
        </Link>
        <Link href="/products" className="font-semibold text-green-600">
          ← Back to site
        </Link>
      </div>
    </form>
  );
}
