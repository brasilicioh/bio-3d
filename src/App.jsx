import { useEffect, useState } from "react";
import Menu from "./modules/menu/Menu";
import { modulos } from "./data/modulos";

export default function App() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);

  useEffect(() => {
    if (!window.history.state?.bioLab)
      window.history.replaceState({ bioLab: "menu" }, "", window.location.href);

    const handlePopState = (e) => {
      if (e.state?.bioLab === "visualizacao") {
        const opcao = modulos.find((item) => item.id === e.state.modeloId);
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
    const Modulo = opcaoSelecionada.componente;
    return <Modulo modulo={opcaoSelecionada} onVoltar={voltarAoMenu} />;
  }

  return <Menu onSelecionar={selecionarOpcao} />;
}
