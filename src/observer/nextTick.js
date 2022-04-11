const callback = []
let waiting =false
function flushCallbacks() {
    callback.forEach(cb => cb())
    waiting = false
}
export function nextTick(cb) {
    callback.push(cb)
    if (!waiting) {
        timerFn(flushCallbacks)
        waiting =true
    }
}

function timerFn(flushCallbacks) {
    if (Promise) {
        Promise.resolve().then(flushCallbacks)
    } else if (MutationObserver) {
        let textNode = document.createTextNode(1);
        let observer = new MutationObserver(flushCallbacks);
        observer.observe(textNode, {
            characterData:true
        })
        textNode.textContent = 3;
    } else if (setImmediate) {
        setImmediate(flushCallbacks)
    } else {
        setTimeout(flushCallbacks)
    }
    waiting = false
}