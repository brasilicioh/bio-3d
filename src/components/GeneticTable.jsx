import { useMemo, useState } from "react";

const genotipos = ["AA", "Aa", "aa"];

function formarGenotipo(alelo1, alelo2) {
  return [alelo1, alelo2]
    .sort((a, b) => {
      if (a === "A") return -1;
      if (b === "A") return 1;
      return 0;
    })
    .join("");
}

function SeletorGenotipo({ nome, valor, onChange }) {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-300">
      {nome}
      <select
        value={valor}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-white/10 bg-[#111a2b] px-4 py-3 text-slate-100 outline-none transition focus:border-rose-300/60"
      >
        {genotipos.map((genotipo) => (
          <option key={genotipo} value={genotipo}>
            {genotipo}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function GeneticTable({ onVoltar }) {
  const [genotipoPai, setGenotipoPai] = useState("Aa");
  const [genotipoMae, setGenotipoMae] = useState("Aa");

  const dados = useMemo(() => {
    const alelosPai = genotipoPai.split("");
    const alelosMae = genotipoMae.split("");
    const combinacoes = alelosMae.flatMap((aleloMae) =>
      alelosPai.map((aleloPai) => formarGenotipo(aleloPai, aleloMae)),
    );
    const quantidadeAa = combinacoes.filter(
      (genotipo) => genotipo === "aa",
    ).length;

    return {
      alelosPai,
      alelosMae,
      combinacoes,
      probabilidadeRecessiva: (quantidadeAa / combinacoes.length) * 100,
    };
  }, [genotipoPai, genotipoMae]);

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

        <section className="grid flex-1 gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:py-14">
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_12px_#fb7185]" />
              <span className="text-xs uppercase tracking-[0.25em] text-rose-300">
                Genética
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Quadrado de Punnett
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Escolha os genótipos dos pais para visualizar as combinações
              possíveis de alelos em seus descendentes.
            </p>

            <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#0a1120] p-5 sm:p-8 lg:mt-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(190,24,93,0.13),transparent_58%)]"
              />

              <div className="relative z-10 grid gap-4 sm:grid-cols-2">
                <SeletorGenotipo
                  nome="Genótipo do pai"
                  valor={genotipoPai}
                  onChange={setGenotipoPai}
                />
                <SeletorGenotipo
                  nome="Genótipo da mãe"
                  valor={genotipoMae}
                  onChange={setGenotipoMae}
                />
              </div>

              <div className="relative z-10 mt-8 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-center">
                  <caption className="mb-3 text-left text-xs uppercase tracking-[0.2em] text-slate-500">
                    Combinações possíveis
                  </caption>
                  <thead>
                    <tr>
                      <th className="border border-white/10 bg-white/[0.03] p-3 text-xs font-normal text-slate-500">
                        Mãe \ Pai
                      </th>
                      {dados.alelosPai.map((alelo, index) => (
                        <th
                          key={`pai-${index}`}
                          className="border border-white/10 bg-cyan-700/40 p-3 text-lg font-medium text-blue-400"
                        >
                          {alelo}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dados.alelosMae.map((aleloMae, linha) => (
                      <tr key={`mae-${linha}`}>
                        <th className="border border-white/10 bg-rose-400/10 p-3 text-lg font-medium text-rose-200">
                          {aleloMae}
                        </th>
                        {dados.alelosPai.map((aleloPai, coluna) => {
                          const resultado =
                            dados.combinacoes[linha * 2 + coluna];
                          return (
                            <td
                              key={`${linha}-${coluna}`}
                              className={`border border-white/10 p-4 text-lg font-semibold ${
                                resultado === "aa"
                                  ? "bg-amber-400/15 text-amber-200"
                                  : resultado === "Aa"
                                    ? "bg-white/[0.03] text-slate-200"
                                    : "bg-cyan-400/10 text-cyan-200"
                              }`}
                            >
                              {resultado}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="relative z-10 mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200">
                  Possibilidade de doença genética recessiva
                </p>
                <p className="mt-3 text-3xl font-semibold text-amber-100">
                  {dados.probabilidadeRecessiva}%
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Nesta simulação, a condição aparece quando o descendente
                  recebe o alelo recessivo de ambos os pais e forma o genótipo
                  <strong className="text-amber-100"> aa</strong>.
                </p>
              </div>
            </div>
          </div>

          <aside className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Como interpretar
            </p>
            <h2 className="mt-4 text-lg font-medium">Um alelo de cada pai.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Cada progenitor fornece um alelo. O quadrado cruza essas
              possibilidades e mostra quatro resultados igualmente prováveis
              nesta representação.
            </p>

            <div className="mt-8 space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
              <p>
                <strong className="text-cyan-200">AA</strong> · homozigoto
                dominante
              </p>
              <p>
                <strong className="text-slate-200">Aa</strong> · heterozigoto
              </p>
              <p>
                <strong className="text-amber-200">aa</strong> · homozigoto
                recessivo
              </p>
            </div>

            <p className="mt-6 text-xs leading-5 text-slate-500">
              A atividade é uma simplificação: doenças reais podem envolver
              vários genes, penetrância e outros fatores além do genótipo.
            </p>
          </aside>
        </section>

        <footer className="border-t border-white/10 py-5 text-xs text-slate-600">
          BIOMAKET · QUADRADO DE PUNNETT
        </footer>
      </div>
    </main>
  );
}
