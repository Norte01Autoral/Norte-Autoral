# Estado do projeto

## Última revisão — Hostinger/SEO, 10 de outubro de 2026

Entrega estática preparada para **https://norteautoral.site/**. Foto com cabelo inteiro, removendo somente o zoom e deslocamento interno da foto; Meta Ads e Google Ads confirmados e incluídos na apresentação, faixa, serviços, Quem e formulário. Conteúdo, cores, prisma e cenas Norte/OS/JD preservados.

SEO: título/descrição para Sites/Ads/Parnaíba, canonical absoluto, OG/Twitter com imagem própria 1200×630, dados estruturados de Gabriel/Norte Autoral, robots e sitemap. Demos/v3/artigo têm noindex; páginas destinadas à busca são raiz, privacidade e termos. `.htaccess` cobre SSL/host canônico, rotas reais, página 404, compressão e cache. Instalação e envio do sitemap em `HOSTINGER.md`; não houve publicação ou alteração de DNS.

Desempenho: logo UI 1024→128 px, derivados WebP com dimensões preservadas, remoção do preload da thumbnail abaixo da dobra, gate WebGL que não reinicia fora da hero ao trocar de aba, pausa de mídia fora da tela/aba. Assets iniciais em cache frio local: 932.142→324.851 bytes (**−65,15%**); incluindo HTML, **−55,82%**. Não confundir transferência local com nota Lighthouse ou tempo em produção.

Pacotes: **clone-v1-hostinger.zip** contém o site diretamente na raiz para `public_html`; omite os conceitos históricos e recursos sem referências atuais, conforme `scripts/hostinger-exclusions.json`. **clone-v1-norte-autoral.zip** conserva o projeto de manutenção completo. Recriar pacote público por `npm run build:hostinger`. Backups/cache/node_modules/ZIPs não entram nos pacotes nem no GitHub.

GitHub autorizado para salvar a revisão: **Norte01Autoral/Norte-Autoral**, branch **portfolio-atualizado-hostinger-2026-10-10**, conservando `main` e histórico anterior. `vercel.json` impede deployments automáticos. A pasta de referência `Portfolio-Norte-Autoral-GitHub/` permanece intacta; checkout de envio separado. Capturas históricas permanecem localmente; GitHub mantém relatórios e imagens de QA das últimas revisões.

Evidências atuais em `references/qa-release-2026-10-10/QA-FINAL.md`, `RESPONSIVE.md`, `PERFORMANCE.md`, `SEO-HOSTINGER.md` e respectivos registros. Backup antes destas alterações: `backups/clone-v1-norte-os-2026-10-10/clone-v1-norte-autoral.zip`, SHA-256 `12CEECF1B6735658A9A897C1FD1FFC12D8A30EBF93227E3D2E866C9CBC0E45E4`.

## Revisão anterior — Norte/OS, 10 de outubro de 2026

Página principal com identidade, foto, logo, serviços e contatos públicos de **Gabriel Holanda / Norte Autoral**, em **Parnaíba, PI**, mantendo a base visual autorizada de Sabec. As fontes em `Portfolio-Norte-Autoral-GitHub/` e `MazyOS/` não foram alteradas. Não houve publicação.

### Norte/OS e personalização atual

- Menu, hero, faixa animada, seção **04 · Norte/OS**, painel e opção de interesse no formulário usam **Norte/OS**. A âncora principal é `#norte-os`.
- A seção **O aplicativo** apresenta **“Norte/OS: o sistema operacional do seu negócio.”**: contexto e identidade da marca, conteúdo para revisão, organização de projetos e análise de dados.
- As capacidades descritas se apoiam nas rotinas documentadas em `MazyOS/`. O painel é ilustrativo; ferramentas e integrações são definidas por projeto. Esta revisão não implementou backend SaaS, cadastro ou publicação automática.
- Busca da cena Hoje: **“dentista em Parnaíba”**. Rodapé: **“© 2026 Norte Autoral · Gabriel Holanda · PARNAÍBA, PI”**. Removidos o link para o portfólio anterior e o bloco de referências de layout.
- Etapa 04 do destaque JD: **“Uma presença digital à altura do trabalho.”**, com texto sobre identidade visual, conteúdo e navegação; sem a chamada anterior que destacava ferramentas de IA e publicação no mesmo dia.
- Os seis templates completos usam o crédito **“Site demonstrativo (template) produzido pela Norte Autoral · Gabriel Holanda”**, com link para `/`. Nas três demos compactas não há crédito antigo de agência. O retorno flutuante se oculta quando o crédito do rodapé aparece e volta fora dessa área.

### Vitrine atual

