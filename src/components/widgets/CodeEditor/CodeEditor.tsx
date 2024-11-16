import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { solidity } from "@replit/codemirror-lang-solidity";
import { useWorkflowStore } from "@/store/workflowStore";
import { deployContract } from "@wagmi/core";
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
import { Button } from "@/components/ui/button";

type Props = {};

const extensions = [solidity];

export default function CodeEditor({}: Props) {
  const { code, setCode } = useWorkflowStore();

  return (
    <div className="w-full">
      <CodeMirror
        width="100%"
        height="100%"
        value={code}
        extensions={extensions}
        onChange={(value) => setCode(value)}
      />
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
            <AlertDialogCancel>Ну нахуй</AlertDialogCancel>
            <AlertDialogAction>Похуй</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
