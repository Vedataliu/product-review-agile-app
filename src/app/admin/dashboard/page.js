'use client';

import React, { useState } from 'react';

export default function AdminDashboard() {
  const [pendingReviews, setPendingReviews] = useState([
    {
      id: 'rev-p1',
      productName: 'Apollo Ergonomic Chair',
      userName: 'Alice Smith',
      userEmail: 'alice.smith@example.com',
      rating: 4,
      comment: 'Excellent build quality. Assembly was straightforward but took around 30 minutes. The base is sturdy.',
      date: 'May 28, 2026 at 10:14 AM'
    },
    {
      id: 'rev-p2',
      productName: 'Nebula Mechanical Keyboard',
      userName: 'Devon Miller',
      userEmail: 'devon.miller@example.com',
      rating: 2,
      comment: 'Keycaps started wearing off after only two weeks of coding. Disappointed given the premium price point.',
      date: 'May 27, 2026 at 4:32 PM'
    },
    {
      id: 'rev-p3',
      productName: 'Zephyr Noise-Canceling Headphones',
      userName: 'Elena Rostova',
      userEmail: 'elena.r@example.com',
      rating: 5,
      comment: 'Incredible active noise cancellation. The battery life easily surpasses 40 hours as advertised.',
      date: 'May 27, 2026 at 1:15 PM'
    }
  ]);

  const [notification, setNotification] = useState(null);

  const triggerNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleApprove = (id, productName) => {
    setPendingReviews(pendingReviews.filter((rev) => rev.id !== id));
    triggerNotification(`Review for "${productName}" has been APPROVED.`, 'success');
  };

  const handleReject = (id, productName) => {
    setPendingReviews(pendingReviews.filter((rev) => rev.id !== id));
    triggerNotification(`Review for "${productName}" has been REJECTED.`, 'error');
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Moderation Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Review, approve, or reject product quality reviews submitted by consumers.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
              Role: Quality Lead
            </span>
          </div>
        </div>

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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Pending Queue
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-800 dark:text-white">{pendingReviews.length}</span>
              <span className="text-xs text-slate-500">reviews awaiting check</span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Avg. Review Time
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-800 dark:text-white">12.4m</span>
              <span className="text-xs text-emerald-600 font-medium">↓ 8% this week</span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Moderation Accuracy
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-800 dark:text-white">99.8%</span>
              <span className="text-xs text-slate-500">QA checked</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/55 dark:bg-slate-900/50">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Review Queue
            </h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-450">
              Active Session
            </span>
          </div>

          <div className="overflow-x-auto">
            {pendingReviews.length === 0 ? (
              <div className="py-16 text-center">
                <svg className="mx-auto h-12 w-12 text-slate-350 dark:text-slate-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-200">All caught up!</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">There are no pending reviews to moderate.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/40 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400">
                    <th className="px-6 py-4">Product / Submitter</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4">Review content</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {pendingReviews.map((rev) => (
                    <tr key={rev.id} className="text-sm transition hover:bg-slate-50/30 dark:hover:bg-slate-900/30">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="font-semibold text-slate-900 dark:text-white">{rev.productName}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">{rev.userName} ({rev.userEmail})</div>
                        <div className="mt-1 text-4xs text-slate-350 dark:text-slate-500">{rev.date}</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`h-4 w-4 ${i < rev.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-700'}`} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-slate-600 max-w-md line-clamp-2 leading-relaxed dark:text-slate-455">
                          {rev.comment}
                        </p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => handleApprove(rev.id, rev.productName)}
                            className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors dark:bg-emerald-950/40 dark:text-emerald-450 dark:hover:bg-emerald-950/70"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(rev.id, rev.productName)}
                            className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors dark:bg-rose-950/40 dark:text-rose-450 dark:hover:bg-rose-950/70"
                          >
                            Reject
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
