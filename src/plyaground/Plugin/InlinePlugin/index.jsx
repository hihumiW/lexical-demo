import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { TOGGLE_LINK_COMMAND, $isLinkNode } from "@lexical/link";
import {
  $patchStyleText,
  $getSelectionStyleValueForProperty,
} from "@lexical/selection";

export const InlinePlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);
  const [isCode, setIsCode] = useState(false);
  // supscript 下标
  const [isSubscript, setIsSubscript] = useState(false);
  // superscript　上标
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [color, setColor] = useState("black");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [isLink, setIsLink] = useState(false);
  const formatTypes = [
    {
      type: "bold",
      active: isBold,
    },
    {
      type: "underline",
      active: isUnderline,
    },
    {
      type: "strikethrough",
      active: isStrikethrough,
    },
    {
      type: "italic",
      active: isItalic,
    },
    {
      type: "highlight",
      active: isHighlight,
    },
    {
      type: "code",
      active: isCode,
    },
    {
      type: "subscript",
      active: isSubscript,
    },
    {
      type: "superscript",
      active: isSuperscript,
    },
  ];
  const formatLink = useCallback(() => {
    console.log("click");
    if (isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url: "http://" });
    }
  }, [editor, isLink]);
  const onTextFormatTypeButtonClick = useCallback(
    (textFomartType) => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, textFomartType);
    },
    [editor]
  );
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat("bold"));
          setIsItalic(selection.hasFormat("italic"));
          setIsUnderline(selection.hasFormat("underline"));
          setIsStrikethrough(selection.hasFormat("strikethrough"));
          setIsHighlight(selection.hasFormat("highlight"));
          setIsCode(selection.hasFormat("code"));
          setIsSubscript(selection.hasFormat("subscript"));
          setIsSuperscript(selection.hasFormat("superscript"));
          setColor(
            $getSelectionStyleValueForProperty(selection, "color", "black")
          );
          setBackgroundColor(
            $getSelectionStyleValueForProperty(selection, "background", "white")
          );
          //update link
          const focusNode = selection.focus.getNode();
          setIsLink(
            $isLinkNode(focusNode) || $isLinkNode(focusNode.getParent())
          );
        }
      });
    });
  }, []);

  return (
    <>
      <div className="editor-toolbar-container">
        {formatTypes.map(({ type, active }) => (
          <span
            className="toolbar-btn"
            key={type}
            aria-checked={active}
            onClick={() => onTextFormatTypeButtonClick(type)}
          >
            {type}
          </span>
        ))}
      </div>
      <div className="editor-toolbar-container">
        <ColorSelect color={color} editor={editor} />
        <BackgroundColorSelect
          backgroundColor={backgroundColor}
          editor={editor}
        />
        <span
          className="toolbar-btn"
          aria-checked={isLink}
          onClick={formatLink}
        >
          link
        </span>
      </div>
    </>
  );
};

const suportColorSet = ["black", "white", "red", "green", "blue", "tomato"];
const ColorSelect = (props) => {
  const { color, editor } = props;
  const onTextColorFormat = useCallback(
    (color) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            color: color,
          });
        }
      });
    },
    [editor]
  );

  return (
    <div className="color-selector">
      color :
      <select value={color} onChange={(e) => onTextColorFormat(e.target.value)}>
        {suportColorSet.map((color) => (
          <option value={color} key={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
};

const suportBgColorSet = ["white", "tomato", "gold", "blue", "pink"];
const BackgroundColorSelect = (props) => {
  const { backgroundColor, editor } = props;
  const onBgColorChange = useCallback(
    (e) => {
      const bgColor = e.target.value;

      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            background: bgColor,
          });
        }
      });
    },
    [editor]
  );
  return (
    <div className="color-selector">
      <span>bgColor:</span>
      <select value={backgroundColor} onChange={onBgColorChange}>
        {suportBgColorSet.map((bgColor) => (
          <option key={bgColor} value={bgColor}>
            {bgColor}
          </option>
        ))}
      </select>
    </div>
  );
};
