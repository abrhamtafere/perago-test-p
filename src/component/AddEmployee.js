import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAddSuccessMessage } from "../redux/employeeSlice";
import { useNavigate } from 'react-router-dom';
import { notifications } from "@mantine/notifications";
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { useGetEmployeesQuery, useGetRolesQuery } from "../redux/apiSlice";
import { Loading } from './Loading';
import { Widget } from "@uploadcare/react-widget";

const AddEmployee = () => {
  //to redirect a page
  const navigate = useNavigate();
  const { data: employee, error, isLoading, refetch } = useGetEmployeesQuery();

  const { addSuccessMessage } = useSelector((state) => state.employeeman);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [roles, setRoles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [isFileLoaded, setIsFileLoaded] = useState(false);
//setAddSuccessMessage
const dispatch = useDispatch();
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:4000/roles"); 
        setRoles(response.data); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoles();
  }, []);

  const onSubmitForm = async (data) => {
    try {   
      const image = imageUrl;
      console.log('image data ', image) 
      const response = await axios.post(
        "http://localhost:4000/employees",
        { ...data, photo: image }
      );
      console.log('employees data: ', response.data);
      notifications.show({
        title: 'Success',
        message: 'Employee added successfully!',
        autoClose: 5000,
        color: 'green',
        icon: <RiCheckboxCircleLine />,
        withBorder: true
        // style: { backgroundColor: 'green' },
        // onClose: () => setEditSuccessMessage(null),
      })
      // dispatch(setAddSuccessMessage("Employee added successfully!"));
        // Redirect to employee table page
        //redirect
      // window.location.href = "/employee";
      navigate('/employee');
    } catch (error) {
      console.error(error);
    }
  };

  if(isLoading){
    return <Loading />
  }

  return (
    <div className="max-w-lg mx-auto my-8 p-8 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
      {addSuccessMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">Success</p>
          <p>{addSuccessMessage}</p>
        </div>
      )}
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
          <select
            name="role"
            {...register("role", {
              required: "Role is required",
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.role ? "border-red-500" : ""
            }`}
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
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
            Manager
          </label>

          {/* <input
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
          /> */}
          {/* // */}
          <select
            name="manager"
            {...register("managerId", {
              // required: "managerId is required",
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.managerId ? "border-red-500" : ""
            }`}
          >
            <option value="">Select a Manager name</option>
            {employee.map((emp) => (
              <option key={emp.id} value={emp.name}>
                {emp.name}
              </option>
            ))}
          </select>
          {/*  */}
          {errors.managerId && (
            <p className="text-red-500 mt-2">{errors.managerId.message}</p>
          )}
        </div>
        {/* <div className="mb-4">
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
        </div> */}
        <div>
        <p>
  <label htmlFor='file'>Your file:</label>{' '}
  <Widget publicKey='e9953f30f67a52de187b' id='file' 
  onFileSelect={(file) => {
    console.log('File changed: ', file)

    if (file) {
      file.progress(info => {console.log('File progress: ', info.progress)
      setIsFileLoaded(true);
    })
      file.done(info => {
        console.log('File uploaded: ', info, 'after wawu: ', info.originalUrl)
        setIsFileLoaded(false);
        setImageUrl(info.cdnUrl);
        register('photo').setValue(info.cdnUrl);
        console.log('kaka ', info.cdnUrl)
      })
    }
  }}
  // onChange={(file) => {
  //   if (file) {
  //     file.promise().then((info) => {
  //       // Set the image URL in the form data
  //       register('photo').setValue(info.cdnUrl);
  //     });
  //   }
  // }}
/>
{errors.photo && <p>{errors.photo.message}</p>}
</p>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isFileLoaded}
        >
          {isFileLoaded ? 'Loading...' : 'Add Employee'} 
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;