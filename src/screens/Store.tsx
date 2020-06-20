/** @jsx jsx */
import { jsx, Box, Heading, Button } from 'theme-ui';

export const Store = () => {
  return (
    <Box>
      <Heading as="h3">Welcome to your Bakery Store Front!</Heading>
      <p>
        This is were you will be selling the loaves you make, at first, you will
        have to sell them yourself to people willing to buy it. Later on you can
        hire people to manage your store front and sell your loaves for you, as
        well as improve your marketing
      </p>
      <Button variant="primary">Sell Loave</Button>
    </Box>
  );
};
