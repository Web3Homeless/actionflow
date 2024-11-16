"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/Resizable";
import Header from "@/components/widgets/Header";
import Modules from "@/components/widgets/Modules";
import Workflow from "@/components/widgets/Workflow";

export default function Home() {
  return (
    <main className={"flex flex-col gap-[1.042vw] px-[4.167vw] py-[2.604vw] w-screen h-screen"}>
      <Header />
      <div className={"flex flex-row gap-[1.042vw] w-full h-full"}>
        <Modules />
        <Workflow />
        <div className={"w-[38%] h-full flex flex-col gap-[1.042vw]"}>
          <div className={"bg-white rounded-[0.521vw] h-[10%] w-full"}></div>
          <div className={"bg-white rounded-[0.521vw] h-full w-full"}></div>
        </div>
      </div>
    </main>
  );
}
