# Diagnóstico dos sites de demonstração

Verificado em 9 de outubro de 2026 no servidor local `http://127.0.0.1:4173`, Chromium 153, viewport 1440 × 900. Evidência reproduzível: `diagnose-demos.mjs` e `demo-diagnostics.json` neste diretório.

## Abertura dos cards

Os nove cards abriram os destinos corretos por cliques reais do mouse, todos em nova aba (`target="_blank"`). Todas as páginas e seus recursos responderam sem 404 ou falha de requisição; não houve erro JavaScript. O v3 também abriu corretamente. A galeria evita abrir um link quando o movimento de arrastar excede 5 px, comportamento previsto no código original.

Assim, a falha de abrir as demonstrações não foi reproduzida usando o servidor HTTP. Abrir `public/index.html` diretamente por `file://` quebra os caminhos absolutos `/marketing/...` e os módulos React: esse projeto precisa ser iniciado por `INICIAR.cmd` ou `npm start`. A percepção de que o clique não abriu também pode resultar do uso de nova aba.

## Controles que não têm ação publicada

| Demonstração | Evidência | Consequência |
| --- | --- | --- |
| Velorah | 295 caracteres no conteúdo; os cinco itens do menu usam `href="#"`; dois botões “Iniciar Jornada” sem `onClick` no código da aplicação. | Só há o hero visual; menu e CTA não levam a conteúdo. |
| Lithos | 455 caracteres; oito botões de navegação/CTA; o código de aplicação não contém handlers `onClick`. | Menu, curso, planos e “Começar a escavar” são controles visuais. |
| Convix | 503 caracteres; CTA “Começar agora” e “Acesso antecipado”; no trecho da aplicação o único `onClick` alterna um booleano. | O hero e o painel existem, mas parte dos controles é apenas visual. |

Os seis outros sites possuem páginas maiores com âncoras correspondendo a IDs reais. Seus botões de WhatsApp usam contatos de exemplo, e não um serviço operacional. Margô contém uma imagem de preview inicialmente `src=""`, conhecida desde a versão publicada; ela é preenchida ao interagir com o menu.

## Assets da hero

| Demonstração | Asset principal |
| --- | --- |
| Velorah | Vídeo local `/vendor/d8j0ntlcm91z4.cloudfront.net/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31-94d9b3db9d75.mp4` |
| Lithos | Texturas locais `/vendor/images.higgs.ai/asset-ab30e8b4fba2.webp` e `asset-145988049866.webp`; composição 3D |
| Vértice | `/marketing/portfolio/dentista-clinica-vertice/assets/img/recepcao.jpg` |
| Convix | Vídeo local `/vendor/d8j0ntlcm91z4.cloudfront.net/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be-2681d41b24d4.mp4` |
| Áureo | `/marketing/portfolio/aureo-arquitetura/assets/img/hero-fachada.jpg` |
| Margô | `/marketing/portfolio/confeitaria-margo/assets/img/hero-brunch.jpg` |
| Liminar | `/marketing/portfolio/instituto-liminar/assets/img/hero-biblioteca.jpg` |
| Verene | `/marketing/portfolio/verene-odontologia/assets/img/hero-recepcao.jpg` |
| Estúdio Linha | `/marketing/portfolio/arquitetura-estudio-linha/assets/img/fachada-ouro.jpg` |

Os vídeos estavam carregados (`readyState=4`), inclusive nos heroes que controlam o tempo do vídeo pela rolagem. A captura de uma hero estática deve esperar a animação de entrada e o carregamento das fontes. As novas miniaturas em `/assets/portfolio-heroes/` mostram a hero completa, com o enquadramento de 1440 × 900 e a página sem rolagem.

## Correções e verificação da revisão

Foram adicionados os assets comuns `/assets/demo-navigation.js` e `/assets/demo-navigation.css`, sem editar os bundles React, bibliotecas ou código de animação original. Os nove demos têm um link discreto de retorno para `/#sites`. A página `/v3` também tem retorno e a indicação “Referência da base”.

Os menus e CTAs sem destino de Velorah, Lithos e Convix abrem diálogos nativos com o título “Demonstração”, conteúdo contextual e convite para conversar com Norte Autoral em `/#contato`. O menu mobile React já existente de Convix foi preservado; seus itens ganharam acesso por teclado. O menu mobile antes inerte de Lithos abre seis opções acessíveis. Os contatos fictícios dos demos HTML abrem o diálogo de contato de demonstração.

Verificação reproduzível em `verify-demo-navigation.mjs` e `verify-demo-supplement.mjs`:

- Os nove retornos ficaram visíveis com href `/#sites`, sem erros JavaScript ou HTTP 404.
- **28 ações por cliques reais** abriram os diálogos esperados nos menus, CTAs e quatro contatos da hero. Escape fechou os diálogos; o acesso por Enter no menu Convix também funcionou.
- O contato Áureo no rodapé foi conferido separadamente com movimento reduzido: o diálogo abriu, a página permaneceu no endereço local e o convite apontou para `/#contato`.
- Lithos mobile abriu seis opções; escolher Curso abriu o painel correspondente. Convix mobile abriu o menu original e expôs os quatro itens com acesso por teclado. Ambos foram conferidos em 390 × 844, com **zero overflow horizontal**, inclusive no diálogo de Lithos.
- O retorno real de `/v3` navegou para `http://127.0.0.1:4173/#sites`.
- `npm run verify` passou com 341 arquivos, 17 páginas HTML, 809 referências locais e nenhum recurso ausente no momento da revisão.

Esses diálogos dão destino aos controles do conceito sem criar contas, enviar mensagens para números de exemplo ou representar um backend operacional. As âncoras válidas dos seis demos HTML continuam levando às seções existentes. As imagens finais da galeria foram capturadas antes de adicionar a navegação auxiliar, preservando o enquadramento original de cada hero.
