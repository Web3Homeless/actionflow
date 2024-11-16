import * as React from "react";
import { ClassicScheme, RenderEmit, Presets } from "rete-react-plugin";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const { RefSocket, RefControl } = Presets.classic;

type NodeExtraData = { color: "red" | "yellow" | "violet"; icon: ReactNode };

function sortByIndex<T extends [string, undefined | { index?: number }][]>(entries: T) {
  entries.sort((a, b) => {
    const ai = a[1]?.index || 0;
    const bi = b[1]?.index || 0;

    return ai - bi;
  });
}

type Props<S extends ClassicScheme> = {
  data: S["Node"] & NodeExtraData;
  styles?: () => any;
  emit: RenderEmit<S>;
};
export type NodeComponent<Scheme extends ClassicScheme> = (props: Props<Scheme>) => JSX.Element;

export function CustomNode<Scheme extends ClassicScheme>(props: Props<Scheme>) {
  const inputs = Object.entries(props.data.inputs);
  const outputs = Object.entries(props.data.outputs);
  const controls = Object.entries(props.data.controls);
  const selected = props.data.selected || false;
  const { id, label, color, icon } = props.data;

  sortByIndex(inputs);
  sortByIndex(outputs);
  sortByIndex(controls);

  return (
    <div
      className={cn(
        "rounded-[0.521vw] p-[0.781vw] flex flex-col hover:opacity-80 cursor-pointer",
        color === "violet" ? "bg-violet" : color === "yellow" ? "bg-yellow" : "bg-red",
      )}
      data-testid="node"
    >
      <div data-testid="title" className={"select-none flex flex-row gap-[0.521vw] items-center"}>
        {icon}
        <span className={"text-[1.042vw] font-medium text-white"}>{label}</span>
      </div>
      {/* Outputs */}
      {outputs.map(
        ([key, output]) =>
          output && (
            <div className="flex mb-[0.729vw] flex-col" key={key} data-testid={`output-${key}`}>
              <div className="text-black" data-testid="output-title">
                {output?.label}
              </div>
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
      {controls.map(([key, control]) => {
        return control ? (
          <RefControl key={key} name="control" emit={props.emit} payload={control} />
        ) : null;
      })}
      {/* Inputs */}
      {inputs.map(
        ([key, input]) =>
          input && (
            <div className="input" key={key} data-testid={`input-${key}`}>
              <RefSocket
                name="input-socket"
                emit={props.emit}
                side="input"
                socketKey={key}
                nodeId={id}
                payload={input.socket}
              />
              {input && (!input.control || !input.showControl) && (
                <div className="input-title" data-testid="input-title">
                  {input?.label}
                </div>
              )}
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
