<script setup>
import AshPikachu from "../views/AshPikachu.vue";
import SearchBar from "../views/SearchBar.vue";
import PokemonView from "../views/pokemonView.vue";
</script>
<template>
  <div class="maindiv">
    <SearchBar />
    <h1>Pokemons</h1>
    <div class="home">
      <PokemonView />
      <AshPikachu />
    </div>
  </div>
</template>
<style scope>
.maindiv {
  display: flex;
  justify-content: space-between;
  background-color: cadetblue;
  display: flex;
  flex-direction: column;
}
.home {
  display: flex;
  justify-content: space-between;
}
</style>
