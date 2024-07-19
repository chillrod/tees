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
        className="w-4 h-4"
        size="icon"
        variant={
          props.activeButton === props?.index
            ? "outline"
            : props.disabled
            ? "ghost"
            : "secondary"
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
      <span className="dark:text-stone-200 text-sm">{props.label}</span>
      {props.children}
    </div>
  );
};
