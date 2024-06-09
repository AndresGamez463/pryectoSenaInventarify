import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/ServicioUser';

const ListaUser = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ fullname: '', username: '', password_hash: '', secretpin: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreate = async () => {
    await createUser(newUser);
    loadUsers();
    setNewUser({ fullname: '', username: '', password_hash: '', secretpin: '' });
  };

  const handleUpdate = async (id) => {
    const user = users.find(usr => usr.id === id);
    await updateUser(id, user);
    loadUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  const handleUserChange = (id, field, value) => {
    const updatedUsers = users.map(usr => 
      usr.id === id ? { ...usr, [field]: value } : usr
    );
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h2>Users</h2>
      <div>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={newUser.fullname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password_hash"
          placeholder="Password"
          value={newUser.password_hash}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="secretpin"
          placeholder="Secret Pin"
          value={newUser.secretpin}
          onChange={handleInputChange}
        />
        <button onClick={handleCreate}>Add User</button>
      </div>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <input
              type="text"
              value={user.fullname}
              onChange={(e) => handleUserChange(user.id, 'fullname', e.target.value)}
            />
            <input
              type="text"
              value={user.username}
              onChange={(e) => handleUserChange(user.id, 'username', e.target.value)}
            />
            <input
              type="password"
              value={user.password_hash}
              onChange={(e) => handleUserChange(user.id, 'password_hash', e.target.value)}
            />
            <input
              type="number"
              value={user.secretpin}
              onChange={(e) => handleUserChange(user.id, 'secretpin', e.target.value)}
            />
            <button onClick={() => handleUpdate(user.id)}>Update</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaUser;
