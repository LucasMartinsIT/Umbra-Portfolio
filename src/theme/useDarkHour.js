import { createContext, useContext } from 'react';

export const DarkHourContext = createContext({ active: false, toggle: () => {} });

export function useDarkHour() {
  return useContext(DarkHourContext);
}
