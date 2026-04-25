export default function Price({ currency = "₹", price }) {
  return (
    <span className="font-display text-2xl text-ink dark:text-paper tabular">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-sepia dark:text-paper/60 mr-1">
        INR
      </span>
      {currency}
      {Number(price).toFixed(2)}
    </span>
  );
}
