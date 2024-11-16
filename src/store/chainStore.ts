import { create } from "zustand/index";
import { createJSONStorage, persist } from "zustand/middleware";
import { storage } from "./storage";

export interface IChainStore {
  chainId: string;
  setChainId: (chainId: string) => void;
}

export const useChainStore = create<IChainStore, [["zustand/persist", never]]>(
  persist(
    (set) => ({
      chainId: "",
      setChainId: (chainId: string) => {
        set({
          chainId: chainId,
        });
      },
    }),
    {
      name: "chainStore",
      storage: createJSONStorage(() => storage),
    },
  ),
);
