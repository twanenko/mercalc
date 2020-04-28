import { createContext, useCallback, useState } from 'react';

type TimerContext = {
  timer: string;
  updateTimer: (time: string) => void;
};

const defaultContext: TimerContext = {
  timer: '',
  updateTimer: () => {},
};

export const timerContext = createContext<TimerContext>(defaultContext);

export const useTimer = (): TimerContext => {
  const [timer, setTimer] = useState(defaultContext.timer);
  const updateTimer = useCallback((current: string): void => {
    setTimer(current);
  }, []);
  return { timer, updateTimer };
};
