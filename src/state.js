import { observer } from "./observer/index";
import { isFunction } from "./utils";

export function initState (vm) {
  const opt = vm.$options;
  if (opt.data) {
    initData(vm)
  }
  if (opt.computed) {
    initComputed()
  }
  if (opt.watch) {
    initWatch()
  }
}
function initData (vm) {
  let data = vm.$options.data
  data = vm._data = isFunction(data) ? data.call(vm) : data
  observer(data)
}

export function proxy (vm,source,value) {
  Object.defineProperty(vm, source, {
    get () {
      return vm[source]
    },
    set () {
      vm[source] = value
    }
  })
}

function initComputed () {
  
}

function initWatch () {
  
}