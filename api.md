- $getSelectionStyleForProperty(selection:RangeSelection, styleProperty : string, defaultValue : string) : string;
  获取 selection 中指定的 style 的值;
  如果 selection 上有 style 会优先取 selection 上的 style 值；
  否则会便利 selection 范围内的所有 textNode，寻找指定的 style 值;
  如果选择范围内没有找到对应的 style value; 会返回 default Value;
  如果选择范围内有多个 textNode，并且有不同的 style value；则返回一个`''`
