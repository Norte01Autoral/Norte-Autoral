# Norte Autoral — descoberta e indexação no Google

Registro de configuração em **10/10/2026**, fuso **America/Sao_Paulo**. Site principal: **https://norteautoral.site/**. Hospedagem: Netlify Free, projeto **rococo-liger-832df6**. DNS: Hostinger.

**A inicial está indexada conforme a Inspeção de URL do Índice do Google.** A propriedade está verificada, a versão publicada passou no teste ao vivo, e o usuário confirmou a mensagem **Indexação solicitada** nesta conversa. O relatório de Sitemaps ainda apresenta falha de busca apesar de o teste ao vivo do Google conseguir acessar o XML.

## Favicon — revisão posterior

Revisão posterior de favicon em 10/10/2026: o usuário forneceu captura em que o site aparece na busca com um globo. A inicial agora declara o N dourado original em PNG256 como favicon principal, mantendo o ICO. Deploy atual `6acae4f0215a53089aa84c06`; [QA favicon](references/qa-favicon-2026-10-10/QA-FINAL.md). A mudança ficou restrita às declarações do ícone; os testes Google e o estado do índice abaixo são registros da execução anterior. O pedido de indexação já confirmado não foi repetido. A exibição do favicon não foi confirmada, e o relatório de sitemap não foi consultado novamente nesta revisão.

## Propriedade e verificação

Propriedade do tipo **Domínio: `norteautoral.site`**, identificador `sc-domain:norteautoral.site`, na conta de marca **Norte Autoral (`contatonorteautoral@gmail.com`)**.

A verificação foi concluída no Google Search Console pelo método **Provedor do nome de domínio**. O TXT exato recebido do Google foi adicionado na Hostinger ao domínio raiz. A presença do TXT e a preservação de A/CNAME foram confirmadas por Google Public DNS e Cloudflare DNS.

| Tipo | Nome | Valor | TTL configurado |
| --- | --- | --- | --- |
| TXT | `@` | `google-site-verification=pTRVHEnDi7tYQgmfY3JWNIdlwodp3AJbs3ii3t6J0cg` | `300` |
| A | `@` | `75.2.60.5` | `300` |
| CNAME | `www` | `rococo-liger-832df6.netlify.app` | `300` |

