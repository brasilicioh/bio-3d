const opcoes = [
  {
    id: "hemacia",
    numero: "01",
    titulo: "Hemácia normal",
    descricao:
      "Explore a estrutura e a forma de uma célula vermelha do sangue.",
    categoria: "CITOLOGIA",
    cor: "from-rose-500/20",
  },
  {
    id: "falciforme",
    numero: "02",
    titulo: "Anemia falciforme",
    descricao:
      "Entenda como uma alteração na hemoglobina modifica a forma da hemácia.",
    categoria: "GENÉTICA",
    cor: "from-orange-500/20",
  },
  {
    id: "genetico",
    numero: "03",
    titulo: "Código genético",
    descricao:
      "Descubra como a informação genética orienta a produção de proteínas.",
    categoria: "BIOLOGIA MOLECULAR",
    cor: "from-cyan-500/20",
  },
];

export default function Menu({ onSelecionar }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070b14] text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-rose-500/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-400/30 bg-rose-400/10 text-sm text-rose-300">
              B.
            </span>
            <span className="text-sm font-semibold tracking-wide">
              BIO<span className="text-slate-500">/LAB</span>
            </span>
          </a>

          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Laboratório interativo
          </span>
        </header>

        <section className="py-20 sm:py-28">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-rose-300">
            Ciência em outra perspectiva
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
            A vida,
            <br />
            <span className="text-slate-500">por dentro.</span>
          </h1>

          <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <p className="max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              Explore estruturas biológicas em três dimensões. Observe detalhes,
              compreenda formas e descubra o que existe além do que os olhos
              conseguem ver.
            </p>

            <span className="text-xs tracking-widest text-slate-500">
              03 EXPERIÊNCIAS
            </span>
          </div>
        </section>

        <section className="grid gap-4 pb-20 md:grid-cols-3">
          {opcoes.map((opcao) => (
            <button
              key={opcao.id}
              type="button"
              onClick={() => onSelecionar(opcao.titulo)}
              className={`group relative min-h-64 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${opcao.cor} to-[#0c1220] p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-rose-300/40 hover:shadow-2xl hover:shadow-rose-950/20 focus-visible:outline-2 focus-visible:outline-rose-300`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs tracking-[0.2em] text-slate-400">
                  {opcao.categoria}
                </span>

                <span className="text-sm text-slate-500 transition group-hover:text-rose-300">
                  ↗
                </span>
              </div>

              <div className="mt-12">
                <span className="text-xs text-slate-500">
                  EXPERIMENTO {opcao.numero}
                </span>

                <h2 className="mt-2 text-2xl font-medium tracking-tight">
                  {opcao.titulo}
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                  {opcao.descricao}
                </p>
              </div>

              <div className="pointer-events-none absolute -bottom-12 -right-6 h-36 w-36 rounded-full border border-white/[0.06] transition duration-500 group-hover:scale-125" />
            </button>
          ))}
        </section>

        <footer className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <span> BIO/LAB — Explorando a vida em 3D</span>
          <span>CIÊNCIA · VISUALIZAÇÃO · DESCOBERTA</span>
        </footer>
      </div>
    </main>
  );
}
