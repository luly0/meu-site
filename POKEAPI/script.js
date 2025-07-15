const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const pokemonCard = document.querySelector(".screen"); // ← Correção aqui

const pokemonName = document.getElementById("pokemonName");
const pokemonId = document.getElementById("pokemonId");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonTypes = document.getElementById("pokemonTypes");
const pokemonWeight = document.getElementById("pokemonWeight");
const pokemonHeight = document.getElementById("pokemonHeight");

let currentPokemon = 1;

async function fetchPokemon(identifier) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${String(identifier).toLowerCase()}`);
    if (!response.ok) throw new Error("Pokémon não encontrado");
    const data = await response.json();
    renderPokemon(data);
  } catch (error) {
    alert(error.message);
  }
}

function renderPokemon(pokemon) {
  pokemonCard.classList.remove("hidden");

  pokemonName.textContent = pokemon.name.toUpperCase();
  pokemonId.textContent = `#${String(pokemon.id).padStart(3, '0')}`;
  const imgPokemon = document.querySelector(".pokemon");
  imgPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  pokemonTypes.innerHTML = "";
  pokemon.types.forEach(t => {
    const typeElement = document.createElement("span");
    typeElement.textContent = t.type.name;
    typeElement.classList.add("type", t.type.name);
    pokemonTypes.appendChild(typeElement);
  });

  pokemonWeight.textContent = (pokemon.weight / 10).toFixed(1);
  pokemonHeight.textContent = (pokemon.height / 10).toFixed(1);

  currentPokemon = pokemon.id;
}

searchBtn.addEventListener("click", () => {
  const value = searchInput.value.trim();
  if (value) fetchPokemon(value);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPokemon > 1) fetchPokemon(--currentPokemon);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  fetchPokemon(++currentPokemon);
});

fetchPokemon(currentPokemon);
