import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink dark:border-paper mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        <p className="font-display text-2xl italic text-ink dark:text-paper">
          Eazy Stickers
        </p>

        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60 text-center">
          Vinyl · Matte · Holographic — Workshop № 21
        </p>

        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink dark:text-paper text-right">
          Built with{" "}
          <FontAwesomeIcon icon={faHeart} className="text-coral mx-1 animate-pulse w-3 h-3" aria-hidden="true" />{" "}
          by{" "}
          <a
            href="https://eazybytes.com/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-2 underline-offset-4 decoration-coral hover:text-coral transition-colors"
          >
            eazybytes
          </a>
        </p>
      </div>
    </footer>
  );
}
