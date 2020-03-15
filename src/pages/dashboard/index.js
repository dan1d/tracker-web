import React from "react"
import { useSelector } from 'react-redux';
import AdminDashboard from "../../components/AdminDashboard";
import UserDashboard from "../../components/UserDashboard";

function Dashboard() {
  const { current_user } = useSelector(state => state.users);

  return current_user.role.kind === 'admin' ? <AdminDashboard /> : <UserDashboard />
}

export default Dashboard
