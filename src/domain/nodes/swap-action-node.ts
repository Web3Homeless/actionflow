import { type INode, type IOnchainActionNode, type NodeType } from "../interfaces";

export type SwapNodeParams = {
  account: string;
};

export class SwapNode implements IOnchainActionNode {
  name = "Swap Node";
  type: NodeType = "onchain_action";
  prevNode: INode | null = null;
  nextNode: INode | null = null;

  private nodeParams: SwapNodeParams;

  constructor(params: SwapNodeParams) {
    this.nodeParams = params;
  }

  getContractPreDeclarations(): string {
    throw new Error("Method not implemented.");
  }

  getContractStateParams(): string {
    throw new Error("Method not implemented.");
  }

  getContractFunctionCall(): string {
    throw new Error("Method not implemented.");
  }

  getContractFunctionDeclaration(): string {
    throw new Error("Method not implemented.");
  }
}
