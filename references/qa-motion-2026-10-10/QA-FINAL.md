# QA final — revisão de 10 de outubro de 2026

Pedido aplicado: JD Andrade e Dra. Ana nos destaques, imagens da referência, sequência no scroll, só o botão Abrir o site para JD, galeria sem os conceitos anteriores, mais entrada de texto/imagem e feedback de clique, foto Gabriel e símbolo N.

## Resultado observado

- JD desktop1440×900: rolagem real ativou1→2→3→4, cada estado com o JPG correspondente opacidade1 e os demais0; todos carregados. Rolagem reversa voltou3→2→1. Celular390×844: estados1→2→3→4 também conferidos. Capturas `jd-step-*-{desktop,mobile}.png` e `jd-states.json`.
- JD mantém as quatro imagens originais e a prévia do celular no desktop. Só um botão no grupo, apontando a `https://jdandrade.art`; nenhum Ver como eu fiz na página principal.
- Ana tem imagens desktop/celular originais e link `https://www.draanascatolin.com.br`. Entrada de cortina e zoom de imagem, telefone subindo e título/texto revelados foram revisados em1440×900 e390×844 (`ana-{desktop,mobile}.png`).
- Hoje continua fixado durante a cena de scroll. Com mouse/wheel, título cresceu0,9604→0,9787→0,9927 e fragmento0,9411→0,9961→1,0382 nos pontos de leitura, antes da convergência original. Dados `hoje-scale.json`, capturas `hoje-*-desktop.png`.
- Dez cartões da referência, sem Helena/Vex. Proporção4/5 medida no celular308×385; Velorah usa a imagem vertical original correspondente ao print. Setas/arraste permanecem funcionais. Revelação de janela e legenda revisada após rolar à galeria.
- Clique real em Velorah: janela atingiu escala0,975876 ao pressionar, classeis-opening apareceu, navegação local ocorreu e retorno voltou ao portfólio. Estado de clique foi limpo. Ctrl+clique abriu nova aba; arraste moveu a galeria e não abriu site.
- Foto Gabriel colorida, filtro none, carregada e conferida visualmente. Logo N1024px transparente preservada. Favicon substituiu NA pelo mesmo N em SVG/PNG/ICO.
- 320×740: corrigido recorte do domínio JD com fonte responsiva; título dentro do bloco. Redimensionamento320→390→320 manteve clientWidth/scrollWidth iguais ao viewport, após limitar os espaçadores de pin à largura disponível.
- Movimento reduzido390×844: fallback estático, título opacidade1, imagem Ana sem clip, foto carregada ao entrar na tela e sem overflow. JavaScript de movimento não é necessário para ler as imagens/textos; troca JD continua funcionando por IntersectionObserver.
- Console das sessões desktop/celular sem erros JavaScript observados.

## Preservação e referências

Backup original SHA256 `43C69BF92CB90B67EBEA2E4AAACEC541DE6E6D008AE8981BBC795AE4B39C2F5A` preservado. Versão personalizada anterior também guardada, SHA256 `32EC9DB2627AC097F5D4105B21C22940DB28FA16262931F3AF97099E9A81CC45`.

O diagnóstico inicial confirmou os scripts idênticos à referência antes desta revisão: [REFERENCE-MOTION.md](REFERENCE-MOTION.md). Parâmetros foram ajustados com GSAP existente, a partir das referências oficiais ReactBits/AnimateUI: [MOTION-REFERENCES.md](MOTION-REFERENCES.md). Não houve troca de stack ou publicação.

Os trabalhos JD/Ana são referências do autor da base e permanecem links externos. Os conceitos anteriores ficaram fora da vitrine. Nenhum contato ou formulário foi enviado no QA.

`npm run verify`:345 arquivos públicos,17HTML, nenhuma referência local ausente. O pacote final é criado pelo script `scripts/package.ps1`, excluindo dependências, cache e backups.
