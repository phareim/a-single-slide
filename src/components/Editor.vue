<template>
  <div class="editor" @click="focus">
    <div class="text" id="text" contenteditable autofocus></div>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})
const focus = () => {
  document.getElementById("text").focus();
}
const state = reactive({charCount:0, lineCount: 0 })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@444&display=swap');
.editor {
  font-family: 'Raleway', sans-serif;
  color: #eeeeee;
  font-size: min(4rem, 6vw);     
  padding: 10vh 5vw;
  width: 88vw;
  height: 78vh;
  display: flex;
  justify-content:center;
  flex-direction: column;
  text-align: center;
}
</style>