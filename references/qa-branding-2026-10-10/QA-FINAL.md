# Revisão final — Norte/OS e identidade, 10/10/2026

Direção: preservar a composição escura, tipografia, luz espectral e identidade N dourado do clone aprovado, usando os dados de Gabriel Holanda / Norte Autoral. Movimento: conservar prisma WebGL, Lenis, GSAP, cenas por rolagem e feedback dos cartões; alterar somente os rótulos solicitados e a apresentação dos créditos.

## Resultado aplicado

- Norte/OS no menu, hero, duas metades da faixa contínua, capítulo 04, marca do painel e interesse do formulário. Âncora `#norte-os`; nenhum link antigo `#sabec-os` na página principal.
- Busca ilustrativa “dentista em Parnaíba”. Outras marcas e conteúdos fictícios dos templates continuam como demonstrações.
- O aplicativo apresenta “Norte/OS: o sistema operacional do seu negócio”, memória da empresa, conteúdo para revisão e organização de projetos/dados. O painel mostra um fluxo ilustrativo, com integrações definidas por projeto; nenhum backend novo foi criado nesta revisão.
- JD, etapa 04: “Uma presença digital à altura do trabalho.”, texto editorial sobre identidade visual e navegação; apenas Abrir o site para jdandrade.art. As quatro imagens e a mudança por rolagem foram preservadas.
- Rodapé com “Gabriel Holanda · PARNAÍBA, PI”. Removidos link ao portfólio anterior, bloco de referências e crédito de referência do layout.
- Seis créditos existentes nas demos: “Site demonstrativo (template) produzido pela Norte Autoral · Gabriel Holanda”, link `/`, mesma aba. Nas três demos compactas não há crédito antigo. Retorno flutuante se oculta quando o crédito fica visível, evitando sobreposição.
- `/v3` usa nome, logo, foto, contatos e metadata atuais. Nova miniatura `portfolio-v3.jpg` capturada da hero adaptada. Artigo JD mantém o processo histórico em terceira pessoa, com chrome e contatos atuais.
- WhatsApp e e-mail reais de `/v3` seguem diretamente para os contatos de Gabriel; o formulário e contatos fictícios das demos mantêm seus diálogos de demonstração.

## Conferência no navegador

Chromium local / Playwright contra http://127.0.0.1:4173. Capturas nesta pasta foram revisadas visualmente; os relatórios de movimento anteriores continuam em `../qa-motion-2026-10-10/QA-FINAL.md`.

| Cobertura | Resultado |
| --- | --- |
| Desktop 1440×900: menu Norte/OS | Clique real posiciona capítulo com topo em 59,89 px; rótulo 04 · NORTE/OS correto. |
| Faixa contínua | Duas sequências iguais de oito itens, ambas contêm Norte/OS. Transformação mudou de -1631,07 para -1676,44 px no intervalo observado. |
| Painel por rolagem | Estados 1→2→3→4 e retorno a 3 funcionam; marca Norte/OS presente. |
| JD por rolagem | Novo texto no estado 4; retorno ao 3 preservado. |
| Aplicativo e rodapé | Texto, links e dados corretos, sem referências/portfólio anterior. |
| Celular 390×844 | Hero, painel, aplicativo e rodapé sem overflow. Lista do aplicativo com recuo de 22 px; texto dos itens dentro do viewport. Sidebar do painel se oculta conforme o layout mobile original. |
| Celular 320×740 / movimento reduzido | Largura do documento 320 px; hero cabe; faixa usa animation-name:none. Redimensionamento 320→390→320 sem overflow ou erro JS. |
| Formulário principal | Clique no rótulo Norte/OS e submissão com dados de teste prepara mensagem para 5586999900235 com Interesse: Norte/OS; feedback permite revisão. `window.open` interceptado somente no teste; nenhuma mensagem enviada. Registro `form-norte-os.json`. |
| Galeria | Dez cartões; nova imagem da versão alternativa carregada. Clique real no primeiro cartão abre `/v3` na mesma aba. `gallery-final.json` registra apenas imagens inicialmente visíveis como carregadas; as demais usam lazy loading e foram verificadas como arquivos locais existentes. |
| Nove demos | HTTP 200, zero erros JS, zero autoria antiga visível; seis créditos conferidos e retorno real à raiz. Ver `../qa-agency-credits-2026-10-10/TEMPLATES-CREDITS.md`. |
| Páginas secundárias | `/v3` e artigo JD sem overflow/erro JS, identidade atual e recursos locais válidos. Revisão independente em `SECONDARY-PAGES-FINAL.md`. |

`npm run verify`: **346 arquivos públicos, 17 páginas HTML, 813 referências locais, zero arquivos ausentes**. Busca residual por Sabec/Diogo encontra somente nomes internos de funções e seletores preservados, sem conteúdo público de contato/branding antigo nas páginas revisadas.

## Restauração e entrega

Os três backups foram conferidos novamente por SHA-256 e permanecem intactos:

- Original aprovado: `43C69BF92CB90B67EBEA2E4AAACEC541DE6E6D008AE8981BBC795AE4B39C2F5A`.
- Personalização de 09/10: `32EC9DB2627AC097F5D4105B21C22940DB28FA16262931F3AF97099E9A81CC45`.
- JD/Ana e movimento, antes desta revisão: `9D7BBC063AF997C257D70B5F2B6C469F822FC6D606EB0D669EB0B949EA014672`.

README, PROJECT-STATE e AGENTS registram o estado atual. ZIP de entrega regenerado por `scripts/package.ps1`, incluindo o site e os relatórios, sem node_modules, cache duplicado, ZIPs ou backups internos. Nenhuma publicação realizada.
