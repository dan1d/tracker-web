import React from "react"
import { useSelector } from 'react-redux';
import AdminDashboard from "../../components/AdminDashboard";
import UserDashboard from "../../components/UserDashboard";

function Dashboard() {
  const user = useSelector(state => state.users.user);

  return user.role.kind === 'admin' ? <AdminDashboard /> : <UserDashboard />
}

export default Dashboard
