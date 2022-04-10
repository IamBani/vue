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
  for (const key in data) {
   proxy(vm,'_data',key)
  }
  observer(data)
}

export function proxy (vm,source,key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(value) {
      vm[source][key] = value;
    },
  });
}

function initComputed () {
  
}

function initWatch () {
  
}