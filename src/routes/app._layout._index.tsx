import { ROUTES } from '@shared/config/routes';

export const handle = {
  breadcrumb: {
    label: 'route.app.dashboard',
    href: ROUTES.app.root,
  },
};
export default function AppIndex() {
  return <div>Dashboard</div>;
}
