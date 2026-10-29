export default function BotaoExplicar({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-rose-300/25 bg-rose-300/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-rose-200 transition hover:border-rose-200/60 hover:bg-rose-300/20"
    >
      <span aria-hidden="true">ⓘ</span>
      Explicar módulo
    </button>
  );
}
