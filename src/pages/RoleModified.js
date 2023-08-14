import React, { useState, useEffect } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { FcExpand } from "react-icons/fc";
import { VscCircleLarge } from "react-icons/vsc";
import { useGetEmployeesQuery, useGetRolesQuery } from "../redux/apiSlice";
import { Loading } from "../component/Loading";

const RoleItem = ({ role, roles, selectedRole, toggleExpanded }) => {
  const childRoles = roles.filter((r) => r.parentId === role.id);
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    toggleExpanded(role);
    setExpanded(!expanded);
  };

  return (
    <div>
      <button
        className={`flex items-center cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md p-2 ${
          expanded ? "bg-blue-200" : ""
        }`}
        onClick={handleToggle}
      >
        <span className="mr-2">
          {childRoles.length > 0 ? (
            expanded ? (
              <FcExpand />
            ) : (
              <BsChevronRight />
            )
          ) : (
            <VscCircleLarge />
          )}
        </span>
        <span className="font-bold">{role.name}</span>
      </button>
      {expanded && childRoles.length > 0 && (
        <div className="ml-4">
          {childRoles.map((childRole) => (
            <RoleItem
              key={childRole.id}
              role={childRole}
              roles={roles}
              selectedRole={selectedRole}
              toggleExpanded={toggleExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const RoleDetails = ({ selectedRole }) => {
  const {
    data: employee,
    isLoading: isLoadingEmployee,
    refetch,
  } = useGetEmployeesQuery();
  // useEffect(() => {
  //   refetch();
  // }, []);
  // if (isLoadingEmployee) {
  //   return <h1>Loading</h1>;
  // }

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
              <li key={emp.id} className="mb-1">
                {emp.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">
            No employees found for the{" "}
            {selectedRole ? selectedRole.name : "selected"} role.
          </p>
        )}
      </div>
    );
  }

  return null;
};

const FolderStructure = () => {
  const { data: Roles, isLoading: isLoadingRole, refetch } = useGetRolesQuery();
  const [selectedRole, setSelectedRole] = useState(null);

  const toggleExpanded = (role) => {
    if (selectedRole === role) {
      setSelectedRole(null);
    } else {
      setSelectedRole(role);
    }
  };

  if (isLoadingRole) {
    return <Loading />;
  }

  const rootRoles = Roles.filter((role) => !role.hasAParent);

  return (
    <div className="p-4 bg-gray-100 min-h-[91vh]">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 shadow-md font-serif tracking-wide">
        Role Structure of Perago Systems
      </h1>
      <h2 className="flex-inline font-semi-bold ">
        <span className="bg-gray-400 rounded-lg p-1 ">{Roles.length}</span>{" "}
        total roles
      </h2>
      <div className="flex">
        <div className="sm:w-1/2 md:w-2/5 h-[80vh] overflow-y-auto pb-16 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {rootRoles.map((role) => (
            <RoleItem
              key={role.id}
              role={role}
              roles={Roles}
              selectedRole={selectedRole}
              toggleExpanded={toggleExpanded}
            />
          ))}
        </div>
        <div className="w-1/2">
          {selectedRole && <RoleDetails selectedRole={selectedRole} />}
        </div>
      </div>
    </div>
  );
};

export default FolderStructure;
