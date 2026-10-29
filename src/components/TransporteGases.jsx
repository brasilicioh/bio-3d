import { useEffect, useState } from "react";

const etapas = [
  {
    titulo: "Representação estática",
    texto:
      "Com movimento reduzido, o fluxo é apresentado de forma estática para facilitar a leitura.",
  },
  {
    titulo: "Nos pulmões",
    texto: "A hemácia aparece com O₂ ligado principalmente à hemoglobina.",
  },
  {
    titulo: "Entrega do oxigênio",
    texto:
      "Hemácia e O₂ seguem juntos até os tecidos, onde o oxigênio é liberado.",
  },
  {
    titulo: "Retorno",
    texto:
      "A hemácia recolhe CO₂ produzido pelos tecidos e retorna aos pulmões.",
  },
];

export default function TransporteGases({ onVoltar }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onVoltar();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onVoltar]);

  const [etapaAtual, setEtapaAtual] = useState(0);

  useEffect(() => {
    let timeoutId;
    let desmontado = false;
    const fases = [
      [2400, 1],
      [8000, 2],
      [850, 3],
      [5750, 0],
    ];
    let faseAtual = 0;

    const agendarFase = () => {
      const [duracao, proximaEtapa] = fases[faseAtual];
      timeoutId = window.setTimeout(() => {
        if (desmontado) return;
        setEtapaAtual(proximaEtapa);
        faseAtual = (faseAtual + 1) % fases.length;
        agendarFase();
      }, duracao);
    };

    agendarFase();
    return () => {
      desmontado = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  const etapa = etapas[etapaAtual];

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
            BIOMAKET
          </span>
        </header>

        <section className="grid flex-1 gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center lg:py-14">
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_12px_#fb7185]" />
              <span className="text-xs uppercase tracking-[0.25em] text-rose-300">
                Animação biológica
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Transporte de gases
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Acompanhe o caminho do oxigênio e do dióxido de carbono pelo
              sangue.
            </p>

            <div className="relative mt-8 min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-[#0a1120] p-5 sm:min-h-[470px] sm:p-8 lg:mt-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(190,24,93,0.13),transparent_58%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:48px_48px]"
              />

              <div className="relative z-10 flex items-start justify-between text-[10px] tracking-[0.2em] text-slate-500">
                <span>PULMÕES</span>
                <span>TECIDO</span>
              </div>

              <div className="transport-scene relative mt-16 h-44 sm:mt-24">
                <div className="artery absolute left-0 right-0 top-12 h-20 rounded-full border-4 border-rose-950/80 bg-gradient-to-b from-rose-500/30 via-red-950/90 to-rose-950/80 shadow-[0_0_35px_rgba(225,29,72,0.2)]" />

                <div className="gas-particle oxygen-particle absolute top-7 rounded-full border border-cyan-300/50 bg-cyan-300/20 px-2 py-1 text-[10px] font-semibold text-cyan-200">
                  O₂
                </div>
                <div className="gas-particle carbon-particle absolute top-7 rounded-full border border-amber-300/50 bg-amber-300/20 px-2 py-1 text-[10px] font-semibold text-amber-200">
                  CO₂
                </div>

                <div className="red-cell absolute left-0 top-[4.05rem] z-10 flex h-12 w-16 items-center justify-center rounded-[50%] border-4 border-red-300/40 bg-gradient-to-br from-red-400 via-rose-600 to-red-950 text-[9px] font-bold text-red-100 shadow-[0_0_20px_rgba(244,63,94,0.5)]">
                  HEMÁCIA
                </div>
              </div>

              <div className="relative z-10 mt-10 border-t border-white/10 pt-5 sm:mt-16">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-300">
                  {etapa.titulo}
                </p>
                <p className="mt-2 text-sm text-slate-300">{etapa.texto}</p>
              </div>
            </div>
          </div>

          <aside className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Sobre a experiência
            </p>
            <h2 className="mt-4 text-lg font-medium">Um ciclo contínuo.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              A hemoglobina transporta a maior parte do O₂. Nos tecidos, ele é
              liberado e o CO₂ produzido pelas células é recolhido para voltar
              aos pulmões.
            </p>
            <div className="mt-8 rounded-xl border border-rose-300/15 bg-rose-300/5 p-4">
              <p className="text-xs text-rose-200">LEGENDA</p>
              <p className="mt-2 text-xs leading-5 text-cyan-200">
                O₂ · oxigênio
              </p>
              <p className="text-xs leading-5 text-amber-200">
                CO₂ · dióxido de carbono
              </p>
            </div>
          </aside>
        </section>

        <footer className="border-t border-white/10 py-5 text-xs text-slate-600">
          BIOMAKET · TRANSPORTE NO SANGUE
        </footer>
      </div>
    </main>
  );
}
