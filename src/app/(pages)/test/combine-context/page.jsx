'use client';
import React, { createContext, useContext, useState } from 'react';

// 建立三個 context
const CounterContext = createContext();
const ThemeContext = createContext();
const UserContext = createContext();

// Counter Provider
function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  return <CounterContext.Provider value={{ count, setCount }}>{children}</CounterContext.Provider>;
}

// Theme Provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

// User Provider
function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'Guest' });
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

function combineComponents(...components) {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) =>
      ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      },
    ({ children }) => <>{children}</>,
  );
}

// 合併多個 Provider
const providers = [CounterProvider, ThemeProvider, UserProvider];
const ContextProviders = combineComponents(...providers);

// 另一種方式
function CombineProviders({ children, providers }) {
  return providers.reduce((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
}

function MainApp() {
  const { count, setCount } = useContext(CounterContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="space-y-4">
      <div>
        <h2>Counter: {count}</h2>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
      </div>

      <div>
        <h2>Theme: {theme}</h2>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
      </div>

      <div>
        <h2>User: {user.name}</h2>
        <button onClick={() => setUser({ name: user.name === 'Guest' ? 'Admin' : 'Guest' })}>
          Toggle User
        </button>
      </div>
    </div>
  );
}

// export default function Page() {
//   return (
//     <ContextProviders>
//       <MainApp />
//     </ContextProviders>
//   );
// }

export default function Page() {
  return (
    <CombineProviders providers={providers}>
      <MainApp />
    </CombineProviders>
  );
}
