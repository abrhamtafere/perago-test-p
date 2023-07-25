// import React, { useEffect, useState } from "react";
// // import { RoleTable } from "../component/RoleTable";
import axios from "axios";
// import { OrganizationChart } from 'primereact/organizationchart';

// const Role = () => {

//   // const [data, setData] = useState([]);

//   // useEffect(() => {
//   //   axios.get('http://127.0.0.1:4000/roles')
//   //     .then(response => {
//   //       setData(response.data);
//   //     })
//   //     .catch(error => {
//   //       console.log(error);
//   //     });
//   //     console.log(data)
//   // }, []);
//   return <div className="p-4">
//   {/* <RoleTable roles={roles} /> */}
//   <h1>Data from API:</h1>
//       {/* <ul>
//         {data.map(item => (
//           <>
//           <li key={item.id}>{item.name}</li> */}
//       <OrganizationChart value={} />
//           {/* </>
//         ))}
//       </ul> */}
// </div>;
// };

// export default Role;

import React, { useEffect, useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";

export default function Role() {
  const [data, setData] = useState(null);

  const [data2] = useState([
    {
      label: "Argentina",
      expanded: true,
      children: [
        {
          label: "Argentina",
          expanded: true,
          children: [
            {
              label: "Argentina",
            },
            {
              label: "Croatia",
            },
          ],
        },
        {
          label: "France",
          expanded: true,
          children: [
            {
              label: "France",
            },
            {
              label: "Morocco",
            },
          ],
        },
      ],
    },
  ]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:4000/roles?flat=false")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
    // console.log(data.children);
  }, []);

  function buildTree(data, parentId = null) {
    const tree = [];
    data.filter(item => item.parentId === parentId).forEach(item => {
      const node = {
        id: item.id,
        label: item.name,
        type: "person",
        expanded: true,
        children: buildTree(data, item.id),
        employees: item.employees.map(employee => ({
          id: employee.id,
          label: employee.fullName,
          type: "person",
          expanded: true
          // Add any additional properties you need for each employee
        }))
      };
      tree.push(node);
    });
    return tree;
  }
 
  return (
    <div className="flex justify-center  mt-20">
      <div className="card overflow-x-auto">
        <OrganizationChart value={data2} />
      </div>
    </div>
  );
}
