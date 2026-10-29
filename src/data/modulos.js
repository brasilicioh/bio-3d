import bloodVesselModel from "@models/blood_vessel_collection_of_thunthu.glb?url";
import redBloodCellsModel from "@models/red_blood_cells_erythrocytes.glb?url";
import sickleCellModel from "@models/sickle_cell.glb?url";
import GeneticTable from "../modules/genetica/GeneticTable";
import TransporteGases from "../modules/transporte/TransporteGases";
import Visualizacao3D from "../modules/hemacias/Visualizacao3D";
import VisualizacaoFalciforme from "../modules/falciforme/VisualizacaoFalciforme";
import VisualizacaoVaso from "../modules/vaso-sanguineo/VisualizacaoVaso";
import Voting from "../modules/votacao/Voting";

export const modulos = [
  {
    id: "red-blood-cells",
    numero: "01",
    titulo: "Hemácias",
    descricao: "Explore a estrutura e a forma dos glóbulos vermelhos.",
    categoria: "CITOLOGIA",
    cor: "from-pink-500/30",
    componente: Visualizacao3D,
    modelUrl: redBloodCellsModel,
    props3d: [{ position: [0, 0, 5], fov: 30 }, 0.2, [3, 5, 5], 3],
  },
  {
    id: "oxygen-transport",
    numero: "02",
    titulo: "Transporte de oxigênio e CO₂",
    descricao:
      "Acompanhe a hemácia entregando oxigênio e recolhendo dióxido de carbono.",
    categoria: "FISIOLOGIA",
    cor: "from-cyan-500/30",
    componente: TransporteGases,
  },
  {
    id: "blood-vessel",
    numero: "03",
    titulo: "Artéria com Hemácias",
    descricao:
      "Observe uma representação de uma artéria transportando hemácias.",
    categoria: "CITOLOGIA",
    cor: "from-rose-500/30",
    componente: VisualizacaoVaso,
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
    cor: "from-orange-500/30",
    componente: VisualizacaoFalciforme,
    modelUrl: sickleCellModel,
    props3d: [{ position: [0, 0, 5], fov: 6 }, 0.2, [3, 5, 5], 0.2],
  },
  {
    id: "blood-clotting",
    numero: "05",
    titulo: "Quadro de Punnett",
    descricao: "Observe como os alelos podem ser combinados na descendência.",
    categoria: "GENÉTICA",
    cor: "from-purple-500/30",
    componente: GeneticTable,
  },
  {
    id: "votacao-eleitoral",
    numero: "06",
    titulo: "Votação das Hemácias",
    descricao:
      "A partir da democracia, escolha a hemácia que deseja no seu corpo.",
    categoria: "CITOLOGIA DEMOCRÁTICA",
    cor: "from-yellow-500/30",
    componente: Voting,
  },
];
