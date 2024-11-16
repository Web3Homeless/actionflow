import { type ITriggerNode, type INode, type NodeType } from "../interfaces";

export type TwitterTriggerNodeParams = {
  account: string;
};

export class TwitterTriggerNode implements ITriggerNode {
  name = "Swap Node";
  type: NodeType = "trigger";
  prevNode: INode | null = null;
  nextNode: INode | null = null;

  private nodeParams: TwitterTriggerNodeParams;

  constructor(params: TwitterTriggerNodeParams) {
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

  getContractEntrypointSignature(): string {
    throw new Error("Method not implemented.");
  }
}
