import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import "./EmployeeTable.css";
import { useNavigate } from "react-router-dom";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([
    {
      id: 0,
      firstName: "No",
      lastName: "Employees",
      email: "no.employees@example.com",
      phoneNumber: "N/A",
      hireDate: new Date().toISOString().split("T")[0],
      jobTitle: "No Data Available",
      department: "N/A",
      salary: 0,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("ASC");
  const [editLoading, setEditLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, sortField, sortDirection]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await EmployeeService.getAllEmployees(
        currentPage,
        pageSize,
        sortField,
        sortDirection
      );
      console.log(data);
      setEmployees(data.content);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    setSortDirection(
      sortField === field && sortDirection === "ASC" ? "DESC" : "ASC"
    );
    setSortField(field);
  };

  const handleEdit = async (id) => {
    try {
      setEditLoading(true);
      navigate(`/employees/edit/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await EmployeeService.deleteEmployee(id);
        fetchEmployees();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID {sortField === "id" && (sortDirection === "ASC" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("firstName")}>
              First Name{" "}
              {sortField === "firstName" &&
                (sortDirection === "ASC" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("lastName")}>
              Last Name{" "}
              {sortField === "lastName" &&
                (sortDirection === "ASC" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("email")}>
              Email{" "}
              {sortField === "email" && (sortDirection === "ASC" ? "↑" : "↓")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button 
                  onClick={() => handleEdit(employee.id)} 
                  disabled={editLoading}
                >
                  {editLoading ? 'Loading...' : 'Edit'}
                </button>
                <button onClick={() => handleDelete(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={employees.length < pageSize}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
