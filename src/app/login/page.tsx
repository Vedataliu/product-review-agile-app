import Link from 'next/link'

export default function Login() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-[#09090b] px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-950/50 to-zinc-950 pointer-events-none" />
      
      <div className="relative w-full max-w-md p-8 rounded-2xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
              <span className="text-black font-black text-sm">R</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">ReviewQuality</span>
          </Link>
          <h2 className="text-2xl font-semibold text-white">Sign in to your account</h2>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-950 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 text-sm transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-950 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 text-sm transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-black bg-white hover:bg-zinc-200 transition-colors text-sm"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-500">
          Don't have an account? <span className="text-white hover:underline cursor-pointer">Sign up</span>
        </div>
      </div>
    </div>
  )
}
