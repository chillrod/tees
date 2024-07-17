import type { UserRecord } from "firebase-admin/auth";
import { gradient, size } from "./canvas-board";

interface Props {
  user: UserRecord;
}
export const PresentationScreen = (props: Props) => {
  return (
    <div
      className="h-[100vh] z-100 w-full bg-stone-100 text-stone-950 grid place-items-center text-center"
      style={{
        backgroundImage: gradient,
        backgroundSize: size,
      }}
    >
      <div className="flex flex-col gap-1 justify-center font-bold">
        <img src="./studio.svg" alt="Studio" className="w-24 mx-auto" />
        <h2 className="text-6xl">Bem vindo</h2>
        {props.user && (
          <p className="bg-yellow-400">{props.user.displayName}</p>
        )}
      </div>
    </div>
  );
};
