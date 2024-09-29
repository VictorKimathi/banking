"use client"

// pages/ai-tuning.js
import { useState } from 'react';

const AiTuning = () => {
  // Define state for each category and priority
  const [priorities, setPriorities] = useState({
    groceries: 3,
    rent: 5,
    utilities: 4,
    entertainment: 2,
    transportation: 3,
  });

  const handlePriorityChange = (category, value) => {
    setPriorities({
      ...priorities,
      [category]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send priority data to backend for AI tuning (dummy example)
    console.log('Tuning AI with the following priorities:', priorities);
    alert('AI priorities updated!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Tune Your AI Transaction Priorities</h1>
      <p>Adjust the sliders below to prioritize different transaction categories for your AI.</p>

      <form onSubmit={handleSubmit}>
        {Object.keys(priorities).map((category) => (
          <div key={category} style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {category.charAt(0).toUpperCase() + category.slice(1)}: {priorities[category]}
            </label>
            <br />
            <input
              type="range"
              min="1"
              max="5"
              value={priorities[category]}
              onChange={(e) => handlePriorityChange(category, e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
        ))}

        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Save Priorities
        </button>
      </form>
    </div>
  );
};

export default AiTuning;
