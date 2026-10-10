# Inspeção do frontend publicado de Sabec°

Captura em 9 de outubro de 2026. Alvo confirmado: https://www.sabec.dev/ atual. Trabalho realizado por GET dos arquivos públicos; nenhuma submissão de formulário, acesso administrativo ou rastreamento recursivo de terceiros.

## O que é recuperável

A página principal publica o próprio HTML, CSS e JavaScript em um arquivo de 165.666 bytes e 2.154 linhas. Portanto é possível preservar o comportamento publicado sem reinventar sua estrutura. O comentário CSS identifica a página como **“Sabec° landing v4 (2026-10)”**. A versão anterior realmente ligada pelo site é `/v3`, de 114.501 bytes. Foram conferidos `/v2`, `/v2.html`, `/v2/`, `/index-v2.html` e `/versao-2`; todos retornaram HTTP 404 nesta captura.

Os arquivos aqui são referências originais em UTF-8. `inventory.json` contém 14 páginas com título, tamanho, status, scripts, URLs resolvidas e nome da cópia local. Todas as 14 retornaram HTTP 200. `bundle-inventory.json` complementa os recursos embutidos em três demonstrações Vite. Os recursos visuais publicados podem ser espelhados; estes arquivos não recuperam o repositório de desenvolvimento, histórico Git, configuração de serviços nem código privado de servidor.

## Stack principal

- HTML sem framework, CSS e scripts inline.
- GSAP **3.12.5**, ScrollTrigger **3.12.5**, Lenis **1.1.14**.
- Hero em canvas **WebGL** com shader GLSL próprio, textura/máscara tipográfica criada em canvas 2D e interação de ponteiro/toque.
- Fontes Google: **Space Grotesk** 400–700, **Inter** 300–600, **JetBrains Mono** 400–500.
- Logo e favicon SVG inline/base64; textura de ruído SVG inline.
- Integrações publicadas: Google Ads/gtag e formulário Web3Forms. A implementação local de revisão deve impedir envios reais até que o titular configure os serviços.

## Movimento e interações da principal

| Área | Comportamento e parâmetros publicados |
| --- | --- |
| Hero/prisma | Raio entra pela borda, atravessa triângulo e abre leque espectral que ilumina as palavras Sites, Sistemas, Sabec/Os. Entrada do raio em 0,25–0,95 s; leque abre em 0,95–1,85 s. Sem interação, mira oscila pelo tempo; ponteiro/toque controla a direção por 3.500 ms após o movimento, depois da entrada inicial. Largura do leque também cresce com scroll. |
| Hero/cursor | Cursor customizado acompanha ponteiro com suavização 0,3 por quadro; expande sobre palavras e some sobre controles. Só é usado com ponteiro fino e sem redução de movimento. |
| Hero/render | DPR limitado a 2; resolução adaptativa reduz qualidade se média dos quadros excede ~33 ms. Canvas recalculado por ResizeObserver, carregamento de fontes e resize. Loop para fora da tela/aba oculta. Há fallback sem WebGL/contexto perdido e com reduced motion. |
| Rolagem | Lenis com `lerp: .14`, `smoothWheel: true`, `syncTouch: false`, `wheelMultiplier: 1`; ticker GSAP alimenta raf. Âncoras usam offset −60 px. GSAP lag smoothing 500/33. |
| Barra superior | Progresso horizontal `scaleX`, scrub 0,3, do início ao fim do documento. |
| Navegação | Fundo translúcido após 30 px; some descendo após 600 px e delta >4 px; volta ao subir mais de 4 px. |
| Capítulo 01 | Seção Hoje fixa por `+=220%`, scrub 0,8. Fragmentos de interfaces flutuam, crescem e convergem aos três cards; cards e subtítulo seguinte aparecem em cascata. |
| Demonstração de site | IntersectionObserver ativa etapas 1–4, altera texto de endereço e transforma wireframe em site com marca, conteúdo e publicação. Target `#build`. |
| Case JD | Etapas 1–4 trocam as quatro telas e indicadores; celular faz parallax de y 90 a −30. Target `#jd`. |
| Sabec/Os | Etapas 1–4 trocam chat, quadro de conteúdos/aprovação, notificações de publicação e métricas; navegação lateral acompanha. Target `#os`. |
| Observação de etapas | `rootMargin` desktop `-50% 0px -49% 0px`; abaixo de 980 px `-68% 0px -31% 0px`. Funciona sem GSAP. |
| Galeria | Setas avançam largura do card +20 px com scroll suave; arraste por mouse, limiar de 5 px e prevenção de clique após arraste. Scroll nativo atende toque. |
| Processo | Acima de 1.000 px de largura e 600 px de altura, seção fixa e trilho horizontal com scrub 0,6; deslocamento é a diferença de scrollWidth/clientWidth. Linha é desenhada junto; etapas revelam ao entrar. Nas demais dimensões, linha é desenhada com scroll vertical. |
| Títulos | Split em palavras, preservando gradientes; entrada `yPercent:115`, rotação 3° para zero, 1 s, power3.out e stagger 0,06; inicia em top 86%, uma vez. |
| Conteúdo | Revelações simples y 28 px, 0,9 s em top 88%; lotes y 34 px, 0,9 s e stagger 0,1 em top 90%. |
| Mockups | Entrada com rotateX 10°, y 60 px, perspectiva 1.200, 1,2 s e expo.out. |
| Foto/numerais | Foto parallax −6% a +6%, scale 1,1; números dos capítulos −10% a +22%. |
| Linhas e cases | Linhas de fluxo e pontes desenhadas com CSS custom properties e scrub; telas abrem por clip-path em 1,4 s expo.out; celulares sobem 80 px em 1,2 s. |
| Epílogo | Três curvas SVG convergem por strokeDashoffset, scrub 0,6; ponto central aparece com back.out(3) em 0,6 s. |
| Identificador de capítulo | Badge fixa apresenta número, título, cor e progresso do capítulo que cruza 50% da viewport. |
| Hover | Sublinhado da navegação, setas dos botões deslizando 4 px, brilhos e bordas, hover das palavras do hero, cards e telas conforme CSS original. |

