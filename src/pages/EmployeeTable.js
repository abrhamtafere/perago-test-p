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
import { setEmployee } from "../redux/employeeSlice";
import { Loading } from "../component/Loading";

const PAGE_SIZE = 5; // number of items to display per page

const EmployeeTable = () => {
  const { employee, role } = useSelector((state) => state.employeeman);

  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditEmployee, setSelectedEditEmployee] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sortSalaryOrder, setSortSalaryOrder] = useState(""); //optional
  const [sortField, setSortField] = useState("id"); // Default sorting field
  const [sortId, setSortId] = useState("asc"); // Default sorting asc

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
    return <Loading />;
  }

  //for sorting
  // const sortedData = [...employee].sort((a, b) => {
  //   if (sortSalaryOrder === "asc") {
  //     return a.salary - b.salary;
  //   } else {
  //     return b.salary - a.salary;
  //   }
  // });

  // Sorting function
  const compareItems = (a, b) => {
    if (sortField === "id") {
      return sortId === "asc" ? a.id - b.id : b.id - a.id;
    } else if (sortField === "salary") {
      return sortSalaryOrder === "asc" ? a.salary - b.salary : b.salary - a.salary;
    }
    return 0;
  };

  // Sorting and filtering logic
  const sortedData = [...employee].sort(compareItems);

  //filter based on the search and filter values
  const filteredData = sortedData.filter(
    (emp) =>
      (emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.role.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "" || emp.role === filter)
    // (filter === "" || (emp.role === filter && emp.salary >= filterSalary))
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  // eployee is replaced by filteredData based on the search and filter
  // const currentPageData = employee.slice(startIndex, endIndex);
  // const totalPages = Math.ceil(employee.length / PAGE_SIZE);

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
      {isDeleteSuccess && ( //use redux to display it in other place
        <Alert
          color="green"
          title="Employee deleted successfully."
          onClose={() => setIsDeleteSuccess(false)}
          style={{ marginBottom: "1rem" }}
        />
      )}
      <div className="flex justify-end">
        <div className="pr-4">
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
            {role.map((rol) => (
              <option key={rol.id} value={rol.name}>
                {rol.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>
              Id
              <button
                onClick={() =>{
                  setSortField('id')
                  setSortId(sortId === "asc" ? "desc" : "asc")
                }
                }
                className={`ml-2`}
              >
                {sortField === 'id'? (sortId === "asc" ? "▲" : "▼") : <span>&#8597;</span>}
              </button>
            </th>
            <th>Name</th>
            <th>Role</th>
            {/* <th>Salary</th> */}
            <th>
              Salary
              <button
                onClick={() =>{
                  setSortField('salary')
                  setSortSalaryOrder(sortSalaryOrder === "asc" ? "desc" : "asc")
                }
                }
                className="ml-2"
              >
                {sortField === 'salary'? (sortSalaryOrder === "asc" ? "▲" : "▼") : <span>&#8597;</span>}
              </button>
            </th>
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
              {/* <td>{item.salary}</td> */}
              <td>{item.salary.toLocaleString()}</td>
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
        <div style={{ textAlign: "center" }}>
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
        </div>
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
