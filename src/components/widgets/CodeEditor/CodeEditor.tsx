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

// Worker ref
const extensions = [solidity];

type CompilationData = {
  errors: any[];
  sources: any;
  contracts: any[];
};

export default function CodeEditor() {
  const { code, setCode, bytecode, setCompiledBytecode } = useWorkflowStore();
  const workerRef = useRef<Worker | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create the worker only on the client side
      workerRef.current = new Worker(new URL("./solidityWorker.js", import.meta.url));

      workerRef.current.addEventListener("message", (event) => {
        const { output } = event.data;
        const outputData = output as CompilationData;
        setCompiledBytecode(output);
        console.log("Please");
        console.log("Compiled output:", outputData);
        if (outputData.errors) {
          console.log("Errors in compilation:", outputData);
          toast({
            title: "Compilation failed",
            description: "something went wrong...",
            variant: "destructive",
          });
        } else {
          console.log("NO errors in compilation:", outputData);
          toast({
            title: "Compilation succeed!",
            description: "Now you can deploy your contract",
            variant: "default",
          });
        }
      });

      return () => {
        // Clean up the worker on unmount
        workerRef.current?.terminate();
      };
    }
  }, []);

  const compileContract = () => {
    console.log("COMPILE CONTRACT PRESSED");
    if (workerRef.current) {
      console.log("POSTED");
      workerRef.current.postMessage({ contractCode: code });
    } else {
      console.error("Worker is not available.");
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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
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
            <AlertDialogAction onClick={compileContract}>Compile</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
