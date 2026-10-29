import { useEffect, useRef } from "react";

export default function ModalExplicativo({ conteudo, onClose }) {
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const conteudoSeguro = conteudo ?? {
    titulo: "Explicação indisponível",
    categoria: "Conteúdo educativo",
    secoes: [
      {
        titulo: "Não foi possível carregar esta explicação",
        texto: "O conteúdo deste módulo não está disponível no momento.",
      },
    ],
    atencao: "Verifique o cadastro do módulo e tente novamente.",
  };

  useEffect(() => {
    if (!conteudo) {
      console.error("Conteúdo educativo não encontrado para o módulo.");
    }

    openerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const elementoAnteriormenteFocado = openerRef.current;
    const focoInicial = dialogRef.current?.querySelector("button");
    focoInicial?.focus();

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const elementosFocaveis = () =>
      dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) ?? [];

    const controlarTeclado = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focaveis = [...elementosFocaveis()];
      if (!focaveis.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (event.shiftKey && document.activeElement === primeiro) {
        event.preventDefault();
        ultimo.focus();
      } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault();
        primeiro.focus();
      }
    };

    document.addEventListener("keydown", controlarTeclado, true);
    return () => {
      document.removeEventListener("keydown", controlarTeclado, true);
      document.body.style.overflow = overflowAnterior;
      if (elementoAnteriormenteFocado?.isConnected)
        elementoAnteriormenteFocado.focus();
    };
  }, [conteudo, onClose]);

  if (!conteudoSeguro) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="educational-dialog-title"
        onClick={(event) => event.stopPropagation()}
        className="relative my-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-rose-300/20 bg-[#0c1220] p-6 shadow-2xl shadow-black/50 sm:p-8"
      >
        <button
          type="button"
          aria-label="Fechar explicação"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-xl text-slate-400 transition hover:border-rose-300/40 hover:text-white"
        >
          ×
        </button>
        <p className="pr-10 text-xs uppercase tracking-[0.2em] text-rose-300">
          {conteudoSeguro.categoria}
        </p>
        <h2
          id="educational-dialog-title"
          className="mt-3 pr-10 text-3xl font-semibold tracking-tight"
        >
          {conteudoSeguro.titulo}
        </h2>
        <div className="mt-8 space-y-6">
          {conteudoSeguro.secoes.map((secao) => (
            <section key={secao.titulo}>
              <h3 className="text-lg font-medium text-slate-100">
                {secao.titulo}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {secao.texto}
              </p>
            </section>
          ))}
          {conteudoSeguro.lista && (
            <ul className="space-y-2 text-sm leading-6 text-slate-300">
              {conteudoSeguro.lista.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-rose-300">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          <aside className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200">
              Atenção científica
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {conteudoSeguro.atencao}
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
