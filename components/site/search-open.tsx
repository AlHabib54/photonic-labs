'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';

const Ctx = createContext<{ open: boolean; setOpen: (o: boolean) => void }>({
  open: false,
  setOpen: () => {},
});

export function SearchOpenProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const setter = useCallback((o: boolean) => setOpen(o), []);
  return <Ctx.Provider value={{ open, setOpen: setter }}>{children}</Ctx.Provider>;
}

export const useSearchOpen = () => useContext(Ctx);
