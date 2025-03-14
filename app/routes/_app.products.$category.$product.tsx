import { Breadcrumbs } from "@components/ui/Breadcrumbs";
import { ChevronRight, Home } from "lucide-react";

export default function ProductPage() {
  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-4 w-4" />,
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Electronics",
      href: "/products/electronics",
    },
    {
      label: "Smartphones",
      href: "/products/electronics/smartphones",
    },
    {
      label: "iPhone 15 Pro",
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={breadcrumbItems}
        separator={<ChevronRight className="h-4 w-4" />}
        maxItems={4}
        itemClassName="hover:text-primary-600 transition-colors"
        activeItemClassName="text-primary-900 font-semibold"
        separatorClassName="text-gray-400"
      />

      {/* Rest of your product page content */}
      <h1 className="text-2xl font-bold">iPhone 15 Pro</h1>
      {/* ... */}
    </div>
  );
}
