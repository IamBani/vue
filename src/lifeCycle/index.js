

export function lifecycleMixin(Vue) {
    Vue.prototype._upadta = (vnode) => {
       
    }
}

export function mountComponent(vm, el) {
    let updataComponent = () => {
       vm._upadta(vm._render())
    }
    updataComponent()
}