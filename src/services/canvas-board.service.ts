import { fabric } from "fabric";
import type { FabricJSEditor } from "fabricjs-react";
import short from "short-uuid";
import { FabricEvents, type ExtendedFabricObject } from "@/types/fabric";
import { emitter } from "./mitt";

// const createImage = (
//   event: fabric.IEvent,
//   src: string | ArrayBuffer | undefined | null
// ) => {
//   return new fabric.Image(
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg1MndL-Xp1JcnqaB0YOqTp6zDjrwYyGKsPA&s",
//     {}
//   );

//   // fabric.Image.fromURL(src as string, (img) => {
//   //   image.setElement(img.getElement());

//   //   image.set({
//   //     top: event.pointer?.y,
//   //     left: event.pointer?.x,
//   //     scaleX: 0.2,
//   //     scaleY: 0.2,
//   //   });
//   // });
// };

export const CanvasBoardService = {
  editor: undefined as FabricJSEditor | undefined,
  selectedObjects: [] as fabric.Object[] | [],

  SetEditor(editor?: FabricJSEditor) {
    this.editor = editor;
  },

  SetSelectedObjects(objects: ExtendedFabricObject[]) {
    this.selectedObjects = objects;
  },

  CancelFabricItemAdd() {
    this.editor?.canvas.off(FabricEvents.MouseDown);
    this.editor?.canvas.off(FabricEvents.MouseMove);

    this.editor?.canvas.setCursor("default");
  },

  HandleFabricItemAdd(item: ExtendedFabricObject) {
    console.log("🚀 ~ HandleFabricItemAdd ~ item:", item);
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

      this.FabricRerender();

      emitter.emit("resetDrawControls");
    });
  },

  FabricItemDelete(item: ExtendedFabricObject) {
    this.editor?.canvas.remove(item);
    item.selectable = false;

    this.FabricRerender();

    // const layerControls = CanvasLayers.UpdateLevaControls(
    //   this.editor?.canvas.getActiveObjects()
    // );

    // emitter.emit("levaControls", layerControls);
  },

  FabricDeleteSelectedObjects() {
    this.editor?.canvas.getActiveObjects().forEach((object) => {
      this.editor?.canvas.remove(object);
    });

    this.editor?.canvas.discardActiveObject();

    // emitter.emit("levaControls", {});

    this.FabricRerender();
  },

  HandleFabricItemModified(editor?: FabricJSEditor) {
    editor?.canvas.on(FabricEvents.ObjectModified, () => {
      this.UpdateTexture();

      editor?.canvas.off(FabricEvents.ObjectModified);
    });
  },

  UpdateTexture() {
    // emitter.emit("updateTexture", this.editor?.canvas.toDataURL());

    this.FabricRerender();
  },

  FabricRerender() {
    this.editor?.canvas.requestRenderAll();
  },
};
