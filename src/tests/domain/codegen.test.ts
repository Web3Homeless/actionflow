import { generateCode } from "../../domain/codegen";
import { formatSolidity } from "../../domain/format";
import { SendNode } from "../../domain/nodes/send-action-node";
import { TransferTriggerNode } from "../../domain/nodes/transfer-trigger-node";

describe("code generator", () => {
  it("should correctly generate code", async () => {
    const node1 = new TransferTriggerNode({
      account: "0x17C7e082ca151FF73D7b5fC8F020cE0213695c57",
    });

    const node2 = new SendNode({
      account: "0x17C7e082ca151FF73D7b5fC8F020cE0213695c57",
      token: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      amount: "100",
    });

    node1.nextNode = node2;

    console.log(await formatSolidity(generateCode(node1)));
  });
});
