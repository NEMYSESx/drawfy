import { StageRef } from "@/types/Stage";
import { useRef, useState } from "react";

export const Pan = ({ stageRef }: { stageRef: StageRef }) => {
  const isPanning = useRef(false);
  const [point, setPoint] = useState({ x: 0, y: 0 });

  const startPanning = (pointerPosition: { x: number; y: number }) => {
    isPanning.current = true;
    if (stageRef.current) {
      setPoint({
        x: pointerPosition.x - stageRef.current.x(),
        y: pointerPosition.y - stageRef.current.y(),
      });
    }
  };

  const panning = (pointerPosition: { x: number; y: number }) => {
    if (!isPanning.current || !stageRef.current) return;
    if (stageRef.current) {
      stageRef.current?.x(pointerPosition.x - point.x);
      stageRef.current?.y(pointerPosition.y - point.y);
      stageRef.current?.batchDraw();
    }
  };
  const stopPanning = () => {
    isPanning.current = false;
    setPoint({ x: 0, y: 0 });
  };
  return { startPanning, panning, stopPanning };
};
