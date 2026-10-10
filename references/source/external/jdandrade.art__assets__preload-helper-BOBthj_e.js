import{a as e,c as t}from"./site-D_Y69rip.js";import{a as n,o as r,s as i}from"./cats-CAlqJlt_.js";var a=e=>String(e).startsWith(`/uploads/`),o=e=>{let t=String(e).split(`/`).pop().replace(/\.[a-z0-9]+$/i,``);return a(e)?t.replace(/-[0-9a-f]{6}$/,``):t},s=(e,t)=>{if(!e||!t)return!1;let n=`${o(e)}-sm`;return o(t)===(a(t)?n.slice(0,48):n)},c=(e,t)=>s(e,t)?`${t} 800w, ${e} 1600w`:``,l={arte:`(max-aspect-ratio: 5/4) 66vw, 32vw`,design:`(max-aspect-ratio: 5/4) 66vw, 37vw`,livros:`(max-aspect-ratio: 5/4) 66vw, 28vw`,panel:`(max-aspect-ratio: 5/4) 66vw, 64vw`},u=(e=``)=>String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),d=(e=``)=>u(e).replace(/\*\*(.+?)\*\*/g,`<strong>$1</strong>`).replace(/\*(.+?)\*/g,`<em>$1</em>`),f=(e=``)=>/^https?:/.test(e)?` target="_blank" rel="noopener"`:``,p=`<svg><use href="#i-arrow-ne" /></svg>`,m=(e=``)=>/wa\.me|whatsapp/i.test(e),h=e=>document.querySelector(e),g=!1,_=e=>g=!!e,v=(e,t=``)=>g?` data-edit="${e}" data-ph="${u(t)}"`:``,y=e=>g?` data-img="${e}"`:``,b=e=>g?` data-sec="${e}"`:``,x=e=>g?u(e):d(e),S=e=>g||!!e;function C(e,t,n,r){document.querySelectorAll(`[data-bind="${e}"]`).forEach(e=>{e.innerHTML=t,g&&n&&(e.dataset.edit=n,e.dataset.ph=r||``)})}function w(e,t,n,r){let i=c(t,n);i?(e.setAttribute(`sizes`,r),e.getAttribute(`srcset`)!==i&&e.setAttribute(`srcset`,i)):e.removeAttribute(`srcset`),e.getAttribute(`src`)!==t&&e.setAttribute(`src`,t)}function T(e){(e?.cards||[]).forEach((e,t)=>{let n=h(`.card--${e.key===`design`?`forest`:e.key}`);if(!n)return;let r=n.querySelector(`.card__label b`);r&&e.label&&(r.textContent=e.label),e.label&&n.setAttribute(`aria-label`,e.label),g&&(n.dataset.img=`hero.cards.${t}.image`,r&&Object.assign(r.dataset,{edit:`hero.cards.${t}.label`,ph:`Texto`}));let i=n.querySelector(`[data-hero-img="${e.key}"]`);i&&(e.key===`design`&&(n.classList.toggle(`has-image`,!!e.image),i.hidden=!e.image,e.image||n.querySelectorAll(`img[data-src]:not([src])`).forEach(e=>{e.setAttribute(`srcset`,e.dataset.srcset),e.setAttribute(`src`,e.dataset.src)})),e.image&&w(i,e.image,e.thumb,l[e.key]))})}function E(e){let t=h(`[data-panel-tabs]`),n=h(`[data-panel-link]`);if(!t||!n)return;let r=Math.min(e.active??0,e.tabs.length-1);t.innerHTML=e.tabs.map((e,t)=>`<li><button role="tab" aria-selected="${t===r}" data-tab="${t}">${u(e.label)}</button></li>`).join(``),n.querySelectorAll(`.panel__img`).forEach(e=>e.remove()),n.insertAdjacentHTML(`afterbegin`,e.tabs.map((e,t)=>`<img class="panel__img${t===r?` is-active`:``}" src="${u(e.image)}"${c(e.image,e.thumb)?` srcset="${u(c(e.image,e.thumb))}" sizes="${l.panel}"`:``} alt="${u(e.alt||e.label)}"${e.whiteBg?` style="background:#fff"`:``} loading="lazy" decoding="async"${y(`panel.tabs.${t}.image`)} />`).join(``)),n.setAttribute(`href`,e.tabs[r]?.link||`#arte`),C(`panel-kicker`,u(e.kicker),`panel.kicker`,`Rótulo`),C(`panel-text`,u(e.tabs[r]?.text),`panel.tabs.${r}.text`,`Texto da aba`)}function D(n){let r=h(`[data-design]`);r&&n&&(C(`design-lead`,x(n.lead),`design.lead`,`Texto da seção`),document.querySelectorAll(`[data-bind-href="behance"]`).forEach(e=>e.href=n.behance),r.innerHTML=n.items.map((r,i)=>`<a class="dcard" href="${u(e(r.url||n.behance))}"${f(r.url||n.behance)} data-cursor="${/^https?:/.test(r.url||n.behance)?`Behance`:t(`Abrir`)}"${b(`design.items.${i}`)}>
        <span class="dcard__media"><img src="${u(r.image)}" alt="${u(r.title)}" loading="lazy"${y(`design.items.${i}.image`)} /></span>
        <span class="dcard__cap"><small${v(`design.items.${i}.category`,`Categoria`)}>${u(r.category)}</small><strong${v(`design.items.${i}.title`,`Título`)}>${u(r.title)}</strong></span>
      </a>`).join(``))}function O(e,n){let r=(e?.items||[]).map((e,t)=>({...e,k:t})).filter(e=>g||e.cover||e.title);if(!r.length)return``;let i=`books.${n}.episodes`;return`<div class="episodes">
    <p class="episodes__title"><b${v(`${i}.title`,`Título`)}>${u(e.title||t(`Episódios`))}</b> ${S(e.note)?`<span${v(`${i}.note`,`Observação`)}>${u(e.note)}</span>`:``}</p>
    <ol class="episodes__list">${r.map(e=>`<li><a href="${u(e.url||`#`)}"${f(e.url)}>
          <span class="episodes__cover"><img src="${u(e.cover)}" alt="" loading="lazy"${y(`${i}.items.${e.k}.cover`)} /><i><svg><use href="#i-play" /></svg></i></span>
          <span class="episodes__name"${v(`${i}.items.${e.k}.title`,`Título do episódio`)}>${u(e.title)}</span>
        </a></li>`).join(``)}</ol>
  </div>`}var k=(e,t=[])=>{let n=e.project??e.id;return n?t.find(e=>e.id===n):null};function A(n,r){let a=h(`[data-books]`);a&&(a.innerHTML=n.map((n,a)=>{let o=`books.${a}`,s=(n.facts||[]).map((e,t)=>({...e,k:t})).filter(e=>e.label||e.value),c=n.soundtrack&&n.soundtrack.discs?.length?n.soundtrack:null,l=k(n,r);return`<article class="book${a%2?` book--flip`:``}" data-book${b(o)}>
        <div class="book__stage" data-book-stage style="--glow:${u(n.glow||`#d1d600`)}">
          <div class="book3d" data-book3d data-cover="${u(n.cover)}" style="--spine:${u(n.spine||`#231a47`)};--edge:#efe7da"${y(`${o}.cover`)}>
            <div class="book3d__front"></div><div class="book3d__spine"></div><div class="book3d__pages"></div><div class="book3d__back"></div>
          </div>
          ${n.sideArt?`<img class="book__art${n.sideArtCutout?` book__art--cutout`:``}" src="${u(n.sideArt)}" alt="" aria-hidden="true" loading="lazy"${y(`${o}.sideArt`)} />`:``}
        </div>
        <div class="book__info">
          ${S(n.meta)?`<p class="book__meta"${v(`${o}.meta`,`Gênero · ano`)}>${u(n.meta)}</p>`:``}
          <h3 class="book__title"><span${v(`${o}.title`,`Título`)}>${u(n.title)}</span>${S(n.subtitle)?`<small${v(`${o}.subtitle`,`Subtítulo`)}>${u(n.subtitle)}</small>`:``}</h3>
          ${S(n.credit)?`<p class="book__credit"${v(`${o}.credit`,`Crédito (opcional)`)}>${u(n.credit)}</p>`:``}
          ${n.tags?.length?`<ul class="book__tags">${n.tags.map(e=>`<li>${u(e)}</li>`).join(``)}</ul>`:``}
          <p class="book__synopsis"${v(`${o}.synopsis`,`Sinopse`)}>${x(n.synopsis)}</p>
          ${s.length?`<dl class="book__facts">${s.map(e=>`<div><dt${v(`${o}.facts.${e.k}.label`,`Nome`)}>${u(e.label)}</dt><dd${v(`${o}.facts.${e.k}.value`,`Valor`)}>${u(e.value)}</dd></div>`).join(``)}</dl>`:``}
          <div class="book__actions">
            ${n.buy?.url?`<a class="btn" href="${u(n.buy.url)}"${f(n.buy.url)}><span${v(`${o}.buy.label`,`Texto do botão`)}>${u(n.buy.label||t(`Comprar`))}</span> ${p}</a>`:``}
            ${l?`<a class="btn btn--ghost btn--project" href="${u(e(i(l.id)))}" data-cursor="${t(`Abrir`)}">${t(`Conheça o projeto`)} ${p}</a>`:``}
            ${n.artFilter?`<a class="btn btn--ghost" href="#arte" data-filter-link="${u(n.artFilter)}">${t(`Ver a arte do livro`)}</a>`:``}
          </div>
          ${O(n.episodes,a)}
          ${c?`<div class="soundtrack">
            <p class="soundtrack__title"><b${v(`${o}.soundtrack.title`,`Título`)}>${u(c.title||t(`Trilha sonora`))}</b> ${S(c.note)?`<span${v(`${o}.soundtrack.note`,`Observação`)}>${u(c.note)}</span>`:``}</p>
            <ol class="soundtrack__list">${c.discs.map(e=>`<li><a href="${u(e.url)}"${f(e.url)}><i class="vinyl"></i><span>${u(e.label)}</span>${u(e.name)}</a></li>`).join(``)}</ol>
            ${c.all?.url?`<a class="soundtrack__all" href="${u(c.all.url)}"${f(c.all.url)}><svg><use href="#i-play" /></svg> ${u(c.all.label||t(`Ouvir tudo`))}</a>`:``}
          </div>`:``}
        </div>
      </article>`}).join(``))}var j={original:`Original`,cliente:`Cliente`};function M(r){let a=h(`[data-projetos]`);a&&r&&(C(`projetos-lead`,x(r.lead),`projetos.lead`,`Texto da seção`),a.innerHTML=r.items.map((r,a)=>`<a class="pcard${a===0?` pcard--big`:``}" href="${u(e(i(r.id)))}" data-cursor="${t(`Abrir`)}"${b(`projetos.items.${a}`)}>
        <span class="pcard__media"><img src="${u(a===0?r.cover:r.thumb||r.cover)}" alt="" loading="lazy"${a===0||!r.thumb?` style="object-position:${n(r)}"`:``} /></span>
        <span class="pcard__body">
          <small><b class="pcard__kind pcard__kind--${u(r.kind)}">${u(j[r.kind]?t(j[r.kind]):r.kind)}</b> <span${v(`projetos.items.${a}.tagline`,`Linha de cima`)}>${u(r.tagline)}</span></small>
          <strong${v(`projetos.items.${a}.title`,`Título`)}>${u(r.title)}</strong>
          <span class="pcard__sum"${v(`projetos.items.${a}.summary`,`Resumo`)}>${u(r.summary)}</span>
        </span>
        <span class="pcard__go">${p}</span>
      </a>`).join(``))}function N(e){let n=h(`[data-comissoes]`);if(!n)return;let r=[`busto`,`meio`,`corpo`],i=(e.extras||[]).map((e,t)=>({...e,k:t})).filter(e=>e.name),a=(e.album?.items||[]).filter(e=>e.image),o=e=>g?u(e):u(e).replace(/(\+|R\$|US\$|\$|€) +/g,`$1&nbsp;`);n.innerHTML=`
    <div class="comissoes__grid">
      <div class="comissoes__figure" data-crop="corpo" data-cursor="${t(`Escolher`)}">
        <img src="${u(e.figure)}" alt="${t(`Personagem de corpo inteiro usada como exemplo de enquadramento`)}" loading="lazy"${y(`comissoes.figure`)} />
        <span class="crop crop--busto"><em>${u(e.tiers[0]?.name||t(`busto`))}</em></span>
        <span class="crop crop--meio"><em>${u(e.tiers[1]?.name||t(`meio-corpo`))}</em></span>
        <span class="crop crop--corpo"><em>${u(e.tiers[2]?.name||t(`corpo inteiro`))}</em></span>
        <span class="crop-frame" aria-hidden="true"><em><b>${u(e.tiers[2]?.name||t(`corpo inteiro`))}</b> <span>${o(e.tiers[2]?.price||``)}</span></em></span>
        <button type="button" class="tiers__step tiers__step--prev" data-tier-step="-1" aria-label="${t(`Enquadramento anterior`)}"><svg><use href="#i-arrow" /></svg></button>
        <button type="button" class="tiers__step tiers__step--next" data-tier-step="1" aria-label="${t(`Próximo enquadramento`)}"><svg><use href="#i-arrow" /></svg></button>
      </div>
      <div class="comissoes__info">
        <div class="comissoes__head brandbar">
          <p class="eyebrow"${v(`comissoes.eyebrow`,`Rótulo`)}>${u(e.eyebrow)}</p>
          <h2 class="display display--sm"><span${v(`comissoes.title`,`Título`)}>${u(e.title)}</span></h2>
          <p class="section__lead"${v(`comissoes.lead`,`Texto de apoio`)}>${x(e.lead)}</p>
        </div>
        <div class="tiers__tabs" role="tablist" aria-label="${t(`Enquadramento`)}">${e.tiers.slice(0,3).map((e,t)=>`<button type="button" role="tab" data-tier-tab aria-selected="${t===2}"${t===2?` class="is-active"`:``}><b>${u(e.name)}</b><span>${o(e.price)}</span></button>`).join(``)}</div>
        <ul class="tiers" data-tiers role="radiogroup" aria-label="${t(`Enquadramento`)}">
          ${e.tiers.slice(0,3).map((e,t)=>`<li data-tier="${r[t]}" role="radio" aria-checked="${t===2}" tabindex="${t===2?0:-1}"${t===2?` class="is-active"`:``}><div><h3${v(`comissoes.tiers.${t}.name`,`Nome`)}>${u(e.name)}</h3><p${v(`comissoes.tiers.${t}.desc`,`Descrição`)}>${u(e.desc)}</p></div><strong${v(`comissoes.tiers.${t}.price`,`Preço`)}>${o(e.price)}</strong></li>`).join(``)}
        </ul>
        ${i.length?`<div class="extras">
          <p class="extras__title"${v(`comissoes.extrasTitle`,`Adicionais`)}>${u(e.extrasTitle||t(`Adicionais`))}</p>
          <ul>${i.map(e=>`<li><div><h4${v(`comissoes.extras.${e.k}.name`,`Nome`)}>${u(e.name)}</h4>${S(e.desc)?`<p${v(`comissoes.extras.${e.k}.desc`,`Descrição`)}>${u(e.desc)}</p>`:``}</div><strong${v(`comissoes.extras.${e.k}.price`,`Preço`)}>${o(e.price)}</strong></li>`).join(``)}</ul>
        </div>`:``}
        ${S(e.note)?`<p class="tiers__note"><svg><use href="#i-burst" /></svg> <span${v(`comissoes.note`,`Observação`)}>${u(e.note)}</span></p>`:``}
        ${e.cta?.url?`<a class="btn btn--big" href="${u(e.cta.url)}"${f(e.cta.url)}><span${v(`comissoes.cta.label`,`Texto do botão`)}>${u(e.cta.label)}</span> ${p}</a>`:``}
      </div>
    </div>
    ${a.length?`<div class="album">
      <header class="album__head brandbar"><h3${v(`comissoes.album.title`,`Título do álbum`)}>${u(e.album.title||t(`Álbum de comissões`))}</h3>${S(e.album.lead)?`<p${v(`comissoes.album.lead`,`Texto`)}>${u(e.album.lead)}</p>`:``}</header>
      <div class="album__track" data-album>${a.map((e,n)=>`<button class="album__item" type="button" data-album-i="${n}" data-cursor="${t(`Ver`)}"><img src="${u(e.thumb||e.image)}" alt="${u(e.caption)}" loading="lazy" />${e.caption?`<span>${u(e.caption)}</span>`:``}</button>`).join(``)}</div>
    </div>`:``}`}function P(n){let i=h(`[data-sobre]`);i&&(i.innerHTML=`
    <div class="portrait" data-portrait data-cursor-hide>
      <img class="portrait__art" src="${u(n.art)}" alt="${t(`Autorretrato ilustrado de J.D. Andrade`)}" width="1100" height="1100" loading="lazy" draggable="false" />
      <img class="portrait__photo" src="${u(n.photo)}" alt="${t(`Foto de João Daniel Andrade`)}" width="1100" height="1100" loading="lazy" draggable="false" />
      <span class="portrait__handle" aria-hidden="true"><i><svg><use href="#i-drag" /></svg></i></span>
      <span class="portrait__tag portrait__tag--photo" aria-hidden="true">${t(`Foto`)}</span>
      <span class="portrait__tag portrait__tag--art" aria-hidden="true">${t(`Ilustração`)}</span>
      <span class="portrait__hint" aria-hidden="true">${t(`passe o mouse: por trás do traço`)}</span>
      ${S(n.badge)?`<span class="sobre__badge"${v(`sobre.badge`,`Selo`)}>${u(n.badge)}</span>`:``}
    </div>
    <div class="sobre__text">
      <div class="brandbar">
        <p class="eyebrow"${v(`sobre.eyebrow`,`Rótulo`)}>${u(n.eyebrow)}</p>
        <h2 class="sobre__title"><b${v(`sobre.title`,`Início do título`)}>${u(n.title)}</b> <span${v(`sobre.highlight`,`Nome`)}>${u(n.highlight)}</span>.</h2>
        ${n.paragraphs.map((e,t)=>`<p${v(`sobre.paragraphs.${t}`,`Parágrafo`)}>${x(e)}</p>`).join(``)}
      </div>
      <ul class="sobre__links">${n.links.map((t,n)=>`<li><a href="${u(e(t.url))}"${f(t.url)} style="--bg:${u(t.color||`#d1d600`)};--fg:${r(t.color||`#d1d600`)}"><span${v(`sobre.links.${n}.label`,`Texto`)}>${u(t.label)}</span> ${p}</a></li>`).join(``)}</ul>
    </div>`)}function F(t){let n=h(`[data-contato]`);if(!n)return;n.innerHTML=`
    <div class="footer__text">
      <div class="brandbar">
        <p class="eyebrow"${v(`contato.eyebrow`,`Rótulo`)}>${u(t.eyebrow)}</p>
        <h2 class="footer__cta"><b${v(`contato.line1`,`Linha 1`)}>${u(t.line1)}</b><br/><b${v(`contato.line2`,`Linha 2`)}>${u(t.line2)}</b> <span${v(`contato.highlight`,`Destaque`)}>${u(t.highlight)}</span></h2>
      </div>
      <div class="footer__links">
        ${t.links.map((t,n)=>{let r=m(t.url);return`<a class="btn ${t.primary?`btn--big`:r?`btn--whats`:`btn--ghost`}" href="${u(e(t.url))}"${f(t.url)}>${r?`<svg><use href="#i-whatsapp" /></svg>`:``}<span${v(`contato.links.${n}.label`,`Texto`)}>${u(t.label)}</span>${t.primary?` ${p}`:``}</a>`}).join(``)}
      </div>
    </div>
`;let r=h(`[data-contato-art]`);r&&(r.hidden=!t.art,t.art&&(r.src=t.art)),C(`city`,u(t.city),`contato.city`,`Cidade`)}var I=e=>e.map((e,n)=>{let r=e.images[0],i=Math.round(r.h/r.w*720);return`<button class="work" data-i="${n}" data-cats="${u((e.cats||[]).join(` `))}" data-origin="${u(e.origin||``)}" data-ratio="${(r.h/r.w).toFixed(4)}" data-cursor="${t(`Ver`)}">
        <img src="${u(r.thumb)}" width="720" height="${i}" alt="${u(e.title)}" loading="lazy" decoding="async" />
        ${e.images.length>1?`<span class="work__count">${e.images.length} ${t(`imagens`)}</span>`:``}
        ${e.process?`<span class="work__play"><svg><use href="#i-play" /></svg>${t(`processo`)}</span>`:``}
        <span class="work__cap"><small>${u(e.serie)}</small><strong>${u(e.title)}</strong></span>
      </button>`}).join(``);function L(e){T(e.hero),E(e.panel),C(`arte-lead`,x(e.arte.lead),`arte.lead`,`Texto da seção`),document.querySelectorAll(`[data-bind-href="artstation"]`).forEach(t=>t.href=e.arte.artstation),D(e.design),C(`livros-lead`,x(e.livros.lead),`livros.lead`,`Texto da seção`),A(e.books,e.projetos?.items),M(e.projetos),N(e.comissoes),P(e.sobre),F(e.contato)}function R(e=``){let t=e.trim();if(!t)return``;let n;return(n=/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/.exec(t))?`<iframe src="https://www.youtube-nocookie.com/embed/${n[1]}?autoplay=1&rel=0&modestbranding=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="Processo"></iframe>`:(n=/vimeo\.com\/(?:video\/)?(\d+)/.exec(t))?`<iframe src="https://player.vimeo.com/video/${n[1]}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Processo"></iframe>`:(n=/instagram\.com\/(?:[\w.]+\/)?(p|reel|reels|tv)\/([\w-]+)/.exec(t))?`<iframe class="is-ig" src="https://www.instagram.com/${n[1]===`reels`?`reel`:n[1]}/${n[2]}/embed/" allowfullscreen scrolling="no" title="Processo"></iframe>`:/\.(mp4|webm|mov|m4v)(\?|$)/i.test(t)?`<video src="${u(t)}" controls autoplay playsinline></video>`:`<a class="btn" href="${u(t)}" target="_blank" rel="noopener">Assistir ao processo</a>`}var z=`modulepreload`,B=function(e){return`/`+e},V={},H=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=B(t,n),t=s(t),t in V)return;V[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:z,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};export{L as a,I as c,f as i,R as n,d as o,u as r,_ as s,H as t};