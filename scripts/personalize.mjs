import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = resolve(project, 'public');
const portfolio = resolve(project, '../Portfolio-Norte-Autoral-GitHub');
const indexPath = resolve(publicRoot, 'index.html');
let html = await readFile(indexPath, 'utf8');
if (html.includes('data-profile="norte-autoral"')) {
  console.log('A identidade Norte Autoral já foi aplicada. Edite public/index.html para próximos ajustes.');
  process.exit(0);
}
await mkdir(resolve(project, 'references/customization-base'), { recursive: true });
await copyFile(indexPath, resolve(project, 'references/customization-base/index.html'));
await mkdir(resolve(publicRoot, 'assets/norte-autoral'), { recursive: true });
await copyFile(resolve(portfolio, 'imagens/gabriel-holanda.jpg'), resolve(publicRoot, 'assets/norte-autoral/gabriel-holanda.jpg'));
await copyFile(resolve(portfolio, 'imagens/logo-n.png'), resolve(publicRoot, 'assets/norte-autoral/logo-n.png'));
await copyFile(resolve(portfolio, 'favicon.svg'), resolve(publicRoot, 'assets/norte-autoral/favicon.svg'));
await copyFile(resolve(portfolio, 'og.png'), resolve(publicRoot, 'assets/norte-autoral/og.png'));

