import { FabricEvents, type ExtendedFabricObject } from "@/types/fabric";
import type { FabricJSEditor } from "fabricjs-react";
import short from "short-uuid";
import { emitter } from "./mitt";

export const CanvasBoardService = {
  editor: undefined as FabricJSEditor | undefined,
  canvasLastContext: undefined as object | undefined,

  SetEditor(editor?: FabricJSEditor) {
    this.editor = editor;
  },

  UpdateCanvasObjects() {
    this.UpdateTexture();
  },

  CancelFabricItemAdd() {
    this.editor?.canvas.off(FabricEvents.MouseDown);
    this.editor?.canvas.off(FabricEvents.MouseMove);

    this.editor?.canvas.setCursor("default");
  },

  HandleFabricItemAdd(item: ExtendedFabricObject) {
    item.set("cornerStyle", "circle");
    item.set("cornerSize", 16);
    item.set("padding", 16);
    item.set("cornerColor", "#000000");
    item.set("cornerStrokeColor", "#000000");
    item.set("borderColor", "#000000");
    item.set("rotatingPointOffset", 50);

    item.set("id", short.generate());

    const addItem = () => {
      this.editor?.canvas?.add(item);
      this.editor?.canvas?.setActiveObject(item);
      this.FabricRerender();
    };

    addItem();

    item.center();

    emitter.emit("resetDrawControls");
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

  FabricItemsCentralize() {
    this.editor?.canvas.getObjects().forEach((item) => {
      item.center();
    });

    this.UpdateTexture();
  },

  UpdateTexture() {
    emitter.emit(
      "updateTexture",
      this.editor?.canvas.toDataURL({ multiplier: 2 })
    );

    this.FabricRerender();
  },

  CanvasRefazer() {
    this.editor?.canvas.loadFromJSON(this.canvasLastContext, () => {
      this.FabricRerender();

      this.UpdateTexture();
    });
  },

  GetCanvasSerialization() {
    return this.editor?.canvas.toJSON();
  },

  GetCanvasSmallImage() {
    return this.editor?.canvas.toDataURL({ multiplier: 0.1 });
  },

  LoadCanvasSerialization(canvas: object) {
    if (!canvas) return;

    this.editor?.canvas.loadFromJSON(canvas, () => {
      this.FabricRerender();
    });
  },

  FabricRerender() {
    this.editor?.canvas.renderAll();
  },
};
