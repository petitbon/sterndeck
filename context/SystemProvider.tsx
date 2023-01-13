'use client';

import { createContext, useContext } from 'react';

const SystemContext = createContext<{
  fontSize: 'small' | 'medium' | 'large';
}>({
  fontSize: 'medium',
});

export function useSystem() {
  return useContext(SystemContext);
}

export function SystemProvider({ children, fontSize }: { children: React.ReactNode; fontSize: 'small' | 'medium' | 'large' }) {
  return <SystemContext.Provider value={{ fontSize }}>{children}</SystemContext.Provider>;
}
