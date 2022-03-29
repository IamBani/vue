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

export function compileToFunction(template) {
  console.log(template);
  parserHtml(template);
}

function parserHtml(html) {
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
      let attr,end;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length)
        match.attrs.push({ name:attr[1],value:attr[3] || attr[4] || attr[5]})
      }
      console.log(match, html.match(startTagClose));
      if (end) {
         advance(end[0].length);
      }
      return match
    }
    return;
  }
  while (html) {
    let textEnd = html.indexOf("<");
    if (textEnd === 0) {
      const startTagMatch = parserStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue;
      }
      const endTagMatch = html.match(endTag)
      if (endTagMatch) {
        end(endTagMatch[1])
        advance(endTagMatch[0].length)
      }
    }
    let text;
    if (textEnd > 0) {
      text = html.substring(0,textEnd)
    }
    if (text) {
      chars(text)
      advance(text.length)
    }
  }
}


function start(tagName,attribute) {
  console.log(tagName,attribute)
}


function chars(text) {
  console.log(text)
}

function end(tagName) {
  console.log(tagName)
}