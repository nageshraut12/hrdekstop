import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('hrUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem('hrUsers') || '[]');
    
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    // Check if employee ID already exists
    if (users.some(u => u.employeeId === userData.employeeId)) {
      throw new Error('Employee ID already exists');
    }

    users.push(userData);
    localStorage.setItem('hrUsers', JSON.stringify(users));
    localStorage.setItem('hrUser', JSON.stringify(userData));
    setUser(userData);
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('hrUsers') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    localStorage.setItem('hrUser', JSON.stringify(foundUser));
    setUser(foundUser);
  };

  const logout = () => {
    localStorage.removeItem('hrUser');
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    const updated = { ...user, ...updatedData };
    const users = JSON.parse(localStorage.getItem('hrUsers') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
      users[userIndex] = updated;
      localStorage.setItem('hrUsers', JSON.stringify(users));
    }
    localStorage.setItem('hrUser', JSON.stringify(updated));
    setUser(updated);
  };

  const resetPassword = (email, newPassword) => {
    const users = JSON.parse(localStorage.getItem('hrUsers') || '[]');
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    users[userIndex].password = newPassword;
    localStorage.setItem('hrUsers', JSON.stringify(users));
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateProfile, resetPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
