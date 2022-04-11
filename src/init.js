import { compileToFunction } from "./compiler/index"
import { initState } from "./state"
import {mountComponent} from './lifeCycle/index'
import { nextTick } from "./observer/nextTick"
export function initMixin (Vue) {
  Vue.prototype._init = function (option) {
    const vm = this
    vm.$options = option
    initState(vm)
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$nextTick = nextTick;

  Vue.prototype.$mount = function (el) {
    el = document.querySelector(el)
    this.$el = el;
    const vm = this;
    let options = vm.$options
    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
        let render = compileToFunction(template)
        vm.$options.render = render
      }
    }
    mountComponent(vm,el)
  }
}