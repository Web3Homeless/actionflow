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

export default function Header() {
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const [dropdownItem, setDropdownItem] = useState("BNB Transfer");
  const [leftOpen, setLeftOpen] = useState<boolean>(false);

  return (
    <header
      className={
        "w-full flex flex-row items-center bg-white rounded-[0.521vw] py-[1.406vw] px-[1.042vw]"
      }
    >
      <div className={"w-[30%] text-red font-lufga text-[1.823vw] font-semibold text-left"}>
        ActionFlow
      </div>
      <div className={"w-full flex flex-row items-center justify-center"}>
        <DropdownMenu open={leftOpen} onOpenChange={setLeftOpen}>
          <DropdownMenuTrigger asChild>
            <button
              className={
                "border border-red font-lufga rounded-full text-red flex flex-row gap-[0.521vw] items-center px-[1.042vw] py-[0.521vw]"
              }
            >
              <span className={"text-[1.042vw] font-medium"}>Contract:</span>
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
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={"w-[30%]"}></div>
    </header>
  );
}
