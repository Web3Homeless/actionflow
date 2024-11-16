import { ITriggerNode } from "@/domain/interfaces";
import { create } from "zustand";

interface IWorkflowStore {
  code: string;
  bytecode: string;
  workflow: WorkflowInfo | null;
  setCode: (newCode: string) => void;
  setCompiledBytecode: (bytecode: string) => void;
  setWorkflowInfo: (workflow: WorkflowInfo) => void;
}

type WorkflowInfo = {
  triggerNode: ITriggerNode;
};

export const useWorkflowStore = create<IWorkflowStore>((set) => ({
  code: "solidity_code",
  bytecode: "",
  workflow: null,
  setCode: (newCode) => set({ code: newCode }),
  setCompiledBytecode: (bytecode) => set({ bytecode: bytecode }),
  setWorkflowInfo: (workflow) => set({ workflow: workflow }),
}));
