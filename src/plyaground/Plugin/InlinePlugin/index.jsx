import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  FORMAT_TEXT_COMMAND,
} from "lexical";
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
        setIsBold(selection.hasFormat("bold"));
        setIsItalic(selection.hasFormat("italic"));
        setIsUnderline(selection.hasFormat("underline"));
        setIsStrikethrough(selection.hasFormat("strikethrough"));
        setIsHighlight(selection.hasFormat("highlight"));
        setIsCode(selection.hasFormat("code"));
        setIsSubscript(selection.hasFormat("subscript"));
        setIsSuperscript(selection.hasFormat("superscript"));
        setColor(
          $getSelectionStyleValueForProperty(selection, "color", "#000")
        );
        const anchor = selection.anchor.getNode();
        if (anchor) {
          // if ($isTextNode(anchor)) {
          //   anchor.splitText(1, 2);
          // }
        }
        // if (anchor) {
        //   console.log(anchor.getNode().splitText(1, 2));
        // }
      });
    });
  }, []);

  return (
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
      <ColorSelect color={color} editor={editor} />
      <BackgroundColorSelect
        backgroundColor={backgroundColor}
        editor={editor}
      />
    </div>
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

const suportBgColorSet = ["tomato", "gold", "blue", "pink"];
const BackgroundColorSelect = (props) => {
  const { backgroundColor, editor } = props;
  const onBgColorChange = useCallback(
    (e) => {
      const bgColor = e.target.value;
    },
    [editor]
  );
  return (
    <div className="color-selector">
      <select value={backgroundColor}>
        {suportBgColorSet.map((bgColor) => (
          <option key={bgColor} value={bgColor}>
            {bgColor}
          </option>
        ))}
      </select>
    </div>
  );
};
