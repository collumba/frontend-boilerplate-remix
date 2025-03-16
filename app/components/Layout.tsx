import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/Avatar";
import { Button } from "@components/ui/Button";
import { Link } from "@remix-run/react";
import { Bell, ChevronDown, CogIcon, Globe, HomeIcon, ListIcon, Menu, SettingsIcon, UserIcon } from 'lucide-react';
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/DropdownMenu";

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

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out fixed inset-y-0 left-0 bg-secondary/10 shadow-lg border-r border-border`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Logo */}
          <div className="h-16 flex items-center justify-center border-b border-border bg-card">
            <Link to="/" className="text-xl font-bold text-primary hover:text-primary/90">
              {sidebarOpen ? 'Remix Boilerplate' : 'RB'}
            </Link>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
            {menuItems.map((item) => (
              <div key={item.name} className="px-4 py-1">
                <Link
                  to={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-foreground hover:bg-secondary/80 hover:text-secondary-foreground transition-colors group"
                >
                  {item.icon && <item.icon className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-secondary-foreground" />}
                  {sidebarOpen && (
                    <>
                      <span>{item.name}</span>
                      {item.submenu && <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-secondary-foreground" />}
                    </>
                  )}
                </Link>
                {sidebarOpen && item.submenu && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        to={subitem.href}
                        className="flex items-center px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-secondary-foreground transition-colors group"
                      >
                        {subitem.icon && <subitem.icon className="h-4 w-4 mr-2 group-hover:text-secondary-foreground" />}
                        <span>{subitem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-16 w-full rounded-none border-t border-border bg-card hover:bg-secondary/80"
          >
            <Menu className="h-6 w-6 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 ease-in-out flex flex-col min-h-screen`}>
        {/* Header */}
        <header className="h-16 bg-card border-b border-border fixed right-0 left-auto w-full z-40">
          <div className="h-full px-4 flex items-center justify-end space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <span>EN</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="hover:bg-secondary/80">English</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-secondary/80">Português</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-destructive ring-2 ring-background"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Avatar className="ring-2 ring-border">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">JD</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">John Doe</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <SettingsIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <button className="flex items-center w-full">Sign out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="pt-16 flex-grow pb-24 bg-background/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border fixed bottom-0 w-full z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">            
            <p className="text-center text-muted-foreground py-3">
              &copy; {new Date().getFullYear()} Remix Boilerplate. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
