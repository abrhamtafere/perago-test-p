import { useState, useEffect } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { RiCheckboxCircleLine } from 'react-icons/ri'
import { useNavigate } from "react-router-dom";

const AddRole = () => {
    //to redirect a page
    const navigate = useNavigate();

  const [roleName, setRoleName] = useState("");
  // const [description, setDescription] = useState('');
  const [parentRoles, setParentRoles] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch parent roles from the server and set state
    axios
      .get("http://localhost:4000/roles")
      .then((response) => {
        setParentRoles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!roleName) {
      setSuccessMessage("");
      setErrorMessage("Role name cannot be empty.");
      return;
    }

    if (!selectedParentId) {
      setSuccessMessage("");
      setErrorMessage("Please select a parent role.");
      return;
    }

    const newRole = {
      id: parentRoles[parentRoles.length-1].id + 1,
      name: roleName,
      // description: description,
      hasAParent: true,
      parentId: selectedParentId,
      childrenId: [],
      numEmployees: 0,
    };
    // Add new role to the server and reset form
    axios
      .post("http://localhost:4000/roles", newRole)
      .then((response) => {
        console.log(response.data);
        setRoleName("");
        // setDescription('');
        setSelectedParentId(null);
        // setSuccessMessage("Role added successfully.");
        notifications.show({
          title: "Success",
          message: "Role added successfully.",
          autoClose: 5000,
          color: "green",
          icon: <RiCheckboxCircleLine />,
          withBorder: true,
          // style: { backgroundColor: 'green' },
          // onClose: () => setEditSuccessMessage(null),
        });
        setErrorMessage("");
      })
      .catch((error) => {
        console.error(error);
        setSuccessMessage("");
        setErrorMessage("Error adding role.");
      });
      //redirect
      // window.location.href = "/role";
      navigate("/role");
       
  };

  const handleParentChange = (event) => {
    setSelectedParentId(Number(event.target.value));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-4">Add a Role</h1>

        <div className="mb-4">
          <label
            htmlFor="roleName"
            className="block text-gray-700 font-bold mb-2"
          >
            Role Name
          </label>
          <input
            type="text"
            name="roleName"
            id="roleName"
            value={roleName}
            onChange={(event) => setRoleName(event.target.value)}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div>

        {/* <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div> */}

        <div className="mb-4">
          <label
            htmlFor="parentRole"
            className="block text-gray-700 font-bold mb-2"
          >
            Parent Role
          </label>
          <select
            name="parentRole"
            id="parentRole"
            value={selectedParentId}
            onChange={handleParentChange}
            className="w-full border border-gray-400 p-2 rounded-md"
          >
            <option value="">Select a parent role</option>
            {parentRoles.filter(role => role.name.toLowerCase() !== roleName.toLowerCase()).map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {successMessage && (
          <div className="text-green-700 font-bold mb-2">{successMessage}</div>
        )}

        {errorMessage && (
          <div className="text-red-700 font-bold mb-2">{errorMessage}</div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-medium transition duration-300"
          >
            Add Role
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRole;
