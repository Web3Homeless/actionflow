import React, { useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { solidity } from "@replit/codemirror-lang-solidity";
import { useWorkflowStore } from "@/store/workflowStore";

type Props = {};

const extensions = [solidity];

export default function GeneratedCode({}: Props) {
  const { code, setCode } = useWorkflowStore();

  return (
    <div className="w-full">
      <CodeMirror
        width="100%"
        height="100%"
        value={code}
        extensions={extensions}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}
