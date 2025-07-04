'use client';

import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { Button } from '@/components/ui/button';

const MenuDataContext = createContext({
  isOpen: false,
});

const MenuApiContext = createContext({
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

  const api = useMemo(
    () => ({ openMenu, closeMenu, toggleMenu }),
    [closeMenu, openMenu, toggleMenu],
  );

  return (
    <MenuDataContext.Provider value={{ isOpen }}>
      <MenuApiContext.Provider value={api}>
        {children}
      </MenuApiContext.Provider>
    </MenuDataContext.Provider>
  );
}

function useMenuData() {
  const data = useContext(MenuDataContext);
  return data;
}

function useMenuApi() {
  const api = useContext(MenuApiContext);
  return api;
}

function MenuToggleButton() {
  const { toggleMenu } = useMenuApi();
  console.log('MenuToggleButton Re-render');
  return (
    <Button onClick={toggleMenu} className="w-fit">
      toggle
    </Button>
  );
}

function Menu() {
  const { isOpen } = useMenuData();
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
