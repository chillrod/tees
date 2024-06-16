import { emitter } from "@/services/mitt";
import { useEffect, useRef } from "react";

export const UploadedImagesContainer = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    emitter.on("imageUpload", (image: HTMLImageElement) => {
      if (ref.current) {
        ref.current.innerHTML = "";

        ref.current.appendChild(image);

        console.log(ref.current);
      }
    });

    return () => {
      emitter.off("imageUpload");
    };
  }, []);

  return <div ref={ref}></div>;
};
