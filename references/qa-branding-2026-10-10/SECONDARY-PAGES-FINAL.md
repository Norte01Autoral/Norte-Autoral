# Revisão independente das páginas secundárias — 10/10/2026

Resultado: **aprovado no escopo verificado**, após os ajustes de contato e dos dois textos herdados. Revisão somente de leitura de `public/v3.html`, `public/site-do-jd.html` e do helper de navegação. Nenhum arquivo público foi editado por esta revisão.

## Método e cobertura

- Playwright com Chromium local, servidor `http://127.0.0.1:4173`.
- `/v3` e `/site-do-jd` carregados em **1440×900** e **390×844**, com inspeção do DOM, respostas HTTP, erros JavaScript e largura da página.
- Conferência estática dos caminhos locais em `src`, `href` e `poster`: **27 referências únicas em v3 e 10 no artigo**, todas existentes ou resolvidas pelas rotas HTML locais.
- Reteste do formulário e dos links próprios de WhatsApp/e-mail em v3 nas duas larguras. A navegação externa foi bloqueada pelo listener de QA após observar o comportamento do helper; nenhuma mensagem foi enviada.

## Identidade, links e recursos

- As quatro combinações de rota/largura retornaram **HTTP 200**, sem `pageerror`, falha de requisição ou resposta 4xx/5xx no carregamento observado.
- `scrollWidth` igual ao viewport: **1440** no desktop e **390** no celular. Nenhuma imagem já carregada apresentou dimensão natural zerada.
- Nome, logo N, foto e contatos de v3 pertencem à identidade atual Norte Autoral / Gabriel Holanda. O rodapé contém **Parnaíba, PI**.
- v3: título e metadata Norte Autoral/Norte/OS, canonical local `/v3`, Open Graph e Twitter com `/assets/norte-autoral/gabriel-holanda.jpg`, favicons próprios SVG/PNG/ICO. Metadata estruturada usa Parnaíba, PI, WhatsApp, e-mail e Instagram atuais.
- Artigo: título **“Como foi criado o site do JD · Estudo de referência”**, metadata Norte Autoral, capa do projeto JD, logo e favicon próprios. Rodapé **“Gabriel Holanda · PARNAÍBA, PI”** e contatos atuais.
- Nenhuma ocorrência de Sabec, sabec.dev, Diogo, Brigina ou credencial acadêmica antiga foi encontrada no texto renderizado dessas páginas. Os três tokens `sabec` restantes em v3 fazem parte do nome interno da função `sabecInit`, sem apresentação visual.
- O artigo contextualiza o relato original, preserva os prompts e as ferramentas como conteúdo histórico e informa que o projeto JD não é apresentado como trabalho de Gabriel/Norte Autoral.
- A thumbnail própria `public/assets/norte-autoral/portfolio-v3.jpg` existe (**91.978 bytes** no momento da revisão). A raiz do projeto realizou sua captura e a revisão visual.

## Formulário e helper

- O helper reconhece `/v3` como versão alternativa e apresenta **“← Portfólio”**, com destino `/#sites`.
- Um submit normal de v3, com valores fictícios locais preenchidos, é interceptado em captura no documento. Abre o diálogo **“Formulário de demonstração”**, mantém os campos e o botão **“Explorar o formulário →”**.
- Foram observadas **zero requisições a `/api/lead`** nos testes desktop e celular. O listener legado com `fetch('/api/lead')` permanece no HTML, mas não é acionado pelo submit normal verificado, pois o helper impede a propagação antes de alcançar o formulário.
- A regra de contatos fictícios agora exige `slug !== 'base-v3'`. No reteste, os links reais `https://wa.me/5586999900235` e `mailto:contatonorteautoral@gmail.com` não foram prevenidos pelo helper e não abriram o diálogo de contatos fictícios. A interceptação do formulário continua ativa.
- O helper preserva a regra separada de retorno para os nove templates; o controle flutuante se oculta quando o crédito próprio do rodapé está visível. A verificação específica dos nove templates está em `../qa-agency-credits-2026-10-10/TEMPLATES-CREDITS.md`.

## Ajustes identificados e resolvidos

1. **Contato real em v3 tratado como fictício:** identificado em navegador, corrigido pela raiz com a exceção `base-v3` e retestado nas duas larguras sem envio externo.
2. **Promessa herdada de contrato/nota fiscal:** substituída em v3 por **“Seu projeto / com escopo definido junto com você”**; confirmação estática após o ajuste.
3. **Dica histórica em primeira pessoa fora dos prompts:** título do artigo substituído por **“Uma recomendação do relato original”**; confirmação estática após o ajuste.

O painel e as integrações de v3 são apresentados como demonstração visual, com funções e escopo definidos por projeto. Esta revisão verificou páginas e interações locais; não houve publicação nem implementação de um backend Norte/OS.
