import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { registerCodeHighlighting } from "@lexical/code";
import { useEffect } from "react";
export const CodeHighLightPlugin = () => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return registerCodeHighlighting(editor);
  }, [editor]);
  return null;
};
