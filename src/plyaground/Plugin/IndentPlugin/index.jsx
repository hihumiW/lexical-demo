import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  INDENT_CONTENT_COMMAND,
  KEY_TAB_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export const IndentPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_TAB_COMMAND,
      (event) => {
        event.preventDefault();
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          editor.dispatchCommand(
            event.shiftKey ? OUTDENT_CONTENT_COMMAND : INDENT_CONTENT_COMMAND
          );
        }
        // 让其他KEY_TAB_COMMAND 也能受到处理
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  return null;
};
