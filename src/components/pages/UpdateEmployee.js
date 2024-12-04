import React from 'react';
import { useParams } from 'react-router-dom';

function UpdateEmployee() {
  const { id } = useParams();
  
  return (
    <div className="container mt-4">
      <h2>Update Employee</h2>
      {/* Add employee update form here */}
    </div>
  );
}

export default UpdateEmployee; 