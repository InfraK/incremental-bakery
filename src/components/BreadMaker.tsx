/** @jsx jsx */
import { jsx, Flex, Progress } from 'theme-ui';
import { ReactComponent as Bread } from 'assets/bread.svg';
import { useAppContext } from 'context';

export const BreadMaker = () => {
  const { state, actions } = useAppContext();

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        width: '25rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Bread
        sx={{
          height: '15rem',
          width: '15rem',
          '&:hover': {
            transform: `scale(1.02)`,
          },
          '&:active': {
            transform: `scale(0.98)`,
          },
        }}
        onClick={() => actions.addProgress(10)}
      />
      <Progress value={state.progress / 100} sx={{ height: '1rem' }} />
    </Flex>
  );
};
