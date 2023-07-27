// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import { NavBar } from './component/Navitation/NavBar'
import {NavBar} from "./component/NavBar";
import AddEmployee from "./component/AddEmployee";
import AddRole from "./component/AddRole";
import About from "./pages/About";
import Employee from "./pages/Employee";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Role from "./pages/Role";
import RoleTable from "./pages/RoleTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="role" element={<Role />} />
          <Route path="employee" element={<Employee />} />
          <Route path="about" element={<About />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="add-role" element={<AddRole />} />
          <Route path="role-table" element={<RoleTable />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
