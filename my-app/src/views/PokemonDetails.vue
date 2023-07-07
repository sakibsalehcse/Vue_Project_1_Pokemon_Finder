<template>
  <div>
    <h1>
      Item Details for <span class="pokemon-name">{{ name }}</span>
    </h1>
    <div v-if="itemData">
      <!-- <h3>Name : {{ itemData.name }}</h3> -->
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

      <img :src="itemData.imageUrl" :alt="itemData.name" />
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
h1 {
  color: lightgreen;
}

p {
  color: white;
}

h1 .pokemon-name {
  color: red;
}
</style>
