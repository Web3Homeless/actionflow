"use client";

import React, { useEffect, useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { solidity } from "@replit/codemirror-lang-solidity";
import { useWorkflowStore } from "@/store/workflowStore";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { waitForTransactionReceipt } from "@wagmi/core";
import { useAccount, useConnect, usePublicClient, useWaitForTransactionReceipt } from "wagmi";
import { deployContract } from "@wagmi/core";
import { mainnet } from "wagmi/chains";
import { config } from "@/config";
import { api } from "@/trpc/react";
import { TwitterTriggerNode } from "@/domain/nodes/twitter-trigger-node";
import { SwapNode } from "@/domain/nodes/swap-action-node";
import { CONTRACT_TEMPLATE } from "@/domain/const";

// Worker ref

const extensions = [solidity];

type CompilationData = {
  errors: any[];

  sources: any;

  contracts: {
    [fileName: string]: {
      [contractName: string]: {
        abi: any[];
        evm: { bytecode: { object: string } };
      };
    };
  };
};

export default function CodeEditor() {
  const { code, setCode, bytecode, setCompiledBytecode, workflow } = useWorkflowStore();
  const workerRef = useRef<Worker | null>(null);
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const [deploying, setDeploying] = useState(false);
  const ctx = api.useUtils();
  const isDisabledDeploy = (bytecode as CompilationData).errors != undefined || bytecode == "";

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create the worker only on the client side

      workerRef.current = new Worker(new URL("./solidityWorker.js", import.meta.url));

      workerRef.current.addEventListener("message", (event) => {
        const { output } = event.data;

        const outputData = output as CompilationData;

        setCompiledBytecode(output);

        if (outputData.errors) {
          toast({
            title: "Compilation failed",
            description: "Something went wrong...",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Compilation succeeded!",
            description: "Now you can deploy your contract",
            variant: "default",
          });
        }
      });

      return () => {
        workerRef.current?.terminate();
      };
    }
  }, []);

  const compileContract = () => {
    if (workerRef.current) {
      workerRef.current.postMessage({ contractCode: code });
    } else {
      console.error("Worker is not available.");
    }
  };

  const deploy = async () => {
    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet before deploying.",
        variant: "destructive",
      });

      return;
    }

    try {
      const contract = bytecode.contracts[0];

      console.log(contract);
      console.log(bytecode);
      console.log(bytecode.contracts.contract);
      console.log(bytecode.contracts.contract.ActionFlowContract);
      console.log(JSON.stringify(bytecode.contracts.contract.ActionFlowContract.abi));
      const c = bytecode.contracts.contract.ActionFlowContract;

      // Full bytecode (includes metadata and constructor)

      const fullBytecode = c.evm.bytecode.object;

      console.log(fullBytecode);
      console.log("0x" + fullBytecode);

      setDeploying(true);

      const hash = await deployContract(config, {
        abi: c.abi,
        args: [],
        bytecode: "0x" + fullBytecode,
      });

      await waitForTransactionReceipt(config, {
        hash: hash,
      });

      // TODO: Жжу ног
      // const triggerNode = workflow?.triggerNode;

      // let tranferData = undefined;
      // let swapData = undefined;
      // let twitterCallData = undefined;

      // if (triggerNode instanceof TwitterTriggerNode) {
      //   const twitterNode = triggerNode as TwitterTriggerNode;
      //   twitterCallData = {
      //     twitterHandle: "",
      //     searshWords: "",
      //   };
      // }

      // if (triggerNode instanceof SwapNode) {
      //   const twitterNode = triggerNode as SwapNode;
      //   twitterCallData = {
      //     twitterHandle: "",
      //     searshWords: "",
      //   };
      // }

      // if (triggerNode instanceof SwapNode) {
      //   const twitterNode = triggerNode as SwapNode;
      //   twitterCallData = {
      //     twitterHandle: "",
      //     searshWords: "",
      //   };
      // }

      // ctx.client.workflow.create.mutate({
      //   type: triggerNode?.type,
      //   network: "ethereum",
      //   contractAddress: `0x${hash}`,
      //   transferData: tranferData,
      //   swapData: swapData,
      //   twitterCallData: undefined,
      // });

      toast({
        title: "Contract deployed successfully!",
      });
    } catch {
      toast({
        title: "Something went wrong...",
        variant: "destructive",
      });
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-full overflow-y-scroll">
        <CodeMirror
          width="100%"
          value={code}
          extensions={extensions}
          onChange={(value) => setCode(value)}
        />
      </div>
      <button
        className={
          "flex w-[90%] my-[0.521vw] hover:opacity-80 flex-row bg-gradient-to-r from-[#FF603A] to-[#F3B440] justify-center items-center py-[0.781vw] px-[1.25vw] rounded-full gap-[0.521vw]"
        }
        onClick={async () => await deploy()}
      >
        <span className={"text-white text-[1.042vw] font-medium"}>Deploy Contract</span>
      </button>
    </div>
  );
}
