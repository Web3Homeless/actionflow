import { create } from "zustand";

interface IWorkflowStore {
  code: string;
  setCode: (newCode: string) => void;
}

export const useWorkflowStore = create<IWorkflowStore>((set) => ({
  code: "solidity_code",
  setCode: (newCode) => set({ code: newCode }),
}));
