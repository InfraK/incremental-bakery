/** @jsx jsx */
import { jsx, Box, Flex, Heading, Text } from 'theme-ui';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Sidebar } from 'components/Sidebar';
import { Bakery } from 'screens/Bakery';
import { Store } from 'screens/Store';
import { useAppContext } from 'context';
import { formatMoney } from 'utils/formatMoney';

export const App = () => {
  const { state } = useAppContext();
  return (
    <Router>
      <div
        sx={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 4fr',
          gridTemplateRows: 'auto auto',
          gap: 2,
          gridTemplateAreas: `"header header"
                            "sidebar content"`,
        }}
      >
        <Flex
          sx={{
            gridArea: 'header',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            p: 3,
            border: 0,
            borderRadius: 0,
          }}
        >
          <Heading sx={{ color: 'primary', fontSize: 4 }}>Moon Bakery</Heading>
          <Text>Money {formatMoney(state.money)}</Text>
          <Text>
            Loaves {state.loaves}/{state.maxLoaves}
          </Text>
        </Flex>
        <Sidebar />

        <Box sx={{ gridArea: 'content', borderRadius: 0, border: 0, p: 3 }}>
          <Switch>
            <Route exact path="/">
              <Bakery />
            </Route>
            <Route exact path="/store">
              <Store />
            </Route>
          </Switch>
        </Box>
      </div>
    </Router>
  );
};
