/* Local portfolio navigation. The published animation bundles remain unchanged. */
(() => {
  'use strict';
  const slug = location.pathname.split('/portfolio/')[1]?.split('/')[0] || (/^\/v3(?:\.html)?\/?$/.test(location.pathname) ? 'base-v3' : null);
  const names = {
    'velorah-hero':'Velorah', 'lithos-hero':'Lithos', 'convix-hero':'Convix',
    'dentista-clinica-vertice':'Clínica Vértice', 'aureo-arquitetura':'Áureo Arquitetura',
    'confeitaria-margo':'Margô', 'instituto-liminar':'Instituto Liminar',
    'verene-odontologia':'Verene Odontologia', 'arquitetura-estudio-linha':'Estúdio Linha',
    'base-v3':'Norte Autoral · Versão alternativa'
  };
  if (!names[slug]) return;
  const mediaPerformance = document.createElement('script');
  mediaPerformance.src = '/assets/media-performance.js';
  document.head.append(mediaPerformance);
  const name = names[slug];
  const compact = ['velorah-hero','lithos-hero','convix-hero'].includes(slug);
  const back = document.createElement('a');
  back.className = 'mazy-demo-return'; back.href = '/#sites';
  back.textContent = '← Portfólio'; back.setAttribute('aria-label','Voltar ao portfólio Norte Autoral');
  document.body.append(back);
  // The footer credit is also a return link; keep the floating control off its text.
  const credit = [...document.querySelectorAll('footer a[href="/"]')].find(link => link.textContent.trim() === 'Norte Autoral · Gabriel Holanda');
  if (credit && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      back.hidden = entries[0].isIntersecting;
    }).observe(credit.parentElement);
  }
  let dialog;
  const summaries = {
    'Estúdio':'Uma proposta visual para um estúdio digital, com vídeo, tipografia editorial e efeitos de vidro.',
    'Sobre':'Velorah é um conceito visual que demonstra a experiência de um estúdio digital.',
    'Diário':'Esta opção apresenta a navegação de uma área editorial do conceito Velorah.',
    'Curso':'O conceito Lithos apresenta uma plataforma de aprendizado com uma experiência visual em geologia.',
    'Guias de campo':'Esta opção demonstra a navegação de uma área de guias de campo da plataforma Lithos.',
    'Geologia':'A hero combina um cenário 3D animado, camadas de rocha e uma interface de exploração.',
    'Planos':'Esta opção demonstra a área de planos do conceito Lithos.',
    'Tour ao vivo':'Observe o cenário 3D animado da hero. A experiência visual foi preservada nesta demonstração.',
    'Criar conta':'Esta é uma demonstração da interface Lithos. Para criar uma plataforma com cadastro, converse sobre seu projeto.',
    'Começar a escavar':'A experiência visual da hero mostra o conceito de exploração Lithos. Continue explorando ou converse sobre um projeto com essa direção.',
    'Recursos':'O painel da hero apresenta uma proposta de interface para acompanhar indicadores e metas de uma agência.',
    'Sobre Convix':'Convix é um conceito visual para uma plataforma de agências de relações públicas.',
    'Páginas':'Esta opção demonstra a navegação entre áreas de uma plataforma.',
    'Iniciar Jornada':'Gostou da direção visual de Velorah? Converse com Norte Autoral para criar um projeto com a sua identidade.',
    'Começar agora':'Esta é uma demonstração da interface Convix. Converse com Norte Autoral sobre o desenvolvimento da sua plataforma.',
    'Acesso antecipado':'Esta é uma demonstração da interface Convix. O cadastro e o acesso de usuários podem fazer parte do seu projeto.',
    'Salvar':'As metas deste painel fazem parte da demonstração visual. Converse com Norte Autoral para desenvolver um painel conectado aos seus dados.',
    'Cancelar':'Este painel apresenta uma demonstração da interface de metas.',
    'Este mês':'Este controle apresenta a seleção de período do painel de demonstração.',
    'Mês até hoje (MTD)':'Este controle apresenta a comparação entre períodos do painel de demonstração.'
  };
  function show(title, text, menu) {
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'mazy-demo-dialog';
      dialog.setAttribute('aria-labelledby','mazy-demo-title');
      dialog.setAttribute('aria-describedby','mazy-demo-description');
      dialog.innerHTML = '<button class="mazy-demo-close" type="button" aria-label="Fechar demonstração">×</button><p class="mazy-demo-eyebrow"></p><h2 id="mazy-demo-title"></h2><p id="mazy-demo-description"></p><div class="mazy-demo-menu"></div><div class="mazy-demo-actions"><a href="/#contato">Conversar com Norte Autoral ↗</a><a href="/#sites">Voltar ao portfólio</a></div>';
      dialog.querySelector('.mazy-demo-close').addEventListener('click',()=>dialog.close());
      dialog.addEventListener('click',e=>{ if (e.target===dialog) { const r=dialog.getBoundingClientRect(); if (e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
      document.body.append(dialog);
    }
    dialog.querySelector('.mazy-demo-eyebrow').textContent = 'Demonstração · '+name;
    dialog.querySelector('h2').textContent = title;
    dialog.querySelector('#mazy-demo-description').textContent = text;
    const list = dialog.querySelector('.mazy-demo-menu'); list.replaceChildren();
    (menu||[]).forEach(label=>{
      const item=document.createElement('button');item.type='button';item.textContent=label;
      item.addEventListener('click',()=>show(label,summaries[label]||'Esta opção faz parte da navegação de demonstração.'));
      list.append(item);
    });
    if (!dialog.open) dialog.showModal();
  }
  function textOf(el) { return el.innerText?.trim().replace(/\s+/g,' ') || el.textContent.trim().replace(/\s+/g,' '); }
  function top() { window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); }
  function inertAction(label) {
    if(label==='Início'){top();return;}
    if(label==='Sobre'&&slug==='convix-hero')label='Sobre Convix';
    show(label, summaries[label] || `Esta opção faz parte da interface de demonstração ${name}. Para desenvolver um site com essa experiência, converse com Norte Autoral.`);
  }
  if (slug === 'convix-hero') {
    const enhanceNav = () => {
      document.querySelectorAll('#root li').forEach(el=>{
        if(['Início','Recursos','Sobre','Páginas'].includes(textOf(el))) {
          el.dataset.mazyDemoNav='true';el.setAttribute('role','button');el.tabIndex=0;
        }
      });
    };
    enhanceNav();
    new MutationObserver(enhanceNav).observe(document.getElementById('root'),{childList:true,subtree:true});
    document.addEventListener('keydown',e=>{
      if ((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-mazy-demo-nav]')) {e.preventDefault();inertAction(textOf(e.target));}
    });
  }
  document.addEventListener('click', e => {
    const link=e.target.closest('a');
    if(link && !link.closest('.mazy-demo-dialog') && !link.classList.contains('mazy-demo-return')) {
      const href=link.getAttribute('href')||'';
      if (slug !== 'base-v3' && (/^(?:https?:\/\/(?:wa\.me|api\.whatsapp\.com)|mailto:|tel:)/i.test(href) || /^https?:\/\/[^/]*instagram\.com\/(?:suamarca|sua_clinica|sua-clinica)/i.test(href))) {
        e.preventDefault();e.stopPropagation();
        show('Contato de demonstração',`Os contatos de ${name} são exemplos deste site de demonstração. Para criar um projeto com a sua marca e os seus contatos, converse com Norte Autoral.`);return;
      }
      if(compact && href==='#'){e.preventDefault();inertAction(textOf(link));return;}
    }
    if (!compact || e.target.closest('.mazy-demo-dialog')) return;
    const nav=e.target.closest('[data-mazy-demo-nav]');
    if(nav){e.preventDefault();inertAction(textOf(nav));return;}
    const button=e.target.closest('#root button');
    if(!button)return;
    const aria=button.getAttribute('aria-label');
    if (aria==='Abrir menu' && slug==='lithos-hero') {
      e.preventDefault();show('Explorar Lithos','Escolha uma área do conceito.', ['Curso','Guias de campo','Geologia','Planos','Tour ao vivo','Criar conta']);return;
    }
    // Preserve Convix's existing React mobile-menu toggle.
    if (aria==='Abrir menu') return;
    if (aria==='Fechar') {e.preventDefault();show('Painel de demonstração','Este painel faz parte da experiência visual Convix. Volte ao portfólio para explorar os outros projetos.');return;}
    const label=textOf(button);
    if(label){e.preventDefault();inertAction(label);}
  },true);
  document.addEventListener('submit',e=>{
    if (e.target.closest('.mazy-demo-dialog')) return;
    e.preventDefault();e.stopPropagation();show('Formulário de demonstração','Este formulário apresenta a experiência do site. Converse com Norte Autoral sobre um projeto com formulário e envio configurado.');
  },true);
})();
