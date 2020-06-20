/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import { SidebarLink } from './SidebarLink';

export const Sidebar = () => {
  return (
    <Flex
      as="nav"
      sx={{
        gridArea: 'sidebar',
        flexDirection: 'column',
        alignItems: 'center',
        a: {
          width: '100%',
        },
        border: 0,
        borderRadius: 0,
        overflow: 'hidden',
      }}
    >
      <SidebarLink to="/">Factory</SidebarLink>
      <SidebarLink to="/store">Store</SidebarLink>
    </Flex>
  );
};
