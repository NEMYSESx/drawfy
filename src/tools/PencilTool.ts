import { useState, useRef } from "react";
import Konva from "konva";

export interface LineType {
  points: number[];
}

export const Pencil = (stageRef: React.RefObject<Konva.Stage>) => {
  const [lines, setLines] = useState<LineType[]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = () => {
    isDrawing.current = true;
    const stage = stageRef.current;
    const pos = stage?.getPointerPosition();
    if (pos) {
      // Adjust for stage transformations
      const transformedPos = {
        x: pos.x / stage!.scaleX() - stage!.x() / stage!.scaleX(),
        y: pos.y / stage!.scaleY() - stage!.y() / stage!.scaleY(),
      };
      setLines((prevLines) => [
        ...prevLines,
        { points: [transformedPos.x, transformedPos.y] },
      ]);
    }
  };

  const handleMouseMove = () => {
    if (!isDrawing.current) return;

    const stage = stageRef.current;
    const point = stage?.getPointerPosition();

    if (point && lines.length > 0) {
      const transformedPoint = {
        x: point.x / stage!.scaleX() - stage!.x() / stage!.scaleX(),
        y: point.y / stage!.scaleY() - stage!.y() / stage!.scaleY(),
      };
      setLines((prevLines) => {
        const newLines = [...prevLines];
        const lastLine = newLines[newLines.length - 1];
        lastLine.points = lastLine.points.concat([
          transformedPoint.x,
          transformedPoint.y,
        ]);
        return newLines;
      });
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp, lines };
};
