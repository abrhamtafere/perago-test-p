import { useState } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { FcExpand } from "react-icons/fc";
import { VscCircleLarge } from "react-icons/vsc";

export const RoleItem = ({ role, roles, selectedRole, toggleExpanded }) => {
  const childRoles = roles.filter((r) => r.parentId === role.id);
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    toggleExpanded(role);
    setExpanded(!expanded);
  };

  return (
    <div className="bg-gray-100">
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