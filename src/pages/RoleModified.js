import React, { useState, useEffect } from 'react';
import {  BsChevronDown, BsChevronRight } from 'react-icons/bs';
import {  FcExpand } from 'react-icons/fc';
import {  VscCircleLarge } from 'react-icons/vsc';
import { useGetEmployeesQuery, useGetRolesQuery } from '../redux/apiSlice';
import { Loading } from '../component/Loading';
const RoleItem = ({ role, roles }) => {
  const childRoles = roles.filter((r) => r.parentId === role.id);
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <button
        className="flex items-center cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md p-2"
        onClick={toggleExpanded}
      >
        <span className="mr-2">{childRoles.length > 0 ? expanded ? <FcExpand /> : <BsChevronRight /> : <VscCircleLarge/>}</span>
        <span className="font-bold">{role.name}</span>
      </button>
      {expanded && childRoles.length > 0 && (
        <div className="ml-4">
          {childRoles.map((childRole) => (
            <RoleItem key={childRole.id} role={childRole} roles={roles} />
          ))}
        </div> 
      )}
    </div>
  );
};

const FolderStructure = () => {
  // const Roles = data;
  const { data:Roles, isLoading:isLoadingRole, refetch } = useGetRolesQuery();

  useEffect(()=>{
    refetch()
  }, [])

  if(isLoadingRole){
    return <Loading />
  }

  const rootRoles = Roles.filter((role) => !role.hasAParent);

  return (
    <div className="p-4 bg-gray-100 min-h-[91vh]">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 shadow-md font-serif tracking-wide">Role Structure of Perago Systems</h1>
      <h2 className='flex-inline font-semi-bold '><span className='bg-gray-400 rounded-lg p-1 '>{Roles.length}</span> total roles</h2>
      {rootRoles.map((role) => (
        <RoleItem key={role.id} role={role} roles={Roles} />
      ))}
    </div>
  );
};

export default FolderStructure;     