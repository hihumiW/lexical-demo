import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTextNode, TextNode } from "lexical";

const AndTransformPlugin = () => {
  const [editor] = useLexicalComposerContext();
  editor.registerNodeTransform(TextNode, (textNode) => {
    const textContent = textNode.getTextContent();
    if (textContent === "&") {
      const node = $createTextNode("and").setMode("token");
      textNode.replace(node);
    }
  });

  return null;
};

export default AndTransformPlugin;
