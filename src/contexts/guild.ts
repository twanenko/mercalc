import { createContext, useCallback, useState } from 'react';

type GuildContext = {
  prayed: string;
  updatePrayed: (prayed: string) => void;
};

const defaultContext: GuildContext = {
  prayed: '0%',
  updatePrayed: () => {},
};

export const guildContext = createContext<GuildContext>(defaultContext);

export const useGuild = (): GuildContext => {
  const [prayed, setPrayed] = useState(defaultContext.prayed);
  const updatePrayed = useCallback((current: string): void => {
    setPrayed(current);
  }, []);
  return { prayed, updatePrayed };
};
