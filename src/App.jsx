import { useState } from "react";
import Menu from "./components/Menu";
import Visualizacao3D from "./components/Visualizacao3D";

export default function App() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);

  if (opcaoSelecionada) {
    return (
      <Visualizacao3D
        titulo={opcaoSelecionada}
        onVoltar={() => setOpcaoSelecionada(null)}
      />
    );
  }

  return <Menu onSelecionar={setOpcaoSelecionada} />;
}
