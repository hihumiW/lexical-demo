import {
  $getRoot,
  $getSelection,
  ParagraphNode,
  TextNode,
  createCommand,
  COMMAND_PRIORITY_LOW,
} from "lexical";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useCallback, useEffect, useRef, useState } from "react";

import AutoFocusPlugin from "./plugins/AutoFocus";
import TreeViewPlugin from "./plugins/TreeView";
import EmotionTransformPlugin from "./plugins/EmotionTransform";
import EmotionNode from "./nodes/EmotionNode";
import AndTransformPlugin from "./plugins/AndTransformPlugin";

const theme = {
  placeholder: "editor-placeholder",
  paragraph: "editor-paragraph",
};

const MyCommand = createCommand("MyCommand");

const onError = (e) => {
  console.log("on Error", e);
};

const DemoPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // register update listenner
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
      });
    });
    editor.registerTextContentListener((textContent) => {});
    editor.registerMutationListener(ParagraphNode, (mutatedNodes) => {});
    editor.registerNodeTransform(TextNode, (textNode) => {});

    editor.registerCommand(
      MyCommand,
      (payload) => {
        console.log("my command recived the payload :", payload);
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  useEffect(() => {
    setTimeout(() => {
      editor.dispatchCommand(MyCommand, "hello word");
    }, 1000);
  }, [editor]);

  return null;
};

const initialConfig = {
  namespace: "MyEditor",
  theme,
  onError,
  nodes: [EmotionNode],
};

const DemoEditor = () => {
  const editorRef = useRef();
  const [editorState, setEditorState] = useState();

  // when the editor change , you can get notified via the LexicalOnChangePlugin!
  const onChange = useCallback((editorState, editor) => {
    editorRef.current = editor;
    setEditorState(editorState);
    editorState.read(() => {
      // the $ prefixed helper only can be used in the read function closure
      const root = $getRoot();
      const selection = $getSelection();
    });

    // console.log(JSON.stringify(editorState));
  }, []);

  return (
    <div>
      <p>lexical demo</p>
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={<ContentEditable className="editor-container" />}
          placeholder={<div>enter text...</div>}
          ErrorBoundary={<LexicalErrorBoundary />}
        />
        <OnChangePlugin onChange={onChange} />
        <DemoPlugin />
        <TreeViewPlugin />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <EmotionTransformPlugin />
        <AndTransformPlugin />
      </LexicalComposer>
      <div>json :{editorState && JSON.stringify(editorState)}</div>
    </div>
  );
};

export default DemoEditor;
