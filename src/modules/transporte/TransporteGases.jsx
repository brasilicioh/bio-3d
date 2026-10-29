import { useState } from "react";
import BotaoExplicar from "../../components/educativo/BotaoExplicar";
import ModalExplicativo from "../../components/educativo/ModalExplicativo";
import TransporteGasesBase from "../../components/TransporteGases";
import { conteudoEducativo } from "../../data/conteudoEducativo";

export default function TransporteGases({ modulo, onVoltar }) {
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);
  return (
    <>
      <TransporteGasesBase onVoltar={onVoltar} />
      <div className="fixed bottom-6 right-6 z-20">
        <BotaoExplicar onClick={() => setMostrarExplicacao(true)} />
      </div>
      {mostrarExplicacao && (
        <ModalExplicativo
          conteudo={conteudoEducativo[modulo.id]}
          onClose={() => setMostrarExplicacao(false)}
        />
      )}
    </>
  );
}
