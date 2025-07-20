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
  if (content) {
    const contentString = content.textContent || '';
    localStorage.setItem('content', JSON.stringify(contentString));
  }
}

async function onUpdate(e) {
  writing();
  state.access++;
  content = e.target;
  await updateContent();

  await nextTick();
  const selection = document.getSelection();
  if (selection.focusNode) {
    selection.collapse(selection.focusNode, selection.anchorOffset);
  }
}

const focus = () => {
  const storedContent = localStorage.getItem('content');
  if (storedContent) {
    try {
      const parsedContent = JSON.parse(storedContent);
      const textElement = document.querySelector('#text');
      if (textElement) {
        textElement.innerHTML = parsedContent;
        textElement.focus();
      }
    } catch (e) {
      console.error('Error parsing stored content:', e);
    }
  }
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