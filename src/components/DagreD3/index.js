import DagreD3 from "./src"

export default {
    install: (Vue) => {
        Vue.component(DagreD3.name, DagreD3)
    }
}