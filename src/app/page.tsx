"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/Resizable";
import Header from "@/components/widgets/Header";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <main className={"flex flex-col gap-[1.042vw] px-[4.167vw] py-[2.604vw] w-screen h-screen"}>
      <Header />
      <div className={"flex flex-row gap-[1.042vw] w-full h-full"}>
        <div className="flex justify-center items-center p-4">
          <w3m-button />
        </div>
        {isConnected && (
        <div>
        <div className={"bg-white rounded-[0.521vw] w-[30%] h-full"}></div>
        <div className={"bg-white rounded-[0.521vw] w-full h-full"}></div>
        <div className={"bg-white rounded-[0.521vw] w-[30%] h-full"}></div>
        <w3m-network-button />
        </div>
       )}
      </div>
    </main>
  );
}
