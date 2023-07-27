import React, { useState } from "react";
import axios from "axios";

const UpdateRole = ({ role, onUpdate }) => {
  const [name, setName] = useState(role.name);
  const [parentId, setParentId] = useState(role.parentId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedRole = { ...role, name, parentId };
    try {
      const response = await axios.put(
        `http://localhost:4000/roles/${role.id}`,
        updatedRole
      );
      onUpdate(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Role name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="parentId"
        >
          Parent ID
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="parentId"
          type="number"
          placeholder="Parent ID"
          value={parentId}
          onChange={(event) => setParentId(event.target.value)}
          required
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

export default UpdateRole;