import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', identity: '', level: 1, energy: 1 });

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    const res = await axios.get('http://localhost:8000/habits');
    setHabits(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHabit = async () => {
    await axios.post('http://localhost:8000/habits', {
      id: Number(form.id),
      name: form.name,
      identity: form.identity,
      level: Number(form.level),
      energy: Number(form.energy)
    });
    fetchHabits();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Habit Tracker</h1>
      <div>
        <input name="id" placeholder="ID" value={form.id} onChange={handleChange} />
        <input name="name" placeholder="Habit Name" value={form.name} onChange={handleChange} />
        <input name="identity" placeholder="Identity" value={form.identity} onChange={handleChange} />
        <input name="level" type="number" placeholder="Level" value={form.level} onChange={handleChange} />
        <input name="energy" type="number" placeholder="Energy" value={form.energy} onChange={handleChange} />
        <button onClick={submitHabit}>Add Habit</button>
      </div>
      <ul>
        {habits.map(habit => (
          <li key={habit.id}>{habit.name} - Level {habit.level} - Energy {habit.energy}</li>
        ))}
      </ul>
    </div>
  );
}
