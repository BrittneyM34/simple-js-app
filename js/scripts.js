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
            showModal(item);
        });
    }

    // Connects the modal container div element in the HTML to the modal container variable in JS
    let modalContainer = document.querySelector('#modal-container');

    // Shows the modal of the selected pokemon to the user
    function showModal(pokemon) {
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + pokemon.height;

        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', pokemon.imageUrl);
        
        modal.appendChild(closeButton);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    // Hides the modal of the selected pokemon from the user
    function hideModal() {
        modalContainer.classList.remove('is-visible');
        modalContainer.innerHTML = '';
    }

    // Allows an escape key to be used to hide the current modal from the user
    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
      });
      
    // Allows a click outside of the modal to be used to hide the current modal from the user
    modalContainer.addEventListener('click', (e) => {
        //Since this is also triggered when clicking INSIDE the modal
        //We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
        hideModal();
        }
    });

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