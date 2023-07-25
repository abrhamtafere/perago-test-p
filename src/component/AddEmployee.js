import { useState } from 'react';

const roles = [
  {
    id: '1',
    name: 'Manager',
    description: 'Manages the department',
    parentId: null,
    employees: [],
  },
  {
    id: '2',
    name: 'Developer',
    description: 'Develops software applications',
    parentId: null,
    employees: [],
  },
  {
    id: '3',
    name: 'Designer',
    description: 'Designs user interfaces',
    parentId: null,
    employees: [],
  },
];

const AddEmployee = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [roleName, setRoleName] = useState('');
  const [photo, setPhoto] = useState(null); // <-- added state for photo

  const handleSubmit = (event) => {
    event.preventDefault();
    const role = roles.find((role) => role.name === roleName);
    const employee = {
      id: Math.random().toString(36).substring(7),
      fullName,
      email,
      phone,
      gender,
      birthDate,
      hireDate,
      roleId: role.id,
      photo, // <-- added photo to employee object
      role,
    };
    console.log(employee);
    // TODO: Handle form submission
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Add an Employee</h1>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              className="w-full border border-gray-400 p-2 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="birthDate" className="block text-gray-700 font-bold mb-2">
              Birth Date
            </label>
            <input
              type="date"
              name="birthDate"
              id="birthDate"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="hireDate" className="block text-gray-700 font-bold mb-2">
              Hire Date
            </label>
            <input
              type="date"
              name="hireDate"
              id="hireDate              "
              value={hireDate}
              onChange={(event) => setHireDate(event.target.value)}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="roleName" className="block text-gray-700 font-bold mb-2">
              Role Name
            </label>
            <select
              name="roleName"
              id="roleName"
              value={roleName}
              onChange={(event) => setRoleName(event.target.value)}
              className="w-full border border-gray-400 p-2 rounded-md"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">
              Photo
            </label>
            <div className="flex items-center">
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <label
                htmlFor="photo"
                className="cursor-pointer bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-lg font-medium transition duration-300"
              >
                Select Photo
              </label>
              {photo && <span className="ml-2">{photo.name}</span>}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-medium transition duration-300 w-full"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;