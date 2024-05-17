"use client";

import { useCenteredTree } from "@/shared/hooks/useCenteredTree";
import Tree, { type CustomNodeElementProps } from "react-d3-tree";
import type { NodeType, TreeNode } from "./types";

const renderForeignObjectNode = ({
  nodeDatum,
  foreignObjectProps,
  Node,
}: CustomNodeElementProps & {
  foreignObjectProps: Record<string, number>;
  Node: NodeType;
}) => (
  <g>
    <foreignObject {...foreignObjectProps}>
      {Node(nodeDatum.name, nodeDatum.attributes)}
    </foreignObject>
  </g>
);

type Props = {
  data: TreeNode;
  Node: NodeType;
};

export default function CategoryTreeDisplay(props: Props) {
  const [dimensions, translate, containerRef] = useCenteredTree();

  const nodeSize = { x: 200, y: 150 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -100 };

  return (
    <div
      className="h-full rounded-xl border bg-card text-card-foreground shadow"
      ref={containerRef}
    >
      <Tree
        data={props.data}
        dimensions={dimensions}
        translate={translate}
        draggable
        nodeSize={nodeSize}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({
            ...rd3tProps,
            foreignObjectProps,
            Node: props.Node,
          })
        }
        orientation="vertical"
        pathClassFunc={() => "tree-path"}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
      />
    </div>
  );
}
