<script setup>
import AshPikachu from "../views/AshPikachu.vue";
import SearchBar from "../views/SearchBar.vue";
</script>
<template>
  <div class="maindiv">
    <SearchBar />
    <div class="home">
      <h1>PokeMon</h1>
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
