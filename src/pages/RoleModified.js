import React, { useState, useEffect } from "react";

import { useGetRolesQuery } from "../redux/api/apiSlice";
import { Loading } from "../component/Loading";
import { RoleItem } from "../component/RoleItem";
import { RoleDetails } from "../component/RoleDetails";

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
// backend pagination, filter 
  return (
    <div className="p-4 bg-gray-100 min-h-[91vh]">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 shadow-md font-serif tracking-wide">
        Role Structure of Perago Systems
      </h1>
      <h2 className="flex-inline font-semi-bold ">
        <span className="bg-gray-400 rounded-lg p-1 ">{Roles.length}</span>{" "}
        total roles
      </h2>
      <div className="flex" style={{backgroundImage: "url('./images/perago.png')", backgroundRepeat: 'no-repeat', backgroundSize: '100% 90%'}}>
        <div className="sm:w-1/2 md:w-2/5 h-[80vh] overflow-y-auto pb-16 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 ">
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
