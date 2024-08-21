import ToolCard from "./ToolCard";
import { FaPencilAlt, FaHandPaper } from "react-icons/fa";
import { FaArrowPointer } from "react-icons/fa6";
import { useTool } from "@/context/ToolContext";

const MenuBar = () => {
  const { setSelected } = useTool();

  return (
    <div className="w-[400px] border h-12 border-black col-auto z-50 absolute top-0 left-1/2 -translate-x-1/2 mt-6 rounded-xl flex">
      <ToolCard
        icon={<FaArrowPointer className="h-5 w-5 ml-1" />}
        toolType="arrow"
        onClick={() => setSelected({ type: "arrow", isSelected: true })}
      />
      <ToolCard
        icon={<FaHandPaper className="h-5 w-5 ml-1" />}
        toolType="pan"
        onClick={() => setSelected({ type: "pan", isSelected: true })}
      />
      <ToolCard
        icon={<FaPencilAlt className="h-5 w-5 ml-1" />}
        toolType="pencil"
        onClick={() => setSelected({ type: "pencil", isSelected: true })}
      />
    </div>
  );
};

export default MenuBar;
