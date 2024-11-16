import { toChecksumAddress } from "../format";
import { type INode, type IOnchainActionNode, type NodeType } from "../interfaces";

export type SendNodeParams = {
  account: string;
  token: string;
  amount: string;
};

export class SendNode implements IOnchainActionNode {
  name = "Send Node";
  type: NodeType = "onchain_action";
  prevNode: INode | null = null;
  nextNode: INode | null = null;

  private nodeParams: SendNodeParams;

  constructor(params: SendNodeParams) {
    params.account = toChecksumAddress(params.account);
    params.token = toChecksumAddress(params.token);
    this.nodeParams = params;
  }

  getContractPreDeclarations(): string {
    return `
      interface ISendService {
        function increment() external;
        function getCount() external view returns (uint256);
      }
      
      interface IERC20 {
        function transfer(address to, uint256 value) external returns (bool);
      }
    `;
  }

  getContractStateParams(): string {
    return "";
  }

  getContractFunctionCall(): string {
    return `
      send(address(${this.nodeParams.token}),address(${this.nodeParams.account}),${this.nodeParams.amount});
    `;
  }

  getContractFunctionDeclaration(): string {
    return `
      function send(address token, address account, uint256 amount) public {
        bool success = IERC20(token).transfer(account, amount);
        require(success, "Token transfer failed");
      }
    `;
  }
}
