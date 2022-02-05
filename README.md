[![Total alerts](https://img.shields.io/lgtm/alerts/g/leydev/Tuner.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/leydev/Tuner/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/leydev/Tuner.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/leydev/Tuner/context:javascript)

# Active Tuner 
<sup>Versão: 1.1.6</sup>

![alt text](src/assets/screenshots/desktop.png "Screenshot app for desktop")

Analyser of sound waves, to aid in the tuning of musical instruments. It detects frequencies between C₀ (16,35 Hertz) and B₈  (7902,13 Hertz), and shows a musical note  that matches the recognized frequency.

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
