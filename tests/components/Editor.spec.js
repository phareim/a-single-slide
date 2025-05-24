import { mount } from '@vue/test-utils'
import Editor from '@/components/Editor.vue'

describe('Editor.vue', () => {
  let wrapper

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    wrapper = mount(Editor)
  })

  it('renders the editor component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('has contenteditable div', () => {
    const contentEditableDiv = wrapper.find('#text')
    expect(contentEditableDiv.exists()).toBe(true)
    expect(contentEditableDiv.attributes('contenteditable')).toBeDefined()
  })

  it('updates content on input', async () => {
    const contentEditableDiv = wrapper.find('#text')
    const testContent = 'Hello, World!'
    
    // Simulate input event
    await contentEditableDiv.trigger('input', {
      target: {
        childNodes: testContent
      }
    })

    // Check if content was updated in localStorage
    const storedContent = JSON.parse(localStorage.getItem('content'))
    expect(storedContent).toBe(testContent)
  })

  it('focuses the editor when clicked', async () => {
    const contentEditableDiv = wrapper.find('#text')
    await wrapper.trigger('click')
    
    // Check if the element has focus
    expect(document.activeElement).toBe(contentEditableDiv.element)
  })
}) 