import { FabricEvents, type ExtendedFabricObject } from "@/types/fabric";
import type { FabricJSEditor } from "fabricjs-react";
import short from "short-uuid";
import { emitter } from "./mitt";

export const CanvasBoardService = {
  editor: undefined as FabricJSEditor | undefined,

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

    this.ClearCanvasSerialization();
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

  HandleFabricItemModified(editor?: FabricJSEditor) {
    editor?.canvas.on(FabricEvents.ObjectModified, () => {
      this.UpdateTexture();

      editor?.canvas.off(FabricEvents.ObjectModified);
    });
  },

  UpdateTexture() {
    emitter.emit(
      "updateTexture",
      this.editor?.canvas.toDataURL({ multiplier: 2 })
    );

    this.FabricRerender();
  },

  SaveCanvasSerialization() {
    window.localStorage.setItem(
      "canvas",
      JSON.stringify(this.editor?.canvas.toJSON())
    );
  },

  ClearCanvasSerialization() {
    window.localStorage.removeItem("canvas");
  },

  LoadCanvasSerialization() {
    const canvas = window.localStorage.getItem("canvas");

    if (!canvas) return;

    this.editor?.canvas.loadFromJSON(JSON.parse(canvas), () => {
      this.FabricRerender();
    });
  },

  FabricRerender() {
    this.editor?.canvas.renderAll();
  },
};
