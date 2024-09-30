"use client"
import { useState } from 'react';


const BudgetSetting = () => {
  // State to manage user-defined budgets
  const [userBudget, setUserBudget] = useState({
    groceries: 300,
    rent: 1200,
    utilities: 150,
    entertainment: 100,
    transportation: 80,
  });

  // AI-generated budgets (dummy data)
  const aiBudget = {
    groceries: 280,
    rent: 1150,
    utilities: 160,
    entertainment: 90,
    transportation: 100,
  };

  const handleBudgetChange = (category, value) => {
    setUserBudget({
      ...userBudget,
      [category]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real-world scenario, this would be sent to your backend or AI model
    console.log('User Budget:', userBudget);
    alert('Budget saved successfully!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Set Your Budget</h1>
      <p>Adjust your monthly budget for each category, or see what the AI recommends for you.</p>

      <form onSubmit={handleSubmit}>
        {Object.keys(userBudget).map((category) => (
          <div key={category} style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {category.charAt(0).toUpperCase() + category.slice(1)} Budget: ${userBudget[category]} (AI Suggests: ${aiBudget[category]})
            </label>
            <br />
            <input
              type="range"
              min="50"
              max="2000"
              step="10"
              value={userBudget[category]}
              onChange={(e) => handleBudgetChange(category, e.target.value)}
              style={{ width: '100%' }}
            />
            <div style={{ fontSize: '14px', color: '#888' }}>
              AI Recommended Budget: <strong>${aiBudget[category]}</strong>
            </div>
          </div>
        ))}

        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Save Budget
        </button>
      </form>

      <div style={{ marginTop: '40px' }}>
        <h2>AI-Generated Budget Summary</h2>
        <ul>
          {Object.keys(aiBudget).map((category) => (
            <li key={category}>
              <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong> ${aiBudget[category]} (Your Budget: ${userBudget[category]})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetSetting;
