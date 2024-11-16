import { useState } from "react";
import { Handle, Position } from "@xyflow/react";

// {
//     data,
// }: {
//     data: { color: "violet" | "yellow" | "red"; handle: ""; keywords: "" };
// }

export function TwitterPostNode() {
  const [twitterHandle, setTwitterHandle] = useState<string>("");
  const [twitterKeywords, setTwitterKeywords] = useState<string>("");

  return (
    <div className={"rounded-[0.521vw] relative p-[0.781vw] flex flex-col bg-yellow"}>
      <div className={"flex mb-[0.625vw] flex-row items-center gap-[0.521vw]"}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"w-[1.042vw]"}
        >
          <mask
            id="mask0_1_11"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="20"
            height="20"
          >
            <path d="M0 0H20V20H0V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_1_11)">
            <path
              d="M15.75 0.937134H18.8171L12.1171 8.61428L20 19.0628H13.8286L8.99143 12.7271L3.46286 19.0628H0.392857L7.55857 10.8486L0 0.938562H6.32857L10.6943 6.72856L15.75 0.937134ZM14.6714 17.2228H16.3714L5.4 2.68142H3.57714L14.6714 17.2228Z"
              fill="white"
            />
          </g>
        </svg>
        <span className={"text-white text-[1.042vw] font-medium"}>Twitter Post</span>
      </div>
      <div className={"flex flex-col gap-[0.26vw]"}>
        <div
          className={
            "w-full rounded-full py-[0.365vw] px-[0.573vw] bg-white text-black placeholder:text-[#DDDDDD] text-[0.625vw] placeholder:text-[0.625vw]"
          }
        >
          <input
            className={"w-full outline-0"}
            placeholder={"Handle..."}
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value)}
          />
        </div>
        <div
          className={
            "w-full rounded-full py-[0.365vw] px-[0.573vw] bg-white text-black placeholder:text-[#DDDDDD] text-[0.625vw] placeholder:text-[0.625vw]"
          }
        >
          <input
            className={"w-full outline-0"}
            placeholder={"Keywords..."}
            value={twitterKeywords}
            onChange={(e) => setTwitterKeywords(e.target.value)}
          />
        </div>
      </div>
      <Handle type={"source"} position={Position.Right} />
    </div>
  );
}
