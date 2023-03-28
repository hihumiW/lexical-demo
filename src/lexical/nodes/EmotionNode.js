import { TextNode } from "lexical";

class EmotionNode extends TextNode {
  __className;
  static getType() {
    return "EmotionNode";
  }

  static importJSON(serializedNode) {
    const node = $createEmotionNode("", serializedNode.text);
    return node;
  }

  static clone(node) {
    return new EmotionNode(node.__className, node.__text, node.__key);
  }

  constructor(className, text, key) {
    super(text, key);
    this.__className = className;
  }

  createDOM(config) {
    const dom = super.createDOM(config);
    dom.className = this.__className;
    return dom;
  }
  exportJSON() {
    const exportJSON = {
      ...super.exportJSON(),
      type: EmotionNode.getType(),
      version: 1,
    };
    console.log(exportJSON);
    return exportJSON;
  }
}

export default EmotionNode;

export const $isEmotionNode = (node) => {
  return node instanceof EmotionNode;
};

export const $createEmotionNode = (className, nodeText) => {
  return new EmotionNode(className, nodeText).setMode("token");
};
