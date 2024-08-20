export const renderItems = (pets) => {
  const ul = document.createElement("ul");
  ul.className = "ul-tarjeta";

  pets.forEach((pet) => {
    const petItem = document.createElement("li");
    petItem.className = "tarjeta";
    petItem.setAttribute('itemscope','');
    petItem.setAttribute('itemtype','http://schema.org/Pet');

    // Convertir la edad a meses
    const { years, months } = pet.facts.age;
    const totalMonths = (years * 12) + months;

    let ageDisplay;
    if (totalMonths < 12) {
      ageDisplay = `${months} mes(es)`;
    } else {
      ageDisplay = `${years} año(s)`;
    }


    // Usar la función para obtener el HTML
    petItem.innerHTML = `
                          <div itemprop="tarjeta-img">
                            <img class="tarjeta-img" src="${pet.imageUrl}" alt="${pet.name}">
                          </div>
                          <div itemprop="name">${pet.name}</div>
                          <div itemprop="description">${pet.shortDescription}</div>
                          <div itemprop="age">Edad: ${ageDisplay}</div>
                          <div itemprop="gender">Género: ${pet.facts.gender}</div>
                          <div itemprop="breed">Raza: ${pet.facts.breed}</div>
                          <div itemprop="size">Tamaño: ${pet.facts.size}</div>
                          <div itemprop="temperament">Comportamiento: ${pet.facts.temperament}</div>
                        </ul>
                      `;
    ul.appendChild(petItem);
  });

  // return list.innerHTML;
  return ul;
};

