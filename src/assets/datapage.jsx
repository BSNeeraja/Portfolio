import React, { useEffect, useState } from 'react';

function Records() {
  const [people, setPeople] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedPeople = localStorage.getItem('people');
    if (savedPeople) {
      setPeople(JSON.parse(savedPeople));
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <header>
        <h1>Records</h1>
      </header>
      {people.length > 0 ? (
        <table border="1" style={{ margin: '20px auto', borderCollapse: 'collapse', width: '80%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr key={index}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records available. Please add details in the Forms Page.</p>
      )}
    </div>
  );
}

export default Records;
