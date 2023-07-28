export function generateTreeData2(data) {
  const nodes = [];

  // Create nodes for each item in the data array
  data.forEach(item => {
    const node = {
      expanded: true,
      type: 'person',
      data: {
        image: item.photo,
        name: item.name,
        title: item.role
      },
      children: []
    };

    if (item.managerId) {
      // Add node to parent's children array
      const parent = findNodeById(nodes, item.managerId.toString());
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    } else {
      nodes.push(node);
    }
  });

  return nodes;
}

function findNodeById(nodes, id) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.data.id === id) {
      return node;
    }
    const found = findNodeById(node.children, id);
    if (found) {
      return found;
    }
  }
  return null;
}