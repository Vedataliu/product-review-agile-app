import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#09090b]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950/50 to-zinc-950 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-zinc-800/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-zinc-800/10 blur-[120px] pointer-events-none" />

      <header className="relative z-10 border-b border-zinc-800/80 bg-zinc-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <span className="text-black font-black text-lg">R</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">ReviewQuality</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/reviews" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Reviews
            </Link>
            <Link href="/admin" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Admin Moderation
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Setup complete and ready for GitHub commit
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Product Quality Review Management, <span className="text-zinc-400">Redefined.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl">
            A premium full-stack starter template built with Next.js, Supabase Database & Auth, Tailwind CSS v4, and Jest unit tests.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Link
              href="/reviews"
              className="px-6 py-3 rounded-lg font-medium text-center text-black bg-white hover:bg-zinc-200 transition-colors"
            >
              Browse Reviews
            </Link>
            <Link
              href="/admin"
              className="px-6 py-3 rounded-lg font-medium text-center text-white border border-zinc-850 hover:bg-zinc-900/50 transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-2">Next.js</h3>
            <p className="text-sm text-zinc-400">App Router boilerplate ready with static rendering and optimized metadata.</p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-2">Supabase SSR</h3>
            <p className="text-sm text-zinc-400">Complete server-side cookie client logic, browser client, and auth middleware set up.</p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-2">Tailwind v4</h3>
            <p className="text-sm text-zinc-400">Modern layout setup with dark theme config via CSS variables and seamless styling.</p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-2">Jest Testing</h3>
            <p className="text-sm text-zinc-400">Unit test setup configured using ts-node and React Testing Library.</p>
          </div>
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
