import React, { createContext, useState, useContext, useEffect } from 'react';

interface AppState {
  money: number;
  loaves: number;
  maxLoaves: number;
  loafPrice: number;
  oven: number;
  progress: number;
  bakers: number;
  maxBakers: number;
  upgradeLevels: { [key in UpgradeNames]: number };
}

export const bakersConfig = {
  basePrice: 10,
  priceMult: 1.2,
  baseProd: 5,
};

export const quailityMap = ['Very Bad', 'Bad', 'Normal', 'Good', 'Very Good'];
export const maxLevel = quailityMap.length - 1;

type ProductUpgradeNames = 'oven' | 'mixer' | 'stretcher';
type QualityUpgradeNames = 'flour' | 'yeast' | 'salt';

type UpgradeNames = ProductUpgradeNames | QualityUpgradeNames;

export interface Upgrade {
  name: UpgradeNames;
  label: string;
  basePrice: number;
  priceMult: number;
  prodMultiplier: number;
  qualityMultiplier: number;
}

interface Upgrades {
  productivity: { [key in ProductUpgradeNames]: Upgrade };
  quality: { [key in QualityUpgradeNames]: Upgrade };
}

export const upgrades: Upgrades = {
  productivity: {
    mixer: {
      name: 'mixer',
      label: 'Mixer',
      basePrice: 20,
      priceMult: 1.2,
      prodMultiplier: 1.2,
      qualityMultiplier: 1,
    },
    oven: {
      name: 'oven',
      label: 'Oven',
      basePrice: 40,
      priceMult: 1.4,
      prodMultiplier: 1.4,
      qualityMultiplier: 1,
    },
    stretcher: {
      name: 'stretcher',
      label: 'Stretcher',
      basePrice: 60,
      priceMult: 1.5,
      prodMultiplier: 1.6,
      qualityMultiplier: 1,
    },
  },
  quality: {
    flour: {
      name: 'flour',
      label: 'Flour',
      basePrice: 30,
      priceMult: 1.5,
      prodMultiplier: 1,
      qualityMultiplier: 1.2,
    },
    salt: {
      name: 'salt',
      label: 'Salt',
      basePrice: 50,
      priceMult: 1.6,
      prodMultiplier: 1,
      qualityMultiplier: 1.4,
    },
    yeast: {
      name: 'yeast',
      label: 'Yeast',
      basePrice: 75,
      priceMult: 1.8,
      prodMultiplier: 1,
      qualityMultiplier: 1.6,
    },
  },
};

export const allUpgrades = { ...upgrades.productivity, ...upgrades.quality };

const initialState: AppState = {
  money: 0,
  loaves: 0,
  loafPrice: 2,
  maxLoaves: 10,
  oven: 1,
  progress: 0,
  bakers: 0,
  maxBakers: 5,
  upgradeLevels: {
    oven: 0,
    mixer: 0,
    stretcher: 0,
    flour: 0,
    salt: 0,
    yeast: 0,
  },
};

interface AppContext {
  state: AppState;
  actions: AppActions;
}

interface AppActions {
  addProgress: (amount: number) => void;
  sellAll: () => void;
  hireBaker: () => void;
  purchaseUpgrade: (name: UpgradeNames) => () => void;
}

export const AppContext = createContext({} as AppContext);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, setState] = useState<AppState>(initialState);

  useEffect(() => {
    const interval = setInterval(doTick, 200);
    return () => {
      clearInterval(interval);
    };
  }, [state.bakers, state.upgradeLevels]);

  const addProgress = (amount: number) => {
    setState((prev) => {
      const { progress: prevProgress, maxLoaves } = prev;
      const totalProgress = prevProgress + amount;
      const newLoaves = Math.floor(totalProgress / 100);
      const nextProgress = Math.floor(totalProgress % 100);
      const nextLoaves = prev.loaves + newLoaves;

      if (nextLoaves > maxLoaves) {
        return {
          ...prev,
          progress: Math.min(totalProgress, 100),
          loaves: maxLoaves,
        };
      }
      return {
        ...prev,
        progress: nextProgress,
        loaves: prev.loaves + newLoaves,
      };
    });
  };

  const sellAll = () => {
    setState((prev) => {
      const { loaves, loafPrice } = prev;
      return {
        ...prev,
        loaves: 0,
        money: prev.money + Math.floor(loaves * loafPrice),
      };
    });
  };

  const getTickProduction = () => {
    const { bakers, upgradeLevels } = state;
    const prodMult = Object.values(upgrades.productivity).reduce(
      (acc, curr) => {
        const level = upgradeLevels[curr.name];
        const prodMult = level * curr.prodMultiplier;
        return acc * prodMult || 1;
      },
      1,
    );
    return Math.floor(bakers * bakersConfig.baseProd * prodMult);
  };

  const hireBaker = () => {
    const { bakers, maxBakers } = state;
    if (bakers >= maxBakers) return;
    const bakerCost = getCost(
      bakersConfig.basePrice,
      bakersConfig.priceMult,
      bakers,
    );
    setState((prev) => ({
      ...prev,
      money: prev.money - bakerCost,
      bakers: prev.bakers + 1,
    }));
  };

  const doTick = () => {
    const production = getTickProduction();
    addProgress(production);
  };

  const purchaseUpgrade = (name: UpgradeNames) => () => {
    setState((prev) => {
      const upgrade = allUpgrades[name];
      const { upgradeLevels, money } = prev;
      const level = upgradeLevels[name];
      if (level >= maxLevel) {
        return prev;
      }

      const cost = getCost(upgrade.basePrice, upgrade.priceMult, level);
      if (cost > money) {
        return prev;
      }

      return {
        ...prev,
        upgradeLevels: {
          ...upgradeLevels,
          [name]: level + 1,
        },
        money: Math.floor(money - cost),
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        actions: { addProgress, sellAll, hireBaker, purchaseUpgrade },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export const getCost = (base: number, rate: number, level: number) =>
  base * Math.pow(rate, level);
