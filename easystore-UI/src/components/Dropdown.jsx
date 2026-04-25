export default function Dropdown({ label, options, value, handleSort }) {
  return (
    <div className="flex items-center gap-4 px-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-sepia dark:text-paper/60 shrink-0">
        {label} /
      </label>
      <select
        className="field-atelier font-display text-xl appearance-none cursor-pointer"
        value={value}
        onChange={(e) => handleSort(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