**Mantenha o TXT depois da verificação.** O Search Console usa o registro para conservar a comprovação de propriedade. Não substituir nem excluir A/CNAME ao alterar registros TXT. [Instruções oficiais de verificação](https://support.google.com/webmasters/answer/9008080?hl=pt-BR).

Evidências: [propriedade verificada](references/qa-search-console-2026-10-10/property-verified.png), [TXT na Hostinger](references/qa-search-console-2026-10-10/hostinger-txt.png) e [consultas DNS](references/qa-search-console-2026-10-10/dns-verification.json).

## Site publicado e identificação da marca

O deploy da configuração Search Console **`6acadeababc97ae80a516934`** atualizou o projeto Netlify existente; a revisão de favicon acima preservou seus ajustes. A inicial mantém título, descrição, conteúdo e `og:site_name` da Norte Autoral. No mesmo nó `WebSite`:

```json
{
  "@type": "WebSite",
  "@id": "https://norteautoral.site/#website",
  "url": "https://norteautoral.site/",
  "name": "Norte Autoral",
  "alternateName": "NorteAutoral"
}
```

O grafo completo mantém `inLanguage`, `publisher`, Gabriel Holanda, contatos, Parnaíba/PI e catálogo de serviços. O nó `#negocio` agora usa `Organization`, substituindo o tipo genérico obsoleto `ProfessionalService`, sem inventar informações de atendimento presencial. [Definição do tipo anterior](https://schema.org/ProfessionalService), [guia Google para Organization](https://developers.google.com/search/docs/appearance/structured-data/organization?hl=pt-br).

O Schema Markup Validator recebeu o grafo atualizado e apresentou **0 erros e 0 avisos**. [Evidência](references/qa-search-console-2026-10-10/schema-validator.png). Esse é o teste recomendado para WebSite, pois nomes de site não são cobertos pelo Rich Results Test. O nome escolhido pelo Google é automático e pode diferir da preferência informada. [Guia oficial de nomes de sites](https://developers.google.com/search/docs/appearance/site-names?hl=pt-br).

O [Teste de pesquisa aprimorada do Google](https://search.google.com/test/rich-results/result?id=SdVJoj9xwe0No27LrvfQFg), executado pelo usuário e consultado na interface oficial, detectou **2 itens válidos**: 1 em Empresas locais e 1 em Organização. As capturas fornecidas pelo usuário nesta conversa confirmaram os dois avisos não críticos de `PostalAddress`: **`postalCode` não encontrado (opcional)** e **`streetAddress` não encontrado (opcional)**. São ausências opcionais de CEP e logradouro; não invalidaram os itens nem bloquearam a indexação. Localidade Parnaíba, região PI e país permanecem preservados. Não acrescentar endereço ou CEP sem informação verdadeira fornecida pelo responsável. O resultado corresponde aos dados estruturados preservados no deploy final; não é prova de exibição efetiva nem avaliação de elegibilidade para Perfil da Empresa. [Registro da evidência da interface e das capturas do usuário](references/qa-search-console-2026-10-10/rich-results-observation.json).

## Robustez da apresentação na renderização

No teste publicado inicial, o Google registrou erro de tamanho de textura WebGL na hero (`texImage2D: width or height out of range`). O script da inicial foi corrigido para respeitar limites de textura/viewport e limitar o DPR efetivo quando necessário. Em falha de alocação ou perda de contexto, ele ativa o fallback CSS existente. Os estilos, conteúdo aprovado, foto, recursos externos e animações em condições normais foram preservados.

As **17 verificações passaram**, incluindo dimensões normais, viewports extremos, limites de GPU e falhas de contexto/alocação. São testes do script real com mocks DOM/WebGL, não uma prova visual de GPU. [Script](references/qa-search-console-2026-10-10/check-hero-webgl.mjs), [resultado](references/qa-search-console-2026-10-10/hero-webgl-fix.json).

No teste final do Google, às **21:56:41**, a inicial retornou HTTP 200, todos os recursos foram carregados e o erro de tamanho de textura deixou de aparecer. Restou um aviso de desempenho GPU/ReadPixels. A [captura final](references/qa-search-console-2026-10-10/url-live-render-final.png) mostra a marca e o cabeçalho; não cobre todo o conteúdo da página nem todos os estados da animação. [Recursos](references/qa-search-console-2026-10-10/url-live-final-resources.txt), [console](references/qa-search-console-2026-10-10/url-live-final-console.txt).

## Rastreamento e exclusões

A auditoria pública confirmou raiz HTTP 200, HTTPS com validação padrão de certificado, HTTP/www convergindo para HTTPS sem www, canonical `https://norteautoral.site/`, metatag permitindo indexação e ausência de X-Robots-Tag impeditivo. `robots.txt` permite acesso às páginas e aos recursos CSS, JavaScript e imagens.

As nove demonstrações, `/v3` e `/site-do-jd` mantêm `noindex, follow`, são acessíveis ao rastreador e não entram no sitemap. Não criar `Disallow` para essas páginas: o Google precisa acessá-las para ler `noindex`. [Orientação oficial sobre noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=pt-br).

O sitemap público é **https://norteautoral.site/sitemap.xml**, retorna HTTP 200 e contém apenas:

- `https://norteautoral.site/`
- `https://norteautoral.site/privacy`
- `https://norteautoral.site/terms`

As três URLs retornaram 200, têm canonical correspondente e não têm `noindex`. Evidências técnicas em [auditoria pública](references/qa-search-console-2026-10-10/public-audit.md) e [auditoria após o deploy](references/qa-search-console-2026-10-10/post-deploy-audit.md).

Os bytes publicados da inicial diferem do arquivo local somente em nove links das demos: `/index.html` foi convertido para sua pasta equivalente, com mudança de aspas nos atributos. O HTML publicado e o permalink imutável do deploy são idênticos. A transformação é consistente com o pós-processamento Pretty URLs do Netlify; essa atribuição é inferência documentada na auditoria HTTP, sem conferência da configuração de UI. Layout, conteúdo, estilos e recursos foram preservados.

## Resultado do Search Console nesta execução

| Etapa | Resultado registrado |
| --- | --- |
| Propriedade Domínio | `norteautoral.site`, verificada por DNS |
| Sitemap enviado | `https://norteautoral.site/sitemap.xml`, enviado duas vezes em 10/10/2026; a conferência do relatório às 21:54 ainda mostrou falha |
| Processamento inicial do sitemap | **Não foi possível buscar/ler o sitemap** |
| Teste ao vivo do sitemap | Google buscou o XML com êxito, HTTP 200, às **16:24:41** |
| Resultado final do relatório Sitemaps | **Não foi possível buscar o sitemap**, tipo Desconhecido, 0 páginas; processamento ainda pendente |
| Inspeção inicial do índice | **O URL não está no Google — O Google não reconhece o URL** |
| Inspeção final do índice | **O URL está no Google — A página está indexada** |
| Rastreamento registrado no índice | **10/10/2026, 17:10:20**, Googlebot Smartphone; busca com êxito, rastreamento/indexação permitidos |
| Canonical no índice | Declarado `https://norteautoral.site/`; Google selecionou o próprio URL inspecionado |
| Teste final da URL publicada | **O URL está disponível para o Google — É possível indexar a página**, às **21:56:41**; HTTP 200, acesso/indexação permitidos, todos os recursos carregados |
| Solicitação de indexação da revisão final | **Realizada pelo usuário**, que confirmou nesta conversa em **10/10/2026**: “Sim, apareceu Indexação solicitada”. Hora exata não registrada; captura da confirmação do pedido não recebida. **Não repetir** |
| Indexação efetiva | **Confirmada para a inicial pela inspeção do índice**, separadamente do teste ao vivo |
| Ações manuais | **Nenhum problema foi detectado** |

Evidências iniciais: [sitemap](references/qa-search-console-2026-10-10/sitemap-initial-status.png) e [Inspeção de URL](references/qa-search-console-2026-10-10/url-index-initial.png). Evidências finais: [sitemap no relatório](references/qa-search-console-2026-10-10/sitemap-final-status.png), [acesso ao XML pelo Google](references/qa-search-console-2026-10-10/sitemap-live-access.txt), [índice confirmado](references/qa-search-console-2026-10-10/url-index-confirmed.png), [detalhes do índice](references/qa-search-console-2026-10-10/url-index-confirmed.txt), [teste publicado](references/qa-search-console-2026-10-10/url-live-final.png) e [ações manuais](references/qa-search-console-2026-10-10/manual-actions.txt).

O rastreamento mostrado no índice ocorreu às 17:10:20, antes da correção final da hero. O teste ao vivo das 21:56:41 confere a versão publicada atual; ele não comprova que o índice já incorporou essa correção. A presença no índice também não comprova apresentação do nome preferido ou posição para as buscas pela marca.

A solicitação da revisão final foi concluída pelo usuário e confirmada em resposta nesta conversa; a confirmação textual é a evidência do pedido, separada das capturas do teste ao vivo e do índice. Não foi recebida uma captura da mensagem do pedido, nem registrado seu horário exato. Não é necessário repetir essa solicitação. [Registro do relato](references/qa-search-console-2026-10-10/index-request-user-confirmation.md).

Um HTTP 200 público não equivale a processamento do sitemap pelo Google. No relatório Sitemaps, **Processado** significa que o arquivo foi buscado e lido sem erros; o número de páginas encontradas não comprova que essas páginas estão indexadas. Abra a linha do sitemap para conferir status, última leitura e erros. [Relatório oficial de Sitemaps](https://support.google.com/webmasters/answer/7451001?hl=pt-BR).

A falha final do relatório não veio acompanhada de causa específica nesta execução. O XML público e o teste ao vivo passaram, portanto não foi feita alteração especulativa no sitemap/robots. Acompanhe a próxima leitura do relatório; se a falha persistir ou surgir causa detalhada, investigue essa evidência antes de reenviar. O Google não garante que toda URL informada será rastreada ou indexada.

## Como interpretar e acompanhar a indexação

1. **Acesso e aptidão técnica:** a auditoria pública confere resposta, HTTPS, canonical e instruções. O teste publicado da Inspeção de URL confere como o Google busca e renderiza a versão atual. Resultado positivo do teste não comprova indexação.
2. **Solicitação enviada:** nesta execução, o usuário confirmou explicitamente **Indexação solicitada**. Isso comprova o pedido informado pelo usuário, sem garantir atualização do índice ou exibição. Repetir o mesmo pedido não acelera o processo.
3. **Indexação efetiva:** consultar a versão **Índice do Google** na Inspeção de URL. A mensagem **O URL está no Google** confirma o estado do índice naquele momento; ainda não garante exibição para uma consulta específica.

Não confundir os painéis **Teste em tempo real** e **Índice do Google**. O Google pode levar tempo para atualizar os relatórios e decidir sobre inclusão; esta configuração não promete prazo nem posição. [Inspeção de URL](https://support.google.com/webmasters/answer/9012289?hl=pt-BR), [solicitar novo rastreamento](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=pt-br).

## Acompanhar buscas pela marca

Na propriedade `norteautoral.site`, abra **Desempenho → Resultados da Pesquisa**, selecione pesquisa Web e um período disponível. Em **Consultas**, acompanhe impressões, cliques, CTR e posição média.

Adicione filtro **Consulta → Personalizado (regex) → Corresponde à regex**:

```text
^(norteautoral|norte autoral|norte autoral parna[íi]ba)$
```

O filtro reúne as consultas exatas solicitadas e aceita Parnaíba com ou sem acento. Para explorar outras buscas relacionadas à marca, use `norte\s*autoral`. Os filtros regex ignoram maiúsculas/minúsculas por padrão; consultas anonimizadas ou muito raras podem não aparecer na tabela. Compare períodos quando houver dados suficientes. [Métricas e Consultas](https://support.google.com/webmasters/answer/7576553?hl=pt-BR), [filtros oficiais](https://support.google.com/webmasters/answer/17011165).

## Manutenção e preservação

As correções de identificação e robustez da hero estão em `public/index.html`. Uma atualização do Netlify continua manual: a branch GitHub **`portfolio-atualizado-hostinger-2026-10-10`** de **`Norte01Autoral/Norte-Autoral`** não está vinculada a deploy automático. Incluir `_headers` e `_redirects` de `hosting/netlify/` na raiz de cada pasta de publicação, conforme [NETLIFY.md](NETLIFY.md). Consulte o histórico Git da branch para identificar o commit desta revisão; este documento não constitui comprovação de push.

As mudanças de fonte nesta execução se restringem ao JSON-LD e ao script inline de robustez WebGL da inicial. A preparação conferiu preservação do restante do markup/texto, de todo CSS e dos arquivos JavaScript externos, imagens e nove demos. Os ZIPs existentes e os quatro backups permaneceram intactos. [Manifesto de preparação](references/qa-search-console-2026-10-10/release-preparation.json).

Não foi avaliado nem criado Perfil da Empresa. Qualquer avaliação futura exige confirmar primeiro se há atendimento presencial a clientes no estabelecimento ou no local deles; a indexação do site é independente dessa etapa.
