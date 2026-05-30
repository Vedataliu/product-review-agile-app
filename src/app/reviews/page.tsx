"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

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
    <div className="relative min-h-screen flex flex-col justify-between bg-[#09090b]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-950/50 to-zinc-950 pointer-events-none" />

      <header className="relative z-10 border-b border-zinc-800/80 bg-zinc-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <span className="text-black font-black text-lg">R</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">ReviewQuality</span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="/reviews" className="text-sm font-medium text-white">
              Reviews
            </Link>
            <Link href="/admin" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Admin Moderation
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-white text-sm">{user.email}</span>
                <button
                  onClick={async () => { await supabase.auth.signOut(); window.location.reload(); }}
                  className="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg">Sign In</Link>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Produktet</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Zgjidhni një produkt për të parë rishikimet ose për të lënë një rishikim.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500">Duke ngarkuar produktet...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">Nuk u gjetën produkte.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const count = reviewCounts[product.id] || 0;
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/10 backdrop-blur-sm flex flex-col justify-between hover:border-zinc-600 hover:bg-zinc-900/30 transition-all duration-200"
                >
                  <div>
                    <div className="w-full h-36 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mb-5">
                      <svg className="w-10 h-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-white group-hover:text-zinc-200 transition-colors">
                      {product.name}
                    </h2>
                    {product.description && (
                      <p className="text-sm text-zinc-400 mt-2 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      {count > 0 ? `${count} rishikim${count !== 1 ? 'e' : ''} i aprovuar` : 'Ende pa rishikime'}
                    </span>
                    <span className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1">
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

      <footer className="relative z-10 border-t border-zinc-900 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div>&copy; {new Date().getFullYear()} Review Quality platform of product. All rights reserved.</div>
          <div className="flex gap-4 items-center">
            <span className="font-semibold text-zinc-450">Created by:</span>
            <span>Ermal Aliu</span>
            <span>Bardh Ahmeti</span>
            <span>Vedat Aliu</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
