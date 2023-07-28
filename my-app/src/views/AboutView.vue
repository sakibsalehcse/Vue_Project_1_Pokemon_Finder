<template>
  <h1>Introduction to Pokémon</h1>
  <div class="container" @click="play">
    <div><AshPikachu class="pik" /></div>
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
  background-color: cadetblue;
  height: 80vh;
  width: 90vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
h1 {
  color: greenyellow;
}
.pik {
  margin: 20px auto;
  height: 30rem;
  width: 35rem;
  margin: auto;
}

p {
  color: white;
}

@media (width <= 600px) {
  .pik {
    height: 32rem;
    width: 25rem;
  }
}
@media (601px <=width <= 768px) {
  .pik {
    height: 32rem;
    width: 30rem;
  }
}
@media (769px <=width <= 992px) {
  .pik {
    height: 30rem;
    width: 35rem;
  }
}
@media (993px <=width <= 1200px) {
  .pik {
    height: 30rem;
    width: 35rem;
  }
  p {
    color: white;
    font-size: clamp(0.5rem, 2vw, 10rem);
  }
}
</style>
