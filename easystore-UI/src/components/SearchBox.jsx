export default function SearchBox({ label, placeholder, value, handleSearch }) {
  return (
    <div className="flex items-center gap-4 px-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-sepia dark:text-paper/60 shrink-0">
        {label} /
      </label>
      <input
        type="text"
        className="field-atelier font-display text-xl"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
