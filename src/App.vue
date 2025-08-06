<template>
  <div class="frame" :style="{ backgroundColor: bgColor, color: color }">
    <editor />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Editor from "./components/Editor.vue";
import Menu from "./components/Menu.vue";

const bgColor = ref("rgb(41, 37, 36)");
const color = ref("rgb(255, 255, 255)");

onMounted(() => {
  const params = new URLSearchParams(window.location.search);

  const bgParam = params.get("bg") || params.get("background");
  if (bgParam && /^#?[0-9A-Fa-f]{6}$/.test(bgParam)) {
    bgColor.value = bgParam.startsWith("#") ? bgParam : `#${bgParam}`;
  }
  const colorParam = params.get("c") || params.get("color");
  if (colorParam && /^#?[0-9A-Fa-f]{6}$/.test(colorParam)) {
    color.value = colorParam.startsWith("#") ? colorParam : `#${colorParam}`;
  }
});
</script>

<style>
@import url("./style.css");
.frame {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.menu {
  position: fixed;
  top: 0.5vw;
  left: 98vw;
  padding: 0;
  margin: 0;
  fill: #363636;
}
.menu:hover {
  fill: #aeaeae;
}
</style>