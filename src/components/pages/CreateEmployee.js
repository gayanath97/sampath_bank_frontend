import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";

function CreateEmployee() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert salary to float before sending
      const employeeData = {
        ...employee,
        salary: parseFloat(employee.salary),
      };
      await EmployeeService.createEmployee(employeeData);
      navigate("/employees");
    } catch (error) {
      console.error("Error creating employee:", error);
      // You might want to add error handling/display here
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create New Employee</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={employee.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={employee.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salary
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            className="form-control"
            id="salary"
            name="salary"
            value={employee.salary}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Create Employee
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEmployee;
