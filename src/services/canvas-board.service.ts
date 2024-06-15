import { CanvasLayers } from "@/services/canvas-layers.service";
import { fabric } from "fabric";
import type { FabricJSEditor } from "fabricjs-react";
import short from "short-uuid";
import { emitter } from "./mitt";

const createTextBox = (event: fabric.IEvent) => {
  return new fabric.Textbox("New Text", {
    top: event.pointer?.y,
    left: event.pointer?.x,
    fill: "#fff",
    fontSize: 16,
  });
};

const createImage = (event: fabric.IEvent, src: string) => {
  return new fabric.Image(src, {
    top: event.pointer?.y,
    left: event.pointer?.x,
  });
};

export const CanvasBoardService = {
  editor: undefined as FabricJSEditor | undefined,
  selectedObjects: [] as fabric.Object[] | [],

  SetEditor(editor?: FabricJSEditor) {
    this.editor = editor;
  },

  SetSelectedObjects(objects: fabric.Object[]) {
    this.selectedObjects = objects;
  },

  UpdateItemControls(item: fabric.Object): fabric.Object {
    item.set("cornerStyle", "circle");
    item.set("cornerSize", 10);

    emitter.emit("resetDrawControls");

    return item;
  },

  CreateFabricItem(
    item: string,
    event: fabric.IEvent,
    options?: { url: string }
  ) {
    const state: { [key: string]: fabric.Object } = {
      text: createTextBox(event),
      image: createImage(event, options?.url || ""),
    };

    return this.UpdateItemControls(state[item]);
  },

  CancelFabricItemAdd() {
    this.editor?.canvas.off(FabricEvents.MouseDown);
    this.editor?.canvas.off(FabricEvents.MouseMove);

    this.editor?.canvas.setCursor("default");
  },

  HandleFabricItemAdd(item: AddCanvasItem) {
    this.editor?.canvas?.on(FabricEvents.MouseMove, () => {
      this.editor?.canvas.setCursor(item.type);
    });

    this.editor?.canvas.on(FabricEvents.MouseDown, (event: fabric.IEvent) => {
      const fabricObject = this.CreateFabricItem(item.type, event);
      // @ts-ignore
      fabricObject.id = short.generate();

      this.editor?.canvas?.add(fabricObject);

      this.editor?.canvas.off(FabricEvents.MouseMove);
      this.editor?.canvas.off(FabricEvents.MouseDown);

      this.editor?.canvas.setCursor("default");
    });
  },

  FabricItemDelete(item: fabric.Object) {
    this.editor?.canvas.remove(item);
    // @ts-ignore
    item.selectable = false;

    this.FabricRerender();

    const layerControls = CanvasLayers.UpdateLevaControls(
      this.editor?.canvas.getActiveObjects()
    );

    emitter.emit("levaControls", layerControls);
  },

  FabricDeleteSelectedObjects() {
    this.editor?.canvas.getActiveObjects().forEach((object) => {
      this.editor?.canvas.remove(object);
    });

    this.editor?.canvas.discardActiveObject();

    emitter.emit("levaControls", {});

    this.FabricRerender();
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
