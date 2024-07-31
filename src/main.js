import { example } from './dataFunctions.js';
import { renderItems } from './view.js';

import data from './data/dataset.js';

console.log(example, renderItems(data), data);


window.onload=function(){
  const toggleBtn = document.querySelector('.toggle-btn')
  const btnCloseIcon = document.querySelector('.btn-close i')
  const dropDownMenu = document.querySelector('.sidebar')

  toggleBtn.onclick = function(){
      dropDownMenu.classList.toggle('active')
  }

  btnCloseIcon.onclick = function(){
      dropDownMenu.classList.remove('active')
  }

}
