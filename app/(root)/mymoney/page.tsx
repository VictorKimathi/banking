"use client"
// pages/spending.js
import { useState } from 'react';

const Spending = () => {
  // State to manage spending for each category
  const [spending, setSpending] = useState({
    groceries: 0,
    rent: 0,
    utilities: 0,
    entertainment: 0,
    transportation: 0,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input change for each category
  const handleInputChange = (category, value) => {
    setSpending({
      ...spending,
      [category]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Spending updated!');
    // You could also send this data to a backend or store it in localStorage
    console.log('Updated Spending:', spending);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Manage Your Spending</h1>
      <p>Input your spending for each category below. You can always update it later.</p>

      {/* Form to input and update spending */}
      <form onSubmit={handleSubmit}>
        {Object.keys(spending).map((category) => (
          <div key={category} style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {category.charAt(0).toUpperCase() + category.slice(1)}:
            </label>
            <br />
            <input
              type="number"
              min="0"
              value={spending[category]}
              onChange={(e) => handleInputChange(category, e.target.value)}
              placeholder={`Enter spending for ${category}`}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '10px',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />
          </div>
        ))}

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          {isEditing ? 'Update Spending' : 'Submit Spending'}
        </button>
      </form>

      <div style={{ marginTop: '40px' }}>
        <h2>Your Current Spending</h2>
        <ul>
          {Object.keys(spending).map((category) => (
            <li key={category}>
              <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong> ${spending[category]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Spending;
