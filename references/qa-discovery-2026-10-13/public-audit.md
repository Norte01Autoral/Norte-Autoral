# Auditoria pública — 13/10/2026

Verificada em 13/10/2026, 01:23:29 (America/Sao_Paulo). Fonte ativa: Portfólio/public. [Evidência JSON](public-audit.json). Nenhuma publicação, alteração de arquivos públicos, DNS, Git ou acesso a credenciais foi realizada.

- Inicial HTTP 200, HTTPS validado, canonical `https://norteautoral.site/`, robots `index, follow, max-image-preview:large`, X-Robots-Tag ausente. HTTP/www terminam em HTTPS sem www: true.
- Robots HTTP 200: wildcard Allow:/, sem Disallow não vazio. Permite Googlebot, Googlebot-Image, OAI-SearchBot, bingbot e PerplexityBot, páginas e recursos.
- Sitemap HTTP 200, somente raiz, /privacy e /terms. URLs 200, canônicas e sem noindex: true. Nove demos + /v3 + /site-do-jd: 200/noindex e fora do sitemap: true.
- 11 recursos principais CSS, JS, logo, foto, OG e favicons: 200 e hashes iguais à fonte local: true. Favicon principal PNG: 256×256, URL estável /assets/norte-autoral/favicon.png, fallback ICO. Googlebot-Image recebe 200 nessa sondagem.
- User-Agents Googlebot, OAI-SearchBot, bingbot e PerplexityBot recebem inicial 200, sem noindex. São sondagens com nome no cabeçalho, sem identidade/IP de rastreadores reais; não provam visita nem eliminam possíveis políticas por IP.
- Publicado versus fonte: SHA bruto igual false; normalização de linhas igual false; igualdade após as nove transformações históricas de links de demos true. Head normalizado e texto HTML principal preservados: true. SHA publicado: `9a4176961b19a7c0303f44d780e40c2695de4a65ab49d1a1b018c8941fd3bfc5`.
- Deploy registrado na memória: `6acae4f0215a53089aa84c06`, Free/manual. [Permalink](https://6acae4f0215a53089aa84c06--rococo-liger-832df6.netlify.app/) tem o mesmo HTML público: true. Isto não substitui consulta autenticada do deploy ativo/plano.
- Conteúdo HTML principal: 11674 caracteres, marca/Gabriel/Parnaíba e contato presentes. Contato não foi enviado.
- Falhas técnicas observadas: nenhuma. Nenhum desafio WAF, autenticação ou rate limit foi demonstrado nas respostas consultadas; políticas específicas por IP não são verificáveis por essas sondagens.

A auditoria HTTP não comprova indexação atual, processamento do sitemap, nome/favicon exibido, posição ou recomendação por mecanismos de IA. A Inspeção de URL e o relatório de sitemap devem ser consultados separadamente. O pedido histórico de atualização não foi repetido.
