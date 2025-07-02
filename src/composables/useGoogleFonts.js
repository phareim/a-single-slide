import { ref, onMounted, watch } from 'vue'

export function useGoogleFonts() {
  const currentFont = ref('Raleway') // Default font
  const fontWeight = ref('400') // Default weight
  const availableFonts = ref([
    'Raleway',
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Source Sans Pro',
    'Oswald',
    'Merriweather',
    'Playfair Display',
    'Poppins',
    'Nunito',
    'PT Sans',
    'Ubuntu',
    'Crimson Text',
    'Lora',
    'Work Sans',
    'Fira Sans',
    'Rubik',
    'DM Sans'
  ])

  const getUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const fontParam = urlParams.get('font')
    const weightParam = urlParams.get('weight')
    
    if (fontParam) {
      currentFont.value = fontParam
    }
    if (weightParam) {
      fontWeight.value = weightParam
    }
  }

  const loadGoogleFont = (fontFamily, weight = '400') => {
    // Remove existing dynamic font links
    const existingLinks = document.querySelectorAll('link[data-dynamic-font]')
    existingLinks.forEach(link => link.remove())

    // Create new font link
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily.replace(/\s+/g, '+'))}:wght@${weight}&display=swap`
    link.setAttribute('data-dynamic-font', 'true')
    
    document.head.appendChild(link)
  }

  const updateFont = (fontFamily, weight) => {
    currentFont.value = fontFamily
    fontWeight.value = weight
    loadGoogleFont(fontFamily, weight)
  }

  const setFontFromUrl = () => {
    getUrlParams()
    loadGoogleFont(currentFont.value, fontWeight.value)
  }

  // Watch for font changes and update URL
  const updateUrl = (font, weight) => {
    const url = new URL(window.location)
    url.searchParams.set('font', font)
    url.searchParams.set('weight', weight)
    window.history.replaceState({}, '', url)
  }

  onMounted(() => {
    setFontFromUrl()
  })

  return {
    currentFont,
    fontWeight,
    availableFonts,
    updateFont,
    setFontFromUrl,
    updateUrl
  }
}