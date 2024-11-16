const CONTRACT_ENTRYPOINT_SIGNATURE = "{{CONTRACT_ENTRYPOINT_SIGNATURE}}";
const PRE_CONTRACT_DECLARATIONS = "{{PRE_CONTRACT_DECLARATIONS}}";
const CONTRACT_STATE_DECLARATIONS = "{{CONTRACT_STATE_DECLARATIONS}}";
const CONTRACT_FUNCTION_DECLARATIONS = "{{CONTRACT_FUNCTION_DECLARATIONS}}";
const CONTRACT_ENTRYPOINT_CODE = "{{CONTRACT_ENTRYPOINT_CODE}}";

const CONTRACT_TEMPLATE = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

${PRE_CONTRACT_DECLARATIONS}

contract Actionflow {
${CONTRACT_STATE_DECLARATIONS}

    // ПОДУМАТЬ ПРО КОНСТРУКТОР
    constructor(address _vlayer, address _rewardToken, uint256 _rewardAmount) {
        vlayer = IVLayer(_vlayer);
        rewardToken = IToken(_rewardToken);
        rewardAmount = _rewardAmount;
    }

    ${CONTRACT_ENTRYPOINT_SIGNATURE} {
${CONTRACT_ENTRYPOINT_CODE}
    }

${CONTRACT_FUNCTION_DECLARATIONS} 
}
`;

interface ContractParts {
  preContractDeclarations: string;
  contractStateDeclarations: string;
  contractEntrypointSignature: string;
  contractFunctionDeclarations: string;
  contractEntrypointCode: string;
}

export function getFinalContractCode({
  preContractDeclarations,
  contractStateDeclarations,
  contractEntrypointSignature,
  contractFunctionDeclarations,
  contractEntrypointCode,
}: ContractParts): string {
  let finalContractCode = CONTRACT_TEMPLATE;

  finalContractCode = finalContractCode.replace(PRE_CONTRACT_DECLARATIONS, preContractDeclarations);
  finalContractCode = finalContractCode.replace(
    CONTRACT_STATE_DECLARATIONS,
    contractStateDeclarations,
  );
  finalContractCode = finalContractCode.replace(
    CONTRACT_ENTRYPOINT_SIGNATURE,
    contractEntrypointSignature,
  );
  finalContractCode = finalContractCode.replace(
    CONTRACT_FUNCTION_DECLARATIONS,
    contractFunctionDeclarations,
  );
  finalContractCode = finalContractCode.replace(CONTRACT_ENTRYPOINT_CODE, contractEntrypointCode);

  return finalContractCode;
}
