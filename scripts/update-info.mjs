import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const publicRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../public');
const css = (await readFile(resolve(publicRoot, 'privacy.html'), 'utf8')).match(/<style>([\s\S]*?)<\/style>/)[1];
const pages = {
  privacy: {
    title: 'Contato e privacidade',
    description: 'Como funciona o contato neste portfólio da Norte Autoral.',
    content: `<p>Este portfólio apresenta os serviços e projetos de <strong>Gabriel Holanda, da Norte Autoral</strong>.</p>
<h2>Contato pelo formulário</h2>
<p>Os campos da página principal montam uma mensagem para o WhatsApp. Ao clicar em <strong>Abrir WhatsApp</strong>, você pode revisar o texto antes de enviá-lo. Preencher o formulário, por si só, não envia uma mensagem.</p>
<p>A mensagem inclui os dados que você escreveu: nome, WhatsApp, Instagram ou site, interesse e descrição do projeto. O formulário desta versão não grava essas informações em um banco de dados do portfólio.</p>
<h2>Links e demonstrações</h2>
<p>Ao abrir WhatsApp, Instagram ou outros sites externos, você passa a usar os serviços dessas plataformas. As demonstrações internas são exemplos de apresentação e navegação; seus contatos comerciais fictícios não são canais de atendimento da Norte Autoral.</p>
<h2>Recursos desta versão</h2>
<p>Imagens, fontes e bibliotecas usados no portfólio principal estão incluídos no projeto. Esta versão não inclui o analytics nem a chave de envio de formulários da base original.</p>
<h2>Fale com Gabriel</h2>
<p>Para conversar sobre seu projeto ou sobre informações enviadas por você, use <a href="mailto:contatonorteautoral@gmail.com">contatonorteautoral@gmail.com</a> ou o <a href="https://wa.me/5586999900235">WhatsApp da Norte Autoral</a>.</p>`
  },
  terms: {
    title: 'Sobre este portfólio',
    description: 'Projetos conceito, demonstrações e contato da Norte Autoral.',
    content: `<p>Este é o portfólio de <strong>Gabriel Holanda / Norte Autoral — Soluções para negócios</strong>. Aqui você encontra exemplos de sites, sistemas e automações, além de um contato direto para conversar sobre seu projeto.</p>
<h2>Projetos conceito</h2>
<p><strong>Helena Vasques, Vex Fitness e Vex Construtora</strong> são projetos conceito da Norte Autoral para empresas fictícias. Eles demonstram direção visual, navegação e interações. Nomes, ofertas, preços e depoimentos dessas páginas fazem parte da apresentação fictícia.</p>
<h2>Demonstrações da base de referência</h2>
<p>Velorah, Lithos, Clínica Vértice, Convix, Áureo, Margô, Instituto Liminar, Verene e Estúdio Linha foram preservados da base visual de referência. A versão anterior e o artigo sobre JD Andrade também são referências dessa base.</p>
<p>Os links para JD Andrade e Dra. Ana Scatolin levam aos sites originais. Eles são referências preservadas, sem atribuição desses trabalhos à Norte Autoral.</p>
<h2>Seu projeto</h2>
<p>Uma contratação começa por uma conversa sobre o seu negócio. Escopo, ferramentas, conteúdo, prazo e acompanhamento são definidos na proposta de cada projeto. Os fluxos animados desta página ilustram possibilidades de trabalho.</p>
<h2>Contato</h2>
<p><a href="https://wa.me/5586999900235">WhatsApp: +55 86 99990-0235</a><br><a href="mailto:contatonorteautoral@gmail.com">contatonorteautoral@gmail.com</a><br><a href="https://instagram.com/gabrielholanda._" target="_blank" rel="noopener">Instagram: @gabrielholanda._</a></p>`
  }
};
for (const [route, data] of Object.entries(pages)) {
  const other = route === 'privacy' ? '<a href="/terms">Sobre o portfólio</a>' : '<a href="/privacy">Privacidade</a>';
  const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${data.title} — Norte Autoral</title><meta name="description" content="${data.description}"><link href="/vendor/fonts.googleapis.com/css2-e2d224bd0e2a.css" rel="stylesheet"><link rel="icon" href="/assets/norte-autoral/favicon.svg"><style>${css}</style></head>
<body><header><a class="brand" href="/">Norte Autoral</a><nav><a href="/">Início</a>${other}</nav></header><main><div class="kicker">Norte Autoral</div><h1>${data.title}</h1><p class="updated">Versão: 9 de outubro de 2026</p>${data.content}</main><footer><span>© 2026 Norte Autoral · Gabriel Holanda</span><a href="/#contato">Conversar sobre meu projeto →</a></footer></body></html>`;
  await writeFile(resolve(publicRoot, route + '.html'), html, 'utf8');
}
let index = await readFile(resolve(publicRoot, 'index.html'), 'utf8');
const screenshots = {
  'helena-hero.jpg': 'helena-vasques-01-hero.jpg',
  'helena-atuacao.jpg': 'helena-vasques-02-situacoes.jpg',
  'helena-sobre.jpg': 'helena-vasques-03-atuacao.jpg',
  'helena-contato.jpg': 'helena-vasques-04-advogada.jpg',
  'helena-mobile.jpg': 'helena-vasques-mobile.png',
  'vex-fitness-hero.jpg': 'vex-fitness-desktop.png',
  'vex-fitness-mobile.jpg': 'vex-fitness-mobile.png'
};
for (const [old, next] of Object.entries(screenshots)) index = index.replaceAll('/assets/norte-autoral/cases/' + old, '/assets/norte-autoral/cases/' + next);
index = index.replace(/(href="\/cases\/(?:helena-vasques|vex-fitness)\.html") target="_blank" rel="noopener"/g, '$1');
await writeFile(resolve(publicRoot, 'index.html'), index, 'utf8');
console.log('Páginas de informação e links dos conceitos atualizados.');
