import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function ProtectedRoute({ adminOnly=false }) {
    const { user } = useAuth(); 
    return !user ? <Navigate to="/login" replace /> : adminOnly && user.role !== 'admin' ? <Navigate to="/" replace /> : <Outlet /> 
}
