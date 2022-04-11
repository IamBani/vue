import { nextTick } from "./nextTick";

let queue = [];
let has = {};
let pending = false;
export function queueWatcher(watcher) {
    const id = watcher.id;
    if (has[id] === undefined) {
        queue.push(watcher);
        has[id] = true
        if (!pending) {
            nextTick(flushSchedulerQueue);
            pending = true
        }
    }
}

function flushSchedulerQueue()
{
    for (let index = 0; index < queue.length; index++) {
         queue[index].run()
    }
    queue = [];
    has = {};
    pending = false
}