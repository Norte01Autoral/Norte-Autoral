# Revisão da identificação da marca e fontes oficiais — 10/10/2026

Escopo desta revisão: leitura da base local `clone v1`, das instruções `AGENTS.md`, `PROJECT-STATE.md` e `NETLIFY.md` e de fontes oficiais. Não altera arquivos públicos, não verifica acesso a contas e não comprova indexação. Resultados de produção e de Search Console devem ser registrados pelo responsável pela execução.

## Identificação existente

- `public/index.html:7`: título `Norte Autoral | Sites, Meta Ads e Google Ads em Parnaíba`.
- `public/index.html:8`: descrição identifica Gabriel Holanda, Norte Autoral, Parnaíba/PI e serviços aprovados; não precisa mudar para esta tarefa.
- `public/index.html:21`: `og:site_name` é `Norte Autoral`.
- `public/index.html:10-11`: `index, follow, max-image-preview:large` e canonical `https://norteautoral.site/`.
- Um único script JSON-LD, com grafo parseável: `WebSite`, `Person` e `ProfessionalService`.
- `WebSite` tem `@id` `https://norteautoral.site/#website`, `name` `Norte Autoral`, `url` `https://norteautoral.site/`, `publisher` apontando a `#negocio`. `alternateName` ainda não existe na revisão lida.
- Texto principal da marca, Gabriel e cidade está no HTML: navegação, apresentação, seção Quem e rodapé. A renderização ao vivo requer conferência separada.

Correção mínima sugerida: adicionar `"alternateName": "NorteAutoral"` somente ao nó `WebSite` existente. A variação junta é compatível com o domínio e a busca indicada pelo usuário; trata-se de avaliação editorial, sem assegurar adoção pelo Google. Não acrescentar cidade ou lista de palavras-chave a `name`/`alternateName`.

O Google recomenda marca consistente no HTML, atualizar o mesmo nó `WebSite`, e `url` da inicial canônica. A seleção do nome é automática. WebSite deve ser validado no Schema Markup Validator; o Rich Results Test não suporta nomes de site. [Google Search Central: nomes de sites](https://developers.google.com/search/docs/appearance/site-names?hl=pt-br).

## Empresa, pessoa e testes

Os dados lidos conservam Gabriel, contatos, Parnaíba/PI, Instagram, catálogo de serviços e IDs coerentes. Não inventar endereço de rua, CEP, horários, preço, avaliações ou credenciais.

O tipo genérico `ProfessionalService` está obsoleto no próprio vocabulário Schema.org, por confusão com `Service`. [Definição oficial](https://schema.org/ProfessionalService).

Se for corrigido esse ponto, a mudança mínima é `@type: Organization` no nó `#negocio`, mantendo seu ID e seus dados. Essa recomendação descreve a marca/empresa sem presumir estabelecimento com atendimento presencial. O Google aceita `Organization` para identificação administrativa, logo e contatos; as propriedades devem refletir fatos, e seu guia recomenda Rich Results Test e Inspeção de URL. [Google Search Central: Organization](https://developers.google.com/search/docs/appearance/structured-data/organization?hl=pt-br).

Caso se preserve LocalBusiness/ProfessionalService, o teste adequado do Google é o Rich Results Test com avaliação de LocalBusiness. Campos incompletos do endereço podem limitar o recurso de empresa local; isso não prova bloqueio de indexação. Não completar o endereço por inferência. [Google Search Central: LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business?hl=pt-br).

O grafo inteiro pode ser validado no Schema Markup Validator, incluindo Person, Service e OfferCatalog. Não há justificativa para inserir tipos extras apenas para provocar resultados no teste.

## Rastreamento e sitemap local

- `public/robots.txt`: `User-agent: *`, `Allow: /`, sitemap absoluto correto. Sem bloqueios das demos, CSS, JS ou imagens.
- As nove demos ativas foram lidas recursivamente; 9/9 têm `<meta name="robots" content="noindex, follow">`.
- `/v3` e `/site-do-jd` também têm `noindex, follow`.
- Sitemap contém exatamente raiz, `/privacy` e `/terms`; demos ausentes.
- `_redirects` mantém rotas reais, variantes HTTP/www convergindo ao domínio HTTPS sem www e nenhum fallback SPA.
- `_headers` não contém X-Robots-Tag na revisão lida.

A configuração atual de demos é consistente: Google precisa poder rastrear a página para ler `noindex`; bloquear as mesmas páginas em robots.txt seria contraditório. [Google Search Central: noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=pt-br).

O sitemap deve manter apenas as URLs canônicas destinadas à busca. [Google Search Central: criar/enviar sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=pt-br).

## Fluxo de Search Console e distinções do relatório final

Propriedade Domínio exige verificação DNS. Usar o TXT exclusivo fornecido à conta Google atual, com Host/Nome vazio ou `@` conforme provedor, e valor exato. Depois de verificar, manter o registro. Um TXT encontrado em DNS não substitui o resultado de verificação na interface. [Search Console: verificar propriedade](https://support.google.com/webmasters/answer/9008080?hl=pt-BR).

Enviar URL completa `https://norteautoral.site/sitemap.xml` no relatório Sitemaps. `Processado` significa leitura sem erro; páginas encontradas não comprova rastreamento/indexação de cada página. [Search Console: relatório de sitemaps](https://support.google.com/webmasters/answer/7451001?hl=pt-BR).

Registrar separadamente:

1. HTTP/HTTPS e auditoria técnica: acessível, canonical e regras aptas.
2. Teste publicado: Google conseguiu buscar/renderizar e não detectou bloqueio. Esse resultado não comprova presença no índice.
3. Solicitação: confirmação explícita de envio à fila, se realizada.
4. Índice Google: status da inspeção inicial. Somente essa evidência pode permitir afirmar que o URL está indexado; exibição para uma busca específica ainda varia.

[Search Console: Inspeção de URL](https://support.google.com/webmasters/answer/9012289?hl=pt-BR). Solicitação não garante inclusão e repeti-la não acelera o rastreamento. [Google Search Central: solicitar rastreamento](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=pt-br).

## Acompanhamento das buscas pela marca

Em Desempenho/Resultados da Pesquisa, selecione tipo Web e acompanhe Consultas, impressões, cliques, CTR e posição média. [Search Console: visão geral](https://support.google.com/webmasters/answer/7576553?hl=pt-BR).

Sugestão de filtro Consulta → Personalizado (regex), para as buscas exatas citadas: `^(norteautoral|norte autoral|norte autoral parna[íi]ba)$`. Para descoberta de variações, filtro mais amplo `norte\s*autoral`. Expressões são sugestões desta revisão; o filtro oficial usa RE2, correspondência parcial por padrão e ignora maiúsculas/minúsculas. Consultas anonimizadas podem não aparecer na tabela. [Search Console: filtros avançados](https://support.google.com/webmasters/answer/17011165).

Nenhuma avaliação de elegibilidade de Perfil da Empresa foi realizada. Ela requer confirmação do usuário sobre atendimento presencial e é independente da indexação do site.
