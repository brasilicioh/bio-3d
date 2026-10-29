import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { candidatos } from "../data/candidatos";

function carregarVotos() {
  let armazenado = {};
  let salvo = null;
  try {
    salvo = localStorage.getItem("votosBioLab");
    const valor = salvo ? JSON.parse(salvo) : {};
    if (valor && typeof valor === "object" && !Array.isArray(valor)) {
      armazenado = valor;
    }
  } catch {
    armazenado = {};
  }

  const votosIniciais = candidatos.reduce(
    (contagem, candidato) => ({
      ...contagem,
      [candidato.id]:
        Number.isInteger(Number(armazenado[candidato.id])) &&
        Number(armazenado[candidato.id]) >= 0
          ? Number(armazenado[candidato.id])
          : 0,
    }),
    {},
  );

  if (!salvo) {
    try {
      localStorage.setItem("votosBioLab", JSON.stringify(votosIniciais));
    } catch {
      // A votação continua funcionando em memória quando o armazenamento não está disponível.
    }
  }

  return votosIniciais;
}

function salvarVotos(votos) {
  try {
    localStorage.setItem("votosBioLab", JSON.stringify(votos));
    return true;
  } catch {
    return false;
  }
}

function tocarSom(tipo) {
  if (tipo === "confirmar") {
    const somUrna = new Audio(
      `${import.meta.env.BASE_URL}sounds/urna_confirma.mp3`,
    );
    somUrna.volume = 0.45;
    somUrna.play().catch(() => tocarSomSintetico(tipo));
    return;
  }

  tocarSomSintetico(tipo);
}

function tocarSomSintetico(tipo) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const contexto = new AudioContext();
  const oscilador = contexto.createOscillator();
  const ganho = contexto.createGain();
  const frequencia = tipo === "confirmar" ? 880 : tipo === "erro" ? 180 : 520;

  oscilador.type = "square";
  oscilador.frequency.value = frequencia;
  ganho.gain.setValueAtTime(0.06, contexto.currentTime);
  ganho.gain.exponentialRampToValueAtTime(0.001, contexto.currentTime + 0.12);
  oscilador.connect(ganho);
  ganho.connect(contexto.destination);
  oscilador.start();
  oscilador.stop(contexto.currentTime + 0.12);
  oscilador.addEventListener("ended", () => contexto.close());
}

