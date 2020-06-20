/** @jsx jsx */
import { jsx, NavLink } from 'theme-ui';
import { Link, useLocation } from 'react-router-dom';

export interface SidebarLinkProps {
  to: string;
  children: React.ReactNode
}

export const SidebarLink = ({ to, children }: SidebarLinkProps) => {
  const { pathname } = useLocation();
  return (
    <Link to={to}>
      <NavLink variant={pathname === to ? 'active' : 'nav'}>{children}</NavLink>
    </Link>
  );
};
