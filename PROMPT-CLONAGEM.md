# Prompt para reproduzir o site Sabec — projeto `clone v1`

Copie o texto abaixo para um agente com acesso a arquivos, terminal e navegador. As observações registradas neste prompt vieram do HTML e dos bundles públicos capturados em **9 de outubro de 2026**. Os arquivos em `references/source/` são a referência congelada deste trabalho; se a página online mudar, registre a diferença e preserve a versão capturada até eu pedir outra versão.

---

Quero que você **execute o trabalho e entregue o projeto funcionando**, dentro de uma pasta chamada **`clone v1`**. A referência principal é exatamente **https://www.sabec.dev/**, a página inicial confirmada por mim. Minha menção anterior a “versão 2” não significa a rota `/v2`. Não substitua a página principal pela `/v3`: `/v3` é uma página interna acessível pela galeria e pelo rodapé e deve ser preservada também.

Tenho autorização do criador para reproduzir seu site. Esta primeira etapa deve preservar a aparência, os textos, os assets e os movimentos originais para servir de base ao meu portfólio. Vou solicitar minha identidade e minhas alterações depois. Portanto, **não redesenhe, não simplifique, não troque o nome, não invente conteúdo e não substitua recursos existentes por aproximações**. A meta é máxima fidelidade visual e comportamental, comprovada por comparação. Só declare equivalência no que você efetivamente verificou; não prometa “100% idêntico” sem evidência.

## 1. Evidências e método de reprodução

Antes de implementar, leia os arquivos existentes em `clone v1/references/source/`, especialmente:

- `www-root.html`: HTML, CSS inline, SVGs, JavaScript e shaders da página principal.
- `inventory.json`: páginas e URLs encontradas na captura.
- `bundle-inventory.json`: bundles CSS/JS e mídias externas encontradas nas três demonstrações compiladas.
- `v3.html`, `site-do-jd.html`, `privacy.html`, `terms.html` e os HTMLs das demonstrações.

Preserve essa referência separada dos arquivos executados. Leia os HTMLs como UTF-8; não perpetue caracteres corrompidos por uma leitura com encoding incorreto. O inventário apresenta alguns títulos com mojibake, mas o HTML UTF-8 e a página renderizada devem determinar o texto final.

Abra o original no navegador e registre desktop e mobile. Observe a carga inicial, o movimento sem interação, mouse, toque, foco, scroll lento, scroll rápido, scroll reverso e redimensionamento. Leia o código publicado antes de tentar reescrever um efeito. **Quando o HTML, CSS, JS, GLSL, SVG ou bundle original estiver disponível publicamente, reaproveite-o para preservar a fidelidade**, adaptando somente os caminhos, a forma de servir e as integrações necessárias. A ausência de um ZIP ou repositório do autor não impede preservar os recursos públicos já entregues ao navegador.

Não imponha React, Tailwind ou uma arquitetura nova. A página principal publicada é predominantemente HTML com CSS e JS inline; as demonstrações Velorah, Lithos e Convix têm bundles compilados. Use a estrutura mais simples que reproduza esse conjunto corretamente. Se refatorar, mantenha primeiro uma versão visualmente equivalente e só depois separe arquivos sem alterar o resultado. Uma demonstração compilada preservada deve ser identificada como bundle publicado, sem afirmar que você recuperou seu código fonte de autoria ou projeto de build.

Distinga no relatório:

1. **Observado:** código, conteúdo, asset e comportamento efetivamente encontrados.
2. **Requisito:** o que precisa funcionar no clone.
3. **Verificado:** testes realmente executados e seus resultados.
4. **Diferença ou pendência:** recurso indisponível, integração simulada ou comportamento ainda não comprovado.

## 2. Escopo concreto de páginas e links

Reproduza a página principal inteira, suas rotas públicas internas e as demonstrações internas abaixo. Preserve a navegação entre elas em localhost e no pacote distribuído; não deixe os links internos abrirem o site original.

