export let arrayMethods = Object.create(Array.prototype);
let oldarrayMethods = Array.prototype
let methods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'sort',
  'splice',
  'reverse'
]

methods.forEach(method => {
  arrayMethods[method] = function (...args) {
   let value = oldarrayMethods[method].call(this, ...args)
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2)
    }
    if (inserted) {
      this.__ob__ (inserted)
    }
    return value
  }
})