"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function AccountPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!supabase) {
      setMessage("The store database is not connected yet. Please try again after setup.");
      return;
    }
    setBusy(true);
    const result =
      mode === "signup"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    setMessage(
      mode === "signup"
        ? "Account created. Check your email if confirmation is required."
        : "You are signed in successfully."
    );
  }

  return (
    <main className="account-page">
      <div className="account-card">
        <Link href="/" className="back-link">← Back to Nūr Market</Link>
        <p className="eyebrow">NŪR MARKET · CUSTOMER ACCOUNT</p>
        <h1>{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
        <p className="muted">Sign in or register to manage your orders and digital purchases.</p>
        <div className="account-tabs">
          <button type="button" className={mode === "signin" ? "active" : ""} onClick={() => { setMode("signin"); setMessage(""); }}>Sign in</button>
          <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setMessage(""); }}>Create account</button>
        </div>
        <form onSubmit={submit} className="account-form">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
          <button className="primary-button" type="submit" disabled={busy}>{busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}</button>
        </form>
        {message && <p className="account-message" role="status">{message}</p>}
        <p className="small-note">Your account is protected by Supabase authentication. Never share your password with anyone.</p>
      </div>
    </main>
  );
}
