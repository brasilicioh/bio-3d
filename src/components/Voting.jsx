import { useState, useEffect } from "react";
import { candidatos } from "../data/candidatos";
import VotingCandidate from "./VotingCandidate";
import VotingArea from "./VotingArea";

export function FotoCandidato({ candidato, className = "" }) {
  const [imagemFalhou, setImagemFalhou] = useState(false);

  return (
    <div
      className={`relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-[#151d2d] ${className}`}
    >
      {imagemFalhou ? (
        <div
          role="img"
          aria-label={`Imagem indisponível de ${candidato.nome}`}
          className="flex h-full items-center justify-center p-4 text-center text-xs text-slate-400"
        >
          Imagem indisponível
        </div>
      ) : (
        <img
          src={candidato.foto}
          alt={`Foto de ${candidato.nome}`}
          className="h-full w-full object-cover"
          onError={() => setImagemFalhou(true)}
        />
      )}
    </div>
  );
}

export default function Voting({ onVoltar }) {
  const [candidatoSelecionado, setCandidatoSelecionado] = useState(null);
  const [urnaOpened, setUrnaOpened] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      // Os modais têm seus próprios listeners e devem fechar antes do módulo.
      if (candidatoSelecionado || urnaOpened) return;

      event.preventDefault();
      onVoltar();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [candidatoSelecionado, onVoltar, urnaOpened]);

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

        <section className="flex-1 py-10 lg:py-14">
          <div className="mb-10 max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_#a78bfa]" />
              <span className="text-xs uppercase tracking-[0.25em] text-violet-300">
                Eleições do sistema circulatório
              </span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Conheça os candidatos
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
              Quatro componentes, quatro propostas e uma disputa pela
              administração do organismo.
            </p>
            <p className="mt-3 text-xs text-slate-600">
              Qualquer semelhança com eleições reais é mera coincidência.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {candidatos.map((candidato) => (
              <button
                key={candidato.id}
                type="button"
                onClick={() => setCandidatoSelecionado(candidato)}
                aria-label={`Ver informações de ${candidato.nome}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-violet-500/10 to-[#0c1220] p-4 text-left cursor-pointer transition duration-300 hover:-translate-y-1 hover:border-violet-300/40 hover:shadow-2xl hover:shadow-violet-950/20"
              >
                <FotoCandidato candidato={candidato} />

                <div className="mt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-medium tracking-tight">
                        {candidato.nome}
                      </h2>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-violet-300">
                        {candidato.partido}
                      </p>
                    </div>
                    <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xl font-semibold text-slate-200">
                      {candidato.numero}
                    </span>
                  </div>
                  <p className="mt-4 min-h-12 text-sm italic leading-5 text-slate-400">
                    “{candidato.slogan}”
                  </p>
                </div>
              </button>
            ))}
          </div>

          {candidatoSelecionado && (
            <VotingCandidate
              candidato={candidatoSelecionado}
              onClose={() => setCandidatoSelecionado(null)}
            />
          )}
        </section>

        <div className="flex justify-center pb-10">
          <button
            type="button"
            onClick={() => setUrnaOpened(true)}
            className="rounded-xl border border-violet-300/30 bg-violet-400/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-violet-200 transition hover:border-violet-200/60 hover:bg-violet-400/20"
          >
            Ative a urna
          </button>
        </div>

        {urnaOpened && <VotingArea onVoltar={() => setUrnaOpened(false)} />}

        <footer className="border-t border-white/10 py-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
            TSE · Tribunal do Sistema Eritrocitário
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Apuração concluída! A democracia circulatória agradece.
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Lembre-se: qualquer que seja o resultado, o organismo precisa de
            todos os seus componentes para funcionar!
          </p>
        </footer>
      </div>
    </main>
  );
}
