import Link from 'next/link'
import Auth from "@/components/Auth"

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
        <Auth />
      </div>
    </div>
  )
}