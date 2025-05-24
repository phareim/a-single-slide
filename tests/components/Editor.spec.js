import { mount } from '@vue/test-utils'
import Editor from '@/components/Editor.vue'

describe('Editor.vue', () => {
  let wrapper

  beforeEach(() => {
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
    
    contentEditableDiv.element.textContent = testContent
    await contentEditableDiv.trigger('input')

    const storedContent = JSON.parse(localStorage.getItem('content'))
    expect(storedContent).toBe(testContent)
  })

  it('loads and focuses content on click', async () => {
    const testContent = 'Test Content'
    localStorage.setItem('content', JSON.stringify(testContent))
    
    const wrapper = mount(Editor, { attachTo: document.body })
    const contentEditableDiv = wrapper.find('#text')
    const focusSpy = jest.spyOn(contentEditableDiv.element, 'focus')
    
    expect(contentEditableDiv.element.textContent).toBe('')
    await wrapper.trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(contentEditableDiv.element.textContent).toBe(testContent)
    expect(focusSpy).toHaveBeenCalled()
    expect(JSON.parse(localStorage.getItem('content'))).toBe(testContent)
    
    wrapper.unmount()
  })
}) 