// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./components/Layout";
// import Dashboard from "./pages/Dashboard";
// import Settings from "./pages/Settings";
// // import Profile from "./pages/Profile";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import Testingpage from "./pages/Testingpage";
// // import Testingpage from "./pages/Testingpage";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import Tables from "./pages/tables";
// import { useState, useEffect } from "react";

// export default function App() {
//   // undefined 表示还没加载 localStorage
//   const [user, setUser] = useState(undefined);

//   // 读取 localStorage 初始化 user
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     console.log('storedUser', storedUser);
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       setUser(null);
//     }
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   // localStorage 还没加载完成时显示 Loading
//   if (user === undefined) return <div>Loading...</div>;

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login setUser={login} />} />
//         <Route path="/register" element={<Register setUser={login} />} />

//         <Route
//           path="/"
//           element={user ? <Layout logout={logout} /> : <Navigate to="/login" replace />}>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/Testingpage" element={<Testingpage />} />
//           <Route path="/tables" element={<Tables />} />
//         </Route>

//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Loading from "./components/Loading";

// 🔥 Lazy Load Pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Testingpage = lazy(() => import("./pages/Testingpage"));
const Tables = lazy(() => import("./pages/tables"));
const InterviewTracker = lazy(() => import("./pages/InterviewTracker"));
const Savings = lazy(() => import("./pages/Savings"));
const Expenses = lazy(() => import("./pages/Expenses"));
const TypeSpeed = lazy(() => import("./pages/Typespeed"));
const Flashcards = lazy(() => import("./pages/Flashcards"));
const AboutProduct = lazy(() => import("./pages/AboutProduct"));
const Components = lazy(() => import("./pages/componentPage"));
const StickOnScroll = lazy(() => import("./pages/StickOnScroll")); 
const InterviewStats = lazy(() => import("./pages/interviewStats"));

export default function App() {
  return (    
    <BrowserRouter>
      {/* 🔥 Suspense 必须包住 Routes */}
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/stickOnScroll" element={<StickOnScroll />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="Testingpage" element={<Testingpage />} />
            <Route path="AboutProduct" element={<AboutProduct />} />
            <Route path="Expenses" element={<Expenses />} />
            <Route path="InterviewTracker" element={<InterviewTracker />} />
            <Route path="Savings" element={<Savings />} />
            <Route path="TypeSpeed" element={<TypeSpeed />} />
            <Route path="Flashcards" element={<Flashcards />} />
            <Route path="tables" element={<Tables />} />
            <Route path="Components" element={<Components />} />
            <Route path="interviewStats" element={<InterviewStats />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
