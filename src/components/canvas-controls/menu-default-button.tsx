import { Icon } from "lucide-react";
import { Button } from "../ui/button";
import type { MenuChildrenProps } from "./menu";

interface Props extends MenuChildrenProps {
  icon: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const MenuDefaultButton = (props: Props) => {
  return (
    <div>
      <Button
        asChild
        size="icon"
        variant={props.activeButton === props?.index ? "outline" : "default"}
        onClick={() =>
          props?.handleActiveClick(
            props.index,
            props.activeButton,
            props.onClick
          )
        }
      >
        <div>{props.icon}</div>
      </Button>
      {props.children}
    </div>
  );
};
