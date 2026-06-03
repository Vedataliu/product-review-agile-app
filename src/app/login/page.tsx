import Link from 'next/link'
import Auth from "@/components/Auth"

export default function Login() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-background text-foreground transition-colors duration-300 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-background/40 to-background pointer-events-none" />

      <div className="relative w-full max-w-md p-8 rounded-2xl border border-border bg-card/45 backdrop-blur-md shadow-xl transition-all duration-300">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="flex items-center gap-2 mb-4 group">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
              <span className="font-black text-sm">R</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground transition-colors group-hover:text-primary">ReviewQuality</span>
          </Link>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Sign in to your account</h2>
        </div>
        <Auth />
      </div>
    </div>
  )
}