- Destaque **JD Andrade** restaurado com as quatro imagens de referência (`jd-capa.jpg`, `jd-arte.jpg`, `jd-galeria.jpg` e `jd-galeria-2.jpg`) e a imagem do celular. Apenas o botão **Abrir o site**, para `https://jdandrade.art`.
- Destaque **Dra. Ana Scatolin** restaurado com as imagens desktop e celular. Link externo: `https://www.draanascatolin.com.br`.
- Galeria com **dez cartões**: versão alternativa `/v3` e nove demos internas — Velorah, Lithos, Clínica Vértice, Convix, Áureo, Margô, Instituto Liminar, Verene e Estúdio Linha.
- Cartões em proporção **4/5**. A nova thumbnail `public/assets/norte-autoral/portfolio-v3.jpg` mostra `/v3` com identidade Norte Autoral; as demais imagens de referência, inclusive a thumbnail original de Velorah, permanecem.
- Helena Vasques, Vex Fitness e Vex Construtora foram retirados da vitrine. Seus arquivos em `public/cases/` e os respectivos recursos permanecem históricos, fora da página principal. Não reintegrá-los sem nova instrução.

JD, Dra. Ana e as nove demos derivam da base visual autorizada. Não apresentá-los como clientes de Gabriel/Norte Autoral. `/v3` é uma adaptação visual dessa base com a identidade atual; não atribuir a Gabriel credenciais ou serviços privados do autor original.

### Movimento e identidade

- Prisma WebGL, GSAP/ScrollTrigger, Lenis e cenas guiadas por rolagem preservados.
- Reveals de texto GSAP: **0,85s**, com opacidade e **blur de 2px** até o texto ficar nítido.
- Cena **Hoje**: fragmentos com escala **0,94→1,06**; beat com **0,96→1**.
- Cartões da galeria: feedback de pressão em CSS com escala **0,975**, seguido de navegação após **160ms**. Preferência por movimento reduzido respeitada.
- Foto de Gabriel colorida, sem o filtro de preto e branco da base.
- Logo e favicon usam o **N dourado** existente, com transparência. Favicons SVG, ICO e PNG derivados do mesmo arquivo, sem redesenho.

### Contato e páginas secundárias

WhatsApp: **+55 86 99990-0235**. E-mail: **contatonorteautoral@gmail.com**. Instagram: **gabrielholanda._**.

O formulário principal monta uma mensagem para o visitante revisar e enviar no WhatsApp. Não envia automaticamente nem grava os campos em banco de dados do site. Os formulários históricos de conceito informam que nenhum dado foi enviado; o formulário de `/v3` permanece desativado. A cópia não usa a chave Web3Forms nem o analytics do autor.

As demos possuem navegação de retorno ao portfólio. Botões antes sem destino nas três demos compactas abrem diálogo de demonstração, sem inventar cadastro ou backend. `/terms` descreve a vitrine atual, os dois sites externos como referências e o caráter ilustrativo do painel Norte/OS.

`/v3` usa nome, foto, logo, contatos e metadata da Norte Autoral, com Norte/OS e Parnaíba, PI; o formulário permanece desativado. `/site-do-jd` usa a marca e os contatos atuais, mas conserva o relato histórico original em terceira pessoa e os prompts em contexto de estudo. Não é um trabalho apresentado como criação de Gabriel.

Os arquivos em `public/` são a versão atual editável. `scripts/personalize.mjs`, `scripts/restore-featured.mjs`, `scripts/update-info.mjs` e `npm run mirror` são migrações/restauração históricas e podem sobrescrever a personalização final; não os executar como rotina de manutenção.

### Evidências da revisão

Registros atuais: `references/qa-branding-2026-10-10/QA-FINAL.md` e `references/qa-agency-credits-2026-10-10/TEMPLATES-CREDITS.md`. A revisão anterior de movimento permanece em `references/qa-motion-2026-10-10/QA-FINAL.md`. Relatórios de 09/10 permanecem em `references/qa-revision/`; evidências da captura original permanecem em `references/qa/`.

## Pontos de restauração preservados

### Original aprovado — 9 de outubro de 2026

- Arquivo: `backups/clone-v1-original-2026-10-09/clone-v1-original.zip`.
- SHA-256: `43C69BF92CB90B67EBEA2E4AAACEC541DE6E6D008AE8981BBC795AE4B39C2F5A`.
- Inclui a página Sabec original e nove demos internas; 187 arquivos públicos conferidos antes da personalização. JD e Dra. Ana permanecem links originais, por decisão do usuário.
- O arquivo original permanece intacto. Antes de restaurá-lo, guardar uma cópia do estado atual. Não publicar automaticamente.

### Personalização anterior — 9 de outubro de 2026

- Arquivo: `backups/clone-v1-norte-autoral-2026-10-09/clone-v1-norte-autoral.zip`.
- SHA-256: `32EC9DB2627AC097F5D4105B21C22940DB28FA16262931F3AF97099E9A81CC45`.
- Preserva o estado personalizado anterior às mudanças de 10/10, incluindo a vitrine então usada. Não substituir nem confundir esse ZIP com o original aprovado.

### JD/Ana e movimento — 10 de outubro de 2026, antes de Norte/OS

- Arquivo: `backups/clone-v1-jd-motion-2026-10-10/clone-v1-norte-autoral.zip`.
- SHA-256: `9D7BBC063AF997C257D70B5F2B6C469F822FC6D606EB0D669EB0B949EA014672`.
- Preserva JD/Ana, a galeria de dez cartões e os ajustes de movimento antes desta revisão de nomes, créditos, seção O aplicativo e rodapé. Não substituir pelo ZIP de entrega atual.
