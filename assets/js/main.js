const pokemonList = document.getElementById('pokemonList');
const filterButton = document.getElementById('type-filter-buttons');


const allPokemons = [];

const maxRecords = 1010;
const limit = 1010;
let offset = 0;

function loadPokemonItens(offset, maxRecords) {
    pokeApi.getPokemons(offset, maxRecords).then((pokemons = []) => {
        // Adicione os novos Pokémon ao array allPokemons
        allPokemons.push(...pokemons);
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;

        // Atualize a pesquisa após carregar mais Pokémon
        searchPokemon();
    });
}

// Função para criar os botões de filtro de tipo
function createTypeFilterButtons(types) {
    const filterButtonsContainer = document.getElementById('type-filter-buttons');

    types.forEach((type) => {
        const button = document.createElement('button');
        button.textContent = type;
        button.className = 'filter-button';
        button.setAttribute('data-type', type);
        filterButtonsContainer.appendChild(button);
    });
}

// Função para filtrar Pokémon por tipo
function filterPokemonByType(type) {
        console.log('Tipo selecionado:', type);

    // Filtrar os Pokémon com base no tipo selecionado
    const filteredPokemon = allPokemons.filter((pokemon) => {
        return pokemon.types.includes(type);
    });

    // Limpar a lista atual de Pokémon na página
    pokemonList.innerHTML = '';

    // Adicionar os Pokémon filtrados de volta à lista na página
    filteredPokemon.forEach((pokemon) => {
        const li = convertPokemonToLi(pokemon);
        pokemonList.innerHTML += li;
    });
}


// Carregue os tipos disponíveis e crie os botões de filtro
fetchPokemonTypes()
    .then((types) => {
        createTypeFilterButtons(types);
    });

// Adicione um ouvinte de evento de clique aos botões de filtro de tipo
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        console.log('Filtering by type:', type); // Add this line for debugging
        filterPokemonByType(type);
    });
});


// Pesquisar pokemons
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', searchPokemon);

const searchInput = document.getElementById('pokemon-search');
searchInput.addEventListener('input', searchPokemon);


function searchPokemon() {
    const searchTerm = document.getElementById('pokemon-search').value.toLowerCase();

    allPokemons.forEach((pokemon, index) => {
        const pokemonName = pokemon.name.toLowerCase();
        const pokemonItem = document.querySelector(`.pokemon:nth-child(${index + 1})`);

        if (pokemonName.includes(searchTerm)) {
            pokemonItem.style.display = 'block';
        } else {
            pokemonItem.style.display = 'none';
        }
    });
}

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

loadPokemonItens(offset, limit);

// Seletor para os botões de filtro
const filterButtonSelect = document.querySelectorAll('.filter-button');

// Função para filtrar Pokémon por tipo
function filterByType(type) {
    allPokemons.forEach((pokemon) => {
        const pokemonItem = document.querySelector(`.pokemon[data-pokemon-number="${pokemon.number}"]`);
        
        if (pokemonItem) {
            if (pokemon.types.includes(type)) {
                pokemonItem.style.display = 'block';
            } else {
                pokemonItem.style.display = 'none';
            }
        }
    });
}

// Adicione um ouvinte de clique a cada botão de filtro
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        filterByType(type);
    });
});




    


   


     