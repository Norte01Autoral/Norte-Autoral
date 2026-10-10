# Clone v1 — Norte Autoral

Portfólio personalizado para **Gabriel Holanda / Norte Autoral**, em **Parnaíba, PI**, sobre a base visual autorizada de **https://www.sabec.dev/**, capturada em **9 de outubro de 2026**. Revisão atual: **10 de outubro de 2026**, com Meta Ads, Google Ads, Norte/OS e a foto com o cabelo inteiro. Prisma WebGL, fontes e direção visual preservados.

## Publicação atual no Netlify

Publicado em **https://norteautoral.site/**, no projeto do usuário **norte01autoral**, plano **Free**. O domínio e o alias www estão cadastrados; os registros A/CNAME foram salvos na Hostinger e confirmados por DNS público. **HTTPS obrigatório configurado, com certificado Let's Encrypt emitido para o domínio e www.** Os adaptadores de rotas/cache foram reenviados no deploy `6aca88a67bc795130b2a0c63`; a [auditoria pública](references/qa-netlify-2026-10-10/QA-FINAL.md) confirmou páginas, recursos, redirecionamentos, certificado e cache, sem erros ou loops. Consulte [NETLIFY.md](NETLIFY.md) para o estado e a manutenção. Endereço técnico: **https://rococo-liger-832df6.netlify.app/**.

Os adaptadores separados estão em `hosting/netlify/`. **clone-v1-netlify.zip** é o pacote de publicação com os dois adaptadores incluídos; extraia-o em uma pasta antes de enviar uma atualização manual pelo painel. O projeto `public/`, os ZIPs anteriores e os quatro pontos de restauração permanecem preservados. A Hostinger mantém o domínio/DNS; a hospedagem desta publicação é o Netlify.

## Instalar na Hostinger

Use **clone-v1-hostinger.zip**, com `index.html` na raiz, e extraia seu conteúdo diretamente em **public_html**. O site é estático e não exige Node.js, WordPress ou banco de dados no servidor. [HOSTINGER.md](HOSTINGER.md) contém o passo a passo de envio, SSL e Google Search Console. O ZIP de código-fonte **clone-v1-norte-autoral.zip** serve para manutenção local.

SEO configurado para o domínio informado: canonical, título/descrição, imagem social, dados estruturados, `robots.txt` e `sitemap.xml`. Os templates continuam navegáveis e usam `noindex`; o portfólio principal é destinado à busca. A publicação Netlify e os registros DNS constam em [NETLIFY.md](NETLIFY.md); a solicitação de indexação deve ser feita após confirmar o HTTPS do domínio próprio.

A foto mantém enquadramento completo, sem o zoom que cortava o cabelo. Meta Ads e Google Ads aparecem em hero, faixa contínua, serviços, Quem e interesse do formulário. Logo menor e imagens WebP reduzem os bytes; mídia fora da tela/aba é pausada. Medição local em cache frio: **65,15% menos bytes de assets iniciais**, ou **55,82% incluindo HTML**. Esses números não representam uma medição do servidor de produção. Evidências: [QA de entrega](references/qa-release-2026-10-10/QA-FINAL.md).

A versão para GitHub fica na branch **portfolio-atualizado-hostinger-2026-10-10** do repositório **Norte01Autoral/Norte-Autoral**, com `public/`, scripts e documentação. `vercel.json` desativa os deployments automáticos dessa branch de armazenamento. Backups e ZIPs permanecem locais; capturas antigas de QA ficam no projeto e no ZIP de manutenção, enquanto o repositório mantém os relatórios e capturas das últimas revisões.

```powershell
npm run build:hostinger
```

O comando valida as referências e recria o ZIP de hospedagem. Os scripts históricos de migração não são manutenção desta revisão.

## Abrir

Com Node.js instalado, dê dois cliques em **INICIAR.cmd** e abra **http://127.0.0.1:4173** no navegador. Mantenha o terminal aberto enquanto usa o site.

Ou, nesta pasta, execute:

```powershell
npm start
```

O servidor usa apenas módulos nativos do Node.js; não exige instalar dependências para abrir o site. Não abra `public/index.html` por `file://`, pois as rotas, fontes e módulos precisam de HTTP.

