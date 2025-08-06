<template>
  <article class="editor h-screen text-7xl" @click="focus">
    <div
      id="text"
      contenteditable
      autofocus
      @input="onUpdate"
      @keydown="onKey"
      class="outline-none"
      :class="{ 'caret-hidden': !caretVisible }"
    ></div>
  </article>
</template>

<script setup>
import { ref, nextTick } from "vue";

// Stored HTML content string
const content = ref("");

// caret visibility management
const caretVisible = ref(true);
let caretTimeout = null;

function resetCaretTimer() {
  caretVisible.value = true;
  if (caretTimeout) clearTimeout(caretTimeout);
  caretTimeout = setTimeout(() => {
    caretVisible.value = false;
  }, 5000);
}

function updateContent(newContent) {
  content.value = newContent;
  localStorage.setItem("content", JSON.stringify(newContent));
}

function onUpdate(e) {
  resetCaretTimer();
  const newContent = e.target.innerHTML;
  updateContent(newContent); // do NOT mutate DOM through Vue, keeps caret
}

function onKey() {
  resetCaretTimer();
}

const focus = async () => {
  const storedContent = localStorage.getItem("content");
  await nextTick();
  const textElement = document.querySelector("#text");
  if (!textElement) return;

  // Load saved content only if it's different from current content
  if (storedContent) {
    try {
      const parsedContent = JSON.parse(storedContent);
      // Only update innerHTML if content has actually changed
      if (textElement.innerHTML !== parsedContent) {
        content.value = parsedContent;
        textElement.innerHTML = content.value;
        
        // Set cursor to the end of the loaded text
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(textElement);
        range.collapse(false); // false = collapse to end
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } catch (e) {
      console.error("Error parsing stored content:", e);
    }
  }

  textElement.focus(); // browser can now maintain caret position
  resetCaretTimer();
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@444&display=swap");
.editor {
  font-family: "Raleway", sans-serif;
  color: inherit;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.caret-hidden {
  caret-color: transparent;
}
</style>