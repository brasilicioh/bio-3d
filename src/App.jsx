import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import { opcoes } from "./components/modelos";
import Visualizacao3D from "./components/Visualizacao3D";
import TransporteGases from "./components/TransporteGases";
import GeneticTable from "./components/GeneticTable";
import Voting from "./components/Voting";

export default function App() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);

  useEffect(() => {
    if (!window.history.state?.bioLab)
      window.history.replaceState({ bioLab: "menu" }, "", window.location.href);

    const handlePopState = (e) => {
      if (e.state?.bioLab === "visualizacao") {
        const opcao = opcoes.find((item) => item.id === e.state.modeloId);
        setOpcaoSelecionada(opcao ?? null);
      } else setOpcaoSelecionada(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const selecionarOpcao = (op) => {
    window.history.pushState(
      { bioLab: "visualizacao", modeloId: op.id },
      "",
      window.location.href,
    );
    setOpcaoSelecionada(op);
  };

  const voltarAoMenu = () => {
    if (window.history.state?.bioLab === "visualizacao") {
      window.history.back();
      return;
    }

    setOpcaoSelecionada(null);
  };

  if (opcaoSelecionada) {
    if (opcaoSelecionada.tipo === "transporte")
      return <TransporteGases onVoltar={voltarAoMenu} />;

    if (opcaoSelecionada.tipo === "genetic-table")
      return <GeneticTable onVoltar={voltarAoMenu} />;

    if (opcaoSelecionada.tipo === "voting")
      return <Voting onVoltar={voltarAoMenu} />;

    return (
      <Visualizacao3D
        titulo={opcaoSelecionada.titulo}
        modelObject={opcaoSelecionada}
        onVoltar={voltarAoMenu}
      />
    );
  }

  return <Menu onSelecionar={selecionarOpcao} />;
}
