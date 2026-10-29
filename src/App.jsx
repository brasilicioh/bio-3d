import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import { opcoes } from "./components/modelos";
import Visualizacao3D from "./components/Visualizacao3D";

export default function App() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);

  useEffect(() => {
    if (!window.history.state?.bioLab) {
      window.history.replaceState({ bioLab: "menu" }, "", window.location.href);
    }

    const handlePopState = (event) => {
      if (event.state?.bioLab === "visualizacao") {
        const opcao = opcoes.find((item) => item.id === event.state.modeloId);
        setOpcaoSelecionada(opcao ?? null);
      } else {
        setOpcaoSelecionada(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const selecionarOpcao = (opcao) => {
    window.history.pushState(
      { bioLab: "visualizacao", modeloId: opcao.id },
      "",
      window.location.href,
    );
    setOpcaoSelecionada(opcao);
  };

  const voltarAoMenu = () => {
    if (window.history.state?.bioLab === "visualizacao") {
      window.history.back();
      return;
    }

    setOpcaoSelecionada(null);
  };

  if (opcaoSelecionada) {
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
