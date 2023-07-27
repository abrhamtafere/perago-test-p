import React, { useEffect, useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import axios from "axios";

export default function Role() {
  const [data, setData] = useState(null);

  const [data2] = useState([
    {
        label: 'Argentina1',
        expanded: true,
        children: [
            {
                label: 'Argentina2',
                expanded: true,
                children: [
                    {
                        label: 'Argentina3'
                    },
                    {
                        label: 'Croatia'
                    }
                ]
            },
            {
                label: 'France',
                expanded: true,
                children: [
                    {
                        label: 'France'
                    },
                    {
                        label: 'Morocco'
                    }
                ]
            },
            {
              label: 'Ethipia',
              expanded: true,
              children: [
                {
                  label: 'America',
                },
                {
                  label: 'China'
                }
              ]
            }
        ]
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/mockRoles");
        // const transformedData = await buildTree(response.data);
        // setData(transformedData);
        setData(response.data);
        console.log(response.data)
        console.log(buildTree(response.data))
        // console.log(convertData(response.data))
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
//

function buildTree(data, parentId = null) {
  return data.filter(item => item.parentId === parentId).map(item => {
    const children = buildTree(data, item.id);
    return {
      ...item,
      children: children.length ? children : null
    };
  });
}

const mokeData = [];
const size = data.length;
const makeTree = (data) => {
  
  for (let i = 0; i < size; i++) {
    let parentId = data[i].id;
    
  }
}

  // const nodeTemplate = (node) => {
  //   return (
  //     <div>
  //       <div>{node.label}</div>
  //       {node.employees && node.employees.map(emp => (
  //         <div key={emp.id}>{emp.label}</div>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <div className="flex justify-center mt-20">
      <div className="card overflow-x-auto">
        {data && (
          <OrganizationChart
            value={data2}
            // nodeTemplate={nodeTemplate}
            selectionMode="single"
          />
        )}
      </div>
    </div>
  ); 
}