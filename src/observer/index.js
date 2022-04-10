import { isObject } from "../utils";
import { arrayMethods } from "./array";
import { Dep } from "./dep";

export function observer (data) {
  if (!isObject(data)) {
    return
  }
  return new Observer(data)
}
 
class Observer{
  constructor(data) {
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods
      data.__proto__.__ob__ = observer
      this.observerArray(data)
    } else {
      this.walk(data)
    }
  }
  observerArray (data) {
    data.forEach(item=>observer(item))
  }
  walk (data) {
    Object.keys(data).forEach(keys => {
      defineReactive(data, keys, data[keys]);
    })
  }
}

function defineReactive (data, keys, value) {
  observer(value)
  let dep = new Dep()
  Object.defineProperty(data, keys, {
    get() {
      if (Dep.target) {
        dep.depend()
      }
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        console.log(newValue);
        observer(newValue);
        value = newValue;
        dep.notify()
      }
    }
  })
}