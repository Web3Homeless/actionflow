import { getFinalContractCode } from "./const";
import { type ITriggerNode, type INode, type IOnchainActionNode } from "./interfaces";

export function generateCode(triggerNode: ITriggerNode): string {
  let preContractDeclarations = "";
  let contractStateDeclarations = "";
  let contractEntrypoint = "";
  let contractFunctionDeclarations = "";

  function processNode(node: INode | null) {
    if (!node) return;

    switch (node.type) {
      case "trigger":
        const trigger = node as ITriggerNode;

        contractEntrypoint += trigger.getContractEntrypoint() + "\n";
        preContractDeclarations += trigger.getContractPreDeclarations() + "\n";
        contractStateDeclarations += trigger.getContractStateParams() + "\n";
        contractFunctionDeclarations += trigger.getContractFunctionCall() + "\n";
        contractFunctionDeclarations += trigger.getContractFunctionDeclaration() + "\n";
        break;

      case "onchain_action":
        const onchainNode = node as IOnchainActionNode;

        contractStateDeclarations += onchainNode.getContractStateParams() + "\n";
        contractFunctionDeclarations += onchainNode.getContractFunctionCall() + "\n";
        contractFunctionDeclarations += onchainNode.getContractFunctionDeclaration() + "\n";
        preContractDeclarations += onchainNode.getContractPreDeclarations() + "\n";
        break;
    }

    processNode(node.nextNode);
  }

  processNode(triggerNode);

  return getFinalContractCode({
    preContractDeclarations,
    contractStateDeclarations,
    contractEntrypoint,
    contractFunctionDeclarations,
  });
}