function replace(old, next) {
  if (!html.includes(old)) throw new Error('Trecho não encontrado: ' + old.slice(0, 100));
  html = html.replace(old, next);
}
replace('<html lang="pt-BR">', '<html lang="pt-BR" data-profile="norte-autoral">');
html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>Norte Autoral | Sites, sistemas e automações para negócios</title>');
html = html.replace(/<meta name="description"[^>]*>/, '<meta name="description" content="Gabriel Holanda, da Norte Autoral. Sites, presença digital, inteligência artificial, automações e sistemas para sua empresa aparecer, atender melhor e organizar a operação.">');
html = html.replace(/<link rel="canonical"[^>]*>/, '<link rel="canonical" href="https://norte-autoral.vercel.app/">');
html = html.replace(/<meta (?:property|name)="(?:og|twitter):(?:url|title|description|image|site_name)"[^>]*>/g, tag => {
  const field = tag.match(/(?:og|twitter):([^"']+)/)[1];
  const values = { url:'https://norte-autoral.vercel.app/', title:'Norte Autoral | Sites, sistemas e automações', description:'Soluções digitais para sua empresa aparecer, atender melhor e organizar a operação.', image:'https://norte-autoral.vercel.app/og.png', site_name:'Norte Autoral' };
  return tag.replace(/content="[^"]*"/, 'content="' + values[field] + '"');
});
let schemaAdded = false;
html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, () => {
  if (schemaAdded) return '';
  schemaAdded = true;
  const schema = { '@context':'https://schema.org', '@type':'ProfessionalService', name:'Norte Autoral', description:'Soluções digitais para negócios: sites, presença digital, inteligência artificial, automações e sistemas.', url:'https://norte-autoral.vercel.app/', telephone:'+55-86-99990-0235', email:'contatonorteautoral@gmail.com', image:'https://norte-autoral.vercel.app/og.png', founder:{'@type':'Person',name:'Gabriel Holanda'}, sameAs:['https://instagram.com/gabrielholanda._'], hasOfferCatalog:{'@type':'OfferCatalog',name:'Soluções para negócios',itemListElement:['Sites e aplicações','Presença e aquisição digital','Inteligência artificial e automação','Sistemas e integrações'].map(name=>({'@type':'Offer',itemOffered:{'@type':'Service',name}}))} };
  return '<script type="application/ld+json">\n' + JSON.stringify(schema, null, 2) + '\n</script>';
});
html = html.replace(/<link rel="icon"[^>]*>/, '<link rel="icon" type="image/svg+xml" href="/assets/norte-autoral/favicon.svg">');

const brand = '<span class="brand-lockup"><img src="/assets/norte-autoral/logo-n.png" width="32" height="32" alt=""><span>Norte Autoral</span></span>';
html = html.replace(/<svg\b[^>]*aria-label="Sabec°"[\s\S]*?<\/svg>/g, brand);
replace('<span class="pill"><span class="pulse"></span>Agência de IA em Londrina</span>', '<span class="pill"><span class="pulse"></span>Soluções digitais para negócios</span>');
replace('<span class="coords">23,31° S · 51,16° O</span>', '<span class="coords">Gabriel Holanda · Norte Autoral</span>');
replace('Eu construo o site, os sistemas e as automações do seu negócio. E deixo instalado o Sabec/Os, que continua criando, publicando e aprendendo.', 'Eu construo sites, sistemas e automações para sua empresa aparecer, atender melhor e organizar a operação. Cada solução começa pelo que o seu negócio precisa.');
html = html.replaceAll('O site você vê pronto antes de pagar', 'Tecnologia com a cara do seu negócio');
html = html.replaceAll('O Sabec/Os cuida dos posts, sempre com a sua aprovação.', 'A automação conecta as ferramentas e reduz tarefas repetitivas.');
replace('Um site que você <em>vê pronto</em> antes de decidir.', 'Um site com a <em>sua cara</em> e o seu negócio em primeiro lugar.');
replace('Eu monto o site antes da primeira reunião. Você abre no celular, rola, mostra pra quem quiser. <strong>Só depois decide.</strong> Role a página e veja um site nascer.', 'Eu começo entendendo o seu negócio, organizo o conteúdo e construo a experiência. Você acompanha a prévia e os ajustes. Role a página e veja um site nascer.');
html = html.replaceAll('Registrado no seu CPF desde o primeiro dia. O endereço é seu.', 'Seu endereço, sua marca. A configuração é definida com você.');
html = html.replaceAll('Pixel, público e conversões do Meta e do Google prontos pra rodar.', 'Estrutura de campanhas e conversões alinhada ao escopo do projeto.');

// The scrolly structure and scene IDs stay intact; the work shown is Gabriel's.
replace('<div class="kick rv">Trabalho real</div>', '<div class="kick rv">Portfólio Norte Autoral</div>');
replace('Sites que já estão <em>no ar</em>.', 'Conceitos que mostram <em>o que construímos</em>.');
replace('<span class="feat-badge"><span>Destaque</span></span>', '<span class="feat-badge"><span>Projeto conceito</span></span>');
replace('jdandrade<span>.art</span>', 'Helena <span>Vasques</span>');
replace('João Daniel Andrade · ilustrador, designer e escritor', 'Advocacia · estudo de identidade e presença digital');
replace('O nome dele gigante, no clima das obras.', 'Uma presença que transmite confiança.');
replace('Vermelho, azul e granulado, com as ilustrações dele entrando em cena logo na primeira tela.', 'Tipografia editorial, retrato e uma apresentação clara do escritório logo na primeira tela.');
replace('02 · A arte', '02 · A atuação');
replace('O trabalho vem na frente.', 'O serviço vem antes da ferramenta.');
replace('Pintura digital, quadrinhos, personagens e capas, separados por filtro.', 'Áreas de atuação organizadas para o visitante entender onde o escritório pode ajudar.');
replace('03 · A galeria', '03 · A experiência');
replace('Uma parede de obras feitas à mão.', 'Clareza do começo ao contato.');
replace('O site organiza e sai da frente. Quem aparece é o trabalho do JD.', 'Conteúdo, navegação e chamadas de contato com espaço para a identidade do projeto.');
replace('04 · No ar</span><h5>A primeira versão', '04 · Explore</span><h5>A primeira versão');
replace('A primeira versão foi publicada no mesmo dia.', 'Abra e navegue pelo projeto completo.');
replace('Feito com Claude Code e Higgsfield. O passo a passo, com os prompts, está aberto pra quem quiser ver.', 'Um estudo de conceito para uma empresa fictícia, criado para demonstrar direção visual e desenvolvimento.');
replace('href="https://jdandrade.art"', 'href="/cases/helena-vasques.html"');
replace('href="/site-do-jd">Ver como eu fiz', 'href="#gallery">Ver outros projetos');
replace('<b>https</b>jdandrade.art', '<b>conceito</b>Helena Vasques');
const featureAssets = [
  ['jd-capa.jpg','helena-hero.jpg','Hero do projeto conceito Helena Vasques'],
  ['jd-arte.jpg','helena-atuacao.jpg','Áreas de atuação do projeto conceito Helena Vasques'],
  ['jd-galeria.jpg','helena-sobre.jpg','Apresentação do projeto conceito Helena Vasques'],
  ['jd-galeria-2.jpg','helena-contato.jpg','Contato do projeto conceito Helena Vasques'],
  ['jd-celular.jpg','helena-mobile.jpg','Helena Vasques no celular'],
];
for (const [old,next,alt] of featureAssets) html = html.replace(new RegExp('src="/assets/cases/' + old.replace('.', '\\.') + '"([^>]*?)alt="[^"]*"'), 'src="/assets/norte-autoral/cases/' + next + '"$1alt="' + alt + '"');
replace('<b>https</b>draanascatolin.com.br', '<b>conceito</b>Vex Fitness');
html = html.replace(/src="\/assets\/cases\/ana-capa.jpg"([^>]*?)alt="[^"]*"/, 'src="/assets/norte-autoral/cases/vex-fitness-hero.jpg"$1alt="Hero do projeto conceito Vex Fitness"');
html = html.replace(/src="\/assets\/cases\/ana-celular.jpg"([^>]*?)alt="[^"]*"/, 'src="/assets/norte-autoral/cases/vex-fitness-mobile.jpg"$1alt="Vex Fitness no celular"');
replace('<span class="case-k">Cliente</span>', '<span class="case-k">Projeto conceito</span>');
replace('<h4>Dra. Ana Scatolin</h4>', '<h4>Vex Fitness</h4>');
replace('Implantes · Guarapuava, PR', 'Academia · experiência digital');
replace('Um site claro e calmo, pensado pro celular, com o WhatsApp logo na primeira tela.', 'Uma experiência de energia e movimento, com modalidades, estrutura e contato organizados para o celular.');
replace('href="https://draanascatolin.com.br"', 'href="/cases/vex-fitness.html"');
replace('Abrir draanascatolin.com.br', 'Abrir Vex Fitness');
replace('Demonstrações por segmento. E a versão anterior deste site.', 'Projetos conceito e demonstrações por segmento.');
const ownCards = [
 ['helena-vasques','Helena Vasques','advocacia'],['vex-fitness','Vex Fitness','academia'],['vex-construtora','Vex Construtora','construção']
].map(([slug,name,segment])=>`      <a class="gcard own-concept" href="/cases/${slug}.html"><div class="win"><div class="win-h"><span class="dots"><i></i><i></i><i></i></span><div class="url"><b>conceito</b>${name}</div></div><div class="shot"><img src="/assets/norte-autoral/cards/${slug}.jpg" width="1440" height="900" alt="Hero do projeto conceito ${name}" loading="lazy" decoding="async"></div></div><div class="cap"><b>${name}</b><span>${segment}</span></div><small class="card-kind">Conceito Norte Autoral</small></a>`).join('\n');
replace('<div class="gallery" id="gallery">', '<div class="gallery" id="gallery">\n' + ownCards);
html = html.replace(/(<a class="gcard"[^>]*?) target="_blank" rel="noopener"/g, '$1');
replace('Sites de demonstração. O seu sai com a sua marca, o seu conteúdo e as suas fotos. Mais trabalho em', 'Os três conceitos Norte Autoral são estudos para empresas fictícias. As outras demonstrações foram preservadas da base de referência. O seu projeto recebe sua marca, seu conteúdo e suas fotos. Mais trabalho em');
const heroSlugs = ['velorah-hero','lithos-hero','dentista-clinica-vertice','convix-hero','aureo-arquitetura','confeitaria-margo','instituto-liminar','verene-odontologia','arquitetura-estudio-linha'];
for (const slug of heroSlugs) html = html.replace(new RegExp('src="/assets/portfolio-thumbs/' + slug + '.jpg"[^>]*'), 'src="/assets/portfolio-heroes/' + slug + '.jpg" width="1440" height="900" alt="Hero da demonstração ' + slug + '" loading="lazy" decoding="async"');
html = html.replaceAll('<b>Liminar</b><span>advocacia</span>', '<b>Liminar</b><span>ensino em psicanálise</span>');

replace('O funcionário de marketing <em>do seu negócio</em>.', 'Sua rotina conectada. <em>Você no controle</em>.');
replace('Você conta o que faz uma vez. Ele cria os posts com a sua marca, você aprova, ele publica, mede o que rendeu três dias depois e aprende o que funciona. <strong>Nada sai sem a sua aprovação.</strong>', 'Atendimento, conteúdo e ferramentas podem trabalhar juntos. Eu desenho automações e soluções com IA a partir do seu processo. <strong>O painel abaixo mostra um fluxo ilustrativo</strong>, adaptável ao escopo do seu negócio.');
html = html.replaceAll('Instalado só pra você', 'Desenhado para sua rotina').replaceAll('Servidor dedicado, com a memória e a identidade do seu negócio.', 'Ferramentas e integrações escolhidas conforme a necessidade do projeto.');
replace('<span>Sabec/Os<small>Clínica Vértice</small></span>', '<span>Norte Autoral<small>Exemplo de automação</small></span>');
html = html.replaceAll('A rotina está no lugar. Falta o post que precisa sair toda semana.', 'A rotina pode andar melhor quando as ferramentas conversam entre si.');
html = html.replaceAll('Quando é site, ele fica pronto antes da reunião. Quando é sistema, eu mostro o fluxo desenhado em cima do seu processo.', 'Eu construo a prévia do site ou desenho o fluxo do sistema em cima do seu processo. Você acompanha o que está sendo criado.');
html = html.replaceAll('Sem orçamento de ida e volta, sem apresentação de 40 slides. Você vê a coisa pronta e decide em cima dela.', 'A conversa define o problema, a proposta organiza a entrega e a prévia ajuda você a avaliar o caminho.');
html = html.replaceAll('Contrato de 1 página com tudo explícito: o que está incluso e o que não está. Com nota fiscal.', 'Escopo alinhado antes de publicar: o que será entregue, quais ajustes entram e como o projeto será acompanhado.');
html = html.replaceAll('1 página · com nota fiscal', 'Escopo · entrega · acompanhamento');
html = html.replaceAll('página de contrato, com nota fiscal', 'escopo definido para o projeto').replaceAll('página de contrato', 'escopo alinhado');
replace('<img src="/assets/portfolio-thumbs/portrait.jpeg" width="800" height="999" alt="Diogo Sabec, quem constrói a Sabec°"', '<img src="/assets/norte-autoral/gabriel-holanda.jpg" width="819" height="1024" alt="Gabriel Holanda, à frente da Norte Autoral"');
replace('Diogo Sabec · Londrina, PR', 'Gabriel Holanda · Norte Autoral');
replace('Quem constrói a Sabec° é o <strong>Diogo Sabec</strong>. Formado em Ciência da Computação, trabalha como QA sênior: a pessoa que garante que o sistema não quebra na mão de quem usa.', 'À frente da Norte Autoral está <strong>Gabriel Holanda</strong>. O contato direto ajuda a entender como sua empresa trabalha e o que o projeto precisa resolver.');
replace('Coordena uma equipe de comunicação com dezenas de voluntários e tem repertório sólido em design. O Sabec/Os nasceu desse cruzamento e roda a operação da própria Sabec° antes de rodar a sua.', 'Antes de definir ferramentas, eu entendo o problema. A partir disso, planejo o site, sistema ou automação que faz sentido para o seu negócio, combinando estratégia, design e tecnologia.');
replace('<div class="creds rv"><span>Ciência da Computação</span><span>QA sênior</span><span>Design</span><span>Construtor do Sabec/Os</span></div>', '<div class="creds rv"><span>Sites e aplicações</span><span>Automação e integrações</span><span>Inteligência artificial</span><span>Soluções para negócios</span></div>');
html = html.replaceAll('Respondo no seu WhatsApp em até 1 dia útil, com o que eu faria primeiro. Se fizer sentido, marcamos a conversa.', 'Me conte o que sua empresa precisa. A conversa começa pelo WhatsApp e ajuda a definir o primeiro passo do projeto.');
html = html.replace(/<p class="cal">Ou marque direto:[\s\S]*?<\/p>/, '<p class="cal">Ou escreva: <a href="mailto:contatonorteautoral@gmail.com">contatonorteautoral@gmail.com</a>.</p>');
replace('<p class="fsub">Quatro campos. Eu leio tudo.</p>', '<p class="fsub">Sua mensagem abre no WhatsApp para você revisar e enviar.</p>');
replace('<button type="submit">Enviar <span aria-hidden="true">→</span></button>', '<button type="submit">Abrir WhatsApp <span aria-hidden="true">→</span></button>');
html = html.replace(/<section id="app"[\s\S]*?<\/section>/, `<section id="app" aria-label="Presença e aquisição digital"><div class="wrap presence-copy"><div class="kick">Presença e aquisição digital</div><h2>Seu negócio precisa ser encontrado.</h2><p>O site faz parte de uma presença maior. A Norte Autoral também trabalha com posicionamento digital, Google, SEO e campanhas alinhadas ao que sua empresa oferece.</p><ul><li><strong>Presença digital:</strong> organizar informações, canais e conteúdo para apresentar o negócio com clareza.</li><li><strong>Aquisição:</strong> estruturar campanhas no Google e na Meta conforme público, oferta e orçamento.</li><li><strong>Operação:</strong> conectar sites, formulários, atendimento e sistemas para reduzir trabalho manual.</li></ul><p>Entregas, ferramentas e acompanhamento são definidos para cada projeto, sem promessa de resultado que dependa de fatores externos.</p><p class="presence-links"><a href="/privacy">Privacidade</a><a href="/terms">Sobre este portfólio</a></p></div></section>`);
html = html.replaceAll('https://wa.me/5543991334218', 'https://wa.me/5586999900235');
html = html.replaceAll('https://instagram.com/sabec.dev', 'https://instagram.com/gabrielholanda._').replaceAll('@sabec.dev', '@gabrielholanda._');
html = html.replaceAll('mailto:diogovanzosabec@gmail.com', 'mailto:contatonorteautoral@gmail.com');
html = html.replace(/<a class="frow" href="https:\/\/linkedin.com\/in\/diogo-sabec"[\s\S]*?<\/a>/, '<a class="frow" href="https://norte-autoral.vercel.app/" target="_blank" rel="noopener"><span>Portfólio anterior</span><span>↗</span></a>');
html = html.replaceAll('© 2026 Sabec° · Diogo Sabec MEI · Londrina, PR', '© 2026 Norte Autoral · Gabriel Holanda');
html = html.replaceAll('Versão anterior do site ↗', 'Referência do layout ↗');
html = html.replaceAll('Sabec/Os', 'Automação').replaceAll('Sabec°', 'Norte Autoral');
html = html.replaceAll('<b>Norte Autoral v3</b><span>site anterior da Norte Autoral</span>', '<b>Base de referência</b><span>versão anterior da Sabec</span>').replaceAll('Versão anterior do site da Norte Autoral', 'Versão anterior da base Sabec');
html = html.replaceAll('O sistema operacional do seu negócio', 'Soluções para negócios');
html = html.replaceAll('<div class="foot-word" aria-hidden="true">Automação</div>', '<div class="foot-word" aria-hidden="true">Norte Autoral</div>');
html = html.replaceAll('Build <b>005</b>', 'Portfólio <b>001</b>');

const oldFormStart = html.indexOf('/* ============ formulário');
const oldFormEnd = html.indexOf('/* ============ cenas guiadas pelo scroll', oldFormStart);
if (oldFormStart < 0 || oldFormEnd < 0) throw new Error('Formulário original não identificado');
html = html.slice(0, oldFormStart) + `/* ============ formulário: mensagem revisável no WhatsApp ============ */
(function(){
  var form=document.getElementById('lead-form');if(!form)return;
  form.addEventListener('submit',function(e){
    e.preventDefault();var f=e.target;
    var fields=[f.nome,f.whatsapp,f.instagram,f.negocio];
    var missing=fields.filter(function(x){return !x.value.trim();});
    if(missing.length){missing.forEach(function(x){x.style.borderColor='#FFB4A2';});missing[0].focus();return;}
    if(f.botcheck&&f.botcheck.checked)return;
    var interest=(f.querySelector('input[name=interesse]:checked')||{}).value||'Ainda não sei';
    var message=['Olá, Gabriel! Vim pelo portfólio da Norte Autoral.','Nome: '+f.nome.value.trim(),'WhatsApp: '+f.whatsapp.value.trim(),'Instagram/site: '+f.instagram.value.trim(),'Interesse: '+interest,'Meu negócio e projeto: '+f.negocio.value.trim()].join('\\n');
    var url='https://wa.me/5586999900235?text='+encodeURIComponent(message);
    window.open(url,'_blank','noopener,noreferrer');
    var feedback=form.querySelector('.form-feedback');
    if(!feedback){feedback=document.createElement('p');feedback.className='form-feedback';feedback.setAttribute('role','status');form.appendChild(feedback);}
    feedback.textContent='Mensagem pronta. Revise e envie no WhatsApp. ';
    var fallback=document.createElement('a');fallback.href=url;fallback.target='_blank';fallback.rel='noopener noreferrer';fallback.textContent='Abrir mensagem';feedback.appendChild(fallback);
  });
  form.addEventListener('input',function(e){if(e.target.style)e.target.style.borderColor='';});
})();

` + html.slice(oldFormEnd);

replace('</head>', '<link rel="stylesheet" href="/assets/norte-autoral/profile.css">\n</head>');
// Keep the two original outbound references, without presenting them as own work.
replace('<div class="foot-legal">', '<p class="reference-links">Referências da base: <a href="https://jdandrade.art" target="_blank" rel="noopener">JD Andrade</a> · <a href="https://draanascatolin.com.br" target="_blank" rel="noopener">Dra. Ana Scatolin</a></p>\n    <div class="foot-legal">');
await writeFile(indexPath, html, 'utf8');
console.log('Identidade e conteúdo público de Norte Autoral / Gabriel Holanda aplicados.');
