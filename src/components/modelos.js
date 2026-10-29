import bloodVesselModel from "@models/blood_vessel_collection_of_thunthu.glb?url";
import redBloodCellsModel from "@models/red_blood_cells_erythrocytes.glb?url";
import sickleCellModel from "@models/sickle_cell.glb?url";

export const opcoes = [
  {
    id: "oxygen-transport",
    numero: "01",
    titulo: "Transporte de oxigênio e CO₂",
    descricao: "Acompanhe a hemácia entregando oxigênio e recolhendo dióxido de carbono.",
    categoria: "FISIOLOGIA",
    cor: "from-cyan-500/20",
    tipo: "transporte",
  },
  {
    id: "red-blood-cells",
    numero: "02",
    titulo: "Hemácias",
    descricao: "Explore a estrutura e a forma dos glóbulos vermelhos.",
    categoria: "CITOLOGIA",
    cor: "from-cyan-500/20",
    modelUrl: redBloodCellsModel,
    //                   camera,       ambientLight, directionalLight, intensity
    props3d: [{ position: [0, 0, 5], fov: 30 }, 0.2, [3, 5, 5], 3],
  },
  {
    id: "blood-vessel",
    numero: "03",
    titulo: "Hemoglobina e Oxigênio",
    descricao:
      "Observe uma representação da hemácia transportando hemoglobina e oxigênio.",
    categoria: "CITOLOGIA",
    cor: "from-rose-500/20",
    modelUrl: bloodVesselModel,
    props3d: [{ position: [2, 0, 5], fov: 55 }, 8, [3, 5, 5], 5],
  },
  {
    id: "sickle-cell",
    numero: "04",
    titulo: "Anemia falciforme",
    descricao:
      "Entenda como uma alteração na hemoglobina modifica a forma da hemácia.",
    categoria: "CITOLOGIA",
    cor: "from-orange-500/20",
    modelUrl: sickleCellModel,
    props3d: [{ position: [0, 0, 5], fov: 6 }, 0.2, [3, 5, 5], 0.2],
  },
  {
    id: "blood-clotting",
    numero: "05",
    titulo: "Coagulação do sangue",
    descricao: "Uma nova experiência interativa sobre a formação do coágulo.",
    categoria: "FISIOLOGIA",
    cor: "from-amber-500/20",
    tipo: "placeholder",
  },
  {
    id: "immune-response",
    numero: "06",
    titulo: "Resposta imune",
    descricao: "Uma nova experiência sobre a defesa do organismo.",
    categoria: "FISIOLOGIA",
    cor: "from-violet-500/20",
    tipo: "placeholder",
  },
];
