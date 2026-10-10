# QA — clone v1 personalizado

Data local: 9 de outubro de 2026. Navegação pelo servidor `http://127.0.0.1:4173`, Chromium via Playwright.

## Backup

O ZIP original foi preservado antes de editar o conteúdo público. Os 187 arquivos públicos foram comparados por SHA-256 com o pacote original. Hash do arquivo permanente, reconferido após a personalização:

`43C69BF92CB90B67EBEA2E4AAACEC541DE6E6D008AE8981BBC795AE4B39C2F5A`

Arquivo: `backups/clone-v1-original-2026-10-09/clone-v1-original.zip`. As instruções e o estado do projeto registram como voltar à base sem perder a versão atual.

## Identidade e conteúdo

Gabriel Holanda, Norte Autoral, logo, foto, WhatsApp, e-mail e Instagram conferidos contra o portfólio existente no workspace. As pastas-fonte foram somente consultadas. Metadados, JSON-LD, apresentação e páginas de informação foram atualizados; credenciais e contatos pessoais do autor da base foram removidos da página principal.

Helena Vasques, Vex Fitness e Vex Construtora são identificados como conceitos fictícios. As nove demos, `/v3` e os links JD/Ana permanecem referências da base. Os fluxos de automação são exemplos de possibilidades, com escopo definido para cada projeto.

## Página principal

- Desktop 1440×900: hero, galeria, apresentação com foto e formulário revisados visualmente. Prisma, efeito de luz e animações de rolagem continuam ativos; sem erros JavaScript observados. O código desde o marcador de cenas guiadas pelo scroll até o fim do HTML é idêntico à base salva, incluindo os scripts de movimento.
- Celular 390×844: hero, galeria e apresentação revisados. Galeria rola horizontalmente dentro da página, sem overflow horizontal do documento.
- Celular 320×740: marca, chamada, título e CTAs permanecem dentro da largura. A pill quebra em duas linhas sem recorte.
- Movimento reduzido 390×844: preferência detectada, fallback estático acionado e títulos visíveis.
- Treze destinos da galeria retornaram HTTP 200 e todos os cartões estão configurados para a mesma aba. Cliques reais abriram Helena e Velorah; seus links trouxeram o visitante de volta a `/#sites`. A seta Próximo moveu a galeria. Relatório: `main-route-checks.json`.
- Todas as nove imagens de demonstração usam os heroes capturados; os três cartões próprios usam os heroes dos conceitos. Fotos e capturas dos destaques são locais.
- Formulário vazio bloqueia o envio e foca o primeiro campo. Com dados de teste, gerou corretamente uma URL WhatsApp para +55 86 99990-0235, incluindo o interesse Automação e quebras de linha. A chamada a `window.open` foi interceptada no QA: nenhuma mensagem foi enviada. Feedback oferece revisão e link alternativo.

Capturas: `main-hero-{desktop,mobile}.png`, `main-gallery-{desktop,mobile}.png`, `main-about-{desktop,mobile}.png`, `main-contact-desktop.png` e `main-reduced-motion.png`.

## Páginas internas

As demos passaram em 29 ações de menus/CTAs, fechamento por Escape, menu acessível e retorno. Menus Lithos e Convix revisados no celular. Relatório: [DEMO-DIAGNOSTICS.md](DEMO-DIAGNOSTICS.md).

Os três conceitos passaram em 45 verificações nos dois tamanhos: filtros, preços, FAQ, carrossel, vídeo e planta 3D. Sem JS errors, 404, imagens quebradas ou overflow observados. Formulários informam que nenhum dado foi enviado. Relatório: [OWN-CASES.md](OWN-CASES.md).

## Verificação de arquivos e limites

`npm run verify`: 341 arquivos públicos, 17 páginas HTML, 809 referências locais verificadas, nenhuma ausente.

As três demos compactas da base foram publicadas como heroes com controles sem destino. Os controles agora abrem um diálogo de demonstração, e não um cadastro ou serviço inexistente. Os conceitos possuem interações de apresentação e não backend comercial. Esta revisão não publicou o projeto nem enviou contatos a terceiros.
