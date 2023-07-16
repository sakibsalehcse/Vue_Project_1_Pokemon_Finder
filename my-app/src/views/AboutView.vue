<template>
  <h1>Introduction to Pokémon</h1>
  <div class="container">
    <div class="pik"><AshPikachu /></div>
    <p>
      Pokémon, contraction of Pocket Monsters, is a Japanese media franchise
      managed by The Pokémon Company and created by Nintendo. The franchise
      began in 1996 with the videogame titles Pokémon Red and Pokémon Blue for
      the original Game Boy. Over the years, it has expanded into anime series,
      manga, toys, trading cards and more. The central concept of the franchise
      is the titular Pokémon - creatures with supernatural powers that inhabit
      the fictional Pokémon world. Pokémon come in many varieties and evolve
      into other forms as they gain experience in battle. The goal of Pokémon
      trainers is to catch, train and battle their Pokémon against others.
    </p>
  </div>
</template>

<script setup>
import AshPikachu from "../views/AshPikachu.vue";
</script>

<style scoped>
.container {
  height: 80vh;
  width: 90vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1 {
  color: greenyellow;
}
.pik {
  height: auto;
  width: auto;
}

p {
  color: white;
}

@media only screen and (max-width: 767px) {
  .container {
    height: 80vh;
    width: 90vw;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .pik {
    display: none;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1499px) {
}
</style>
