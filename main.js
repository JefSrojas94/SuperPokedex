const pokemonContainer = document.querySelector('.pokemon-container');
const spinner = document.querySelector('#spinner');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');

let offset = 1;
let limit = 8;

previous.addEventListener('click', ()=>{
    if (offset!=1) {
        offset -= 9;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);   
    }
})

next.addEventListener('click', ()=>{
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit); 
})

function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
        createPokemon(data);
        spinner.style.display = "none";
    })
}
function fetchPokemons(offset, limit){
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++){
        fetchPokemon(i);
    }
}

function createPokemon( pokemon){
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    flipCard.appendChild(cardContainer);

    const card = document.createElement('div');
    card.classList.add('pokemon-block');
    
    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const pokemonNumber = document.createElement('p');
    pokemonNumber.textContent = `#${pokemon.id.toString().padStart(3,0)}`;

    const pokemonName = document.createElement('p');
    pokemonName.classList.add('name');
    pokemonName.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(pokemonNumber);
    card.appendChild(pokemonName);

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');
    cardBack.textContent = "Carta Atras";

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
}

function removeChildNodes(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset,limit);