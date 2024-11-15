import { type INode, type IOnchainActionNode, type NodeType } from "../interfaces";

export class SendNode implements IOnchainActionNode {
  name = "Send Node";
  type: NodeType = "onchain_action";
  prevNode: INode | null = null;
  nextNode: INode | null = null;

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
