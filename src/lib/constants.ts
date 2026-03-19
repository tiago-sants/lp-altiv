// src/lib/constants.ts

export const NAV_LINKS = [
  { label: "Servicos", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export const SERVICES = [
  {
    id: "financiamento-imobiliario",
    number: "01",
    title: "Financiamento Imobiliario",
    description: "Realize o sonho da casa propria ou expanda seu portfolio imobiliario com as melhores condicoes do mercado. Negociamos diretamente com os maiores bancos para garantir taxas competitivas e aprovacao agil.",
    features: ["Taxas a partir de 9,5% a.a.", "Financiamento ate 80% do imovel", "Prazo de ate 35 anos", "Parceria com +15 bancos"],
    cta: "SIMULAR FINANCIAMENTO",
  },
  {
    id: "home-equity",
    number: "02",
    title: "Home Equity",
    description: "Transforme seu imovel em capital de giro, investimento ou realizacao pessoal. O credito com garantia de imovel oferece as menores taxas do mercado com prazos estendidos.",
    features: ["Taxas a partir de 0,85% a.m.", "Ate 60% do valor do imovel", "Prazo de ate 20 anos", "Liberacao em ate 30 dias"],
    cta: "SIMULAR HOME EQUITY",
  },
  {
    id: "pronampe",
    number: "03",
    title: "Pronampe",
    description: "Facilitamos o acesso ao credito do Programa Nacional de Apoio as Microempresas e Empresas de Pequeno Porte. Taxas subsidiadas e condicoes exclusivas para o seu negocio crescer.",
    features: ["Taxa Selic + 6% a.a.", "Ate R$ 150 mil por CNPJ", "Carencia de ate 12 meses", "Prazo de ate 48 meses"],
    cta: "SIMULAR PRONAMPE",
  },
  {
    id: "financiamento-veicular",
    number: "04",
    title: "Financiamento Veicular",
    description: "Adquira seu veiculo com as melhores condicoes. Comparamos ofertas de multiplas instituicoes para encontrar a taxa ideal para o seu perfil.",
    features: ["Taxas competitivas", "Financiamento ate 100% do veiculo", "Prazo de ate 60 meses", "Aprovacao rapida"],
    cta: "SIMULAR FINANCIAMENTO",
  },
  {
    id: "investimentos",
    number: "05",
    title: "Investimentos",
    description: "Assessoria especializada para diversificar seu patrimonio com seguranca. Opcoes que vao de renda fixa a fundos imobiliarios, alinhadas ao seu perfil de risco.",
    features: ["Renda fixa e variavel", "Fundos imobiliarios", "Planejamento patrimonial", "Assessoria personalizada"],
    cta: "FALAR COM ASSESSOR",
  },
];

export const COUNTERS = [
  { value: 200, prefix: "R$ ", suffix: "M+", label: "Em credito aprovado" },
  { value: 850, prefix: "", suffix: "+", label: "Clientes atendidos" },
  { value: 15, prefix: "", suffix: "+", label: "Bancos parceiros" },
  { value: 98, prefix: "", suffix: "%", label: "Aprovacao" },
];

export const STEPS = [
  { number: "01", title: "Contato Inicial", description: "Voce nos procura pelo WhatsApp ou formulario. Entendemos sua necessidade." },
  { number: "02", title: "Analise & Simulacao", description: "Analisamos seu perfil e simulamos as melhores opcoes em dezenas de bancos." },
  { number: "03", title: "Documentacao", description: "Cuidamos de toda a burocracia. Voce so assina." },
  { number: "04", title: "Credito Aprovado", description: "Recurso liberado na sua conta. Objetivo alcancado." },
];

export const TESTIMONIALS = [
  { quote: "A Altiv transformou o que parecia impossivel em realidade. Em menos de 45 dias, tive meu financiamento aprovado com uma taxa que nenhum banco me ofereceu diretamente.", name: "Carlos Eduardo M.", role: "Empresario", detail: "Financiamento de R$ 1.2M" },
  { quote: "Precisava de capital de giro urgente e a equipe da Altiv conseguiu aprovar meu Home Equity em tempo recorde. Profissionalismo e transparencia do inicio ao fim.", name: "Marina S.", role: "Investidora", detail: "Home Equity de R$ 800K" },
  { quote: "O atendimento personalizado fez toda a diferenca. Nao fui mais um numero — eles entenderam meu momento e encontraram a melhor solucao.", name: "Ricardo A.", role: "Medico", detail: "Financiamento de R$ 2.5M" },
];

export const FAQ_ITEMS = [
  { question: "Qual o valor minimo para financiamento?", answer: "O valor minimo varia conforme o produto. Para financiamento imobiliario, a partir de R$ 150 mil. Para Home Equity, a partir de R$ 100 mil. Entre em contato para uma simulacao personalizada." },
  { question: "Quanto tempo demora a aprovacao?", answer: "O prazo varia de 15 a 45 dias uteis, dependendo do produto e da instituicao financeira. Nossa equipe trabalha para acelerar cada etapa do processo." },
  { question: "Preciso ter o imovel quitado para usar como garantia?", answer: "Nao necessariamente. Imoveis com financiamento ativo podem ser utilizados em algumas modalidades, desde que haja margem de garantia suficiente." },
  { question: "A Altiv cobra alguma taxa antecipada?", answer: "Nao. A Altiv nao cobra nenhum valor antecipado. Nossa remuneracao e vinculada ao sucesso da operacao." },
  { question: "Quais bancos sao parceiros?", answer: "Trabalhamos com os principais bancos privados do mercado, incluindo Itau, Bradesco, Santander, BTG Pactual, Inter, entre outros." },
  { question: "Posso usar o FGTS no financiamento?", answer: "Sim, em modalidades elegiveis o FGTS pode ser utilizado para compor a entrada ou amortizar parcelas. Nossos especialistas orientam sobre a melhor estrategia." },
];

export const CREDIT_OPTIONS = ["Financiamento Imobiliario", "Home Equity", "Pronampe", "Financiamento Veicular", "Investimentos", "Outro"];

export const WHATSAPP_NUMBER = "55XXXXXXXXXXX";
export const WHATSAPP_LINKS = {
  hero: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, gostaria de falar com um especialista da Altiv.")}`,
  contact: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, gostaria de saber mais sobre as soluções da Altiv.")}`,
  floating: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, gostaria de informações sobre crédito imobiliário.")}`,
};
