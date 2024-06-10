import mitt from "mitt";

type Events = {
  teeColor: string;
  stampColor: string;
};

export const emitter = mitt<Events>(); // inferred as Emitter<Events>
