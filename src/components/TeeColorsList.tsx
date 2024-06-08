import { Card, CardContent } from "@/components/ui/card";

const colors = ["#313131", "#f0f0f0", "#6a5926", "#383887", "#305430"];

import { emitter } from "@/services/mitt";
import { Input } from "./ui/input";
export const TeeColorsList = () => {
  return (
    <div className="flex items-center overflow-auto gap-1 pb-6">
      {colors.map((color, id) => (
        <Card key={id}>
          <CardContent
            onClick={() => emitter.emit("teeColor", color)}
            style={{
              backgroundColor: color,
            }}
            className="cursor-pointer"
          ></CardContent>
        </Card>
      ))}
    </div>
  );
};
