[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



# Understand-AI

<br />
<div align="center">
  <h3 align="center">kanban-board-drag-&-drop</h3>

  <p align="center">
    Kanban Board
    <br />
    <a href="https://github.com/Raskolnikoff-D-503/Understand-AI"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Raskolnikoff-D-503/Understand-AI">View Demo</a>
    ·
    <a href="https://github.com/Raskolnikoff-D-503/Understand-AI/issues">Report Bug</a>
    ·
    <a href="https://github.com/Raskolnikoff-D-503/Understand-AI/issues">Request Feature</a>
  </p>
</div>



## About The Project

The Understand AI project was made with the purpose to create convenient and useful application in exploring AI, Machine Learning, Deep Learning and others. Additionaly, I wanted to deeply explore Feature-Sliced Design Methodology APIs integration, drag & drop technology, shimmer effects on loading, and various other libraries.

<img width="1280" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/59ea6083-97ec-4dce-9620-1dd46f70102d">

<img width="1280" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/d5303e78-3437-4efb-98e2-482d8e5e9a72">

<img width="1280" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/6876a9b3-b9ed-4694-80a7-8a81ea88eb8f">


1. In order to organize the code, I used Feature-Sliced Design architectural methodology:

<img width="211" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/b8d29cbd-987e-4c0d-9c19-835382aa5334">
 
 
2. There is also a few APIs that were integrated in the project: chat GPT and learning resources. For data storage I used RTK Query Redux Toolkit and local storage. For loading I used library that renders shimmer effects:

<img width="664" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/87c222bf-ece9-4477-94f5-6372f4212523">

<img width="660" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/f08062c5-cef3-4612-8b36-e2b3c7df3551">

<img width="1222" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/61369157-817a-4163-bfef-5c3d3ee7d23c">

<img width="681" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/17d98a6b-39e3-48ef-bad8-e6f0bed4cf94">

<img width="648" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/cae12415-b5cf-4f62-a75e-709c6375d5e0">

<img width="620" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/9bdcd4c6-9f60-40d0-ad36-11c730eca9db">


3. One of the features of the project is reusable drag and drop container that allows you to create draggable environment in order to switch child elements between each other:

<img width="1280" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/302fc2d1-bbcb-4cfd-b36d-e3412830e3c7">

<img width="669" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/3d7a4ef1-d21b-47d2-aa71-27f55b4450d4">

<img width="203" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/d5076b38-1509-4b1e-8761-26f16ecaa406">

This feature is based on React DnD Library. in order to use it, you need to:

  1) Install React Dnd Library: `npm install react-dnd react-dnd-html5-backend`,
  2) Import `DragAndDropContainer` in your Container component:
  <img width="306" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/51f9b809-ea58-4d02-a3b4-6f289aee9470">
  3) Pass to `DragAndDropContainer` next props: data for dragging mechanism; updateDataHandler function & className for drop container:
  <img width="327" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/73eae4c7-7b9b-42a8-9eb6-1fd4cdacc7da">
  <img width="593" alt="image" src="https://github.com/Raskolnikoff-D-503/Understand-AI/assets/82656000/5523fb41-7bac-4f59-9852-793e67df35a2">



### Built With

* [![TypeScript][TypeScript]][TypeScript-url]
* [![React][React.js]][React-url]
* [![SASS][SASS]][SASS-url]
* [![Webpack][Webpack]][Webpack-url]



### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Raskolnikoff-D-503/Understand-AI.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run Webpack serve
   ```js
   npm run dev
   ```



## Roadmap

- [ ] Add documentation
- [ ] Add Tooltip
- [ ] Refactoring



## License

Distributed under the MIT License. See `LICENSE` for more information.



## Contact

Evgeny Gaag - gaagevgenii@gmail.com



[contributors-shield]: https://img.shields.io/github/contributors/Raskolnikoff-D-503/Understand-AI.svg?style=for-the-badge
[contributors-url]: https://github.com/Raskolnikoff-D-503/Understand-AI/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Raskolnikoff-D-503/Understand-AI.svg?style=for-the-badge
[forks-url]: https://github.com/Raskolnikoff-D-503/Understand-AI/network/members
[stars-shield]: https://img.shields.io/github/stars/Raskolnikoff-D-503/Understand-AIp.svg?style=for-the-badge
[stars-url]: https://github.com/Raskolnikoff-D-503/Understand-AI/stargazers
[issues-shield]: https://img.shields.io/github/issues/Raskolnikoff-D-503/Understand-AI.svg?style=for-the-badge
[issues-url]: https://github.com/Raskolnikoff-D-503/Understand-AI/issues
[license-shield]: https://img.shields.io/github/license/Raskolnikoff-D-503/Understand-AI.svg?style=for-the-badge
[license-url]: https://github.com/Raskolnikoff-D-503/Understand-AI/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/evgeny-gaag-870b35233

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[SASS]: https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white
[SASS-url]: https://sass-lang.com/
[Webpack]: https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black
[Webpack-url]: https://webpack.js.org/
