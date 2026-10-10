# Créditos de agência dos templates — 10/10/2026

Revisão aplicada após confirmação pelo agente principal do backup `backups/clone-v1-jd-motion-2026-10-10`, com SHA-256 conferido.

## Alterações

Os seis rodapés existentes passaram a usar a frase **Site demonstrativo (template) produzido pela Norte Autoral · Gabriel Holanda**. O nome da agência é um link para `/`, na mesma aba, em:

- `public/marketing/portfolio/dentista-clinica-vertice/index.html`
- `public/marketing/portfolio/aureo-arquitetura/index.html`
- `public/marketing/portfolio/confeitaria-margo/index.html`
- `public/marketing/portfolio/instituto-liminar/index.html`
- `public/marketing/portfolio/verene-odontologia/index.html`
- `public/marketing/portfolio/arquitetura-estudio-linha/index.html`

As descrições de metadados de Áureo e Verene e o comentário de autoria de Áureo também foram atualizados. As marcas fictícias e seus textos próprios foram preservados.

Velorah, Lithos e Convix foram inspecionados integralmente, incluindo os bundles Vite. Não contêm créditos antigos de agência; nenhum rodapé novo foi acrescentado.

O helper `public/assets/demo-navigation.js` já usava Norte Autoral. Foi ajustado para ocultar o retorno flutuante enquanto a linha do crédito do rodapé estiver visível; o próprio crédito oferece retorno ao portfólio. O botão reaparece ao voltar à hero. A regra `[hidden]` foi acrescentada ao CSS comum para impedir que o controle sobreponha o crédito em telas pequenas. Animações e bundles originais dos templates não foram modificados.

## Verificação

Executado `node references/qa-agency-credits-2026-10-10/templates-credit-check.mjs` contra `http://127.0.0.1:4173` com Chromium isolado.

- Nove demos responderam HTTP 200 e registraram zero erros JavaScript.
- Nenhum texto visível contém Sabec, sabec.dev ou Diogo.
- Os seis créditos contêm o nome correto, `href="/"` e nenhum `target`.
- O clique real no crédito de Estúdio Linha voltou à raiz na mesma aba.
- Nenhum overflow horizontal a 1440 × 900; Áureo, Liminar e Linha também verificados a 390 × 844.
- Nos seis rodapés, o retorno flutuante se oculta junto ao crédito e reaparece ao voltar ao topo.
- Screenshots dos seis rodapés desktop e três mobile foram salvos nesta pasta e revisados visualmente. A linha de crédito deixou de ser encoberta em Liminar, Margô e Vértice.

Resultados estruturados: `templates-credit-results.json`.

A busca residual por autoria antiga em `public/marketing/portfolio` e nos dois assets comuns encontra somente cinco referências à classe interna `.colofon__sabec` de Áureo. Esse seletor foi preservado conforme orientação do agente principal; não é conteúdo visível nem metadado. Nenhum arquivo da página principal ou dos projetos em `public/cases` foi editado por esta revisão.
