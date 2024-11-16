import { toChecksumAddress } from "../format";
import { type ITriggerNode, type INode, type NodeType } from "../interfaces";

export type TransferTriggerNodeParams = {
  token: string;
};

export class TransferTriggerNode implements ITriggerNode {
  name = "Swap Node";
  type: NodeType = "trigger";
  prevNode: INode | null = null;
  nextNode: INode | null = null;

  private nodeParams: TransferTriggerNodeParams;

  constructor(params: TransferTriggerNodeParams) {
    params.token = toChecksumAddress(params.token);
    this.nodeParams = params;
  }

  getContractPreDeclarations(): string {
    return `
      interface ITransferInterface {
        function increment() external;
        function getCount() external view returns (uint256);
      }

      interface ITxProver {
        function verifyCopytrading(Proof calldata data, string calldata txHash, bytes calldata txInput, address txTo, uint256 txValue) external;
      }
    `;
  }

  getContractStateParams(): string {
    return `
      bytes4 private constant ERC20_TRANSFER_SELECTOR = 0xa9059cbb;
    `;
  }

  getContractFunctionCall(): string {
    return `
      checkProof(proof, txHash, txInput, txTo, txValue);
      require(checkERC20Calldata(txInput), "Provided transaction is not ERC20 transfer");
      require(txTo == ${this.nodeParams.token}, "Provided transaction do not transfer desired tokens");

    `;
  }

  getContractFunctionDeclaration(): string {
    return `
      function checkERC20Calldata(bytes calldata data) internal view returns (bool) {
        if (data.length != 68) {
            return false;
        }

        bytes4 selector = bytes4(data[:4]);

        // Verify the selector matches the ERC20 transfer function
        if (selector != ERC20_TRANSFER_SELECTOR) {
            return false;
        }

        address to;
        uint256 amount;

        assembly {
            // Skip the first 4 bytes (selector) and load the next 32 bytes (address "to")
            to := calldataload(add(data.offset, 4))
            // Load the following 32 bytes (uint256 "amount")
            amount := calldataload(add(data.offset, 36))
        }

        if (to != address(this)) {
            return false;
        }

        return true;
      }
      function checkProof(Proof calldata proof, string calldata txHash, bytes calldata txInput,
        address txTo, uint256 txValue) public {
        ITxProver(vlayerProver).verifyCopytrading(proof, txHash, txInput, txTo, txValue);


      }
    `;
  }

  getContractEntrypointSignature(): string {
    return `
      function entrypoint(Proof calldata proof, string calldata txHash, bytes calldata txInput,
        address txTo, uint256 txValue) public
    `;
  }
}
