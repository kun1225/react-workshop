'use client';

import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { Button } from '@/components/ui/button';

const MenuContext = createContext({
  isOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
  toggleMenu: () => {},
});

function MenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(
    () => setIsOpen((prev) => !prev),
    [],
  );

  return (
    <MenuContext.Provider
      value={{ isOpen, openMenu, closeMenu, toggleMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function useMenu() {
  const data = useContext(MenuContext);
  return data;
}

function MenuToggleButton() {
  const { toggleMenu } = useMenu();
  console.log('MenuToggleButton Re-Render');
  return (
    <Button onClick={toggleMenu} className="w-fit">
      toggle
    </Button>
  );
}

function Menu() {
  const { isOpen } = useMenu();
  console.log('Menu Re-render');
  return <div>{`Menu: ${isOpen}`}</div>;
}

export default function Page() {
  return (
    <MenuProvider>
      <MenuToggleButton />
      <Menu />
    </MenuProvider>
  );
}
