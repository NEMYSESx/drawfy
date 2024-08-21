import {
  useContext,
  createContext,
  SetStateAction,
  Dispatch,
  useState,
} from "react";

interface selectProp {
  type: string;
  isSelected: boolean;
}

interface ToolContextProps {
  selected: selectProp;
  setSelected: Dispatch<SetStateAction<selectProp>>;
}

const ToolContext = createContext<ToolContextProps | null>(null);

export const useTool = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error("useTool must be used within a ToolProvider");
  }
  return context;
};

export const ToolProvider = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState<selectProp>({
    type: "arrow",
    isSelected: false,
  });

  return (
    <ToolContext.Provider
      value={{
        setSelected,
        selected,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};
