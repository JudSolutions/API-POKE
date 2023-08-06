/*call of the pokemon*/
const pokemoncontainer = document.querySelector(".pokemon-container");

function fetchpokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        createpokemon(data);
    });
}

function fetchpokemons(number) {
  for (let i = 1; i <= number; i++) {
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


fetchpokemons(12);
