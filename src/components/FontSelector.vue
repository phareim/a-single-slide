<template>
  <div class="font-selector" v-if="showSelector">
    <div class="selector-header">
      <h3>Font Selector</h3>
      <button @click="toggleSelector" class="close-btn">×</button>
    </div>
    <div class="selector-content">
      <div class="font-input">
        <label for="font-family">Font Family:</label>
        <select 
          id="font-family" 
          :value="currentFont" 
          @change="onFontChange"
        >
          <option v-for="font in availableFonts" :key="font" :value="font">
            {{ font }}
          </option>
        </select>
      </div>
      
      <div class="weight-input">
        <label for="font-weight">Font Weight:</label>
        <select 
          id="font-weight" 
          :value="fontWeight" 
          @change="onWeightChange"
        >
          <option value="100">Thin (100)</option>
          <option value="200">Extra Light (200)</option>
          <option value="300">Light (300)</option>
          <option value="400">Regular (400)</option>
          <option value="500">Medium (500)</option>
          <option value="600">Semi Bold (600)</option>
          <option value="700">Bold (700)</option>
          <option value="800">Extra Bold (800)</option>
          <option value="900">Black (900)</option>
        </select>
      </div>
      
      <div class="url-display">
        <label>Current URL:</label>
        <code>{{ currentUrl }}</code>
      </div>
    </div>
  </div>
  
  <button 
    v-else 
    @click="toggleSelector" 
    class="toggle-btn"
    title="Font Settings"
  >
    Aa
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGoogleFonts } from '../composables/useGoogleFonts.js'

const { currentFont, fontWeight, availableFonts, updateFont, updateUrl } = useGoogleFonts()
const showSelector = ref(false)

const toggleSelector = () => {
  showSelector.value = !showSelector.value
}

const onFontChange = (event) => {
  const newFont = event.target.value
  updateFont(newFont, fontWeight.value)
  updateUrl(newFont, fontWeight.value)
}

const onWeightChange = (event) => {
  const newWeight = event.target.value
  updateFont(currentFont.value, newWeight)
  updateUrl(currentFont.value, newWeight)
}

const currentUrl = computed(() => {
  const url = new URL(window.location.href)
  url.searchParams.set('font', currentFont.value)
  url.searchParams.set('weight', fontWeight.value)
  return url.href
})
</script>

<style scoped>
.font-selector {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(41, 37, 36, 0.95);
  border: 1px solid #666;
  border-radius: 8px;
  padding: 20px;
  min-width: 300px;
  max-width: 400px;
  z-index: 1000;
  color: #eeeeee;
  backdrop-filter: blur(10px);
}

.selector-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.selector-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #eeeeee;
}

.close-btn {
  background: none;
  border: none;
  color: #eeeeee;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
}

.close-btn:hover {
  color: #ccc;
}

.selector-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.font-input, .weight-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.font-input label, .weight-input label {
  font-size: 0.9rem;
  color: #ccc;
}

.font-input select, .weight-input select {
  background: #333;
  border: 1px solid #555;
  color: #eeeeee;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.url-display {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.url-display label {
  font-size: 0.9rem;
  color: #ccc;
}

.url-display code {
  background: #222;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  word-break: break-all;
  color: #87ceeb;
}

.toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(41, 37, 36, 0.8);
  border: 1px solid #666;
  color: #eeeeee;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.toggle-btn:hover {
  background: rgba(41, 37, 36, 0.95);
}
</style>