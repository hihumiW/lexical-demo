import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { registerCodeHighlighting, CodeNode } from "@lexical/code";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
} from "lexical";
import { $getNearestNodeOfType } from "@lexical/utils";
export const CodeHighLightPlugin = () => {
  const [editor] = useLexicalComposerContext();
  useCodeHilightRegister(editor);
  useCodeLanguageChangeRegister(editor);
  return null;
};

const useCodeHilightRegister = (editor) => {
  useEffect(() => {
    return registerCodeHighlighting(editor);
  }, [editor]);
};

export const CODE_LANGUAGE_COMMAND = createCommand();
const useCodeLanguageChangeRegister = (editor) => {
  useEffect(() => {
    return editor.registerCommand(
      CODE_LANGUAGE_COMMAND,
      (payload) => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) && payload) {
          const anchorNode = selection.anchor.getNode();
          const parentCodeNode = $getNearestNodeOfType(anchorNode, CodeNode);
          if (parentCodeNode) {
            parentCodeNode.setLanguage(payload);
          }
        }
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);
};
