/** @type {import('lexical').EditorThemeClasses} */
export const editorTheme = {
  paragraph: "editor-paragraph",
  heading: {
    h1: "editor-content-h1",
    h2: "editor-content-h2",
    h3: "editor-content-h3",
  },
  quote: "editor-quote",
  list: {
    ul: "editor-ul",
    ol: "editor-ol",
    nested: {
      listitem: "editor-list-item-nested",
    },
    listitemChecked: "editor-list-item-check checked",
    listitemUnchecked: "editor-list-item-check unchecked",
  },
  code: "editor-code",
  // codehighlight 内部では　prismjs が使用されています。
  codeHighlight: {
    function: "token function",
    keyword: "token keyword",
    atrule: "token atrule",
    attrValue: "token attr-value",
  },
  text: {
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
    underlineStrikethrough: "editor-text-underlineStrikethrough",
    code: "editor-text-code",
    subscript: "editor-text-subscript",
    superscript: "editor-text-superscript",
  },
};
