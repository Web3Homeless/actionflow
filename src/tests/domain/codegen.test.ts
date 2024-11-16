import { UniswapNode } from "../../domain/nodes/uniswap-action-node";
import { generateCode } from "../../domain/codegen";
import { formatSolidity } from "../../domain/format";
import { SendNode } from "../../domain/nodes/send-action-node";
import { TransferTriggerNode } from "../../domain/nodes/transfer-trigger-node";

describe("code generator", () => {
  it("should correctly generate code", async () => {
    const node1 = new TransferTriggerNode({
      token: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    });

    const node2 = new SendNode({
      account: "0x17C7e082ca151FF73D7b5fC8F020cE0213695c57",
      token: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      amount: "100",
    });

    const node3 = new UniswapNode({
      uniswapRouter: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      tokenFrom: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      tokenTo: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      amount: "100",
    });

    node1.nextNode = node2;
    node2.nextNode = node3;

    console.log(await formatSolidity(generateCode(node1)));
  });
});
