import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TextNode } from "lexical";
import { useEffect } from "react";
import { $createEmotionNode } from "../../nodes/EmotionNode";

const EmotionTransform = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(
      TextNode,
      (textNode) => {
        const nodeTextContent = textNode.getTextContent();
        if (nodeTextContent === ":)") {
          textNode.replace($createEmotionNode("", "😊"));
        }
        if (nodeTextContent === ":(") {
          textNode.replace($createEmotionNode("", "😒"));
        }
        if (nodeTextContent === "xw") {
          textNode.replace($createEmotionNode("", "yamamoto"));
        }
      }
    );
    return () => {
      removeTransform();
    };
  }, [editor]);

  return null;
};

export default EmotionTransform;
