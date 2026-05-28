import Link from 'next/link'

export default function Admin() {
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
            <Link href="/reviews" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Reviews
            </Link>
            <Link href="/admin" className="text-sm font-medium text-white">
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Content Moderation</h1>
          <p className="text-zinc-400 text-sm mt-1">Approve, reject, or edit pending product reviews.</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/10 backdrop-blur-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Pending Moderation Queue</span>
            <span className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400">1 review pending</span>
          </div>

          <div className="divide-y divide-zinc-800/60">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white">Smart Wireless Headphones</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">Pending</span>
                </div>
                <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
                  "This product is fake, don't buy it! The package arrived completely empty."
                </p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>By User #9482</span>
                  <span>Flagged: Potential spam/abuse</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button className="px-4 py-2 text-xs font-semibold rounded bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
                  Reject
                </button>
                <button className="px-4 py-2 text-xs font-semibold rounded bg-white text-black hover:bg-zinc-200 transition-colors">
                  Approve
                </button>
              </div>
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
