"use client";

import { Collapsible } from "@app/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@app/components/ui/sidebar";
import { ROUTES } from "@app/config/routes";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useNavigate } from "@remix-run/react";
import { AlertOctagon, Languages } from "lucide-react";

export function NavResources() {
  const navigate = useNavigate();
  const items = [
    {
      title: "Toasts",
      url: ROUTES.app.root + "/resources/toasts",
      icon: AlertOctagon,
      isActive: false,
    },
    {
      title: "Traslation",
      url: ROUTES.app.root + "/resources/translation",
      icon: Languages,
      isActive: false,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Resources</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem
              onClick={() => {
                navigate(item.url);
              }}
            >
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  {item.title}
                </span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
