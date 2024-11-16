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
  const { code, setCode, bytecode, setCompiledBytecode } = useWorkflowStore();
  const workerRef = useRef<Worker | null>(null);
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const [deploying, setDeploying] = useState(false);
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
    <div className="w-full h-full">
      <div className="w-full h-3/4 overflow-y-scroll">
        <CodeMirror
          width="100%"
          value={code}
          extensions={extensions}
          onChange={(value) => setCode(value)}
        />
      </div>

      <Button onClick={compileContract} variant="outline">
        COMPILE
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={isDisabledDeploy || deploying} variant="outline">
            {deploying ? "DEPLOYING..." : "DEPLOY"}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>

            <AlertDialogDescription>
              Если эту хуйню задеплоить и вас заскамят - мы не виноваты
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={async () => await deploy()}>
              {deploying ? "Deploying..." : "Deploy"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
