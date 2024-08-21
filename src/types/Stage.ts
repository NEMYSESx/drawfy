import Konva from "konva";

export type StageRef = React.RefObject<Konva.Stage>;

export type Tool = "pencil" | "pan" | null;

export interface ToolContextType {
  activeTool: Tool;
  selectTool: (tool: Tool) => void;
}
