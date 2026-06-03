'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

export default function AdminDashboard() {
  const [approvedReviews, setapprovedReviews] = useState([]);
  const [rejectedReviews, setRejectedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchapprovedReviews();
    fetchRejectedReviews();
  }, []);

  const fetchapprovedReviews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: true });
    setapprovedReviews(data || []);
    setLoading(false);
  };

  const fetchRejectedReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'rejected')
      .order('created_at', { ascending: true });

    setRejectedReviews(data || []);
  };


  const triggerNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleReject = async (id) => {
    const confirmAction = window.confirm(
      "A je i sigurt që don ta refuzosh këtë rishikim?"
    );

    if (!confirmAction) return;

    const { error } = await supabase
      .from('reviews')
      .update({ status: 'rejected' })
      .eq('id', id);

    if (!error) {
      setapprovedReviews((prev) => prev.filter((r) => r.id !== id));

      fetchapprovedReviews();
      fetchRejectedReviews();

      triggerNotification('Rishikimi u REFUZUA.', 'error');
    } else {
      triggerNotification('Refuzimi dështoi.', 'error');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-background/40 to-background pointer-events-none" />
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="space-y-8">

          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                Paneli i Moderimit
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Shikoni, refuzoni rishikimet e produkteve.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchapprovedReviews}
                disabled={loading}
                className="inline-flex items-center rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-50 transition-colors"
              >
                {loading ? 'Duke ngarkuar...' : 'Rifresko'}
              </button>
              <span className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                Roli: Quality Lead
              </span>
            </div>
          </div>

          {/* Toast Notification */}
          {notification && (
            <div
              className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg border backdrop-blur-sm transition-all duration-300 ${notification.type === 'success'
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800 dark:bg-emerald-950/90 dark:border-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50/90 border-rose-200 text-rose-800 dark:bg-rose-950/90 dark:border-rose-800 dark:text-rose-300'
                }`}
            >
              <span className="text-sm font-semibold">{notification.message}</span>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Të aprovuara
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-foreground">
                  {loading ? '—' : approvedReviews.length}
                </span>
                <span className="text-xs text-muted-foreground">rishikime</span>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Të Refuzuara
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-foreground">
                  {loading ? '—' : rejectedReviews.length}
                </span>
                <span className="text-xs text-muted-foreground">
                  rishikime
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Koha Mesatare e Rishikimit
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-foreground">12.4m</span>
                <span className="text-xs text-emerald-650 font-bold dark:text-emerald-400">↓ 8% këtë javë</span>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Saktësia e Moderimit
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-foreground">99.8%</span>
                <span className="text-xs text-muted-foreground">QA i kontrolluar</span>
              </div>
            </div>
          </div>

          {/* Review Queue Table */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card/45 backdrop-blur-sm shadow-sm">
            <div className="p-5 border-b border-border flex justify-between items-center bg-muted/40">
              <h2 className="text-base font-bold text-foreground">
                Rishikime të aprovuara
              </h2>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-bold text-muted-foreground">
                {loading ? 'Duke ngarkuar...' : `${approvedReviews.length}`}
              </span>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="py-16 text-center text-muted-foreground">
                  Duke ngarkuar rishikimet e aprovuara...
                </div>
              ) : approvedReviews.length === 0 ? (
                <div className="py-16 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-muted-foreground/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-4 text-sm font-bold text-foreground">
                    Gjithçka është e azhurnuar!
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Nuk ka rishikime për moderim.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/20 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <th className="px-6 py-4">Produkti / Dërguesi</th>
                      <th className="px-6 py-4">Vlerësimi</th>
                      <th className="px-6 py-4">Përmbajtja</th>
                      <th className="px-6 py-4 text-right">Veprimet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {approvedReviews.map((rev) => (
                      <tr
                        key={rev.id}
                        className="text-sm transition-colors hover:bg-muted/10"
                      >
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="font-bold text-foreground">
                            Produkt #{(rev.product_id || '').slice(0, 8)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            User #{(rev.user_id || '').slice(0, 8)}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {formatDate(rev.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${i < rev.rating
                                  ? 'fill-current'
                                  : 'text-muted-foreground/30'
                                  }`}
                                viewBox="0 0 20 20"
                              >
                                <path d={STAR_PATH} />
                              </svg>
                            ))}
                          </div>
                          <span className="mt-1 text-xs text-muted-foreground block">
                            {rev.rating}/5
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-muted-foreground max-w-md line-clamp-2 leading-relaxed">
                            {rev.comment}
                          </p>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-right">
                          <div className="inline-flex gap-2">

                            <button
                              onClick={() => handleReject(rev.id)}
                              className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-950/70"
                            >
                              Refuzo
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card/45 backdrop-blur-sm shadow-sm mt-8">
            <div className="p-5 border-b border-border flex justify-between items-center bg-muted/40">
              <h2 className="text-base font-bold text-foreground">
                Rishikime të Refuzuara
              </h2>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-bold text-muted-foreground">
                {rejectedReviews.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              {rejectedReviews.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                  Nuk ka rishikime të refuzuara.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-border/60">
                    {rejectedReviews.map((rev) => (
                      <tr key={rev.id} className="text-sm transition hover:bg-muted/10">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="font-bold text-foreground">
                            Produkt #{(rev.product_id || '').slice(0, 8)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            User #{(rev.user_id || '').slice(0, 8)}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {formatDate(rev.created_at)}
                          </div>
                        </td>

                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${i < rev.rating ? 'fill-current' : 'text-muted-foreground/30'
                                  }`}
                                viewBox="0 0 20 20"
                              >
                                <path d={STAR_PATH} />
                              </svg>
                            ))}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-muted-foreground max-w-md line-clamp-2">
                            {rev.comment}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-right">
                          <span className="text-xs text-rose-400 font-semibold">
                            Rejected
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          ``
        </div>
      </main>

      <Footer />
    </div>
  );
}
