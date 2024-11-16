import type { ReactNode } from "react";
import { cn, TokensType } from "@/lib/utils";
import type { Node } from "@xyflow/react";
import { baseNodes } from "@/components/editor2/lib";

const ModuleBtn = ({
  id,
  name,
  type,
  onClick,
  icon,
}: {
  id:
    | "twitterPostTrigger"
    | "sendTokensAction"
    | "sendTokensTrigger"
    | "receiveTokensAction"
    | "receiveTokensTrigger"
    | "swapTokensAction"
    | "swapTokensTrigger"
    | "bridgeUSDCAction";
  name: string;
  type: "action" | "trigger";
  onClick: () => void;
  icon: ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex hover:opacity-80 flex-row gap-[0.521vw] items-center justify-center px-[0.781vw] py-[0.521vw] rounded-[0.521vw]",
        type === "action" ? "bg-violet" : type === "trigger" ? "bg-yellow" : "bg-red",
      )}
    >
      {icon}
      <span className={"text-[0.833vw] font-medium font-lufga text-white"}>{name}</span>
    </button>
  );
};

const actions: {
  id:
    | "twitterPostTrigger"
    | "sendTokensAction"
    | "sendTokensTrigger"
    | "receiveTokensAction"
    | "receiveTokensTrigger"
    | "swapTokensAction"
    | "swapTokensTrigger"
    | "bridgeUSDCAction";
  name: string;
  type: "action" | "trigger";
  icon: ReactNode;
}[] = [
  {
    id: "swapTokensAction",
    name: "Swap Token",
    type: "action",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={"w-[0.938vw]"}
      >
        <path
          d="M1 13.8H2.12C3.16 13.8 4.12 13.32 4.76 12.44L9.64001 5.55995C10.2 4.67995 11.24 4.19995 12.28 4.19995H17"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.8015 1L17.0015 4.2L13.8015 7.4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 4.19995H2.52C3.72 4.19995 4.84 4.91995 5.4 5.95995"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.999 13.8H12.279C11.239 13.8 10.199 13.24 9.63901 12.36L9.23901 11.72"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.8015 10.6L17.0015 13.8L13.8015 17"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "sendTokensAction",
    name: "Send Tokens",
    type: "action",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={"w-[0.938vw]"}
      >
        <path
          d="M11.0275 16.7465C11.0579 16.8223 11.1107 16.8869 11.1789 16.9318C11.2471 16.9766 11.3273 16.9995 11.4089 16.9974C11.4905 16.9953 11.5695 16.9683 11.6353 16.9201C11.7011 16.8718 11.7505 16.8045 11.777 16.7273L16.9764 1.5291C17.002 1.45822 17.0069 1.38152 16.9905 1.30796C16.9741 1.23441 16.9371 1.16705 16.8838 1.11377C16.8305 1.06048 16.7631 1.02347 16.6896 1.00707C16.616 0.990668 16.5393 0.995554 16.4685 1.02115L1.27021 6.22056C1.19302 6.24703 1.12577 6.29648 1.07749 6.36228C1.02922 6.42807 1.00222 6.50706 1.00013 6.58864C0.998042 6.67022 1.02096 6.75049 1.0658 6.81867C1.11065 6.88685 1.17528 6.93968 1.25102 6.97007L7.59429 9.51378C7.79481 9.59406 7.977 9.71412 8.12988 9.86672C8.28275 10.0193 8.40314 10.2013 8.48378 10.4017L11.0275 16.7465Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.8819 1.11719L8.13086 9.86738"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "bridgeUSDCAction",
    name: "Bridge USDC",
    type: "action",
    icon: (
      <svg
        width="22"
        height="16"
        viewBox="0 0 22 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={"w-[1.146vw]"}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.9989 0C17.2438 3.23106e-05 17.4802 0.089956 17.6633 0.252715C17.8463 0.415474 17.9632 0.639749 17.9919 0.883L17.9989 1V2.565L18.1149 2.666L18.3919 2.897C18.4426 2.939 18.4952 2.981 18.5499 3.023C19.0829 3.438 19.7269 3.855 20.3149 4.051C20.4395 4.0925 20.5547 4.15814 20.654 4.24417C20.7533 4.3302 20.8346 4.43494 20.8934 4.5524C20.9522 4.66987 20.9872 4.79776 20.9966 4.92878C21.0059 5.0598 20.9894 5.19138 20.9479 5.316C20.9064 5.44062 20.8408 5.55585 20.7547 5.65511C20.6687 5.75437 20.564 5.83571 20.4465 5.89449C20.329 5.95327 20.2011 5.98834 20.0701 5.99769C19.9391 6.00704 19.8075 5.9905 19.6829 5.949C19.1814 5.77271 18.7017 5.53988 18.2529 5.255L17.9989 5.091V10H20.9989C21.2538 10.0003 21.4989 10.0979 21.6843 10.2728C21.8696 10.4478 21.9811 10.687 21.9961 10.9414C22.011 11.1958 21.9282 11.4464 21.7646 11.6418C21.601 11.8373 21.369 11.9629 21.1159 11.993L20.9989 12H17.9989V15C17.9986 15.2549 17.901 15.5 17.726 15.6854C17.5511 15.8707 17.3119 15.9822 17.0575 15.9972C16.8031 16.0121 16.5525 15.9293 16.3571 15.7657C16.1616 15.6021 16.036 15.3701 16.0059 15.117L15.9989 15V12H5.99889V15C5.99861 15.2549 5.90101 15.5 5.72604 15.6854C5.55107 15.8707 5.31194 15.9822 5.0575 15.9972C4.80306 16.0121 4.55251 15.9293 4.35706 15.7657C4.16161 15.6021 4.036 15.3701 4.00589 15.117L3.99889 15V12H0.998892C0.744012 11.9997 0.49886 11.9021 0.313524 11.7272C0.128188 11.5522 0.0166572 11.313 0.00172004 11.0586C-0.0132171 10.8042 0.0695667 10.5536 0.233157 10.3582C0.396747 10.1627 0.628796 10.0371 0.881892 10.007L0.998892 10H3.99889V5.09C3.50289 5.421 2.92089 5.747 2.31489 5.949C2.19027 5.9905 2.05869 6.00704 1.92767 5.99769C1.79665 5.98834 1.66876 5.95327 1.55129 5.89449C1.31406 5.77578 1.1337 5.56769 1.04989 5.316C0.966084 5.06431 0.985692 4.78964 1.1044 4.5524C1.22311 4.31517 1.4312 4.13481 1.68289 4.051C2.27089 3.855 2.91489 3.438 3.44789 3.023L3.60589 2.897L3.88289 2.666L3.99889 2.565V1C3.99917 0.74512 4.09677 0.499968 4.27174 0.314631C4.44671 0.129295 4.68585 0.0177652 4.94029 0.00282812C5.19473 -0.012109 5.44527 0.0706746 5.64072 0.234265C5.83618 0.397855 5.96179 0.629904 5.99189 0.883L5.99889 1V2.722C6.26202 3.09737 6.57755 3.43311 6.93589 3.719C7.70889 4.338 8.99189 5 10.9989 5C13.0059 5 14.2889 4.338 15.0619 3.72C15.4549 3.405 15.7259 3.094 15.8939 2.869L15.9989 2.722V1C15.9989 0.734784 16.1042 0.48043 16.2918 0.292893C16.4793 0.105357 16.7337 0 16.9989 0ZM15.9989 5.517C15.483 5.88353 14.9233 6.18419 14.3329 6.412L13.9989 6.533V10H15.9989V5.517ZM11.9989 6.953C11.4415 7.00637 10.8807 7.01506 10.3219 6.979L9.99889 6.953V10H11.9989V6.953ZM5.99889 5.517V10H7.99889V6.533L7.66489 6.413C7.16435 6.21976 6.68568 5.97406 6.23689 5.68L5.99889 5.517Z"
          fill="white"
        />
      </svg>
    ),
  },
];

