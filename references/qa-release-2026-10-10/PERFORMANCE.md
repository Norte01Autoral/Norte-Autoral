# Otimização e medição local — 10/10/2026

Foram preservados o desenho, as cenas de rolagem e os vídeos dos templates. A otimização reduz arquivos de imagem e suspende trabalho de animação que não está visível.

## Arquivos de imagem

O inventário `image-optimization.json` registra o tamanho de cada original e derivado. As 15 versões efetivamente selecionadas somam **2.183.019 → 1.146.294 bytes**, redução de **47,49%**. O logotipo no cabeçalho usa PNG de 128 px (**461.365 → 11.052 bytes**); a foto mantém seus 819 × 1024 px em WebP (**283.923 → 85.408 bytes**). As cinco imagens de JD que ficaram maiores ao converter continuam usando JPEG. Os originais permanecem disponíveis.

## Carregamento inicial

As duas execuções em Chromium, em 1440 × 900 e servidor local, registraram:

| Medida | Antes | Depois | Redução |
| --- | ---: | ---: | ---: |
| Recursos além do HTML | 932.142 bytes | 324.851 bytes | 65,15% |
| HTML + recursos registrados | 1.084.361 bytes | 479.039 bytes | 55,82% |

Fontes e bibliotecas são locais. Os recursos fora da tela continuam carregando sob demanda. O conjunto inicial registrado também mudou: uma miniatura distante carregada na execução anterior não foi solicitada na segunda. Esses números descrevem as requisições capturadas nessas execuções; não medem toda a navegação nem representam uma garantia de velocidade em uma conexão pública.

Os registros completos estão em `performance-baseline.json` e `performance-after.json`. Não houve erro JavaScript na medição final. Os tempos de LCP e tarefas longas variaram sob carga do computador; não foram usados para afirmar ganho de tempo, nota Lighthouse ou Core Web Vitals de produção. A medição deve ser repetida depois da publicação, no domínio e hospedagem reais.

## Trabalho fora da tela

O contador de desenhos WebGL (`media-states.json`) registrou 31–35 desenhos por janela de 600 ms quando a hero estava visível, zero quando saiu da tela e zero quando a página foi marcada como oculta. Ao retornar à hero ou à página visível, o desenho retomou. O evento de página oculta foi simulado no teste; não equivale a testar a política de suspensão de todos os navegadores.

O helper de mídia observa a faixa animada e os vídeos. Ele retoma somente vídeos com autoplay/loop. `media-checks.json` confirma os seis templates com vídeo em 390 e 1440 px, com os vídeos prontos para reprodução (`readyState = 4`) e sem erros JavaScript:

- **Celular:** os seis vídeos tocavam na entrada, pausaram fora da tela, retomaram ao voltar, pausaram com página marcada como oculta e retomaram quando visível.
- **Desktop:** os seis permaneceram pausados em todos esses estados, preservando o acompanhamento pela rolagem. A posição do vídeo mudou de aproximadamente 0 para 4,99 segundos ao avançar a página e retornou ao início ao voltar, sem o helper iniciar reprodução contínua.
- **Faixa animada:** a transformação mudou durante os 400 ms em que estava visível e o estado virou `paused` quando a faixa saiu da tela.

Os eventos de visibilidade foram simulados; a saída e retorno à viewport usaram rolagem real. O teste verifica a lógica da página, sem afirmar comportamento idêntico das políticas de energia de todos os aparelhos.
