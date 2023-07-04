<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const pokemonData = ref(null);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        pokemonData.value = response.data.results;
        console.log(pokemonData.value);
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

    onMounted(() => {
      fetchData();
    });

    return {
      pokemonData,
      getPokemonImageUrl,
      navigateToPokemonDetails,
    };
  },
};
</script>
<template>
  <div class="container">
    <h1>{{ pokemonData }}</h1>
    <div
      class="card"
      v-for="(pokemon, index) in pokemonData"
      :key="pokemon.name"
    >
      <h1>Pokemon Name: {{ pokemon.name }}</h1>
      <img
        :src="getPokemonImageUrl(index + 1)"
        alt="pokemonImage"
        width="300"
        height="300"
        @click="navigateToPokemonDetails(pokemon)"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
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
</style>
