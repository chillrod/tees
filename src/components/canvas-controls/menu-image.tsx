import { ImagePlusIcon } from "lucide-react";
import { MenuDefaultButton } from "./menu-default-button";
import type { MenuChildrenProps } from "./menu";
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
        onClick={() => handleUploadImage()}
        {...props}
      ></MenuDefaultButton>

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
