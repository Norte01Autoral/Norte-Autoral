# Inventário de verificação

Referência: https://www.sabec.dev/ em 09/10/2026. O alvo é a página atual confirmada pelo usuário.

## Requisitos observáveis

- Preservar HTML, CSS, scripts de movimento, imagens, vídeos e fontes publicados.
- Abrir página principal, /v3, /site-do-jd, /privacy, /terms e nove demonstrações locais.
- Comparar composição original/local em desktop 1440 × 900 e celular 390 × 844.
- Conferir hero, capítulos Hoje/Sites/Sistemas/Sabec/Os/Processo/Quem/Conversar e rodapé.
- Conferir resposta do prisma ao ponteiro, revelações ao rolar, cenas de etapas, trilho da galeria e navegação por âncoras.
- Conferir navegação no celular (o original oculta os links e conserva o botão Conversar; não possui menu expansível); campos obrigatórios do formulário e envio local sem saída para a conta original.
- Conferir erros de JavaScript, falhas de recursos locais, fontes carregadas e vídeos das demonstrações.

## Cenários adicionais

- Rolagem rápida para o fim e retorno ao hero: sem elementos presos ou conteúdo essencial invisível.
- Largura estreita e movimento reduzido: comparar com o comportamento do original e registrar defeitos herdados.
- Abrir rotas internas diretamente e recarregar páginas das demonstrações.

Capturas e resultados serão salvos em references/qa. Este inventário define cobertura; não é uma declaração de que todos os testes passaram.
