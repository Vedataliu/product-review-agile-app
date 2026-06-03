export default function Footer() {
  return (
    <footer className="w-full border-t border-border/60 bg-card/30 backdrop-blur-sm py-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
        <div>
          &copy; {new Date().getFullYear()} ReviewQuality Platform. All rights reserved.
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-center">
          <span className="font-semibold text-foreground/70">Created by:</span>
          <span>Ermal Aliu</span>
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
          <span>Bardh Ahmeti</span>
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
          <span>Vedat Aliu</span>
        </div>
      </div>
    </footer>
  );
}