const triggers: {
  id:
    | "twitterPostTrigger"
    | "sendTokensAction"
    | "sendTokensTrigger"
    | "receiveTokensAction"
    | "receiveTokensTrigger"
    | "swapTokensAction"
    | "swapTokensTrigger"
    | "bridgeUSDCAction";
  name: string;
  type: "action" | "trigger";
  icon: ReactNode;
}[] = [
  {
    id: "twitterPostTrigger",
    name: "Twitter Post",
    type: "trigger",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={"w-[0.833vw]"}
      >
        <mask
          id="mask0_1_116"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="16"
          height="16"
        >
          <path d="M0 0H16V16H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_1_116)">
          <path
            d="M12.6 0.749756H15.0537L9.69372 6.89147L16 15.2503H11.0629L7.19314 10.1818L2.77029 15.2503H0.314286L6.04686 8.6789L0 0.750899H5.06286L8.55543 5.3829L12.6 0.749756ZM11.7371 13.7783H13.0971L4.32 2.14518H2.86171L11.7371 13.7783Z"
            fill="white"
          />
        </g>
      </svg>
    ),
  },
  {
    id: "swapTokensTrigger",
    name: "Swap Token",
    type: "trigger",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={"w-[0.938vw]"}
      >
        <path
          d="M1 13.8H2.12C3.16 13.8 4.12 13.32 4.76 12.44L9.64001 5.55995C10.2 4.67995 11.24 4.19995 12.28 4.19995H17"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.8015 1L17.0015 4.2L13.8015 7.4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 4.19995H2.52C3.72 4.19995 4.84 4.91995 5.4 5.95995"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.999 13.8H12.279C11.239 13.8 10.199 13.24 9.63901 12.36L9.23901 11.72"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.8015 10.6L17.0015 13.8L13.8015 17"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "receiveTokensTrigger",
    name: "Receive Token",
    type: "trigger",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={"w-[0.938vw]"}
      >
        <path
          d="M1.25101 11.025C1.17528 11.0554 1.11065 11.1083 1.0658 11.1764C1.02096 11.2446 0.998041 11.3249 1.00013 11.4065C1.00222 11.4881 1.02922 11.567 1.07749 11.6328C1.12577 11.6986 1.19302 11.7481 1.27021 11.7746L16.4685 16.974C16.5393 16.9996 16.616 17.0044 16.6896 16.988C16.7631 16.9716 16.8305 16.9346 16.8838 16.8814C16.9371 16.8281 16.9741 16.7607 16.9905 16.6872C17.0069 16.6136 17.002 16.5369 16.9764 16.466L11.777 1.26777C11.7505 1.19058 11.7011 1.12333 11.6353 1.07505C11.5695 1.02677 11.4905 0.999779 11.4089 0.99769C11.3273 0.9956 11.2471 1.01852 11.1789 1.06336C11.1107 1.10821 11.0579 1.17284 11.0275 1.24857L8.48378 7.59184C8.4035 7.79237 8.28344 7.97456 8.13084 8.12743C7.97824 8.28031 7.79627 8.4007 7.59588 8.48134L1.25101 11.025Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.8804 16.8794L8.13018 8.12842"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Modules({
  nodes,
  setNodes,
}: {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
}) {
  const updateNodes = (
    id:
      | "twitterPostTrigger"
      | "sendTokensAction"
      | "sendTokensTrigger"
      | "receiveTokensAction"
      | "receiveTokensTrigger"
      | "swapTokensAction"
      | "swapTokensTrigger"
      | "bridgeUSDCAction",
  ) => {
    switch (id) {
      case "twitterPostTrigger":
        setNodes([
          ...nodes,
          {
            id: `twitterPost-${Math.floor(Math.random() * 10000)}`,
            type: "twitterPostTrigger",
            position: { x: 0, y: 0 },
            data: { handle: "", keywords: "" },
          },
        ]);
        break;
      case "sendTokensAction":
        setNodes([
          ...nodes,
          {
            id: `sendTokens-${Math.floor(Math.random() * 10000)}`,
            type: "sendTokensAction",
            position: { x: 100, y: 0 },
            data: { type: TokensType.ETH, walletAddress: "", amount: 0 },
          },
        ]);
        break;
      case "sendTokensTrigger":
        setNodes([
          ...nodes,
          {
            id: `sendTokens-${Math.floor(Math.random() * 10000)}`,
            type: "sendTokensTrigger",
            position: { x: 100, y: 0 },
            data: { type: TokensType.ETH, walletAddress: "", amount: 0 },
          },
        ]);
        break;
      case "receiveTokensAction":
        setNodes([
          ...nodes,
          {
            id: `receiveTokens-${Math.floor(Math.random() * 10000)}`,
            type: "receiveTokensAction",
            position: { x: 200, y: 0 },
            data: { type: TokensType.ETH, walletAddress: "", amount: 0 },
          },
        ]);
        break;
      case "receiveTokensTrigger":
        setNodes([
          ...nodes,
          {
            id: `receiveTokens-${Math.floor(Math.random() * 10000)}`,
            type: "receiveTokensTrigger",
            position: { x: 200, y: 0 },
            data: { type: TokensType.ETH, walletAddress: "", amount: 0 },
          },
        ]);
        break;
      case "swapTokensAction":
        setNodes([
          ...nodes,
          {
            id: `swapToken-${Math.floor(Math.random() * 10000)}`,
            type: "swapTokensAction",
            position: { x: 300, y: 0 },
            data: { fromType: TokensType.ETH, toType: TokensType.USDT, amount: 0 },
          },
        ]);
        break;
      case "swapTokensTrigger":
        setNodes([
          ...nodes,
          {
            id: `swapToken-${Math.floor(Math.random() * 10000)}`,
            type: "swapTokensTrigger",
            position: { x: 300, y: 0 },
            data: { fromType: TokensType.ETH, toType: TokensType.USDT, amount: 0 },
          },
        ]);
        break;

      default:
        break;
    }
  };

  return (
    <div
      className={
        "py-[0.781vw] px-[1.042vw] flex flex-col bg-white rounded-[0.521vw] w-[30%] h-full"
      }
    >
      <span className={"font-lufga mb-[0.781vw] font-medium text-[1.667vw] text-black"}>
        Modules
      </span>
      <div
        className={
          "w-full mb-[1.042vw] flex flex-row items-center p-[0.521vw] border border-[#DDDDDD] rounded-[0.521vw]"
        }
      >
        <input
          placeholder={"Search modules..."}
          className={
            "text-[0.625vw] w-full font-lufga outline-0 text-[#DDDDDD] placeholder:font-lufga placeholder:text-[#DDDDDD] placeholder:text-[0.625vw]"
          }
        />
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"w-[1.042vw]"}
        >
          <path
            d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
            stroke="#DDDDDD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5001 17.5L13.9167 13.9166"
            stroke="#DDDDDD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className={"text-black text-[1.042vw] font-medium font-lufga mb-[0.781vw]"}>
        Actions
      </span>
      <div className={"grid grid-cols-2 gap-[0.521vw] mb-[1.563vw]"}>
        {actions.map((item, index) => (
          <ModuleBtn
            id={item.id}
            key={index}
            name={item.name}
            type={item.type}
            icon={item.icon}
            onClick={() => {
              updateNodes(item.id);
            }}
          />
        ))}
      </div>
      <span className={"text-black text-[1.042vw] font-medium font-lufga mb-[0.781vw]"}>
        Triggers
      </span>
      <div className={"grid grid-cols-2 gap-[0.521vw]"}>
        {triggers.map((item, index) => (
          <ModuleBtn
            id={item.id}
            key={index}
            name={item.name}
            type={item.type}
            icon={item.icon}
            onClick={() => {
              updateNodes(item.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
