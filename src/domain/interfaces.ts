export type NodeType = "trigger" | "onchain_action";

export interface INode {
  name: string;
  type: NodeType;
  prevNode: INode | null;
  nextNode: INode | null;
}

export interface IOnchainActionNode extends INode {
  getContractPreDeclarations(): string;
  getContractStateParams(): string;
  getContractFunctionCall(): string;
  getContractFunctionDeclaration(): string;
}

export interface ITriggerNode extends IOnchainActionNode {
  getContractEntrypoint(): string;
}
