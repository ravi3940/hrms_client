import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem('token');
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchUserProfile();
  } else {
    setLoading(false);
  }
}, []);

  // const fetchUserProfile = async () => {
  //   try {
  //     const  token  =  localStorage.getItem("token")
  //     const response = await axios.get('http://localhost:5000/api/auth/profile',{
  //       headers: {
  //         Authorization: `Bearer ${token}`   // ✅ FIXED
  //       }
  //     });
  //     setUser(response.data);
  //   } catch (error) {
  //     console.error('Failed to fetch user profile:', error);
  //     localStorage.removeItem('token');
  //     delete axios.defaults.headers.common['Authorization'];
  //   } finally {
  //     setLoading(false);
  //   }
  // };


const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get('http://localhost:5000/api/auth/profile',{
        headers :{
          Authorization: `Bearer ${token}`
        }
    });
    setUser(response.data);
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    localStorage.removeItem('token');
  } finally {
    setLoading(false);
  }
};


  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);

    return user; // VERY IMPORTANT
  };

  const register = async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const hasRole = (requiredRole) => {
    if (!user) return false;
    return user.role === requiredRole || user.role === 'ADMIN';
  };

  const value = {
    user,
    login,
    register,
    logout,
    hasRole,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};