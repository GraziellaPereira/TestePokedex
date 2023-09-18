const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const allPokemons = [];

const maxRecords = 1010;
const limit = 12;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Adicione os novos Pokémon ao array allPokemons
        allPokemons.push(...pokemons);
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

// Pesquisar pokemons
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', searchPokemon);

const searchInput = document.getElementById('pokemon-search');
searchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchPokemon();
  }
});

function searchPokemon() {
    const searchTerm = document.getElementById('pokemon-search').value.toLowerCase();

    // Filtrar Pokémon no array allPokemons
    allPokemons.forEach((pokemon) => {
        const pokemonName = pokemon.name.toLowerCase();
        const pokemonItem = document.querySelector(`.pokemon[pokemon="${pokemon.number}"]`);
        
        if (pokemonItem) {
            if (pokemonName.includes(searchTerm)) {
                pokemonItem.style.display = 'block';
            } else {
                pokemonItem.style.display = 'none';
            }
        }
    });
}

// Certifique-se de que a função loadPokemonItens seja chamada inicialmente para carregar Pokémon
loadPokemonItens(offset, limit);

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="getPokemon(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
    




    


   


     