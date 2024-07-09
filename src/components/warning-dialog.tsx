import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface Props {
  children: React.ReactNode;
  title: string;
  description: string;
  func: () => void;
}
export const WarningDialog = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog modal open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {props.children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:text-stone-200">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              props.func(), setOpen(false);
            }}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
