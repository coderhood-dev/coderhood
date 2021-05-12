import create from 'zustand'

const useStore = create((set) => {
  return {
    router: {},
    dom: null,
    lesson: null,
  }
})

export default useStore
