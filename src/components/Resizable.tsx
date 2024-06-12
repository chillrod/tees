import type React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

export const Resizable = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="text-stone-200">
      <ResizablePanel defaultSize={5}>{children}</ResizablePanel>
      {/* <ResizableHandle /> */}
    </ResizablePanelGroup>
  );
};
