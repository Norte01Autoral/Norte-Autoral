# Resultados de verificação

Verificação em 9 de outubro de 2026, comparando https://www.sabec.dev/ com a cópia local. O frontend foi preservado a partir dos arquivos publicados; não houve redesign.

## Evidências de fidelidade

- **CSS principal idêntico byte por byte** ao original. O código inline de movimento também é idêntico; somente três URLs de bibliotecas passaram da CDN para arquivos locais. Hashes em `qa/code-fidelity.json`.
- As nove posições de início de seção e a altura total do documento coincidiram no desktop **1440 × 900**: 24.361 px. Foram comparados hero e os capítulos Sites, Sistemas, Sabec/Os, Quem e Conversar em capturas do mesmo viewport.
- Hero conferido em **390 × 844**: fontes carregadas, CTAs visíveis e largura do documento igual à viewport, sem overflow horizontal. As capturas original/local estão em `qa/`.
- Prisma, textura e leque espectral foram observados nas capturas; o shader e seus parâmetros originais estão preservados.

## Funcional e recursos

- **14 rotas responderam HTTP 200**, sem erros de JavaScript ou solicitações externas de recursos. A inspeção foi feita com recursos de outros domínios bloqueados. Evidências em `qa/routes.json`.
- **173 recursos locais**, incluindo 75 arquivos woff2 e oito vídeos; downloads sem falhas. URLs, tamanho e hashes em `assets-manifest.json`.
- `npm run verify`: **187 arquivos**, **14 páginas HTML**, **559 referências locais** e **nenhuma referência ausente**. Os três scripts Node também passaram verificação de sintaxe.
- Navegação por âncoras e mudança de capítulo conferidas. Cena de construção chegou à etapa **04/04**; painel Sabec/Os chegou à etapa **4** por rolagem. Capturas `qa/local-build-progress.png` e `qa/local-os-final.png`.
- Galeria avançou de **40 para 440 px** e retornou a **40 px**, usando as setas reais, em contexto com movimento reduzido. Evidência em `qa/gallery.json`.
- Formulário vazio destacou e focou o campo Nome. Com campos preenchidos, a rota local respondeu **Configure seu envio** e reabilitou o botão. Nenhum lead foi enviado à conta original. Evidência em `qa/form.json`.
- Os nove heroes de demonstração tiveram suas capturas revisadas. As texturas Lithos foram verificadas novamente após corrigir a localização de caminhos em templates JavaScript, sem alterar seu código de animação.

## Diferenças e limites reais

- Formulários usam `/api/lead` local sem envio configurado; analytics do autor foi removido. Esses ajustes não alteram a composição inicial nem as animações.
- JD e Dra. Ana permanecem links originais, conforme decisão do usuário. Serviços privados e backend Sabec/Os não foram recuperados; o painel da landing é a demonstração visual publicada.
- Bundles React publicados estão presentes, mas não correspondem aos componentes-fonte e ao repositório de desenvolvimento perdido.
- Margô possui uma imagem `src=""` no preview de menu, já presente no HTML original. Esse elemento escondido foi mantido; não é um asset perdido pelo espelho.
- Foi preservado o comportamento responsivo e de movimento reduzido do original. A verificação não cobre todos os frames das animações, todos os controles secundários dos demos, todos os navegadores ou aparelhos físicos. Capturas de shaders, loops e vídeos variam com tempo e posição do ponteiro; não se declara igualdade de pixels para todos os estados.

As evidências demonstram preservação do código visual e de movimento principal e funcionamento das rotas recuperadas. A próxima etapa pode personalizar nome, conteúdo e contatos sem mudar a referência inicial.
