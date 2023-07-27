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
@media only screen and (max-width: 767px) {
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

@media only screen and (min-width: 768px) and (max-width: 1023px) {
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
