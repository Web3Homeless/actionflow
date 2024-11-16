import React, { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TwitterPostNode } from "@/components/editor2/nodes/TwitterPostNode";
import { SendTokensNode } from "@/components/editor2/nodes/SendTokensNode";
import { TokensType } from "@/lib/utils";

const nodeTypes = {
  twitterPost: TwitterPostNode,
  sendTokens: SendTokensNode,
  // receiveTokens: ReceiveTokensNode,
  // swapTokens: SwapTokensNode,
};

export default function Canvas({
  nodes,
  setNodes,
}: {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
}) {
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
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
        <Background variant="dots" gap={12} size={3} color={"#F5F5F5"} bgColor={"#FFFFFF"} />
      </ReactFlow>
    </div>
  );
}
