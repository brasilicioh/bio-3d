export default function BotaoVoltar({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 text-sm text-slate-400 transition hover:text-white"
    >
      <span className="transition group-hover:-translate-x-1">←</span>Voltar ao
      laboratório
    </button>
  );
}
