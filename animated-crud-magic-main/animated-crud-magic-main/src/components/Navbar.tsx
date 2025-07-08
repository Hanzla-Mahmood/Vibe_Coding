
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Plus, Trash2, Edit, Eye, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Navbar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/insert', label: 'Insert', icon: Plus },
    { path: '/show', label: 'Show', icon: Eye },
    { path: '/update', label: 'Update', icon: Edit },
    { path: '/delete', label: 'Delete', icon: Trash2 },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-white text-xl font-bold">Student CRUD</h1>
            
            <div className="hidden md:flex space-x-4">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link key={path} to={path}>
                  <Button
                    variant={location.pathname === path ? "secondary" : "ghost"}
                    className={`text-white hover:bg-white/20 transition-all duration-200 ${
                      location.pathname === path ? 'bg-white/20' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-white hover:bg-white/20 transition-all duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
