import { TokensType } from "@/lib/utils";
import type { Node } from "@xyflow/react";

export const baseNodes = {
  twitterPost: {
    id: "twitterPost-1",
    type: "twitterPost",
    position: { x: 0, y: 0 },
    data: { handle: "", keywords: "" },
  },
  sendTokens: {
    id: "sendTokens-1",
    type: "sendTokens",
    position: { x: 200, y: 0 },
    data: { type: TokensType.ETH, walletAddress: "", amount: 0 },
  },
  receiveTokens: {
    id: "receiveTokens-1",
    type: "receiveTokens",
    position: { x: 400, y: 0 },
    data: { type: TokensType.ETH, walletAddress: "", amount: 0 },
  },
  swapTokens: {
    id: "swapToken-1",
    type: "swapTokens",
    position: { x: 300, y: 0 },
    data: { fromType: TokensType.ETH, toType: TokensType.USDT, amount: 0 },
  },
};
