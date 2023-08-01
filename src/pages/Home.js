import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { setRole, setEmployee } from "../redux/employeeSlice";

const Home = () => {

  const { role, employee } = useSelector((state) => state.employeeman);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/roles");
        dispatch(setRole(response.data));
        console.log(role)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); 
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await axios.get("http://localhost:4000/employees");
        dispatch(setEmployee(response.data));
        console.log(employee);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-100 to-purple-100">
      <h1 className="flex flex-col  items-center text-4xl font-bold mb-6">
        <p><img src='./images/perago.png' alt='perago' className='inline w-44 h-12'/> Systems</p>
        <p  className=" items-center">Employee Management System</p>
      </h1>

      <div className="flex flex-col md:flex-row gap-4">
        <Link
          to="/employees-table"
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
    </div>
  );
};

export default Home;