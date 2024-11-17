import { UniswapNode } from "../../domain/nodes/uniswap-action-node";
import { generateCode } from "../../domain/codegen";
import { formatSolidity } from "../../domain/format";
import { SendNode } from "../../domain/nodes/send-action-node";
import { TransferTriggerNode } from "../../domain/nodes/transfer-trigger-node";

describe("real test generation", () => {
  it("should correctly generate code", async () => {
    const node1 = new TransferTriggerNode({
      token: "0x58d7f482ffd7bcd784a9c36d91a3a6010f096b73",
    });

    const node2 = new SendNode({
      account: "0xb8A5f87a91a2D8Db0e778d42653280E3F9FA7cAC",
      token: "0x58d7f482ffd7bcd784a9c36d91a3a6010f096b73",
      amount: "100",
    });

    node1.nextNode = node2;

    console.log(await formatSolidity(generateCode(node1)));
  });
});
