import Link from 'next/link'

export default function Reviews() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#09090b]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-950/50 to-zinc-950 pointer-events-none" />

      <header className="relative z-10 border-b border-zinc-800/80 bg-zinc-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <span className="text-black font-black text-lg">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">AgileReview</span>
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
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Product Reviews</h1>
            <p className="text-zinc-400 text-sm mt-1">Browse, add, and manage user feedback.</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors">
            Write a Review
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/10 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-white">Smart Wireless Headphones</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">5.0 ★</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Excellent sound signature and superb build quality. Highly recommended for daily commuters.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>By Sarah K.</span>
              <span>2 hours ago</span>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/10 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-white">Ultra Ergonomic Keyboard</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">4.5 ★</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Takes some time getting used to, but the strain on my wrists is completely gone now.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>By Michael M.</span>
              <span>1 day ago</span>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/10 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-white">High-Speed SSD 2TB</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">3.8 ★</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Speeds are fantastic, but the thermals run slightly hot under sustained workloads.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>By Elena R.</span>
              <span>3 days ago</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-zinc-900 py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs text-zinc-500">
          <div>&copy; {new Date().getFullYear()} AgileReview. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
