# Auditoria pública após publicação — 13/10/2026

Verificada em 13/10/2026, 01:43:11 (America/Sao_Paulo). Deploy informado: `6acdb6bf27a8351adc3ec980`. [Evidência JSON](post-deploy-audit.json).

- Raiz, /trafego-pago/, /automacao/, /privacy e /terms: acesso direto HTTP 200, canonical próprio, indexação e snippets permitidos: true.
- Raiz e duas páginas de serviço: H1, HTML compreensível, WhatsApp/e-mail e links internos verificados. Service, provider Organization e BreadcrumbList das novas páginas resolvem IDs e campos esperados: true. São verificações locais do markup, não resultados dos validadores oficiais.
- Sitemap HTTP 200, exatamente cinco URLs canônicas indexáveis; nove demos, /v3 e /site-do-jd continuam 200/noindex e fora dele: true. Robots Allow:/ preservado.
- Doze sondagens: Googlebot, OAI-SearchBot, bingbot e PerplexityBot nas três páginas principais, todas 200 e sem instruções de bloqueio: true. Não comprovam identidade/IP de bots reais.
- 29 recursos CSS, fontes, JavaScript, logo, foto, OG e favicons: 200 e SHA iguais às fontes locais: true. PNG256 original preservado: true.
- Rotas de serviço com revalidação, CSS servicos com sete dias de cache, /index.html das duas novas páginas redirecionam 301 para diretório canônico: true. HTTPS e redirecionamentos HTTP/www: true.
- Fonte/stage, metadados, head, texto HTML e permalinks foram comparados por página. HTML público coincide com os permalinks do deploy: true; metadados/texto preservados: true. As diferenças de bytes, quando existem, estão enumeradas no JSON; não são omitidas por uma promessa de igualdade bruta.
- Arquivo público de prova IndexNow: 200, corpo exato da fonte, text/plain, X-Robots-Tag noindex, permitido no robots e fora do sitemap: true. Nenhuma submissão IndexNow/sitemap foi realizada pelo script; corpo da chave não foi impresso.
- Falhas observadas: nenhuma.

Esta auditoria não comprova indexação, processamento de sitemap, posição, recomendação por IA ou exibição de favicon. Testes oficiais, índice e solicitações precisam ser registrados separadamente. A auditoria anterior a esta publicação foi preservada em [public-audit.json](public-audit.json).
