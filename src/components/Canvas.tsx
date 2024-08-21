import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { Pencil } from "@/tools/PencilTool";
import { Pan } from "@/tools/PanTool";
import { useTool } from "@/context/ToolContext";

const Canvas = ({ children }: { children: React.ReactNode }) => {
  const stageRef = useRef<Konva.Stage | null>(null);
  const [scale, setScale] = useState(1);
  const { selected } = useTool();
  const { handleMouseDown, handleMouseMove, handleMouseUp, lines } =
    Pencil(stageRef);
  const { startPanning, panning, stopPanning } = Pan({ stageRef });

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const zoomIntensity = 0.05;
    const pointerPosition = stageRef.current?.getPointerPosition();
    if (pointerPosition) {
      const mouseX = pointerPosition.x - stageRef.current!.x();
      const mouseY = pointerPosition.y - stageRef.current!.y();
      const wheel = e.evt.deltaY < 0 ? 1 : -1;
      const zoomFactor = Math.exp(wheel * zoomIntensity);

      stageRef.current?.x(stageRef.current!.x() - mouseX * (zoomFactor - 1));
      stageRef.current?.y(stageRef.current!.y() - mouseY * (zoomFactor - 1));

      setScale(scale * zoomFactor);
      stageRef.current?.scale({
        x: scale * zoomFactor,
        y: scale * zoomFactor,
      });
      stageRef.current?.batchDraw();
    }
  };

  useEffect(() => {
    const stage = stageRef.current;

    if (stage) {
      stage.on("mousedown", () => {
        const pointerPosition = stage.getPointerPosition();
        if (pointerPosition) {
          switch (selected.type) {
            case "pan":
              startPanning(pointerPosition);
              break;

            case "pencil":
              handleMouseDown();
              break;
          }
        }
      });

      stage.on("mousemove", () => {
        const pointerPosition = stage.getPointerPosition();
        if (pointerPosition) {
          switch (selected.type) {
            case "pan":
              panning(pointerPosition);
              break;

            case "pencil":
              handleMouseMove();
              break;
          }
        }
      });

      stage.on("mouseup", () => {
        switch (selected.type) {
          case "pan":
            stopPanning();
            break;

          case "pencil":
            handleMouseUp();
        }
      });
      stage.on("wheel", handleWheel);

      return () => {
        stage.off("mousedown");
        stage.off("mousemove");
        stage.off("mouseup");
        stage.off("wheel");
      };
    }
  }, [
    startPanning,
    panning,
    stopPanning,
    selected,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  ]);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      ref={stageRef}
      className="z-10"
    >
      <Layer>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="black"
            strokeWidth={5}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        ))}
        {children}
      </Layer>
    </Stage>
  );
};

export default Canvas;
