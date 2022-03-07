import { isObject } from "../utils";

export function observer (data) {
  if (!isObject(data)) {
    return
  }
  return new Observer(data)
}
 
class Observer{
  constructor(data) {
    this.walk(data)
  }
  walk (data) {
    Object.keys(data).forEach(keys => {
      defineReactive(data, keys, data[keys]);
    })
  }
}

function defineReactive (data, keys, value) {
  observer(value)
  Object.defineProperty(data, keys, {
    get () {
      return value
    },
    set (newValue) {
      console.log(newValue)
      observer(newValue)
      value = newValue
    }
  })
}