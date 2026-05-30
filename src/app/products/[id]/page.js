'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

function RatingStars({ rating, size = 'sm' }) {
  const cls = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
  return (
    <div className="flex text-amber-400">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`${cls} ${i < rating ? 'fill-current' : 'text-slate-200 dark:text-slate-700'}`}
          viewBox="0 0 20 20"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

function StarPicker({ value, hover, onChange, onHover, onLeave }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={onLeave}
          className="text-2xl transition duration-150 ease-in-out transform hover:scale-110 focus:outline-none"
        >
          <span className={star <= (hover ?? value) ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editHoverRating, setEditHoverRating] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [editSubmitting, setEditSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', id)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });
    setReviews(data || []);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Duhet të identifikoheni për të lënë një rishikim.');
      return;
    }
    if (!newComment.trim()) {
      alert('Ju lutem shkruani rishikimin tuaj.');
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('reviews').insert({
      product_id: id,
      user_id: user.id,
      rating: newRating,
      comment: newComment.trim(),
      status: 'pending',
    });
    if (error) {
      alert('Dërgimi dështoi. Ju lutem provoni përsëri.');
      setSubmitting(false);
    } else {
      router.push('/reviews');
    }
  };

  const handleEditStart = (rev) => {
    setEditingId(rev.id);
    setEditRating(rev.rating);
    setEditComment(rev.comment);
    setEditHoverRating(null);
  };

  const handleEditSave = async (revId) => {
    if (!editComment.trim()) return;
    setEditSubmitting(true);
    const { error } = await supabase
      .from('reviews')
      .update({ rating: editRating, comment: editComment.trim(), status: 'pending' })
      .eq('id', revId)
      .eq('user_id', user.id);
    if (error) {
      alert('Modifikimi dështoi.');
    } else {
      setEditingId(null);
      fetchReviews();
    }
    setEditSubmitting(false);
  };

  const handleDelete = async (revId) => {
    if (!confirm('Jeni i sigurt që dëshironi të fshini këtë rishikim?')) return;
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', revId)
      .eq('user_id', user.id);
    if (!error) {
      fetchReviews();
    } else {
      alert('Fshirja dështoi.');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDisplayName = (rev) => {
    if (user && rev.user_id === user.id) return user.email || 'Ju';
    const uid = rev.user_id || '';
    return `User #${uid.slice(0, 8)}`;
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl space-y-12">

        {/* Reviews + Form */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Reviews List */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Rishikimet e Klientëve
            </h2>

            {loading ? (
              <div className="py-10 text-center text-slate-400 dark:text-slate-500">
                Duke ngarkuar rishikimet...
              </div>
            ) : reviews.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500 dark:border-slate-800 dark:text-slate-400">
                Ende nuk ka rishikime të aprovuara. Jini i pari!
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <article
                    key={rev.id}
                    className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800/60 dark:bg-slate-900"
                  >
                    {editingId === rev.id ? (
                      /* Inline edit form */
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          Modifiko Rishikimin
                        </h4>
                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Vlerësimi
                          </span>
                          <div className="mt-2">
                            <StarPicker
                              value={editRating}
                              hover={editHoverRating}
                              onChange={setEditRating}
                              onHover={setEditHoverRating}
                              onLeave={() => setEditHoverRating(null)}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Rishikimi
                          </label>
                          <textarea
                            rows={3}
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-3 py-2 text-sm outline-none transition focus:border-indigo-500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditSave(rev.id)}
                            disabled={editSubmitting}
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                          >
                            {editSubmitting ? 'Duke ruajtur...' : 'Ruaj Ndryshimet'}
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                          >
                            Anulo
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Review display */
                      <>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {getDisplayName(rev)}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            {formatDate(rev.created_at)}
                          </span>
                        </div>
                        <div className="mt-2">
                          <RatingStars rating={rev.rating} />
                        </div>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed dark:text-slate-400">
                          {rev.comment}
                        </p>
                        {user && rev.user_id === user.id && (
                          <div className="mt-4 flex gap-2">
                            <button
                              onClick={() => handleEditStart(rev)}
                              className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                            >
                              Modifiko
                            </button>
                            <button
                              onClick={() => handleDelete(rev.id)}
                              className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-950/70"
                            >
                              Fshi
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Submit review form */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-md">
              <h3 className="text-lg font-bold text-white">
                Ndaj Përvojën Tënde
              </h3>

              {user ? (
                <>
                  <p className="mt-1 text-xs text-zinc-400">
                    Duke dërguar si {user.email}
                  </p>
                  <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Vlerësimi
                      </span>
                      <div className="mt-2">
                        <StarPicker
                          value={newRating}
                          hover={hoverRating}
                          onChange={setNewRating}
                          onHover={setHoverRating}
                          onLeave={() => setHoverRating(null)}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="review-comment"
                        className="block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                      >
                        Rishikimi Juaj
                      </label>
                      <textarea
                        id="review-comment"
                        rows={5}
                        required
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Përshkruani përvojën tuaj me këtë produkt..."
                        className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-3 py-2 text-sm outline-none transition focus:border-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {submitting ? 'Duke dërguar...' : 'Dërgo Rishikimin'}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <p className="mt-1 text-xs text-zinc-400">
                    Identifikohuni për të lënë një rishikim për këtë produkt.
                  </p>
                  <div className="mt-5">
                    <Link
                      href="/login"
                      className="block w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
                    >
                      Identifikohu për të Rishikuar
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
