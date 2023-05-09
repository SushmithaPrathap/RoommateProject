// import { useState , useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./index.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Todolist from "./pages/todolist/Todolist";
import Dashboard from "./pages/dashboard/Dashboard";
import ChoreChart from "./pages/choreChart/ChoreChart";
import Login from "./pages/login/Login";
import ExpenseTracker from "./pages/expenseTracker/ExpenseTracker";
import { apiAuth } from "./api";
import PrivateRoute from "./components/privateRoute/privateRoute";
import Register from "./pages/register/register";
import NewUserFlow from "./pages/house/NewUserFlow";
import CreateHouse from "./pages/house/createHouse";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
import AllUser from "./pages/dashboard/AllUser";
import Annoucement from "./pages/dashboard/Announcement";

function App() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   // Checking if user is not loggedIn
  //   if (!apiAuth.getAuth) {
  //     navigate("/login");
  //   }

  // }, [navigate, apiAuth.getAuth]);
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/chorechart" element={<ChoreChart />} />{" "}
      <Route path="/todolist" element={<Todolist />} />
      <Route path="/expensetracker" element={<ExpenseTracker />} />
      {/* <Route path="/dashboard" element={<PrivateRoute><NewUserFlow /></PrivateRoute>} /> */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route
        path="/dashboard/new"
        element={
          <PrivateRoute>
            <CreateHouse />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/shopping" element={<ShoppingList />} />
      <Route path="/members" element={<AllUser />} />
      <Route path="/announcements" element={<Annoucement />} />
    </Routes>
  );
}

export default App;
