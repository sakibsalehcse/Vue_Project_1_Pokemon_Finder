<template>
  <div>
    <h1>Axios Data</h1>
    <ul>
      <li v-for="pokemon in pokemonData" :key="pokemon.name">
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const pokemonData = ref(null);

    const fetchData = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        pokemonData.value = response.data.results;
        console.log(pokemonData.value);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      pokemonData,
    };
  },
};
</script>
