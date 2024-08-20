import { renderItems } from './view.js';
import dataFunctions from './dataFunctions.js';
import petsData from './data/dataset.js';

// destructuracion de objetos en JS
const { showPets, filterDataByType, filterDataByAge, filterDataByValue, orderPetsBy, countAdoptedPets } = dataFunctions;

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
  const pets = showPets();
  root.appendChild( renderItems(pets));
})


//------------ Sección tarjetas - Funciones de Filtrado y Botón Limpiar ------------//

// Estado de los filtros
const filtros = {
  tipo: null,
  edad: null,
  genero: null,
  tamaño: null
};

function aplicarFiltros(datos) {
  let resultados = datos;

  // Filtro por tipo
  if (filtros.tipo) {
    resultados = filterDataByType(resultados, 'type', filtros.tipo.toLowerCase());
  }

  // Filtro por edad
  if (filtros.edad) {
    const ageRanges = {
      'Cachorro': [0, 12],
      'Adulto': [13, 119],
      'Mayor': [120, 240]
    };

    const [minAge, maxAge] = ageRanges[filtros.edad];
    resultados = filterDataByAge(resultados, 'age', minAge, maxAge);
  }

  // Filtro por género
  if (filtros.genero) {
    resultados = filterDataByValue(resultados, 'gender', filtros.genero);
  }

  // Filtro por tamaño
  if (filtros.tamaño) {
    resultados = filterDataByValue(resultados, 'size', filtros.tamaño);
  }

  return resultados;
}

// Aplicar filtros y actualizar la vista
function actualizarVista() {
  root.innerHTML = '';
  const resultadosFiltrados = aplicarFiltros(petsData);
  root.appendChild(renderItems(resultadosFiltrados));
}

// Filtro Tipo //

const selectTipo = document.querySelector('#tipo');

selectTipo.addEventListener('change', (event) => {
  filtros.tipo = event.target.value;
  actualizarVista();
});


// Filtro Edad //

const selectAge = document.getElementById('edad');
selectAge.addEventListener("change", () => {
  filtros.edad = selectAge.value;
  actualizarVista();
})

// Filtro Género //

const selectGenero = document.querySelector('#genero');

selectGenero.addEventListener('change', (event) => {
  filtros.genero = event.target.value;
  actualizarVista();
});


//Filtro Tamaño //

const selectTamaño = document.querySelector('#tamaño');
selectTamaño.addEventListener('change', (event) => {
  filtros.tamaño = event.target.value;
  actualizarVista();
});


// Botón Limpiar //

const botonLimpiar = document.querySelector('#btn-limpiar');
botonLimpiar.addEventListener('click', () => {
  const pets = showPets();
  root.innerHTML = "";

  // Restablecer el estado de los filtros
  filtros.tipo = null;
  filtros.edad = null;
  filtros.genero = null;
  filtros.tamaño = null;

  //Restablecer los selects
  selectTipo.value = "Tipo";
  selectGenero.value = "Genero";
  selectAge.value = "Edad";
  selectTamaño.value = "Tamaño";

  //Limpiar los radio buttons
  botonOrdenarAsc.checked = false;
  botonOrdenarDesc.checked = false;

  root.appendChild(renderItems(pets));
});


// Filtro Ordenar Alfabéticamente //

const botonOrdenarAsc = document.querySelector('#asc');
botonOrdenarAsc.addEventListener("click", function(){
  root.innerHTML = "";
  const resultadosFiltrados = aplicarFiltros(petsData);
  const valorElegido = botonOrdenarAsc.value;
  const ordenarPetsData = orderPetsBy(resultadosFiltrados,'name',valorElegido);
  root.appendChild(renderItems(ordenarPetsData))

})

const botonOrdenarDesc= document.querySelector('#desc');
botonOrdenarDesc.addEventListener("click", function(){
  root.innerHTML = "";
  const resultadosFiltrados = aplicarFiltros(petsData);
  const valorElegido = botonOrdenarDesc.value;
  const ordenarPetsData = orderPetsBy(resultadosFiltrados, 'name', valorElegido);
  root.appendChild(renderItems(ordenarPetsData))
})

// Botón Estadísticas //

const btnStats = document.querySelector('#btn-estadísticas');
const sectionStats = document.querySelector('.estadisticas-section');
const btncloseStats = document.querySelector('.btn-close2 li i');
const adoptedPets = document.querySelector('.adoptados');

btnStats.addEventListener('click', () => {
  sectionStats.style.display = 'block';
  const adoptedResult = countAdoptedPets(petsData)
  adoptedPets.innerHTML = `Número de mascotas adoptadas: ${adoptedResult}`;  
   
});

btncloseStats.addEventListener('click', () => {
  sectionStats.style.display = 'none';
});

