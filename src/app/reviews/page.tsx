"use client";
import Link from 'next/link'

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";


export default function Reviews() {


  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    getUser();
    getReviews();
  }, []);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const getReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("status", "approved");

    setReviews(data || []);
  };

  const addReview = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    await supabase.from("reviews").insert([
      {
        product_id: "2260df85-3959-44b2-a2a3-f262cae713d9",
        user_id: user.id,
        rating,
        comment,
        status: "pending",
      },
    ]);

    alert("Review submitted (awaiting approval)");
    setComment("");
    setRating(5);
    setShowForm(false);
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
                <button onClick={async () => { await supabase.auth.signOut(); window.location.reload(); }} className="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg">Sign Out</button>
              </>
            ) : (
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg">Sign In</Link>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Product Reviews</h1>
            <p className="text-zinc-400 text-sm mt-1">Browse, add, and manage user feedback.</p>
          </div>

          <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors">Write a Review</button>
        </div>

        {showForm && (
          <div className="mb-6 p-4 border border-zinc-800 bg-zinc-900/50 rounded-lg">
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review..." className="w-full mb-3 p-2 text-white rounded" />
            <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full mb-3 p-2 text-white rounded" />
            <button onClick={addReview} className="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg">Submit Review</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/10 backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-white">
                    Product Review
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {r.rating} ★
                  </span>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {r.comment}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>By {r.user_id}</span>
                <span>Approved</span>
              </div>
            </div>
          ))}
        </div>
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
  )
}
