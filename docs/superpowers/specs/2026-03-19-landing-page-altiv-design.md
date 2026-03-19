# Altiv Capital Imobiliario — Landing Page Design Spec

## Resumo

Landing page institucional com forte foco em conversao para a Altiv Capital Imobiliario, empresa de credito imobiliario e consultoria financeira. Inspirada no estilo visual e comportamento de animacao do akaru.fr, adaptada a identidade visual da Altiv (dourado + preto, tipografia Conthrax/Nord). Suporte a tema claro e escuro.

---

## Stack Tecnica

| Tecnologia | Versao | Proposito |
|---|---|---|
| **Next.js** | 14+ (App Router) | Framework React, SSR/SSG, SEO |
| **Tailwind CSS** | 3.x | Estilizacao utilitaria |
| **GSAP** | 3.x (free tier) | Animacoes de alto impacto |
| **GSAP ScrollTrigger** | 3.x (free tier) | Animacoes scroll-driven, pinning |
| **TypeScript** | 5.x | Type safety |

**Deploy:** Vercel
**Fontes web:** Conthrax Sb (logo/headings), Nord (subtitulos/corpo) — fontes locais via `@font-face`

> **Nota sobre GSAP:** Usamos apenas plugins gratuitos (ScrollTrigger com pin). Caso no futuro seja necessario ScrollSmoother ou MorphSVG, sera preciso licenca Club GreenSock. Para esta fase, nao e necessario.

> **Nota sobre fontes:** Conthrax Sb e Nord sao fontes comerciais. Verificar licenciamento para uso web (@font-face embedding) antes do deploy em producao.

---

## Identidade Visual (Branding Book)

### Paleta de Cores — Design Tokens Semanticos

Os tokens usam nomes baseados em **funcao** (nao em cor literal), permitindo inversao automatica entre temas.

#### Tema Escuro (padrao)

| Token | Hex | Funcao |
|---|---|---|
| `--accent` | `#C8A862` | Accent primario, CTAs, destaques |
| `--accent-dark` | `#846030` | Accent secundario, gradientes |
| `--bg-primary` | `#000000` | Background principal |
| `--bg-surface` | `#0a0a0a` | Background secoes alternadas |
| `--bg-card` | `#111111` | Cards, inputs |
| `--border` | `#222222` | Bordas |
| `--text-primary` | `#FFFFFF` | Texto principal |
| `--text-secondary` | `#888888` | Texto secundario |
| `--text-tertiary` | `#666666` | Texto terciario |
| `--text-muted` | `#444444` | Texto muted |

#### Tema Claro

| Token | Hex | Funcao |
|---|---|---|
| `--accent` | `#C8A862` | Accent primario (mantido) |
| `--accent-dark` | `#846030` | Accent secundario (mantido) |
| `--bg-primary` | `#FFFFFF` | Background principal |
| `--bg-surface` | `#F5F5F0` | Background secoes alternadas |
| `--bg-card` | `#EEEEEE` | Cards, inputs |
| `--border` | `#DDDDDD` | Bordas |
| `--text-primary` | `#0A0A0A` | Texto principal |
| `--text-secondary` | `#555555` | Texto secundario |
| `--text-tertiary` | `#777777` | Texto terciario |
| `--text-muted` | `#999999` | Texto muted |

### Gradiente Dourado

```css
background: linear-gradient(135deg, var(--accent), var(--accent-dark));
```

### Escala Tipografica

| Token | Tamanho | Uso |
|---|---|---|
| `--text-display` | 48px | Titulos de secao (Servicos, Depoimentos) |
| `--text-h1` | 42px | Hero headline, titulos secundarios |
| `--text-h2` | 36px | Subtitulos de secao (FAQ, Sobre, Contato) |
| `--text-h3` | 28px | Titulos de items (servico ativo, steps) |
| `--text-h4` | 24px | Subtitulos menores |
| `--text-body` | 16px | Corpo de texto |
| `--text-body-lg` | 18px | Corpo de texto grande (depoimentos) |
| `--text-small` | 14px | Texto auxiliar |
| `--text-xs` | 12px | Labels, metadata |
| `--text-label` | 11px | Labels uppercase, tracking largo |

### Tipografia — Familias

