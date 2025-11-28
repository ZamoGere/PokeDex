// fetch("https://pokeapi.co/api/v2/pokemon/ditto")
// .then(res => res.json())
// .then(data => console.log(data))

const pokemonList = document.querySelector('.pokemonTodos');
let URL = 'https://pokeapi.co/api/v2/pokemon/';
const headerBtn = document.querySelectorAll('.btnHeader');

for (let i = 1; i <= 151; i++) {
    fetch(`${URL}${i}`)
    .then(res => res.json())
    .then(data => showPokemon(data));
}

function showPokemon(data) {

    // let types = data.types.map(type => type.type.name).join('');
    let types = data.types.map((type) => `<p class="${type.type.name} tipe">${type.type.name}</p>`)
    types = types.join('');

    let pokeId = data.id.toString().padStart(3, '0');
    const div = document.createElement('div');
    div.classList.add('pokemon');
    div.innerHTML = `
    <div class="pokemon">
        <p class="pokemonIdBack">#${pokeId}</p>
                    <div class="pokemonImage">
                        <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
                    </div>
                    <div class="pokemonInfo">
                        <div class="nameConteiner">
                            <p class="pokemonId">#${pokeId}</p>
                            <h2 class="pokemonName">${data.name}</h2>
                        </div>
                        <div class="pokemonTipes">
                            ${types}
                        </div>
                        <div class="pokemonStats">
                            <p class="stat">${((data.height)*.1).toFixed(1)}m</p>
                            <p class="stat">${((data.weight)*.1).toFixed(1)}kg</p>
                        </div>
                    </div>
    `;
    listaPokemon.append(div);
}

headerBtn.forEach(btn => btn.addEventListener('click', (event) => {
    const botonId = event.target.id;
    pokemonList.innerHTML = '';
    for (let i = 1; i <= 151; i++) {
    fetch(`${URL}${i}`)
    .then(res => res.json())
    .then(data => {
        if (botonId === 'viewAll') {
            showPokemon(data);
            return;
        } else {
        const tipos = data.types.map(type => type.type.name);
        if (tipos.some(tipo => tipo.includes(botonId))) {
            showPokemon(data);
        }}
    });
}
}))