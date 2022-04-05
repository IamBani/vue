export const unicodeLetters =
  "a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD";

const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeLetters}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const doctype = /^<!DOCTYPE [^>]+>/i;

const comment = /^<!\--/;
const conditionalComment = /^<!\[/;

let root;
let stack = [];

export function parserHtml(html) {
  function advance(len) {
    html = html.substring(len);
  }
  function parserStartTag() {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };
      advance(start[0].length);
      let attr, end;
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        advance(attr[0].length);
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
      }
      if (end) {
        advance(end[0].length);
      }
      return match;
    }
    return;
  }
  while (html) {
    let textEnd = html.indexOf("<");
    if (textEnd === 0) {
      const startTagMatch = parserStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        end(endTagMatch[1]);
        advance(endTagMatch[0].length);
      }
    }
    let text;
    if (textEnd > 0) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      chars(text);
      advance(text.length);
    }
  }
  return root;
}

function createAstElement(tagName, attrs) {
  return {
    tag: tagName,
    type: 1,
    children: [],
    parent: null,
    attrs,
  };
}
function start(tagName, attribute) {
  let element = createAstElement(tagName, attribute);
  if (!root) {
    root = element;
  }
  stack.push(element);
}

function chars(text) {
  text = text.replace(/\s/g, "");
  let parent = stack[stack.length - 1];
  if (text) {
    parent.children.push({
      type: 3,
      text,
    });
  }
}

function end(tagName) {
  let lastTagName = stack.pop();
  let parent = stack[stack.length - 1];
  lastTagName.parent = parent;
  if (parent) {
    parent.children.push(lastTagName);
  }
  if (lastTagName.tag !== tagName) {
    return new Error("标签错误");
  }
}
