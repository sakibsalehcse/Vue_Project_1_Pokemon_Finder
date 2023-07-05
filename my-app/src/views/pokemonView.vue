<template>
  <div class="main">
    <div class="container">
      <!-- <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search Pokemon" />
    </div> -->
      <div
        class="card"
        v-for="(pokemon, index) in filteredPokemon"
        :key="pokemon.name"
      >
        <h1>Pokemon Name: {{ pokemon.name }}</h1>
        <img
          :src="getPokemonImageUrl(index + totalPokemon + 1)"
          alt="pokemonImage"
          @click="navigateToPokemonDetails(pokemon)"
        />
      </div>
    </div>
    <div class="buttons">
      <button v-if="totalPokemon > 0" @click="previousPage">Previous</button>
      <button v-if="totalPokemon + 6 < pokemonCount" @click="nextPage">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const pokemonData = ref([]);
const pokemonCount = ref(0);
const totalPokemon = ref(0);
const searchQuery = ref("");

const fetchData = async () => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=6&offset=${totalPokemon.value}`
    );
    pokemonData.value = response.data.results;
    pokemonCount.value = response.data.count;
  } catch (error) {
    console.error(error);
  }
};

const getPokemonImageUrl = (index) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
};

const navigateToPokemonDetails = (pokemon) => {
  router.push({ name: "PokemonDetails", params: { name: pokemon.name } });
};

const previousPage = () => {
  totalPokemon.value -= 6;
  fetchData();
};

const nextPage = () => {
  totalPokemon.value += 6;
  fetchData();
};

const filteredPokemon = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return pokemonData.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query)
  );
});

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.main {
  align-content: center;
  justify-content: center;
  margin: auto;
}
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto auto auto;
  gap: 10px;
}

.card {
  background-color: yellow;
  height: fit-content;
  width: fit-content;
  border-radius: 10px;
  margin: auto;
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
}

button {
  margin: 0 10px;
  background-color: yellow;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-weight: bold;
  border-radius: 10px;
  color: black;
  height: 2rem;
  width: 5rem;
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

@media only screen and (max-width: 767px) {
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto auto auto;
    gap: 10px;
  }
  .card {
    background-color: yellow;
    height: 13rem;
    width: 10rem;
    border-radius: 10px;
    margin: auto;
  }
  .card img {
    height: 100;
    height: 100;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1499px) {
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto auto auto;
    gap: 10px;
  }
  .card {
    background-color: yellow;
    height: 16rem;
    width: 12rem;
    border-radius: 10px;
    margin: auto;
  }
  .card img {
    height: 200px;
    height: 200px;
  }
}
@media only screen and (min-width: 1500px) {
  .card {
    background-color: yellow;
    height: fit-content;
    width: fit-content;
    border-radius: 10px;
    margin: auto;
  }
  .card img {
    height: 300px;
    height: 300px;
  }
}
</style>
