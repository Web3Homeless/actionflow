"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/Resizable";
import CodeEditor from "@/components/widgets/CodeEditor/CodeEditor";
import Header from "@/components/widgets/Header";
import Modules from "@/components/widgets/Modules";
import Workflow from "@/components/widgets/Workflow";

export default function Home() {
  return (
    <main className={"flex flex-col gap-[1.042vw] px-[4.167vw] py-[2.604vw] w-screen h-screen"}>
      <Header />
      <div className={"flex flex-row gap-[1.042vw] w-full h-full"}>
        <Modules />

        <ResizablePanelGroup direction={"horizontal"} className={"w-full h-full"}>
          <ResizablePanel>
            <Workflow />
          </ResizablePanel>

          <ResizableHandle withHandle className={"w-[1.042vw] h-full bg-[#F5F5F5]"} />

          <ResizablePanel defaultSize={28} className={"h-full flex flex-col gap-[1.042vw]"}>
            <div className={"bg-white rounded-[0.521vw] h-[10%] w-full"}></div>
            <div className={"bg-white rounded-[0.521vw] h-[90%] w-full"}>
              <CodeEditor></CodeEditor>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
