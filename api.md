## @lexical/selection

- $getSelectionStyleForProperty(selection:RangeSelection, styleProperty : string, defaultValue : string) : string;
  获取 selection 中指定的 style 的值;
  如果 selection 上有 style 会优先取 selection 上的 style 值；
  否则会便利 selection 范围内的所有 textNode，寻找指定的 style 值;
  如果选择范围内没有找到对应的 style value; 会返回 default Value;
  如果选择范围内有多个 textNode，并且有不同的 style value；则返回一个`''`

- $pathStyleText(selection :RangeSelection, path : CSSStyleObject): void;
  将提供的 Style 样式应用到被选中的文本节点上;
  如果只选中了文本节点的一部分，那么会将该文本节点进行 split 然后再应用；

- $isAtNodeEnd(point : Point)
  判断这个 point 是否是位于该节点的末尾
