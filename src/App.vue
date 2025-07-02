<template>
  <div class="frame">
    <editor />
    <font-selector />
  </div>
</template>

<script setup>
import Editor from "./components/Editor.vue";
import Menu from "./components/Menu.vue";
import FontSelector from "./components/FontSelector.vue";
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