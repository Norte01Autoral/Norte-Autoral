# Cases externos: inspeção pública preliminar

Em 9 de outubro de 2026 foi realizada inspeção por leitura de `https://jdandrade.art/` e `https://draanascatolin.com.br/`, sem baixar suas imagens/vídeos nem executar formulários. Depois da inspeção, **o usuário escolheu manter os links originais**. Portanto os dois websites completos ficam fora do escopo da cópia local; este diretório documenta apenas a análise já feita.

## J.D. Andrade

Frontend publicado em Vite, HTML real e JavaScript modular, com GSAP/Lenis embutidos. Principal de 65.503 bytes, módulo principal de 155.430 bytes e dados/site em `assets/site-D_Y69rip.js` de 84.643 bytes. Fontes Google Zalando Sans e Zalando Sans Expanded. Recursos da interface incluem camadas de diorama, animação de vagalumes, lightbox com processo de arte, filtro de categorias, álbum e comparação de retrato/foto. Imagens aparecem também em `data-src`, `srcset` e `data-srcset`; módulos/dados revelam cerca de 265 strings de arquivos de mídia.

O sitemap publica 18 rotas: principal PT e EN, `/links` PT e EN e sete projetos também em PT e EN (`maldito-destino`, `cavaleiro-da-terra`, `wonderwood`, `a-ultima-chama`, `noctule`, `arvo`, `the-best-run`). Amostras HTTP 200 confirmaram `/en`, `/links` e `/projetos/maldito-destino`.

Projetos e links possuem entradas próprias: `assets/projeto-Dj54XHQV.js` e `assets/links-DHmGYh6K.js`, respectivamente. Esses dois bundles adicionais foram apenas identificados nas páginas amostradas, sem download. Um espelhamento completo futuro precisaria preservar essas rotas, entradas e imports, resolver paths absolutos e baixar tamanhos alternativos/arte em resolução completa. Google Forms, redes sociais, Amazon, Spotify e Behance são destinos externos.

## Dra. Ana Scatolin

O endereço sem www redireciona HTTP 308 para `https://www.draanascatolin.com.br/`. Frontend Vite/React em um bundle JS de 549.091 bytes e CSS de 45.064 bytes. O HTML principal tem 5.526 bytes e metadados de implantação odontológica. Há 16 strings concretas de mídia no bundle, incluindo `assets/logo-reveal.mp4`, `assets/logo-reveal-mobile.mp4`, poster, logo e fotografias.

O sitemap publica seis rotas: principal, `/dentista-guarapuava`, `/implante-dentario`, `/protese-dentaria`, `/aparelho-ortodontico` e `/clareamento-dental`. O bundle escolhe a página conforme `window.location.pathname`; preservar um futuro espelho exigiria fallback do servidor para a entrada React nas rotas conhecidas. A política em `/privacidade.html` é HTML estático independente, confirmado HTTP 200, de 2.009 bytes. A UI pública pode ser espelhada com os bundles e mídias; serviços de conversão e contatos exigiriam configuração própria.

## Arquivos da inspeção

`inventory.json` guarda URLs de páginas, status, recursos principais, imports e strings de mídia encontradas. Arquivos originais amostrados, robots e sitemaps estão neste diretório em UTF-8. Não são uma cópia completa dos websites. Nenhum arquivo de `public` foi alterado por esta análise.
