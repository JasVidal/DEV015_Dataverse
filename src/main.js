import { renderItems } from './view.js';
import dataFunctions from './dataFunctions.js';
import petsData from './data/dataset.js';

//------------------ Botones principales ------------------//

/*Botón para abrir y cerrar Sidebar */

const root = document.getElementById('root')

window.onload=function(){
  const menuBtn = document.querySelector('.menu-btn')
  const btnCloseIcon = document.querySelector('.btn-close i')
  const dropDownMenu = document.querySelector('.sidebar')

  menuBtn.onclick = function(){
    dropDownMenu.classList.toggle('active')
  }

  btnCloseIcon.onclick = function(){
    dropDownMenu.classList.remove('active')
  }
}


// Botón Conócelos //

const btnConocelos = document.querySelector('#conocelos-btn')
const sectionTarjetas = document.querySelector('#tarjetas-section')

btnConocelos.addEventListener('click', () => {
  sectionTarjetas.scrollIntoView({
    behavior: 'smooth'
  });
});


// Botón aparecer Filtros //

document.querySelector('.boton-filtros').addEventListener('click', function () {
  const botones = document.querySelector('.mascotas-filtros');
  if (botones.style.display === 'none') {
    botones.style.display = 'block';
  } 
  else {
    botones.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const pets = dataFunctions.showPets();
  root.appendChild( renderItems(pets));
})


//------------ Sección tarjetas - Funciones de Filtrado y Botón Limpiar ------------//


// Filtro Tipo //

const selectTipo = document.querySelector('#tipo');

selectTipo.addEventListener('change', (event) => {
  const valorElegido = event.target.value;
  let resultado;    
  if (valorElegido === "Perro")  {
    root.innerHTML = ''
    resultado = dataFunctions.filterDataByType(petsData,'type',valorElegido.toLowerCase());
  }    
  else if (valorElegido === "Gato") {
    root.innerHTML = ''
    resultado = dataFunctions.filterDataByType(petsData, 'type',valorElegido.toLowerCase()); 
  }
  root.appendChild(renderItems(resultado))
  
})


// Filtro Edad //

const selectAge = document.getElementById('edad');
selectAge.addEventListener("change", () => {
  const root = document.getElementById('root');
  const edadSeleccionada = selectAge.value;
  let resultado;

  // Definiendo un mapa de rangos de edad //

  const ageRanges = {
    'cachorro': [0, 4],
    'adulto': [5, 9],
    'mayor': [10, 20]
  };

  if (ageRanges[edadSeleccionada]) {
    root.innerHTML = "";

    const [minAge, maxAge] = ageRanges[edadSeleccionada];
    resultado = dataFunctions.filterData(petsData, 'age', minAge, maxAge);
  } else {
    root.innerHTML = "";
    resultado = dataFunctions.showPets();
  }

  root.appendChild(renderItems(resultado));


  // Filtro Género //

  const selectGenero = document.querySelector('#genero');

  selectGenero.addEventListener('change', (event) => {
    const valorElegido = event.target.value;
    let resultado;   

    if (valorElegido === "Macho" || valorElegido === "Hembra")  {
      root.innerHTML = ''
      resultado = dataFunctions.filterDataByGender(petsData,'gender', valorElegido);
    }     

    root.appendChild(renderItems(resultado))

  });


  //Filtro Tamaño //

  const selectTamaño = document.querySelector('#tamaño');
  selectTamaño.addEventListener('change', (event) => {
    const valorElegido = event.target.value;
    let resultado;   

    if (valorElegido === "Pequeño" || valorElegido === "Mediano" || valorElegido === "Grande")  {
      root.innerHTML = ''
      resultado = dataFunctions.filterDataBySize(petsData,'size', valorElegido);
    }     

    root.appendChild(renderItems(resultado))
   
  }); 


  // Botón Limpiar //

  const botonLimpiar = document.querySelector('#btn-limpiar');
  botonLimpiar.addEventListener('click', (event) => {
    const pets = event.dataFunctions.showPets();

    selectTipo.value = "";
    selectGenero.value = "";
    selectAge.value = "";
    selectTamaño.value = "";

    root.innerHTML = "";
    root.appendChild(renderItems(pets));

  });



    
})

// Filtro Ordenar Alfabéticamente //

  
const inputsOrden = document.querySelectorAll('#orden > input');

inputsOrden.forEach ( (e)=>{
  e.addEventListener('change', (event) => {
    const valorElegido = event.target.value;
    let resultado;    
    if (valorElegido === "asc")  {
      root.innerHTML = ''
      resultado = dataFunctions.orderByNameAsc(petsData);
    }    
    else if (valorElegido === "desc") {
      root.innerHTML = ''
      resultado = dataFunctions.orderByNameDesc(petsData); 
    }
    root.appendChild(renderItems(resultado))
    
  })


}) 