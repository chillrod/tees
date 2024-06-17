import type React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

export const Resizable = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border p-6"
    >
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={20}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
};
