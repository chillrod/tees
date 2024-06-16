export const keyboardEvents = (event: KeyboardEvent) => {
  const state: { [key: string]: () => number } = {
    ["KeyT"]: () => 0,
  };

  return state?.[event.code]?.();
};
