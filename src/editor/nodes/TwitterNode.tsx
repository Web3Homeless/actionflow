"use client";

import * as React from "react";
import { ClassicScheme, RenderEmit, Presets } from "rete-react-plugin";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";

const { RefSocket, RefControl } = Presets.classic;

// type NodeExtraData = { color: "red" | "yellow" | "violet"; icon: ReactNode };

function sortByIndex<T extends [string, undefined | { index?: number }][]>(entries: T) {
  entries.sort((a, b) => {
    const ai = a[1]?.index || 0;
    const bi = b[1]?.index || 0;

    return ai - bi;
  });
}

type Props<S extends ClassicScheme> = {
  data: S["Node"];
  styles?: () => any;
  emit: RenderEmit<S>;
};
export type NodeComponent<Scheme extends ClassicScheme> = (props: Props<Scheme>) => JSX.Element;

export function TwitterNode<Scheme extends ClassicScheme>(props: Props<Scheme>) {
  const inputs = Object.entries(props.data.inputs);
  const outputs = Object.entries(props.data.outputs);
  const controls = Object.entries(props.data.controls);
  const selected = props.data.selected || false;
  const { id } = props.data;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  sortByIndex(inputs);
  sortByIndex(outputs);
  sortByIndex(controls);

  return (
    <div
      className={
        "rounded-[0.521vw] relative p-[0.781vw] gap-[0.521vw] flex flex-col hover:opacity-80 cursor-pointer bg-yellow"
      }
      data-testid="node"
    >
      <div data-testid="title" className={"select-none flex flex-row gap-[0.521vw] items-center"}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"w-[1.042vw]"}
        >
          <mask
            id="mask0_1_11"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="20"
            height="20"
          >
            <path d="M0 0H20V20H0V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_1_11)">
            <path
              d="M15.75 0.937134H18.8171L12.1171 8.61428L20 19.0628H13.8286L8.99143 12.7271L3.46286 19.0628H0.392857L7.55857 10.8486L0 0.938562H6.32857L10.6943 6.72856L15.75 0.937134ZM14.6714 17.2228H16.3714L5.4 2.68142H3.57714L14.6714 17.2228Z"
              fill="white"
            />
          </g>
        </svg>
        <span className={"text-[1.042vw] font-medium text-white"}>Twitter Post</span>
      </div>
      {/* Outputs */}
      {outputs.map(
        ([key, output]) =>
          output && (
            <div
              className="absolute top-[40%] -right-[17px]"
              key={key}
              data-testid={`output-${key}`}
            >
              <RefSocket
                name="output-socket"
                side="output"
                emit={props.emit}
                socketKey={key}
                nodeId={id}
                payload={output.socket}
              />
            </div>
          ),
      )}
      {/* Controls */}
      <div className={"flex flex-col gap-3 w-full"}>
        {controls.map(([key, control]) => {
          return control ? (
            // <RefControl key={key} name="control" emit={props.emit} payload={control} />
            <div key={key}>
              <div>{isOpen ? "true" : "false"}</div>
              <button onClick={() => setIsOpen(!isOpen)}>sdasd</button>
            </div>
          ) : null;
        })}
      </div>
      {/* Inputs */}
      {inputs.map(
        ([key, input]) =>
          input && (
            <div className="absolute top-[40%] -left-[17px]" key={key} data-testid={`input-${key}`}>
              <RefSocket
                name="input-socket"
                emit={props.emit}
                side="input"
                socketKey={key}
                nodeId={id}
                payload={input.socket}
              />
              {input?.control && input?.showControl && (
                <span className="input-control">
                  <RefControl
                    key={key}
                    name="input-control"
                    emit={props.emit}
                    payload={input.control}
                  />
                </span>
              )}
            </div>
          ),
      )}
    </div>
  );
}
