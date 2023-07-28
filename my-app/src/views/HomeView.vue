<script setup>
import AshPikachu from "../views/AshPikachu.vue";
// import SearchBar from "../views/SearchBar.vue";
import PokemonView from "../views/pokemonView2.vue";
</script>
<template>
  <div class="maindiv">
    <!-- <SearchBar /> -->
    <!-- <h1>Pokemons</h1> -->
    <div class="home">
      <PokemonView />
      <div class="visible"><AshPikachu /></div>
    </div>
  </div>
</template>
<style scope>
.visible {
  margin-top: 90px;
}
.maindiv {
  display: flex;
  justify-content: space-between;
  background-color: cadetblue;
  display: flex;
  flex-direction: column;
  margin: auto;
}
h1 {
  color: white;
}
.home {
  display: flex;
  justify-content: space-between;
  margin: auto 4% auto 0;
}
.visible {
  height: 35rem;
}
@media (width <= 1600px) {
  .home {
    margin: auto;
  }
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
