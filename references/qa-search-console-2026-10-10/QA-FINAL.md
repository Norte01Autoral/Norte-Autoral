# QA — Google Search Console e identificação da Norte Autoral

Data: **10/10/2026**, fuso **America/Sao_Paulo**. Site: **https://norteautoral.site/**. Projeto Netlify Free: **rococo-liger-832df6**. Documento de manutenção: [SEARCH-CONSOLE.md](../../SEARCH-CONSOLE.md).

**A inicial está indexada conforme a Inspeção de URL do Índice do Google.** A propriedade foi verificada, o teste final da versão publicada passou, e o usuário confirmou **Indexação solicitada** nesta conversa. O processamento do sitemap no relatório permanece pendente, com falha de busca registrada.

## Resultados confirmados

| Verificação | Resultado | Evidência |
| --- | --- | --- |
| Propriedade Search Console | Domínio `norteautoral.site`, conta de marca Norte Autoral, verificada pelo provedor de domínio | [captura](property-verified.png), [texto](property-verified.txt) |
| TXT Hostinger | `@`, valor exato do Google, TTL 300; mantido após verificação | [captura](hostinger-txt.png) |
| Propagação DNS | TXT visível em Google Public DNS e Cloudflare; A/CNAME preservados | [DNS](dns-verification.json) |
| Publicação final | Deploy `6acadeababc97ae80a516934` no projeto existente, com os dois adaptadores | [preparação](release-preparation.json), [auditoria](post-deploy-audit.md) |
| Inicial pública | HTTP 200, HTTPS validado, canonical da raiz, sem noindex/X-Robots-Tag impeditivo | [auditoria inicial](public-audit.md), [pós-deploy](post-deploy-audit.json) |
| HTTP e www | Variantes convergem para `https://norteautoral.site/`, sem loop | [auditoria inicial](public-audit.json) |
| Robots e recursos | Robots HTTP 200 permite páginas/CSS/JS/imagens; 106 recursos responderam 200 na auditoria inicial | [auditoria inicial](public-audit.md) |
| Sitemap público | HTTP 200; somente raiz, `/privacy`, `/terms`; as três canônicas e sem noindex | [pós-deploy](post-deploy-audit.json) |
| Demos | Nove demos, `/v3` e `/site-do-jd` com noindex, rastreáveis e fora do sitemap | [auditoria inicial](public-audit.md), [revisão local](brand-review.md) |
| Identificação | WebSite único com name Norte Autoral, alternateName NorteAutoral, url da raiz; Organization/Person preservam identidade real | [pós-deploy](post-deploy-audit.json) |
| Schema Markup Validator | Grafo atualizado: **0 erros, 0 avisos** | [captura](schema-validator.png), [texto](schema-validator.txt) |
| Rich Results Test | **2 itens válidos**: 1 Empresas locais e 1 Organização; avisos opcionais de `postalCode` e `streetAddress` ausentes, identificados nas capturas fornecidas pelo usuário nesta conversa | [observação da interface e das capturas do usuário](rich-results-observation.json), [teste oficial](https://search.google.com/test/rich-results/result?id=SdVJoj9xwe0No27LrvfQFg) |
| Robustez WebGL | **17 verificações passaram, 0 falhas**; script real testado com mocks DOM/WebGL | [script](check-hero-webgl.mjs), [resultado](hero-webgl-fix.json) |
| Teste publicado final | Às **21:56:41**: URL disponível, possível indexar, HTTP 200, acesso/indexação permitidos, canonical correto | [captura](url-live-final.png), [texto](url-live-final.txt) |
| Recursos no teste final | **Todos os recursos foram carregados** | [texto](url-live-final-resources.txt) |
| Console no teste final | Erro texImage2D de tamanho ausente; permaneceu 1 aviso GPU/ReadPixels de desempenho | [texto](url-live-final-console.txt) |
| Índice do Google | **O URL está no Google — A página está indexada**; rastreamento **17:10:20**, Googlebot Smartphone, canonical próprio URL | [captura](url-index-confirmed.png), [texto](url-index-confirmed.txt) |
| Ações manuais | **Nenhum problema foi detectado** | [texto](manual-actions.txt) |

## Correções e preservação

`public/index.html` recebeu duas alterações no JSON-LD: `alternateName: NorteAutoral` no mesmo `WebSite`, e `@type: Organization` no nó `#negocio`, em lugar do tipo `ProfessionalService`, obsoleto no Schema.org. IDs, Gabriel Holanda, contatos, Parnaíba/PI e catálogo de serviços permaneceram. Título, descrição e `og:site_name` já estavam coerentes e foram preservados.

O script inline da hero também foi corrigido após o Google registrar `texImage2D: width or height out of range` no teste inicial. Canvas e máscara agora respeitam limites WebGL de textura/viewport, ajustam DPR quando necessário e ativam o fallback CSS existente em falhas de alocação ou contexto. Os testes preservaram dimensões e parâmetros numéricos das animações em condições normais. [Resultado das 17 verificações](hero-webgl-fix.json).

O manifesto de preparação confirmou uma única fonte pública modificada (`index.html`), apenas JSON-LD e robustez WebGL, restante do markup/texto preservado, CSS/arquivos JavaScript externos/imagens idênticos, nove demos preservadas, 229 arquivos públicos mais `_headers`/`_redirects`, e conservação dos ZIPs existentes e quatro backups. O corpo HTML completo não é idêntico, pois contém o script inline corrigido. Não foram enviados arquivos privados de sessão ou autenticação. [Manifesto](release-preparation.json).

A auditoria publicada observou nove transformações de links das demos de `/index.html` para sua pasta equivalente e mudança de aspas nas âncoras. Após essas substituições exatas, os demais bytes são idênticos. A inicial pública corresponde ao permalink imutável do deploy, mas seu SHA-256 bruto difere do local/stage. O comportamento é consistente com Pretty URLs do Netlify; essa explicação é inferência a partir de HTTP e documentação, sem inspeção da configuração da UI. [Registro completo](post-deploy-audit.md).

## Processamento e Inspeção de URL

| Etapa | Estado confirmado até este registro |
| --- | --- |
| Envio do sitemap | Enviado duas vezes em 10/10/2026: `https://norteautoral.site/sitemap.xml`; conferência do relatório às **21:54** ainda mostrou falha |
| Processamento inicial | **Não foi possível buscar/ler o sitemap** |
| Teste publicado do XML | Às **16:24:41**, Google buscou o sitemap com êxito, HTTP 200 |
| Processamento final no relatório | **Não foi possível buscar o sitemap**, tipo Desconhecido, 0 páginas, sem última leitura exibida; pendência de processamento |
| Inspeção inicial do índice | **O URL não está no Google — O Google não reconhece o URL** |
| Inspeção final do índice | **O URL está no Google — A página está indexada** |
| Indexação efetiva | **Confirmada pela inspeção do índice**; rastreamento **10/10/2026, 17:10:20**, Googlebot Smartphone, acesso/indexação permitidos e canonical próprio URL |
| Teste publicado final da inicial | Às **21:56:41**, **URL disponível e possível indexar**, HTTP 200, todos os recursos carregados |
| Renderização no Google | [Captura final](url-live-render-final.png) mostra marca/cabeçalho; não cobre toda página nem todos estados da animação. Erro de tamanho de textura eliminado; permanece aviso de desempenho GPU |
| Solicitação de indexação da revisão final | **Realizada pelo usuário**, confirmado nesta conversa em **10/10/2026**: “Sim, apareceu Indexação solicitada”. Hora exata não registrada; captura da confirmação do pedido não recebida. **Não repetir**. [Registro](index-request-user-confirmation.md) |
| Rich Results Test | 2 itens válidos; 2 avisos não críticos em `PostalAddress`: `postalCode` e `streetAddress` ausentes, ambos opcionais, confirmados nas capturas do usuário |
| Revisão e GitHub | Branch atual `portfolio-atualizado-hostinger-2026-10-10`, repositório `Norte01Autoral/Norte-Autoral`; consultar o histórico Git para o commit da revisão. Este relatório não prova push |

Evidências iniciais: [status do sitemap](sitemap-initial-status.png), [texto do sitemap](sitemap-initial-status.txt), [status do índice](url-index-initial.png), [texto do índice](url-index-initial.txt).

Evidências finais: [sitemap no relatório](sitemap-final-status.png), [texto do relatório](sitemap-final-status.txt), [acesso do Google ao XML](sitemap-live-access.png), [texto do teste do XML](sitemap-live-access.txt), [índice confirmado](url-index-confirmed.png), [texto do índice](url-index-confirmed.txt), [teste final](url-live-final.png), [texto do teste](url-live-final.txt), [renderização](url-live-render-final.png), [recursos](url-live-final-resources.txt), [console](url-live-final-console.txt).

## Limites e pendências

Acesso HTTP/HTTPS e instruções técnicas passaram na auditoria, e o teste ao vivo final do Google confirmou aptidão detectável da versão atual. A indexação efetiva foi comprovada separadamente no **Índice do Google**, com rastreamento às 17:10:20. Esse rastreamento precede o deploy final de robustez da hero; o teste atual das 21:56:41 não prova que o índice já absorveu a correção. O pedido da revisão final foi realizado pelo usuário e confirmado por sua resposta nesta conversa em 10/10/2026; não foram recebidos captura do pedido nem horário exato. Os três resultados permanecem separados.

O sitemap deve ser acompanhado até o relatório confirmar leitura sem erro, ou identificar uma causa que exija correção. O teste publicado do próprio XML passou; o relatório Sitemaps ainda falhou e não exibiu causa específica. Não foi feita alteração especulativa no XML/robots. Não declarar processamento bem-sucedido com base em HTTP 200. O pedido da revisão final já foi confirmado e não deve ser repetido; não há garantia de atualização do índice, prazo, posição ou apresentação do nome preferido.

O Rich Results Test foi executado pelo usuário às 16:31:37 e consultado na interface oficial; a marcação verificada foi preservada na revisão final. Depois, o usuário forneceu nesta conversa capturas do resumo, das categorias válidas e do detalhe de `PostalAddress`, identificando **`postalCode` não encontrado (opcional)** e **`streetAddress` não encontrado (opcional)**. Os dois itens continuam válidos; essas ausências não bloqueiam a indexação e não exigem inventar CEP ou logradouro. Preserve os dados reais de Parnaíba/PI/país e acrescente informações de endereço somente se forem verdadeiras e fornecidas pelo responsável. As capturas do usuário são evidência nesta conversa, com descrição em [rich-results-observation.json](rich-results-observation.json). A categoria Empresas locais detectada no teste não equivale a avaliação de atendimento presencial ou a Perfil da Empresa.

Os testes WebGL usam mocks e não substituem uma comparação visual completa. A captura final mostra a marca e o cabeçalho, e o teste informa todos os recursos carregados; ela não cobre o conteúdo completo nem cada estado animado. O aviso remanescente de GPU/ReadPixels é registrado como limitação de desempenho do teste, sem inferir a configuração de GPU do renderizador.

Ferramentas usadas nesta etapa são gratuitas: Search Console, Rich Results Test, Schema Markup Validator, consultas DNS públicas e auditorias locais HTTP/script. Não foi criado Perfil da Empresa; não houve avaliação de atendimento presencial.

## Acompanhamento da marca e fontes

Em **Desempenho → Resultados da Pesquisa → Consultas**, tipo Web, use regex `^(norteautoral|norte autoral|norte autoral parna[íi]ba)$`. Para variações, `norte\s*autoral`. Acompanhe impressões, cliques, CTR e posição média ao longo do tempo; consulte [instruções de manutenção](../../SEARCH-CONSOLE.md#acompanhar-buscas-pela-marca).

Fontes oficiais usadas para orientar a execução: [nomes de sites/WebSite](https://developers.google.com/search/docs/appearance/site-names?hl=pt-br), [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization?hl=pt-br), [noindex rastreável](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=pt-br), [verificação por DNS](https://support.google.com/webmasters/answer/9008080?hl=pt-BR), [Sitemaps](https://support.google.com/webmasters/answer/7451001?hl=pt-BR), [Inspeção de URL](https://support.google.com/webmasters/answer/9012289?hl=pt-BR), [solicitação de rastreamento](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=pt-br), [Desempenho](https://support.google.com/webmasters/answer/7576553?hl=pt-BR) e [filtros](https://support.google.com/webmasters/answer/17011165).
