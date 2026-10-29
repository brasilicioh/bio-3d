import { useState } from "react";
import BotaoExplicar from "../../components/educativo/BotaoExplicar";
import ModalExplicativo from "../../components/educativo/ModalExplicativo";
import Visualizacao3DBase from "../../components/Visualizacao3D";
import { conteudoEducativo } from "../../data/conteudoEducativo";

export default function Visualizacao3D({ modulo, onVoltar }) {
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);
  return (
    <>
      <Visualizacao3DBase
        titulo={modulo.titulo}
        modelObject={modulo}
        onVoltar={onVoltar}
      />
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
