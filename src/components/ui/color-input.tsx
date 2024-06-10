import { HexColorPicker } from "react-colorful";
import { Card } from "./card";
import { useState } from "react";

interface Props {
  onChange: (color: string) => void;
}
export default function ColorPicker(props: Props) {
  const [color, setColor] = useState("#282828");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HexColorPicker
      color={color}
      onChange={(color) => [props.onChange(color), setColor(color)]}
    />
  );
}
