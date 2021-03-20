<template>
<div contenteditable class="editor" />
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({charCount:0, lineCount: 0})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@444&display=swap');
.editor {
      font-family: 'Raleway', sans-serif;
      color: #eeeeee;
      font-size: min(5rem, 7vw);     
      padding: 10vh 5vw;
      width: 90vw;
      height: 80vh;
      text-align: center;
    }
</style>