<template>
  <div class="one">
    <div class="main">
      <h1>{{ localStorageData }}</h1>
      <!-- <input type="text" v-model="searchQuery" placeholder="Search Pokemon" /> -->
      <div class="container">
        <div
          class="card"
          v-for="(pokemon, index) in filteredPokemon"
          :key="pokemon.name"
        >
          <button
            :class="{
              'is-fav': pokemon.isFav,
              'not-fav': !pokemon.isFav,
            }"
            @click="AddTOFav(pokemon)"
          >
            <!-- <span v-if="isFavPokemon(pokemon)">⭐</span>
            <span v-else>Add to Fav</span> -->
            <span v-if="isFav">⭐</span>
            <span v-else>Add to Fav</span>
          </button>

          <div @click="navigateToPokemonDetails(pokemon)">
            <h1>Pokemon Name: {{ pokemon.name }}</h1>
            <img
              :src="getPokemonImageUrl(index + totalPokemon + 1)"
              alt="pokemonImage"
            />
          </div>
        </div>
      </div>
      <div class="buttons">
        <button v-if="totalPokemon > 0" @click="previousPage">Previous</button>
        <button v-if="totalPokemon + 6 < pokemonCount" @click="nextPage">
          Next
        </button>
      </div>
    </div>
    <!-- <h1>Favorite's Pokémon list</h1>
    <div v-for="favpokemon in favPokimonList" :key="favpokemon.name">
      <h1 :style="{ color: 'white', fontSize: '10px' }">
        {{ favpokemon.name }}
      </h1>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
// const localStorageData = JSON.parse(localStorage.getItem("data"));
// console.log(localStorageData);
const isFav = ref(false);
// function AddTOFav() {
//   isFav.value = !isFav.value;
// }
// const localVal = ref([]);
const favPokimonList = ref([]);
const router = useRouter();
const pokemonData = ref([]);
const pokemonCount = ref(0);
const totalPokemon = ref(0);
const searchQuery = ref("");
const limit = ref(6);
// const Global = ref([]);
const fetchData = async () => {
  try {
    //   limit.value = 100;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit.value}&offset=${totalPokemon.value}`
    );
    pokemonData.value = response.data.results;
    pokemonCount.value = response.data.count;
  } catch (error) {
    console.error(error);
  }
};

const getPokemonImageUrl = (index) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
};

const navigateToPokemonDetails = (pokemon) => {
  router.push({ name: "PokemonDetails", params: { name: pokemon.name } });
};

const previousPage = () => {
  totalPokemon.value -= 6;
  fetchData();
};

const nextPage = () => {
  totalPokemon.value += 6;
  fetchData();
};

function AddTOFav(pokemon) {
  console.log(favPokimonList.value, pokemon);
  if (favPokimonList.value !== null) {
    console.log(1);
    let flg = false;
    favPokimonList.value.forEach((p) => {
      if (p == pokemon) {
        console.log(2);
        favPokimonList.value.pop(pokemon);
        flg = true;
        isFav.value = !isFav.value;
      }
    });
    if (flg == false) {
      console.log(3);
      favPokimonList.value.push(pokemon);
      isFav.value = true;
    }
  } else {
    favPokimonList.value.push(pokemon);
  }
  console.log(4);
  const StoreLocalVal = JSON.stringify(favPokimonList.value);
  console.log(favPokimonList);
  localStorage.setItem("LocalValFavPokemon", StoreLocalVal);
}

onBeforeMount(() => {
  console.log("testing local");
  let a = localStorage.getItem("LocalValFavPokemon");
  console.log(a, typeof a);
  if (a != null) {
    // console.log(a);
    console.log("valo paici");
    favPokimonList.value = JSON.parse(
      localStorage.getItem("LocalValFavPokemon")
    );
  }
});

const filteredPokemon = computed(() => {
  // console.log(searchQuery);
  const query = searchQuery.value.toLowerCase();
  return pokemonData.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query)
  );
});

onMounted(() => {
  fetchData();
});

// function isFavPokemon(pokemon) {
//   console.log(pokemon);
//   if (favPokimonList.value) {
//     favPokimonList.value.forEach((p) => {
//       if (p == pokemon) {
//         console.log(5);
//         return true;
//       } else {
//         return false;
//       }
//     });
//   }
// }
// console.log(isFavPokemon);
</script>

<style scoped>
.main {
  align-content: center;
  justify-content: center;
  margin: auto;
}
.is-fav {
  background-color: white;
}
.not-fav {
  background-color: white;
}
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto auto 20%;
  height: auto;
  width: auto;
  gap: 10px;
}

.card {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
  border-radius: 10px;
  height: min-content;
  width: min-content;
  margin: auto;
  padding: 10px;
  color: white;
  transition: box-shadow 0.3s ease-in-out;
}
.card img {
  height: 250px;
  height: 250px;
}
.card button {
  transition: box-shadow 0.3s ease-in-out;
}
.card button:hover {
  background: linear-gradient(
    to right bottom,
    rgba(185, 8, 10),
    rgb(250, 244, 0)
  );
  box-shadow: 0 0 10px 3px yellow;
}
.card:hover {
  box-shadow: 0 0 40px 20px rgb(26, 104, 107);
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
}

.card h1 {
  font-size: 18px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: black;
  font-weight: bold;
}

.buttons {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

button {
  margin: 0 10px;
  background-color: yellow;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-weight: bold;
  border-radius: 10px;
  color: black;
  height: 2rem;
  width: 5rem;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

input[type="text"] {
  width: 300px;
  height: 30px;
  font-size: 16px;
  padding: 5px;
  border-radius: 5px;
  border: none;
  outline: none;
}

@media only screen and (max-width: 767px) {
  .card button {
    height: auto;
    width: auto;
  }
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto auto auto;
    gap: 10px;
  }
  .card {
    background-color: green;
    height: 13rem;
    width: 10rem;
    border-radius: 10px;
    margin: auto;
  }
  .card img {
    height: 100;
    height: 100;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1499px) {
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto auto auto;
    gap: 10px;
  }
  .card {
    background-color: green;
    height: 16rem;
    width: 12rem;
    border-radius: 10px;
    margin: auto;
  }
  .card img {
    height: 200px;
    height: 200px;
  }
}
@media only screen and (min-width: 1500px) {
  .card {
    height: fit-content;
    width: fit-content;
    border-radius: 10px;
    margin: auto;
  }
  .card img {
    height: 250px;
    height: 250px;
  }
}
</style>
