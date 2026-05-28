'use client';

import React, { useState } from 'react';

export default function Auth() {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert(`Login submitted for email: ${email}`);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Sign Up submitted for email: ${email}`);
  };

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-md shadow-xl dark:border-slate-800/80 dark:bg-slate-900/70">
      <div className="flex border-b border-slate-100 dark:border-slate-800">
        <button
          id="auth-tab-login"
          type="button"
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-4 text-center text-sm font-semibold transition-all duration-300 ${
            activeTab === 'login'
              ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          Sign In
        </button>
        <button
          id="auth-tab-signup"
          type="button"
          onClick={() => setActiveTab('signup')}
          className={`flex-1 py-4 text-center text-sm font-semibold transition-all duration-300 ${
            activeTab === 'signup'
              ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          Sign Up
        </button>
      </div>

      <div className="p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            {activeTab === 'login'
              ? 'Access your product review moderation workspace.'
              : 'Join the product quality assurance team.'}
          </p>
        </div>

        {activeTab === 'login' ? (
          <form id="login-form" onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-400 dark:focus:bg-slate-950"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-400 dark:focus:bg-slate-950"
              />
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/10 transition-all hover:bg-indigo-700 hover:shadow-indigo-700/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Sign In
            </button>
          </form>
        ) : (
          <form id="signup-form" onSubmit={handleSignUpSubmit} className="space-y-5">
            <div>
              <label htmlFor="signup-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-400 dark:focus:bg-slate-950"
              />
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-400 dark:focus:bg-slate-950"
              />
            </div>

            <div>
              <label htmlFor="signup-confirm-password" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Confirm Password
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-400 dark:focus:bg-slate-950"
              />
            </div>

            <button
              id="signup-submit-btn"
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/10 transition-all hover:bg-indigo-700 hover:shadow-indigo-700/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
