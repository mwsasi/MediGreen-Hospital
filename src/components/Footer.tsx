import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-emerald-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-emerald-600 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MediGreen</span>
            </Link>
            <p className="text-emerald-300 text-sm leading-relaxed">
              Providing world-class healthcare with a focus on sustainability and patient well-being. Your health is our priority.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-emerald-300 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Departments</Link></li>
              <li><Link to="/doctors" className="hover:text-white transition-colors">Doctors</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Patient Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Departments</h3>
            <ul className="space-y-4 text-emerald-300 text-sm">
              <li><Link to="/departments" className="hover:text-white transition-colors">Cardiology</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Neurology</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Pediatrics</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Orthopedics</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-emerald-300 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>123 Medical Drive, Health City, HC 45678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>+1 (555) 000-1234</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>contact@medigreen.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-emerald-900 text-center text-emerald-400 text-xs">
          <p>© {new Date().getFullYear()} MediGreen Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
