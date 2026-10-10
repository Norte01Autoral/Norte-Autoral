# Entrega — foto, anúncios, SEO e Hostinger, 10/10/2026

## Alterações verificadas

- Foto original inteira, colorida e com o cabelo visível. Removidos o zoom e deslocamento que cortavam a parte superior; reveal da moldura e outras animações mantidos. WebP preserva 819×1024 e o enquadramento original. Versão alternativa também sem zoom no hover.
- Meta Ads e Google Ads em apresentação, serviços, Quem, faixa e formulário. Norte/OS, dez cartões, JD/Ana e créditos próprios mantidos.
- SEO para **https://norteautoral.site/**: título/descrição, canonical, OG/Twitter, imagem social 1200×630 com N original, dados estruturados, robots e sitemap. Três páginas destinadas à indexação; nove templates e três páginas auxiliares com noindex.
- Logo de UI 128 px, derivados WebP, preload abaixo da dobra removido, pausa de mídia fora da tela/aba e correção do gate do prisma ao retornar à aba.
- Site estático de Hostinger com index.html na raiz, rotas reais, página 404 e regras Apache/LiteSpeed de HTTPS, host canônico, compressão/cache. Instruções em `HOSTINGER.md`.

## QA funcional e visual

Conferência local em Chromium com Playwright. Relatório completo em `RESPONSIVE.md`, `RESPONSIVE.json`, `PERFORMANCE.md`, `media-checks.json` e `SEO-HOSTINGER.md`.

| Cobertura | Resultado |
| --- | --- |
| 11 viewports | 320, 360, 390, 412, 768, 820, 1024, 1280, 1440, 1920 px e 844×390; sem overflow horizontal ou recortes observados nos pontos examinados. |
| Foto | Cabelo inteiro em desktop e celular, contain/top, sem transform de zoom; capturas revisadas. |
| Demos | Nove rotas × desktop/celular: 18 checks, HTTP 200, zero erros JS ou respostas locais >=400. |
| Cenas | JD e Norte/OS: estados 1→2→3→4→3 em 390/1440, com imagens e texto corretos. |
| Contato | Vazio destaca campos e foca nome; Norte/OS e Meta/Google Ads montam rascunhos para o WhatsApp correto. window.open interceptado só no QA; nenhuma mensagem enviada. |
| Galeria e retorno | Cartão abre na mesma aba, diálogo cabe/fecha no celular e retorno ao portfólio funciona. |
| Fora do caminho comum | Movimento reduzido, hover da foto e redimensionamento desktop→celular sem regressão observada. |
| Vídeos | Seis templates × desktop/celular: 12 checks. Autoplay mobile pausa fora de tela/aba e retoma; desktop permanece pausado com currentTime guiado pela rolagem. |
| Faixa e prisma | Faixa se move quando visível e pausa fora da tela. Prisma: quadros presentes na hero, zero fora da hero/aba oculta; retorno de aba fora da hero não reinicia o desenho. |

`npm run verify`: **367 arquivos públicos, 18 HTML, 814 referências locais, zero ausentes**. Auditoria de produção: **229 arquivos retidos, 15 HTML, 1.305 referências conferidas contra exclusões, zero referências a recursos omitidos**.

## Desempenho observado

- Cache frio local, desktop 1440×900, mesma configuração: assets iniciais **932.142→324.851 bytes (−65,15%)**.
- Incluindo HTML: **1.084.361→479.039 bytes (−55,82%)**.
- Imagens selecionadas: **47,49% menos bytes**. Logo 461.365→11.052 bytes; foto 283.923→85.408 bytes.
- Tempos locais variaram sob carga paralela. Não são uma nota Lighthouse nem uma promessa de desempenho no servidor de produção.

## Pacotes, restauração e GitHub

Pacote de instalação: **clone-v1-hostinger.zip**, só arquivos públicos ativos na raiz, incluindo .htaccess. Pacote de manutenção: **clone-v1-norte-autoral.zip**, estrutura completa de projeto. Scripts de embalagem conferem referências/SEO e protegem os pontos de restauração. HASH e manifesto do pacote público em `HOSTINGER-PACKAGE.json` após a geração.

GitHub de armazenamento: **Norte01Autoral/Norte-Autoral**, branch **portfolio-atualizado-hostinger-2026-10-10**, com configuração que desativa deployments Vercel dessa branch. O histórico anterior e a pasta de referência continuam preservados.

Quatro backups imutáveis preservados: original aprovado (43C69B…), personalização de 09/10 (32EC9D…), JD/movimento (9D7BBC…) e estado Norte/OS anterior a esta entrega (**12CEECF1B6735658A9A897C1FD1FFC12D8A30EBF93227E3D2E866C9CBC0E45E4**).

Limites: testes em Chromium emulado, sem executar cada aparelho físico. Servidor local Node não executa .htaccess; DNS, SSL, compressão/cache de hospedagem e retorno HTTP de produção exigem conferência após instalação na Hostinger. Nenhuma publicação ou alteração DNS feita nesta entrega.
