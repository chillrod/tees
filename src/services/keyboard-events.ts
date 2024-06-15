export const keyboardEvents = (event: KeyboardEvent) => {
  console.log("🚀 ~ keyboardEvents ~ event:", event);
  const state: { [key: string]: () => void } = {
    ["Backspace"]: () => {
      console.log("Delete pressed");
    },
  };

  state[event.key]();
};
