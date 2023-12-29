import React, { useEffect, useState } from "react";
import {
  Table,
  Pagination,
  Text,
  Avatar,
  Button,
  Modal,
  Alert,
} from "@mantine/core";
import axios from "axios";
import { UpdateEmployee } from "../component/UpdateEmployee";
import { useDispatch, useSelector } from "react-redux";
import { setEmployee } from "../redux/slice/employeeSlice";
import { Loading } from "../component/Loading";

const PAGE_SIZE = 5; // number of items to display per page

const EmployeeTable = () => {
  const { employee } = useSelector((state) => state.employeeman);

  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditEmployee, setSelectedEditEmployee] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/employee");
        dispatch(setEmployee(response.data));
        console.log(employee);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!employee) {
    // Render a loading spinner or message until data is fetched
    return <Loading />
  }

  const filteredData = employee.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "" || emp.role === filter)
  );
  
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const handleEdit = (employee) => {
    setSelectedEditEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedEmployee) => {
    const index = employee.findIndex(
      (employee) => employee.id === updatedEmployee.id
    );
    dispatch(
      setEmployee([
        ...employee.slice(0, index),
        updatedEmployee,
        ...employee.slice(index + 1),
      ])
    );
    setIsEditModalOpen(false);
  };

  const handleDelete = async (employee) => {
    try {
      setSelectedEmployee(employee);
      setIsDeleteModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/employees/${selectedEmployee.id}`
      );
      // Update the employees state in the parent component by filtering out the deleted employee
      dispatch(
        setEmployee((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== selectedEmployee.id)
        )
      );

      setIsDeleteSuccess(true);
      setIsDeleteModalOpen(false);
      setSelectedEmployee(null);
      setTimeout(() => {
        setIsDeleteSuccess(false);
      }, 3000); // hide success message after 3 seconds
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="container mx-auto p-2">
      {isDeleteSuccess && (   //use redux to display it in other place
        <Alert
          color="green"
          title="Employee deleted successfully."
          onClose={() => setIsDeleteSuccess(false)}
          style={{ marginBottom: "1rem" }}
        />
      )}
      <div className="flex ">
      
            <div className='pr-4'>
              <input
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-2 py-1 border rounded-md"
              />
            </div>
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-2 py-1 border rounded-md"
              >
                <option value="">Filter by role</option>
                <option value="CEO">CEO</option>               <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
              </select>
            </div>
          
      </div>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Manager Id</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>{item.salary}</td>
              <td>{item.managerId}</td>
              <td>
                <Avatar
                  src={item.photo}
                  alt={item.name}
                  size="md"
                  radius="lg"
                />
              </td>
              <td>
                <Button
                  onClick={() => handleEdit(item)}
                  variant="outline"
                  className="active:ring-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(item)}
                  variant="outline"
                  color="red"
                  style={{ marginLeft: "0.5rem" }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        style={{ marginTop: "1rem" }}
        pages={totalPages}
        page={currentPage}
        onPageChange={setCurrentPage}
      />
      {isDeleteModalOpen && (
        <Modal
          onClose={() => setIsDeleteModalOpen(false)}
          opened={isDeleteModalOpen}
          size="sm"
          title="Confirm Delete"
        >
          <Text style={{ marginBottom: "1rem" }}>
            Are you sure you want to delete {selectedEmployee?.name}?
          </Text>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleDeleteCancel} style={{ marginRight: "1rem" }}>
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="red">
              Delete
            </Button>
          </div>
        </Modal>
      )}
      {isEditModalOpen && (
        <UpdateEmployee
          employee={selectedEditEmployee}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default EmployeeTable;