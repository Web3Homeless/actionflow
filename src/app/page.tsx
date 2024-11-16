"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/Resizable";

export default function Home() {
  return (
    <main>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
