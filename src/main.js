import { initMixin } from "./init"
import { lifecycleMixin } from "./lifeCycle/index";
import { renderMixin } from "./lifeCycle/render";

function Vue (option) {
  this._init(option)
}
initMixin(Vue)
renderMixin(Vue);
lifecycleMixin(Vue)
export default  Vue