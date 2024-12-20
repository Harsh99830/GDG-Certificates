import React, { useState } from 'react';
import axios from 'axios';

const CertificateFetcher = () => {
  const [studentID, setStudentID] = useState('');
  const [error, setError] = useState('');

  const fetchCertificate = async () => {
    try {
      setError(''); // Clear previous errors
      const response = await axios.get('http://localhost:5000/api/certificates');
      const certificates = response.data;

      // Find the certificate matching the student ID
      const studentCertificate = certificates.find(cert => cert.public_id.includes(studentID));

      if (studentCertificate) {
        // Open the certificate URL in a new tab
        window.open(studentCertificate.url, '_blank');
      } else {
        setError('No certificate found for this ID.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch certificates. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Fetch Your Certificate</h1>
      <input
        type="text"
        placeholder="Enter your Student ID"
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}
      />
      <br />
      <button
        onClick={fetchCertificate}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Fetch Certificate
      </button>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
    </div>
  );
};

export default CertificateFetcher;