| Fonte | Uso |
|---|---|
| **Conthrax Sb** | Logo "ALTIV", titulos de secao (`--text-display`, `--text-h1`) |
| **Nord** | "CAPITAL IMOBILIARIO", subtitulos, corpo de texto, navegacao |

### Logo

Simbolo triangular "A" com elementos arquitetonicos integrados (predios). Usar SVG extraido/recriado do branding book. Versoes: positiva (fundo claro), negativa (fundo escuro), dourada.

### Toggle de Tema

Botao no canto superior direito da navbar (icone sol/lua) que alterna entre tema claro e escuro. Preferencia salva em `localStorage`. Respeita `prefers-color-scheme` do sistema como valor inicial.

---

## Estrutura — Layout e Secoes de Conteudo

A pagina tem 2 elementos de layout (Navbar e Footer) e 8 secoes de conteudo.

### Navbar (layout — fixed)

- **Posicao:** `position: fixed`, `z-index: 50`, full width
- **Altura:** ~80px
- **Fundo:** Transparente no topo, blur + background semi-transparente apos scroll
- **Conteudo:**
  - Logo Altiv (simbolo + texto) a esquerda
  - Links de navegacao: Servicos | Diferenciais | Sobre | Contato
    - "Diferenciais" ancora para a secao "Numeros & Social Proof"
  - Toggle de tema (sol/lua)
  - CTA "SIMULAR AGORA" (botao pill dourado) a direita
- **Mobile:** Hamburger menu com overlay fullscreen (`z-index: 55`)
- **Acessibilidade:** `role="navigation"`, `aria-label="Menu principal"`, links com foco visivel

### Secao 1. Hero (100vh)

- **Layout:** Flex, 2 colunas (50/50 em desktop, stack em mobile)
- **Coluna esquerda:**
  - Label: "Credito Imobiliario & Consultoria Financeira" (dourado, uppercase, tracking largo, `--text-label`)
  - Headline: "Seu patrimonio merece uma estrategia a altura." (`--text-h1`)
    - "merece uma estrategia" em dourado
  - Paragrafo: "Conectamos voce aos principais bancos do mercado para financiamento imobiliario, credito com garantia de imovel e solucoes financeiras sob medida." (`--text-body`)
  - 2 CTAs:
    - "FALAR COM ESPECIALISTA" (botao solido dourado → WhatsApp: `https://wa.me/55XXXXXXXXXXX?text=Olá, gostaria de falar com um especialista da Altiv.`)
    - "SIMULAR CREDITO" (botao outlined dourado → scroll para secao Formulario)
- **Coluna direita:**
  - Imagem hero: foto stock premium de skyline/edificios urbanos modernos
  - Aspect ratio: 4:3, dimensoes minimas 800x600
  - Placeholder durante dev: div com gradiente dourado sutil + texto "Hero Image"
  - Parallax no scroll
- **Scroll indicator:** Seta animada "↓" na base
- **Animacoes:**
  - Texto: fade + slide esquerda, stagger 0.15s por elemento, easing `power2.out`, duracao 0.8s
  - Imagem: parallax vertical (translateY -50px ao scrollar)
  - Scroll indicator: pulse animation CSS infinite

### Secao 2. Servicos (tabs navegaveis)

- **Titulo:** "Nossas Solucoes" (label dourado `--text-label`) + "Servicos" (`--text-display`)
- **5 tabs:** Numeradas 01-05
  1. Financiamento Imobiliario
  2. Home Equity (credito com garantia de imovel)
  3. Pronampe
  4. Financiamento Veicular
  5. Investimentos
- **Conteudo de cada tab:**
  - Titulo do servico (`--text-h3`)
  - Descricao (`--text-body`)
  - Features list com prefixo "/" em dourado
  - CTA pill outlined "SIMULAR [SERVICO] →"
  - Imagem do servico (lado direito) — placeholder stock relacionado ao servico
