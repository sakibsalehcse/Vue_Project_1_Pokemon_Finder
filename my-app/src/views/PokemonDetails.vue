<template>
  <div>
    <h1>
      Item Details for <span class="pokemon-name">{{ name }}</span>
    </h1>
    <div v-if="itemData">
      <h3>{{ itemData.name }}</h3>
      <p>Item Description: {{ itemData.description }}</p>
      <img :src="itemData.imageUrl" :alt="itemData.name" />
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
    name: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const itemData = ref(null);

    const fetchItemData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/item/${props.name}`
        );
        itemData.value = {
          name: response.data.name,
          description: response.data.description,
          imageUrl: response.data.imageUrl,
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
    };
  },
};
</script>

<style scoped>
h1 {
  color: lightgreen;
}

h1 .pokemon-name {
  color: red;
}
</style>
