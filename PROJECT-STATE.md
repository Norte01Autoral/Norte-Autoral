# Estado do projeto

## Última revisão — descoberta e páginas de serviço, 13 de outubro de 2026

Publicado no Netlify Free existente **rococo-liger-832df6**, deploy **`6acdb6bf27a8351adc3ec980`**. Pasta atual de publicação: `../publicacao-seo-ia-2026-10-13/`, **235 arquivos**, incluindo `_headers` e `_redirects`. A fonte ativa continua em `Portfólio/`; a reorganização e memória compartilhada de 12/10, o histórico Git, os pacotes anteriores e os backups foram preservados. [QA atual](references/qa-discovery-2026-10-13/QA-FINAL.md), [auditoria publicada](references/qa-discovery-2026-10-13/post-deploy-audit.md).

Criadas **`/trafego-pago/`** e **`/automacao/`**, com conteúdo dos serviços, contato, canonical próprio, `Service`/provider no mesmo `#negocio` e BreadcrumbList. A inicial nomeia sites, tráfego pago e automação em título/descrição/metadados e no catálogo existente; recebeu apenas CSS de apoio aos links, duas chamadas dos serviços e dois links no rodapé. Scripts, animações, geometria, foto, logo e conteúdo aprovado anterior foram preservados. As nove demos, `/v3` e `/site-do-jd` permanecem rastreáveis com `noindex, follow` e fora do sitemap. Não são apresentados como clientes próprios.

Sitemap com **cinco URLs canônicas**: raiz, os dois serviços, `/privacy` e `/terms`. As páginas alteradas têm `lastmod` de 13/10; privacidade e termos conservam a data anterior. Verificação local: **371 arquivos, 20 HTML, 823 referências, nenhuma ausente**. Auditoria HTTP confirmou as cinco páginas, recursos, canonical/snippets, redirecionamentos, bots por sondagem e preservação dos assets; isso não substitui os testes oficiais nem prova identidade de rastreadores.

Em 13/10, a conta de marca **contatonorteautoral@gmail.com**, propriedade Domínio **norteautoral.site**, confirmou a inicial **indexada**, com último Googlebot Smartphone em **12/10/2026, 18:17:07**, canonical da raiz e sitemap reconhecido. A falha de busca de 10/10 foi resolvida: sitemap **Processado**, leitura em **11/10**, três URLs. O arquivo atualizado foi enviado e recebido em 13/10, mas a conferência após envio ainda exibiu leitura de 11/10/três URLs; o processamento das cinco URLs deve ser acompanhado. Os resultados finais de inspeção e pedidos das páginas novas ficam em [SEARCH-CONSOLE.md](SEARCH-CONSOLE.md) e na QA atual.

