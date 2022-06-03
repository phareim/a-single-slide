<template>
  <article class="editor h-screen text-7xl" @click="focus">
    <div
      class="text caret-transparent"
      id="text"
      contenteditable
      autofocus
      @input="onUpdate"
    ></div>
  </article>
</template>

<script setup>
import { reactive } from "vue";

let content = "";

function onUpdate(e) {
  state.access++;
  let contentArray = e.target.innerText.split("\n");
  if (contentArray.length > 0) {
    contentArray[0] = `<span class="text-lg">${contentArray[0]}</span>`;
  }
  content = contentArray;
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