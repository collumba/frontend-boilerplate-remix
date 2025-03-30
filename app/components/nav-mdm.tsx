"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@app/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@app/components/ui/sidebar";
import { ENTITY_CONFIG } from "@app/config/mdm";
import { ROUTES } from "@app/config/routes";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
// {
//   items,
// }: {
//   items: {
//     title: string;
//     url: string;
//     icon?: LucideIcon;
//     isActive?: boolean;
//     items?: {
//       title: string;
//       url: string;
//     }[];
//   }[];
// }

export function NavMdm() {
  const { t } = useTranslation();

  const items = Object.entries(ENTITY_CONFIG).map(([key, item]) => ({
    title: t(`entities.${key}.name`),
    url: ROUTES.app.mdm.list(key),
    icon: item.icon,
    isActive: false,
    items: [
      {
        title: t(`common.action.list`),
        url: ROUTES.app.mdm.list(key),
      },
      {
        title: t(`common.action.create`),
        url: ROUTES.app.mdm.create(key),
      },
    ],
  }));

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {t("component.sidebar.registers.title")}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