| Rota local a preservar | Referência / finalidade |
| --- | --- |
| `/` | Página principal atual; `www-root.html` |
| `/v3` | Versão anterior mostrada na galeria; `v3.html` |
| `/site-do-jd` | Artigo “Como eu fiz o site do JD com IA”; `site-do-jd.html` |
| `/privacy` | Política de Privacidade; `privacy.html` |
| `/terms` | Termos de Uso; `terms.html` |
| `/marketing/portfolio/velorah-hero/dist/index.html` | Velorah, estúdio digital |
| `/marketing/portfolio/lithos-hero/dist/index.html` | Lithos, geologia / experiência interativa |
| `/marketing/portfolio/dentista-clinica-vertice/index.html` | Clínica Vértice |
| `/marketing/portfolio/convix-hero/dist/index.html` | Convix Software |
| `/marketing/portfolio/aureo-arquitetura/index.html` | Áureo Arquitetura |
| `/marketing/portfolio/confeitaria-margo/index.html` | Margô, confeitaria autoral |
| `/marketing/portfolio/instituto-liminar/index.html` | Instituto Liminar |
| `/marketing/portfolio/verene-odontologia/index.html` | Verene Odontologia |
| `/marketing/portfolio/arquitetura-estudio-linha/index.html` | Estúdio Linha |

O escopo desta entrega está fechado nas **14 páginas públicas do próprio domínio listadas acima**, contando a principal, quatro rotas de apoio e nove demonstrações. Releia o inventário e recupere todos os recursos necessários à renderização dessas páginas. Não transforme strings extraídas de JavaScript em páginas reais: por exemplo, `%23n` aparece na extração automática e precisa ser conferido antes de ser tratado como rota.

O card do Instituto Liminar na página principal apresenta o segmento “advocacia”, enquanto o HTML da demonstração é sobre ensino superior em psicanálise. Preserve o conteúdo observado de cada página nesta etapa e registre essa inconsistência; não corrija silenciosamente a referência.

**Já confirmei manter os links originais `https://jdandrade.art/` e `https://draanascatolin.com.br/`.** Preserve seus cards, screenshots e destinos externos; esses dois sites não fazem parte do clone desta entrega. Não abra uma nova pergunta sobre essa decisão. O artigo `/site-do-jd` é uma das páginas internas incluídas e deve ser reproduzido. WhatsApp, Instagram, LinkedIn, Cal.com e páginas Google também permanecem destinos externos e não devem gerar cópias desses serviços.

## 3. Composição da página principal

Direção visual: **interface técnica escura, tipografia monumental e luz espectral atravessando um prisma, preservando a composição do original**.

Lógica de movimento: **o feixe apresenta três frentes; a rolagem organiza fragmentos, demonstra fluxos e conduz os capítulos até as três luzes convergirem no contato**.

Preserve a ordem e o conteúdo de tudo, incluindo detalhes menos chamativos:

1. **Camadas globais:** textura/grain, barra de progresso superior, navegação fixa, indicador do capítulo corrente, numerais gigantes e pontes entre capítulos.
2. **Hero `#topo`:** logo SVG Sabec°, pill “Agência de IA em Londrina”, coordenadas, palavras gigantes “Sites.”, “Sistemas.” e “Sabec/Os.” com seus destinos, prisma e feixe WebGL, textos, nota, dois CTAs, indicação de mouse/toque e cursor interativo.
3. **Marquee:** faixa contínua de serviços com conteúdo duplicado para loop.
4. **Capítulo 01 `#hoje`:** “O seu negócio mora em lugares demais.”, fragmentos de WhatsApp, e-mail, planilha, Instagram, busca, agenda, PDF e carregamento; transformação desses fragmentos em três cards de frentes; segundo título “Eu junto tudo em três frentes.”.
5. **Capítulo 02 `#sites`:** “Um site que você vê pronto antes de decidir.”, quatro passos Rascunho / A sua marca / Conteúdo / No ar e mockup sticky que muda junto ao passo ativo. Preserve os três itens inclusos, o destaque `jdandrade.art` com quatro screenshots e telefone, o case Dra. Ana Scatolin, a galeria com versão anterior + nove demos, controles de setas, arraste e nota.
6. **Capítulo 03 `#sob-medida`:** “Pro que só o seu negócio faz.”, fluxo WhatsApp → IA → painel → registro, ligações animadas e cinco cards: atendimento, painéis, integrações, rotina e manual/treinamento.
7. **Capítulo 04 `#sabec-os`:** “O funcionário de marketing do seu negócio.”, quatro passos Você pede / Você aprova / Ele publica / Ele aprende, painel demonstrativo sticky com Conversar / Conteúdos / Agenda / Resultados e os seis cards de capacidades. A demonstração do painel é apresentação visual; não significa que o backend real do Sabec/Os esteja publicamente disponível.
8. **Capítulo 05 `#processo`:** “Você decide vendo funcionando.”, passos Conversa / Eu construo / Você vê / No ar, ilustrações de conversa, build, aprovação e contrato; trilho horizontal fixado no desktop e composição vertical nos viewports definidos pelo código.
9. **Capítulo 06 `#quem`:** “Uma pessoa, do começo ao fim.”, foto, moldura/HUD, nome, biografia, credenciais e métricas originais.
10. **Capítulo 07 `#contato`:** convergência das três curvas de luz, título, WhatsApp, Cal.com, formulário completo e estados de interação.
11. **Seção `#app`:** explicação do aplicativo, acessos Google e links de privacidade/termos. Não remova esta seção por ela estar depois do contato.
12. **Rodapé:** logo, metadados e build, links sociais/legais, “Sabec/Os” em outline, copyright e link da versão anterior.

