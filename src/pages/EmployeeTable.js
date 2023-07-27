import React, { useEffect, useState } from 'react';
import { Table, Pagination, Text, Avatar, Button, Modal, Alert } from '@mantine/core';
import axios from 'axios';

const PAGE_SIZE = 5; // number of items to display per page

const data2 = [
  {
    "id": 1,
    "name": "John Doe",
    "role": "CEO",
    "salary": 150000,
    "managerId": null,
    "photo": "https://www.corporatephotographylondon.com/wp-content/uploads/2019/11/HKstrategies-1210-1024x683.jpg"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "role": "CTO",
    "salary": 120000,
    "managerId": 1,
    "photo": "https://media.licdn.com/dms/image/D4E03AQHHAPjjL6pQ1Q/profile-displayphoto-shrink_800_800/0/1673899223410?e=2147483647&v=beta&t=K7Zi4sQQswzpmtm8EOvpu7IzbmY7R0Neht3QoHxWzSk"
  },
  {
    "id": 3,
    "name": "Bob Johnson",
    "role": "Project Manager",
    "salary": 100000,
    "managerId": 2,
    "photo": "https://example.com/photos/bob_johnson.jpg"
  },
  {
    "id": 4,
    "name": "Alice Lee",
    "role": "Product Owner",
    "salary": 90000,
    "managerId": 3,
    "photo": "https://example.com/photos/alice_lee.jpg"
  },
  {
    "id": 5,
    "name": "Tom Wang",
    "role": "Tech Lead",
    "salary": 90000,
    "managerId": 4,
    "photo": "https://example.com/photos/tom_wang.jpg"
  },
  {
    "id": 6,
    "name": "Maggie Chen",
    "role": "Frontend Developer",
    "salary": 70000,
    "managerId": 5,
    "photo": "https://example.com/photos/maggie_chen.jpg"
  },
  {
    "id": 7,
    "name": "Samuel Kim",
    "role": "Backend Developer",
    "salary": 70000,
    "managerId": 5,
    "photo": "https://example.com/photos/samuel_kim.jpg"
  },
  {
    "id": 8,
    "name": "Emily Davis",
    "role": "QA Engineer",
    "salary": 60000,
    "managerId": 5,
    "photo": "https://example.com/photos/emily_davis.jpg"
  },
  {
    "id": 9,
    "name": "Rachel Park",
    "role": "Scrum Master",
    "salary": 80000,
    "managerId": 4,
    "photo": "https://example.com/photos/rachel_park.jpg"
  },
  {
    "id": 10,
    "name": "Mike Wilson",
    "role": "Frontend Developer",
    "salary": 70000,
    "managerId": 5,
    "photo": "https://example.com/photos/mike_wilson.jpg"
  },
  {
    "id": 11,
    "name": "David Brown",
    "role": "CFO",
    "salary": 120000,
    "managerId": 1,
    "photo": "https://example.com/photos/david_brown.jpg"
  },
  {
    "id": 12,
    "name": "Julie Davis",
    "role": "Chef Accountant",
    "salary": 80000,
    "managerId": 11,
    "photo": "https://example.com/photos/julie_davis.jpg"
  },
  {
    "id": 13,
    "name": "Chris Kim",
    "role": "Financial Analyst",
    "salary": 70000,
    "managerId": 12,
    "photo": "https://example.com/photos/chris_kim.jpg"
  },
  {
    "id": 14,
    "name": "Erica Chen",
    "role": "DevOps Engineer",
    "salary": 70000,
    "managerId": 5,
    "photo": "https://example.com/photos/erica_chen.jpg"
  },
  {
    "id": 15,
    "name": "Kevin Lee",
    "role": "Account and Payable",
    "salary": 70000,
    "managerId": 12,
    "photo": "https://example.com/photos/kevin_lee.jpg"
  },
  {
    "id": 16,
    "name": "Jason Wu",
    "role": "Other Backend Roles",
    "salary": 70000,
    "managerId": 5,
    "photo": "https://example.com/photos/jason_wu.jpg"
  },
  {
    "id": 17,
    "name": "Cindy Liu",
    "role": "Other Frontend Roles",
    "salary": 70000,
    "managerId": 5,
    "photo": "https://example.com/photos/cindy_liu.jpg"
  },
  {
    "id": 18,
    "name": "Alex Kim",
    "role": "Other DevOps Roles",
    "salary": 70000,
    "managerId": 5,
    "photo": "https://example.com/photos/alex_kim.jpg"
  },
  {
    "id": 19,
    "name": "Sophie Kim",
    "role": "Other QA Roles",
    "salary": 70000,
    "managerId": 5,
    "photo": "https://example.com/photos/sophie_kim.jpg"
  },
  {
    "id": 20,
    "name": "George Lee",
    "role": "COO",
    "salary": 130000,
    "managerId": 1,
    "photo": "https://example.com/photos/george_lee.jpg"
  },
  {
    "id": 21,
    "name": "Amy Huang",
    "role": "Product Manager",
    "salary": 100000,
    "managerId": 20,
    "photo": "https://example.com/photos/amy_huang.jpg"
  },
  {
    "id": 22,
    "name": "Matt Kim",
    "role": "Operation Manager",
    "salary": 90000,
    "managerId": 20,
    "photo": "https://example.com/photos/matt_kim.jpg"
  },
  {
    "id": 23,
    "name": "Olivia Kim",
    "role": "Customer Relation",
    "salary": 80000,
    "managerId": 21,
    "photo": "https://example.com/photos/olivia_kim.jpg"
  }
];// employee data

