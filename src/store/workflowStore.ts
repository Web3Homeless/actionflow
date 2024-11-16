import { ITriggerNode } from "@/domain/interfaces";
import { create } from "zustand";

interface IWorkflowStore {
  code: string;
  bytecode: string;
  workflow: WorkflowInfo | null;
  nodes: NodeData[]; // Store for node data
  setCode: (newCode: string) => void;
  setCompiledBytecode: (bytecode: string) => void;
  setWorkflowInfo: (workflow: WorkflowInfo) => void;
  addOrUpdateNode: (id: string, type: string, data: any, category: any) => void; // Upsert method
  deleteNodeById: (id: string) => void; // Delete method
  getNodeList: () => NodeData[]; // Get all nodes as plain list
}

type WorkflowInfo = {
  triggerNode: ITriggerNode;
};

type NodeData = {
  id: string;
  category: string;
  type: string;
  data: any; // Unstructured data
};

export const useWorkflowStore = create<IWorkflowStore>((set) => ({
  code: "solidity_code",
  bytecode: "",
  workflow: null,
  nodes: [], // Initialize as empty array
  setCode: (newCode) => set({ code: newCode }),
  setCompiledBytecode: (bytecode) => set({ bytecode }),
  setWorkflowInfo: (workflow) => set({ workflow }),

  // Upsert a node (update if exists, else add new)
  addOrUpdateNode: (id, type, data, category) =>
    set((state) => {
      const existingNodeIndex = state.nodes.findIndex((node) => node.id === id);
      if (existingNodeIndex !== -1) {
        // If node exists, update it
        const updatedNodes = [...state.nodes];
        updatedNodes[existingNodeIndex] = { id, type, data, category };
        return { nodes: updatedNodes };
      } else {
        // Otherwise, add a new node
        return { nodes: [...state.nodes, { id, type, data, category }] };
      }
    }),

  // Delete a node by ID
  deleteNodeById: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
    })),

  // Get all node data
  getNodeList: () => (state) => state.nodes,
}));
