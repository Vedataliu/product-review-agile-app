"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/components/Toast";

export default function Navbar() {
  const router = useRouter();
  const { showToast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data.user;

      setUser(currentUser);

      if (currentUser) {
        const { data: roleData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .maybeSingle();

        setRole(roleData?.role);

        const { data: rejectedReviews } = await supabase
          .from("reviews")
          .select("id, comment")
          .eq("user_id", currentUser.id)
          .eq("status", "rejected");

        if (rejectedReviews && rejectedReviews.length > 0) {
          const notifiedKey = `notified_rejected_${currentUser.id}`;
          const alreadyNotified = JSON.parse(sessionStorage.getItem(notifiedKey) || "[]");
          let updated = false;

          rejectedReviews.forEach((review) => {
            if (!alreadyNotified.includes(review.id)) {
              showToast(`Opinioni juaj është refuzuar nga administratori për shkak të gjuhës jo të përshtatshme.`, "error");
              alreadyNotified.push(review.id);
              updated = true;
            }
          });

          if (updated) {
            sessionStorage.setItem(notifiedKey, JSON.stringify(alreadyNotified));
          }
        }
      }
    };

    init();


    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? "border-b border-border/80 bg-background/80 backdrop-blur-md shadow-sm"
        : "border-b border-transparent bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/10 transition-transform duration-300 group-hover:scale-105">
            <span className="font-black text-lg">R</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground transition-colors group-hover:text-primary">
            ReviewQuality
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">

          {role === "user" && (
            <Link
              href="/reviews"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Reviews
            </Link>
          )}

          {role === "admin" && (
            <>
              <Link
                href="/admin"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin Moderation
              </Link>

              <Link
                href="/admin/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            </>
          )}

        </nav>

        <div className="flex items-center gap-4">

          <button
            onClick={toggleTheme}
            type="button"
            className="p-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-all duration-200"
          >
            {theme === "light" ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth={2} d="M12 3v1m0 16v1M21 12h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-xs text-muted-foreground font-medium max-w-[150px] truncate">
                {user.email}
              </span>

              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-xs font-semibold text-primary-foreground bg-primary rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-sm"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-primary-foreground bg-primary rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-sm"
            >
              Sign In
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}