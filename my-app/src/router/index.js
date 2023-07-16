import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PokemonDetails from "../views/PokemonDetails.vue";
import AboutView from "../views/AboutView.vue";
import FavPokeomList from "../components/FavPokemonList.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/pokemon-details/:name",
    name: "PokemonDetails",
    component: PokemonDetails,
    props: true,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/favPokemonList",
    name: "favPokemonList",
    component: FavPokeomList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
