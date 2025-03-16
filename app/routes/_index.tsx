import { RootLayout } from "@components/RootLayout";
import { Avatar } from "@components/ui/Avatar";
import { Button } from "@components/ui/Button";
import { Typography } from "@components/ui/Typography";
import type { MetaFunction } from "@remix-run/node";
import { LineChart, Package, Plus, Settings, Users, UserSearch } from "lucide-react";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Boilerplate" },
    {
      name: "description",
      content:
        "Um boilerplate para aplicações web frontend com Remix.run e TypeScript",
    },
  ];
};

export default function Index() {
  const { t } = useTranslation();
  
  return (
    <RootLayout>
      <div className="space-y-8">
        <div>
          <Typography variant="h4" className="mb-2">
            {t('dashboard.welcome')}
          </Typography>
          <Typography variant="body1" color="secondary">
            {t('dashboard.description')}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-950">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary-50 dark:bg-primary-950 flex items-center justify-center">
                <Users   className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <Typography variant="h6">1,234</Typography>
                <Typography variant="body2" color="secondary">Total Users</Typography>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-950">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-success-50 dark:bg-success-950 flex items-center justify-center">
                <LineChart className="h-6 w-6 text-success-600 dark:text-success-400" />
              </div>
              <div>
                <Typography variant="h6">$12,345</Typography>
                <Typography variant="body2" color="secondary">Revenue</Typography>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-950">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-warning-50 dark:bg-warning-950 flex items-center justify-center">
                <Package className="h-6 w-6 text-warning-600 dark:text-warning-400" />
              </div>
              <div>
                <Typography variant="h6">567</Typography>
                <Typography variant="body2" color="secondary">Products</Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-950">
            <Typography variant="h6" className="mb-4">Recent Activity</Typography>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <Avatar size="md" alt={`User ${item}`} />
                  <div>
                    <Typography variant="subtitle2">User updated their profile</Typography>
                    <Typography variant="caption" color="secondary">2 hours ago</Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-lg border border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-950">
            <Typography variant="h6" className="mb-4">Quick Actions</Typography>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="primary" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                New Product
              </Button>
              <Button variant="secondary" className="w-full">
                <UserSearch className="h-4 w-4 mr-2" />
                Find Users
              </Button>
              <Button variant="secondary" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="secondary" className="w-full">
                <LineChart className="h-4 w-4 mr-2" />
                Reports
              </Button>
            </div>
          </div>
        </div>
      </div>
        </RootLayout>
  );
}
