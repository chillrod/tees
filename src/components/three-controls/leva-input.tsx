import { emitter } from "@/services/mitt";
import { LevaPanel, useControls, useCreateStore } from "leva";

export const ThreeControlsLevaInput = () => {
  const store = useCreateStore();
  useControls(
    {
      color: {
        value: "#282828",
        onChange: (color) => {
          emitter.emit("teeColor", color);
        },
      },
    },
    { store }
  );

  return (
    <LevaPanel
      store={store}
      key={"LevaPanel"}
      fill
      titleBar={{
        title: "Tee",
        drag: false,
      }}
    ></LevaPanel>
  );
};
