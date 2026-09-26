document.addEventListener('DOMContentLoaded', () => {
  const solucoesDados = [
    {
      id: '01',
      titulo: 'Crescimento digital',
      rotulo: 'Busca',
      contadorTexto: 'SOLUÇÃO 1 DE 6 · CRESCIMENTO DIGITAL',
      legenda: 'Fernanda procura fisioterapia perto de casa. A clínica aparece antes das outras.',
      mockupHtml: `
        <div class="vx-painel-peca rounded-lg sm:rounded-full border border-risco bg-piche px-3 sm:px-4 py-2.5 flex min-w-0 items-center gap-2.5" style="animation-delay: 0ms;">
          <svg class="size-3.5 text-prata flex-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path>
          </svg>
          <span class="min-w-0 break-words text-[12px] leading-snug text-prata sm:text-[13px]">clínica de fisioterapia asa sul brasília</span>
        </div>

        <div class="vx-painel-peca mt-3 rounded-lg border border-risco-forte bg-piche p-3.5" style="animation-delay: 220ms;">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-[14px] font-medium text-neve">Clínica Vitá · Fisioterapia e pilates</p>
              <p class="mt-1 text-[12px] text-prata">★ 4,9 · 214 avaliações · Asa Sul</p>
            </div>
            <span class="font-mono text-[10.5px] tracking-[0.12em] text-prata uppercase">Perfil</span>
          </div>
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="inline-flex h-7 items-center rounded-md border border-risco px-3 text-[11px] text-prata">Agendar</span>
            <span class="inline-flex h-7 items-center rounded-md border border-risco px-3 text-[11px] text-prata">Rota</span>
            <span class="inline-flex h-7 items-center rounded-md border border-risco px-3 text-[11px] text-prata">Site</span>
          </div>
        </div>

        <div class="vx-painel-peca mt-2.5 space-y-2 opacity-40" style="animation-delay: 420ms;">
          <div class="rounded-lg border border-risco px-4 py-3">
            <p class="text-[13px] text-prata">Fisio Sul Reabilitação</p>
            <p class="mt-1 text-[11px] text-aco">★ 4,3 · 26 avaliações · Asa Sul</p>
          </div>
          <div class="rounded-lg border border-risco px-4 py-3">
            <p class="text-[13px] text-prata">Clínica Movimento</p>
            <p class="mt-1 text-[11px] text-aco">★ 4,1 · 36 avaliações · Águas Claras</p>
          </div>
        </div>

        <p class="vx-painel-peca mt-3 text-[11.5px] text-prata" style="animation-delay: 560ms;">Fernanda abriu o primeiro</p>
      `
    },
    {
      id: '02',
      titulo: 'Sites e lojas virtuais',
      rotulo: 'Navegador',
      contadorTexto: 'SOLUÇÃO 2 DE 6 · SITES E LOJAS VIRTUAIS',
      legenda: 'Ela abre o site pelo celular e vê, em dois segundos, que dá para marcar sem ligar.',
      mockupHtml: `
        <div class="vx-painel-peca flex items-center gap-2 rounded-md border border-risco bg-piche px-3 py-2" style="animation-delay: 0ms;">
          <span class="size-1.5 rounded-full bg-emerald-400/70"></span>
          <span class="font-mono text-[11px] text-prata">clinicavita.com.br</span>
        </div>

        <div class="vx-painel-peca mt-3 overflow-hidden rounded-lg border border-risco" style="animation-delay: 180ms;">
          <div class="flex items-center justify-between border-b border-risco bg-piche px-3.5 py-2.5">
            <span class="font-titulo text-[12px] font-semibold tracking-tight text-neve">Clínica Vitá</span>
            <div class="flex items-center gap-3">
              <span class="hidden text-[10.5px] text-aco sm:inline">Serviços</span>
              <span class="hidden text-[10.5px] text-aco sm:inline">Equipe</span>
              <span class="hidden text-[10.5px] text-aco sm:inline">Convênios</span>
              <span class="rounded bg-rosa-fundo px-2.5 py-1 text-[10.5px] font-medium text-white">Agendar</span>
            </div>
          </div>
          <div class="px-4 py-5 bg-breu">
            <p class="vx-painel-peca font-titulo text-[19px] leading-tight font-semibold tracking-tight text-neve" style="animation-delay: 320ms;">
              Fisioterapia e pilates<br>na Asa Sul.
            </p>
            <p class="vx-painel-peca mt-2 text-[12.5px] leading-relaxed text-prata" style="animation-delay: 420ms;">
              Avaliação com hora marcada. Atendimento até as 20h.
            </p>
            <div class="vx-painel-peca mt-4 flex flex-wrap items-center gap-2.5" style="animation-delay: 520ms;">
              <span class="inline-flex h-8 items-center rounded-md bg-rosa-fundo px-3.5 text-[12px] font-medium text-white">Agendar avaliação</span>
              <span class="inline-flex h-8 items-center rounded-md border border-risco px-3.5 text-[12px] text-prata">Ver planos</span>
            </div>
            <div class="vx-painel-peca mt-4 flex flex-wrap gap-2 border-t border-risco pt-3.5" style="animation-delay: 650ms;">
              <span class="rounded-full border border-risco px-2.5 py-1 text-[10.5px] text-aco">Convênios</span>
              <span class="rounded-full border border-risco px-2.5 py-1 text-[10.5px] text-aco">Estacionamento</span>
              <span class="rounded-full border border-risco px-2.5 py-1 text-[10.5px] text-aco">Sábado até 13h</span>
            </div>
          </div>
        </div>

        <div class="vx-painel-peca mt-3 flex items-center justify-between" style="animation-delay: 800ms;">
          <span class="text-[11.5px] text-prata">Abriu em 1,1s</span>
          <span class="text-[11.5px] text-prata">Celular · 4G</span>
        </div>
      `
    },
    {
      id: '03',
      titulo: 'Inteligência artificial',
      rotulo: 'WhatsApp',
      contadorTexto: 'SOLUÇÃO 3 DE 6 · INTELIGÊNCIA ARTIFICIAL',
      legenda: '22h10. O horário que ela quer está ocupado. O atendimento oferece outro e marca sozinho.',
      mockupHtml: `
        <div class="grid h-full gap-4 sm:grid-cols-[minmax(0,1fr)_10.5rem]">
          <div class="flex flex-col justify-end space-y-2.5">
            <div class="vx-painel-peca ml-auto max-w-[88%] rounded-2xl rounded-br-sm bg-chumbo px-3.5 py-2.5" style="animation-delay: 0ms;">
              <p class="text-[12.5px] leading-snug text-neve">Oi, consigo marcar uma avaliação na terça, 15h?</p>
              <p class="mt-1 text-right font-mono text-[10px] text-prata">22h10</p>
            </div>
            <div class="vx-painel-peca max-w-[92%] rounded-2xl rounded-bl-sm border border-risco bg-piche px-3.5 py-2.5" style="animation-delay: 560ms;">
              <p class="text-[12.5px] leading-snug text-prata">Boa noite, Fernanda. Esse horário já está ocupado. Tenho quarta, 9h ou terça às 17h30.</p>
            </div>
            <div class="vx-painel-peca ml-auto max-w-[88%] rounded-2xl rounded-br-sm bg-chumbo px-3.5 py-2.5" style="animation-delay: 1120ms;">
              <p class="text-[12.5px] leading-snug text-neve">Pode ser quarta, 9h.</p>
            </div>
            <div class="vx-painel-peca max-w-[92%] rounded-2xl rounded-bl-sm border border-risco bg-piche px-3.5 py-2.5" style="animation-delay: 1680ms;">
              <p class="text-[12.5px] leading-snug text-prata">Marcado com a Dra. Helena. Mandei a confirmação e o endereço.</p>
            </div>
          </div>
          <div class="flex h-full flex-col rounded-lg border border-risco bg-piche p-3.5">
            <p class="font-mono text-[10.5px] tracking-[0.12em] text-prata uppercase">Agenda</p>
            <div class="mt-3 space-y-2.5">
              <div class="vx-painel-peca" style="animation-delay: 620ms;">
                <p class="text-[11.5px] text-aco line-through">Terça · 15h</p>
                <p class="text-[10px] text-aco">Ocupado</p>
              </div>
              <div class="vx-painel-peca" style="animation-delay: 700ms;">
                <p class="text-[11.5px] text-prata">Terça · 17h30</p>
                <p class="text-[10px] text-aco">Livre</p>
              </div>
              <div class="vx-painel-peca rounded-md border border-risco-forte px-2.5 py-2 bg-chumbo/50" style="animation-delay: 1740ms;">
                <p class="text-[11.5px] text-neve">Quarta · 9h</p>
                <p class="mt-0.5 flex items-center gap-1.5 text-[10px] text-prata">
                  <svg class="size-3 text-emerald-400" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg>
                  Fernanda
                </p>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: '04',
      titulo: 'Automações',
      rotulo: 'Automação',
      contadorTexto: 'SOLUÇÃO 4 DE 6 · AUTOMAÇÕES',
      legenda: 'A consulta marcada entra na agenda, na ficha do paciente e no lembrete. Ninguém digitou nada.',
      mockupHtml: `
        <div class="solucao-fluxo-mobile sm:hidden">
          <div class="grid grid-cols-2 gap-2">
            <span class="rounded-md border border-risco bg-piche px-3 py-2 text-center text-[11px] text-prata">Site</span>
            <span class="rounded-md border border-risco bg-piche px-3 py-2 text-center text-[11px] text-prata">WhatsApp</span>
          </div>
          <div class="solucao-fluxo-seta" aria-hidden="true">↓</div>
          <div class="mx-auto w-fit rounded-md border border-risco-forte bg-chumbo px-4 py-2.5 text-[12px] font-medium text-neve">Automação</div>
          <div class="solucao-fluxo-seta" aria-hidden="true">↓</div>
          <div class="solucao-fluxo-saidas grid grid-cols-1 gap-2">
            <span class="rounded-md border border-risco bg-piche px-3 py-2 text-center text-[11px] text-prata">Agenda</span>
            <span class="rounded-md border border-risco bg-piche px-3 py-2 text-center text-[11px] text-prata">Ficha da paciente</span>
            <span class="rounded-md border border-risco bg-piche px-3 py-2 text-center text-[11px] text-prata">Lembrete</span>
          </div>
        </div>
        <div class="hidden min-h-[260px] items-center justify-center sm:flex">
          <div class="vx-painel-peca relative h-[260px] w-[460px] origin-center scale-[0.78] md:scale-90 lg:scale-100" style="animation-delay: 0ms;">
            <svg viewBox="0 0 460 260" class="absolute inset-0 size-full" fill="none" aria-hidden="true">
              <path d="M 78 44 C 140 44, 150 130, 196 130" stroke="#33333A" stroke-width="1.25"></path>
              <path d="M 92 216 C 148 216, 158 130, 196 130" stroke="#33333A" stroke-width="1.25"></path>
              <path d="M 268 130 C 312 130, 322 44, 372 44" stroke="#33333A" stroke-width="1.25"></path>
              <path d="M 268 130 L 372 130" stroke="#33333A" stroke-width="1.25"></path>
              <path d="M 268 130 C 312 130, 322 216, 372 216" stroke="#33333A" stroke-width="1.25"></path>
            </svg>
            <span class="vx-fluxo-ponto" style="offset-path: path('M 78 44 C 140 44, 150 130, 196 130'); animation-delay: 0ms;"></span>
            <span class="vx-fluxo-ponto" style="offset-path: path('M 92 216 C 148 216, 158 130, 196 130'); animation-delay: 520ms;"></span>
            <span class="vx-fluxo-ponto" style="offset-path: path('M 268 130 C 312 130, 322 44, 372 44'); animation-delay: 1500ms;"></span>
            <span class="vx-fluxo-ponto" style="offset-path: path('M 268 130 L 372 130'); animation-delay: 1700ms;"></span>
            <span class="vx-fluxo-ponto" style="offset-path: path('M 268 130 C 312 130, 322 216, 372 216'); animation-delay: 1900ms;"></span>
            <span style="left: 0px; top: 30px;" class="absolute rounded-md border border-risco bg-piche px-2.5 py-1.5 text-[11px] whitespace-nowrap text-prata">Site</span>
            <span style="left: 0px; top: 202px;" class="absolute rounded-md border border-risco bg-piche px-2.5 py-1.5 text-[11px] whitespace-nowrap text-prata">WhatsApp</span>
            <span class="absolute top-[112px] left-[196px] rounded-md border border-risco-forte bg-chumbo px-3 py-2 text-[11.5px] whitespace-nowrap text-neve shadow-md">Automação</span>
            <span style="left: 374px; top: 30px;" class="absolute rounded-md border border-risco bg-piche px-2.5 py-1.5 text-[11px] whitespace-nowrap text-prata">Agenda</span>
            <span style="left: 374px; top: 116px;" class="absolute rounded-md border border-risco bg-piche px-2.5 py-1.5 text-[11px] whitespace-nowrap text-prata">Ficha da paciente</span>
            <span style="left: 374px; top: 202px;" class="absolute rounded-md border border-risco bg-piche px-2.5 py-1.5 text-[11px] whitespace-nowrap text-prata">Lembrete</span>
          </div>
        </div>
      `
    },
    {
      id: '05',
      titulo: 'Sistemas sob medida',
      rotulo: 'Sistema',
      contadorTexto: 'SOLUÇÃO 5 DE 6 · SISTEMAS SOB MEDIDA',
      legenda: 'De manhã, a clínica abre uma tela só e vê o dia inteiro: agenda, ocupação, faltas e retornos.',
      mockupHtml: `
        <div class="vx-painel-peca flex flex-wrap items-center justify-between gap-2" style="animation-delay: 0ms;">
          <p class="font-titulo text-[15px] font-semibold tracking-tight text-neve">Painel da clínica</p>
          <span class="font-mono text-[10.5px] text-prata">quarta, 20 de agosto</span>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
          <div class="vx-painel-peca rounded-md border border-risco bg-piche px-2.5 py-2.5" style="animation-delay: 200ms;">
            <p class="font-mono text-[10.5px] tracking-[0.1em] text-prata uppercase">Hoje</p>
            <p class="mt-1 font-titulo text-[17px] font-semibold text-neve">18</p>
          </div>
          <div class="vx-painel-peca rounded-md border border-risco bg-piche px-2.5 py-2.5" style="animation-delay: 280ms;">
            <p class="font-mono text-[10.5px] tracking-[0.1em] text-prata uppercase">Ocupação</p>
            <p class="mt-1 font-titulo text-[17px] font-semibold text-neve">86%</p>
          </div>
          <div class="vx-painel-peca rounded-md border border-risco bg-piche px-2.5 py-2.5" style="animation-delay: 360ms;">
            <p class="font-mono text-[10.5px] tracking-[0.1em] text-prata uppercase">Faltas</p>
            <p class="mt-1 font-titulo text-[17px] font-semibold text-neve">1</p>
          </div>
          <div class="vx-painel-peca rounded-md border border-risco bg-piche px-2.5 py-2.5" style="animation-delay: 440ms;">
            <p class="font-mono text-[10.5px] tracking-[0.1em] text-prata uppercase">Retornos</p>
            <p class="mt-1 font-titulo text-[17px] font-semibold text-neve">7</p>
          </div>
        </div>

        <div class="vx-painel-peca mt-4 rounded-lg border border-risco bg-piche p-3.5" style="animation-delay: 560ms;">
          <p class="font-mono text-[10.5px] tracking-[0.1em] text-prata uppercase">Atendimentos na semana</p>
          <div class="mt-3 flex h-16 items-end gap-2">
            <div class="vx-painel-peca flex-1 rounded-sm bg-risco-forte" style="height: 52%; animation-delay: 640ms;"></div>
            <div class="vx-painel-peca flex-1 rounded-sm bg-risco-forte" style="height: 70%; animation-delay: 710ms;"></div>
            <div class="vx-painel-peca flex-1 rounded-sm bg-risco-forte" style="height: 88%; animation-delay: 780ms;"></div>
            <div class="vx-painel-peca flex-1 rounded-sm bg-risco-forte" style="height: 64%; animation-delay: 850ms;"></div>
            <div class="vx-painel-peca flex-1 rounded-sm bg-risco-forte" style="height: 96%; animation-delay: 920ms;"></div>
            <div class="vx-painel-peca flex-1 rounded-sm bg-risco-forte" style="height: 40%; animation-delay: 990ms;"></div>
            <div class="vx-painel-peca flex-1 rounded-sm bg-risco-forte" style="height: 8%; animation-delay: 1060ms;"></div>
          </div>
          <div class="mt-1.5 flex gap-2">
            <span class="flex-1 text-center font-mono text-[10px] text-aco">seg</span>
            <span class="flex-1 text-center font-mono text-[10px] text-aco">ter</span>
            <span class="flex-1 text-center font-mono text-[10px] text-aco">qua</span>
            <span class="flex-1 text-center font-mono text-[10px] text-aco">qui</span>
            <span class="flex-1 text-center font-mono text-[10px] text-aco">sex</span>
            <span class="flex-1 text-center font-mono text-[10px] text-aco">sáb</span>
            <span class="flex-1 text-center font-mono text-[10px] text-aco">dom</span>
          </div>
        </div>

        <div class="vx-painel-peca mt-4 space-y-2" style="animation-delay: 1180ms;">
          <div class="flex items-center justify-between gap-3 rounded-md border border-risco px-3 py-2">
            <span class="flex min-w-0 items-baseline gap-3">
              <span class="font-mono text-[10.5px] text-prata">09h00</span>
              <span class="text-[12.5px] text-neve">Fernanda M.</span>
            </span>
            <span class="shrink-0 text-[11px] text-aco">Avaliação</span>
          </div>
          <div class="flex items-center justify-between gap-3 rounded-md border border-risco px-3 py-2">
            <span class="flex min-w-0 items-baseline gap-3">
              <span class="font-mono text-[10.5px] text-prata">09h40</span>
              <span class="text-[12.5px] text-neve">Roberto S.</span>
            </span>
            <span class="shrink-0 text-[11px] text-aco">Retorno</span>
          </div>
        </div>
      `
    },
    {
      id: '06',
      titulo: 'Soluções por setor',
      rotulo: 'Catálogo',
      contadorTexto: 'SOLUÇÃO 6 DE 6 · SOLUÇÕES POR SETOR',
      legenda: 'O sistema da clínica não começou do zero: saiu de um CRM de saúde que já existia.',
      mockupHtml: `
        <div class="vx-painel-peca flex flex-wrap items-center justify-between gap-2" style="animation-delay: 0ms;">
          <p class="font-titulo text-[15px] font-semibold tracking-tight text-neve">Já desenvolvidos pela Norte Autoral</p>
          <span class="rounded-full border border-risco-forte px-3 py-1 text-[11.5px] font-medium text-neve bg-piche">Bases prontas</span>
        </div>

        <div class="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
          <div class="vx-painel-peca rounded-lg border border-risco-forte bg-chumbo px-3 py-2.5 transition-colors cursor-pointer hover:border-rosa/60" style="animation-delay: 220ms;">
            <div class="flex items-center justify-between">
              <p class="text-[12px] font-medium text-neve">CRM de Saúde</p>
              <svg class="size-3 text-emerald-400" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg>
            </div>
            <p class="mt-0.5 text-[10.5px] leading-snug text-prata">Clínicas e consultórios</p>
            <p class="mt-1.5 text-[9.5px] font-mono text-aco">✓ Base da Clínica Vitá</p>
          </div>

          <div class="vx-painel-peca rounded-lg border border-risco bg-piche px-3 py-2.5 transition-colors cursor-pointer hover:border-risco-forte" style="animation-delay: 330ms;">
            <p class="text-[12px] text-prata">CRM para Academias</p>
            <p class="mt-0.5 text-[10.5px] leading-snug text-aco">Box e academias</p>
          </div>

          <div class="vx-painel-peca rounded-lg border border-risco bg-piche px-3 py-2.5 transition-colors cursor-pointer hover:border-risco-forte" style="animation-delay: 440ms;">
            <p class="text-[12px] text-prata">CRM Imobiliário</p>
            <p class="mt-0.5 text-[10.5px] leading-snug text-aco">Construtoras e imobiliárias</p>
          </div>

          <div class="vx-painel-peca rounded-lg border border-risco bg-piche px-3 py-2.5 transition-colors cursor-pointer hover:border-risco-forte" style="animation-delay: 550ms;">
            <p class="text-[12px] text-prata">CRM Jurídico</p>
            <p class="mt-0.5 text-[10.5px] leading-snug text-aco">Escritórios de advocacia</p>
          </div>

          <div class="vx-painel-peca rounded-lg border border-risco bg-piche px-3 py-2.5 transition-colors cursor-pointer hover:border-risco-forte" style="animation-delay: 660ms;">
            <p class="text-[12px] text-prata">CRM Contábil</p>
            <p class="mt-0.5 text-[10.5px] leading-snug text-aco">Escritórios de contabilidade</p>
          </div>

          <div class="vx-painel-peca rounded-lg border border-risco bg-piche px-3 py-2.5 transition-colors cursor-pointer hover:border-risco-forte" style="animation-delay: 770ms;">
            <p class="text-[12px] text-prata">CRM para E-commerce</p>
            <p class="mt-0.5 text-[10.5px] leading-snug text-aco">Lojas virtuais</p>
          </div>
        </div>

        <p class="vx-painel-peca mt-4 text-[11.5px] text-prata leading-relaxed" style="animation-delay: 900ms;">
          A do seu setor provavelmente já existe. O que se paga é o ajuste ao seu negócio, não a invenção.
        </p>
      `
    }
  ];


  const abasBotoes = document.querySelectorAll('.solucao-trigger');
  const painelDeskContador = document.getElementById('painel-desktop-contador');
  const painelDeskConteudo = document.getElementById('painel-desktop-conteudo');
  const painelDeskTopo = document.getElementById('painel-desktop-topo');
  const painelDeskLegenda = document.getElementById('painel-desktop-legenda');

  function selecionarAba(index) {
    const item = solucoesDados[index];
    if (!item) return;

    abasBotoes.forEach((btn, i) => {
      const isSelected = i === index;
      btn.setAttribute('aria-expanded', isSelected ? 'true' : 'false');

      const numEl = btn.querySelector('.tab-num');
      const titleEl = btn.querySelector('.tab-titulo');
      const subEl = btn.querySelector('.tab-subtitulo');
      const itemEl = btn.closest('li');
      const bodyEl = itemEl?.querySelector('.tab-corpo');
      const mobileContainer = itemEl?.querySelector('.tab-mockup-mobile');

      if (isSelected) {
        if (numEl) { numEl.classList.remove('text-aco'); numEl.classList.add('text-rosa'); }
        if (titleEl) { titleEl.classList.remove('text-prata'); titleEl.classList.add('text-neve'); }
        if (subEl) { subEl.classList.remove('text-aco'); subEl.classList.add('text-prata'); }
        if (bodyEl) {
          bodyEl.classList.remove('grid-rows-[0fr]', 'opacity-0');
          bodyEl.classList.add('grid-rows-[1fr]', 'opacity-100', 'mt-4');
          bodyEl.style.gridTemplateRows = '1fr';
          bodyEl.style.opacity = '1';
        }
        if (mobileContainer) {
          mobileContainer.innerHTML = `
            <div class="solucao-demo-mobile overflow-hidden rounded-xl border border-risco bg-breu shadow-lg">
              <div class="flex items-center gap-2 border-b border-risco bg-piche px-3.5 py-2.5">
                <span class="size-2 rounded-full bg-risco-forte"></span>
                <span class="size-2 rounded-full bg-risco-forte"></span>
                <span class="size-2 rounded-full bg-risco-forte"></span>
                <span class="ml-2 font-mono text-[10.5px] tracking-[0.12em] text-prata uppercase">${item.rotulo}</span>
              </div>
              <div class="solucao-demo-conteudo p-3.5 sm:p-5">
                ${item.mockupHtml}
              </div>
            </div>
            <p class="mt-3 text-[13px] leading-relaxed text-prata">
              ${item.legenda}
            </p>
          `;
        }
      } else {
        if (numEl) { numEl.classList.remove('text-rosa'); numEl.classList.add('text-aco'); }
        if (titleEl) { titleEl.classList.remove('text-neve'); titleEl.classList.add('text-prata'); }
        if (subEl) { subEl.classList.remove('text-prata'); subEl.classList.add('text-aco'); }
        if (bodyEl) {
          bodyEl.classList.remove('grid-rows-[1fr]', 'opacity-100', 'mt-4');
          bodyEl.classList.add('grid-rows-[0fr]', 'opacity-0');
          bodyEl.style.gridTemplateRows = '0fr';
          bodyEl.style.opacity = '0';
        }
        if (mobileContainer) {
          mobileContainer.innerHTML = '';
        }
      }
    });

    if (painelDeskConteudo) {
      painelDeskConteudo.style.opacity = '0';
      painelDeskConteudo.style.transform = 'translateY(4px)';

      setTimeout(() => {
        if (painelDeskContador) painelDeskContador.textContent = item.contadorTexto;
        if (painelDeskTopo) painelDeskTopo.textContent = item.rotulo;
        if (painelDeskLegenda) painelDeskLegenda.textContent = item.legenda;

        painelDeskConteudo.innerHTML = item.mockupHtml;
        painelDeskConteudo.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        painelDeskConteudo.style.opacity = '1';
        painelDeskConteudo.style.transform = 'none';
      }, 120);
    }
  }

  if (abasBotoes && abasBotoes.length > 0) {
    abasBotoes.forEach((btn, index) => {
      btn.addEventListener('click', () => selecionarAba(index));
      btn.addEventListener('keydown', (event) => {
        const teclasNavegacao = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];
        if (!teclasNavegacao.includes(event.key)) return;

        event.preventDefault();
        let proximoIndex = index;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') proximoIndex = (index + 1) % abasBotoes.length;
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') proximoIndex = (index - 1 + abasBotoes.length) % abasBotoes.length;
        if (event.key === 'Home') proximoIndex = 0;
        if (event.key === 'End') proximoIndex = abasBotoes.length - 1;

        abasBotoes[proximoIndex].focus();
        selecionarAba(proximoIndex);
      });
    });

    // Inicializa com a primeira aba ativa e com as animações
    selecionarAba(0);
  }

  // Botão WhatsApp flutuante em telas menores.
  const whatsFlutuante = document.getElementById('whats-flutuante');

  function atualizarScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Botão flutuante de WhatsApp (visível em telas menores ao rolar)
    if (whatsFlutuante) {
      if (scrollY > 200) {
        whatsFlutuante.style.opacity = '1';
        whatsFlutuante.style.transform = 'translateY(0) scale(1)';
        whatsFlutuante.style.pointerEvents = 'auto';
      } else {
        whatsFlutuante.style.opacity = '0';
        whatsFlutuante.style.transform = 'translateY(14px) scale(0.85)';
        whatsFlutuante.style.pointerEvents = 'none';
      }
    }
  }

  window.addEventListener('scroll', atualizarScroll, { passive: true });
  atualizarScroll();

  const contatoForm = document.getElementById('form-contato');
  if (contatoForm) {
    contatoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('c-nome').value.trim();
      const whats = document.getElementById('c-whats').value.trim();
      const email = document.getElementById('c-email').value.trim();
      const servico = document.getElementById('c-servico').value;
      const mensagem = document.getElementById('c-mensagem').value.trim();

      let texto = `Olá! Vim pelo site da Norte Autoral e gostaria de conversar sobre um projeto.\n\n`;
      texto += `*Nome:* ${nome}\n`;
      if (whats) texto += `*WhatsApp:* ${whats}\n`;
      if (email) texto += `*E-mail:* ${email}\n`;
      if (servico) texto += `*Interesse:* ${servico}\n`;
      if (mensagem) texto += `*Mensagem:* ${mensagem}\n`;

      window.open(`https://wa.me/5586999900235?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    });
  }
});
