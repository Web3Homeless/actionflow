"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/Resizable";
import CodeEditor from "@/components/widgets/CodeEditor/CodeEditor";
import Header from "@/components/widgets/Header";
import Modules from "@/components/widgets/Modules";
import Workflow from "@/components/widgets/Workflow";

import { useState } from "react";
import { baseNodes } from "@/components/editor2/lib";
import type { Node } from "@xyflow/react";

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>([
    baseNodes.twitterPost,
    baseNodes.receiveTokens,
    baseNodes.sendTokens,
  ]);

  return (
    <main className={"flex flex-col gap-[1.042vw] px-[4.167vw] py-[2.604vw] w-screen h-screen"}>
      <Header />
      <div className={"flex flex-row gap-[1.042vw] w-full h-full"}>
        <Modules nodes={nodes} setNodes={setNodes} />

        <ResizablePanelGroup direction={"horizontal"} className={"w-full h-full"}>
          <ResizablePanel>
            <Workflow nodes={nodes} setNodes={setNodes} />
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
              <CodeEditor />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
