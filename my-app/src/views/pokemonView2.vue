<template>
  <div class="one">
    <audio id="hoverSound" src="../assets/a.wav"></audio>
    <input type="text" v-model="searchQuery" placeholder="Search Pokemon" />
    <div class="main">
      <h1>{{ localStorageData }}</h1>
      <div class="container">
        <div
          @click="play"
          class="card"
          v-for="(pokemon, index) in filteredPokemon"
          :key="pokemon.name"
        >
          <button class="rgbbtn" @click="AddToFav(pokemon)">
            <span v-if="pokemon.isFav">⭐</span>
            <span v-else>Add to Fav</span>
          </button>

          <div @click="navigateToPokemonDetails(pokemon)">
            <h1>Pokemon Name: {{ pokemon.name }}</h1>
            <img
              :src="getPokemonImageUrl(index + totalPokemon + 1)"
              alt="pokemonImage"
            />
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="rgbbtn" v-if="totalPokemon > 0" @click="previousPage">
          Previous
        </button>
        <button
          class="rgbbtn"
          v-if="totalPokemon + 6 < pokemonCount"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import useSound from "vue-use-sound";
import a from "../assets/a.wav";
const [play] = useSound(a);
const router = useRouter();
const pokemonData = ref([]);
const pokemonCount = ref(0);
const totalPokemon = ref(0);
const searchQuery = ref("");
const limit = ref(100);

const fetchData = async () => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit.value}&offset=${totalPokemon.value}`
    );
    const apiPokemonData = response.data.results;

    const localFavPokemon =
      JSON.parse(localStorage.getItem("LocalValFavPokemon")) || [];
    apiPokemonData.forEach((pokemon) => {
      const isFavPokemon = localFavPokemon.some(
        (localFav) => localFav.name === pokemon.name
      );
      if (isFavPokemon) {
        pokemon.isFav = true;
      } else {
        pokemon.isFav = false;
      }
    });

    pokemonData.value = apiPokemonData;
    pokemonCount.value = response.data.count;
  } catch (error) {
    console.error(error);
  }
};

const getPokemonImageUrl = (index) => {
  console.log("image index", index);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
};

const navigateToPokemonDetails = (pokemon) => {
  router.push({ name: "PokemonDetails", params: { name: pokemon.name } });
};

const previousPage = () => {
  totalPokemon.value -= 10;
  fetchData();
};

const nextPage = () => {
  totalPokemon.value += 10;
  fetchData();
};

const favPokimonList = ref(
  JSON.parse(localStorage.getItem("LocalValFavPokemon")) || []
);

function AddToFav(pokemon) {
  const index = favPokimonList.value.findIndex((p) => p.name === pokemon.name);
  if (index !== -1) {
    favPokimonList.value.splice(index, 1);
    pokemon.isFav = false;
  } else {
    favPokimonList.value.push(pokemon);
    pokemon.isFav = true;
  }
  const storeLocalVal = JSON.stringify(favPokimonList.value);
  localStorage.setItem("LocalValFavPokemon", storeLocalVal);
}

onBeforeMount(() => {
  console.log("testing local");
  let a = localStorage.getItem("LocalValFavPokemon");
  console.log(a, typeof a);
  if (a != null) {
    // console.log(a);
    console.log("valo paici");
    favPokimonList.value = JSON.parse(
      localStorage.getItem("LocalValFavPokemon")
    );
  }
});

const filteredPokemon = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const filteredData = pokemonData.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query)
  );
  console.log("filterdata", filteredData);
  return filteredData.slice(0, 10);
});

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.card {
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: black;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  height: 90%;
  width: 80%;
}

.card:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.card:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
  left: 0;
  top: 0;
  border-radius: 10px;
}
.one input {
  margin: 10px auto auto auto;
}
.one {
  height: 80vh;
  width: 90vw;
  border-radius: 10px;
}
.main {
  align-content: center;
  justify-content: center;
  margin: auto;
  /* background-color: black; */
}
.is-fav {
  background-color: white;
}
.not-fav {
  background-color: white;
}
.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  align-items: center;
  text-align: center;
  height: auto;
  width: auto;
  gap: 40px;
  padding: 20px;
}

.card {
  cursor: pointer;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
  border-radius: 10px;
  height: 15rem;
  width: 12rem;
  margin: auto;
  padding: 10px;
  color: white;
  transition: box-shadow 0.3s ease-in-out;
}
.card img {
  height: 150px;
  height: 150px;
}
.card:hover {
  box-shadow: 0 0 40px 20px rgb(241, 237, 237);
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
}

.card h1 {
  font-size: 18px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: black;
  font-weight: bold;
}

.buttons {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  gap: 2rem;
}
.search-bar {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

input[type="text"] {
  width: 300px;
  height: 30px;
  font-size: 16px;
  padding: 5px;
  border-radius: 5px;
  border: none;
  outline: none;
}

@media (width <= 600px) {
  .card button {
    height: 1.5rem;
    width: 6rem;
    font-size: 10px;
  }
  .card h1 {
    font-size: 10px;
  }
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto auto auto;
    gap: 5px;
  }
  .card {
    background-color: green;
    height: 8rem;
    width: 6rem;
    border-radius: 10px;
    margin: auto;
    font-size: 1px;
  }
  .card img {
    height: 80px;
    height: 80px;
  }
}
@media (601px <=width <= 768px) {
  .card button {
    height: 1.5rem;
    width: 6rem;
    font-size: 10px;
  }
  .card h1 {
    font-size: 12px;
  }
  .container {
    grid-template-columns: repeat(4, 1fr);
  }
  .card {
    height: 9rem;
    width: 6rem;
    margin: auto;
    font-size: 1px;
  }
  .card img {
    height: 85px;
    height: 85px;
  }
}
@media (769px <=width <= 992px) {
  .card button {
    height: 1.5rem;
    width: 6rem;
    font-size: 10px;
  }
  .card h1 {
    font-size: 14px;
  }
  .container {
    grid-template-columns: repeat(5, 1fr);
  }
  .card {
    height: 12rem;
    width: 6rem;
    margin: auto;
  }
  .card img {
    height: 90px;
    height: 90px;
  }
}
@media (993px <=width <= 1200px) {
  .card button {
    height: 1.5rem;
    width: 6rem;
    font-size: 10px;
  }
  .card h1 {
    font-size: 14px;
  }
  .container {
    grid-template-columns: repeat(5, 1fr);
  }
  .card {
    height: 12rem;
    width: 8rem;
    margin: auto;
  }
  .card img {
    height: 100px;
    height: 100px;
  }
}
</style>
