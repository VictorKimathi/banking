"use client"
// pages/goals.js

import { useState } from 'react';

const Goals = () => {
  // State to manage the user's goals and AI recommendations
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [recommendations, setRecommendations] = useState({});

  const handleAddGoal = (e) => {
    e.preventDefault();

    if (!newGoal.trim()) {
      alert('Please enter a goal!');
      return;
    }

    // Add the new goal to the list
    setGoals([...goals, newGoal]);

    // Generate a dummy AI recommendation for the goal
    const aiRecommendation = `To achieve the goal of "${newGoal}", the AI recommends saving an additional $200 per month or cutting back on entertainment expenses.`;

    // Update recommendations
    setRecommendations({
      ...recommendations,
      [newGoal]: aiRecommendation,
    });

    // Clear the input field
    setNewGoal('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Set Your Financial Goals</h1>

      {/* Form to add new goals */}
      <form onSubmit={handleAddGoal}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Add a New Goal:</label>
          <br />
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="e.g., Save for a vacation"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '10px',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Add Goal
        </button>
      </form>

      {/* Display the list of goals and AI recommendations */}
      {goals.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2>Your Goals and AI Recommendations</h2>
          <ul>
            {goals.map((goal, index) => (
              <li key={index} style={{ marginBottom: '20px' }}>
                <strong>{goal}</strong>
                <br />
                <span style={{ fontSize: '14px', color: '#555' }}>
                  {recommendations[goal]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Goals;
