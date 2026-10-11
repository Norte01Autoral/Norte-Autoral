# Norte Autoral — publicação no Netlify

O portfólio foi publicado no projeto **rococo-liger-832df6**, na conta **norte01autoral**, com plano **Free**. A Hostinger permanece como registradora e provedora de DNS do domínio; esta conta não possui hospedagem para receber o ZIP.

- Endereço técnico publicado: **https://rococo-liger-832df6.netlify.app/**.
- Domínio principal configurado: **norteautoral.site**.
- Alias configurado: **www.norteautoral.site**.
- ID público do projeto Netlify: `3eb337d6-85fb-4e13-9ce3-28db1f369506`.
- Endereço principal publicado: **https://norteautoral.site/**, com HTTPS obrigatório.
- Certificado HTTPS: **emitido por Let's Encrypt para norteautoral.site e www.norteautoral.site**, validade atual até **08/01/2027**, renovação automática gerenciada pelo Netlify.
- Deploy atual, incluindo `_headers` e `_redirects`: **`6acadeababc97ae80a516934`**, com identificação da marca e correção de limite WebGL. [Auditoria atual](references/qa-search-console-2026-10-10/post-deploy-audit.md). A auditoria histórica do deploy `6aca88a67bc795130b2a0c63` permanece em [QA Netlify](references/qa-netlify-2026-10-10/QA-FINAL.md).

## DNS já salvo na Hostinger

| Tipo | Nome | Destino | TTL |
| --- | --- | --- | --- |
| A | `@` | `75.2.60.5` | `300` |
| CNAME | `www` | `rococo-liger-832df6.netlify.app` | `300` |
| TXT | `@` | `google-site-verification=pTRVHEnDi7tYQgmfY3JWNIdlwodp3AJbs3ii3t6J0cg` | `300` |

O TXT verifica a propriedade Domínio na conta de marca do Search Console e deve permanecer após a verificação. A/CNAME e servidores de nomes foram preservados. Veja [SEARCH-CONSOLE.md](SEARCH-CONSOLE.md).

Esses registros foram salvos na conta do usuário e confirmados por consulta ao resolvedor público da Cloudflare. DNS em outros provedores pode levar mais tempo para atualizar. Os servidores de nomes da Hostinger foram mantidos. A configuração A/CNAME segue a [documentação de DNS externo do Netlify](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/).

O Netlify emite e renova certificados gratuitos para domínios apontados corretamente. Acompanhe **Domain management → HTTPS** e confirme que o certificado inclui o domínio principal e o alias www. Uma consulta DNS positiva, sozinha, não comprova que o certificado já foi emitido. [Documentação de HTTPS](https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/).

## Arquivos publicados e adaptadores

O site é estático. A pasta de envio contém `index.html`, as páginas reais, `assets/`, `vendor/` e `marketing/` diretamente na raiz. Não exige Node.js, WordPress nem banco de dados na hospedagem.

O pacote original da Hostinger e a pasta anterior `../clone-v1-netlify/` permanecem como registros históricos. A revisão atual foi preparada em **`../clone-v1-netlify-search-2026-10-10/`**, com 229 arquivos públicos atuais e dois adaptadores. Não reenviar ZIPs antigos para atualizar esta revisão. O manifesto [release-preparation.json](references/qa-search-console-2026-10-10/release-preparation.json) registra comparação e preservação. O Netlify usa os dois arquivos na raiz do envio:

- `_redirects`: HTTP/www do domínio próprio para HTTPS sem www; normalização de `index.html`; rotas reais `/privacy`, `/terms`, `/v3` e `/site-do-jd`; bloqueio público de `.htaccess`. O endereço `netlify.app` continua disponível para verificação. URLs inexistentes recebem a página `404.html` com status 404, sem retornar a página inicial como status 200.
- `_headers`: proteção básica de conteúdo/referrer/frame, HTML com revalidação, recursos editáveis com cache de sete dias, arquivos CSS/JS com hash com cache de um ano, `robots.txt` e sitemap com uma hora. Regras de cache usam caminhos exatos, evitando sobreposição entre recursos editáveis e recursos imutáveis.

As cópias para manutenção ficam em **[hosting/netlify/_redirects](hosting/netlify/_redirects)** e **[hosting/netlify/_headers](hosting/netlify/_headers)**. Elas devem ser copiadas para a raiz da pasta enviada em cada publicação. O `.htaccess` continua preservado para eventual uso na Hostinger; o Netlify usa os adaptadores próprios. O ZIP **`../clone-v1-netlify.zip`** conserva a publicação anterior, não a revisão atual do Search Console. Para uma nova atualização, prepare os arquivos atuais em uma pasta separada conforme abaixo.

Os adaptadores foram preparados conforme as documentações oficiais de [redirecionamentos](https://docs.netlify.com/manage/routing/redirects/overview/), [status 404, domínios e normalização de URLs](https://docs.netlify.com/manage/routing/redirects/redirect-options/) e [headers](https://docs.netlify.com/manage/routing/headers/).

## Atualizar o site posteriormente

1. Edite os arquivos atuais em `public/` e execute `npm run verify`.
2. Prepare uma nova pasta com os arquivos públicos atuais. Mantenha fora os cinco prefixos históricos de `scripts/hostinger-exclusions.json`: `cases/`, `assets/norte-autoral/cards/`, `assets/norte-autoral/cases/`, `assets/norte-autoral/case-media/` e `assets/norte-autoral/case-runtime/`.
3. Copie os adaptadores de `hosting/netlify/` para a raiz dessa pasta. Ao adicionar, remover ou renomear arquivos, revise as regras exatas em `_headers`; novos arquivos com hash precisam de uma entrada correspondente para cache imutável.
4. Entre na conta **norte01autoral**, abra o projeto **rococo-liger-832df6** e, em **Deploys**, envie essa pasta como atualização do projeto existente. Um deploy manual recebe os arquivos prontos; não executa build no servidor. [Guia oficial de publicação](https://docs.netlify.com/deploy/create-deploys/).
5. Confira o endereço técnico, as páginas e as nove demonstrações antes de validar o domínio próprio. Mantenha os ZIPs e os quatro backups locais como pontos separados de restauração.

O GitHub continua guardando o código na branch `portfolio-atualizado-hostinger-2026-10-10` de `Norte01Autoral/Norte-Autoral`. Esta publicação foi manual; salvar um commit nessa branch não atualiza automaticamente o Netlify. A configuração que desativa o Vercel nessa branch permanece.

## Verificação e Google

A publicação foi conferida em **https://norteautoral.site/**: nove demonstrações, quatro páginas auxiliares, 106 recursos públicos, 14 aliases com redirecionamento 301, variantes HTTP/www para HTTPS sem www, certificado válido, 404 personalizada, cache e compressão Brotli. Não houve falhas de recursos, erros HTTP inesperados ou loops. Esta etapa foi uma auditoria HTTP pública; a verificação visual e responsiva local está documentada na QA da entrega anterior.

O SEO usa `https://norteautoral.site/` em canonical, metadados sociais, dados estruturados, robots e sitemap. A propriedade Domínio foi verificada e o sitemap cadastrado. A inicial foi confirmada indexada no painel Índice do Google; o relatório Sitemaps ainda mostra falha de busca, apesar do teste ao vivo bem-sucedido do XML. Resultados separados, evidências e acompanhamento constam em [SEARCH-CONSOLE.md](SEARCH-CONSOLE.md). A hospedagem não garante presença por consulta, posição nem prazo de processamento.

Credenciais, sessões locais `.netlify`, links de reivindicação e respostas privadas de autenticação não fazem parte do projeto nem da pasta publicada.
