import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/api/employees';

class EmployeeService {
    // Create a new employee
    async createEmployee(employeeData) {
        try {
            const response = await axios.post(BASE_URL, employeeData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get all employees with pagination and sorting
    async getAllEmployees(page = 0, size = 10, sort = 'id', direction = 'ASC') {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    page,
                    size,
                    sort,
                    direction
                }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get employee by ID
    async getEmployeeById(id) {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Update employee
    async updateEmployee(id, employeeData) {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, employeeData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Delete employee
    async deleteEmployee(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Error handler
    handleError(error) {
        if (error.response) {
            // Server responded with error
            const message = error.response.data?.message || 'An error occurred';
            const status = error.response.status;
            return new Error(`${status}: ${message}`);
        }
        if (error.request) {
            // Request made but no response
            return new Error('No response from server');
        }
        // Something else went wrong
        return new Error('Error setting up request');
    }
}

export default new EmployeeService(); 