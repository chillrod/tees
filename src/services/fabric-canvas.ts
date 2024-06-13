import { fabric } from "fabric";
import { emitter, type AddCanvasItem } from "./mitt";
import type { FabricJSEditor } from "fabricjs-react";
import short from "short-uuid";
import { UpdateLevaControls } from "@/models/layer-models";

export enum FabricEvents {
  MouseDown = "mouse:down",
  MouseMove = "mouse:move",
  ObjectModified = "object:modified",
}

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

export const CreateFabricItem = (
  item: string,
  event: fabric.IEvent,
  options?: { url: string }
) => {
  const state: { [key: string]: fabric.Object } = {
    text: createTextBox(event),
    image: createImage(event, options?.url || ""),
  };

  return state[item];
};

export const HandleFabricItemAdd = (
  item: AddCanvasItem,
  editor?: FabricJSEditor
) => {
  editor?.canvas?.on(FabricEvents.MouseMove, () => {
    editor.canvas.setCursor(item.type);
  });

  editor?.canvas.on(FabricEvents.MouseDown, (event) => {
    const fabricObject = CreateFabricItem(item.type, event);
    // @ts-ignore
    fabricObject.id = short.generate();

    editor?.canvas?.add(fabricObject);

    editor.canvas.off(FabricEvents.MouseDown);
    editor.canvas.off(FabricEvents.MouseMove);

    editor.canvas.setCursor("default");
  });
};

export const FabricItemDelete = (
  item: fabric.Object,
  editor?: FabricJSEditor
) => {
  editor?.canvas.remove(item);
  // @ts-ignore
  item.selectable = false;

  FabricRerender(editor);

  const layerControls = UpdateLevaControls(
    editor?.canvas.getActiveObjects(),
    editor
  );

  emitter.emit("levaControls", layerControls);
};

export const HandleFabricItemModified = (editor?: FabricJSEditor) => {
  editor?.canvas.on(FabricEvents.ObjectModified, () => {
    UpdateTexture(editor);

    editor?.canvas.off(FabricEvents.ObjectModified);
  });
};

export const UpdateTexture = (editor?: FabricJSEditor) => {
  emitter.emit("updateTexture", editor?.canvas.toDataURL());

  FabricRerender(editor);
};

export const FabricRerender = (editor?: FabricJSEditor) => {
  editor?.canvas.requestRenderAll();
};
