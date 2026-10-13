# Norte Autoral — publicação no Netlify

Organização em 12/10/2026: a fonte local atual é `Portfólio/`. Os pacotes anteriores mencionados neste relatório ficam em `../backups/historico-portfolio/`, mantendo os nomes originais. A pasta publicada na revisão do favicon está em `../backups/historico-portfolio/clone-v1-netlify-favicon-2026-10-10/`. Reorganizar a fonte local não publica alterações.

O portfólio foi publicado no projeto **rococo-liger-832df6**, na conta **norte01autoral**, com plano **Free**. A Hostinger permanece como registradora e provedora de DNS do domínio; esta conta não possui hospedagem para receber o ZIP.

- Endereço técnico publicado: **https://rococo-liger-832df6.netlify.app/**.
- Domínio principal configurado: **norteautoral.site**.
- Alias configurado: **www.norteautoral.site**.
- ID público do projeto Netlify: `3eb337d6-85fb-4e13-9ce3-28db1f369506`.
- Endereço principal publicado: **https://norteautoral.site/**, com HTTPS obrigatório.
- Certificado HTTPS: **emitido por Let's Encrypt para norteautoral.site e www.norteautoral.site**, validade atual até **08/01/2027**, renovação automática gerenciada pelo Netlify.
- Deploy atual, de 13/10/2026, incluindo `_headers` e `_redirects`: **`6acdb6bf27a8351adc3ec980`**, com páginas de tráfego pago/automação e identificação dos serviços. Favicon PNG256, foto, scripts, animações e correções anteriores de limite WebGL preservados. [QA atual](references/qa-discovery-2026-10-13/QA-FINAL.md), [auditoria publicada](references/qa-discovery-2026-10-13/post-deploy-audit.md). Auditorias históricas: [favicon](references/qa-favicon-2026-10-10/QA-FINAL.md), [Search Console](references/qa-search-console-2026-10-10/QA-FINAL.md) e [Netlify](references/qa-netlify-2026-10-10/QA-FINAL.md).

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

O pacote original da Hostinger e as pastas de publicação anteriores permanecem como registros históricos em `../backups/historico-portfolio/`, conforme a organização de 12/10. A revisão atual está em **`../publicacao-seo-ia-2026-10-13/`**, com **235 arquivos incluindo os dois adaptadores**, os serviços novos, seu CSS e a prova pública IndexNow. Não reenviar ZIPs antigos para atualizar esta revisão. O manifesto [release-preparation.json](references/qa-discovery-2026-10-13/release-preparation.json) registra comparação e preservação. O Netlify usa os dois arquivos na raiz do envio:

- `_redirects`: HTTP/www do domínio próprio para HTTPS sem www; normalização de `index.html`, incluindo `/trafego-pago/index.html` e `/automacao/index.html` para seus diretórios canônicos; páginas reais dos serviços e rotas `/privacy`, `/terms`, `/v3` e `/site-do-jd`; bloqueio público de `.htaccess`. O endereço `netlify.app` continua disponível para verificação. URLs inexistentes recebem `404.html` com status 404, sem retornar a inicial como 200.
- `_headers`: proteção básica, HTML/serviços com revalidação, recursos editáveis e CSS dos serviços com cache de sete dias, CSS/JS com hash com cache de um ano, robots/sitemap/prova IndexNow com uma hora. A prova recebe `Content-Type: text/plain` e `X-Robots-Tag: noindex`. Regras exatas evitam sobreposição entre recursos editáveis e imutáveis.

As cópias para manutenção ficam em **[hosting/netlify/_redirects](hosting/netlify/_redirects)** e **[hosting/netlify/_headers](hosting/netlify/_headers)**. Elas devem ser copiadas para a raiz da pasta enviada em cada publicação. O `.htaccess` continua preservado para eventual uso na Hostinger; o Netlify usa os adaptadores próprios. O ZIP histórico `clone-v1-netlify.zip`, em `../backups/historico-portfolio/`, conserva a publicação anterior. Para atualizar, prepare a fonte atual em pasta separada conforme abaixo.

**Preserve `public/cf8454de8e5bc8a6ac18412915f36fd9.txt` em toda publicação futura**, incluindo sua regra `noindex` nos headers. É a prova pública de domínio do IndexNow, acessível ao protocolo e fora do sitemap. A chave dessa prova não substitui nem exige credenciais de conta; sessões e autenticação privadas continuam fora do upload.

