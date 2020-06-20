/** @jsx jsx */
import { jsx, Box, Heading, Flex, Button, Text } from 'theme-ui';
import { BreadMaker } from 'components/BreadMaker';
import {
  useAppContext,
  upgrades,
  Upgrade,
  bakersConfig,
  getCost,
  quailityMap,
  maxLevel,
} from 'context';
import { formatMoney } from 'utils/formatMoney';

export const Bakery = () => {
  const { state, actions } = useAppContext();

  const bakerCost = getCost(
    bakersConfig.basePrice,
    bakersConfig.priceMult,
    state.bakers,
  );

  return (
    <Box>
      <Heading as="h3">Hello and welcome to your new Bakery!</Heading>
      <p>
        This is were you will start making the loaves to sell on your store,
        firs you will need to make them by hand, later on you can hire bakers to
        do the job for you, as well as buy machines to accelerate the process.
      </p>
      <p>Why don't you give the loaf a couple of clicks</p>

      <Flex sx={{ justifyContent: 'space-between' }}>
        <BreadMaker />
        <Flex sx={{ flexDirection: 'column', ml: 1, width: '200px' }}>
          <Flex sx={{ flexDirection: 'column' }}>
            <Text variant="sectionHeader">Loaves</Text>
            <Text>
              Stock: {state.loaves}/{state.maxLoaves}
            </Text>
            <Text>Price: {formatMoney(state.loafPrice)}</Text>
            <Button onClick={actions.sellAll} disabled={!state.loaves}>
              Sell All
            </Button>
          </Flex>
          <Flex sx={{ flexDirection: 'column' }}>
            <Text variant="sectionHeader">Bakers</Text>
            <Text>
              Hired: {state.bakers}/{state.maxBakers}
            </Text>
            <Button
              disabled={
                state.money < bakerCost || state.bakers >= state.maxBakers
              }
              onClick={actions.hireBaker}
            >
              Hire {formatMoney(bakerCost)}
            </Button>
          </Flex>
        </Flex>
        <Flex sx={{ flexDirection: 'column', mr: 1, width: '200px' }}>
          <Text variant="sectionHeader">Production</Text>
          {Object.values(upgrades.productivity).map((upgrade) => (
            <UpgradableItem upgrade={upgrade} key={upgrade.name} />
          ))}
          <Text variant="sectionHeader">Quality</Text>
          {Object.values(upgrades.quality).map((upgrade) => (
            <UpgradableItem upgrade={upgrade} key={upgrade.name} />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

interface UpgradableItem {
  upgrade: Upgrade;
}

const UpgradableItem = ({ upgrade }: UpgradableItem) => {
  const { state, actions } = useAppContext();
  const level = state.upgradeLevels[upgrade.name];
  const price = getCost(upgrade.basePrice, upgrade.priceMult, level);

  return (
    <Flex
      sx={{
        width: '200px',
        justifyContent: 'space-between',
        marginBottom: '8px',
      }}
    >
      <span>
        <strong>{upgrade.label}</strong>: {quailityMap[level]}
      </span>
      {level === maxLevel ? (
        'MAX LEVEL'
      ) : (
        <Button
          variant="upgrade"
          disabled={state.money < price || level > maxLevel}
          onClick={actions.purchaseUpgrade(upgrade.name)}
        >
          {level ? 'upgrade' : 'buy'} {formatMoney(price)}
        </Button>
      )}
    </Flex>
  );
};
