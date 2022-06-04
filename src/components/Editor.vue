<template>
  <article class="editor h-screen text-7xl" @click="focus">
    <div
      class="text caret-slate-400"
      id="text"
      contenteditable
      autofocus
      @input="onUpdate"
      v-html="content"
    ></div>
  </article>
</template>

<script setup>
import { reactive, nextTick } from "vue";

let content = "";

async function onUpdate(e) {
  state.access++;
  const offset = document.getSelection().anchorOffset;
  content = e.target.innerText;
  e.target.innerText = content;

  //await nextTick();
  const sel = document.getSelection();

  document.getSelection().collapse(e.target.childNodes[0], offset);
}

const focus = () => {
  document.getElementById("text").focus();
};
const state = reactive({ access: 0 });
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@444&display=swap");
.editor {
  font-family: "Raleway", sans-serif;
  color: #eeeeee;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
</style>