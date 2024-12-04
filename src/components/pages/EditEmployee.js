import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';
import styles from './EditEmployee.module.css';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    hireDate: '',
    jobTitle: '',
    department: '',
    salary: ''
  });

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const data = await EmployeeService.getEmployeeById(id);
      setEmployee(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await EmployeeService.updateEmployee(id, employee);
      navigate('/employees');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className={styles.loadingMessage}>Loading...</div>;
  if (error) return <div className={styles.errorMessage}>Error: {error}</div>;

  return (
    <div className={styles.editEmployeeContainer}>
      <h2 className={styles.title}>Edit Employee</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>First Name:</label>
          <input
            className={styles.input}
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Last Name:</label>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.submitButton} type="submit">
            Update Employee
          </button>
          <button 
            className={styles.cancelButton} 
            type="button" 
            onClick={() => navigate('/employees')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee; 