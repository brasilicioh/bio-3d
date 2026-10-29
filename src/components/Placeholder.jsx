export default function Placeholder({ titulo, onVoltar }) {
  return (
    <main className="min-h-screen bg-[#070b14] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col px-5 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-white/10 py-5">
          <button
            type="button"
            onClick={onVoltar}
            className="group flex items-center gap-3 text-sm text-slate-400 transition hover:text-white"
          >
            <span className="transition group-hover:-translate-x-1">←</span>
            Voltar ao laboratório
          </button>
          <span className="text-xs font-medium tracking-[0.2em] text-slate-500">BIOMAKET</span>
        </header>
        <section className="flex flex-1 items-center justify-center py-16">
          <div className="max-w-lg text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-rose-300">Em breve</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">{titulo}</h1>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Falta escrever esta experiência. Ela será adicionada em breve.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