- **Acessibilidade:** `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, navegacao por setas ←→
- **Animacoes:**
  - Tab transition: crossfade 0.4s, easing `power2.inOut`
  - Conteudo: stagger 0.1s, fade+slideUp
  - Imagem: scale 0.95→1.0, duracao 0.6s

#### Copy dos Servicos

**Financiamento Imobiliario:**
"Realize o sonho da casa propria ou expanda seu portfolio imobiliario com as melhores condicoes do mercado. Negociamos diretamente com os maiores bancos para garantir taxas competitivas e aprovacao agil."
- / Taxas a partir de 9,5% a.a.
- / Financiamento ate 80% do imovel
- / Prazo de ate 35 anos
- / Parceria com +15 bancos

**Home Equity:**
"Transforme seu imovel em capital de giro, investimento ou realizacao pessoal. O credito com garantia de imovel oferece as menores taxas do mercado com prazos estendidos."
- / Taxas a partir de 0,85% a.m.
- / Ate 60% do valor do imovel
- / Prazo de ate 20 anos
- / Liberacao em ate 30 dias

**Pronampe:**
"Facilitamos o acesso ao credito do Programa Nacional de Apoio as Microempresas e Empresas de Pequeno Porte. Taxas subsidiadas e condicoes exclusivas para o seu negocio crescer."
- / Taxa Selic + 6% a.a.
- / Ate R$ 150 mil por CNPJ
- / Carencia de ate 12 meses
- / Prazo de ate 48 meses

**Financiamento Veicular:**
"Adquira seu veiculo com as melhores condicoes. Comparamos ofertas de multiplas instituicoes para encontrar a taxa ideal para o seu perfil."
- / Taxas competitivas
- / Financiamento ate 100% do veiculo
- / Prazo de ate 60 meses
- / Aprovacao rapida

**Investimentos:**
"Assessoria especializada para diversificar seu patrimonio com seguranca. Opcoes que vao de renda fixa a fundos imobiliarios, alinhadas ao seu perfil de risco."
- / Renda fixa e variavel
- / Fundos imobiliarios
- / Planejamento patrimonial
- / Assessoria personalizada

### Secao 3. Numeros & Social Proof (id="diferenciais")

- **Background:** Gradiente dourado (`linear-gradient(135deg, var(--accent), var(--accent-dark))`)
- **Titulo:** "Por que a Altiv?" (`--text-h2`, cor preta)
- **4 contadores:**
  - R$ 200M+ — Em credito aprovado
  - 850+ — Clientes atendidos
  - 15+ — Bancos parceiros
  - 98% — Aprovacao
- **Animacoes:**
  - Count-up: duracao 2s, easing `power1.out`, dispara ao entrar no viewport
  - Background: gradient shift sutil (animacao CSS)

### Secao 4. Como Funciona (timeline)

- **Label:** "Processo" (dourado `--text-label`) + "Como funciona" (`--text-h1`)
- **4 passos em timeline horizontal (vertical em mobile):**
  1. **Contato Inicial** — "Voce nos procura pelo WhatsApp ou formulario. Entendemos sua necessidade."
  2. **Analise & Simulacao** — "Analisamos seu perfil e simulamos as melhores opcoes em dezenas de bancos."
  3. **Documentacao** — "Cuidamos de toda a burocracia. Voce so assina."
  4. **Credito Aprovado** — "Recurso liberado na sua conta. Objetivo alcancado."
- **Visual:** Circulos numerados conectados por linha horizontal, ultimo passo com fundo dourado solido
- **Animacoes:**
  - Linha: drawSVG-style com ScrollTrigger, duracao acompanha scroll
  - Steps: stagger 0.3s, fade+slideUp, easing `power2.out`
  - Pin durante animacao de entrada (ScrollTrigger pin)

### Secao 5. Depoimentos (carrossel)

- **Label:** "Depoimentos" (dourado `--text-label`) + "O que nossos clientes dizem" (`--text-h1`)
- **Carrossel implementado com GSAP timelines** (sem lib externa)
- **Cada slide:**
  - Aspas douradas grandes (decorativas)
  - Citacao (`--text-body-lg`, italico)
  - Nome do cliente (`--text-small`, bold)
  - Cargo/contexto + valor (`--text-xs`)
- **Indicadores:** Barras horizontais (ativa = dourada, inativa = cinza)
- **Auto-play:** Crossfade a cada 6s, pausa no hover
- **Acessibilidade:** `role="region"`, `aria-label="Depoimentos de clientes"`, `aria-live="polite"`
- **Animacoes:** Crossfade 0.6s entre slides, parallax sutil no fundo

#### Copy dos Depoimentos (ficticios — substituir por reais quando disponivel)

Os depoimentos estao em `lib/constants.ts` para facil substituicao por dados reais ou integracao com CMS futuramente.

1. "A Altiv transformou o que parecia impossivel em realidade. Em menos de 45 dias, tive meu financiamento aprovado com uma taxa que nenhum banco me ofereceu diretamente." — Carlos Eduardo M., Empresario, Financiamento de R$ 1.2M

2. "Precisava de capital de giro urgente e a equipe da Altiv conseguiu aprovar meu Home Equity em tempo recorde. Profissionalismo e transparencia do inicio ao fim." — Marina S., Investidora, Home Equity de R$ 800K

3. "O atendimento personalizado fez toda a diferenca. Nao fui mais um numero — eles entenderam meu momento e encontraram a melhor solucao." — Ricardo A., Medico, Financiamento de R$ 2.5M

### Secao 6. Sobre a Altiv (split screen)

- **Layout:** 2 colunas (texto | imagem)
- **Label:** "A Empresa" (dourado `--text-label`)
- **Titulo:** "Altiv Capital Imobiliario" (`--text-h2`)
- **Texto:** "Com forte conhecimento do mercado financeiro e imobiliario, a Altiv se posiciona como uma parceira estrategica, oferecendo atendimento consultivo e gestao completa da operacao — desde a analise ate a parte documental." (`--text-body`)
- **Mini-stats:** "5+ Anos no mercado" | "Premium Atendimento"
- **Lado direito:** Foto stock de escritorio premium moderno ou equipe em reuniao. Placeholder: div gradiente.
- **Animacoes:** Texto slide-in esquerda 0.8s, imagem slide-in direita 0.8s, easing `power2.out`

### Secao 7. FAQ (accordion)

- **Titulo:** "Perguntas Frequentes" (`--text-h2`)
- **Acessibilidade:** Cada item usa `<button>` com `aria-expanded`, conteudo em `<div role="region">` com `aria-labelledby`
- **Accordion items:**
  1. "Qual o valor minimo para financiamento?" → "O valor minimo varia conforme o produto. Para financiamento imobiliario, a partir de R$ 150 mil. Para Home Equity, a partir de R$ 100 mil. Entre em contato para uma simulacao personalizada."
  2. "Quanto tempo demora a aprovacao?" → "O prazo varia de 15 a 45 dias uteis, dependendo do produto e da instituicao financeira. Nossa equipe trabalha para acelerar cada etapa do processo."
  3. "Preciso ter o imovel quitado para usar como garantia?" → "Nao necessariamente. Imoveis com financiamento ativo podem ser utilizados em algumas modalidades, desde que haja margem de garantia suficiente."
  4. "A Altiv cobra alguma taxa antecipada?" → "Nao. A Altiv nao cobra nenhum valor antecipado. Nossa remuneracao e vinculada ao sucesso da operacao."
  5. "Quais bancos sao parceiros?" → "Trabalhamos com os principais bancos privados do mercado, incluindo Itau, Bradesco, Santander, BTG Pactual, Inter, entre outros."
  6. "Posso usar o FGTS no financiamento?" → "Sim, em modalidades elegiveis o FGTS pode ser utilizado para compor a entrada ou amortizar parcelas. Nossos especialistas orientam sobre a melhor estrategia."
- **Animacoes:** Expand/collapse com GSAP, duracao 0.4s, easing `power2.inOut`

### Secao 8. Formulario de Contato + CTA WhatsApp

- **Layout:** 2 colunas (formulario | CTA WhatsApp)
- **Coluna esquerda:**
  - Titulo: "Vamos comecar?" (`--text-h2`)
  - Subtitulo: "Preencha o formulario e um especialista entrara em contato em ate 24h."
  - **Campos:**
    - Nome completo (text, obrigatorio, min 3 caracteres)
    - WhatsApp (tel, obrigatorio, formato brasileiro com mascara)
    - Tipo de credito (select, obrigatorio) — opcoes: Financiamento Imobiliario | Home Equity | Pronampe | Financiamento Veicular | Investimentos | Outro
    - Valor aproximado (text, opcional, mascara de moeda R$)
  - Checkbox LGPD: "Concordo com a Politica de Privacidade e autorizo o contato." (obrigatorio)
  - Botao: "SOLICITAR CONTATO" (solido dourado)
  - **Estados:**
    - Loading: botao com spinner, desabilitado
    - Sucesso: mensagem "Recebemos seu contato! Em breve um especialista ira te atender."
    - Erro: mensagem de erro inline por campo + toast geral
  - **Submissao:** Next.js API Route (`/api/contact`) → envio de email (ou integracao futura com CRM)
- **Coluna direita:**
  - Titulo: "Prefere falar agora?" (`--text-h4`)
  - Botao WhatsApp: "CHAMAR NO WHATSAPP" (verde #25D366)
    - Link: `https://wa.me/55XXXXXXXXXXX?text=Olá, gostaria de saber mais sobre as soluções da Altiv.`
  - Texto: "Atendimento em horario comercial"
