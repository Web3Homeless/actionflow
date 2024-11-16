import { generateCode } from "~/domain/codegen";
import { SendNode } from "~/domain/nodes/send-action-node";
import { TransferTriggerNode } from "~/domain/nodes/transfer-trigger-node";

describe("code generator", () => {
  it("should correctly generate code", () => {
    const node1 = new TransferTriggerNode({
      account: "0x17C7e082ca151FF73D7b5fC8F020cE0213695c57",
    });

    const node2 = new SendNode({
      account: "0x17C7e082ca151FF73D7b5fC8F020cE0213695c57",
    });

    node1.nextNode = node2;

    console.log(generateCode(node1));
  });
});
