import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAddress = (address: string | undefined) =>
  address ? address.slice(0, 4) + "..." + address.slice(-4) : "None";

export enum TokensType {
  ETH = "ETH",
  USDT = "USDT",
  USDC = "USDC",
}
