<template>
  <div class="body">
    <img src="../assets/poko.svg" alt="AshPikachu" width="500" height="500" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.body {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
  height: 65vh;
  border-radius: 10px;
}
.body:hover {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}
</style>
