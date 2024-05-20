export type Attributes = Record<string, string | number | boolean> | undefined;
export type NodeType = (props: {
  name: string;
  attributes: Attributes;
}) => React.ReactNode;
export type TreeNode = {
  name: string;
  attributes: Attributes;
  children: TreeNode[];
};
