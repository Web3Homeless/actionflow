export interface ITranfserData {
  token: string;
}

export interface ISwapData {
  target: string; // address
  tokenIn: string; // address
  tokenOut: string; // address
  swapper: string; // 1inch
}

export interface ITwitterCallData {
  twitterHandle: string;
  searshWords: string;
}

export type BlockType = "transfer" | "twitter" | "swap";

export type NetworkType = "ethereum" | "arbitrum" | "polygon";

export type Status = "new";

export type Swapper = "1inch" | "uniswap";

export interface ITrigger {
  type: string;
  network: string;
  contractAddress: string;
  status: string;

  transferData: ITranfserData | undefined;
  swapData: ISwapData | undefined;
  twitterCallData: ITwitterCallData | undefined;
}

export const TRIGGER_COLLECTION = "triggers";
