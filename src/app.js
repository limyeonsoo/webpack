import {sum} from './math.js'
import './app.css';
import webpack from './webpack.png';

window.addEventListener('DOMContentLoaded', () => {
    sum(1,2);
    const el = document.querySelector('#app');
    el.innerHTML = `
        <h1>${sum(1,2)}</h1>
        <img src="${webpack}" alt="webpackimg"/>
    `
})