import React, { useEffect, useState } from "react";
import { Table, Text, Button, Pagination, Modal, Alert } from "@mantine/core";
import axios from "axios";
import UpdateRole from "../component/UpdateRole";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmployee,
  setEditSuccessMessage,
  setRole,
} from "../redux/slice/employeeSlice";
//apiSlice
import { useGetEmployeesQuery } from "../redux/api/employeeApiSlice";
import { useGetRolesQuery } from "../redux/api/roleApiSlice";
import { Loading } from "../component/Loading";
import { notifications } from "@mantine/notifications";
import { RiCheckboxCircleLine, RiErrorWarningLine } from "react-icons/ri";

const PAGE_SIZE = 5;

const RoleTable = () => {
  const {
    data: employee,
    error,
    isLoading,
    refetch: refetchEmployee,
  } = useGetEmployeesQuery();
  const { data: role, isLoading: isLoadingRole, refetch, setData } = useGetRolesQuery();
  
  // const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [selectedRoleName, setSelectedRoleName] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();

 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4000/roles");
  //       dispatch(setRole(response.data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
    // try {
    //   const response = await axios.put(
    //     `http://localhost:4000/roles/${updatedRole.id}`,
    //     updatedRole
    //   );
    //   // Update the role in the data array
    //   const updatedData = role.map((role) =>
    //     role.id === response.data.id ? response.data : role
    //   ); //i stop here
    //   dispatch(setRole(updatedData));
    //   // Close the modal
    //   setIsModalOpen(false);
    // } catch (error) {
    //   console.error(error);
    // }
    refetch();
    notifications.show({
      title: "Success",
      message: "successfully edited",
      autoClose: 5000,
      color: "green",
      icon: <RiCheckboxCircleLine />,
      withBorder: true,
      // style: { backgroundColor: 'green' },
      // onClose: () => setEditSuccessMessage(null),
    });
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const isNodeReferenced = role.some((role) => role.parentId === id);

      if (!isNodeReferenced) {
        // Delete only if the role is not referenced as a parent node by other nodes

        await axios.delete(`http://localhost:4000/roles/${id}`);
        // Remove the role from the data array
        refetch();
        const filteredData = role.filter((role) => role.id !== id);
        dispatch(setRole(filteredData));
        notifications.show({
          withBorder: true,
          title: "Success",
          message: "successfully deleted",
          autoClose: 5000,
          color: "green",
          icon: <RiCheckboxCircleLine />,

          // onClose: () => setEditSuccessMessage(null),
        });
        setIsDeleteModalOpen(false);
      } else {
        // Handle case where the role is referenced as a parent node
        console.log("Cannot delete parent nodes");
        notifications.show({
          withBorder: true,
          title: "Failed",
          message: "Cannot delete parent roles! Try to delete first its children!",
          autoClose: 5000,
          color: "red",
          icon: <RiErrorWarningLine />,
          withBorder: true,
          // style: { backgroundColor: 'green' },
          // onClose: () => setEditSuccessMessage(null),
        });
        setIsDeleteModalOpen(false);
      }
      //if successfull
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
    return <Loading />;
  }

  if (!role) {
    // Render a loading spinner or message until data is fetched
    return <Loading />;
  }

  //filter based on the search and filter values
  const filteredData = role.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) &&
      // || emp.role.toLowerCase().includes(search.toLowerCase())
      (filter === "" || emp.role === filter)
    // (filter === "" || (emp.role === filter && emp.salary >= filterSalary))
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pageData = filteredData.slice(startIndex, endIndex);

  const getNumEmployeesByRole = (role) => {
    return employee.filter((emp) => emp.role === role).length;
  };
  
  return (
    <div className="p-4">
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
        {/* <div>
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
        </div> */}
      </div>
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
        total={Math.ceil(filteredData.length / PAGE_SIZE)}
        style={{ marginTop: "20px" }}
        pages={Math.ceil(filteredData.length / PAGE_SIZE)}
        page={currentPage}
        onChange={handlePageChange}
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
