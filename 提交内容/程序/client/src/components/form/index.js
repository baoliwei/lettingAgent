import form from './src/main.vue'

form.install = function (Vue) {
  Vue.component(form.name, form)
}

export default form
