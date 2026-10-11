# Auditoria pública de descoberta e indexação

Verificada em 10/10/2026, 16:15:12 (America/Sao_Paulo). Evidências detalhadas em [public-audit.json](public-audit.json).

- Página inicial: HTTP 200, canonical `https://norteautoral.site/`, robots `index, follow, max-image-preview:large`, sem X-Robots-Tag impeditivo.
- HTTPS validado sem desabilitar verificação de certificado. Emissor: Let's Encrypt; validade: Oct 10 17:50:00 2026 GMT até Jan  8 17:49:59 2027 GMT; SAN: DNS:norteautoral.site, DNS:www.norteautoral.site.
- HTTP e www: três variantes conferidas, destino final HTTPS sem www, sem loop.
- Robots: HTTP 200, `User-agent: * / Allow: /`; páginas, CSS, JS e imagens sem bloqueio.
- Sitemap: HTTP 200, 3 URLs (https://norteautoral.site/, https://norteautoral.site/privacy, https://norteautoral.site/terms). Todas retornam 200, com canonical igual à URL e sem noindex.
- Exclusões: nove demos, /v3 e /site-do-jd com noindex, acessíveis ao rastreador e fora do sitemap.
- Recursos: 106 URLs públicas conferidas por HEAD; 106 respondem 200. Lista da auditoria Netlify anterior reaproveitada para conferir os recursos atuais de páginas e demos.
- Conteúdo HTML da raiz: 11674 caracteres de texto, marca/Gabriel/Parnaíba presentes; H1: Sites. 01 ↳ ver os sites 1 feixe · 3 frentes Sistemas. 02 ↳ ver exemplos Norte/OS. 03 ↳ ver o sistema. Metadados e JSON-LD registrados no JSON.
- DNS público A/CNAME/NS/TXT consultado; valores de verificação Google são redigidos na evidência pública.
- Falhas observadas: nenhuma.

Este relatório confirma acesso HTTP e instruções técnicas observadas. Não comprova renderização pelo Google nem indexação. O User-Agent Googlebot foi usado apenas como sondagem HTTP; o teste oficial deve ocorrer na Inspeção de URL do Search Console.
