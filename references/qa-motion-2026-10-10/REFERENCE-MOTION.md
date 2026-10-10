# Comparação das animações — 10 de outubro de 2026

Inspeção somente leitura da [referência Sabec](https://www.sabec.dev/), do HTML original guardado em `references/source/www-root.html` e do clone personalizado servido em `http://127.0.0.1:4173/`. Nenhum arquivo de `public/` foi alterado por esta inspeção. Foram lidos `AGENTS.md` e `PROJECT-STATE.md`, preservando o backup original aprovado.

## Resultado principal

As animações solicitadas continuam presentes e funcionaram no clone com movimento normal. O código responsável é idêntico ao original salvo e à referência publicada hoje:

| Código | SHA-256 nas três versões |
| --- | --- |
| `sabecInit` e bloco GSAP/ScrollTrigger/Lenis — 10.347 caracteres | `9888370b287d65c33c23c43da6cdf2b751fb1193c574581e0a5ffb6c2303ac10` |
| Cenas por IntersectionObserver, incluindo `jd-steps` — 1.599 caracteres | `eaf2512f7940412850af21aad815e7dc3e60dd1101c100589e6f76511af6b5e5` |

O CSS principal também é idêntico quando se removem comentários: hash `7425543f9e61e0d4f0cb1f6ff85efb751768c3c7ba87fcdf0b9a784a39e84bc9`. A diferença de nove caracteres no hash bruto vem somente do nome Norte Autoral no comentário inicial. `profile.css` adiciona identidade, ajustes do terceiro termo da hero, proporção dos cards, foto e conteúdo institucional; ele não desativa `#hoje`, `#jd` ou `.split`.

## O que a referência faz

| Elemento | Movimento preservado |
| --- | --- |
| `#hoje` | Seção presa durante 220% da altura da viewport; rolagem controla a timeline com `scrub: .8`. Os fragmentos sobem 30 px e crescem de escala 1 para 1,06; depois convergem, giram para zero, diminuem para 0,16 e desaparecem. Os três cards entram de escala 0,92 para 1, de y=50 para 0 e de opacidade 0 para 1, em cascata. |
| Texto inicial/final de Hoje | O texto inicial some subindo 40 px; o texto final entra subindo desde y=30. A cor de fundo aparece junto com a organização dos cards. |
| `#jd` | Quatro imagens alternadas por `data-s="1…4"`, conforme cada texto cruza a faixa observada. Imagem nova faz fade de 0,8 s e escala 1,07→1 em 1,6 s. O texto ativo passa de opacidade 0,32 para 1 em 0,5 s; indicador passa de 26 para 44 px em 0,4 s. |
| Títulos `.split` | Revelação **por palavra**, usando `.w/.wi`. Cada palavra sai de yPercent=115 e rotação 3° para zero, com duração de 1 s, intervalo de 0,06 s, easing `power3.out` e início quando o título alcança 86% da tela. A animação roda uma vez por carregamento. |
| Blocos `.rv/.rv-c` | Entrada com deslocamento de 28/34 px e fade de 0,9 s; blocos em cascata usam intervalo de 0,1 s. Também rodam uma vez por carregamento. |
| Mockups | Entrada inclinada em 3D: rotateX=10°, y=60, fade, perspectiva 1.200 px; 1,2 s com `expo.out`. |
| Imagens do segundo case | Desktop abre por máscara de baixo para cima em 1,4 s; celular sobe 80 px com fade em 1,2 s. O telefone do case principal recebe parallax vertical. |

A faixa do IntersectionObserver que escolhe o quadro JD é estreita: no desktop fica entre 50% e 51% da altura da tela; no celular entre 68% e 69%. O efeito depende de **rolar pelas quatro etapas**, e não de clicar nos indicadores. O clone troca os screenshots e os textos para Helena Vasques, conforme a personalização concluída anteriormente, conservando essa mecânica.

## Estados medidos no navegador

Chromium 153, desktop 1440 × 900, movimento normal:

- Referência e clone inicializaram 89 ScrollTriggers, com `sabecReady=true`, `.js` presente e `#hoje.on` ativo.
- Ambos prenderam Hoje no mesmo intervalo de rolagem: **y=1.004 até y=2.984**, equivalente a 1.980 px de deslocamento.
- No início, o primeiro card tinha escala 0,92, y=50 e opacidade 0; no final, escala 1, y=0 e opacidade 1. Os dois textos e o fundo também atingiram os estados previstos.
- Os quatro passos JD ativaram os quadros **1→2→3→4**, com exatamente uma imagem de opacidade 1 a cada etapa, tanto na referência quanto no clone.
- Palavras do título de Sites passaram de uma matriz com rotação 3° e deslocamento vertical aproximado de 86 px para a matriz identidade em ambas as páginas.
- O clone não teve erro JavaScript, recurso visual ausente ou HTTP 404. Duas requisições de analytics da referência foram abortadas sem afetar as animações.

Celular 390 × 844, com toque e movimento normal:

- Referência e clone inicializaram 88 ScrollTriggers; Hoje e o splitter estavam ativos.
- As quatro etapas JD também alternaram **1→2→3→4**, com imagens carregadas e preview sticky em top=76 px nas etapas 2–4.
- Não houve overflow horizontal. A resolução dos screenshots personalizados é 1.440 px de largura; a referência usa 1.280 px.

O primeiro fragmento pode estar em posições diferentes em uma captura intermediária mesmo com o código idêntico: o stagger original usa ordem **aleatória**. Os estados inicial/final e o comportamento dos cards coincidiram.

## Por que pode parecer estático

Foram reproduzidos dois modos estáticos previstos no código original:

1. **Preferência de movimento reduzido.** Com `prefers-reduced-motion: reduce`, o código encerra a inicialização GSAP e remove `.js`: Hoje não recebe `.on`, há zero ScrollTriggers e zero palavras divididas. Cards já aparecem completos e as transições CSS são desativadas. O JD continua trocando a imagem por IntersectionObserver, mas sem o fade/zoom.
2. **Bibliotecas indisponíveis.** Ao bloquear somente GSAP e ScrollTrigger no teste, a página caiu no fallback estático; Hoje ficou sem pin/growth e os títulos sem splitter. O JD ainda trocou os quatro quadros por IntersectionObserver. Existe ainda uma rede de segurança de 3,5 s que remove `.js` se a inicialização não tiver concluído.

O navegador recém-aberto **sem emulação de preferência** retornou movimento reduzido=false e inicializou normalmente. Portanto, não se comprovou que a configuração real do usuário esteja em reduce; esse é um cenário reproduzido, não um diagnóstico definitivo do aparelho ou da aba em uso.

Outras situações podem reduzir a percepção do efeito sem remover o código: títulos e reveals já rodaram uma vez nessa carga; a página foi aberta ou restaurada em uma posição avançada; uma âncora pulou a seção Hoje; ou a rolagem atravessou rapidamente as etapas. Uma imagem estática sozinha também não demonstra o crescimento ou o fade. Para julgar a fidelidade, começar uma nova carga no topo, confirmar `matchMedia('(prefers-reduced-motion: reduce)').matches`, `sabecReady` e os ScrollTriggers, e rolar continuamente pelas etapas.

## Evidências

- `source-comparison.json`: hashes do GET live, do HTML salvo e do clone.
- `motion-browser-results.json`: estados, matrizes, opacidades, imagens e erros para referência, clone, reduce e bibliotecas bloqueadas.
- `motion-mobile-default.json`: preferência padrão e sequência JD mobile.
- `reference-hoje-*.png` / `local-hoje-*.png`: início, meio e fim de Hoje.
- `reference-jd-1…4.png` / `local-jd-1…4.png`: quatro quadros e textos ativos.
- `inspect-motion.mjs` e `inspect-mobile-default.mjs`: reprodução da inspeção, sem alterações em `public/`.
