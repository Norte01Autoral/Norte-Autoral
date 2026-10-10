# Publicar Norte Autoral na Hostinger

Domínio preparado: **https://norteautoral.site/**. Este pacote é um site estático: não exige Node.js, WordPress, instalação de dependências ou banco de dados no servidor.

## Arquivo para enviar

Use **`clone-v1-hostinger.zip`**. Ele contém `index.html`, `.htaccess`, `robots.txt`, `sitemap.xml` e as pastas públicas diretamente na raiz. O ZIP de código-fonte `clone-v1-norte-autoral.zip` é destinado a manutenção e restauração; não é o arquivo para extrair em `public_html`.

O pacote de hospedagem omite somente os conceitos antigos Helena/Vex e seus recursos sem referências na vitrine atual: `cases/` e `assets/norte-autoral/{cards,cases,case-media,case-runtime}/`. Esses arquivos permanecem no projeto local e nos pontos de restauração. O manifesto em `scripts/hostinger-exclusions.json` é validado antes da geração, para impedir que uma página atual aponte para uma pasta omitida. Os recursos dos destaques atuais em `assets/cases/` são incluídos.

## Instalação

1. No hPanel, abra **Sites → Painel de controle → Gerenciador de arquivos → Acessar arquivos do domínio**. Use a hospedagem de um site personalizado; o Criador de Sites da Hostinger não oferece esse gerenciador. A pasta do site é `public_html`. [Guia oficial da Hostinger](https://www.hostinger.com/support/4548688-basic-actions-in-the-file-manager-in-hostinger/).
2. Se já existir outro site no domínio, baixe um backup dele antes de substituí-lo. Confira também o DNS de `norteautoral.site` e `www.norteautoral.site` e ative o certificado SSL para ambos. A Hostinger permite forçar HTTPS pelo painel depois que o certificado é instalado. [HTTPS na Hostinger](https://www.hostinger.com/support/1583201-how-to-enable-or-disable-https-for-your-website-at-hostinger/).
3. Envie `clone-v1-hostinger.zip` para `public_html` e use **Extrair**. O gerenciador pode pedir um nome de pasta para a extração: se isso acontecer, abra essa pasta e mova **o conteúdo dela**, incluindo `.htaccess`, para `public_html`. Ao terminar, o caminho do arquivo principal precisa ser `public_html/index.html`, sem pastas `clone v1/` ou `public/` no meio. [Operações do gerenciador](https://www.hostinger.com/support/4548688-basic-actions-in-the-file-manager-in-hostinger/).
4. Confira a exibição de arquivos ocultos para garantir que `.htaccess` está presente. Ele serve as rotas `/privacy`, `/terms`, `/v3` e `/site-do-jd`, define a página 404, compressão e cache. O domínio principal é sem `www`; os acessos por HTTP e `www` são redirecionados para HTTPS no domínio principal. O certificado precisa estar ativo antes desse teste. [Redirecionamentos na Hostinger](https://www.hostinger.com/support/1583406-how-to-set-up-a-redirect/).
5. Se um arquivo inicial da Hostinger ou um `index.php` antigo ainda existir, guarde uma cópia fora de `public_html` para evitar conflitos com o novo site. Depois da conferência, retire o ZIP enviado da pasta pública e mantenha a cópia local.

## Conferência no domínio

- Abra `https://norteautoral.site/` e navegue por cada cartão. Os nove templates são páginas internas completas; JD e Dra. Ana continuam com os links externos escolhidos.
- Confira menu no celular, formulário que abre o rascunho de WhatsApp, foto, Norte/OS e serviços de Meta Ads/Google Ads.
- Abra `/privacy`, `/terms`, `/v3`, `/site-do-jd`, `/robots.txt` e `/sitemap.xml` diretamente pela barra do navegador.
- Teste um endereço inexistente, por exemplo `/pagina-inexistente`: deve mostrar a página personalizada e devolver HTTP **404**, sem se passar pela página inicial.
- Confira `http://norteautoral.site/`, `https://www.norteautoral.site/` e `/index.html`: devem levar a `https://norteautoral.site/`.
- Em Ferramentas do Desenvolvedor → Rede, confira que CSS/JS/texto podem usar compressão e que imagens/fontes têm cache. A efetivação das regras depende do servidor Apache/LiteSpeed da conta; esta entrega não alterou a hospedagem ou o DNS.

## Colocar no Google

1. Entre no **Google Search Console** com sua conta e adicione a propriedade de domínio `norteautoral.site`. Complete a verificação DNS indicada pelo próprio Google.
2. Em **Sitemaps**, envie `https://norteautoral.site/sitemap.xml`. O arquivo contém somente as três páginas destinadas à busca. As demos, a versão alternativa e o estudo de referência têm `noindex`; continuam acessíveis aos visitantes e aos robôs para leitura dessa instrução. [Sitemaps do Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [instrução noindex](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).
3. Use **Inspeção de URL** na página inicial, teste a URL publicada e solicite indexação. O HTML já tem título, descrição, canonical, dados de Gabriel/Norte Autoral e catálogo dos serviços. Esses sinais ajudam o Google a compreender o site; a indexação e a posição nos resultados são decididas pelo Google. [Guia de SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
4. Teste os dados estruturados no [Rich Results Test](https://search.google.com/test/rich-results) depois da publicação. O schema usa apenas os contatos e a cidade informados; não inclui avaliações, endereço de rua, certificações ou resultados não fornecidos. [Dados de negócio local](https://developers.google.com/search/docs/appearance/structured-data/local-business).

## Atualizar o pacote

No projeto local, após editar os arquivos atuais de `public/` e validar o site, execute:

```powershell
node scripts/build-hostinger.mjs
```

O comando confere referências e SEO, recria o ZIP fora do projeto e grava o SHA-256. Não modifica os backups. Para mudar de domínio, atualize os metadados, `robots.txt`, `sitemap.xml`, `.htaccess` e o domínio em `scripts/build-hostinger.mjs` antes de gerar o arquivo novamente. Em novas versões, use nomes ou parâmetros novos nos recursos alterados e limpe o cache da hospedagem se ele estiver habilitado.

HTML exige revalidação; CSS e JavaScript editáveis têm cache de sete dias. Somente recursos com hash no nome recebem cache immutable de um ano. Imagens têm cache de 30 dias e fontes de um ano. Essas regras são aplicadas quando os respectivos módulos Apache/LiteSpeed estão disponíveis na conta.

O formulário principal abre o WhatsApp para revisão e envio pelo visitante. O formulário demonstrativo de `/v3` permanece desativado; não existe API de coleta implementada neste pacote.
