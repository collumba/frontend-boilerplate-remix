import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Footer } from "@components/ui/Footer";
import { Header } from "@components/ui/header";
import { Input } from "@components/ui/input";
import { LocaleToggle } from "@components/ui/locale-toggle";
import { Sidebar } from "@components/ui/sidebar";
import { ThemeToggle } from "@components/ui/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Typography } from "@components/ui/Typography";
import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: RootLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header
        logo={
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/70 flex items-center justify-center">
              <Typography variant="h6" className="text-primary-foreground">
                L
              </Typography>
            </div>
            <Typography
              variant="subtitle1"
              className="font-medium tracking-tight"
            >
              Logo
            </Typography>
          </div>
        }
        actions={
          <div className="flex items-center gap-2 mr-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="w-64 pl-10 py-1.5 bg-muted/70 border-0 ring-1 ring-border"
                placeholder="Buscar..."
              />
            </div>
            <Button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-accent"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Button className="p-2 hover:bg-accent">
              <Bell className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <LocaleToggle />
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-3 px-4 py-3 ">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 relative hidden md:block">
                    <Typography variant="subtitle2" className="truncate">
                      Morty Smithd
                    </Typography>
                    <Typography
                      variant="caption"
                      color="secondary"
                      className="truncate"
                    >
                      john.doe@company.com
                    </Typography>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <Typography variant="caption" color="secondary">
                  Morty Smith
                </Typography>
              </TooltipContent>
            </Tooltip>
          </div>
        }
        className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-xl"
      />

      <div className="flex pt-16 min-h-screen">
        <Sidebar
          className={`fixed bottom-16 top-16 w-64 transform transition-all duration-300 ease-in-out border-r border-border bg-background ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          items={[]}
          headerContent={
            <div className="px-4 py-1.5">
              <Typography
                variant="overline"
                color="secondary"
                className="font-medium"
              >
                Workspace
              </Typography>
            </div>
          }
        />
        <div
          className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <main className="pb-16">
              <div className="py-8">{children}</div>
            </main>
          </div>
        </div>
      </div>
      <Footer className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-border bg-background/80 backdrop-blur-xl flex justify-center items-center">
        <Typography variant="caption" color="secondary">
          © {new Date().getFullYear()} Sua Empresa. Todos os direitos
          reservados.
        </Typography>
      </Footer>
    </div>
  );
}
