<template>
  <div class="rgb">
    <img src="../assets/poko.svg" alt="AshPikachu" width="500" height="500" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.rgb {
  /* padding: 0.6em 2em; */
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
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  text-align: center;
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
  /* top: -2px; */
  /* left: -2px; */
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
  background: white;
  left: 0;
  top: 0;
  border-radius: 10px;
}
.body {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
  height: 100vh;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}
.body:hover {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}
</style>
