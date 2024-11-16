import { type ITriggerNode, type INode, type NodeType } from "../interfaces";

export type TwitterTriggerNodeParams = {
  url: string;
  stringToSearch: string;
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
    return `
      interface IXProver {
        function verifyBullishPost(Proof calldata, string memory text, string memory id, string memory bullishRegex) external;
      }
    `;
  }

  getContractStateParams(): string {
    return ``;
  }

  getContractFunctionCall(): string {
    return `
      checkXProof(proof, text, id, "^.*${this.nodeParams.stringToSearch}.*$");
    `;
  }

  getContractFunctionDeclaration(): string {
    return `
      function checkXProof(Proof calldata proof, string memory text, string memory id, string memory bullishRegex) public {
        IXProver(vlayerProver).verifyBullishPost(proof, text, id, bullishRegex);
      }
    `;
  }

  getContractEntrypointSignature(): string {
    return `
      function entrypoint(Proof calldata proof, string memory text, string memory id) public
    `;
  }
}
