<template>
  <div>
    <form class="searchBox" action="" @submit.prevent="getData">
      <input id="pokemonName" type="search" placeholder="Search Pokemon " />
      <button type="submit" id="search">🔍</button>
    </form>
  </div>
</template>

<script></script>

<style scoped>
* {
  margin: 0;
  padding: 0 0 1% 0;
  box-sizing: border-box;
  background-color: black;
}

body,
input,
textarea,
select,
button {
  color: white;
  font: 400 1rem "Roboto", sans-serif;
}
.searchBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  cursor: pointer;
}
.searchBox input {
  border-radius: 8px 0 0 8px;
  border: 0;
  outline: none;
  height: 36px;
  padding: 4px 16px;
  background-color: white;
  color: #000;
}
.searchBox button {
  border-radius: 0 8px 8px 0;
  border: 0;
  height: 36px;
  padding: 4px 16px;
  background-color: white;
}
</style>
