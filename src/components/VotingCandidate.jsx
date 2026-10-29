import { useEffect } from "react";
import { FotoCandidato } from "./Voting";

export default function VotingCandidate({ candidato, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-5 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="candidate-dialog-title"
        className="relative my-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-violet-300/20 bg-[#0c1220] p-6 shadow-2xl shadow-black/50 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Fechar informações do candidato"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-xl text-slate-400 transition hover:border-violet-300/40 hover:text-white"
        >
          ×
        </button>

        <div className="grid gap-8 sm:grid-cols-[150px_minmax(0,1fr)]">
          <FotoCandidato
            candidato={candidato}
            className="mx-auto w-36 sm:mx-0"
          />

          <div className="pr-8">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
              Candidato · número {candidato.numero}
            </p>
            <h2
              id="candidate-dialog-title"
              className="mt-3 text-4xl font-semibold tracking-tight"
            >
              {candidato.nome}
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.14em] text-slate-400">
              {candidato.partido}
            </p>
            <p className="mt-5 text-lg italic leading-7 text-slate-200">
              “{candidato.slogan}”
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
              Perfil
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {candidato.perfil}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
              Propostas
            </p>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
              {candidato.propostas.map((proposta) => (
                <li key={proposta} className="flex gap-3">
                  <span className="text-violet-300">•</span>
                  <span>{proposta}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
