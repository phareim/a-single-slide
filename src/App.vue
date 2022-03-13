<template>
  <div class="frame">
    <editor />
  </div>
</template>

<script setup>
import Editor from "./components/Editor.vue";
import Menu from "./components/Menu.vue";
</script>

<style>
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