// src/HabitList.js
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function HabitList() {
  const [habits, setHabits] = useState([])
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');

  useEffect(() => {
    async function fetchHabits() {
      const { data, error } = await supabase
        .from('Habits')
        .select('*')
      console.log('data:', data, 'error:', error)
      if (error) {
        console.error('Supabase error:', error)
      } else {
        setHabits(data)
      }
    }
    fetchHabits()
  }, [])

  return (
    <div>
      <h2>Your Habits</h2>
      <ul>
        {habits.map(habit => (
          <li key={habit.id}>{habit.name}</li>
        ))}
      </ul>
      <button type='button' onClick={() => setShowAddForm(true)}>
        Add Habit
      </button>
      {showAddForm && (
        <div>
          <input
            type="text"
            placeholder='Enter habit name'
            value={newHabitName}
            onChange={e => setNewHabitName(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              console.log("Habit to add:", newHabitName);
              // Call to Supabase
              setNewHabitName(""); // Clear the field
              setShowAddForm(false); // Hide the form
            }}
          >
            Submit
          </button>
          {/* Add input form here */}
          <button 
            onClick={() => {
              setShowAddForm(false);
              setNewHabitName(""); // clear field on cancel
            }}
          >
            Cancel
          </button>
        </div>
      )}

    </div>
  )
}