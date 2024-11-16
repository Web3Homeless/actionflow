"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import etherImg from "../../../../public/icons/ether.svg";
import { useAccount } from "wagmi";
import { formatAddress } from "@/lib/utils";
import { modal } from "@/context";

export default function Header() {
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const [dropdownItem, setDropdownItem] = useState("BNB Transfer");
  const [leftOpen, setLeftOpen] = useState<boolean>(false);
  const { isConnected, address } = useAccount();

  return (
    <header
      className={
        "w-full flex flex-row items-center bg-white rounded-[0.521vw] py-[1.406vw] px-[1.042vw]"
      }
    >
      <div className={"w-[38%] text-red font-lufga text-[1.823vw] font-semibold text-left"}>
        ActionFlow
      </div>
      <div className={"w-full gap-[2.083vw] flex flex-row items-center justify-center"}>
        <DropdownMenu open={leftOpen} onOpenChange={setLeftOpen}>
          <DropdownMenuTrigger asChild>
            <button
              className={
                "border border-red font-lufga rounded-full text-red flex flex-row gap-[0.521vw] items-center px-[1.042vw] py-[0.521vw]"
              }
            >
              <span className={"text-[1.042vw] font-medium"}>Flow:</span>
              <span className={"text-[1.042vw]"}>{dropdownItem}</span>
              <motion.svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={"w-[1.146vw]"}
                animate={leftOpen ? { rotate: "180deg" } : undefined}
              >
                <path
                  d="M1 1L11 11L21 1"
                  stroke="#FF603A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={dropdownPosition} onValueChange={setDropdownPosition}>
              <DropdownMenuRadioItem value="top">1inch Swap</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">ETH Token Transfer</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">USDC Brige</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          className={
            "border border-red font-lufga rounded-full text-red flex flex-row gap-[0.521vw] items-center px-[1.042vw] py-[0.521vw]"
          }
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={"w-[1.146vw]"}
          >
            <path
              d="M1 11H21"
              stroke="#FF603A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 1V21"
              stroke="#FF603A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={"text-[1.042vw] font-medium"}>Create New Contract</span>
        </button>
      </div>
      <div
        className={
          "w-[36%] gap-[0.781vw] flex flex-row items-center justify-center border-l border-[#DDDDDD]"
        }
      >
        <div
          className={
            "flex w-[2.604vw] h-[2.604vw] flex-col justify-center items-center border bg-red/30 border-red p-[0.313vw] rounded-full"
          }
        >
          <Image
            src={etherImg}
            alt={"ether"}
            className={"w-full h-full object-center object-contain"}
          />
        </div>
        <button
          onClick={() => modal.open()}
          className={
            "border h-[2.604vw] hover:opacity-80 bg-red/30 border-red py-[0.625vw] px-[2.031vw] rounded-full flex items-center justify-center"
          }
        >
          <span className={"text-red text-[1.042vw] font-lufga font-medium"}>
            {isConnected ? formatAddress(address) : "Connect wallet"}
          </span>
        </button>
      </div>
    </header>
  );
}
