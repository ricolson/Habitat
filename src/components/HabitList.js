// src/HabitList.js
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function HabitList() {
  const [habits, setHabits] = useState([])

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
    </div>
  )
}