export default function Footer() {
  return (
    <footer className="site-footer px-5 py-8 md:px-8 border-t border-[#f4f1ea]/20">
      <div className="mx-auto flex flex-col md:flex-row justify-between items-center max-w-7xl gap-4 text-[#f4f1ea]/40 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
        <div>
          © 2026 RAKHA BIMA ARYA SAMBARANA
        </div>
        <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
          <span>JAKARTA, INDONESIA</span>
          <span>BUILT WITH NEXT.JS & TAILWIND</span>
        </div>
      </div>
    </footer>
  );
}
