# Publicação Netlify — 10 de outubro de 2026

O site foi publicado na conta **norte01autoral**, plano **Free**, projeto **rococo-liger-832df6**, domínio **https://norteautoral.site/**. Deploy final: `6aca88a67bc795130b2a0c63`.

Os registros de domínio foram configurados na Hostinger e conferidos por DNS público. O certificado Let's Encrypt inclui **norteautoral.site** e **www.norteautoral.site**, validade atual até **08/01/2027**, com renovação automática gerenciada pelo Netlify. HTTPS é obrigatório.

## Auditoria pública

Evidência HTTP sem autenticação: [public-http-audit.json](public-http-audit.json).

- Página principal e quatro páginas auxiliares responderam conforme esperado.
- Nove demonstrações e 106 recursos públicos disponíveis.
- Os 14 aliases de arquivos/páginas retornaram redirecionamento 301 correto.
- HTTP e www convergem para HTTPS sem www; nenhum loop.
- TLS válido com validação normal do cliente HTTP.
- URL inexistente retornou a página personalizada com status 404.
- HTML usa revalidação; recursos editáveis, sete dias; CSS/JS com hash, um ano e immutable.
- HTML servido com compressão Brotli; canonical, robots e sitemap mantêm norteautoral.site.
- Zero falhas de recursos e zero erros HTTP inesperados.

Esta verificação foi feita por HTTP público, sem navegador e sem credenciais. A QA visual e responsiva em 11 tamanhos e as interações locais estão documentadas em [../qa-release-2026-10-10/QA-FINAL.md](../qa-release-2026-10-10/QA-FINAL.md); não representam teste em todos os aparelhos físicos.

## Integridade da publicação

O pacote Netlify foi preparado separadamente do projeto editável: 229 arquivos do ZIP Hostinger conferidos por SHA-256, mais `_headers` e `_redirects`. As cópias de manutenção estão em `hosting/netlify/`. Os ZIPs anteriores, os arquivos de `public/` e os quatro backups foram preservados.

Não foram incluídos credenciais, reivindicação, `.netlify`, respostas privadas de autenticação nem logs no projeto ou no pacote público. O GitHub permanece na branch de armazenamento, sem alteração de main ou publicação automática Vercel. Atualizações Netlify são manuais; veja [NETLIFY.md](../../NETLIFY.md).
