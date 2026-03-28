import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Heart, User, LogOut, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const { user, profile, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Departments', path: '/departments' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Health Checkup', path: '/health-checkup' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-emerald-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-emerald-900">MediGreen</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-semibold hover:bg-emerald-100 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>{isAdmin ? "Admin Panel" : "Dashboard"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-emerald-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-emerald-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 p-4 space-y-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-gray-600 hover:text-emerald-600 font-medium"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <Link
                to={isAdmin ? "/admin" : "/dashboard"}
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-emerald-50 text-emerald-700 py-3 rounded-xl font-semibold"
              >
                {isAdmin ? "Admin Panel" : "Dashboard"}
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-center text-red-500 py-3 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center text-gray-600 py-3 font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-emerald-600 text-white py-3 rounded-xl font-semibold"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
