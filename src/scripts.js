let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // Adds a pokemon to the back of the pokemon list array
    function add (pokemon) {
        pokemonList.push(pokemon);
    }

    // Retrieves the pokemon list from memory
    function getAll() {
        return pokemonList;
    }
    
    // Adds a pokemon as a list item element to the Document Object Model
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let pokemonListItem = document.createElement('li');
        let pokemonButton = document.createElement('button');

        pokemonListItem.classList.add('list-group-item')
        pokemonButton.innerText= pokemon.name;
        
        pokemonButton.classList.add('btn');
        pokemonButton.classList.add('btn-primary');

        pokemonButton.setAttribute('type', 'button');
        pokemonButton.setAttribute('data-toggle', 'modal');
        pokemonButton.setAttribute('data-target', '#pokemon-modal');
        
        pokemonButton.addEventListener('click', function() {
            showDetails(pokemon);
        });

        pokemonListItem.appendChild(pokemonButton);
        pokemonList.appendChild(pokemonListItem); 
    }

    function showDetails(item) {
        loadDetails(item).then(function () {
            showModal(item);
        });
    }

    // Shows the modal of the selected pokemon to the user
    function showModal(pokemon) {
        let modalHeader = document.querySelector('.modal-pokemon-name');
        modalHeader.innerText = pokemon.name;
        
        let contentElement = document.querySelector('.modal-pokemon-height');
        contentElement.innerText = 'Height: ' + pokemon.height;
        
        let imageElement = document.querySelector('.modal-pokemon-img');
        imageElement.setAttribute('src', pokemon.imageUrl);
    }

    // Retrieves the list of pokemon from the apiUrl as a JSON, then adds the pokemon to memory
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

    // Retrieves the specific details of a pokemon
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

    // Allows the use of these functions outside of the Pokemon Repository in the JavaScript code
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

// Loads the pokemon repository to memory, then adds a list item for each pokemon
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(p) {
        pokemonRepository.addListItem(p);
    });
})