const EmployeeTable = ({ onEdit, onDelete }) => {
  
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/employees");
        setData(response.data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); 
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  
  if (!data) {
    console.log('loading')
    // Render a loading spinner or message until data is fetched
    return <div>Loading...</div>
  }
  
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentPageData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  
  
  const handleEdit = (employee) => {
    onEdit && onEdit(employee);
  };

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete && onDelete(selectedEmployee);
    setIsDeleteSuccess(true);
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
    setTimeout(() => {
      setIsDeleteSuccess(false);
    }, 3000); // hide success message after 3 seconds
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="container mx-auto">
      {isDeleteSuccess && (
        <Alert
          color="green"
          title="Employee deleted successfully."
          onClose={() => setIsDeleteSuccess(false)}
          style={{ marginBottom: '1rem' }}
        />
      )}
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Manager Id</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>{item.salary}</td>
              <td>{item.managerId}</td>
              <td>
                <Avatar
                  src={item.photo}
                  alt={item.name}
                  size="md"
                  radius="lg"
                  // style={{ margin: '0 auto' }}
                />
              </td>
              <td>
                <Button onClick={() => handleEdit(item)} variant="outline">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(item)} variant="outline" color="red" style={{ marginLeft: '0.5rem' }}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        // total={data.length}
        total={totalPages}
        style={{ marginTop: '1rem' }}
        pages={totalPages}
        value={currentPage}
        onChange={setCurrentPage}
        styles={(theme) => ({
          control: {
            '&[data-active]': {
              backgroundImage: theme.fn.gradient({ from: 'red', to: 'yellow' }),
              border: 0,
            },
          },
        })}
      />
      <Modal
        opened={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        size="sm"
        title="Confirm Delete"
        hideCloseButton
        padding="sm"
        zIndex={10000}
      >
        <Text variant="body1">
          Are you sure you want to delete {selectedEmployee && selectedEmployee.name}?
        </Text>
        <Button onClick={handleDeleteConfirm} color="red" variant="outline" style={{ marginTop: 10 }}>
          Delete
        </Button>
        <Button onClick={handleDeleteCancel} variant="outline" style={{ marginTop: 10, marginLeft: 10 }}>
          Cancel
        </Button>
      </Modal>
    </div>
  );
};

export default EmployeeTable;