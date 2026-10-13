# Norte Autoral — visibilidade no Google e em buscas com IA

Decisões de manutenção em **13/10/2026**, fuso **America/Sao_Paulo**. Fonte ativa: `Portfólio/public/`. Domínio: **https://norteautoral.site/**. Esta revisão concentra a oferta em sites, tráfego pago e automação, preservando a identidade, o layout aprovado, as animações, a foto, o N dourado e os backups.

## Estado confirmado antes da atualização

O responsável pela execução conferiu o Search Console na conta da marca, propriedade Domínio `norteautoral.site`. O sitemap anterior estava **Processado**, com última leitura em **11/10/2026** e **3 URLs encontradas**. A pendência histórica de busca registrada em 10/10 foi, portanto, resolvida antes desta edição. [Captura](references/qa-discovery-2026-10-13/gsc-sitemap-before.png), [texto da interface](references/qa-discovery-2026-10-13/gsc-sitemap-before.txt).

A inicial estava **indexada**, com último rastreamento em **12/10/2026, 18:17:07**, Googlebot Smartphone, canonical selecionado igual à raiz e sitemap reconhecido. [Captura](references/qa-discovery-2026-10-13/gsc-home-index-current.png), [detalhes](references/qa-discovery-2026-10-13/gsc-home-index-current.txt). Esses registros não comprovam a indexação das duas páginas novas nem a incorporação desta revisão pelo índice.

## Conteúdo e identificação dos serviços

Foram preparadas duas páginas com conteúdo próprio da oferta, além de metadados:

- `/trafego-pago/`: planejamento, gestão e acompanhamento de Meta Ads e Google Ads, processo e conexão com as páginas do negócio.
- `/automacao/`: automação com IA, integrações e organização de tarefas, com capacidades e limites descritos sem prometer um backend ou resultado inexistente.

Título, descrição e metadados sociais da inicial nomeiam tráfego pago e automação naturalmente. Os `Service` existentes são atualizados com URLs e IDs próprios; `provider` aponta para `https://norteautoral.site/#negocio`. O mesmo `Organization`, Gabriel e o `WebSite` com `alternateName: NorteAutoral` continuam identificando a marca. Não duplicar entidades nem inventar avaliações, certificações, endereço ou métricas.

Links internos reais conectam a inicial às páginas de serviço. O sitemap atualizado contém **5 URLs canônicas**: raiz, as duas páginas novas, `/privacy` e `/terms`. `lastmod` acompanha mudanças reais; privacidade e termos conservam sua data anterior. As nove demos, `/v3` e o estudo continuam fora do sitemap e com `noindex, follow`, permitindo que os rastreadores leiam a instrução. As referências visuais permanecem identificadas como referências, não como clientes próprios.

Formulários e CTAs encaminham o visitante ao contato para revisar e enviar sua mensagem. A revisão não implementa envio automático, publicação em contas de anúncios ou gravação de leads em banco de dados.

## Acesso, indexação e recomendação são estados diferentes

**Acesso** significa resposta pública adequada e ausência de bloqueio observado. **Indexação** precisa de confirmação no índice do buscador; teste ao vivo e protocolo recebido não bastam. **Recomendação/citação por IA** depende da seleção de cada sistema e da pergunta do usuário. Nenhuma das etapas garante posição, prazo, volume de clientes ou recomendação.

