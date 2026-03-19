// src/lib/constants.ts

/** Prepend basePath for static export on GitHub Pages — must match next.config.js */
export const BASE_PATH = "";
export function assetPath(path: string) {
  return `${BASE_PATH}${path}`;
}

export const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Quem Somos", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export const SERVICES = [
  {
    id: "financiamento-imobiliario",
    number: "01",
    title: "Financiamento Imobiliário",
    description: "Realize o sonho da casa própria ou expanda seu portfólio imobiliário com as melhores condições do mercado. Negociamos diretamente com os maiores bancos para garantir taxas competitivas e aprovação ágil.",
    features: ["Taxas a partir de 9,5% a.a.", "Financiamento até 80% do imóvel", "Prazo de até 35 anos", "Parceria com +15 bancos"],
    cta: "SIMULAR FINANCIAMENTO",
  },
  {
    id: "home-equity",
    number: "02",
    title: "Home Equity",
    description: "Transforme seu imóvel em capital de giro, investimento ou realização pessoal. O crédito com garantia de imóvel oferece as menores taxas do mercado com prazos estendidos.",
    features: ["Taxas a partir de 0,85% a.m.", "Até 60% do valor do imóvel", "Prazo de até 20 anos", "Liberação em até 30 dias"],
    cta: "SIMULAR HOME EQUITY",
  },
  {
    id: "pronampe",
    number: "03",
    title: "Pronampe",
    description: "Facilitamos o acesso ao crédito do Programa Nacional de Apoio as Microempresas e Empresas de Pequeno Porte. Taxas subsidiadas e condições exclusivas para o seu negócio crescer.",
    features: ["Taxa Selic + 6% a.a.", "Até R$ 150 mil por CNPJ", "Carência de até 12 meses", "Prazo de até 48 meses"],
    cta: "SIMULAR PRONAMPE",
  },
  {
    id: "financiamento-veicular",
    number: "04",
    title: "Financiamento Veicular",
    description: "Adquira seu veículo com as melhores condições. Comparamos ofertas de múltiplas instituições para encontrar a taxa ideal para o seu perfil.",
    features: ["Taxas competitivas", "Financiamento até 100% do veículo", "Prazo de até 60 meses", "Aprovação rápida"],
    cta: "SIMULAR FINANCIAMENTO",
  },
  {
    id: "auto-equity",
    number: "05",
    title: "Auto Equity",
    description: "Crédito com garantia de veículo: transforme seu carro em capital sem deixar de usá-lo. Taxas competitivas e liberação ágil para você realizar seus objetivos.",
    features: ["Taxas a partir de 1,49% a.m.", "Continue usando seu veículo", "Prazo de até 48 meses", "Liberação em até 15 dias"],
    cta: "SIMULAR AUTO EQUITY",
  },
];

export const COUNTERS = [
  { value: 200, prefix: "R$ ", suffix: "M+", label: "Em crédito aprovado" },
  { value: 850, prefix: "", suffix: "+", label: "Clientes atendidos" },
  { value: 15, prefix: "", suffix: "+", label: "Bancos parceiros" },
  { value: 98, prefix: "", suffix: "%", label: "Aprovação" },
];

export const STEPS = [
  { number: "01", title: "Contato Inicial", description: "Você nos procura pelo WhatsApp ou formulário. Entendemos sua necessidade." },
  { number: "02", title: "Análise & Simulação", description: "Analisamos seu perfil e simulamos as melhores opções em dezenas de bancos." },
  { number: "03", title: "Documentação", description: "Cuidamos de toda a burocracia. Você só assina." },
  { number: "04", title: "Crédito Aprovado", description: "Recurso liberado na sua conta. Objetivo alcançado." },
];

export const TESTIMONIALS = [
  { quote: "A Altiv transformou o que parecia impossível em realidade. Em menos de 45 dias, tive meu financiamento aprovado com uma taxa que nenhum banco me ofereceu diretamente.", name: "Carlos Eduardo M.", role: "Empresário", detail: "Financiamento de R$ 1.2M" },
  { quote: "Precisava de capital de giro urgente e a equipe da Altiv conseguiu aprovar meu Home Equity em tempo recorde. Profissionalismo e transparência do início ao fim.", name: "Marina S.", role: "Investidora", detail: "Home Equity de R$ 800K" },
  { quote: "O atendimento personalizado fez toda a diferença. Não fui mais um número — eles entenderam meu momento e encontraram a melhor solução.", name: "Ricardo A.", role: "Médico", detail: "Financiamento de R$ 2.5M" },
];

export const FAQ_ITEMS = [
  { question: "Qual o valor mínimo para financiamento?", answer: "O valor mínimo varia conforme o produto. Para financiamento imobiliário, a partir de R$ 150 mil. Para Home Equity, a partir de R$ 100 mil. Entre em contato para uma simulação personalizada." },
  { question: "Quanto tempo demora a aprovação?", answer: "O prazo varia de 15 a 45 dias úteis, dependendo do produto e da instituição financeira. Nossa equipe trabalha para acelerar cada etapa do processo." },
  { question: "Preciso ter o imóvel quitado para usar como garantia?", answer: "Não necessariamente. Imóveis com financiamento ativo podem ser utilizados em algumas modalidades, desde que haja margem de garantia suficiente." },
  { question: "A Altiv cobra alguma taxa antecipada?", answer: "Não. A Altiv não cobra nenhum valor antecipado. Nossa remuneração é vinculada ao sucesso da operação." },
  { question: "Quais bancos são parceiros?", answer: "Trabalhamos com os principais bancos privados do mercado, incluindo Itaú, Bradesco, Santander, BTG Pactual, Inter, entre outros." },
  { question: "Posso usar o FGTS no financiamento?", answer: "Sim, em modalidades elegíveis o FGTS pode ser utilizado para compor a entrada ou amortizar parcelas. Nossos especialistas orientam sobre a melhor estratégia." },
];

export const CREDIT_OPTIONS = ["Financiamento Imobiliário", "Home Equity", "Pronampe", "Financiamento Veicular", "Auto Equity", "Outro"];

export const WHATSAPP_NUMBER = "55XXXXXXXXXXX";
export const WHATSAPP_LINKS = {
  hero: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, gostaria de falar com um especialista da Altiv.")}`,
  contact: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, gostaria de saber mais sobre as soluções da Altiv.")}`,
  floating: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, gostaria de informações sobre crédito imobiliário.")}`,
};
