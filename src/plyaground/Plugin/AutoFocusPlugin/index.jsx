import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const AutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor) return;
    editor.focus();
  }, [editor]);
  return null;
};