Para Google AI Overviews e Modo IA, a página precisa estar indexada e qualificada para snippets. Manter texto importante acessível, links rastreáveis e schema coerente com o conteúdo visível. Não acrescentar `nosnippet` às páginas de serviço. Não existe schema especial exigido para IA. [Orientações oficiais do Google](https://developers.google.com/search/docs/appearance/ai-features?hl=pt-br).

O controle atual do Search Console também foi conferido: **Configurações → IA generativa na Pesquisa → Incluir os links e o conteúdo do meu site**, opção padrão selecionada. Não foi necessário alterar a preferência. O robots, sozinho, não comprova esse controle; a evidência é a opção selecionada na propriedade. [Captura](references/qa-discovery-2026-10-13/gsc-ai-inclusion.png), [controle oficial](https://support.google.com/webmasters/answer/16908024?hl=pt-br).

`llms.txt` não é usado pela Pesquisa Google para melhorar visibilidade ou classificação. Não será criado como promessa de cadastro automático em IAs; priorizar conteúdo verdadeiro e SEO verificável. [Guia oficial de otimização para IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide?hl=pt-br).

## Rastreamento de outros sistemas

O robots mantém `User-agent: *` e `Allow: /`, já permitindo Googlebot, Bingbot, `OAI-SearchBot` e `PerplexityBot`. Grupos explícitos redundantes não comprovam descoberta. Se ocorrer bloqueio real na infraestrutura, investigar logs e os IPs oficiais; sondagem com nome de bot não demonstra uma visita autêntica.

`OAI-SearchBot` trata de resultados do ChatGPT Search. `GPTBot` trata de treinamento, com configuração independente: permitir treinamento não é requisito para aparecer na busca. Esta revisão não cria nova decisão de liberação de treinamento. [Official OpenAI documentation](https://developers.openai.com/api/docs/bots).

`PerplexityBot` serve à apresentação de sites nos resultados, sem finalidade de treinamento de modelos fundamentais; seus acessos também devem poder chegar ao site. [Documentação oficial](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).

## Publicação e notificações

| Registro da execução | Resultado |
| --- | --- |
| Deploy da revisão no Netlify Free existente | `6acdb6bf27a8351adc3ec980`, 235 arquivos incluindo os adaptadores; produção e permalink conferidos |
| Sitemap atualizado | Enviado uma vez em 13/10, recebimento confirmado. Conferência final ainda mostra Processado com leitura de 11/10 e 3 URLs; leitura das 5 atuais pendente |
| Inspeções das páginas novas | Ambas não indexadas na consulta ao índice; testes publicados aptos, HTTP 200, todos os recursos carregados e BreadcrumbList válido |
| Pedido de automação | Acionado uma vez, confirmação oficial **Indexação solicitada** salva; processamento pelo índice pendente |
| Pedido de tráfego pago | Acionado uma vez, progresso observado; confirmação final não recuperada após interrupção do navegador. Não repetir o pedido para tentar obter prova |
| IndexNow | HTTP 202 para raiz e as duas páginas de serviço; recebimento confirmado e validação da chave pendente, sem comprovação de índice ou citação |

O Schema Markup Validator avaliou as três URLs publicadas com **0 erros e 0 avisos**. O WebSite da inicial continua único, com a marca e alternateName preservados. Os testes publicados do Google reconheceram **1 BreadcrumbList válido em cada página nova**. [QA e evidências](references/qa-discovery-2026-10-13/QA-FINAL.md).

IndexNow é a ferramenta adicional gratuita usada para avisar buscadores participantes sobre alterações: arquivo TXT público de comprovação no próprio domínio e POST das URLs alteradas, **raiz e duas páginas de serviço**, sem plugin ou serviço pago. A integração não depende de nova concessão OAuth ao Bing. HTTP 200 significa recebimento; HTTP 202 pode indicar validação da chave pendente. Isso não comprova indexação. [Protocolo oficial](https://www.indexnow.org/documentation), [limites e acompanhamento](https://www.indexnow.org/faq).

O sitemap de cinco URLs foi enviado no relatório correspondente; a leitura da versão nova deve ser conferida separadamente. Para Bing/Copilot, sitemap e notificações apoiam descoberta e atualização, sem assegurar citações. [Orientação oficial do Bing](https://blogs.bing.com/webmaster/2025/7/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search/).

## Acompanhamento e próxima ação

Conferir processamento do sitemap atualizado e indexação individual das páginas novas; registrar solicitação, recebimento e índice separadamente. A inicial já teve pedido confirmado anteriormente: não repetir apenas por favicon. A exibição atual do favicon não foi auditada independentemente nesta revisão. Preservar o PNG 256 e sua URL estável.

Para buscas pela marca, usar **Desempenho → Resultados da Pesquisa → Web → Consultas**, com o filtro de consulta para `norteautoral`, `Norte Autoral` e `Norte Autoral Parnaíba`; consultas raras podem ser omitidas. Acompanhar também as duas URLs no filtro Páginas. Para participação nos recursos de IA do Google, há um [relatório separado de Performance da IA generativa (Pesquisa)](https://support.google.com/webmasters/answer/16984139?hl=pt-BR), com impressões por página, país, data e dispositivo, sem dimensão de consultas. Pode não aparecer até haver dados suficientes. Nenhum desses relatórios mede recomendações de todas as plataformas de IA.

Não foi avaliado Perfil da Empresa; qualquer avaliação requer confirmar primeiro atendimento presencial. Próxima ação concreta: acompanhar as páginas novas e reunir casos próprios autorizados, método e referências externas verdadeiras para fortalecer a oferta. Manter a revisão na branch atual, preservar histórico Git e atualizar a memória com resultados efetivamente confirmados.
