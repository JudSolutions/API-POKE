/*call of the pokemon*/
const pokemoncontainer = document.querySelector(".pokemon-container");
/*spinner*/
const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let offset = 1;
let limit = 11;

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 12;
    removeChildNodes(pokemoncontainer);
    fetchpokemons(offset, limit);
  }
 
});

next.addEventListener("click", () => {
    offset += 12;
    removeChildNodes(pokemoncontainer);
    fetchpokemons(offset, limit);
})

function fetchpokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        createpokemon(data);
        spinner.style.display = "none"; /*esconder spinner*/
    });
}

function fetchpokemons(offset, limit) {
  spinner.style.display = "block";  /*mostras spinner*/
  for (let i = offset; i <= offset + limit; i++) {
      fetchpokemon(i);
  
  }
}
/*create target dom*/
function createpokemon (pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);

  pokemoncontainer.appendChild(card);

}

function removeChildNodes(parent) {
  while (parent.firstChild){
    parent.removeChild(parent.lastChild);}
}

fetchpokemons(offset, limit);
