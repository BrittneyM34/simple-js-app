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

for (let i = 0; i < pokemonList.length; i++) {
    document.write('<p>' + pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')');
    if (pokemonList[i].height > 9) {
        document.write (' - Wow, that\'s big!');
    }
    document.write('</p>')
}
