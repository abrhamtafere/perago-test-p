import React, { useEffect, useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { generateTreeData2 } from '../component/generateTreeData2';
import { useSelector } from 'react-redux';

export default function SelectionDemo() {
    const [selection, setSelection] = useState([]);
    // const [data, setData] = useState(null);

    const { employee } = useSelector((state) => state.employeeman);

    if (!employee) {
        // Render a loading spinner or message until data is fetched
        return <div>Loading...</div>
    }
    
    const treeData = generateTreeData2(employee);
    
    const nodeTemplate = (node) => {
        if (node.type === 'person') {
            return (
                <div className="flex flex-column">
                    <div className="flex flex-column align-items-center">
                        <img alt={node.data.name} src={node.data.image} className="mb-3 w-3rem h-3rem" />
                        <span className="font-bold mb-2">{node.data.name}</span>
                        <span>{node.data.title}</span>
                    </div>
                </div>
            );
        }

        return node.label;
    };

    return (
        <div className="card overflow-x-auto">
            <OrganizationChart value={treeData} selectionMode="multiple" selection={selection} onSelectionChange={(e) => setSelection(e.data)} nodeTemplate={nodeTemplate} />
        </div>
    )
}  
  
 // load 