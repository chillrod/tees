import { CanvasBoard } from "@/components/canvas-board";
import { CanvasLayer } from "@/components/canvas-controls/canvas-layer";
import { CanvasControlsMenu } from "@/components/canvas-controls/menu";
import { Scene } from "@/components/scene";
import { ThreeControls } from "@/components/three-controls/controls";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export const MobileHome = () => {
  const [activeTab, setActiveTab] = useState("canvas");

  return (
    <div className="flex flex-col h-full p-2">
      <Tabs
        defaultValue={activeTab}
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="tee">Camiseta</TabsTrigger>
          <TabsTrigger value="canvas">Canvas</TabsTrigger>
        </TabsList>
        <TabsContent value="tee" forceMount hidden={activeTab !== "tee"}>
          <div className="relative">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>T-shirt</CardTitle>
                <CardDescription>Personalize sua camiseta</CardDescription>
              </CardHeader>
              <CardContent className="h-[70dvh]">
                <Scene />
                <ThreeControls />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="canvas" forceMount hidden={activeTab !== "canvas"}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Canvas</CardTitle>
              <CardDescription>Desenhe sua arte</CardDescription>
            </CardHeader>
            <CardContent className="h-[70dvh]">
              <div className="grid grid-rows-5 relative h-full">
                <div className="row-span-4">
                  <CanvasBoard />
                </div>
                <div>
                  <CanvasControlsMenu />
                </div>
                <div className="absolute top-0 right-0 z-30">
                  <CanvasLayer />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
