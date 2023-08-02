const pokemonListElement = document.getElementById("pokemonList");
const searchInput = document.getElementById("searchInput");

// Fetch the JSON data from your own server
fetch("https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json")
  .then((response) => response.json())
  .then((data) => displayPokemonList(data));


// Fetch the JSON data

function displayPokemonList(pokemonData) {
    pokemonListElement.innerHTML = "";

    pokemonData.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("col-md-3", "mb-3");

        card.innerHTML = `
            <div class="card" data-bs-toggle="modal" data-bs-target="#pokemonModal" data-pokemon-id="${pokemon.id}">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name}</h5>
                    <p class="card-text">${pokemon.type}</p>
                </div>
            </div>
        `;

        pokemonListElement.appendChild(card);
    });

    // Add event listener to each card to display modal with more details
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const pokemonId = card.getAttribute("data-pokemon-id");
            displayPokemonModal(pokemonData[pokemonId - 1]);
        });
    });
}

function displayPokemonModal(pokemon) {
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
        <h5>Name: ${pokemon.name}</h5>
        <p>Type: ${pokemon.type}</p>
        <p>Weight: ${pokemon.weight}</p>
        <h6>Moves:</h6>
        <ul>
            ${pokemon.moves.map(move => `<li>${move}</li>`).join("")}
        </ul>
    `;
}

// Event listener for search input
searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const filteredPokemons = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(filter));
    displayPokemonList(filteredPokemons);
});
