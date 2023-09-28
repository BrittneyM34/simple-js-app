let pokemonRepository = (function () {
    let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 7, 
        weight: 6.9,
        type: ['grass' , 'poison']
    },
    {
        name: 'Charmander', 
        height: 6, 
        weight: 8.5,
        type: ['fire']
    },
    {
        name: 'Beedrill', 
        height: 10,
        weight: 29.5,
        type: ['bug', 'poison']
    }
    ];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add (pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }
    
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let pokemonListItem = document.createElement('li');
        let pokemonButton = document.createElement('button');
    
        pokemonButton.innerText= pokemon.name;
        pokemonButton.classList.add('pokemon-button');
        pokemonButton.addEventListener('click', function() {
            showDetails(pokemon);
        });

        pokemonListItem.appendChild(button);
        pokemonList.appendChild(pokemonListItem);   
    }

    function showDetails (pokemon) { 
        console.log(pokemon);
    }

    function loadList () {
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };

})();

pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach (function(pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
});