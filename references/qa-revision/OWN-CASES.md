# Cases próprios da Norte Autoral — integração e QA

Data local: 9 de outubro de 2026.

## Fonte e escopo

Fonte de leitura: `Portfolio-Norte-Autoral-GitHub/cases/` e seus recursos locais. O README identifica os três trabalhos como **projetos conceito completos**; as páginas exibem a faixa de demonstração e explicam que negócios/contatos/preços são fictícios. Eles não foram apresentados como clientes reais.

Foram alterados/criados somente os arquivos próprios sob `clone v1/public/cases`, `clone v1/public/assets/norte-autoral` e este relatório/evidências. A home, os scripts de servidor, o pacote do projeto, o backup original e as pastas-fonte não foram editados por esta sub-tarefa.

## Rotas

| Projeto conceito | Rota local | Card com hero real |
| --- | --- | --- |
| Helena Vasques | `/cases/helena-vasques.html` | `/assets/norte-autoral/cards/helena-vasques.jpg` |
| Vex Fitness | `/cases/vex-fitness.html` | `/assets/norte-autoral/cards/vex-fitness.jpg` |
| Vex Construtora | `/cases/vex-construtora.html` | `/assets/norte-autoral/cards/vex-construtora.jpg` |

Os links de retorno apontam para `/#sites`. CSS, fontes, imagens e bibliotecas foram isolados em `/assets/norte-autoral/case-runtime/` e `/assets/norte-autoral/case-media/` para evitar colisão com o clone.

## Correções

- Referências de imagens/fontes/vídeo/scripts adaptadas aos namespaces locais.
- Vex Construtora apontava para vídeo na pasta vazia `videos`; agora usa o MP4 existente em `imagens/case-vex-construtora`. O poster `hero.jpg` ausente foi extraído do mesmo vídeo pelo Chromium, sem substituir por uma imagem inventada.
- As fontes estáticas continham scripts Next de reidratação e scripts DOM locais simultaneamente, gerando React #412. A reidratação redundante foi retirada das páginas locais; os handlers originais de carrossel, filtros, preços, contadores e planta 3D foram mantidos.
- Títulos de seção de Helena exportados com `translateY(112%)` agora se revelam quando entram na tela, preservando a transição de 1.000ms e `cubic-bezier(.16,1,.3,1)` da fonte. A revelação de blocos usa o ritmo 650ms/55ms da fonte e respeita redução de movimento.
- Headers ganham fundo legível ao rolar sobre seções claras.
- Fitness: o seletor de descrição de preço tinha um escape inválido de classe com decimal. Corrigido com seletor de atributo. A tabela ficou alinhada aos valores do chunk fonte: anual 77,90/129,90/224,90; sem fidelidade 89,90/149,90/259,90.
- A legenda da planta 3D recebeu fundo discreto para continuar legível sobre o modelo no celular.
- Os feedbacks dos formulários conceito mostram **Demonstração: nenhum dado foi enviado**. Campos e layout foram preservados.

## Evidências para as sete telas da home

Diretório: `/assets/norte-autoral/cases/`.

1. `helena-vasques-01-hero.jpg` — desktop 1440×900.
2. `helena-vasques-02-situacoes.jpg` — desktop 1440×900, títulos assentados.
3. `helena-vasques-03-atuacao.jpg` — desktop 1440×900, títulos assentados.
4. `helena-vasques-04-advogada.jpg` — desktop 1440×900, títulos assentados.
5. `helena-vasques-mobile.png` — celular 390×844.
6. `vex-fitness-desktop.png` — desktop 1440×900.
7. `vex-fitness-mobile.png` — celular 390×844.

Além disso: `vex-construtora-desktop.png`, `vex-construtora-mobile.png`, `vex-construtora-planta-{desktop,mobile}.png`, `vex-fitness-planos-{desktop,mobile}.png`, e capturas dos rodapés dos três sites nos dois tamanhos.

## Verificação

Playwright isolado via Node/exec, Chromium `ms-playwright/chromium-1243`, headless. Não houve alteração do pacote nem compartilhamento de sessão de REPL. Browsers/contextos foram fechados ao terminar.

**45 verificações funcionais passaram** nos três projetos × desktop/celular. Relatório estruturado: `OWN-CASES-final.json`; inventário: `OWN-CASES-inventory.md`. Todas as rotas retornaram HTTP 200, sem respostas 404, erros JavaScript, imagens quebradas ou overflow horizontal.

Fluxos cobertos: navegação de Helena para seções e FAQ abrir/fechar; filtros Fitness Tudo/Lutas/Tudo; planos anual/mensal; FAQ e troca do carrossel; filtro de empreendimentos Em obra/Todos; plantas 3D A/B/A, foco de cômodo e arraste; vídeo do hero; acesso direto, recarregamento de cada rota e rolagem ao rodapé.

QA visual separado revisou heroes, três seções Helena, planos Fitness, planta 3D e rodapés. O canvas 3D ficou completamente dentro da tela: desktop x133/y160/593×407; celular x21/y160/348×261. Os títulos Helena revisados terminaram em `translateY(0)` e ficaram visíveis. Não foram observados recortes involuntários do hero/CTA, distorção de imagem ou texto oculto nos estados revisados. As páginas são roláveis e os demais conteúdos continuam abaixo da primeira tela, conforme a fonte.

## Limites

São demos estáticas/conceituais. Formulários não têm backend de contato; a simulação de financiamento exibe valores ilustrativos. Nenhum formulário/lead, mailto, ligação ou WhatsApp foi enviado/acionado no QA. O interceptor permitiu somente GET/HEAD. Não houve publicação.

Não restam falhas conhecidas de abertura ou dependências nesses três cases após a revisão.
