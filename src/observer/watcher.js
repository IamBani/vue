import { popTarget, pushTarget } from "./dep";

let id = 0;
export class Watcher{
    constructor(vm,exprOrfn,callback,option) {
        this.vm = vm;
        this.exprOrfn = exprOrfn;
        this.callback = callback;
        this.option = option;
        this.id = id++

        this.deps = []
        this.getter = exprOrfn;
        this.depsId = new Set()
        this.get()
    }
    get() {
        pushTarget(this)
        this.getter()
        popTarget()
    }
    update() {
        this.get()
    }
    addDep(dep){
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.depsId.add(id)
            this.deps.push(dep);
            dep.addSub(this)
        }
    }
}

