<template>
  <div class="one">
    <input type="text" v-model="searchQuery" placeholder="Search Pokemon" />
    <div class="main">
      <h1>{{ localStorageData }}</h1>
      <div class="container">
        <div
          class="card"
          v-for="(pokemon, index) in filteredPokemon"
          :key="pokemon.name"
        >
          <button class="rgbbtn" @click="AddToFav(pokemon)">
            <span v-if="pokemon.isFav">⭐</span>
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
        <button class="rgbbtn" v-if="totalPokemon > 0" @click="previousPage">
          Previous
        </button>
        <button
          class="rgbbtn"
          v-if="totalPokemon + 6 < pokemonCount"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
const pokemonData = ref([]);
const pokemonCount = ref(0);
const totalPokemon = ref(0);
const searchQuery = ref("");
const limit = ref(100);

const fetchData = async () => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit.value}&offset=${totalPokemon.value}`
    );
    const apiPokemonData = response.data.results;

    const localFavPokemon =
      JSON.parse(localStorage.getItem("LocalValFavPokemon")) || [];
    apiPokemonData.forEach((pokemon) => {
      const isFavPokemon = localFavPokemon.some(
        (localFav) => localFav.name === pokemon.name
      );
      if (isFavPokemon) {
        pokemon.isFav = true;
      } else {
        pokemon.isFav = false;
      }
    });

    pokemonData.value = apiPokemonData;
    pokemonCount.value = response.data.count;
  } catch (error) {
    console.error(error);
  }
};

const getPokemonImageUrl = (index) => {
  console.log("image index", index);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
};

const navigateToPokemonDetails = (pokemon) => {
  router.push({ name: "PokemonDetails", params: { name: pokemon.name } });
};

const previousPage = () => {
  totalPokemon.value -= 10;
  fetchData();
};

const nextPage = () => {
  totalPokemon.value += 10;
  fetchData();
};

const favPokimonList = ref(
  JSON.parse(localStorage.getItem("LocalValFavPokemon")) || []
);

function AddToFav(pokemon) {
  const index = favPokimonList.value.findIndex((p) => p.name === pokemon.name);
  if (index !== -1) {
    favPokimonList.value.splice(index, 1);
    pokemon.isFav = false;
  } else {
    favPokimonList.value.push(pokemon);
    pokemon.isFav = true;
  }
  const storeLocalVal = JSON.stringify(favPokimonList.value);
  localStorage.setItem("LocalValFavPokemon", storeLocalVal);
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
  const query = searchQuery.value.toLowerCase();
  const filteredData = pokemonData.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query)
  );
  console.log("filterdata", filteredData);
  return filteredData.slice(0, 10);
});

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.one input {
  margin: 10px auto auto auto;
}
.one {
  height: 80vh;
  width: 90vw;
  border-radius: 10px;
}
.main {
  align-content: center;
  justify-content: center;
  margin: auto;
  /* background-color: black; */
}
.is-fav {
  background-color: white;
}
.not-fav {
  background-color: white;
}
.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  align-items: center;
  text-align: center;
  /* margin: 0 auto auto 20%; */
  /* border: solid 2px;
  border-radius: 10px;
  border-color: red;
  padding: 10px; */
  height: auto;
  width: auto;
  gap: 40px;
  padding: 20px;
  /* background-color: beige; */
}

.card {
  cursor: pointer;
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
/* .card button {
  transition: box-shadow 0.3s ease-in-out;
}
.card button:hover {
  background: linear-gradient(
    to right bottom,
    rgba(185, 8, 10),
    rgb(250, 244, 0)
  );
  box-shadow: 0 0 10px 3px yellow;
} */
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
  gap: 2rem;
}

/* button {
  margin: 0 10px;
  background-color: yellow;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-weight: bold;
  border-radius: 10px;
  color: black;
  height: 2rem;
  width: 5rem;
} */

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