## Incluído

- Página principal, versão alternativa `/v3` com identidade Norte Autoral, estudo de referência `/site-do-jd`, `/privacy` e `/terms`.
- Nove demonstrações: Velorah, Lithos, Clínica Vértice, Convix, Áureo, Margô, Instituto Liminar, Verene e Estúdio Linha.
- Destaque JD Andrade com quatro imagens e um único botão **Abrir o site**; destaque Dra. Ana Scatolin com imagens desktop e celular.
- Galeria com dez cartões: `/v3` e as nove demos, em proporção **4/5**, inclusive a thumbnail original de Velorah. A imagem `public/assets/norte-autoral/portfolio-v3.jpg` retrata a versão alternativa personalizada. Demos abrem na mesma aba e possuem navegação de retorno.
- Nome, N dourado no logo e favicon, foto colorida, serviços, WhatsApp, e-mail e Instagram de Gabriel.
- Arquivos históricos dos conceitos Helena Vasques, Vex Fitness e Vex Construtora preservados, fora da vitrine atual.
- Imagens, vídeos, fontes e bibliotecas de animação locais. Prisma WebGL, GSAP/ScrollTrigger, Lenis e scripts originais de rolagem preservados.
- [Prompt completo para copiar e usar](PROMPT-CLONAGEM.md), [análise da fonte](references/source/SOURCE-ANALYSIS.md), [manifesto dos recursos](references/assets-manifest.json) e capturas de comparação em `references/qa/`.

Os links externos são **https://jdandrade.art** e **https://www.draanascatolin.com.br**. Esses destaques e as demonstrações derivam da base autorizada; não são apresentados como clientes de Gabriel ou da Norte Autoral. `/v3` é uma adaptação visual dessa base com a identidade atual. Botões antes sem destino nas três demos compactas abrem um diálogo de demonstração e oferecem contato com a Norte Autoral.

## Norte/OS e textos atuais

- **Norte/OS** no menu, na hero, nas duas metades da faixa animada, na seção 04, no painel e na opção do formulário principal.
- A seção **O aplicativo** apresenta **“Norte/OS: o sistema operacional do seu negócio.”**, com contexto da marca, conteúdo para revisão, organização de projetos e análise de dados.
- O painel animado é um exemplo de fluxo. Ferramentas, rotinas e integrações são definidas por projeto; esta revisão não criou um backend SaaS, cadastro ou publicação automática. O conteúdo se apoia nas capacidades documentadas em `MazyOS/`, sem alterar esse projeto.
- Busca ilustrativa **“dentista em Parnaíba”**; rodapé **“Gabriel Holanda · PARNAÍBA, PI”**, sem o link do portfólio anterior nem o bloco de referências de layout.
- No destaque JD, a etapa 04 usa **“Uma presença digital à altura do trabalho.”** e valoriza identidade, conteúdo e navegação. O relato histórico em `/site-do-jd` mantém as ferramentas e os prompts originais em contexto de estudo, sem atribuir a criação a Gabriel.
- Os seis templates completos creditam **“Norte Autoral · Gabriel Holanda”**, com link para o início. As três demos compactas não possuem crédito antigo de agência. O controle flutuante de retorno se oculta quando o crédito do rodapé está visível, evitando cobrir o texto.

## Movimento e identidade — revisão de 10/10

- Reveals de texto GSAP com opacidade e blur de **2px**, em **0,85s**.
- Fragmentos da cena Hoje com escala **0,94→1,06** e beat com **0,96→1**.
- Pressão nos cartões da galeria com escala CSS **0,975** e navegação após **160ms**, respeitando movimento reduzido.
- Foto de Gabriel colorida; logo e favicons SVG, ICO e PNG usam o mesmo N dourado transparente existente, sem redesenho.

Leia [PROJECT-STATE.md](PROJECT-STATE.md) antes de retomar alterações. Essa é a memória atual; a antiga vitrine com Helena/Vex não deve ser recolocada sem uma nova solicitação.

## Versão original guardada

Ponto permanente: **clone v1 original aprovado**. Arquivo: `backups/clone-v1-original-2026-10-09/clone-v1-original.zip`. O hash está em `SHA256.txt` na mesma pasta. Os 187 arquivos públicos da cópia inicial foram comparados antes da personalização; o ZIP permanece intacto.