O controle **Configurações → IA generativa na Pesquisa** foi consultado em 13/10: inclusão padrão de links e conteúdo selecionada, exclusão não selecionada e Salvar desativado. Nenhuma configuração foi alterada. Esse estado permite participação nos recursos, sem comprovar seleção da marca em respostas. [Captura](references/qa-discovery-2026-10-13/gsc-ai-inclusion.png), [texto da interface](references/qa-discovery-2026-10-13/gsc-ai-inclusion.txt), [documentação oficial](https://support.google.com/webmasters/answer/16908024?hl=pt-br).

IndexNow recebeu **três URLs alteradas** — raiz, tráfego pago e automação — com **HTTP 202**, validação da chave pendente. A prova pública `public/cf8454de8e5bc8a6ac18412915f36fd9.txt` deve permanecer em futuros deploys, com `X-Robots-Tag: noindex`, acesso permitido e fora do sitemap. [Registro](references/qa-discovery-2026-10-13/indexnow-submission.json). Notificação aceita não comprova rastreamento, indexação ou recomendação por IA. Nenhum plugin pago ou nova concessão OAuth ao Bing foi necessário para essa integração.

O robots mantém `Allow: /`; não foi criado `llms.txt` nem requisito de treinamento GPTBot para busca. A exibição atual do favicon não foi auditada independentemente aqui, e o PNG256 estável permanece. Não houve avaliação de Perfil da Empresa. Formulários/CTAs encaminham ao contato para o visitante revisar e enviar; não implementam envio automático ou banco de leads.

As duas páginas novas passaram no teste publicado do Google, HTTP 200, todos os recursos carregados, acesso/indexação permitidos, canonical próprio e um BreadcrumbList válido em cada uma. Schema Markup Validator: inicial e serviços com zero erros/avisos. Automação tem **Indexação solicitada** confirmado na interface; tráfego pago teve pedido acionado uma vez, com confirmação final pendente após interrupção do navegador. Ambas ainda não indexadas nas inspeções disponíveis. Não repetir pedidos para obter uma prova; acompanhar o processamento. [Registro dos resultados](references/qa-discovery-2026-10-13/search-console-results.json).

**Próxima ação:** conferir processamento das cinco URLs e indexação individual das páginas de serviço; reunir casos próprios autorizados e referências externas verdadeiras. [Decisões de visibilidade](VISIBILIDADE-GOOGLE-IA.md). Não há garantia de prazo, posição ou seleção por sistemas de IA. A branch de armazenamento segue `portfolio-atualizado-hostinger-2026-10-10`; salvar código não publica automaticamente no Netlify.

## Organização local — 12 de outubro de 2026

Por confirmação do usuário, a fonte principal é `Portfólio/`, renomeada de `Portfolio-Atualizado-GitHub/`; domínio https://norteautoral.site/. Foi criado um único backup completo do portfólio atualizado em `../backups/atualizacao-2026-10-12/portfolio/Portfólio/`, com verificação SHA-256. Os arquivos públicos e o histórico Git foram preservados.

O clone, pacotes de publicação e versões antigas foram movidos juntos para `../backups/historico-portfolio/`, sem criar novos backups completos desses materiais. Os quatro backups anteriores permanecem em `../backups/historico-portfolio/clone v1/backups/`. Os caminhos das seções de auditoria abaixo descrevem a localização original na data de execução; as evidências não foram regravadas. Esta etapa não alterou o site publicado, DNS ou configuração Netlify.

## Revisão anterior — favicon na busca, 10 de outubro de 2026

O usuário forneceu uma captura em que seu site já aparece na busca e pediu a logo no lugar do globo. Foi declarado como favicon principal da inicial o **PNG original do N dourado**, `/assets/norte-autoral/favicon.png`, **256×256**, com URL estável. O ICO existente permanece como fallback. A alteração se limita a duas declarações no head, substituindo SVG/PNG32/ICO por PNG256/ICO com MIME explícito; nenhum bitmap foi editado e os arquivos anteriores permanecem.

Deploy atual **`6acae4f0215a53089aa84c06`**, Netlify Free **rococo-liger-832df6**, com `_headers` e `_redirects`. Pasta separada `../clone-v1-netlify-favicon-2026-10-10/`, 231 arquivos. A publicação foi confirmada pela API do projeto e por HTTP no domínio e permalink. PNG retornou 200, MIME image/png, dimensões 256×256 e SHA-256 igual ao original; robots permite Googlebot e Googlebot-Image. As sondagens com nomes de rastreadores não comprovam rastreamento real do Google. Auditoria: [QA favicon](references/qa-favicon-2026-10-10/QA-FINAL.md).

Preparação confirmou que apenas as declarações de favicon mudaram; todos os outros arquivos públicos, demos, adaptadores, ZIPs e quatro backups foram preservados por hash. `npm run verify`: 367 arquivos, 18 páginas HTML, 813 referências locais, nenhuma ausente. Fonte e pasta de publicação idênticas; Netlify conserva as nove normalizações equivalentes de links documentadas anteriormente.

A página inicial já tinha indexação confirmada e o usuário já confirmou um pedido de atualização. **Não houve novo pedido por causa do favicon.** O globo pode refletir processamento/seleção do Google; sua causa não foi comprovada. A configuração permite que o Google descubra a logo, mas não há confirmação de exibição dela na busca nem prazo garantido. Os testes ao vivo e de dados estruturados na QA Search Console são registros da execução anterior a esta mudança exclusiva de favicon. O sitemap ficou intacto; seu último estado no relatório continua pendente de processamento, sem nova conferência do painel nesta revisão.

## Revisão anterior — Search Console, 10 de outubro de 2026

Propriedade Domínio **norteautoral.site** verificada no Search Console da conta de marca **contatonorteautoral@gmail.com**, por TXT exato salvo na Hostinger. Propagação confirmada por Google Public DNS e Cloudflare; TXT permanece e A/CNAME foram preservados. Configuração, evidências e acompanhamento em [SEARCH-CONSOLE.md](SEARCH-CONSOLE.md) e [QA atual](references/qa-search-console-2026-10-10/QA-FINAL.md).

O painel **Índice do Google** confirmou **O URL está no Google / A página está indexada**, com último rastreamento em 10/10/2026 às 17:10:20, Googlebot Smartphone e canonical da raiz selecionado pelo Google. A verificação final da versão publicada às 21:56:41 permitiu rastreamento/indexação, busca HTTP 200 e carregamento de todos os recursos. O pedido único de atualização foi concluído pelo usuário na interface oficial, que confirmou nesta conversa **Sim, apareceu Indexação solicitada**. A hora exata e uma captura desse pedido não foram registradas; o botão não deve ser acionado novamente. Os três estados permanecem separados. Não há garantia de presença para uma consulta, nome exibido, posição ou prazo.

Sitemap **https://norteautoral.site/sitemap.xml** cadastrado e reenviado uma vez após diagnóstico oficial. O relatório ainda informa **Não foi possível buscar o sitemap**, sem última leitura e com zero páginas encontradas. A inspeção ao vivo do próprio XML conseguiu buscá-lo às 16:24:41; auditorias públicas confirmam XML 200, namespace correto, três URLs canônicas (raiz, privacidade, termos), robots permitindo acesso e ausência de ações manuais. Leitura/processamento pelo relatório continuam pendentes, sem causa técnica demonstrada que exija outra alteração de arquivos. Demos/v3/artigo continuam rastreáveis com noindex e fora do sitemap.

Correções em `public/index.html`: `alternateName: NorteAutoral` no WebSite existente e `Organization` no nó `#negocio`, preservando identidade real. Schema Markup Validator: zero erros/avisos. O Rich Results Test fornecido pelo usuário apontou dois itens válidos. As capturas identificam os avisos não críticos de `address.postalCode` e `address.streetAddress`, ambos opcionais; não foram inventados CEP ou logradouro, e esses avisos não invalidaram os itens. Corrigida ainda uma falha concreta de limite de textura vista no teste Google: o script da hero limita resolução aos limites da GPU e usa o fallback CSS existente em falhas. Dezessete verificações passaram, preservando dimensões/uniformes normais e evitando reinício após falha. Teste Google final não mostrou o erro de textura; restou um aviso de desempenho gráfico. A captura disponível não comprova toda a animação da hero em um quadro do Google.

Deploy de produção **`6acadeababc97ae80a516934`** no projeto Netlify existente **rococo-liger-832df6**, Free. Pacote atual separado: `../clone-v1-netlify-search-2026-10-10/`, com 231 arquivos e `_headers`/`_redirects`. Conteúdo aprovado, markup, CSS, recursos externos, foto, nove demos, ZIPs anteriores e quatro backups preservados. O script inline da hero é a única mudança de comportamento; o grafo recebeu as duas alterações de identificação. Fonte local, pasta de publicação e HTML servido foram comparados; nove links de demos recebem normalização equivalente na publicação, como documentado na QA.

Código e documentação desta revisão são armazenados na branch **portfolio-atualizado-hostinger-2026-10-10**, sem mudar main, backups ou bloqueio Vercel. Publicação Netlify continua manual. Credenciais e estado `.netlify` ficam fora do projeto e do GitHub. Nenhum Perfil da Empresa foi criado ou avaliado.

## Revisão anterior — publicação Netlify, 10 de outubro de 2026

O usuário autorizou a publicação e escolheu hospedagem gratuita após constatar que sua conta Hostinger possui o domínio, mas não um plano de hospedagem. O projeto **rococo-liger-832df6** foi assumido pela conta **norte01autoral**, plano **Free**, e está publicado em **https://rococo-liger-832df6.netlify.app/**. ID público: `3eb337d6-85fb-4e13-9ce3-28db1f369506`.

**norteautoral.site** e **www.norteautoral.site** foram cadastrados no Netlify. DNS salvo na Hostinger: A `@` → `75.2.60.5`, CNAME `www` → `rococo-liger-832df6.netlify.app`, ambos TTL 300. O resolvedor público da Cloudflare confirmou os registros. **Publicado em https://norteautoral.site/, com HTTPS obrigatório e certificado Let's Encrypt emitido para o domínio e www, válido atualmente até 08/01/2027, com renovação automática.** O deploy com os adaptadores foi reenviado: `6aca88a67bc795130b2a0c63`. A auditoria pública confirmou nove demos, quatro páginas auxiliares, 106 recursos, 14/14 aliases 301, variantes HTTP/www para HTTPS sem www, certificado válido, 404 personalizada, cache e Brotli, sem erros nem loops. Evidências em `references/qa-netlify-2026-10-10/`.

`NETLIFY.md` documenta conta, projeto, DNS, adaptadores e atualizações. Os arquivos de manutenção `_headers` e `_redirects` estão em `hosting/netlify/`, separados de `public/`. A pasta de upload `../clone-v1-netlify/` contém os 229 arquivos do ZIP público conferidos por SHA-256 mais os dois adaptadores; não há SPA fallback nem redirecionamento do endereço técnico para o domínio antes da verificação. A auditoria de preparação ficou fora do upload em `../netlify-preparation/`.

Os arquivos públicos, ZIPs da entrega e quatro backups imutáveis foram preservados. O pacote adicional `../clone-v1-netlify.zip` contém somente os 231 arquivos de publicação, incluindo os dois adaptadores; sua auditoria permanece fora do upload em `../netlify-preparation/`. O GitHub permanece na branch `portfolio-atualizado-hostinger-2026-10-10`, sem alterar main nem habilitar Vercel. Deploy Netlify é manual; nenhum vínculo automático com a branch foi criado. Credenciais, reivindicação e estado local `.netlify` não devem ser copiados ao projeto, GitHub ou publicação.

## Revisão anterior — Hostinger/SEO, 10 de outubro de 2026

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
