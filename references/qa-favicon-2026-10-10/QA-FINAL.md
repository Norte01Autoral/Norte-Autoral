# QA — favicon da Norte Autoral para a Pesquisa Google

Registro em **10/10/2026**, fuso **America/Sao_Paulo**. Auditoria publicada às **22:23:52**. Site: **https://norteautoral.site/**. Deploy **`6acae4f0215a53089aa84c06`**, no projeto Netlify Free existente **rococo-liger-832df6**.

## Alteração e preservação

A inicial passou de três declarações de favicon para duas: PNG principal e ICO alternativo. As declarações SVG e PNG 32×32 foram removidas somente do head da inicial. Os arquivos SVG, PNGs e ICO permanecem preservados.

```html
<link rel="icon" type="image/png" sizes="256x256" href="/assets/norte-autoral/favicon.png">
<link rel="shortcut icon" type="image/x-icon" href="/assets/norte-autoral/favicon.ico">
```

O PNG já existia: **256×256, 38.359 bytes**, com o **N dourado original**. Seu bitmap não foi alterado nem redesenhado. O ICO continua com quadros de 16, 32, 48, 64, 128 e 256 pixels.

Somente as declarações da inicial mudaram nesta revisão. Layout, animações, foto, conteúdo, dados estruturados, todos os demais arquivos públicos, demos e adaptadores foram preservados. A pasta de publicação contém **231 arquivos**, incluindo `_headers` e `_redirects`; a pasta anterior, os ZIPs existentes e os quatro backups permanecem intactos. [Manifesto](release-preparation.json), [script de preparação](prepare-release.mjs).

## Verificação

- `npm run verify`: **367 arquivos, 18 HTML, 813 referências e 0 referências ausentes**, conforme resultado da execução.
- A auditoria publicada apresentou **todas as verificações verdadeiras e nenhum erro**.
- Inicial, PNG, ICO, robots e sitemap responderam **HTTP 200**. PNG com MIME `image/png`, dimensões quadradas 256×256 e bytes idênticos ao original. Ícones sem cabeçalho `noindex`; robots permite rastreamento.
- Canonical, permissão de indexação e nó WebSite permaneceram corretos. Fonte e pasta preparada são idênticas; HTML público e permalink do deploy são idênticos. A comparação com a fonte considera somente a normalização equivalente dos nove links de demos já documentada na revisão anterior.

Evidências: [auditoria publicada](published-audit.json) e [script de auditoria](audit-published.mjs).

## Google: resultado e limites

O PNG principal tem formato explicitamente compatível, supera o tamanho recomendado e usa um caminho estável. O [guia oficial de favicon](https://developers.google.com/search/docs/appearance/favicon-in-search?hl=pt-br), atualizado em 12/09/2026, recomenda ícone representativo da marca, quadrado, maior que 48×48 e acessível aos rastreadores. A implementação qualifica o favicon; não garante sua exibição, posição ou prazo de atualização.

**A exibição do N nos resultados do Google ainda não foi confirmada.** O usuário mostrou um globo na busca; sua causa não foi provada. Seleção da declaração SVG anterior ou cache/processamento são possibilidades, sem diagnóstico confirmado. Sondagens HTTP com User-Agent de rastreador comprovam acesso observado, não rastreamento real ou seleção pelo Google.

Nenhuma nova solicitação de indexação foi realizada: o usuário já confirmou uma solicitação anteriormente. Não repetir o pedido por causa desta revisão.

O sitemap permanece inalterado, com raiz, `/privacy` e `/terms`; demos continuam fora dele e com `noindex, follow`. O último registro do relatório Sitemaps, às **21:54**, ainda apresentava falha de busca, embora o teste publicado do XML tivesse passado. Esse relatório **não foi reconsultado nesta revisão**; sua pendência de processamento permanece documentada na [QA de Search Console](../qa-search-console-2026-10-10/QA-FINAL.md).
