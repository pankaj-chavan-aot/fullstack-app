import { useEffect, useState } from 'react';
import { getTasks } from '../api/auth';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then(res => setTasks(res.data))
      .catch(err => {
        if (err.response?.status === 401) {
          alert('Not authorized – login required');
        }
      });
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map(t => <li key={t.id}>{t.title}</li>)}
      </ul>
    </div>
  );
}
