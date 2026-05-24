import { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async () => {
    const res = await axios.post('/api/admin/login', { email: 'admin@heenatours.com', password: 'AdminPass123!' });
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
  };

  if (!token) return <button onClick={login}>Login</button>;

  return (
    <div className="p-8">
      <h1>Admin Dashboard</h1>
      {/* CRUD forms for tours, hotels, properties */}
      <form onSubmit={(e) => { e.preventDefault(); /* Add tour logic */ }}>
        <input name="name" placeholder="Tour Name" />
        <button type="submit">Add Tour</button>
      </form>
    </div>
  );
}

export default Dashboard;