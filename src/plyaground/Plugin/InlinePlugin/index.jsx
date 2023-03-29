import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
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
  const [color, setColor] = useState("#000");
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
        console.log(selection);
        setColor(
          $getSelectionStyleValueForProperty(selection, "color", "#000")
        );
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
      <ColorSelect color={color} />
    </div>
  );
};

const suportColorSet = ["#000", "red", "green", "blue", "tomato"];
const ColorSelect = (props) => {
  const { color } = props;
  const [editor] = useLexicalComposerContext();
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
