import { Handle, Position, useNodeId } from "@xyflow/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { TokensType } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useWorkflowStore } from "@/store/workflowStore";

export function ReceiveTokensNodeAction() {
  const nodeId = useNodeId();

  const [currentTokenType, setCurrentTokenType] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [userAddress, setUserAddress] = useState<string>("");

  const { addOrUpdateNode } = useWorkflowStore();

  useEffect(() => {
    //@ts-ignore
    addOrUpdateNode(nodeId!, "tokens", {
      currentTokenType,
    });
  }, [nodeId, currentTokenType, addOrUpdateNode]);

  return (
    <div className={"rounded-[0.521vw] relative p-[0.781vw] flex flex-col bg-violet"}>
      <div className={"flex mb-[0.625vw] flex-row items-center gap-[0.521vw]"}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"w-[1.146vw]"}
        >
          <path
            d="M1.31377 13.5344C1.2191 13.5723 1.13831 13.6384 1.08225 13.7236C1.0262 13.8088 0.997552 13.9092 1.00016 14.0111C1.00278 14.1131 1.03652 14.2119 1.09687 14.2941C1.15721 14.3763 1.24127 14.4382 1.33777 14.4713L20.3356 20.9705C20.4242 21.0025 20.5201 21.0086 20.612 20.9881C20.7039 20.9676 20.7881 20.9213 20.8547 20.8547C20.9213 20.7881 20.9676 20.7039 20.9881 20.612C21.0086 20.5201 21.0025 20.4242 20.9705 20.3356L14.4713 1.33777C14.4382 1.24127 14.3763 1.15721 14.2941 1.09687C14.2119 1.03652 14.1131 1.00278 14.0111 1.00016C13.9092 0.997552 13.8088 1.0262 13.7236 1.08225C13.6384 1.13831 13.5723 1.2191 13.5344 1.31377L10.3547 9.24286C10.2544 9.49351 10.1043 9.72125 9.91355 9.91234C9.7228 10.1034 9.49533 10.2539 9.24486 10.3547L1.31377 13.5344Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.8503 20.8523L9.9126 9.91357"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={"text-white text-[1.042vw] font-medium"}>Receive Tokens</span>
      </div>
      <div className={"flex flex-col gap-[0.26vw]"}>
        <Select onValueChange={(value) => setCurrentTokenType(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"0x58d7f482ffd7bcd784a9c36d91a3a6010f096b73"}>
              <span
                className={
                  "w-full rounded-full py-[0.365vw] px-[0.573vw] bg-white text-black text-[0.625vw]"
                }
              >
                Optimism Sepolia
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
        <div
          className={
            "w-full rounded-full py-[0.365vw] px-[0.573vw] bg-white text-black placeholder:text-[#DDDDDD] text-[0.625vw] placeholder:text-[0.625vw]"
          }
        >
          <input
            className={"w-full outline-0"}
            type={"number"}
            placeholder={"Amount..."}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div
          className={
            "w-full rounded-full py-[0.365vw] px-[0.573vw] bg-white text-black placeholder:text-[#DDDDDD] text-[0.625vw] placeholder:text-[0.625vw]"
          }
        >
          <input
            className={"w-full outline-0"}
            placeholder={"Wallet address..."}
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
          />
        </div>
      </div>
      <Handle type={"target"} position={Position.Left} />
      <Handle type={"source"} position={Position.Right} />
    </div>
  );
}
