import { create } from "zustand";

interface IWorkflowStore {
  code: string;
  bytecode: string;
  setCode: (newCode: string) => void;
  setCompiledBytecode: (bytecode: string) => void;
}

export const useWorkflowStore = create<IWorkflowStore>((set) => ({
  code: "solidity_code",
  bytecode: "",
  setCode: (newCode) => set({ code: newCode }),
  setCompiledBytecode: (bytecode) => set({ bytecode: bytecode }),
}));
