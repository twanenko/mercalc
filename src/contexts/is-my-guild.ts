import { createContext, useCallback, useState } from 'react';

type MyGuildContext = {
  myGuild: string;
  updateMyGuild: (guild: string) => void;
};

const defaultContext: MyGuildContext = {
  myGuild: '',
  updateMyGuild: () => {},
};

export const myGuildContext = createContext<MyGuildContext>(defaultContext);

export const useMyGuild = (): MyGuildContext => {
  const [myGuild, setMyGuild] = useState(defaultContext.myGuild);
  const updateMyGuild = useCallback((current: string): void => {
    setMyGuild(current);
  }, []);
  return { myGuild, updateMyGuild };
};
