import { UniswapNode } from "../../domain/nodes/uniswap-action-node";
import { generateCode } from "../../domain/codegen";
import { formatSolidity } from "../../domain/format";
import { SendNode } from "../../domain/nodes/send-action-node";
import { TransferTriggerNode } from "../../domain/nodes/transfer-trigger-node";
import { TwitterTriggerNode } from "../../domain/nodes/twitter-trigger-node";

describe("test generated for elon musk", () => {
  it("should correctly generate code", async () => {
    const node1 = new TwitterTriggerNode({
      url: "https://x.com/elonmusk",
      stringToSearch: "dodge",
    });

    const node2 = new UniswapNode({
      uniswapRouter: "0x4871deC2603f6b4E7a145286615D722880Fd8091",
      tokenFrom: "0x4871deC2603f6b4E7a145286615D722880Fd8091",
      tokenTo: "0x4871deC2603f6b4E7a145286615D722880Fd8091",
      amount: "100",
    });

    node1.nextNode = node2;

    const code = generateCode(node1);

    console.log(await formatSolidity(code));
  });
});
