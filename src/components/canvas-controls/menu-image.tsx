import { ImagePlusIcon, ImageUpIcon } from "lucide-react";
import { MenuDefaultButton } from "./menu-default-button";
import type { MenuChildrenProps } from "./menu";
import * as Menubar from "@radix-ui/react-menubar";
import { createRef, type Dispatch, type SetStateAction } from "react";
import { Input } from "../ui/input";
import { createFabricImage } from "@/services/canvas/text/fabric-image";
import { CanvasBoardService } from "@/services/canvas-board.service";

interface Props extends MenuChildrenProps {
  setActiveBtn: Dispatch<SetStateAction<number | null>>;
}

export const MenuImage = (props: Props) => {
  const imageContent = createRef<HTMLImageElement>();

  const handleUploadImage = () => {
    uploadImageButtonRef.current?.click();

    props.setActiveBtn(null);
  };

  const handleImageCreate = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    console.log(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const image = new Image();
        image.src = readerEvent.target?.result as string;

        image.onload = () => {
          const addedImage = createFabricImage(image.src);

          if (addedImage) {
            CanvasBoardService.HandleFabricItemAdd(addedImage);
          }

          event.target.value = "";
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const uploadImageButtonRef = createRef<HTMLInputElement>();

  return (
    <>
      <MenuDefaultButton
        icon={<ImagePlusIcon />}
        {...props}
      ></MenuDefaultButton>
      {props.activeButton === 1 && (
        <Menubar.Portal>
          <Menubar.Content
            className="bg-stone-800 p-2 rouded-lg ml-3 w-48 text-stone-200"
            side="right"
            onEscapeKeyDown={() => props.setActiveBtn(null)}
            onInteractOutside={() => props.setActiveBtn(null)}
          >
            <Menubar.Label className="mb-2">Images Options</Menubar.Label>
            <Menubar.Item
              className="cursor-pointer hover:bg-stone-700 p-2 flex justify-between items-center"
              onClick={() => handleUploadImage()}
            >
              Upload
              <ImageUpIcon size={16}></ImageUpIcon>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      )}

      <Input
        accept="image/*"
        type="file"
        className="hidden"
        ref={uploadImageButtonRef}
        onChange={(event) => handleImageCreate(event)}
      ></Input>

      <div className="hidden">
        <img src="" alt="" ref={imageContent} className="hidden" />
      </div>
    </>
  );
};