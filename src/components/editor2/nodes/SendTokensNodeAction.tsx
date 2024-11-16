import { Handle, Position } from "@xyflow/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { TokensType } from "@/lib/utils";
import { useState } from "react";

export function SendTokensNodeAction() {
  const [currentTokenType, setCurrentTokenType] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [userAddress, setUserAddress] = useState<string>("");

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
            d="M13.5358 20.6861C13.5738 20.7807 13.6398 20.8615 13.7251 20.9176C13.8103 20.9737 13.9107 21.0023 14.0126 20.9997C14.1146 20.9971 14.2134 20.9633 14.2956 20.903C14.3779 20.8426 14.4397 20.7586 14.4728 20.6621L20.9728 1.66206C21.0048 1.57345 21.0109 1.47756 20.9904 1.38561C20.9699 1.29366 20.9236 1.20945 20.857 1.14283C20.7904 1.07622 20.7062 1.02995 20.6143 1.00945C20.5223 0.988945 20.4264 0.995052 20.3378 1.02706L1.33781 7.52706C1.2413 7.56015 1.15723 7.62197 1.09688 7.70423C1.03652 7.78648 1.00278 7.88523 1.00016 7.98722C0.997552 8.0892 1.0262 8.18955 1.08226 8.27478C1.13833 8.36002 1.21912 8.42606 1.31381 8.46406L9.24381 11.6441C9.49449 11.7444 9.72226 11.8945 9.91337 12.0853C10.1045 12.2761 10.255 12.5036 10.3558 12.7541L13.5358 20.6861Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.8541 1.14709L9.91406 12.0861"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={"text-white text-[1.042vw] font-medium"}>Send Tokens</span>
      </div>
      <div className={"flex flex-col gap-[0.26vw]"}>
        <Select onValueChange={(value) => setCurrentTokenType(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TokensType.ETH}>
              <span
                className={
                  "w-full rounded-full py-[0.365vw] px-[0.573vw] bg-white text-black text-[0.625vw]"
                }
              >
                {TokensType.ETH}
              </span>
            </SelectItem>
            <SelectItem value={TokensType.USDC}>
              <span
                className={
                  "w-full rounded-full py-[0.365vw] px-[0.573vw] bg-white text-black text-[0.625vw]"
                }
              >
                {TokensType.USDC}
              </span>
            </SelectItem>
            <SelectItem value={TokensType.USDT}>
              <span
                className={
                  "w-full rounded-full py-[0.365vw] px-[0.573vw] bg-white text-black text-[0.625vw]"
                }
              >
                {TokensType.USDT}
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
