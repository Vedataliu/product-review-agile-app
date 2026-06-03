"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Background gradients that adapt to dark/light theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-background/40 to-background pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 text-xs text-muted-foreground mb-8 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Platformë e sigurtë për menaxhimin e cilësisë
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            Product Quality Review Management, <span className="text-primary bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent dark:from-indigo-400 dark:to-indigo-200">Redefined.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
            A premium full-stack platform built with Next.js 16, Supabase Database & Auth, Tailwind CSS v4, and Jest unit tests.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Link
              href="/reviews"
              className="px-6 py-3 rounded-xl font-semibold text-center text-primary-foreground bg-primary hover:opacity-95 active:scale-98 transition-all shadow-md shadow-primary/10"
            >
              Browse Reviews
            </Link>
            <Link
              href="/admin"
              className="px-6 py-3 rounded-xl font-semibold text-center text-foreground border border-border bg-card/40 hover:bg-muted active:scale-98 transition-all shadow-sm"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Next.js card */}
          <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg group">
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground mb-2 text-lg">Next.js 16</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">App Router boilerplate ready with static rendering and optimized metadata.</p>
          </div>

          {/* Supabase SSR card */}
          <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg group">
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground mb-2 text-lg">Supabase SSR</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Complete server-side cookie client logic, browser client, and auth middleware set up.</p>
          </div>

          {/* Tailwind v4 card */}
          <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg group">
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground mb-2 text-lg">Tailwind v4</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Modern layout setup with dark theme config via CSS variables and seamless styling.</p>
          </div>

          {/* Jest Testing card */}
          <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg group">
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground mb-2 text-lg">Jest Testing</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Unit test setup configured using ts-node and React Testing Library.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
