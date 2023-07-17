<template>
  <div class="main">
    <h1>Favorite's Pokémon list</h1>
    <div v-for="favpokemon in myArray" :key="favpokemon.name">
      <h2>{{ favpokemon }}</h2>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from "vue";

const myArrayRef = ref([]);

onBeforeMount(() => {
  const arrayString = localStorage.getItem("LocalValFavPokemon");
  const myArray = JSON.parse(arrayString);
  myArrayRef.value = Array.isArray(myArray) ? myArray : [];
});

const myArray = computed(() => myArrayRef.value.map((pokemon) => pokemon.name));
</script>

<style scoped>
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
  color: lightgreen;
}
h2 {
  color: black;
}
</style>
