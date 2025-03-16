import { Link } from "@remix-run/react";
import { Bell, ChevronDown, CogIcon, Globe, HomeIcon, ListIcon, Menu, SettingsIcon, UserIcon } from 'lucide-react';
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  name: string;
  href: string;
  icon?: React.ComponentType<any>;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Todos",
    href: "/todos",
    icon: ListIcon,
  },
  {
    name: "Settings",
    href: "#",
    icon: SettingsIcon,
    submenu: [
      {
        name: "Profile",
        href: "/settings/profile",
        icon: UserIcon,
      },
      {
        name: "Preferences",
        href: "/settings/preferences",
        icon: CogIcon,
      },
    ],
  },
];

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-width duration-300 ease-in-out fixed inset-y-0 left-0 bg-white dark:bg-gray-800 shadow-lg`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Logo */}
          <div className="h-16 flex items-center justify-center">
            <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {sidebarOpen ? 'Remix Boilerplate' : 'RB'}
            </Link>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden">
            {menuItems.map((item) => (
              <div key={item.name} className="px-4 py-2">
                <Link
                  to={item.href}
                  className="flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                  {sidebarOpen && (
                    <>
                      <span>{item.name}</span>
                      {item.submenu && <ChevronDown className="h-4 w-4 ml-auto" />}
                    </>
                  )}
                </Link>
                {sidebarOpen && item.submenu && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        to={subitem.href}
                        className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-16 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-margin duration-300 ease-in-out flex flex-col min-h-screen`}>
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 shadow-sm fixed right-0 left-auto w-full z-10">
          <div className="h-full px-4 flex items-center justify-end space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <Globe className="h-6 w-6" />
                <span>EN</span>
              </button>
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 w-full text-left">English</button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 w-full text-left">Português</button>
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span>John Doe</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Settings</Link>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 w-full text-left">Sign out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="pt-16 flex-grow pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 shadow-lg fixed bottom-0 w-full z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">            
            <div className="border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-500 dark:text-gray-400 py-3">
                &copy; {new Date().getFullYear()} Remix Boilerplate. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
