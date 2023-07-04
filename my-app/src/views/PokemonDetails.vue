<template>
  <div>
    <h2>Item Details for {{ pokemonName }}</h2>
    <div v-if="itemData">
      <h3>{{ itemData.name }}</h3>
      <p>Item Description: {{ itemData.description }}</p>
    </div>
    <div v-else>
      <p>Loading item details...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  props: {
    pokemonName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const itemData = ref(null);

    const fetchItemData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/item/${props.pokemonName}`
        );
        itemData.value = response.data;
        console.log(itemData.value);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchItemData();
    });

    return {
      itemData,
    };
  },
};
</script>
