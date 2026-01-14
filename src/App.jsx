import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
// import Profile from "./pages/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Homepage from "./pages/Auth/Homepage";
import Tables from "./pages/tables";
import { useState, useEffect } from "react";

export default function App() {
  // undefined 表示还没加载 localStorage
  const [user, setUser] = useState(undefined);

  // 读取 localStorage 初始化 user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log('storedUser', storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // localStorage 还没加载完成时显示 Loading
  if (user === undefined) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={login} />} />
        <Route path="/register" element={<Register setUser={login} />} />
        <Route path="/Homepage" element={<Homepage />} />

        <Route
          path="/"
          element={user ? <Layout logout={logout} /> : <Navigate to="/login" replace />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tables" element={<Tables />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
