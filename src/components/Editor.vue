<template>
  <article class="editor h-screen text-7xl" @click="focus" :style="{ fontFamily: `'${currentFont}', sans-serif` }">
    <div
      class="caret-transparent relative"
      id="text"
      contenteditable
      autofocus
      @input="onUpdate"
      @focus="handleFocus"
      @blur="handleBlur"
      v-html="content"
    ></div>
    <!-- Custom blinking cursor -->
    <div 
      v-show="isFocused && showCursor"
      class="custom-cursor"
      :style="cursorStyle"
    ></div>
  </article>
</template>

<script setup>
import { reactive, nextTick, ref, onMounted, onUnmounted } from "vue";
import { useGoogleFonts } from "../composables/useGoogleFonts.js";

const { currentFont, fontWeight, setFontFromUrl } = useGoogleFonts();

let isWriting = true; // well, this does not actually work as intended...
let content = undefined;

// Focus and cursor state
const isFocused = ref(false);
const showCursor = ref(true);
const cursorStyle = ref({});
let cursorInterval = null;

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
  
  // Update cursor position
  updateCursorPosition();
}

const handleFocus = () => {
  isFocused.value = true;
  startCursorBlink();
  updateCursorPosition();
};

const handleBlur = () => {
  isFocused.value = false;
  stopCursorBlink();
};

const startCursorBlink = () => {
  showCursor.value = true;
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value;
  }, 530); // Standard cursor blink rate
};

const stopCursorBlink = () => {
  if (cursorInterval) {
    clearInterval(cursorInterval);
    cursorInterval = null;
  }
  showCursor.value = false;
};

const updateCursorPosition = () => {
  if (!isFocused.value) return;
  
  nextTick(() => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const editorRect = document.querySelector('.editor').getBoundingClientRect();
      
      cursorStyle.value = {
        left: `${rect.left - editorRect.left}px`,
        top: `${rect.top - editorRect.top}px`,
        height: `${rect.height || 72}px`, // Fallback height for empty content
      };
    }
  });
};

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

onMounted(() => {
  // Listen for selection changes to update cursor position
  document.addEventListener('selectionchange', updateCursorPosition);
});

onUnmounted(() => {
  stopCursorBlink();
  document.removeEventListener('selectionchange', updateCursorPosition);
});

const state = reactive({ access: 0 });
</script>

<style scoped>
.editor {
  color: #eeeeee;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  position: relative;
}

.custom-cursor {
  position: absolute;
  width: 2px;
  background-color: #eeeeee;
  pointer-events: none;
  z-index: 1000;
}
</style>