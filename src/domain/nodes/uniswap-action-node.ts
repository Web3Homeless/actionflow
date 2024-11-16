import { toChecksumAddress } from "../format";
import { type INode, type IOnchainActionNode, type NodeType } from "../interfaces";

export type UniswapNodeParams = {
  uniswapRouter: string;
  tokenFrom: string;
  tokenTo: string;
  amount: string;
};

export class UniswapNode implements IOnchainActionNode {
  name = "Swap Node";
  type: NodeType = "onchain_action";
  prevNode: INode | null = null;
  nextNode: INode | null = null;

  private nodeParams: UniswapNodeParams;

  constructor(params: UniswapNodeParams) {
    params.tokenFrom = toChecksumAddress(params.tokenFrom);
    params.tokenTo = toChecksumAddress(params.tokenTo);
    this.nodeParams = params;
  }

  getContractPreDeclarations(): string {
    return `
    interface IUniswapV2Router {
      function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
      ) external returns (uint256[] memory amounts);

      function getAmountsOut(
        uint256 amountIn,
        address[] calldata path
      ) external view returns (uint256[] memory amounts);
    }

    interface IERC20 {
          function approve(address uniswapRouter, uint256 amountIn) external returns (bool);
    }
  `;
  }

  getContractStateParams(): string {
    return "";
  }

  getContractFunctionCall(): string {
    // Frontrun problem, tokenOut is 0 for now. Fix it
    return `
      swapTokens(address(${this.nodeParams.uniswapRouter}),address(${this.nodeParams.tokenFrom}),address(${this.nodeParams.tokenTo}),${this.nodeParams.amount},0);
    `;
  }

  getContractFunctionDeclaration(): string {
    return `
      function swapTokens(
        address uniswapRouter,
        address token1,
        address token2,
        uint256 amountIn,
        uint256 amountOutMin
    ) internal {
        // Approve Uniswap Router to spend token1
        require(
            IERC20(token1).approve(uniswapRouter, amountIn),
            "Approval for Uniswap Router failed"
        );

        // Define the path for the swap (token1 -> token2)
        address[] memory path = new address[](2);
        path[0] = token1;
        path[1] = token2;

        // Set the deadline to 10 minutes from now
        uint256 deadline = block.timestamp + 600;

        // Execute the swap
        IUniswapV2Router(uniswapRouter).swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            address(this),
            deadline
        );
    }
    `;
  }
}
