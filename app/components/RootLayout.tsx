import {
    Bell,
    LayoutDashboard,
    LineChart,
    Menu,
    Package,
    Plus,
    Search,
    Settings,
} from "lucide-react";
import { useState } from "react";
import { Avatar } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { Footer } from "./ui/Footer";
import { Header } from "./ui/Header";
import { Input } from "./ui/Input";
import { Sidebar } from "./ui/Sidebar";
import { Typography } from "./ui/Typography";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      label: "Produtos",
      href: "/products",
      icon: <Package className="h-4 w-4" />,
      subItems: [
        { label: "Listar", href: "/products" },
        { label: "Adicionar", href: "/products/new", icon: <Plus className="h-3.5 w-3.5" /> },
      ],
    },
    {
      label: "Relatórios",
      href: "/reports",
      icon: <LineChart className="h-4 w-4" />,
    },
    {
      label: "Configurações",
      href: "/settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header
        logo={
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center">
              <Typography variant="h6" className="text-white">L</Typography>
            </div>
            <Typography variant="subtitle1" className="font-medium tracking-tight">
              Logo
            </Typography>
          </div>
        }
        navigation={[]}
        actions={
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input 
                className="w-64 pl-10 py-1.5 bg-gray-50 dark:bg-gray-900 border-0 ring-1 ring-gray-200 dark:ring-gray-800" 
                placeholder="Buscar..."
              />
            </div>
            <Button 
              variant="secondary" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Button 
              variant="secondary"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar
              size="md"
              alt="John Doe"
              status="online"
            />
          </div>
        }
        className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-gray-100 dark:border-gray-900 bg-white/80 backdrop-blur-xl dark:bg-gray-950/80"
      />

      <div className="flex pt-16 min-h-screen">
        <Sidebar
          className={`fixed bottom-16 top-16 w-64 transform transition-all duration-300 ease-in-out border-r border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-950 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          items={sidebarItems}
          headerContent={
            <div className="px-4 py-1.5">
              <Typography variant="overline" color="secondary" className="font-medium">
                Workspace
              </Typography>
            </div>
          }
          footerContent={
            <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-100 dark:border-gray-900">
              <Avatar
                size="md"
                alt="John Doe"
                status="online"
                className="ring-2 ring-white dark:ring-gray-950"
              />
              <div className="min-w-0">
                <Typography variant="subtitle2" className="truncate">John Doe</Typography>
                <Typography variant="caption" color="secondary" className="truncate">
                  john.doe@company.com
                </Typography>
              </div>
            </div>
          }
        />

        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <main className="pb-16">
              <div className="py-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>

      <Footer
        className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-gray-100 dark:border-gray-900 bg-white/80 backdrop-blur-xl dark:bg-gray-950/80 flex justify-center items-center"
        navigation={[
          { label: "Sobre", href: "/about" },
          { label: "Termos", href: "/terms" },
          { label: "Privacidade", href: "/privacy" },
        ]}
      >
        <Typography variant="caption" color="secondary">
          © {new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.
        </Typography>
      </Footer>
    </div>
  );
} 