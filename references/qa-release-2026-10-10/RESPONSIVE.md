# Validação responsiva e funcional — 10/10/2026

A página principal e os nove templates foram verificados em Chromium local. A matriz foi concluída antes da interrupção da sessão; a execução `responsive-resume.mjs` preservou os resultados existentes e concluiu apenas as verificações pendentes. O resultado consolidado é `RESPONSIVE.json`, sem falha pendente.

## Página principal

| Viewport | Movimento | Resultado |
| --- | --- | --- |
| 320 × 740, 360 × 800, 390 × 844, 412 × 915 | Reduzido | Sem overflow horizontal ou recorte detectado nos blocos verificados |
| 768 × 1024, 820 × 1180, 1024 × 768 | Reduzido | Sem overflow horizontal ou recorte detectado nos blocos verificados |
| 1280 × 800, 1440 × 900, 1920 × 1080 | Reduzido | Sem overflow horizontal ou recorte detectado nos blocos verificados |
| 844 × 390, horizontal | Reduzido | Sem overflow horizontal ou recorte detectado nos blocos verificados |
| 390 × 844 e 1440 × 900 | Normal | Rolagem e estados das cenas verificados |

Foram percorridas a hero, todas as seções diretas de `main` e o rodapé. A largura do documento permaneceu igual à viewport nos 11 tamanhos. A avaliação de limites cobriu títulos, links do menu, subtítulo inicial, campos, conteúdo do aplicativo e moldura da foto quando visíveis.

As cenas JD e Norte/OS acompanharam a sequência **1 → 2 → 3 → 4 → 3** tanto em celular quanto desktop, incluindo retorno pela rolagem. Não houve overflow ou recorte detectado nesses estados. Redimensionar de 1440 para 390 px também manteve a largura correta. A seção Hoje foi percorrida com movimento normal.

## Foto e serviços

A foto usa sua proporção original de **819 × 1024**, `object-fit: contain`, alinhamento superior e ausência de zoom na própria imagem, inclusive no hover. Sua caixa manteve a proporção em todos os tamanhos. A inspeção visual de `final-320-retrato.png` e `final-1440-retrato.png` confirmou o cabelo inteiro. A cor, a moldura e a legenda permanecem.

Meta Ads e Google Ads aparecem no texto inicial, descrição do trabalho, tags e opção de interesse. As capturas finais mostram a apresentação em celular e desktop. A imagem final da seção O aplicativo foi inspecionada em 390 px, com título, parágrafos e lista dentro da viewport.

## Templates e controles

Os nove templates retornaram HTTP 200 em **390 e 1440 px**: 18 verificações de topo e rodapé. Não foi detectado overflow horizontal nem o antigo crédito de template atribuído à Sabec. A navegação de um cartão abriu o template na mesma aba (uma página antes e depois). O botão de demonstração abriu um diálogo de 354 px dentro da viewport de 390 px, fechou corretamente e o retorno levou a `/#sites`.

O envio vazio do formulário manteve o foco em `nome`, marcou quatro campos obrigatórios e não abriu janela. Com dados fictícios, as seleções **Norte/OS** e **Meta Ads e Google Ads** geraram os dois rascunhos corretos para `wa.me/5586999900235`. `window.open` foi interceptado durante o teste: **nenhuma mensagem externa foi enviada**.

O relatório consolidado registra **zero erros JavaScript** e **zero respostas locais HTTP ≥ 400** durante essa execução. As imagens finais estão nesta pasta, com nomes `final-...png`. Os estados adicionais de suspensão e retomada de mídia estão descritos em `PERFORMANCE.md` e `media-checks.json`.

## Limites

Esta verificação usa Chromium e emulação de viewport/toque; não é execução em todos os modelos físicos de telefone nem em Safari e Firefox. A hospedagem pública, DNS, SSL e regras Apache/LiteSpeed precisam ser conferidos após o upload na Hostinger. As capturas e medições locais não significam que o domínio já foi publicado.
