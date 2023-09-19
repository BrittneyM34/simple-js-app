let pokemonList = [
{
    name: 'Bulbasaur',
    height: 7, 
    weight: 6.9,
    type: ['grass' , 'poison']
},
{
    name: 'Charmander', 
    height: '6', 
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

pokemonList.forEach (function(pokemon) {
    document.write('<p>' + pokemon.name + ' (Height: ' + pokemon.height + ')');
    if (pokemon.height > 9) {
        document.write (' - Wow, that\'s big!');
    }
    document.write('</p>')
});