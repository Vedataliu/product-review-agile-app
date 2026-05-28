'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const { id } = useParams();

  const product = {
    id: id || '1',
    name: 'Apollo Ergonomic Chair',
    price: '$299.99',
    description: 'Designed for deep focus and ultimate support. The Apollo Ergonomic Chair features adaptive lumbar alignment, fully adjustable 4D armrests, and dynamic tension tilt mechanism to keep you energized and pain-free through long work sessions.',
    specs: [
      'Breathable Elastomer Mesh backrest',
      'High-density molded foam seat cushion',
      'Pneumatic seat height adjustment (Class 4 cylinder)',
      'Aviation-grade aluminum base with silent PU casters'
    ]
  };

  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      author: 'Sarah Jenkins',
      rating: 5,
      title: 'Life-changing posture support!',
      content: 'I used to suffer from severe lower back pain after 4 hours of sitting. After switching to the Apollo chair, I can work a full 8-hour day and feel completely refreshed. The lumbar support aligns automatically.',
      date: 'May 12, 2026',
      verified: true
    },
    {
      id: 'rev-2',
      author: 'Marcus Chen',
      rating: 4,
      title: 'Excellent adjustability, slightly firm seat',
      content: 'The armrests and tilt controls are highly customizable. My only minor complaint is that the seat cushion is a bit firmer than expected, but it is still highly supportive and comfortable.',
      date: 'April 28, 2026',
      verified: true
    }
  ]);

  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newAuthor || !newTitle || !newContent) {
      alert('Please fill out all fields.');
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      title: newTitle,
      content: newContent,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      verified: false
    };

    setReviews([newReview, ...reviews]);
    setNewAuthor('');
    setNewTitle('');
    setNewContent('');
    setNewRating(5);
    alert('Thank you! Your review has been submitted for moderation.');
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl space-y-12">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12">
            <div className="md:col-span-5 flex flex-col justify-between">
              <div className="aspect-square w-full rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200/50 dark:bg-slate-800 dark:border-slate-700/50">
                <span className="text-slate-400 dark:text-slate-500 font-medium">Product ID: {id} Image</span>
              </div>
              <div className="mt-4 hidden md:block">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Product Specs</h3>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                  Top Rated
                </span>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {product.name}
                </h1>
                <p className="mt-2 text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                  {product.price}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    4.5 (Based on {reviews.length} customer reviews)
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Description</h2>
                <p className="mt-2 text-sm text-slate-650 leading-relaxed dark:text-slate-350">
                  {product.description}
                </p>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/10 transition-all hover:bg-indigo-700 hover:shadow-indigo-700/20 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                  Buy Now
                </button>
                <button className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Customer Reviews
            </h2>

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  No approved reviews yet. Be the first to add one!
                </div>
              ) : (
                reviews.map((rev) => (
                  <article key={rev.id} className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800/60 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{rev.author}</span>
                        {rev.verified && (
                          <span className="ml-2 inline-flex items-center rounded bg-emerald-50 px-1.5 py-0.5 text-3xs font-semibold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{rev.date}</span>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`h-4 w-4 ${i < rev.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-700'}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{rev.title}</h4>
                    </div>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed dark:text-slate-450">
                      {rev.content}
                    </p>
                  </article>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-6 rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-md backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/70">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Share Your Experience</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Help other developers by contributing an honest quality review.
              </p>

              <form onSubmit={handleAddReview} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="review-author" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Your Name
                  </label>
                  <input
                    id="review-author"
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Jane Doe"
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white/50 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/50 dark:focus:border-indigo-400"
                  />
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Rating
                  </span>
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="text-2xl transition duration-150 ease-in-out transform hover:scale-110 focus:outline-none"
                      >
                        <span
                          className={`${
                            star <= (hoverRating ?? newRating)
                              ? 'text-amber-400'
                              : 'text-slate-200 dark:text-slate-700'
                          }`}
                        >
                          ★
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="review-title" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Review Summary
                  </label>
                  <input
                    id="review-title"
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Ergonomic perfection!"
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white/50 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/50 dark:focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label htmlFor="review-content" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Review Details
                  </label>
                  <textarea
                    id="review-content"
                    rows={4}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Describe product ergonomics, assembly process, and quality..."
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white/50 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/50 dark:focus:border-indigo-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
