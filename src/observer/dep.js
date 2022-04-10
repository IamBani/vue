let id = 0;
export class Dep {
  constructor() {
    this.id = id++;
    this.subs = [];
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
    addSub(watcher) {
      this.subs.push(watcher)
    }
    notify() {
        this.subs.forEach((watch) => watch.update());
    }
}

Dep.target = null

export function pushTarget(watcher) {
    Dep.target = watcher;
}

export function popTarget() {
    Dep.target = null;
}