<template>
  <div class="main">
    <div v-if="itemData" class="rgbcard">
      <h1>
        Details of <span class="pokemon-name">{{ name }}</span>
      </h1>
      <!-- <h3>Name : {{ itemData.name }}</h3> -->
      <div class="info">
        <h3>Name : {{ name }}</h3>
        <h3>ID : {{ id }}</h3>
        <h3>Ability : {{ ability }}</h3>
        <h3>Type : {{ type }}</h3>
        <h3>Weight : {{ weight }}</h3>
        <h3>Height : {{ height }}</h3>
        <h3>Base stat : {{ base_stat }}</h3>
        <h3>Game Index : {{ game_index }}</h3>
        <h3>Base Experience : {{ base_Experience }}</h3>
        <!-- <p>Item Description: {{ itemData.description }}</p> -->
      </div>
      <div><img :src="itemData.imageUrl" :alt="itemData.name" /></div>
    </div>
    <div v-else>
      <p>Loading</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const itemData = ref(null);
    const id = ref(0);
    const ability = ref("");
    const height = ref(0);
    const type = ref("");
    const base_stat = ref(0);
    const weight = ref(0);
    const game_index = ref(0);
    const base_Experience = ref(0);
    const fetchItemData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${props.name}`
        );
        const desc = ref("");

        ability.value = response.data.abilities[0].ability.name;
        id.value = response.data.id;
        height.value = response.data.height;
        type.value = response.data.types[0].type.name;
        base_stat.value = response.data.stats[0].base_stat;
        weight.value = response.data.weight;
        game_index.value = response.data.game_indices[0].game_index;
        base_Experience.value = response.data.base_experience;
        const name = response.data.name;

        desc.value = `${props.name} has
        ability ${response.data.abilities[0].ability.name}
        base_Experience ${response.data.base_experience}
        game_index ${response.data.game_indices[0].game_index}
        weight ${response.data.weight}
        base_stat ${response.data.stats[0].base_stat}
        type ${response.data.types[0].type.name}
        height ${response.data.height}
        ID ${response.data.id}
         `;

        console.log(response.data);
        console.log(name);
        console.log(id);
        console.log(ability);

        itemData.value = {
          name: response.data.name,
          description: desc.value,
          imageUrl: response.data.sprites.back_default,
        };
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchItemData();
    });

    return {
      itemData,
      id,
      ability,
      height,
      type,
      base_stat,
      weight,
      game_index,
      base_Experience,
    };
  },
};
</script>

<style scoped>
.main {
  background-color: cadetblue;
  height: 100vh;
  width: 100vw;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  padding-top: 2%;
}
h1 {
  color: black;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
  height: 70vh;
  width: 60vw;
  margin: auto;
  border-radius: 10px;
}
.container:hover {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
}

img {
  height: 300px;
  width: 300px;
}

.info {
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: large;
  text-align: left;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.rgbcard {
  width: 50rem;
  height: 50rem;
  margin-top: 1rem;
}

p {
  color: white;
}

h1 .pokemon-name {
  color: red;
}
@media (width <= 600px) {
  img {
    height: 150px;
    width: 150px;
  }
  .info {
    font-size: small;
    text-align: center;
  }
  .rgbcard {
    width: 20rem;
    margin-top: 3rem;
  }
}
@media (601px <=width <= 768px) {
  img {
    height: 200px;
    width: 200px;
  }
  .info {
    font-size: small;
    text-align: center;
  }
  .rgbcard {
    width: 25rem;
    height: 45rem;
    margin-top: 3rem;
  }
}
@media (769px <=width <= 992px) {
  img {
    height: 250px;
    width: 250px;
  }
  .info {
    font-size: large;
    text-align: center;
  }
  .rgbcard {
    width: 35rem;
    height: 50rem;
    margin-top: 3rem;
  }
}
@media (993px <=width <= 1200px) {
  img {
    height: 300px;
    width: 300px;
  }
  .info {
    font-size: large;
    text-align: center;
  }
  .rgbcard {
    width: 50rem;
    height: 50rem;
    margin-top: 3rem;
  }
}
</style>
