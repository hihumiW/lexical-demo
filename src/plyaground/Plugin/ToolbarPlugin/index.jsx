import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import {
  $createHeadingNode,
  $isHeadingNode,
  $createQuoteNode,
} from "@lexical/rich-text";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_CHECK_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";
import {
  $isCodeNode,
  $createCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
} from "@lexical/code";
import { CODE_LANGUAGE_COMMAND } from "../CodeHightPlugin";
import { $getNearestNodeOfType } from "@lexical/utils";
import { $setBlocksType } from "@lexical/selection";
import { useCallback, useEffect, useState } from "react";
import "./index.css";

const supportBlockTypeSet = ["paragraph", "h1", "h2", "h3", "blockquote"];

const supportListTypeSet = ["bullet", "number", "check"];

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const [blockType, setBlockType] = useState(supportBlockTypeSet[0]);
  const [codeLanguage, setCodeLanguage] = useState("js");
  const formatList = useCallback(
    (type) => {
      // dispatch的commands需要提前register；所以你需要加载对应的Plugin（ListPlugin 和 CheckListPlugin）
      if (type === blockType) {
        return editor.dispatchCommand(REMOVE_LIST_COMMAND);
      }
      if (type === "bullet") {
        return editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
      }
      if (type === "number") {
        return editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
      }
      if (type === "check") {
        return editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND);
      }
    },
    [editor, blockType]
  );
  const formatBlock = useCallback(
    (formatType) => {
      // 如果要变换的类型和当前类型一致 不操作
      if (formatType === blockType) return;
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;
        // setBlocksType : converts all nodes in the selection that are of one block type to another.
        $setBlocksType(selection, () => {
          if (formatType === "paragraph") {
            return $createParagraphNode();
          }
          if (formatType === "blockquote") return $createQuoteNode();
          if (formatType === "code") {
            setCodeLanguage("js");
            return $createCodeNode("js");
          }
          return $createHeadingNode(formatType);
        });
      });
    },
    [editor, blockType, setCodeLanguage]
  );
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;
        const anchorNode = selection.anchor.getNode();
        const targetNode =
          anchorNode.getKey() === "root"
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();

        if ($isHeadingNode(targetNode)) {
          return setBlockType(targetNode.getTag());
        }
        if ($isListNode(targetNode)) {
          //因为list可以嵌套其他不同的listType; 所以blockType需要根据anchor节点最近的类型来判断
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          return setBlockType(
            parentList ? parentList.getListType() : targetNode.getListType()
          );
        }
        if ($isCodeNode(targetNode)) {
          setCodeLanguage(targetNode.getLanguage());
        }
        setBlockType(targetNode.getType());
      });
    });
  }, [editor]);

  return (
    <div className="editor-toolbar-container">
      {supportBlockTypeSet.map((type) => (
        <span
          key={type}
          aria-label={type}
          className="toolbar-btn"
          aria-checked={blockType === type}
          onClick={() => formatBlock(type)}
        >
          {type}
        </span>
      ))}
      <span
        aria-label="code"
        className="toolbar-btn"
        aria-checked={blockType === "code"}
        onClick={() => formatBlock("code")}
      >
        code
      </span>
      {blockType === "code" && (
        <CodeSelect
          codeLanguage={codeLanguage}
          setCodeLanguage={setCodeLanguage}
        />
      )}
      {supportListTypeSet.map((type) => (
        <span
          key={type}
          aria-label={type}
          className="toolbar-btn"
          aria-checked={blockType === type}
          onClick={() => formatList(type)}
        >
          {type}
        </span>
      ))}
    </div>
  );
};

const CodeSelect = (props) => {
  const { codeLanguage } = props;

  const [editor] = useLexicalComposerContext();

  const onSelectChange = useCallback(
    (e) => editor.dispatchCommand(CODE_LANGUAGE_COMMAND, e.target.value),
    [editor]
  );

  return (
    <select value={codeLanguage} onChange={onSelectChange}>
      {Object.keys(CODE_LANGUAGE_FRIENDLY_NAME_MAP).map((language) => (
        <option key={language} value={language}>
          {CODE_LANGUAGE_FRIENDLY_NAME_MAP[language]}
        </option>
      ))}
    </select>
  );
};
