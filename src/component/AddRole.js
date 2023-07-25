import { useState } from 'react';

const AddRole = () => {
  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
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

        <div className="mb-4">
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