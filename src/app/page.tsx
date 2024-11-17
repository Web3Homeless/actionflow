"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/Resizable";
import CodeEditor from "@/components/widgets/CodeEditor/CodeEditor";
import Header from "@/components/widgets/Header";
import Modules from "@/components/widgets/Modules";
import Workflow from "@/components/widgets/Workflow";

import { useState } from "react";
import { baseNodes } from "@/components/editor2/lib";
import type { Node } from "@xyflow/react";
import { useWorkflowStore } from "@/store/workflowStore";
import { CONTRACT_TEMPLATE } from "@/domain/const";
import { INode } from "@/domain/interfaces";
import { TransferTriggerNode } from "@/domain/nodes/transfer-trigger-node";
import { SendTokensNodeAction } from "@/components/editor2/nodes/SendTokensNodeAction";
import { SendNode } from "@/domain/nodes/send-action-node";
import { TwitterTriggerNode } from "@/domain/nodes/twitter-trigger-node";
import { generateCode } from "@/domain/codegen";

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>([]);

  const { nodes: n, setCode } = useWorkflowStore();

  const handleClick = () => {
    console.log("GET NODE LIST");
    console.log(n);
    console.log(nodes);
    const intersectingNodes = n.filter((node) =>
      nodes.some((storeNode) => storeNode.id === node.id),
    );
    console.log("intersecting");
    console.log(intersectingNodes);

    const triggerNode = intersectingNodes.find((node) => node.category === "trigger");
    const actionNode = intersectingNodes.find((node) => node.category === "action");

    console.log("Trigger Node:", triggerNode);
    console.log("Action Node:", actionNode);

    let resultTriggerNode = undefined;
    let resultActionNode = undefined;

    if (triggerNode?.type == "recieve") {
      const data = triggerNode.data;
      resultTriggerNode = new TransferTriggerNode({
        token: "0x58d7f482ffd7bcd784a9c36d91a3a6010f096b73",
      });
    }
    if (triggerNode?.type == "twitter") {
      const data = triggerNode.data;
      // resultTriggerNode = new TwitterTriggerNode({
      //   address: data.account,
      // });
    }
    if (actionNode?.type == "send") {
      const data = actionNode.data;
      resultActionNode = new SendNode({
        account: data.userAddress ?? "0x17C7e082ca151FF73D7b5fC8F020cE0213695c57",
        amount: data.amount ?? 1,
        token: "0x58d7f482ffd7bcd784a9c36d91a3a6010f096b73",
      });
    }

    console.log("WTF");

    console.log("Result Trigger Node:", triggerNode);
    console.log("Result Action Node:", actionNode);

    if (!resultTriggerNode) return;
    if (!resultActionNode) return;
    resultTriggerNode.nextNode = resultActionNode;
    const resultCode = generateCode(resultTriggerNode!);
    setCode(resultCode);
  };

  return (
    <main className={"flex flex-col gap-[1.042vw] px-[4.167vw] py-[2.604vw] w-screen h-screen"}>
      <Header />
      <div className={"flex flex-row gap-[1.042vw] w-full h-full"}>
        <Modules nodes={nodes} setNodes={setNodes} />

        <ResizablePanelGroup direction={"horizontal"} className={"w-full h-full"}>
          <ResizablePanel>
            <Workflow onCompileClick={handleClick} nodes={nodes} setNodes={setNodes} />
          </ResizablePanel>

          <ResizableHandle withHandle className={"w-[1.042vw] h-full bg-[#F5F5F5]"} />

          <ResizablePanel defaultSize={28} className={"h-full flex flex-col gap-[1.042vw]"}>
            <div
              className={
                "bg-white rounded-[0.521vw] h-[10%] w-full flex flex-row justify-center items-center gap-[]"
              }
            >
              <div
                className={
                  "flex flex-col justify-center rounded-[0.26vw] bg-red items-center py-[0.521vw] px-[0.781vw]"
                }
              >
                <span className={"text-white text-[0.938vw] font-medium"}>Code</span>
              </div>
              <div
                className={
                  "flex rounded-[0.26vw] flex-col justify-center items-center py-[0.521vw] px-[0.781vw]"
                }
              >
                <span className={"text-red text-[0.938vw] font-medium"}>Actions</span>
              </div>
              <div
                className={
                  "flex rounded-[0.26vw] flex-col justify-center items-center py-[0.521vw] px-[0.781vw]"
                }
              >
                <span className={"text-red text-[0.938vw] font-medium"}>My Flows</span>
              </div>
            </div>
            <div className={"bg-white rounded-[0.521vw] h-[90%] w-full"}>
              <CodeEditor></CodeEditor>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
