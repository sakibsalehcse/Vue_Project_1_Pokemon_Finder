<template>
  <h1>Favorite's Pokémon list</h1>
  <button @click="clearData">clear data</button>
  <div class="one">
    <div class="main">
      <div class="flex" v-for="favpokemon in myArray" :key="favpokemon.name">
        <h2 @click="navigateToPokemonDetails(favpokemon)">{{ favpokemon }}</h2>
        <button @click="itemRem(favpokemon)">❌</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const myArrayRef = ref([]);
onBeforeMount(() => {
  const arrayString = localStorage.getItem("LocalValFavPokemon");
  const myArray = JSON.parse(arrayString);
  myArrayRef.value = Array.isArray(myArray) ? myArray : [];
});
const navigateToPokemonDetails = (favpokemon) => {
  router.push({ name: "PokemonDetails", params: { name: favpokemon } });
};
const myArray = computed(() => myArrayRef.value.map((pokemon) => pokemon.name));
function clearData() {
  localStorage.removeItem("LocalValFavPokemon");
  myArrayRef.value = [];
}

function itemRem(pokemonName) {
  const index = myArrayRef.value.findIndex(
    (pokemon) => pokemon.name === pokemonName
  );

  if (index !== -1) {
    myArrayRef.value.splice(index, 1);
    const storeLocalVal = JSON.stringify(myArrayRef.value);
    localStorage.setItem("LocalValFavPokemon", storeLocalVal);
  }
}
</script>

<style scoped>
button {
  background: greenyellow;
  border-radius: 10px;
  margin: 10px;
  color: black;
}
.flex {
  display: flex;
  margin: auto;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.one {
  background-color: cadetblue;
  height: 80vh;
  width: 90vw;
  margin: auto;
  border-radius: 10px;
}
.main {
  height: auto;
  width: 30%;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
  /* background-color: white; */
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
  border-radius: 10px;
}
h1 {
  color: greenyellow;
}
h2 {
  color: black;
  background-color: white;
  border-radius: 10px;
}
h2:hover {
  color: black;
  background-color: greenyellow;
  border-radius: 10px;
}
</style>
