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

    function add (pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }
    
    function addListItem(pokemon) {
        let pList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
    
        button.innerText= pokemon.name;
        button.classList.add('pokemon-button');
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });

        listItem.appendChild(button);
        pList.appendChild(listItem);   
    }

    function showDetails (pokemon) { 
        console.log(pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };

})();

pokemonRepository.getAll().forEach (function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});