Loops CSS presentes: `ping` 2,2 s, `blink` 2,4 s, pacote de fluxo 2,4 s, marquee `mq` 42 s, flutuação `bob` com duração individual de 4,8–7 s, spinner 1,1 s, barras de construção 4,8 s, chat `pop` 6 s, digitando `typ` 1,2 s e pacote `pk` 2,6 s. `prefers-reduced-motion: reduce` desliga animações/transições e usa apresentação estática apropriada.

## Rotas internas recuperadas

| URL | Tipo |
| --- | --- |
| https://www.sabec.dev/ | Landing atual |
| https://www.sabec.dev/v3 | Landing anterior |
| https://www.sabec.dev/site-do-jd | Artigo/case |
| https://www.sabec.dev/privacy | Política de privacidade |
| https://www.sabec.dev/terms | Termos de uso |
| https://www.sabec.dev/marketing/portfolio/velorah-hero/dist/index.html | Vite/React; vídeo externo |
| https://www.sabec.dev/marketing/portfolio/lithos-hero/dist/index.html | Vite/React; duas imagens externas |
| https://www.sabec.dev/marketing/portfolio/convix-hero/dist/index.html | Vite/React; vídeo e imagem externos |
| https://www.sabec.dev/marketing/portfolio/dentista-clinica-vertice/index.html | HTML inline; vídeo local, imagens, GSAP/Lenis |
| https://www.sabec.dev/marketing/portfolio/aureo-arquitetura/index.html | HTML inline; vídeo local, imagens, GSAP/Lenis |
| https://www.sabec.dev/marketing/portfolio/confeitaria-margo/index.html | HTML inline; vídeo local, imagens, GSAP/Lenis |
| https://www.sabec.dev/marketing/portfolio/instituto-liminar/index.html | HTML inline; vídeo local, imagens, GSAP/Lenis |
| https://www.sabec.dev/marketing/portfolio/verene-odontologia/index.html | HTML inline; vídeo local, imagens, GSAP/Lenis |
| https://www.sabec.dev/marketing/portfolio/arquitetura-estudio-linha/index.html | HTML inline; vídeo local, imagens, GSAP/Lenis |

As seis demonstrações HTML inline usam GSAP/ScrollTrigger 3.12.5 e Lenis 1.1.13. Seus vídeos estão em `assets/video/hero.mp4` relativos a cada demo e seus posters em `assets/img/`. Os arquivos correspondentes estão no inventário, incluindo `<source src>`.

## Bundles publicados

| Demo | JS | CSS |
| --- | --- | --- |
| Velorah | `assets/index-xMIOyhaI.js` — 169.816 bytes | `assets/index-BPhN6xXn.css` — 11.143 bytes |
| Lithos | `assets/index-CMXdz8kw.js` — 150.137 bytes | `assets/index-DIp2DAYC.css` — 11.118 bytes |
| Convix | `assets/index-D04Epqih.js` — 156.462 bytes | `assets/index-7O04r-Vl.css` — 10.899 bytes |

São bundles completos com React embutido. Não foram identificados chunks dinâmicos adicionais. Foram conferidos os seis caminhos `.map` correspondentes e todos retornaram 404. Preservar os bundles mantém os efeitos e interações exatos publicados; reorganizar em JSX exigiria reconstrução sem acesso aos módulos originais.

Mídia externa dos bundles, com URLs completas no JSON complementar:

- Velorah: vídeo CloudFront `hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4`.
- Convix: vídeo CloudFront `hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4` e imagem Unsplash `photo-1557683316-973673baf926?w=1600&q=60`.
- Lithos: duas imagens servidas em WebP por `images.higgs.ai`, apontando via query para PNGs CloudFront `hf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png` e `hf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png`.

## Destinos externos e limites concretos

Cases reais apontam para https://jdandrade.art e https://draanascatolin.com.br, que são websites externos. Não foram baixados neste escopo. Contato/social mantém destinos WhatsApp, Instagram, LinkedIn, e-mail e Cal.com; Google account permissions aparece nas informações do produto. Estes destinos estão registrados no inventário como links.

Uma cópia integral dos arquivos públicos da principal e demonstrações permite reproduzir a UI e suas animações com alta fidelidade. A afirmação “100% idêntico” requer ainda comparação visual no mesmo tamanho de tela, com as mesmas fontes carregadas, tempo de animação, posição de scroll e WebGL ativo; diferenças de navegador/GPU, fontes e vídeo tornam inadequada uma garantia abstrata de igualdade em qualquer aparelho. Não há dados públicos suficientes para recriar backend privado do Sabec/Os, entrega de leads ou contas de terceiros.
