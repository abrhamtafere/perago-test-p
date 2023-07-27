import { useState, useEffect } from 'react';
import axios from 'axios';

const AddRole = () => {
  const [roleName, setRoleName] = useState('');
  // const [description, setDescription] = useState('');
  const [parentRoles, setParentRoles] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);

  useEffect(() => {
    // Fetch parent roles from the server and set state
    axios.get('http://localhost:4000/roles')
      .then(response => {
        setParentRoles(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRole = { 
      id: parentRoles.length + 1,
      name: roleName,
      // description: description,
      hasAParent: true,
      parentId: selectedParentId,
      childrenId: [],
      numEmployees: 0
    };
    // Add new role to the server and reset form
    axios.post('http://localhost:4000/roles', newRole)
      .then(response => {
        console.log(response.data);
        setRoleName('');
        // setDescription('');
        setSelectedParentId(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleParentChange = (event) => {
    setSelectedParentId(Number(event.target.value));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Add a Role</h1>

        <div className="mb-4">
          <label htmlFor="roleName" className="block text-gray-700 font-bold mb-2">
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
          <label htmlFor="parentRole" className="block text-gray-700 font-bold mb-2">
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
            {parentRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

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