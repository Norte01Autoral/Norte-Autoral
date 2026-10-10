# Inventário da verificação responsiva — 10/10/2026

Esta verificação é local, em Chromium com emulação de viewport. Não equivale a executar em todos os modelos físicos de telefone.

- Página principal em 320, 360, 390, 412, 768, 820, 1024, 1280, 1440 e 1920 px de largura; orientação horizontal 844 × 390. Verificar largura do documento e limites dos blocos visíveis. Capturar hero, Quem/foto e seções densas em larguras representativas.
- Rolagem real com movimento normal em 390 e 1440 px, incluindo cenas Hoje, JD, Norte/OS e conteúdo final. Verificar movimento reduzido nas demais larguras.
- Foto colorida de Gabriel: cabelo completo e proporção sem distorção; reapresentar a captura após a correção final.
- Serviços Meta Ads e Google Ads: presença e legibilidade na página após a edição final.
- Formulário: erro com campos vazios; selecionar Norte/OS, preencher dados fictícios e verificar apenas o rascunho WhatsApp, com `window.open` interceptado. Não enviar mensagens.
- Galeria: clique de cartão navega na mesma aba. As nove demos retornam HTTP 200, sem erros JS nem overflow horizontal em 390 e 1440 px; controles de demonstração e retorno ao portfólio.
- Cenários adicionais: 320 px; modo horizontal baixo; movimento reduzido; resize de desktop para celular; retorno do rodapé sem cobrir créditos.
- Evidência final: relatório JSON, relatório Markdown e capturas selecionadas, separados dos registros anteriores.
