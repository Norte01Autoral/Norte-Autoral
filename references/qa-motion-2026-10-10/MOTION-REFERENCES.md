# Referências de movimento — 10/10/2026

Foram consultados os índices solicitados: [React Bits](https://reactbits.dev/get-started/index) e [Animate UI](https://animate-ui.com/docs/components), além dos documentos/códigos oficiais abaixo. Apenas este relatório foi criado; `public/index.html` e assets permanecem sem alterações desta subtask.

## Aplicação na stack atual

O projeto já tem GSAP/ScrollTrigger 3.12.5, Lenis, splitter próprio de palavras, reveal de títulos, clip-path em cases e hover dos cards. Os padrões podem ser adaptados diretamente ao HTML existente. Não é necessário instalar React, Motion, Tailwind ou outra cópia de GSAP.

O [ScrollReveal oficial do React Bits](https://github.com/DavidHDev/react-bits/blob/main/src/content/TextAnimations/ScrollReveal/ScrollReveal.jsx) combina opacidade, blur e stagger ligados ao scroll; defaults incluem opacidade 0,1, blur 4 px e rotação 3°. O [SplitText oficial](https://github.com/DavidHDev/react-bits/blob/main/src/content/TextAnimations/SplitText/SplitText.jsx) usa GSAP, espera as fontes e oferece stagger/entrada por palavras, mas importa SplitText e `@gsap/react`. Para esta página, manter `splitWords()` evita dependências adicionais. Não copiar o cleanup global de ScrollReveal, que mata todos os triggers e interromperia os capítulos fixos.

## Três melhorias concretas propostas

As medidas seguintes são **adaptações sugeridas para este site**, não defaults das bibliotecas.

| Melhoria | Especificação implementável |
| --- | --- |
| **Palavras entram com mais definição** | Ajustar a animação existente de `.split .wi`: `yPercent: 110 → 0`, `opacity: 0 → 1`, `rotate: 1 → 0`, `filter: blur(2px) → blur(0)`; duração **0,85 s**, easing **power3.out**, stagger **0,05 s**. Trigger `top 86%`, `once: true`. Preservar o splitter que mantém `<em>` e a máscara com folga para acentos. Limpar `filter` ao concluir; não criar um segundo tween concorrente nos mesmos elementos. |
| **Imagens abrem e assentam** | No tween já existente de `.case-desk`, manter a cortina por clip-path, duração **1,0 s**, **expo.out**; na mesma timeline, imagem `scale: 1.06 → 1`, duração **1,15 s**, **power3.out**, com mesmo trigger `top 85%` e `once: true`. Para o retrato, revelar `.photo .frame` com `y: 24 → 0`, opacidade `0 → 1`, **0,75 s**, **power3.out**, preservando o parallax atual de `.photo img`. O [AnimatedContent oficial](https://github.com/DavidHDev/react-bits/blob/main/src/content/Animations/AnimatedContent/AnimatedContent.jsx) sustenta esse padrão de transformação/opacidade, ScrollTrigger e entrada única. |
| **Clique produz resposta tátil discreta** | Botões/CTAs: escala individual CSS `1 → .97` na pressão, **120 ms**, `cubic-bezier(.2,.7,.1,1)`; soltar para `1`, **260 ms**, `cubic-bezier(.16,1,.3,1)`. Cards clicáveis: `.985`, preservando seu `translateY(-6px)` de hover. Usar propriedade CSS `scale` ou wrapper interno para não sobrescrever o transform atual. Opcionalmente, apenas CTA principal recebe ripple no ponto do clique: diâmetro suficiente para cobrir o botão, opacidade `.14 → 0`, **450 ms**, **power2.out**, limitado a uma onda. Não atrasar navegação, nem adicionar clique ao gesto de arrastar da galeria. |

O [Button oficial do Animate UI](https://animate-ui.com/docs/primitives/buttons/button) documenta resposta de hover/tap com escalas 1,05/0,95. O [Ripple Button oficial](https://animate-ui.com/docs/components/buttons/ripple) documenta a onda com duração 0,6 s e easeOut. As escalas/durações acima são menores para combinar com o hero e cards existentes.

## Critérios para aplicar e verificar

- Respeitar `prefers-reduced-motion`: conteúdo visível, sem blur persistente, zoom ou deslocamento; manter feedback de cor/foco. A [documentação oficial de acessibilidade do Animate UI](https://animate-ui.com/docs/accessibility) orienta reduzir transformações e parallax nesta preferência.
- Pressão deve funcionar em mouse/toque e teclado nativo; limpar estado em `pointerup`, `pointercancel`, perda de foco e fim de arraste. Links usam Enter, botões Enter/Espaço, sem alterar sua semântica.
- Aguardar `document.fonts.ready` antes de medir texto e executar `ScrollTrigger.refresh()` depois das imagens relevantes carregarem. Manter as cenas sticky e a rolagem Lenis como únicas responsáveis pelo scroll.
- Verificar primeiro acesso, scroll rápido, retorno por histórico, viewport móvel, reduced motion e arraste da galeria. Nenhum reveal deve deixar títulos/imagens invisíveis se uma biblioteca falhar.
