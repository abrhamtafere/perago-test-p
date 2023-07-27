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

const PAGE_SIZE = 5; // number of items to display per page

const EmployeeTable = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await axios.get("http://localhost:4000/employees");
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditEmployee, setSelectedEditEmployee] = useState(null);

  if (!data) {
    console.log("loading");
    // Render a loading spinner or message until data is fetched
    return <div>Loading...</div>;
  }

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentPageData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const handleEdit = (employee) => {
    setSelectedEditEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedEmployee) => {
    const index = data.findIndex(
      (employee) => employee.id === updatedEmployee.id
    );
    setData([
      ...data.slice(0, index),
      updatedEmployee,
      ...data.slice(index + 1),
    ]);
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
      setData((prevEmployees) =>
        prevEmployees.filter((emp) => emp.id !== selectedEmployee.id)
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
    <div className="container mx-auto">
      {isDeleteSuccess && (
        <Alert
          color="green"
          title="Employee deleted successfully."
          onClose={() => setIsDeleteSuccess(false)}
          style={{ marginBottom: "1rem" }}
        />
      )}
      <Table striped>
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
                  // style={{ margin: '0 auto' }}
                />
              </td>
              <td>
                <Button onClick={() => handleEdit(item)} variant="outline">
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
        // total={data.length}
        total={totalPages}
        style={{ marginTop: "1rem" }}
        pages={totalPages}
        value={currentPage}
        onChange={setCurrentPage}
        styles={(theme) => ({
          control: {
            "&[data-active]": {
              backgroundImage: theme.fn.gradient({ from: "red", to: "yellow" }),
              border: 0,
            },
          },
        })}
      />
      <Modal
        opened={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        size="sm"
        title="Confirm Delete"
        hideCloseButton
        padding="sm"
        zIndex={10000}
      >
        <Text variant="body1">
          Are you sure you want to delete{" "}
          {selectedEmployee && selectedEmployee.name}?
        </Text>
        <Button
          onClick={handleDeleteConfirm}
          color="red"
          variant="outline"
          style={{ marginTop: 10 }}
        >
          Delete
        </Button>
        <Button
          onClick={handleDeleteCancel}
          variant="outline"
          style={{ marginTop: 10, marginLeft: 10 }}
        >
          Cancel
        </Button>
      </Modal>
      <Modal
        opened={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        size="sm"
        title="Update Employee"
        hideCloseButton
        padding="sm"
        zIndex={10000}
      >
        <UpdateEmployee
          employee={selectedEditEmployee}
          onUpdate={handleUpdate}
        />
      </Modal>
    </div>
  );
};

export default EmployeeTable;
