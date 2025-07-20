<template>
  <div class="frame" :style="{ backgroundColor: bgColor }">
    <editor />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Editor from "./components/Editor.vue";
import Menu from "./components/Menu.vue";

const bgColor = ref("rgb(41, 37, 36)");

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const bgParam = params.get("bg");
  if (bgParam && /^#?[0-9A-Fa-f]{6}$/.test(bgParam)) {
    bgColor.value = bgParam.startsWith("#") ? bgParam : `#${bgParam}`;
  }
});
</script>

<style>
@import url("./style.css");
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