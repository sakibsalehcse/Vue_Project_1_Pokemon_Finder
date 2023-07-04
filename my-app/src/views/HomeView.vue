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
      <div class="visible"><AshPikachu /></div>
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
@media only screen and (max-width: 767px) {
  .visible {
    display: none;
  }
  .maindiv {
    display: flex;
    justify-content: space-between;
    background-color: cadetblue;
    display: flex;
    flex-direction: column;
    margin: auto;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .visible {
    display: none;
  }
  .maindiv {
    display: flex;
    justify-content: space-between;
    background-color: cadetblue;
    display: flex;
    flex-direction: column;
    margin: auto;
  }
}
</style>
