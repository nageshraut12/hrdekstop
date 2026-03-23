import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load users from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('hr_users');
    const storedUser = localStorage.getItem('hr_current_user');
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('hr_users', JSON.stringify(users));
    }
  }, [users]);

  // Save current user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('hr_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hr_current_user');
    }
  }, [user]);

  const signup = (formData) => {
    // Check if user already exists
    const userExists = users.some(u => u.email === formData.email);
    if (userExists) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      employeeId: formData.employeeId,
      employeeIdCardImage: formData.employeeIdCardImage,
      password: formData.password,
      gender: formData.gender,
      joiningDate: formData.joiningDate,
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, newUser]);
    setUser(newUser);
    return { success: true, message: 'Account created successfully' };
  };

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      return { success: false, message: 'Invalid email or password' };
    }

    setUser(foundUser);
    return { success: true, message: 'Logged in successfully' };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    
    setUsers(users.map(u => 
      u.id === user.id ? updatedUser : u
    ));
    
    return { success: true, message: 'Profile updated successfully' };
  };

  const value = {
    user,
    users,
    loading,
    signup,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
