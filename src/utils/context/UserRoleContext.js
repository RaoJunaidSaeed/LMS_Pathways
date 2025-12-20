'use client';

import { createContext, useContext } from 'react';

const UserRoleContext = createContext({
  role: null,
  dashboardUrl: '/',
});

export function UserRoleContextProvider({ children, value }) {
  return <UserRoleContext.Provider value={value}>{children}</UserRoleContext.Provider>;
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
}
