import hemaciaImage from "../assets/candidatos/hemacia_13.png";
import hemoglobinaImage from "../assets/candidatos/hemoglobina_22.png";
import leucocitoImage from "../assets/candidatos/leucocito_70.png";
import plaquetaImage from "../assets/candidatos/plaqueta_14.png";

export const candidatos = [
  {
    id: "hemacia",
    nome: "Hemácia",
    numero: "13",
    partido: "Partido dos Transportadores (PT)",
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
    partido: "Missão da Nova Reparação (MISSÃo)",
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
