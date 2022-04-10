import { Watcher } from "../observer/watcher";
import { patch } from "../vdom/patch"


export function lifecycleMixin(Vue) {
    Vue.prototype._upadta = function (vnode) {
        let vm = this;
      vm.$el = patch(vm.$el,vnode)
    }
}

export function mountComponent(vm, el) {
    let updataComponent = () => {
       vm._upadta.call(vm,vm._render())
    }
    new Watcher(vm,updataComponent,()=>{},true)
}