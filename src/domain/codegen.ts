import { getFinalContractCode } from "./const";
import { addIndentation, dedent, indentTo } from "./helpers";
import { type ITriggerNode, type INode, type IOnchainActionNode } from "./interfaces";

export function generateCode(triggerNode: ITriggerNode): string {
  let preContractDeclarations = "";
  let contractStateDeclarations = "";
  let contractEntrypointSignature = "";
  let contractFunctionDeclarations = "";
  let contractEntrypointCode = "";

  function processNode(node: INode | null) {
    if (!node) return;

    switch (node.type) {
      case "trigger":
        const trigger = node as ITriggerNode;

        contractEntrypointSignature += indentTo(trigger.getContractEntrypointSignature(), 4);

        preContractDeclarations += indentTo(trigger.getContractPreDeclarations(), 0);
        contractStateDeclarations += indentTo(trigger.getContractStateParams(), 4);
        contractEntrypointCode += indentTo(trigger.getContractFunctionCall(), 6);
        contractFunctionDeclarations += indentTo(trigger.getContractFunctionDeclaration(), 4);
        break;

      case "onchain_action":
        const onchainNode = node as IOnchainActionNode;

        preContractDeclarations += indentTo(onchainNode.getContractPreDeclarations(), 0);
        contractStateDeclarations += indentTo(onchainNode.getContractStateParams(), 4);
        contractEntrypointCode += indentTo(onchainNode.getContractFunctionCall(), 6);
        contractFunctionDeclarations += indentTo(onchainNode.getContractFunctionDeclaration(), 4);
        break;
    }

    processNode(node.nextNode);
  }

  processNode(triggerNode);

  return getFinalContractCode({
    preContractDeclarations,
    contractStateDeclarations,
    contractEntrypointSignature,
    contractFunctionDeclarations,
    contractEntrypointCode,
  });
}
