import React, { useCallback, useState } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  type Node,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TwitterPostNodeTrigger } from "@/components/editor2/nodes/TwitterPostNodeTrigger";
import { SendTokensNodeAction } from "@/components/editor2/nodes/SendTokensNodeAction";
import { ReceiveTokensNodeAction } from "@/components/editor2/nodes/ReceiveTokensNodeAction";
import { SendTokensNodeTrigger } from "@/components/editor2/nodes/SendTokensNodeTrigger";
import { ReceiveTokensNodeTrigger } from "@/components/editor2/nodes/ReceiveTokensNodeTrigger";
import { INode } from "@/domain/interfaces";

const nodeTypes = {
  twitterPostTrigger: TwitterPostNodeTrigger,
  sendTokensAction: SendTokensNodeAction,
  sendTokensTrigger: SendTokensNodeTrigger,
  receiveTokensAction: ReceiveTokensNodeAction,
  receiveTokensTrigger: ReceiveTokensNodeTrigger,
  // swapTokens: SwapTokensNode,
};

export default function Canvas({
  nodes,
  setNodes,
  setDomainNodes,
}: {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
  setDomainNodes: (nodes: INode[]) => void;
}) {
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    // @ts-ignore
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect = useCallback(
    // @ts-ignore
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: 50, y: 100, zoom: 1 }}
      >
        <Controls />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={3}
          color={"#F5F5F5"}
          bgColor={"#FFFFFF"}
        />
      </ReactFlow>
    </div>
  );
}
