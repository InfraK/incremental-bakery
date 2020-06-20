/** @jsx jsx */
import { jsx, Box, Heading, Flex, Button } from 'theme-ui';
import { BreadMaker } from 'components/BreadMaker';
import { useAppContext } from 'context';

export const Bakery = () => {
  const { state } = useAppContext();

  return (
    <Box>
      <Heading as="h3">Hello and welcome to your new Bakery!</Heading>
      <p>
        This is were you will start making the loaves to sell on your store,
        firs you will need to make them by hand, later on you can hire bakers to
        do the job for you, as well as buy machines to accelerate the process.
      </p>
      <p>Why don't you give the loaf a couple of clicks</p>

      <Flex>
        <div>
          <span>Loaf Price : {state.loafPrice}</span>
          <BreadMaker />
        </div>
        <Flex sx={{ flexDirection: 'column' }}>
          <span>Production</span>
          <div>Bakers: 2</div>
          <Flex>
            <div>Oven: Bad</div>
            <Button>Upgrade $20</Button>
          </Flex>
          <div>Mixer: Bad</div>
          <br />
          <span>Quality</span>
          <div>Flour: Bad</div>
          <div>Yeast: Bad</div>
          <div>Salt: Bad</div>
        </Flex>
      </Flex>
    </Box>
  );
};
