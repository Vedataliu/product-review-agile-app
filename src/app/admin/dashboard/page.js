'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

export default function AdminDashboard() {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  const fetchPendingReviews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });
    setPendingReviews(data || []);
    setLoading(false);
  };

  const triggerNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleApprove = async (id) => {
    const { error } = await supabase
      .from('reviews')
      .update({ status: 'approved' })
      .eq('id', id);
    if (!error) {
      setPendingReviews((prev) => prev.filter((r) => r.id !== id));
      triggerNotification('Rishikimi u APROVUA me sukses.', 'success');
    } else {
      triggerNotification('Aprovimi dështoi. Provoni përsëri.', 'error');
    }
  };

  const handleReject = async (id) => {
    const { error } = await supabase
      .from('reviews')
      .update({ status: 'rejected' })
      .eq('id', id);
    if (!error) {
      setPendingReviews((prev) => prev.filter((r) => r.id !== id));
      triggerNotification('Rishikimi u REFUZUA.', 'error');
    } else {
      triggerNotification('Refuzimi dështoi. Provoni përsëri.', 'error');
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
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Paneli i Moderimit
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Shikoni, aprovoni ose refuzoni rishikimet e produkteve në pritje.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchPendingReviews}
              disabled={loading}
              className="inline-flex items-center rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50 transition-colors dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              {loading ? 'Duke ngarkuar...' : 'Rifresko'}
            </button>
            <span className="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
              Roli: Quality Lead
            </span>
          </div>
        </div>

        {/* Toast Notification */}
        {notification && (
          <div
            className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg border backdrop-blur-sm transition-all duration-300 ${
              notification.type === 'success'
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800 dark:bg-emerald-950/90 dark:border-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50/90 border-rose-200 text-rose-800 dark:bg-rose-950/90 dark:border-rose-800 dark:text-rose-300'
            }`}
          >
            <span className="text-sm font-semibold">{notification.message}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Në Pritje
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-800 dark:text-white">
                {loading ? '—' : pendingReviews.length}
              </span>
              <span className="text-xs text-slate-500">rishikime pa kontroll</span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Koha Mesatare e Rishikimit
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-800 dark:text-white">12.4m</span>
              <span className="text-xs text-emerald-600 font-medium">↓ 8% këtë javë</span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Saktësia e Moderimit
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-800 dark:text-white">99.8%</span>
              <span className="text-xs text-slate-500">QA i kontrolluar</span>
            </div>
          </div>
        </div>

        {/* Review Queue Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/55 dark:bg-slate-900/50">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Radhа e Rishikimeve
            </h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              {loading ? 'Duke ngarkuar...' : `${pendingReviews.length} në pritje`}
            </span>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-16 text-center text-slate-400 dark:text-slate-500">
                Duke ngarkuar rishikimet në pritje...
              </div>
            ) : pendingReviews.length === 0 ? (
              <div className="py-16 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600"
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
                <h3 className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Gjithçka është e azhurnuar!
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Nuk ka rishikime në pritje për moderim.
                </p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/40 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400">
                    <th className="px-6 py-4">Produkti / Dërguesi</th>
                    <th className="px-6 py-4">Vlerësimi</th>
                    <th className="px-6 py-4">Përmbajtja</th>
                    <th className="px-6 py-4 text-right">Veprimet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {pendingReviews.map((rev) => (
                    <tr
                      key={rev.id}
                      className="text-sm transition hover:bg-slate-50/30 dark:hover:bg-slate-900/30"
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          Produkt #{(rev.product_id || '').slice(0, 8)}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">
                          User #{(rev.user_id || '').slice(0, 8)}
                        </div>
                        <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                          {formatDate(rev.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < rev.rating
                                  ? 'fill-current'
                                  : 'text-slate-200 dark:text-slate-700'
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d={STAR_PATH} />
                            </svg>
                          ))}
                        </div>
                        <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {rev.rating}/5
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-slate-600 max-w-md line-clamp-2 leading-relaxed dark:text-slate-400">
                          {rev.comment}
                        </p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => handleApprove(rev.id)}
                            className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-950/70"
                          >
                            Aprovo
                          </button>
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
      </div>
    </main>
  );
}
