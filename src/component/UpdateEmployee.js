import { useState } from 'react';
import axios from 'axios';
import { useUpdateEmployeeMutation } from '../redux/apiSlice';

export const UpdateEmployee = ({ employee, onUpdate }) => {
  const [name, setName] = useState(employee.name);
  const [role, setRole] = useState(employee.role);
  const [salary, setSalary] = useState(employee.salary);

  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployee = { ...employee, name, role, salary };
    try {
      await updateEmployee(updatedEmployee).unwrap();
      // const response = await axios.put(`http://localhost:4000/employees/${updatedEmployee.id}`, updatedEmployee);
      // onUpdate(response.data); // update parent component state with updated employee data
      onUpdate();
    } catch (error) { 
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
          Role:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="role"
          type="text"
          placeholder="Enter role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="salary">
          Salary:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="salary"
          type="number"
          placeholder="Enter salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Update
      </button>
    </form>
  );
};