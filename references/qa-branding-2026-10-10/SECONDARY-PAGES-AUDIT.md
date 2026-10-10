# Auditoria de identidade — páginas secundárias

Leitura em 10/10/2026, sem alterações em `public`. Escopo: páginas fora de `public/index.html` e `public/marketing/portfolio`, além da navegação compartilhada. Não foram contabilizados comentários, funções como `sabecInit`, nomes de classes ou símbolos internos de bibliotecas.

## Ocorrências que afetam visitantes

| Arquivo / localização | Ocorrência | Encaminhamento |
| --- | --- | --- |
| `public/privacy.html` | Marca Norte Autoral, Gabriel Holanda e contatos corretos; sem crédito Sabec visível. | Nenhuma substituição de identidade necessária. Data da página ainda 09/10/2026; alterar apenas se o conteúdo for atualizado. |
| `public/terms.html:51` | JD e Dra. Ana descritos como referências preservadas da base autorizada Sabec. | É uma atribuição histórica, não contato comercial. Se os cases agora continuam publicados, preservar uma indicação de origem sem afirmar que Gabriel criou esses projetos; reescrever para refletir a galeria atual. |
| `public/terms.html:54` | Diz dez cartões incluindo a versão anterior Sabec, nove demos e artigo JD. | Conteúdo desatualizado: remover menção/card de versão anterior e ajustar quantidade/lista ao portfólio final. Se artigo JD não tiver mais entrada pública, remover também essa indicação. |
| `public/site-do-jd.html:106,278` | Dois logos **visualmente Sabec** (`Logotipo Branco e Azul.svg`), ambos com alt Sabec. | Usar identidade Norte Autoral no chrome se a página continuar no produto. Alterar somente alt não muda o logo desenhado. |
| `public/site-do-jd.html:14` | Favicon Sabec. | Trocar por favicon Norte Autoral se a página continuar publicada. |
| `public/site-do-jd.html:273–274` | WhatsApp `5543991334218`, Instagram `@sabec.dev`. | Para CTA comercial do portfólio atual, usar `5586999900235` e `@gabrielholanda._`; e-mail atual é `contatonorteautoral@gmail.com`. |
| `public/site-do-jd.html:6–10,110–112` | Título “Como eu fiz...”, descrição “prompts que eu mandei...” e relato “Eu fiz... primeira versão... mesmo dia”. | São afirmações do autor original. Não trocar apenas a marca para Gabriel e manter primeira pessoa. Retirar o artigo do produto ou apresentá-lo explicitamente como relato histórico do autor original, com título/introdução em terceira pessoa. |
| `public/site-do-jd.html:121–252` | Processo narrado em primeira pessoa e prompts originais, decisões com JD, implementação/admin/deploy. | Conteúdo histórico autoral; não converter em case de autoria Gabriel. Textos dos prompts e fatos do processo não são simples branding. |
| `public/site-do-jd.html:11` | OG image ainda em `www.sabec.dev/site-do-jd/img/og.jpg`. | Metadado público de compartilhamento; caso página seja mantida, usar asset local apropriado e metadata de referência histórica. |
| `public/v3.html:753,763,793–840,868–1020,1062` | Boot Sabec, logo Sabec em paths SVG, hero/terminal/áreas repetem marca e produto Sabec/Os. | Esta é a landing histórica anterior inteira. Como o usuário pediu remover o link do portfólio anterior, caminho consistente é retirar entradas públicas para v3 e preservar sua fonte em `references`. Se v3 ainda for produto navegável, precisa adaptação editorial completa, não substituição global. |
| `public/v3.html:1102` | Mais trabalho real em `@sabec.dev`. | Remover junto da landing anterior, ou direcionar o CTA atual a Norte Autoral quando houver adaptação completa. |
| `public/v3.html:1144–1155` | Foto de Diogo, “Sou o Diogo”, Ciência da Computação, QA Sênior, coordenação de voluntários, construtor do Sabec/Os. | Credenciais biográficas específicas do autor original. Não atribuir a Gabriel sem dados confirmados. A foto também precisa troca real, não relabel de alt. |
| `public/v3.html:1203–1255` | Cal.com Diogo, WhatsApp43, Instagram Sabec, e-mail Diogo, LinkedIn Diogo, copyright “Diogo Sabec MEI · Londrina”. | Se landing retirada, não precisa rebrand da cópia histórica. Caso seja adaptada como página atual, usar contatos Norte conhecidos e remover calendário/LinkedIn/MEI/localidade não confirmados. |
| `public/v3.html:8–141` | Título/SEO/social/schema apresentam Sabec, Diogo, origem do Sabec/Os e Londrina. | São metadados públicos; não substituir para fazer Gabriel fundador de produto histórico ou detentor de credenciais originais. Aplicar a mesma decisão editorial da página. |

## Navegação e assets comuns

`public/assets/demo-navigation.js` já usa “Voltar ao portfólio Norte Autoral”, “Conversar com Norte Autoral” e textos de demonstração com Norte Autoral. **Não há crédito Sabec visível nesse arquivo**. O ramo `base-v3` ainda gera “← Portfólio · Referência da base”; remover esse ramo se a landing anterior for retirada.

Não foram encontradas ocorrências Sabec/Diogo/“portfólio anterior” nos textos das três páginas `public/cases/{helena-vasques,vex-fitness,vex-construtora}.html`, em `demo-navigation.css`, `profile.css` ou `static-case-motion.js`.

Arquivos de logos Sabec ainda presentes em `assets` podem ser mantidos como material de referência se não forem usados no produto. O que precisa mudar é seu uso nas páginas e a navegação pública. Nenhum símbolo interno JS precisa renomeação para resolver o pedido.

## Decisão prática recomendada

1. Remover card/links de v3 no portfólio atual; ajustar `terms.html` à galeria final.
2. Preservar v3 e relato JD originais em `references`; retirar suas entradas do site atual ou usar páginas neutras de referência com atribuição explícita.
3. Rebrand de chrome, favicon, CTA e contatos para Norte Autoral é direto. Relatos pessoais, autoria de projetos, graduação, senioridade, produto próprio, MEI e localidade exigem reescrita factual, não troca automática de nomes.
