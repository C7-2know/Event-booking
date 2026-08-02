import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default function AppLayout() { 
    const { pathname } = useLocation(); 
    const isAdmin = pathname.startsWith('/admin');
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className={`min-h-[72vh] ${isAdmin ? '' : 'max-w-7xl mx-auto px-8'}`}><Outlet /></main>
            {!pathname.startsWith('/admin') && <Footer />}
        </div> 
    )
}
