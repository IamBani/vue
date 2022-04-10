
export function patch(oldvnode, vnode) {
    if (oldvnode.nodeType === 1) {
        const parent = oldvnode.parentNode;
        let elm = createEle(vnode);
        parent.insertBefore(elm, oldvnode.nextSibling);
        parent.removeChild(oldvnode);
        return elm
    }
}


function createEle(vnode) {
    let { tag, data, children, text, vm } = vnode
    if (typeof tag === 'string') {
        vnode.el = document.createElement(tag);
        children.forEach(child => {
            vnode.el.appendChild(createEle(child))
        })
    } else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}