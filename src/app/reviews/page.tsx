"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Reviews() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [reviewCounts, setReviewCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data: productData } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });

    const products = productData || [];
    setProducts(products);

    if (products.length > 0) {
      const { data: reviewData } = await supabase
        .from("reviews")
        .select("product_id")
        .eq("status", "approved")
        .in("product_id", products.map((p) => p.id));

      const counts: Record<string, number> = {};
      (reviewData || []).forEach((r) => {
        counts[r.product_id] = (counts[r.product_id] || 0) + 1;
      });
      setReviewCounts(counts);
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-background/40 to-background pointer-events-none" />

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Produktet</h1>
          <p className="text-muted-foreground text-sm mt-2 max-w-xl">
            Zgjidhni një produkt për të parë vlerësimet ose për të shkruar një rishikim të ri.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3 text-muted-foreground">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <span className="text-sm font-medium">Duke ngarkuar produktet...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-2xl bg-card/20">
            Nuk u gjetën produkte.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const count = reviewCounts[product.id] || 0;
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-sm flex flex-col justify-between hover:border-primary/45 hover:bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
                >
                  <div>
                    <div className="w-full h-40 rounded-xl bg-muted/60 border border-border/40 flex items-center justify-center mb-5 overflow-hidden transition-colors group-hover:bg-primary/5">
                      {product.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <svg className="w-12 h-12 text-muted-foreground/60 transition-transform duration-300 group-hover:scale-105 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h2>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                      {count > 0 ? `${count} rishikim${count !== 1 ? 'e' : ''} i aprovuar` : 'Pa rishikime'}
                    </span>
                    <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Shiko rishikimet
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
