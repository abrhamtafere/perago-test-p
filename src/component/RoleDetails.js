// import { useGetEmployeesQuery } from "../redux/api/apiSlice";
import { useGetEmployeesQuery } from "../redux/api/employeeApiSlice";
import { Loading } from "./Loading";


export const RoleDetails = ({ selectedRole }) => {
  const {
    data: employee,
    isLoading: isLoadingEmployee,
    refetch,
  } = useGetEmployeesQuery();
  // useEffect(() => {
  //   refetch();
  // }, []);
  if (isLoadingEmployee) {
    return <Loading />;
  }

  // const getNumEmployeesByRole = (role) => {
  //   return employee.filter((emp) => emp.role === role).length;
  // };

  const getEmployeesByRole = (role) => {
    return employee.filter((emp) => emp.role === role);
  };

  const filteredEmployees = selectedRole
    ? getEmployeesByRole(selectedRole.name)
    : [];
  console.log("filtered: ", filteredEmployees);
  console.log("em:", getEmployeesByRole(selectedRole.name));

  if (selectedRole) {
    return (
      <div className="flex flex-col justify-center border border-green-200p ring-2 ring-blue-200 ring-offset-2  ml-4 bg-white rounded-lg shadow-xl p-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          {selectedRole.name}
        </h3>
        <p className="text-gray-600 mt-2">
          <span className="text-gray-800 font-semibold">Role ID:</span>{" "}
          {selectedRole.id}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-800 font-semibold">
            Number of Employees:
          </span>{" "}
          {filteredEmployees.length}
        </p>

        <p className="mt-4 mb-2 text-gray-800 font-semibold">
          List of Employees:
        </p>
        {filteredEmployees.length > 0 ? (
          <ul className="list-disc pl-6 text-gray-800">
            {filteredEmployees.map((emp) => (
              <li key={emp.id} className="mb-1 ">
                {emp.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">
            No employees found for the
            {selectedRole ? selectedRole.name : "selected"} role.
          </p>
        )}
      </div>
    );
  }

  return null;
};