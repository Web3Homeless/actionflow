const CONTRACT_TEMPLATE = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

{{PRE_CONTRACT_DECLARATIONS}}

contract Actionflow {
    {{CONTRACT_STATE_DECLARATIONS}}

    // ПОДУМАТЬ ПРО КОНСТРУКТОР
    constructor(address _vlayer, address _rewardToken, uint256 _rewardAmount) {
        vlayer = IVLayer(_vlayer);
        rewardToken = IToken(_rewardToken);
        rewardAmount = _rewardAmount;
    }

    {{CONTRACT_ENTRYPOINT}}

    {{CONTRACT_FUNCTION_DECLARATIONS}}
}
`;

interface ContractParts {
  preContractDeclarations: string;
  contractStateDeclarations: string;
  contractEntrypoint: string;
  contractFunctionDeclarations: string;
}

export function getFinalContractCode({
  preContractDeclarations,
  contractStateDeclarations,
  contractEntrypoint,
  contractFunctionDeclarations,
}: ContractParts): string {
  let finalContractCode = CONTRACT_TEMPLATE;

  // Replace placeholders with actual content
  finalContractCode = finalContractCode.replace("{{PRE_CONTRACT_DECLARATIONS}}", preContractDeclarations);
  finalContractCode = finalContractCode.replace("{{CONTRACT_STATE_DECLARATIONS}}", contractStateDeclarations);
  finalContractCode = finalContractCode.replace("{{CONTRACT_ENTRYPOINT}}", contractEntrypoint);
  finalContractCode = finalContractCode.replace("{{CONTRACT_FUNCTION_DECLARATIONS}}", contractFunctionDeclarations);

  return finalContractCode;
}
