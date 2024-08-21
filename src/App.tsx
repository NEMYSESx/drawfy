import { Rect } from "react-konva";
import Canvas from "./components/Canvas";
import ToolBar from "./components/ToolBar";

function App() {
  return (
    <div className="relative">
      <ToolBar />
      <Canvas>
        <Rect
          x={20}
          y={50}
          width={100}
          height={100}
          fill="red"
          shadowBlur={20}
        />
      </Canvas>
    </div>
  );
}

export default App;
