import { type ITriggerNode, type INode, type NodeType } from "../interfaces";

export type TransferTriggerNodeParams = {
  account: string;
};

export class TransferTriggerNode implements ITriggerNode {
  name = "Swap Node";
  type: NodeType = "trigger";
  prevNode: INode | null = null;
  nextNode: INode | null = null;

  private nodeParams: TransferTriggerNodeParams;

  constructor(params: TransferTriggerNodeParams) {
    this.nodeParams = params;
  }

  getContractPreDeclarations(): string {
    return `
      interface ITransferInterface {
        function increment() external;
        function getCount() external view returns (uint256);
      }
    `;
  }

  getContractStateParams(): string {
    return `
      uint256 public someTransferParam1; 
      uint256 public someTransferParam2;
    `;
  }

  getContractFunctionCall(): string {
    return `
      transfer("${this.nodeParams.account}");
    `;
  }

  getContractFunctionDeclaration(): string {
    return `
      function transfer(address account) public override {
        someTransferParam1 += 1;
      }
    `;
  }

  getContractEntrypointSignature(): string {
    return `
      function entrypoint() public override
    `;
  }
}
