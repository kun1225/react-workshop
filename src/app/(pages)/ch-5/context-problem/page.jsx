'use client';

import { createContext, useContext, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <MenuProvider>
      <MenuButton />
    </MenuProvider>
  );
}

const MenuContext = createContext({
  isOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
  toggleMenu: () => {},
});

function MenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <MenuContext.Provider
      value={{ isOpen, openMenu, closeMenu, toggleMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function MenuButton() {
  const { toggleMenu } = useContext(MenuContext);

  console.log('MenuButton rendered');

  return <Button onClick={toggleMenu}>Toggle Menu</Button>;
}
