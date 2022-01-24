# Active Tuner 
<sup>Versão: 1.0.0</sup>

Analisador de frequências sonoras, para auxílio na afinação de instrumentos musicais. Ele detecta frequências entre C₀ (16,35 Hertz) e B₈  (7902,13 Hertz), e exibe a nota referente a frequência captada.

## Disclaimer
  - Esse aplicativo se limita pela capacidade funcional do dispositivo de áudio a executá-lo, tanto o microfone quanto a placa de som e suas capacidades.
  - Em testes, os navegadores Chrome e baseados em Chromium, tiveram melhor performance com a representação de animações gráficas.

## Objetivos do projeto
O Active Tuner tem como objetivo o aprendizado do funcionamento de ondas sonoras e sua representação digital. Foi necessário a compreensão básica de algoritmos para a conversão do sinal analógico para digital. O aprendizado do funcionamento da API de áudio utilizado pelos browsers, ex. Chrome e Firefox. E a construção de uma aplicação Web que pudesse representar a frequência e sua nota referente no momento da captação.

## Tecnologias e Ferramentas

### Web Audio API  
  - Para captação e representação das ondas sonoras no navegador.
Algoritmo de detecção de pitch (Pitch detection algorithm - PDA)
  - Utilizado para determinar a frequência de um sinal sonoro digital

### Canvas API
  - Utilizado para a representação gráfica das notas e das frequências;
  - Melhor tecnologia encontrada para a fluidez da exibição, devido ao alto volume de dados e tempo demandado para a atualização das notas e frequências em tela.

### React  
  - Framework utilizado para a construção da aplicação web

### Typescript/Javascript  
  - Linguagem utilizada para a manipulação da Web Audio API
  - Efetuar cálculos dos algoritmos de detecção de pitch a correlação;
  - Construção da aplicação com React.

## Desenvolvedores
  - <a href="https://www.linkedin.com/in/renanlopes77/" target="_blank">Renan Lopes</a>
  - <a href="https://www.linkedin.com/in/wesley-a/" target="_blank">Wesley Araujo</a>

## Agradecimentos
  - <a href="https://github.com/freirezinho" target="_blank">Saulo Freire</a>


# Active Tuner 
<sup>Versão: 1.0.0</sup>

Active Analyser of sound waves, to aid in the tuning of musical instruments. It detects frequencies between C₀ (16,35 Hertz) and B₈  (7902,13 Hertz), and shows a musical note  that matches the recognized frequency.

## Disclaimer
  - This application  depends on the functional capability of the sound devices employed on the hardware that runs it, like a microphone or sound interface.
  - In tests, browsers like Chrome or  other Chromium based browsers, were more performant with graphic animation rendering.

## Project goals
The Active Tuner aims at sound wave operations and its digital representation learning. It was necessary the basic understanding of analog to digital signal conversion algorithms. We also had to learn the browser's audio API, like Chrome and Firefox. Only then could we  build  a web application to be able to show a representation  of sound frequencies and their matching musical notes during the sound recording.

## Technologies and tools
### Web Audio API
  - To record and reproduce the sound waves

### Pitch detection algorithm - PDA
  - To determine the frequency of a digital sound signal 

### Canvas API
  - Used to  graphically show musical notes and frequencies' hertz
  - The best technology found for smooth and performant rendering, because of the high volume of data and time required to update notes and frequencies' hertz on screen

### React
  - JavaScript/TypeScript Framework used to build the web application

### Typescript/Javascript
  - Language used to handle Web Audio API
  - Perform calculations of detection pitch algorithm
  - Building of the application with ReactJS

## Contributors
  - <a href="https://www.linkedin.com/in/renanlopes77/" target="_blank">Renan Lopes</a>
  - <a href="https://www.linkedin.com/in/wesley-a/" target="_blank">Wesley Araujo</a>

## Acknowledgments
  - <a href="https://github.com/freirezinho" target="_blank">Saulo Freire</a>
