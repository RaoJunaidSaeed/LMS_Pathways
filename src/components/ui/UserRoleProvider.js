'use client';

import { useUser } from '@clerk/nextjs';
import { UserRoleContextProvider } from '@/utils/context/UserRoleContext.js';

export default function UserRoleProvider({ children }) {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || null;

  let dashboardUrl = '/';
  if (role === 'student') dashboardUrl = '/student';
  if (role === 'teacher') dashboardUrl = '/teacher';

  const contextValue = {
    role,
    dashboardUrl,
  };

  return <UserRoleContextProvider value={contextValue}>{children}</UserRoleContextProvider>;
}
