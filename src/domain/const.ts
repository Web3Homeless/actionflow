const CONTRACT_ENTRYPOINT_SIGNATURE = "{{CONTRACT_ENTRYPOINT_SIGNATURE}}";
const PRE_CONTRACT_DECLARATIONS = "{{PRE_CONTRACT_DECLARATIONS}}";
const CONTRACT_STATE_DECLARATIONS = "{{CONTRACT_STATE_DECLARATIONS}}";
const CONTRACT_FUNCTION_DECLARATIONS = "{{CONTRACT_FUNCTION_DECLARATIONS}}";
const CONTRACT_ENTRYPOINT_CODE = "{{CONTRACT_ENTRYPOINT_CODE}}";

export const CONTRACT_TEMPLATE = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Proving structs for VLayer
enum ProofMode {
    GROTH16,
    FAKE
}

struct Seal {
    bytes4 verifierSelector;
    bytes32[8] seal;
    ProofMode mode;
}

struct CallAssumptions {
    address proverContractAddress;
    bytes4 functionSelector;
    uint256 settleBlockNumber; // Block number for which assumptions was made.
    bytes32 settleBlockHash; // Hash of the block at the specified block number.
}

struct Proof {
    Seal seal;
    bytes32 callGuestId;
    uint256 length;
    CallAssumptions callAssumptions;
}
// VLayer prover
address constant vlayerProver = address(0xbaABbF82c5d94E0CE4c2A57466B4Bb1aaeeee0B1);

${PRE_CONTRACT_DECLARATIONS}

contract ActionFlowContract {
  ${CONTRACT_STATE_DECLARATIONS}

  bool public isFrozen = false;
  address public owner;

  modifier onlyOwner() {
    require(msg.sender == owner, "Not the contract owner");
    _;
  }

  modifier whenNotFrozen() {
    require(!isFrozen, "Contract is currently frozen");
    _;
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
