import { createRoot } from "react-dom/client";
import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions, Area } from "rete-area-plugin";
import { ConnectionPlugin, Presets as ConnectionPresets } from "rete-connection-plugin";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";
import { CustomNode } from "./CustomNode";
import { TwitterNode } from "@/editor/nodes/TwitterNode";
// import { StyledNode } from "./StyledNode";
// import { CustomSocket } from "./CustomSocket";
// import { CustomConnection } from "./CustomConnection";
// import { addCustomBackground } from "./custom-background";

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = ReactArea2D<Schemes>;

export async function createEditor(container: HTMLElement) {
  const socket = new ClassicPreset.Socket("socket");

  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  });

  render.addPreset(
    Presets.classic.setup({
      customize: {
        node(context) {
          if (context.payload.label === "CustomNode") return CustomNode;
          if (context.payload.label === "TwitterNode") return TwitterNode;
          return Presets.classic.Node;
        },
        socket(context) {
          return Presets.classic.Socket;
        },
        connection(context) {
          return Presets.classic.Connection;
        },
      },
    }),
  );

  connection.addPreset(ConnectionPresets.classic.setup());

  // addCustomBackground(area);

  editor.use(area);
  area.use(connection);
  area.use(render);
  area.area.setZoomHandler(null);

  AreaExtensions.simpleNodesOrder(area);

  const a = new ClassicPreset.Node("TwitterNode");
  a.addControl(
    "TwitterHandleControl",
    new ClassicPreset.InputControl("text", { initial: "Handle..." }),
  );
  a.addControl(
    "TwitterKeywordsControl",
    new ClassicPreset.InputControl("text", {
      initial: "Keywords...",
    }),
  );
  a.addOutput("DefaultOutput", new ClassicPreset.Output(socket));
  await editor.addNode(a);

  const a2 = new ClassicPreset.Node("TwitterNode");
  a2.addControl(
    "TwitterHandleControl",
    new ClassicPreset.InputControl("text", { initial: "Handle..." }),
  );
  a2.addControl(
    "TwitterKeywordsControl",
    new ClassicPreset.InputControl("text", { initial: "Keywords..." }),
  );
  a2.addInput("DefaultInput", new ClassicPreset.Input(socket));
  await editor.addNode(a2);

  await editor.addConnection(new ClassicPreset.Connection(a, "DefaultOutput", a2, "DefaultInput"));

  // await area.translate(a.id, { x: 0, y: 0 });
  // await area.translate(b.id, { x: 300, y: 0 });

  // await editor.addConnection(new ClassicPreset.Connection(a, "a", b, "a"));

  // setTimeout(() => {
  //   AreaExtensions.zoomAt(area, editor.getNodes());
  // }, 100);

  return {
    destroy: () => area.destroy(),
  };
}
