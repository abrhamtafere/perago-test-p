import React, { useEffect, useState } from "react";
import { Tree } from 'primereact/tree';
import { OrganizationChart } from 'primereact/organizationchart';
import { generateTreeData } from './generateTreeData';
import axios from "axios";
import { useSelector } from "react-redux";
// import { setData } from "../redux/employeeSlice";
import { useGetEmployeesQuery, useGetRolesQuery } from '../redux/apiSlice';
import { Loading } from "../component/Loading";

export default function Role() {

  const { data: employee, error, isLoading } = useGetEmployeesQuery();
  const { data: role, isLoading:isLoadingRole, refetch } = useGetRolesQuery();

  const [data2, setData2] = useState([
    {
      "id": 1,
      "name": "CEO",
      "hasAParent": false,
      "childrenId": [2, 4, 11],
      "numEmployees": 1
    },
    {
      "id": 2,
      "name": "CTO",
      "hasAParent": true,
      "parentId": 1,
      "childrenId": [3, 5, 7, 9],
      "numEmployees": 4
    },
    {
      "id": 3,
      "name": "Project Manager",
      "hasAParent": true,
      "parentId": 2,
      "childrenId": [6],
      "numEmployees": 1
    },
    {
      "id": 4,
      "name": "CFO",
      "hasAParent": true,
      "parentId": 1,
      "childrenId": [8],
      "numEmployees": 1
    },
    {
      "id": 5,
      "name": "Product Owner",
      "hasAParent": true,
      "parentId": 2,
      "childrenId": [10],
      "numEmployees": 1
    },
    {
      "id": 6,
      "name": "Tech Lead",
      "hasAParent": true,
      "parentId": 3,
      "childrenId": [16, 17, 19],
      "numEmployees": 0
    },
    {
      "id": 7,
      "name": "QA Engineer",
      "hasAParent": true,
      "parentId": 2,
      "childrenId": [12, 14, 18],
      "numEmployees": 0
    },
    {
      "id": 8,
      "name": "Chef Accountant",
      "hasAParent": true,
      "parentId": 4,
      "childrenId": [10],
      "numEmployees": 0
    },
    {
      "id": 9,
      "name": "Scrum Master",
      "hasAParent": true,
      "parentId": 2,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 10,
      "name": "Frontend Developer",
      "hasAParent": true,
      "parentId": 8,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 11,
      "name": "HR",
      "hasAParent": true,
      "parentId": 1,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 12,
      "name": "Backend Developer",
      "hasAParent": true,
      "parentId": 7,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 13,
      "name": "Financial Analyst",
      "hasAParent": true,
      "parentId": 8,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 14,
      "name": "DevOps Engineer",
      "hasAParent": true,
      "parentId": 7,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 15,
      "name": "Account and Payable",
      "hasAParent": true,
      "parentId": 8,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 16,
      "name": "Other Backend Roles",
      "hasAParent": true,
      "parentId": 6,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 17,
      "name": "Other Frontend Roles",
      "hasAParent": true,
      "parentId": 6,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 18,
      "name": "Other DevOps Roles",
      "hasAParent": true,
      "parentId": 7,
      "childrenId": [],
      "numEmployees": 0
    },

    // {
    //   "id": 19,
    //   "name": "Other QA Roles",
    //   "hasAParent": true,
    //   "parentId": 6,
    //   "childrenId": [],
    //   "numEmployees": 0
    // }
  ]);
  // const [data, setData] = useState(null);
  // const { role } = useSelector((state) => state.employeeman);

  useEffect(() => {
    refetch()
  }, []);
  
  if (isLoadingRole || isLoading) {
    console.log('loading')
    // Render a loading spinner or message until data is fetched
    return <Loading />
  }
 
  const treeData = generateTreeData(role);
console.log('tree data: ', treeData)
  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      {/*  bg-gradient-to-br from-green-100 to-white-100 */}
        {/* <h3>Organizational Chart</h3> */}
      <div className="card overflow-x-auto mt-20">
        {/* <Tree value={treeData} /> //add as an option for the user */}
        {/* <OrganizationChart value={treeData} /> */}
        {role && (
          <OrganizationChart
            value={treeData}
            // nodeTemplate={nodeTemplate}
            selectionMode="single"
          />
        )}
      </div>
    </div>
  );
}