- **Animacoes:** Fade-in ao entrar no viewport, duracao 0.6s

### Footer (layout)

- **Background:** `var(--bg-primary)` com borda top `var(--border)`
- **Layout:** 4 colunas
  - Logo + tagline
  - Servicos (links de navegacao interna)
  - Empresa (links: Sobre | Como funciona | FAQ | Contato)
  - Contato (WhatsApp, Instagram, LinkedIn, email: contato@altiv.com.br)
- **Bottom bar:** "© 2026 Altiv Capital Imobiliario. Todos os direitos reservados." | "Politica de Privacidade"
- **Animacoes:** Fade-in suave 0.6s

---

## Botao Flutuante WhatsApp

- Botao fixo no canto inferior direito
- Icone WhatsApp SVG + cor verde (#25D366)
- Visivel em todas as secoes exceto o footer
- Pulse animation sutil (CSS keyframes)
- `z-index: 45` (abaixo da navbar z-50, acima do conteudo)
- Link: `https://wa.me/55XXXXXXXXXXX?text=Olá, gostaria de informações sobre crédito imobiliário.`
- **Acessibilidade:** `aria-label="Falar pelo WhatsApp"`

> **Nota:** Substituir `55XXXXXXXXXXX` pelo numero real da Altiv antes do deploy.

---

## Animacoes GSAP (Detalhamento)

### Scroll Behavior

- **Sem CSS scroll-snap** — todo o controle de scroll e feito via GSAP ScrollTrigger (consistente com akaru.fr)
- Secoes com **pin** durante animacao de entrada (ScrollTrigger `pin: true`)
- **ScrollTrigger** configurado por secao com `start: "top top"` e `end` calculado por secao

### Parametros Padrao de Animacao

| Parametro | Valor Padrao |
|---|---|
| Duracao entrada | 0.8s |
| Duracao transicao | 0.4s |
| Easing entrada | `power2.out` |
| Easing transicao | `power2.inOut` |
| Stagger | 0.15s |
| Delay inicial | 0.2s |

### Por Secao

| Secao | Entrada | Saida | Extras |
|---|---|---|---|
| Hero | Fade+slide esquerda 0.8s stagger 0.15s | Fade out com scroll | Scroll indicator pulse CSS |
| Servicos | Stagger 0.1s nos items, scale-in 0.6s na imagem | — | Tab crossfade 0.4s |
| Numeros | Count-up 2s | — | Gradient shift CSS |
| Como Funciona | Linha drawSVG com scroll, steps stagger 0.3s | — | Pin durante animacao |
| Depoimentos | Crossfade 0.6s auto-play 6s | — | Parallax sutil |
| Sobre | Slide-in esquerda + direita 0.8s | — | — |
| FAQ | Accordion expand/collapse 0.4s | — | — |
| Formulario | Fade-in 0.6s | — | — |
| Footer | Fade-in 0.6s | — | — |

### Performance

- `will-change` aplicado apenas durante animacao ativa (GSAP gerencia automaticamente)
- `IntersectionObserver` para lazy-load de imagens via `next/image`
- GSAP `matchMedia` para desabilitar pinning e parallax em mobile (< 768px)
- Reducao de animacoes para `prefers-reduced-motion: reduce`

---

## Acessibilidade (a11y)

### Requisitos

- **WCAG 2.1 AA** como baseline
- Contraste minimo: 4.5:1 para texto normal, 3:1 para texto grande
  - `#C8A862` sobre `#000000` = 7.3:1 (passa AA e AAA)
  - `--text-secondary` (`#888888`) sobre `#000000` = 3.5:1 — usar apenas em texto grande (>=18px) ou decorativo
  - `--text-secondary` no tema claro (`#555555`) sobre `#FFFFFF` = 7.5:1 (passa)
- **Navegacao por teclado:** todos os elementos interativos acessiveis via Tab, Enter/Space para ativar
- **Focus visible:** outline dourado (`2px solid var(--accent)`) em todos os elementos focaveis
- **ARIA labels:**
  - Navbar: `role="navigation"`, `aria-label="Menu principal"`
  - Tabs servicos: `role="tablist"`, `role="tab"`, `role="tabpanel"`, setas ←→
  - FAQ accordion: `<button aria-expanded>`, `<div role="region">`
  - Carrossel: `role="region"`, `aria-label="Depoimentos"`, `aria-live="polite"`
  - WhatsApp button: `aria-label="Falar pelo WhatsApp"`
- **Alt text:** Todas as imagens com `alt` descritivo. Imagens decorativas com `alt=""`
- **Count-up:** Numeros finais presentes no HTML como fallback (animacao e progressiva)
- **Reduced motion:** `prefers-reduced-motion: reduce` desabilita parallax, pinning, e reduz todas as animacoes para fade simples

---

## Responsividade

### Breakpoints (Tailwind padrao)

| Token | Valor | Uso |
|---|---|---|
| `sm` | 640px | Mobile |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Desktop large |
| `2xl` | 1536px | Desktop XL |

### Adaptacoes Mobile (< 768px)

- Navbar: hamburger menu com overlay fullscreen (`z-index: 55`)
- Hero: coluna unica, imagem abaixo do texto, headline reduz para `--text-h2`
- Servicos: tabs em scroll horizontal, conteudo empilhado
- Numeros: 2x2 grid
- Timeline: vertical ao inves de horizontal
- Depoimentos: swipe (touch events)
- Sobre: empilhado (imagem abaixo)
- Formulario: coluna unica, WhatsApp CTA abaixo
- Footer: 2 colunas em tablet, 1 coluna em mobile

---

## Estrutura de Arquivos

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fontes, metadata, theme provider
│   ├── page.tsx            # Home page (composicao de secoes)
│   ├── not-found.tsx       # Pagina 404 customizada
│   ├── api/
│   │   └── contact/
│   │       └── route.ts    # API Route para submissao do formulario
│   └── globals.css         # Variaveis CSS semanticas, reset, tokens
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Numbers.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx
│   │   ├── About.tsx
│   │   ├── FAQ.tsx
│   │   └── ContactForm.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ScrollIndicator.tsx
│   └── animations/
│       └── gsap-utils.ts   # Helpers GSAP reutilizaveis
├── hooks/
│   ├── useGSAP.ts          # Hook wrapper para GSAP + cleanup
│   └── useTheme.ts         # Hook para tema claro/escuro
├── lib/
│   ├── constants.ts        # Dados estaticos (servicos, FAQ, depoimentos)
│   └── theme.ts            # Configuracao de temas e tokens
└── public/
    ├── fonts/              # Conthrax Sb, Nord (arquivos .woff2)
    ├── images/             # Hero, servicos, equipe (placeholders inicialmente)
    └── logo.svg            # Logo Altiv vetorizado
```

---

## SEO & Performance

### Meta Tags

```html
<title>Altiv Capital Imobiliario — Credito Imobiliario e Consultoria Financeira</title>
<meta name="description" content="Financiamento imobiliario, home equity e solucoes financeiras sob medida. Conectamos voce aos melhores bancos com taxas competitivas e aprovacao agil." />
<meta property="og:title" content="Altiv Capital Imobiliario" />
<meta property="og:description" content="Seu patrimonio merece uma estrategia a altura. Credito imobiliario e consultoria financeira premium." />
<meta property="og:image" content="/images/og-image.jpg" />
<meta property="og:type" content="website" />
```

### Schema.org

```json
{
  "@type": ["LocalBusiness", "FinancialService"],
  "name": "Altiv Capital Imobiliario",
  "description": "Credito imobiliario e consultoria financeira"
}
```

### Performance Targets

- Lighthouse Performance > 90
- LCP < 2.5s
- CLS < 0.1
- FID < 100ms

### Otimizacoes

- **Imagens:** WebP/AVIF via `next/image`, lazy loading, `priority` na hero image
- **Fontes:** `font-display: swap`, preload das fontes criticas (Conthrax, Nord)
- **GSAP:** Import dinamico apenas dos plugins usados
- **Sitemap:** Gerado automaticamente pelo Next.js
