import Modelo3D from "./Modelo3D";

export default function Visualizacao3D({ titulo, onVoltar }) {
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

          <span className="text-xs font-medium tracking-[0.2em] text-slate-500">
            BIO/LAB
          </span>
        </header>

        <section className="grid flex-1 gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center lg:py-14">
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_12px_#fb7185]" />
              <span className="text-xs uppercase tracking-[0.25em] text-rose-300">
                Visualização biológica
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              {titulo}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Observe a estrutura em três dimensões. Gire o modelo, aproxime os
              detalhes e explore a forma desta estrutura biológica.
            </p>

            <div className="relative mt-8 h-[55vh] min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-[#0a1120] sm:h-[65vh] lg:mt-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(190,24,93,0.13),transparent_58%)]"
              />

              <div className="pointer-events-none absolute inset-0 z-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />

              <div className="absolute left-5 top-5 z-10 text-[10px] tracking-[0.2em] text-slate-500">
                3D SPECIMEN / 001
              </div>

              <div className="absolute bottom-5 left-5 z-10 text-xs text-slate-500">
                Arraste para explorar · Scroll para zoom
              </div>

              <div className="absolute inset-0">
                <Modelo3D />
              </div>
            </div>
          </div>

          <aside className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Sobre a experiência
            </p>

            <h2 className="mt-4 text-lg font-medium">Observe de perto.</h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Explore o modelo em diferentes ângulos. A visualização interativa
              permite observar a estrutura espacial de uma maneira diferente de
              uma imagem estática.
            </p>

            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-xs text-slate-500">CONTROLES</p>

              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p>↔ Arrastar — girar</p>
                <p>⌕ Scroll — aproximar</p>
                <p>⟲ Clique direito — deslocar</p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-rose-300/15 bg-rose-300/5 p-4">
              <p className="text-xs text-rose-200">NOTA CIENTÍFICA</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                A representação visual é ilustrativa. Consulte referências
                científicas para detalhes sobre a estrutura e suas funções.
              </p>
            </div>
          </aside>
        </section>

        <footer className="border-t border-white/10 py-5 text-xs text-slate-600">
          BIO/LAB · VISUALIZAÇÃO INTERATIVA
        </footer>
      </div>
    </main>
  );
}
