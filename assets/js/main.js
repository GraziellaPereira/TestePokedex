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

// Lista Pokemon
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

// Função para criar os botões de filtro de tipo (não alterar)
function createTypeFilterButtons(types) {
    const filterButtonsContainer = document.getElementById('type-filter-buttons');

    types.forEach((type) => {
        const button = document.createElement('button');
        button.textContent = type;
        button.className = 'filter-button';
        button.addEventListener('click', () => {
            console.log('clicou')
            filterPokemonByType(type);
        });
        filterButtonsContainer.appendChild(button);
    });
}


// Adicione um ouvinte de evento para esperar a carga completa da página
window.addEventListener('load', function() { 
 
    // Carregue os tipos disponíveis e crie os botões de filtro
    fetchPokemonTypes()
        .then((types) => {
            createTypeFilterButtons(types);

            // Após criar os botões, carregue todos os Pokémon
            loadPokemonItens(offset, limit);
        })
        .catch((error) => {
            console.error('Erro ao buscar tipos de Pokémon:', error);
        });
});




// Função para filtrar Pokémon por tipo
function filterPokemonByType(type) {
    const pokemonItems = document.querySelectorAll('.pokemon');

    pokemonItems.forEach((pokemonItem) => {
        const types = Array.from(pokemonItem.querySelectorAll('.type')).map((typeElement) => typeElement.textContent);

        if (types.includes(type)) {
            pokemonItem.style.display = 'block';
        } else {
            pokemonItem.style.display = 'none';
        }
    });
}


// Adicione um ouvinte de evento de clique aos botões de filtro de tipo
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const type = button.textContent;
        filterPokemonByType(type);
    });
});

// Seletor para o botão de Limpar Filtro
const clearFilterButton = document.getElementById('clear-filter-button');

// Adicione um ouvinte de evento ao botão
clearFilterButton.addEventListener('click', clearFilter);

// Função para limpar o filtro e mostrar todos os Pokémon novamente
function clearFilter() {
    const pokemonItems = document.querySelectorAll('.pokemon');

    pokemonItems.forEach((pokemonItem) => {
        pokemonItem.style.display = 'block';
    });
}


// Pesquisar pokemons (não alterar)
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

loadPokemonItens(offset, limit);



    


   


     