Para pedir a volta, diga: **“Volte para a versão original salva do clone v1 e começamos novamente.”** As instruções para preservar a versão atual antes da restauração estão no `LEIA-ME.md` do backup. O ZIP personalizado é separado; o backup original permanece no projeto local e pode ser copiado separadamente.

A personalização anterior de **09/10** também foi preservada em `backups/clone-v1-norte-autoral-2026-10-09/clone-v1-norte-autoral.zip`, SHA-256 **32EC9DB2627AC097F5D4105B21C22940DB28FA16262931F3AF97099E9A81CC45**. Esse ponto contém o estado anterior às mudanças de 10/10 e permanece separado do original aprovado.

O estado de **10/10 antes da revisão Norte/OS**, com JD/Ana e movimento já ajustados, fica em `backups/clone-v1-jd-motion-2026-10-10/clone-v1-norte-autoral.zip`, SHA-256 **9D7BBC063AF997C257D70B5F2B6C469F822FC6D606EB0D669EB0B949EA014672**. Preserve os três pontos de restauração separados do ZIP de entrega atual.

## Editar depois

O arquivo principal é **public/index.html**. Ele mantém a estrutura, o CSS e o JavaScript da base e contém a personalização atual. Ajustes de identidade/layout: **public/assets/norte-autoral/profile.css**. Conceitos históricos, fora da vitrine: **public/cases/**. Demonstrações: **public/marketing/portfolio/**.

As três demonstrações feitas com Vite/React incluem seus bundles compilados públicos. O repositório original, o histórico e os componentes React de desenvolvimento não estavam publicados. As demais páginas possuem código inline que pode ser editado diretamente.

## Formulário e publicação

O formulário principal monta uma mensagem para o WhatsApp da Norte Autoral, para o visitante revisar e enviar, inclusive quando o interesse selecionado é Norte/OS. Não envia automaticamente nem armazena os campos em banco de dados do site. Os formulários conceito informam que nenhum dado foi enviado; o formulário de `/v3` permanece desativado. A cópia não usa a chave Web3Forms nem o analytics do autor.

Contatos, metadata, `/privacy` e `/terms` foram atualizados para Gabriel / Norte Autoral e para o funcionamento deste portfólio. O projeto funciona localmente e foi publicado no endereço técnico do Netlify; consulte o estado do domínio próprio em [NETLIFY.md](NETLIFY.md).

## Verificar e reproduzir

```powershell
npm run verify
```

Esse comando verifica arquivos referenciados por HTML/CSS. Registros desta revisão: [QA Norte/OS e identidade](references/qa-branding-2026-10-10/QA-FINAL.md) e [créditos dos templates](references/qa-agency-credits-2026-10-10/TEMPLATES-CREDITS.md). As [evidências de movimento](references/qa-motion-2026-10-10/QA-FINAL.md) de 10/10 permanecem preservadas. Os registros anteriores de [personalização](references/qa-revision/QA-PERSONALIZACAO.md), [demos](references/qa-revision/DEMO-DIAGNOSTICS.md) e [conceitos históricos](references/qa-revision/OWN-CASES.md) documentam a revisão de 09/10. [QA-RESULTS.md](references/QA-RESULTS.md), o prompt e `references/source/` descrevem a captura original.

```powershell
npm run mirror
```

Esse comando recria `public/` a partir do snapshot de `references/source/`, usando o cache local ou baixando os recursos novamente. **Ele sobrescreve edições feitas em public/**; execute apenas para restaurar a cópia inicial. O ZIP omite `node_modules/` e o cache duplicado de downloads, mantendo o site completo e as fontes de referência.

`scripts/personalize.mjs`, `scripts/restore-featured.mjs` e `scripts/update-info.mjs` registram migrações históricas. Podem sobrescrever textos e personalizações posteriores; não fazem parte da rotina atual de edição. Os arquivos em `public/` são a versão final editável. O espelhamento também é uma operação de restauração, não de manutenção da identidade atual.

Para usar as ferramentas opcionais de inspeção Playwright: `npm install` e `npx playwright install chromium`. Isso não é necessário para abrir o clone.