Os adaptadores foram preparados conforme as documentações oficiais de [redirecionamentos](https://docs.netlify.com/manage/routing/redirects/overview/), [status 404, domínios e normalização de URLs](https://docs.netlify.com/manage/routing/redirects/redirect-options/) e [headers](https://docs.netlify.com/manage/routing/headers/).

## Atualizar o site posteriormente

1. Edite os arquivos atuais em `public/` e execute `npm run verify`.
2. Prepare uma nova pasta com os arquivos públicos atuais. Mantenha fora os cinco prefixos históricos de `scripts/hostinger-exclusions.json`: `cases/`, `assets/norte-autoral/cards/`, `assets/norte-autoral/cases/`, `assets/norte-autoral/case-media/` e `assets/norte-autoral/case-runtime/`.
3. Copie os adaptadores de `hosting/netlify/` para a raiz dessa pasta. Ao adicionar, remover ou renomear arquivos, revise as regras exatas em `_headers`; novos arquivos com hash precisam de uma entrada correspondente para cache imutável.
4. Entre na conta **norte01autoral**, abra o projeto **rococo-liger-832df6** e, em **Deploys**, envie essa pasta como atualização do projeto existente. Um deploy manual recebe os arquivos prontos; não executa build no servidor. [Guia oficial de publicação](https://docs.netlify.com/deploy/create-deploys/).
5. Confira o endereço técnico, as páginas e as nove demonstrações antes de validar o domínio próprio. Mantenha os ZIPs e os quatro backups locais como pontos separados de restauração.

O GitHub continua guardando o código na branch `portfolio-atualizado-hostinger-2026-10-10` de `Norte01Autoral/Norte-Autoral`. Esta publicação foi manual; salvar um commit nessa branch não atualiza automaticamente o Netlify. A configuração que desativa o Vercel nessa branch permanece.

## Verificação e Google

A publicação de 13/10 foi conferida no domínio e permalink: cinco páginas canônicas destinadas à busca, duas páginas novas com conteúdo/Service/provider/BreadcrumbList, onze páginas com noindex preservado, 29 recursos selecionados com HTTP 200 e hashes iguais à fonte, redirecionamentos HTTP/www e dos novos `index.html`, cache e prova IndexNow. Doze sondagens com nomes de bots retornaram 200, sem comprovar visitas autênticas desses sistemas. A auditoria não encontrou falhas. `npm run verify`: **371 arquivos, 20 HTML e 823 referências, nenhuma ausente**. Registros em [QA atual](references/qa-discovery-2026-10-13/QA-FINAL.md) e [auditoria publicada](references/qa-discovery-2026-10-13/post-deploy-audit.md); as auditorias anteriores permanecem preservadas.

O SEO usa o domínio canônico em metadados, schema, robots e sitemap. Em 13/10, a propriedade Domínio da conta de marca confirmou a inicial indexada, Googlebot Smartphone de 12/10 às 18:17:07 e canonical da raiz. A falha histórica do sitemap foi resolvida: leitura de 11/10 Processada, três URLs. O sitemap atualizado para cinco URLs foi recebido em 13/10, mas a conferência após envio ainda mostrava leitura anterior/três URLs; acompanhe o processamento da atualização. [SEARCH-CONSOLE.md](SEARCH-CONSOLE.md) registra inspeções e pedidos finais separados.

Também foi conferido o controle de IA generativa do Search Console: inclusão padrão de links e conteúdo selecionada, sem alteração de configuração. Esse controle é independente do deploy e não garante recomendação. [Evidência](references/qa-discovery-2026-10-13/gsc-ai-inclusion.txt), [documentação oficial](https://support.google.com/webmasters/answer/16908024?hl=pt-br).

IndexNow recebeu a raiz e os dois serviços com HTTP 202, validação da chave pendente. Isso comprova recebimento da notificação, sem provar indexação ou recomendação. Não requer plugin pago ou nova concessão OAuth ao Bing. Consulte [registro da submissão](references/qa-discovery-2026-10-13/indexnow-submission.json) e [VISIBILIDADE-GOOGLE-IA.md](VISIBILIDADE-GOOGLE-IA.md). Hospedagem, metadados e notificações não garantem presença por consulta, posição, prazo ou citação por IA.

Credenciais, sessões locais `.netlify`, links de reivindicação e respostas privadas de autenticação não fazem parte do projeto nem da pasta publicada.
