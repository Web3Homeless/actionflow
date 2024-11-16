import { type INode, type IOnchainActionNode, type NodeType } from "../interfaces";

export type SendNodeParams = {
  account: string;
};

export class SendNode implements IOnchainActionNode {
  name = "Send Node";
  type: NodeType = "onchain_action";
  prevNode: INode | null = null;
  nextNode: INode | null = null;

  private nodeParams: SendNodeParams;

  constructor(params: SendNodeParams) {
    this.nodeParams = params;
  }

  getContractPreDeclarations(): string {
    return `
      interface ISendService {
        function increment() external;
        function getCount() external view returns (uint256);
      }
    `;
  }

  getContractStateParams(): string {
    return `
      uint256 public sendParam1; 
    `;
  }

  getContractFunctionCall(): string {
    return `
      send("${this.nodeParams.account}");
    `;
  }

  getContractFunctionDeclaration(): string {
    return `
      function send(address account) public override {
        someTransferParam1 += 1;
      }
    `;
  }
}
