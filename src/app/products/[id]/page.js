'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/Toast';


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
  const { showToast } = useToast();

  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editHoverRating, setEditHoverRating] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editCommentError, setEditCommentError] = useState('');

  const [sortBy, setSortBy] = useState('newest');

  const sortedReviews = React.useMemo(() => {
    return [...reviews].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sortBy === 'rating-desc') {
        return b.rating - a.rating;
      }
      if (sortBy === 'rating-asc') {
        return a.rating - b.rating;
      }
      return 0;
    });
  }, [reviews, sortBy]);



  const fetchProduct = useCallback(async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    setProduct(data || null);
  }, [id]);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const currentUser = userData?.user;

    let query = supabase
      .from('reviews')
      .select('*')
      .eq('product_id', id);

    if (currentUser) {
      query = query.or(`status.eq.approved,user_id.eq.${currentUser.id}`);
    } else {
      query = query.eq('status', 'approved');
    }

    const { data } = await query.order('created_at', { ascending: false });
    setReviews(data || []);
    setLoading(false);
  }, [id]);


  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
    fetchProduct();
    fetchReviews();
  }, [fetchProduct, fetchReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommentError('');
    if (!user) {
      showToast('Duhet të identifikoheni për të lënë një rishikim.', 'warning');
      return;
    }
    if (!newComment.trim()) {
      setCommentError('Ju lutem shkruani rishikimin tuaj.');
      showToast('Ju lutem shkruani rishikimin tuaj.', 'error');
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('reviews').insert({
      product_id: id,
      user_id: user.id,
      rating: newRating,
      comment: newComment.trim(),
      status: 'approved',
    });
    if (error) {
      showToast('Dërgimi dështoi. Ju lutem provoni përsëri.', 'error');
      setSubmitting(false);
    } else {
      showToast('Rishikimi juaj u dërgua me sukses!', 'success');
      setNewComment('');
      setNewRating(5);
      router.push('/reviews');
    }
  };

  const handleEditStart = (rev) => {
    setEditingId(rev.id);
    setEditRating(rev.rating);
    setEditComment(rev.comment);
    setEditHoverRating(null);
    setEditCommentError('');
  };

  const handleEditSave = async (revId) => {
    setEditCommentError('');
    if (!editComment.trim()) {
      setEditCommentError('Ju lutem shkruani rishikimin tuaj.');
      showToast('Ju lutem shkruani rishikimin tuaj.', 'error');
      return;
    }
    setEditSubmitting(true);
    const { error } = await supabase
      .from('reviews')
      .update({ rating: editRating, comment: editComment.trim(), status: 'pending' })
      .eq('id', revId)
      .eq('user_id', user.id);
    if (error) {
      showToast('Modifikimi dështoi.', 'error');
    } else {
      showToast('Rishikimi u modifikua me sukses dhe po pret aprovim!', 'success');
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
      showToast('Rishikimi u fshi me sukses!', 'success');
      fetchReviews();
    } else {
      showToast('Fshirja dështoi.', 'error');
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
    <div className="relative min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-background/40 to-background pointer-events-none" />
      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="space-y-12">

          {/* Product header */}
          <div className="pb-2">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Të gjitha produktet
            </Link>
            {product && (
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="flex-1">
                  <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                    {product.name}
                  </h1>
                  {product.description && (
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  )}
                </div>
                {product.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full sm:w-40 h-40 rounded-2xl object-cover border border-border/40 bg-muted/60 shrink-0"
                  />
                )}
              </div>
            )}
          </div>

          {/* Reviews + Form */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Reviews List */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                  Rishikimet e Klientëve
                </h2>
                {reviews.length > 0 && (
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort-reviews" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                      Rendit sipas:
                    </label>
                    <select
                      id="sort-reviews"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="rounded-lg border border-border bg-card/65 px-3 py-1.5 text-xs font-bold text-foreground outline-none transition focus:border-primary cursor-pointer hover:bg-muted"
                    >
                      <option value="newest">Më të rejat (Datës)</option>
                      <option value="oldest">Më të vjetrat (Datës)</option>
                      <option value="rating-desc">Vlerësimit më të lartë (★)</option>
                      <option value="rating-asc">Vlerësimit më të ulët (★)</option>
                    </select>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="py-10 text-center text-muted-foreground">
                  Duke ngarkuar rishikimet...
                </div>
              ) : reviews.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground bg-card/20">
                  Ende nuk ka rishikime të aprovuara. Jini i pari!
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedReviews.map((rev) => (

                    <article
                      key={rev.id}
                      className={`rounded-2xl border backdrop-blur-sm p-6 shadow-sm transition-all duration-300 ${
                        rev.status === 'rejected'
                          ? 'border-destructive/30 bg-destructive/5'
                          : rev.status === 'pending'
                          ? 'border-amber-500/20 bg-amber-500/5'
                          : 'border-border bg-card/45'
                      }`}
                    >
                      {editingId === rev.id ? (
                        /* Inline edit form */
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-foreground">
                            Modifiko Rishikimin
                          </h4>
                          <div>
                            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Rishikimi
                            </label>
                            <textarea
                              rows={3}
                              value={editComment}
                              onChange={(e) => {
                                setEditComment(e.target.value);
                                if (e.target.value.trim()) setEditCommentError('');
                              }}
                              className={`mt-1 w-full rounded-lg border bg-muted/60 text-foreground placeholder:text-muted-foreground/50 px-3 py-2 text-sm outline-none transition ${
                                editCommentError 
                                  ? 'border-destructive/60 focus:border-destructive ring-1 ring-destructive/20' 
                                  : 'border-border focus:border-primary'
                              }`}
                            />
                            {editCommentError && (
                              <p className="mt-1.5 text-xs text-destructive flex items-center gap-1.5 animate-toast">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                {editCommentError}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditSave(rev.id)}
                              disabled={editSubmitting}
                              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all"
                            >
                              {editSubmitting ? 'Duke ruajtur...' : 'Ruaj Ndryshimet'}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground bg-card hover:bg-muted transition-all"
                            >
                              Anulo
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Review display */
                        <>
                          {rev.status === 'rejected' && (
                            <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold border border-destructive/20 animate-toast">
                              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <span>Ky opinion është refuzuar nga administratori për shkak të përmbajtjes ose gjuhës jo të përshtatshme.</span>
                            </div>
                          )}
                          {rev.status === 'pending' && (
                            <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-500/20 animate-toast">
                              <svg className="w-4 h-4 flex-shrink-0 mt-0.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
                              </svg>
                              <span>Ky opinion është në proces verifikimi nga administratori.</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-foreground">
                              {getDisplayName(rev)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(rev.created_at)}
                            </span>
                          </div>
                          <div className="mt-2">
                            <RatingStars rating={rev.rating} />
                          </div>
                          <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                            {rev.comment}
                          </p>
                          {user && rev.user_id === user.id && (
                            <div className="mt-4 flex gap-2">
                              <button
                                onClick={() => handleEditStart(rev)}
                                className="rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors"
                              >
                                Modifiko
                              </button>
                              <button
                                onClick={() => handleDelete(rev.id)}
                                className="rounded-lg bg-destructive/15 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/20 transition-colors"
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
              <div className="sticky top-24 rounded-2xl border border-border bg-card/65 backdrop-blur-sm p-6 shadow-sm">
                <h3 className="text-lg font-bold text-foreground">
                  Ndaj Përvojën Tënde
                </h3>

                {user ? (
                  <>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Duke dërguar si <span className="font-semibold text-foreground">{user.email}</span>
                      {product && (
                        <>
                          {' '}për <span className="font-semibold text-foreground">{product.name}</span>
                        </>
                      )}
                    </p>
                    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                      <div>
                        <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          Rishikimi Juaj
                        </label>
                        <textarea
                          id="review-comment"
                          rows={5}
                          value={newComment}
                          onChange={(e) => {
                            setNewComment(e.target.value);
                            if (e.target.value.trim()) setCommentError('');
                          }}
                          placeholder="Përshkruani përvojën tuaj me këtë produkt..."
                          className={`mt-1 w-full rounded-lg border bg-muted/60 text-foreground placeholder:text-muted-foreground/50 px-3 py-2 text-sm outline-none transition ${
                            commentError 
                              ? 'border-destructive/60 focus:border-destructive ring-1 ring-destructive/20' 
                              : 'border-border focus:border-primary'
                          }`}
                        />
                        {commentError && (
                          <p className="mt-1.5 text-xs text-destructive flex items-center gap-1.5 animate-toast">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            {commentError}
                          </p>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-50"
                      >
                        {submitting ? 'Duke dërguar...' : 'Dërgo Rishikimin'}
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Identifikohuni për të lënë një rishikim
                      {product && <> për <span className="font-semibold text-foreground">{product.name}</span></>}.
                    </p>
                    <div className="mt-5">
                      <Link
                        href="/login"
                        className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
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

      <Footer />
    </div>
  );
}