function Tecla({ children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-14 items-center justify-center rounded-md border border-slate-950/40 bg-[#3f4b57] text-2xl font-semibold shadow-[0_3px_0_#202830] transition hover:bg-[#4d5b68] active:translate-y-0.5 active:shadow-none sm:h-16 ${className}`}
    >
      {children}
    </button>
  );
}

export default function VotingArea({ onVoltar }) {
  const [numero, setNumero] = useState("");
  const [branco, setBranco] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [votos, setVotos] = useState(carregarVotos);
  const [avisoArmazenamento, setAvisoArmazenamento] = useState("");
  const estadoRef = useRef({ numero, branco, confirmado, votos });
  useEffect(() => {
    estadoRef.current = { numero, branco, confirmado, votos };
  }, [branco, confirmado, numero, votos]);

  const candidato = useMemo(
    () => candidatos.find((item) => item.numero === numero),
    [numero],
  );

  const adicionarNumero = useCallback((digito) => {
    const estado = estadoRef.current;
    if (estado.confirmado || estado.branco || estado.numero.length >= 2) return;
    tocarSom("tecla");
    setNumero((valor) => valor + digito);
  }, []);

  const corrigir = useCallback(() => {
    if (estadoRef.current.confirmado) return;
    tocarSom("tecla");
    setNumero("");
    setBranco(false);
  }, []);

  const votarEmBranco = useCallback(() => {
    if (estadoRef.current.confirmado) return;
    tocarSom("tecla");
    setNumero("");
    setBranco(true);
  }, []);

  const confirmar = useCallback(() => {
    const estado = estadoRef.current;
    const candidatoAtual = candidatos.find(
      (item) => item.numero === estado.numero,
    );
    if (estado.confirmado || (!candidatoAtual && !estado.branco)) {
      tocarSom("erro");
      return;
    }

    tocarSom("confirmar");
    if (candidatoAtual) {
      const novaContagem = {
        ...estado.votos,
        [candidatoAtual.id]: estado.votos[candidatoAtual.id] + 1,
      };
      setVotos(novaContagem);
      if (!salvarVotos(novaContagem)) {
        setAvisoArmazenamento(
          "O voto foi registrado apenas nesta sessão porque o armazenamento local não está disponível.",
        );
      }
    }
    setConfirmado(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onVoltar();
        return;
      }
      if (/^[0-9]$/.test(event.key)) {
        event.preventDefault();
        adicionarNumero(event.key);
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        confirmar();
        return;
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        corrigir();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [adicionarNumero, confirmar, corrigir, onVoltar]);

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={onVoltar}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="urna-title"
        className="my-auto w-full max-w-4xl overflow-hidden border-4 border-slate-700 bg-[#c9c9c4] shadow-2xl shadow-black/60"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-[#1f2933] px-4 py-3 text-white">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-slate-300">
              TSE · TRIBUNAL DO SISTEMA ERITROCITÁRIO
            </p>
            <h2 id="urna-title" className="mt-1 text-lg font-semibold">
              URNA ELETRÔNICA
            </h2>
          </div>
          <button
            type="button"
            onClick={onVoltar}
            aria-label="Fechar urna"
            className="text-2xl text-slate-300 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="grid gap-6 p-4 sm:p-8 lg:grid-cols-[1fr_280px]">
          {avisoArmazenamento && (
            <p className="lg:col-span-2 rounded border border-amber-700 bg-amber-100 px-3 py-2 text-sm text-amber-950">
              {avisoArmazenamento}
            </p>
          )}
          <div className="flex min-h-[360px] flex-col border-2 border-slate-700 bg-[#ecece8] p-4 text-slate-900 shadow-inner sm:p-6">
            {confirmado ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <p className="text-3xl font-black uppercase">FIM</p>
                <p className="mt-4 text-sm">Seu voto foi registrado.</p>
                <div className="mt-6 w-full max-w-xs border-t border-slate-400 pt-4 text-left">
                  <p className="text-xs font-bold uppercase">
                    Apuração parcial
                  </p>
                  {candidatos.map((item) => (
                    <p
                      key={item.id}
                      className="mt-2 flex justify-between text-sm"
                    >
                      <span>
                        {item.nome} ({item.numero})
                      </span>
                      <strong>{votos[item.id]} voto(s)</strong>
                    </p>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={onVoltar}
                  className="mt-8 bg-[#1f2933] px-5 py-3 text-sm font-bold text-white"
                >
                  SAIR DA URNA
                </button>
              </div>
            ) : (
              <>
                <div className="border-b-2 border-slate-400 pb-4">
                  <p className="text-xs font-bold uppercase">
                    Escolha seu candidato
                  </p>
                  <p className="mt-2 text-sm">Digite o número e confirme.</p>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  {branco ? (
                    <p className="text-center text-3xl font-bold uppercase">
                      Voto em branco
                    </p>
                  ) : numero ? (
                    <div className="flex items-center justify-center gap-2">
                      {numero.split("").map((digito, index) => (
                        <span
                          key={`${digito}-${index}`}
                          className="flex h-16 w-12 items-center justify-center border-2 border-slate-700 bg-white text-4xl"
                        >
                          {digito}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-sm uppercase text-slate-500">
                      Digite o número do candidato
                    </p>
                  )}
                  {candidato && (
                    <div className="mt-8 border-t border-slate-400 pt-4 text-center">
                      <p className="font-bold">{candidato.nome}</p>
                      <p className="mt-1 text-sm">{candidato.partido}</p>
                      <p className="mt-2 text-xs italic">
                        “{candidato.slogan}”
                      </p>
                    </div>
                  )}
                  {numero.length === 2 && !candidato && (
                    <p className="mt-8 text-center font-bold uppercase text-red-700">
                      Número inválido
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {!confirmado && (
            <div className="grid grid-cols-[minmax(0,3fr)_minmax(92px,1fr)] gap-3 self-center rounded-md bg-[#343b42] p-4 shadow-inner">
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digito) => (
                  <Tecla
                    key={digito}
                    onClick={() => adicionarNumero(String(digito))}
                  >
                    {digito}
                  </Tecla>
                ))}
                <span aria-hidden="true" />
                <Tecla onClick={() => adicionarNumero("0")}>0</Tecla>
                <span aria-hidden="true" />
              </div>

              <div className="grid grid-rows-[1fr_1fr_2fr] gap-3">
                <Tecla
                  onClick={votarEmBranco}
                  className="bg-[#f5f5f2] text-black shadow-[0_3px_0_#a5a5a0] hover:bg-white"
                >
                  BRANCO
                </Tecla>
                <Tecla
                  onClick={corrigir}
                  className="bg-[#f6a623] text-black shadow-[0_3px_0_#a66d0c] hover:bg-[#ffb83d]"
                >
                  CORRIGE
                </Tecla>
                <Tecla
                  onClick={confirmar}
                  className="h-full bg-[#5cba5c] text-black shadow-[0_3px_0_#347b34] hover:bg-[#70c970]"
                >
                  CONFIRMA
                </Tecla>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
