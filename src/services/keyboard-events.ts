export const keyboardEvents = (event: KeyboardEvent) => {
  const state: { [key: string]: () => void } = {
    [65]: () => {
      console.log("A pressed");
    },
  };

  state[event.keyCode]();
};
