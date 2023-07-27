import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddEmployee = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmitForm = async (data) => {
    try {   
      const response = await axios.post(
        "http://localhost:4000/employees",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            name="name"
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 mt-2">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
            Role
          </label>
          <input
            name="role"
            type="text"
            {...register("role", {
              required: "Role is required",
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.role ? "border-red-500" : ""
            }`}
          />
          {errors.role && (
            <p className="text-red-500 mt-2">{errors.role.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="salary"
            className="block text-gray-700 font-bold mb-2"
          >
            Salary
          </label>
          <input
            name="salary"
            type="number"
            {...register("salary", {
              required: "Salary is required",
              min: {
                value: 0,
                message: "Salary must be a positive number",
              },
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.salary ? "border-red-500" : ""
            }`}
          />
          {errors.salary && (
            <p className="text-red-500 mt-2">{errors.salary.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="managerId"
            className="block text-gray-700 font-bold mb-2"
          >
            Manager ID
          </label>
          <input
            name="managerId"
            type="number"
            {...register("managerId", {
              min: {
                value: 1,
                message: "Manager ID must be a positive number",
              },
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.managerId ? "border-red-500" : ""
            }`}
          />
          {errors.managerId && (
            <p className="text-red-500 mt-2">{errors.managerId.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">
            Photo
          </label>
          <input
            name="photo"
            type="file"
            accept="image/*"
            {...register("photo", {
              required: "Photo is required",
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.photo ? "border-red-500" : ""
            }`}
          />
          {errors.photo && (
            <p className="text-red-500 mt-2">{errors.photo.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;