# Auditoria pontual após publicação

Verificada em 10/10/2026, 16:22:11 (America/Sao_Paulo). Deploy: `6aca8f81eb306010fc78d117`. Evidências: [post-deploy-audit.json](post-deploy-audit.json), [dns-verification.json](dns-verification.json).

- Raiz HTTP 200; SHA-256 publicado: `d1a63d02f0e5f3ab2bba11ba580e13f5492295af6a350fc13eb264e8b3ec5ec3`.
- SHA-256 local/stage: `c41059b7bd9e4780d717f7d106855f79a2debd354d0793ae160e91c8f2be64ba`. Os bytes locais e stage são idênticos. Os bytes publicados são idênticos aos do [permalink imutável do deploy](https://6aca8f81eb306010fc78d117--rococo-liger-832df6.netlify.app/).
- Diferença exata: nove links das demos são processados na publicação, de `/marketing/portfolio/.../index.html` para a pasta equivalente `/.../`, com aspas simples nos atributos das âncoras. Após somente essas nove substituições, o HTML inteiro é idêntico; demais bytes, layout, conteúdo e metadados foram preservados. Destinos das nove demos previamente auditados com HTTP 200/noindex. Nenhuma fonte pública foi alterada para alinhar hashes.
- A transformação observada é consistente com [Pretty URLs, documentado pelo Netlify](https://docs.netlify.com/build/post-processing/overview/); isso é uma inferência da evidência HTTP e da documentação. A configuração UI de pós-processamento não foi inspecionada neste teste.
- Canonical: `https://norteautoral.site/`; robots: `index, follow, max-image-preview:large`; X-Robots-Tag: ausente.
- Título, descrição e og:site_name conferidos; marca e identificação de Gabriel preservadas.
- WebSite único: name Norte Autoral, alternateName NorteAutoral, url https://norteautoral.site/. Organization único Norte Autoral, Person Gabriel Holanda preservado.
- Robots HTTP 200 permite rastreamento. Sitemap HTTP 200 contém somente raiz, /privacy e /terms; as três têm status 200, canonical igual à URL e nenhuma instrução noindex.
- /v3 HTTP 200, noindex preservado e ausente do sitemap. As outras demos conservaram arquivos idênticos no pacote e foram verificadas na auditoria inicial.
- TXT de verificação Google: presente em Google Public DNS e Cloudflare DNS. A raiz 75.2.60.5 e CNAME www rococo-liger-832df6.netlify.app: preservados em ambos.
- Resultado: verificações técnicas pontuais passaram, com diferença de bytes publicada explicada acima.

HTTPS foi consultado com validação padrão de certificado; nenhum bypass foi aplicado. Estes resultados HTTP/DNS não comprovam indexação no Google; os estados de Inspeção de URL e solicitação devem ser registrados separadamente.
