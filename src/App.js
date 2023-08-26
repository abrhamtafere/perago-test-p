// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import { NavBar } from './component/Navitation/NavBar'
import {NavBar} from "./component/NavBar";
import AddEmployee from "./component/AddEmployee";
import AddRole from "./component/AddRole";
import About from "./pages/About";
// import Employee from "./pages/Employee";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import Role from "./pages/Role";
import RoleTable from "./pages/RoleTable";
import EmployeeTable from "./pages/EmployeeTable";
import FolderStructure from "./pages/RoleModified";
import { Notifications } from "@mantine/notifications";
const data = {
  "Roles": [
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
      "parentId": 3,
      "childrenId": [10],
      "numEmployees": 1
    },
    {
      "id": 6,
      "name": "Tech Lead",
      "hasAParent": true,
      "parentId": 5,
      "childrenId": [12, 14, 16, 17, 18, 19],
      "numEmployees": 0
    },
    {
      "id": 7,
      "name": "QA Engineer",
      "hasAParent": true,
      "parentId": 5,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 8,
      "name": "Chef Accountant",
      "hasAParent": true,
      "parentId": 4,
      "childrenId": [13, 15],
      "numEmployees": 0
    },
    {
      "id": 9,
      "name": "Scrum Master",
      "hasAParent": true,
      "parentId": 5,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 10,
      "name": "Frontend Developer",
      "hasAParent": true,
      "parentId": 1,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 11,
      "name": "HRt",
      "hasAParent": true,
      "parentId": 1,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 12,
      "name": "Backend Developer",
      "hasAParent": true,
      "parentId": 6,
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
      "parentId": 6,
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
      "parentId": 6,
      "childrenId": [],
      "numEmployees": 0
    },
    {
      "id": 19,
      "name": "Other QA Roles",
      "hasAParent": true,
      "parentId": 6,
      "childrenId": [],
      "numEmployees": 0
    }
  ]
};

function App() {
  return (
    <BrowserRouter>
    <Notifications />
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="role" element={<FolderStructure />} />
          <Route path="role2" element={<Role />} />
          <Route path="employees-table" element={<EmployeeTable />} />
          <Route path="about" element={<About />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="add-role" element={<AddRole />} />
          <Route path="role-table" element={<RoleTable />} />
          <Route path="employee" element={<EmployeeTable />} />
          {/* <Route path="employee" element={<Employee />} /> */}
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
