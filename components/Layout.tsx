
import React from 'react';
import { ViewState } from '../types';
import { Icons } from '../constants';
import { authService } from '../authService';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  const user = authService.getUser();
  const isAdmin = user?.role === 'Admin';

  const handleLogout = async () => {
    await authService.logout();
    window.location.reload();
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
    { id: 'library', label: 'Library', icon: Icons.Library },
    { id: 'notes', label: 'My Notes', icon: Icons.Notes },
    { id: 'production', label: 'Daily Production & Dispatch Register', icon: Icons.Mining },
    { id: 'returns', label: 'Monthly Return', icon: Icons.Analytics },
    { id: 'compliance', label: 'Statutory Compliance', icon: Icons.BriefcaseIcon },
    { id: 'royalty', label: 'Royalty Calculator', icon: Icons.Calculator },
    { id: 'ratings', label: 'Star Rating - Minor Mineral', icon: Icons.Star },
    { id: 'star', label: 'Star Rating -Major Mineral ', icon: Icons.Star },
    { id: 'consultancy', label: 'Expert's Assistance', icon: Icons.Consultancy },
    { id: 'profile', label: 'Profile', icon: Icons.Profile },
  ] as const;

  const adminItems = [
    { id: 'admin', label: 'Admin Panel', icon: Icons.Admin },
    { id: 'minerals', label: 'Minerals', icon: Icons.Calculator },
  ] as const;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="flex flex-col h-full">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">MMLE</div>
              Mines and Minerals Laws Ecosystem
            </h1>
          </div>
          
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeView === item.id
                    ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon />
                {item.label}
              </button>
            ))}
            {isAdmin && (
              <>
                <div className="py-2"><div className="border-t border-gray-200"></div></div>
                {adminItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      activeView === item.id
                        ? 'bg-purple-50 text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon />
                    {item.label}
                  </button>
                ))}
              </>
            )}
          </nav>

          <div className="p-4 border-t border-gray-100 space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
              <img 
                src="https://picsum.photos/seed/user/100/100" 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border border-gray-200" 
              />
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-semibold truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.role || ''}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 transition-all duration-300">
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200 md:hidden">
            <h1 className="text-xl font-bold text-indigo-600">CreatorNexus</h1>
            <button className="p-2 text-gray-600"><Icons.Dashboard /></button>
        </header>
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