## 4. Tokens, fontes e responsividade observados

Use os valores publicados como base, não aproximações escolhidas de memória:

```css
--bg: #0A0A0A;
--surface: #141414;
--surface-2: #1B1B1B;
--line: #2A2A2A;
--line-soft: #202020;
--ink: #EDE9DF;
--ink-dim: #9A968D;
--ink-faint: #5E5B54;
--blue: #1F4FFF;
--blue-bright: #4D74FF;
--cobalt: #0E2BBF;
--ice: #BCD3FF;
--amber: #E0662F;
--amber-soft: #F2A65E;
--cyan: #34BFD2;
--violet: #8A4FE0;
--magenta: #C44BC9;
--gutter: clamp(16px, 4vw, 40px);
--ease: cubic-bezier(.2, .7, .1, 1);
```

Fontes da principal: **Space Grotesk** 400/500/600/700, **Inter** 300/400/500/600, **JetBrains Mono** 400/500. Corpo 17px e line-height 1.6; `.wrap` com max-width 1240px; navegação e hero com max-width 1440px. As palavras gigantes usam Space Grotesk 500, `clamp(52px, min(18.5vw, 24svh), 290px)`, line-height `.86` e letter-spacing `-.05em`. Preserve as demais regras diretamente da fonte, incluindo `clamp()`, recortes, `object-position`, stroke e z-index.

Preserve as fontes específicas das demos: Estúdio Linha usa Cormorant Garamond/Archivo; Áureo usa Fraunces/IBM Plex Mono/IBM Plex Sans; Margô e Vértice usam Fraunces/Inter; Instituto Liminar usa Fraunces/Space Mono/Inter; Verene usa Playfair Display/Inter; Velorah e Convix usam Inter/Instrument Serif; Lithos usa Inter/Playfair Display. Extraia os pesos e estilos dos respectivos arquivos, sem aplicar as fontes da principal a todas as páginas.

Baixe os arquivos de fontes públicos necessários e sirva-os localmente quando possível, preservando licença, pesos, subsets e métricas. Se depender de CDN, documente a URL e mantenha a versão fixa onde ela existir. Aguarde `document.fonts.ready` antes de capturar ou recalcular a máscara WebGL.

A principal tem regras em larguras como 1100, 980, 900, 760, 600 e 420px, além de condições de altura. Copie os breakpoints reais por componente. Exemplos verificados no código:

- Navegação de seções escondida até 900px; não invente um menu novo ausente na referência.
- Até 760px, coordenadas, tags das palavras e indicador de capítulo são ocultados; ações do hero alinham à esquerda.
- Até 600px, tamanho das palavras `clamp(52px,18.5vw,120px)`, primeira linha em `column-reverse`, prisma reposicionado acima das palavras à direita e âncora de pelo menos 104px.
- A sequência horizontal de Processo só existe com `min-width:1000px` e `min-height:600px`. Abaixo disso, preserve sua composição alternativa e desenho da linha.
- Fragmentos `.fr.m-hide` ocultos até 760px; preserve os posicionamentos mobile e condições para telas baixas.

Verifique todos os breakpoints e alturas relevantes no CSS completo. Responsividade fiel envolve composição e ordem dos elementos, não somente reduzir tamanhos.

## 5. Animações e interações: reaproveitar o código exato

Não use uma imagem do prisma, um gradiente estático ou uma animação genérica como substituição do efeito principal. A fonte publicada contém um canvas WebGL e shaders inline. Preserve a máscara das palavras desenhada em canvas, textura enviada para a GPU, geometria triangular, feixe incidente, trecho interno do prisma, dispersão espectral, glow, ruído e soma da luz sobre as letras por `mix-blend-mode:screen`.

Os detalhes abaixo foram **observados no código principal** e servem para validar a reprodução; o shader completo continua sendo a fonte de verdade:

- WebGL com `antialias:false`, `alpha:false`, `premultipliedAlpha:false` e `powerPreference:'high-performance'`.
- DPR limitado a 2, resolução adaptativa e reflow em ResizeObserver/carga de fontes.
- Máscara RGB das palavras com glow em blur de `10*sx` e `30*sx`.
- Raio do prisma `R = anchor.width * sx * .62`; desvio `DEV = .5`; inclinação `-.5*Math.PI + (th-midAng)*.3`.
- Feixe entra a partir de 0.25s ao longo de 0.7s; leque começa em 0.95s ao longo de 0.9s; flash decai por `exp(-(T-.95)*5)`.
- Controle do ponteiro depois de 1.6s, retenção de 3500ms e interpolação angular com fator `1-exp(-dt*4.5)`; os limites derivam dos centros das palavras.
- Oscilação automática com frequência `.45`; spread base `.5` desktop ou `.62` mobile, pulsação `.8` e ampliação em scroll.
- UI entra quando o tempo ultrapassa 1.05s; opacity `.9s`, translateY `18px` e transform `1.1s`, com delays `.15s`/`.3s` nos grupos seguintes.
- Cursor somente com ponteiro fino e movimento normal; círculo 18px, hover de palavra 84px com texto “ver”; suavização `.3`; ocultação sobre áreas da UI e saída do hero.
- Pause o loop fora do viewport e com documento oculto; preserve recuperação/fallback de WebGL e comportamento com movimento reduzido.
- A qualidade adaptativa observa o tempo de quadro; consulta `hq` pode bloquear a redução. Preserve isso e use condições iguais nas comparações.

Dependências da principal observadas: **GSAP 3.12.5**, **ScrollTrigger 3.12.5**, **Lenis 1.1.14**. As demos HTML usam GSAP 3.12.5 e Lenis 1.1.13 em suas URLs publicadas; não atualize todas sem necessidade. Preserve versões e teste uma cópia local das bibliotecas se possível.

Parâmetros principais de movimento observados:

| Elemento / cena | Configuração publicada a preservar |
| --- | --- |
| Lenis principal | `lerp:.14`, `smoothWheel:true`, `syncTouch:false`, `wheelMultiplier:1`; sincronizado ao ticker GSAP e `ScrollTrigger.update` |
| Ticker | `lagSmoothing(500,33)` |
| Âncoras | `lenis.scrollTo` com offset `-60`; alternativa original quando Lenis não chega |
| Progresso global | escala X 0 → 1, `start:0`, `end:'max'`, `scrub:.3` |
| Hoje | `start:'top top'`, `end:'+=220%'`, `pin:true`, `scrub:.8`, `anticipatePin:1`; fragmentos respiram, convergem ao card indicado por `data-g`, somem e revelam os três cards |
| Processo desktop | distância `proc.scrollWidth-view.clientWidth`; duração de scroll `max(500,dist*1.2)`; pin, `scrub:.6`; filhos entram com y 40, duration `.8`, stagger `.08`, `power3.out` e `containerAnimation` |
| Títulos `.split` | palavras com yPercent 115/rotate 3 → 0/0, duration 1, `power3.out`, stagger `.06`, início `top 86%`, once |
| `.rv` e `.rv-c` | y 28/34 → 0 e opacity 1, duration `.9`, `power3.out`; `top 88%`/batch `top 90%`, stagger `.1` |
| Mockups sticky | rotateX 10, y 60, opacity 0, perspective 1200 → estado final; duration 1.2, `expo.out`, início `top 75%` |
| Foto de Quem | yPercent -6 → 6 com scale 1.1; scrub durante `top bottom` → `bottom top` |
| Numerais / pontes | numerais yPercent -10 → 22; linha de ponte escala Y 0 → 1, scrub `.5` |
| Cases | desktop abre por clip-path em 1.4s `expo.out`; telefone sobe de 80px em 1.2s; telefone do JD percorre y 90 → -30 com scrub |
| Convergência final | paths desenhados por strokeDashoffset, stagger `.1`, scrub `.6`; ponto branco com `back.out(3)`, `.6s`, reversão ao retornar |

Preserve também:

- Cenas `site-steps`, `os-steps` e `jd-steps` via IntersectionObserver; rootMargin `-68% 0px -31% 0px` abaixo de 980px e `-50% 0px -49% 0px` nas demais larguras.
- Endereço/etapa do mockup de site e crumb/menu do mockup Sabec/Os conforme a cena ativa; screenshots do JD com `data-s` e transições publicadas.
- Galeria: setas avançam largura do card + 20px; arraste do mouse a partir de deslocamento de 5px, cancelamento de clique ao arrastar, scroll/touch nativos e estados hover.
- Navegação: fundo sólido após 30px; escondida ao descer depois de 600px; reaparece ao subir, usando a tolerância publicada de 4px.
- Indicador de capítulo: seção encontrada pelo meio do viewport, cor por `data-color` e progresso interno.
- Marquee de 42s; pulsos, pacotes, loops de chat/build, hover de botões e links, máscaras, sombras e outros keyframes reais.
- Fallback estático se as bibliotecas não chegarem em 3500ms, conteúdo visível sem JS e suporte a `prefers-reduced-motion`.

As páginas internas têm sistemas próprios de animação e responsividade. Abra e teste cada uma, preservando seus scripts e assets completos. Em `/v3`, inclua a introdução CRT, radar, terminal e movimentos que constam naquela fonte. Nas demos, preserve vídeo, scrub/scroll, menus, hover e controles conforme cada código, sem aplicar a sequência da principal a elas.

## 6. Assets e integrações

Recupere todos os recursos públicos referenciados pelo HTML, CSS e bundles: imagens, thumbnails, screenshots desktop/mobile, vídeos, SVGs, fontes e dependências. Preserve dimensões, proporções, formatos, recortes e posições. Use caminhos locais corretos, incluindo assets de `/site-do-jd/img/` e de cada pasta de demonstração.

Há recursos de CloudFront, `images.higgs.ai` e Unsplash nos bundles de Velorah/Lithos/Convix. Baixe os recursos acessíveis necessários, mapeie as URLs a arquivos locais e verifique o funcionamento; não substitua esses vídeos/imagens por placeholders se o original puder ser obtido. Registre HTTP, tipo, tamanho e origem. CSS também pode ter `@import` e `url()`; JavaScript pode conter mídias que não aparecem no HTML.

Se algum recurso falhar, tente apenas alternativas públicas que correspondam ao mesmo asset, como sua URL de origem publicada. Registre a falha e a consequência visual. Não diga que o recurso foi recuperado se não foi, nem transforme uma aproximação em original.

**Preserve o visual das integrações e configure seu comportamento para o projeto do usuário.** A página original usa Web3Forms e rastreamento de eventos. Não reutilize a chave de formulário, IDs de analytics/pixel ou contas do autor para enviar dados reais. Não inclua esses identificadores ativos na versão executável. Mantenha uma configuração clara para credenciais do usuário e modo preview desativando envios/rastreamento reais.

