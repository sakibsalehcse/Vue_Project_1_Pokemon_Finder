<template>
  <h1>Favorite's Pokémon list</h1>
  <button class="rgbbtn" @click="clearData">clear data</button>
  <div class="one">
    <div class="rgb">
      <div class="main">
        <div class="flex" v-for="favpokemon in myArray" :key="favpokemon.name">
          <h2 @click="navigateToPokemonDetails(favpokemon)">
            {{ favpokemon }}
          </h2>
          <button @click="itemRem(favpokemon)">❌</button>
        </div>
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
.rgb {
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: black;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  height: 95%;
  width: 80%;
}

.rgb:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.rgb:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: cadetblue;
  left: 0;
  top: 0;
  border-radius: 10px;
}
button {
  cursor: pointer;
  border-radius: 50%;
}
button:hover {
  background-color: #ff0000;
}

.flex {
  display: flex;
  margin: auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 3rem;
}
.one {
  height: 80vh;
  width: 90vw;
  margin: 20px auto;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
}
.main {
  height: auto;
  width: 30%;
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
  border-radius: 10px;
  cursor: pointer;
}
h2:hover {
  color: greenyellow;
  border-radius: 10px;
}
</style>
