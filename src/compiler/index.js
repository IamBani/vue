import { generate } from "./generate";
import { parserHtml } from "./parser/html-parser";



export function compileToFunction(template) {
  let root = parserHtml(template);

  let code = generate(root)
  return new Function(`with (this) {return ${code}}`);
}

