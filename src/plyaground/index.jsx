import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "./Plugin/AutoFocusPlugin";
import { HightLightBorderPlugin } from "./Plugin/HilightBorderPlugin";
import TreeViewPlugin from "../lexical/plugins/TreeView";
import { registerNodes } from "./Nodes";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { editorTheme } from "./editorTheme";
import "./index.css";
import { ToolbarPlugin } from "./Plugin/ToolbarPlugin";
import { InlinePlugin } from "./Plugin/InlinePlugin";
import { IndentPlugin } from "./Plugin/IndentPlugin";
import { CodeHighLightPlugin } from "./Plugin/CodeHightPlugin";

const onEditorError = (e) => {
  console.log("editor error occur:", e);
};

const initialConfig = {
  namespace: "MyEditor",
  onError: onEditorError,
  nodes: registerNodes,
  theme: editorTheme,
};

const Editor = () => {
  const containerId = "MyEditor";
  return (
    <div className="my-editor-outter-container">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="my-editor-toolbar-container">
          <ToolbarPlugin />
          <InlinePlugin />
        </div>
        <div className="my-editor-container" id={containerId}>
          <RichTextPlugin
            contentEditable={<ContentEditable className="my-editor-content" />}
            placeholder={<EditorPlaceholder />}
          />
        </div>
        <TreeViewPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <AutoFocusPlugin />
        <HightLightBorderPlugin containerId={containerId} />
        <HistoryPlugin />
        <IndentPlugin />
        <CodeHighLightPlugin />
        <LinkPlugin />
      </LexicalComposer>
    </div>
  );
};

const EditorPlaceholder = () => {
  return <div className="editor-placeholder">いまなにしてる？</div>;
};

export default Editor;
