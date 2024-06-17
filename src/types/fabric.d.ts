// fabric-extensions.d.ts

import { Object } from "fabric/fabric-impl"; // Import the original type definition from Fabric.js

export interface ExtendedFabricObject extends Object {
  id?: string;
}
