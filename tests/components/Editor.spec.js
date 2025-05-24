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
    
    // Set the content directly
    contentEditableDiv.element.textContent = testContent
    
    // Trigger the input event
    await contentEditableDiv.trigger('input')

    // Check if content was updated in localStorage
    const storedContent = JSON.parse(localStorage.getItem('content'))
    expect(storedContent).toBe(testContent)
  })

  it('loads and focuses content on click', async () => {
    const testContent = 'Test Content'
    localStorage.setItem('content', JSON.stringify(testContent))
    
    // Mount the component with attachTo: document.body to ensure proper DOM mounting
    const wrapper = mount(Editor, {
      attachTo: document.body
    })
    
    const contentEditableDiv = wrapper.find('#text')
    const focusSpy = jest.spyOn(contentEditableDiv.element, 'focus')
    
    // Verify initial state
    expect(contentEditableDiv.element.textContent).toBe('')
    
    // Trigger click and wait for updates
    await wrapper.trigger('click')
    await wrapper.vm.$nextTick()
    
    // Verify final state
    expect(contentEditableDiv.element.textContent).toBe(testContent)
    expect(focusSpy).toHaveBeenCalled()
    
    // Verify localStorage is still intact
    expect(JSON.parse(localStorage.getItem('content'))).toBe(testContent)
    
    // Clean up
    wrapper.unmount()
  })
}) 