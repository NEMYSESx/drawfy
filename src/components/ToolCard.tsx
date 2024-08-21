import React from "react";
import { cn } from "@/lib/utils";
import { useTool } from "@/context/ToolContext";

interface ToolCardProps {
  icon: React.ReactNode;
  toolType: string;
  onClick: () => void;
}

const ToolCard = ({ icon, toolType, onClick }: ToolCardProps) => {
  const { selected } = useTool();
  const isActive = selected.type === toolType && selected.isSelected;

  return (
    <div
      className={cn(
        "w-9 m-1 h-[38px] border rounded-lg flex items-center justify-center cursor-pointer",
        isActive ? "bg-hoverOrange" : "bg-white hover:bg-hoverOrangeLight"
      )}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default ToolCard;
