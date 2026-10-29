import bloodVesselModel from "@models/blood_vessel_collection_of_thunthu.glb?url";
import redBloodCellsModel from "@models/red_blood_cells_erythrocytes.glb?url";
import sickleCellModel from "@models/sickle_cell.glb?url";

import hemaciaImage from "../assets/candidatos/hemacia_13.png";
import hemoglobinaImage from "../assets/candidatos/hemoglobina_22.png";
import leucocitoImage from "../assets/candidatos/leucocito_70.png";
import plaquetaImage from "../assets/candidatos/plaqueta_14.png";

export const opcoes = [
  {
    id: "red-blood-cells",
    numero: "01",
    titulo: "Hemácias",
    descricao: "Explore a estrutura e a forma dos glóbulos vermelhos.",
    categoria: "CITOLOGIA",
    cor: "from-pink-500/30",
    modelUrl: redBloodCellsModel,
    //                   camera,       ambientLight, directionalLight, intensity
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
    tipo: "transporte",
  },
  {
    id: "blood-vessel",
    numero: "03",
    titulo: "Artéria com Hemácias",
    descricao:
      "Observe uma representação de uma artéria transportando hemácias.",
    categoria: "CITOLOGIA",
    cor: "from-rose-500/30",
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
    modelUrl: sickleCellModel,
    props3d: [{ position: [0, 0, 5], fov: 6 }, 0.2, [3, 5, 5], 0.2],
  },
  {
    id: "blood-clotting",
    numero: "05",
    titulo: "Quadro de Punnett",
    descricao: "Note como a genética influencia a coagulação sanguínea.",
    categoria: "GENÉTICA",
    cor: "from-purple-500/30",
    tipo: "genetic-table",
  },
  {
    id: "votacao-eleitoral",
    numero: "06",
    titulo: "Votação das Hemácias",
    descricao:
      "A partir da democracia, escolha a hemácia que deseja no seu corpo.",
    categoria: "CITOLOGIA DEMOCRÁTICA",
    cor: "from-yellow-500/30",
    tipo: "voting",
  },
];

export const candidatos = [
  {
    id: "hemacia",
    nome: "Hemácia",
    numero: "13",
    partido: "Partido dos Transportes (PT)",
    slogan: "Oxigênio para todos, em cada canto do país!",
    foto: hemaciaImage,
    perfil:
      "Experiente, popular e sempre em movimento. Percorre o sistema circulatório transportando oxigênio dos pulmões aos tecidos e participa do transporte de parte do CO₂ de volta aos pulmões.",
    propostas: [
      "Garantir a entrega de O₂ a todos os tecidos.",
      "Renovar a frota de hemoglobina, aproveitando sua capacidade de ligação ao oxigênio.",
      "Combater o apagão de oxigênio nos tecidos.",
    ],
  },
  {
    id: "hemoglobina",
    nome: "Hemoglobina",
    numero: "22",
    partido: "Partido da Ligação (PL)",
    slogan: "Meu tesouraço é no desperdício de oxigênio!",
    foto: hemoglobinaImage,
    perfil:
      "Especialista, discreta e eficiente. É a proteína presente nas hemácias que se liga reversivelmente ao oxigênio, permitindo seu transporte pelo sangue.",
    propostas: [
      "Otimizar a captação de O₂ nos pulmões.",
      "Facilitar a liberação de O₂ nos tecidos.",
      "Ampliar a eficiência do transporte de gases.",
    ],
  },
  {
    id: "plaqueta",
    nome: "Plaqueta",
    numero: "14",
    partido: "Partido da Nova Reparação (NOVA)",
    slogan: "Abriu um rombo? A gente fecha!",
    foto: plaquetaImage,
    perfil:
      "Prática, rápida e especialista em emergências. Atua na hemostasia, formando o tampão plaquetário e colaborando com a coagulação para conter sangramentos.",
    propostas: [
      "Reparar danos nos vasos sanguíneos.",
      "Reduzir o tempo de resposta a emergências.",
      "Investir em manutenção preventiva da circulação.",
    ],
  },
  {
    id: "leucocito",
    nome: "Leucócito",
    numero: "70",
    partido: "Partido Avante Defesa Sanitária (Avante)",
    slogan: "Mais defesa, menos invasão!",
    foto: leucocitoImage,
    perfil:
      "O candidato linha-dura da corrente sanguínea. Especialista em defesa do organismo, identifica e combate agentes infecciosos e participa das respostas imunológicas.",
    propostas: [
      "Reforçar a fiscalização contra microrganismos invasores.",
      "Investir em inteligência imunológica.",
      "Criar uma força-tarefa contra infecções.",
    ],
  },
];
