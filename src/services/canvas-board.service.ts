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
    this.canvasObjects =
      this.editor?.canvas.getObjects() as ExtendedFabricObject[];

    this.FabricRerender();

    this.UpdateTexture();
  },

  CancelFabricItemAdd() {
    this.editor?.canvas.off(FabricEvents.MouseDown);
    this.editor?.canvas.off(FabricEvents.MouseMove);

    this.editor?.canvas.setCursor("default");
  },

  HandleFabricItemAdd(item: ExtendedFabricObject) {
    item.set("cornerStyle", "circle");
    item.set("cornerSize", 40);
    item.set("padding", 40);
    item.set("cornerColor", "#000000");
    item.set("cornerStrokeColor", "#000000");
    item.set("borderColor", "#000000");
    item.set("rotatingPointOffset", 1000);

    item.set("id", short.generate());

    const addItem = () => {
      this.editor?.canvas?.add(item);
      this.editor?.canvas?.setActiveObject(item);
    };

    if (item.type === "image") {
      item.set("left", 1080);
      item.set("top", 1080);

      addItem();

      emitter.emit("resetDrawControls");

      this.UpdateCanvasObjects();
    } else {
      this.editor?.canvas?.on(FabricEvents.MouseMove, () => {
        this.editor?.canvas.setCursor(
          item?.cursorStyle || item?.type || "default"
        );
      });

      this.editor?.canvas?.on(
        FabricEvents.MouseDown,
        (event: fabric.IEvent) => {
          item.set("left", event.pointer?.x);
          item.set("top", event.pointer?.y);

          addItem();

          this.editor?.canvas?.off(FabricEvents.MouseMove);
          this.editor?.canvas?.off(FabricEvents.MouseDown);

          this.editor?.canvas?.setCursor("default");

          emitter.emit("resetDrawControls");

          this.UpdateCanvasObjects();
        }
      );
    }
  },

  GetCanvasImage() {
    return this.editor?.canvas.toDataURL({ multiplier: 1 });
  },

  FabricItemDelete(item?: ExtendedFabricObject) {
    if (!item) return;

    this.editor?.canvas.remove(item);
    item.selectable = false;

    this.UpdateCanvasObjects();
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
  },

  FabricDeleteAllObjects() {
    this.editor?.canvas.clear();

    this.UpdateCanvasObjects();
  },

  FabricItemCentralize(item?: ExtendedFabricObject) {
    if (!item) return;

    item.center();

    this.UpdateTexture();
  },

  HandleFabricItemModified(editor?: FabricJSEditor) {
    editor?.canvas.on(FabricEvents.ObjectModified, () => {
      this.UpdateTexture();

      editor?.canvas.off(FabricEvents.ObjectModified);
    });
  },

  UpdateTexture() {
    emitter.emit("updateCanvasRef", this.editor?.canvas);
    emitter.emit(
      "updateTexture",
      this.editor?.canvas.toDataURL({ multiplier: 1 })
    );
    this.FabricRerender();
  },

  FabricRerender() {
    this.editor?.canvas.requestRenderAll();
  },
};
