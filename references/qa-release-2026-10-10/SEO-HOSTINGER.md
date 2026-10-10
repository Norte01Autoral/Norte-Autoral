# SEO e preparação Hostinger — 10/10/2026

## Cobertura prevista

- Página principal: título e descrição com os serviços reais, Parnaíba, canonical e metadados sociais absolutos no domínio confirmado `https://norteautoral.site/`; JSON-LD parseável e sem avaliações ou credenciais inventadas.
- Imagem social: N original, Gabriel/Norte Autoral, cidade e serviços visíveis, proporção 1200×630, sem texto cortado. Conferir a imagem e dimensões antes do ZIP.
- Indexação: principal, privacidade e termos liberados. Nove demos, `/v3`, `/site-do-jd` e 404 com `noindex`; robôs podem ler essas páginas. Sitemap com as três URLs canônicas indexáveis.
- Hospedagem: `index.html` e `.htaccess` na raiz do ZIP, rotas reais, resposta 404 própria, cache/compressão condicionados aos módulos do servidor, redirecionamentos sem loops por reescrita interna.
- Controles novos: página 404 com logo/início e botão de retorno utilizáveis por clique/teclado, inclusive largura 320px.
- Exploração: acesso a `.html` direto e normalização de `index.html`; endereço desconhecido deve permanecer 404 em produção; HTTP/www converge ao domínio HTTPS depois da ativação do SSL.
- Exclusões: conceitos antigos Helena/Vex e seus recursos não são publicados; fonte e backups permanecem. Conferir todas as páginas/JS/CSS retidos contra os prefixos excluídos.
- ZIP: somente arquivos públicos ativos, sem fonte, histórico, referências ou dependências; hash SHA-256 e número de entradas após geração final.

## Fontes primárias consultadas

Título/descrição claros e conteúdo útil são orientações do [Guia de SEO do Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

Canonical, redirecionamentos e sitemap reforçam uma URL preferida, sem garantir a escolha do Google. [Canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

Sitemaps devem listar URLs absolutas destinadas aos resultados; foram incluídas somente principal, privacidade e termos. [Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

Uma página precisa ser rastreável para o Google ler seu `noindex`; por isso os templates não são bloqueados em robots.txt. [Meta robots](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

O schema descreve os dados fornecidos sobre Norte Autoral, Gabriel e serviços. Campos desconhecidos de rua, avaliações, certificações, horários e preços foram omitidos. [Dados de negócio local](https://developers.google.com/search/docs/appearance/structured-data/local-business).

O gerenciador da Hostinger abre a pasta `public_html` do domínio e permite upload/extração; o Criador de Sites não oferece esse fluxo. [Gerenciador de arquivos](https://www.hostinger.com/support/4548688-basic-actions-in-the-file-manager-in-hostinger/).

HTTPS precisa de certificado ativo; a Hostinger oferece a opção Forçar HTTPS. Não houve acesso ao hPanel, mudança de DNS ou publicação nesta tarefa. [SSL/HTTPS](https://www.hostinger.com/support/1583201-how-to-enable-or-disable-https-for-your-website-at-hostinger/).

Revisão das regras de reescrita, variáveis de pedido, cabeçalhos e expiração com a documentação do Apache 2.4. O redirecionamento de protocolo mantém o escape normal de caracteres especiais; `THE_REQUEST` distingue o endereço solicitado das reescritas internas. [mod_rewrite](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html), [mod_headers](https://httpd.apache.org/docs/2.4/mod/mod_headers.html), [mod_expires](https://httpd.apache.org/docs/2.4/mod/mod_expires.html).

## Limite da conferência

O servidor Node local não interpreta `.htaccess`. As regras de Apache/LiteSpeed são revisadas estruturalmente e entregues com a conferência necessária no domínio após o upload. Não declarar que cabeçalhos, redirecionamentos de produção, indexação ou ranking já estão ativos.

## Resultado

- Imagem OG gerada, renderizada no Chromium e inspecionada visualmente: **1200×630**, JPEG **64.112 bytes**. Logo N original, cinco serviços, Gabriel Holanda, Parnaíba/PI e domínio visíveis. Fonte Space Grotesk e logo carregados; nenhum erro de página ou recurso. Evidências: `og-preview.html`, `render-og.mjs`, `OG-IMAGE-QA.json` e `public/assets/norte-autoral/og-norte-autoral.jpg`.
- Auditoria `audit-seo-hostinger.mjs`: **229 arquivos públicos retidos**, **15 HTML**, **1.305 referências examinadas contra exclusões** e **nenhuma referência a uma pasta omitida**. As três páginas indexáveis têm canonical no domínio final; as nove demos, v3, estudo e 404 têm `noindex, follow`. JSON-LD principal parseado. Resultado completo: `SEO-HOSTINGER-AUDIT.json`.
- `.htaccess` revisado: redirecionamento HTTP/www somente para o domínio de produção; pedidos diretos de `index.html` raiz ou dos nove templates convergem à respectiva pasta; o teste `THE_REQUEST` impede redirecionar reescritas internas. As quatro rotas de página resolvem seus HTML reais; caminhos desconhecidos preservam o erro 404. A exceção de `.well-known` permite validação de certificado. Não há regra genérica que substitua uma URL ausente pela página inicial.
- Cache immutable restringido aos nomes com hash das saídas Vite e vendor. `demo-navigation.js`, `media-performance.js` e `profile.css` ficam no cache normal de sete dias, permitindo atualização conforme as instruções. A expressão foi exercitada contra sete nomes reais, incluindo os três recursos editáveis; resultado em `SEO-HOSTINGER-AUDIT.json`.
- Scripts de embalagem revisados: origem precisa ser o `public/` deste projeto; saída precisa ser `clone-v1-hostinger.zip` no workspace; manifesto de exclusões precisa ser o arquivo fixo do projeto com prefixos relativos. Esses limites protegem os ZIPs de restauração. Nenhum link simbólico foi encontrado em `public/` nesta conferência.
- ZIP final e hash serão registrados por `scripts/build-hostinger.mjs` em `HOSTINGER-PACKAGE.json` após a conclusão das alterações e da validação geral pelo agente principal. **Nenhum pacote final foi gerado nesta etapa e nenhuma publicação foi feita.**

Os comportamentos de `.htaccess`, compressão, cabeçalhos e HTTPS continuam pendentes de teste no servidor da Hostinger após o upload: o servidor local Node não executa essas regras. O guia `HOSTINGER.md` inclui os endereços e as respostas esperadas para essa conferência.
