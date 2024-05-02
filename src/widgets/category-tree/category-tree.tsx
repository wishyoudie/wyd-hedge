"use client";

import Tree, { type CustomNodeElementProps } from "react-d3-tree";
import NewChildButton from "./new-child-button";
import { useCenteredTree } from "~/shared/hooks/useCenteredTree";
import CategoryTreeItem from "./category-tree-item";

export type TreeNode = {
  name: string;
  attributes?: Record<string, string | number | boolean>;
  children: TreeNode[];
};

const renderForeignObjectNode = ({
  nodeDatum: node,
  foreignObjectProps,
}: CustomNodeElementProps & { foreignObjectProps: Record<string, number> }) => (
  <g>
    <foreignObject {...foreignObjectProps}>
      <CategoryTreeItem name={node.name} attributes={node.attributes} />
      <NewChildButton />
    </foreignObject>
  </g>
);

export default function CategoryTree(props: { data: TreeNode }) {
  const [dimensions, translate, containerRef] = useCenteredTree();

  const nodeSize = { x: 200, y: 150 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -100 };

  return (
    <div
      className="h-[90%] rounded-xl border bg-card text-card-foreground shadow"
      ref={containerRef}
    >
      <Tree
        data={props.data}
        dimensions={dimensions}
        translate={translate}
        draggable
        nodeSize={nodeSize}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
        orientation="vertical"
        pathClassFunc={() => "tree-path"}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
      />
    </div>
  );
}
