"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
    getReviews();
  }, []);

  const getReviews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("status", "approved");

    setReviews(data || []);
    setLoading(false);
  };

  const rejectReview = async (id: string) => {
    await supabase
      .from("reviews")
      .update({ status: "rejected" })
      .eq("id", id);

    getReviews();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-background/40 to-background pointer-events-none" />

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Moderimi i Rishikimeve</h1>
          <p className="text-muted-foreground text-sm mt-2 max-w-xl">
            Shikoni dhe refuzoni rishikimet e produkteve.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/45 backdrop-blur-sm overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border bg-muted/40 flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">Rishikimet e aprovuara</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-muted text-muted-foreground">
              {loading ? "Duke ngarkuar..." : `${reviews.length}`}
            </span>
          </div>

          <div className="divide-y divide-border/60">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span className="text-sm font-medium">Duke ngarkuar listën...</span>
              </div>
            ) : reviews.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                Nuk ka rishikime për moderim.
              </div>
            ) : (
              reviews.map((r) => (
                <div
                  key={r.id}
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/10 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-foreground">
                        Produkt #{(r.product_id || "").slice(0, 8)}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        të aprovuara
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                      {r.comment}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground/80 font-medium">
                      <span>Dërguesi: User #{(r.user_id || "").slice(0, 8)}</span>
                      <span className="flex items-center text-amber-500">★ {r.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => rejectReview(r.id)}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-muted text-foreground hover:bg-muted/80 active:scale-95 transition-all"
                    >
                      Refuzo
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
