import { FabricEvents, type ExtendedFabricObject } from "@/types/fabric";
import { fabric } from "fabric";
import type { FabricJSEditor } from "fabricjs-react";
import short from "short-uuid";
import { emitter } from "./mitt";

export const CanvasBoardService = {
  editor: undefined as FabricJSEditor | undefined,
  canvasObjects: [] as ExtendedFabricObject[],

  SetEditor(editor?: FabricJSEditor) {
    this.editor = editor;
  },

  UpdateCanvasObjects() {
    this.FabricRerender();

    this.canvasObjects =
      this.editor?.canvas.getObjects() as ExtendedFabricObject[];
  },

  CancelFabricItemAdd() {
    this.editor?.canvas.off(FabricEvents.MouseDown);
    this.editor?.canvas.off(FabricEvents.MouseMove);

    this.editor?.canvas.setCursor("default");
  },

  HandleFabricItemAdd(item: ExtendedFabricObject) {
    this.editor?.canvas?.on(FabricEvents.MouseMove, () => {
      this.editor?.canvas.setCursor(item?.type || "default");
    });

    this.editor?.canvas?.on(FabricEvents.MouseDown, (event: fabric.IEvent) => {
      item.set("left", event.pointer?.x);
      item.set("top", event.pointer?.y);
      item.set("id", short.generate());

      item.set("cornerStyle", "circle");
      item.set("cornerSize", 10);

      this.editor?.canvas?.add(item);

      this.editor?.canvas?.off(FabricEvents.MouseMove);
      this.editor?.canvas?.off(FabricEvents.MouseDown);

      this.editor?.canvas?.setCursor("default");

      emitter.emit("resetDrawControls");

      this.UpdateCanvasObjects();
    });
  },

  FabricItemDelete(item: ExtendedFabricObject) {
    this.editor?.canvas.remove(item);
    item.selectable = false;

    this.UpdateCanvasObjects();

    this.UpdateTexture();
  },

  CanvasDiscardActiveObject() {
    this.editor?.canvas.discardActiveObject();

    this.UpdateCanvasObjects();
  },

  FabricDeleteSelectedObjects() {
    this.editor?.canvas.getActiveObjects().forEach((object) => {
      this.editor?.canvas.remove(object);
    });

    this.CanvasDiscardActiveObject();

    this.UpdateCanvasObjects();

    this.UpdateTexture();
  },

  HandleFabricItemModified(editor?: FabricJSEditor) {
    editor?.canvas.on(FabricEvents.ObjectModified, () => {
      this.UpdateTexture();

      editor?.canvas.off(FabricEvents.ObjectModified);
    });
  },

  UpdateTexture() {
    emitter.emit("updateTexture", this.editor?.canvas.toDataURL());
    this.FabricRerender();
  },

  FabricRerender() {
    this.editor?.canvas.requestRenderAll();
  },
};
