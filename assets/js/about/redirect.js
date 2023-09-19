// Função que permite o armazenamento de mais detalhes sobre os pokémons, dados oferecidos pela pokeAPI, além de redirecionar para a página que exibirá esses detalhes ao clicar em um pokémon
function getPokemon (pokeNumber) {
    const pokemon = {}
    pokemon.url = `https://pokeapi.co/api/v2/pokemon/${pokeNumber}/`// cria uma propriedade url no objeto pokemon, feita para armazenar a url da API
    pokeApiAbout.getPokemonDetail(pokemon) // é chamado o método getPokemonDetail no objeto pokeApiAbout para fazer uma solicitação à API para buscar detalhes do pokemon conforme a url do objeto pokemon
        .then((pokeDetail) => {           // .then é um método usado em promises, lida com o resultado bem sucedido em uma operação assíncrona, em seguida, é solicitado o que acontece quando a operação é concluída com êxito, pokeDetail é o resultado retornado pela operação
            sessionStorage.setItem('pokemon', JSON.stringify(pokeDetail)); // é preciso transformar em string JSON, já que sessionStorage não armazena objetos JS, apenas em JSON, strings JSON não frequentemente utilizadas para transferir dados entre sistemas e troca de dados entre servidor e cliente da web
            window.location.href = "moredetails.html"                     // solicitação para redirecionar e onde será redirecionado
        })
}