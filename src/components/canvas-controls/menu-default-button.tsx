import { Button } from "../ui/button";
import type { MenuChildrenProps } from "./menu";

interface Props extends MenuChildrenProps {
  icon: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const MenuDefaultButton = (props: Props) => {
  return (
    <div className="grid text-center place-items-center">
      <Button
        size="icon"
        variant={
          props.activeButton === props?.index
            ? "outline"
            : props.disabled
            ? "ghost"
            : "default"
        }
        disabled={props.disabled}
        onClick={() =>
          props.handleActiveClick
            ? props?.handleActiveClick(
                props?.index,
                props.activeButton ?? null,
                props.onClick
              )
            : props.onClick?.()
        }
      >
        <div>{props.icon}</div>
      </Button>
      {props.label}
      {props.children}
    </div>
  );
};
