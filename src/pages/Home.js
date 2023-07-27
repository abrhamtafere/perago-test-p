import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return <div className="flex flex-col items-center justify-center h-screen">
  <h1 className="text-4xl font-bold mb-8">Employee Management System</h1>

  <div className="flex flex-col md:flex-row gap-4">
  <Link
      to="/employees"
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-medium transition duration-300"
    >
      View Employees
    </Link>

    <Link
      to="/role-table"
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-medium transition duration-300"
    >
      View Roles
    </Link>

    <Link
      to="/add-employee"
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-lg font-medium transition duration-300"
    >
      Add Employee
    </Link>

    <Link
      to="/add-role"
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-lg font-medium transition duration-300"
    >
      Add Role
    </Link>
  </div>
</div>;
};

export default Home;
