<template>
  <article class="editor h-screen text-7xl" @click="focus">
    <div
      class="caret-transparent"
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
let isWriting = true; // well, this does not actually work as intended...
let content = undefined;

function writing() {
  isWriting = true;

  // get id returned from setTimeout, store in array, clearTimeout(timeoutID) for all but newest.
  setTimeout(() => {
    isWriting = false;
  }, "3000");
}

async function updateContent() {
  console.log("content", content);
  localStorage.setItem("content", JSON.stringify(content));
  console.log("content", eval(localStorage.getItem("content")));
}

async function onUpdate(e) {
  writing();
  state.access++;

  content = e.target.childNodes;

  updateContent();

  await nextTick();
  const selection = document.getSelection();
  selection.collapse(selection.focusNode, selection.anchorOffset);
}

const focus = () => {
  content = localStorage.getItem(JSON.parse("content"));
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