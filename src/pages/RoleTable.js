import React, { useEffect, useState } from "react";
import { Table, Text, Button, Pagination, Modal } from "@mantine/core";
import axios from "axios";
import UpdateRole from "../component/UpdateRole";
import { useDispatch, useSelector } from "react-redux";
import { setEmployee, setRole } from "../redux/employeeSlice";

const PAGE_SIZE = 5;

const RoleTable = () => {
  // const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRoleName, setSelectedRoleName] = useState("");
  const { role, employee } = useSelector((state) => state.employeeman);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get("http://localhost:4000/roles");
        dispatch(setRole(response.data));

        const response2 = await axios.get("http://localhost:4000/employees");
        dispatch(setEmployee(response2.data));

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (id) => {
    // Open the modal and set the selected role ID
    setSelectedRoleId(id);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedRole) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/roles/${updatedRole.id}`,
        updatedRole
      );
      // Update the role in the data array
      const updatedData = role.map((role) =>
        role.id === response.data.id ? response.data : role
      );
      dispatch(setRole(updatedData));
      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/roles/${id}`);
      // Remove the role from the data array
      const filteredData = role.filter((role) => role.id !== id);
      dispatch(setRole(filteredData));
      // Close the delete confirmation modal
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (id, name) => {
    // Open the delete confirmation modal and set the selected role ID and name
    setSelectedRoleId(id);
    setSelectedRoleName(name);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedRoleId(null);
  };

  if (!employee) {
    // Render a loading spinner or message until data is fetched
    return <div>Loading...</div>;
  }

  if (!role) {
    // Render a loading spinner or message until data is fetched
    return <div>Loading...</div>;
  }

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pageData = role.slice(startIndex, endIndex);

  const getNumEmployeesByRole = (role) => {
    return employee.filter(emp => emp.role === role).length;
  }


  return (
    <div className="p-4">
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Parent ID</th>
            <th>Num Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>{role.parentId || "-"}</td>
              <td>{getNumEmployeesByRole(`${role.name}`)}</td>
              <td>
                <Button
                  onClick={() => handleEdit(role.id)}
                  variant="outline"
                  color="blue"
                >
                  Edit
                </Button>{" "}
                {/* <Button
                  onClick={() => handleDelete(role.id)}
                  variant="outline"
                  color="red"
                >
                  Delete
                </Button> */}
                <Button
                  onClick={() => handleDeleteClick(role.id, role.name)}
                  variant="outline"
                  color="red"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Text align="center" mt={5}>
        Showing {startIndex + 1} to {endIndex} of {role.length} roles
      </Text>
      <Pagination
        total={Math.ceil(role.length / PAGE_SIZE)}
        style={{ marginTop: "20px" }}
        pages={Math.ceil(role.length / PAGE_SIZE)}
        page={currentPage}
        onChange={handlePageChange}
      />
      <Modal
        opened={isModalOpen}
        title="Edit Role"
        onClose={handleCloseModal}
        size="md"
        padding="md"
      >
        <UpdateRole
          role={role.find((role) => role.id === selectedRoleId)}
          onUpdate={handleUpdate}
          onClose={handleCloseModal}
        />
      </Modal>

      <Modal
  opened={isDeleteModalOpen}
  onClose={handleDeleteCancel}
  size="sm"
  title="Confirm Delete"
  padding="sm"
  zIndex={10000}
>
  <div style={{ textAlign: "center" }}>
    <Text variant="body1" style={{ marginBottom: 10 }}>
      Are you sure you want to delete {selectedRoleName}?
    </Text>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        onClick={() => handleDelete(selectedRoleId)}
        color="red"
        variant="outline"
        style={{ marginRight: 10 }}
      >
        Delete
      </Button>
      <Button
        onClick={handleDeleteCancel}
        variant="outline"
        style={{ marginLeft: 10 }}
      >
        Cancel
      </Button>
    </div>
  </div>
</Modal>
    </div>
  );
};

export default RoleTable;
