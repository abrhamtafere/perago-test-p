export function generateTreeData(data) {
  const nodes = [];
  const nodeMap = {};

  // Create nodes for each item in the data array
  data.forEach(item => {
    const node = {
      key: item.id.toString(),
      label: item.name,
      expanded: true,
      children: []
    };

    nodeMap[item.id] = node;

    if (item.hasAParent) {
      // Add node to parent's children array
      const parent = nodeMap[item.parentId];
      if (parent) {
        parent.children.push(node);
      }
    } else {
      nodes.push(node);
    }
  });

  return nodes;
}