No preview, simule o fluxo do formulário localmente e teste quatro campos obrigatórios, foco no primeiro inválido, radio buttons, honeypot e estados “Enviando...”, sucesso, falha e erro de conexão. Indique no README que o sucesso é simulado no preview. A UI pode preservar o texto original para comparação. Ative envio real somente com configuração própria. Os textos e links originais permanecem nesta etapa para fidelidade, mas contatos e documentos devem ser personalizados antes de publicar como meu portfólio.

O escopo cobre as 14 páginas públicas e suas interações de apresentação. Backend, contas Google, servidores privados, sistemas de clientes e funcionalidades reais do Sabec/Os estão fora do escopo; o mockup de marketing não fornece essas implementações. Não condicione a entrega à recuperação desses sistemas. Preserve os mockups e estados públicos, use a simulação local do formulário e documente essa escolha.

## 7. Validação obrigatória antes de entregar

Execute o projeto por HTTP local, abra todas as rotas e revise console, rede e links. Execute build/lint/typecheck disponíveis e adequados à stack. Não crie testes que apenas repitam o código. Verifique comportamento e resultado real no navegador.

Produza capturas comparáveis do original e do clone em, no mínimo, **1440×900, 1366×768, 390×844 e 360×800**, além de amostras dos breakpoints que apresentarem problemas. Para demos, use pelo menos um desktop e um mobile por rota. Documente viewport, DPR, estado de fontes, tempo após carga e posição/progresso do scroll. Esses viewports são requisitos de QA deste projeto, não medidas inferidas do original.

Compare seção por seção e estado por estado: primeira tela, mouse sobre cada palavra, direção do feixe, passos fixados, screenshots do JD, estados do painel, galeria, sequência horizontal, contato, artigo, páginas legais e demos. Uma captura de página inteira sozinha não comprova cenas fixadas por scroll. Para canvas e vídeos, compare instantes equivalentes ou capture pequenos registros de movimento; imagem diferente por tempo aleatório não indica automaticamente erro.

Use capturas lado a lado, overlay/diff quando útil e revisão humana da composição. Corrija tipografia, quebras de linha, espaçamento, alinhamento, recorte, escala, cor e ritmo antes de declarar conclusão. Teste redimensionamento depois de começar a rolar, retorno à aba, navegação por teclado, toque, movimento reduzido e fallback de JS/WebGL. Confira que nenhum texto essencial permanece invisível, que não há overflow horizontal acidental e que pins/sticky não bloqueiam o restante da página.

Não envie leads, não abra conversas nem interaja com contas do autor para testar. Valide destinos externos por inspeção e configure substituições do usuário na etapa de personalização.

## 8. Entrega e continuidade

Entregue dentro de `clone v1`:

- Site executável com a principal, todas as 13 páginas internas identificadas e os assets disponíveis.
- Referências originais preservadas, inventário de páginas/recursos e mapeamento de URLs para arquivos locais.
- `README.md` com requisitos, comando para iniciar, porta/URL, rotas, estrutura, configurações de preview e dependências externas restantes.
- Configuração de contatos/serviços e um exemplo sem credenciais reais.
- `PROMPT-CLONAGEM.md` preservado como instrução reutilizável.
- Capturas e registros de QA organizados por rota, viewport e estado.
- `RELATORIO-FIDELIDADE.md` com o que foi reaproveitado, o que foi verificado, diferenças corrigidas, diferenças restantes e integrações simuladas.
- Pacote ZIP quando o ambiente permitir, com instrução de reprodução e sem arquivos temporários ou credenciais do autor.

Não encerre após apenas escrever um plano ou instalar dependências. Prossiga até o site estar funcionando e as comparações relevantes serem feitas. Se encontrar um bloqueio, avance com as partes independentes e explique exatamente o recurso indisponível e seu impacto.

Depois da base fiel, deixe preparada a personalização de nome, foto, biografia, contatos e projetos, mas **só aplique essas mudanças quando eu solicitar**. Preserve uma cópia da base original antes de personalizar. Minha primeira entrega precisa permitir abrir e revisar o clone, e o relatório precisa dizer com clareza até onde a fidelidade foi comprovada.
