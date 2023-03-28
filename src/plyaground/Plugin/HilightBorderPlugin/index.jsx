import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";

export const HightLightBorderPlugin = (props) => {
  const { containerId } = props;
  const [editor] = useLexicalComposerContext();
  useBorderHight(editor, containerId);
  return null;
};

const useBorderHight = (editor, containerId) => {
  const [containerDOM, setContainerDOM] = useState();

  useEffect(() => {
    const target = document.getElementById(containerId);
    target && setContainerDOM(target);
  }, [containerId]);

  const onRootElementFocus = useCallback(() => {
    if (!containerDOM) return;
    containerDOM.classList.add("active");
  }, [containerDOM]);

  const onRootElemntBlur = useCallback(() => {
    if (!containerDOM) return;
    containerDOM.classList.remove("active");
  }, [containerDOM]);

  useEffect(() => {
    if (!editor) return;
    return editor.registerRootListener((rootElement, prevRootElement) => {
      if (rootElement) {
        rootElement.addEventListener("focus", onRootElementFocus);
        rootElement.addEventListener("blur", onRootElemntBlur);
      }
      if (prevRootElement) {
        prevRootElement.removeEventListener("focus", onRootElementFocus);
        prevRootElement.removeEventListener("blur", onRootElemntBlur);
      }
    });
  }, [editor, onRootElementFocus, onRootElemntBlur]);
};
