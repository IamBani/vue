import { initState } from "./state"

export function initMixin (Vue) {
  Vue.prototype._init = function (option) {
    const vm = this
    vm.$options = option
    initState(vm)
  }
}