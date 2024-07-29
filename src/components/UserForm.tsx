import React, { useState } from 'react';
import axios from 'axios';

interface User {
  id?: number;
  name: string;
  email: string;
}

const UserForm: React.FC = () => {
  const [user, setUser] = useState<User>({ name: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('/api/users', user)
      .then(response => {
        console.log('User created:', response.data);
        setUser({ name: '', email: '' });
      })
      .catch(error => console.error('Error creating user:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={user.name} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;
