let pokemonRepository = (function () {
    let pokemonList = [];
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

        pokemonListItem.appendChild(pokemonButton);
        pokemonList.appendChild(pokemonListItem); 
    }

    function showDetails(item) {
        loadDetails(item).then(function () {
            console.log(item);
        });
    }

    function loadList () {
        return fetch(apiUrl).then(function (response) {
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
        });
    }

    function loadDetails (item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        }); 
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

// pokemonRepository.loadList().then(function() {
//     pokemonRepository.getAll().forEach (function(pokemon) {
//         pokemonRepository.addListItem(pokemon);
//     });
// });

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(p) {
        pokemonRepository.addListItem(p);
    });
})