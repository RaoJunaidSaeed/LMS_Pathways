import { auth } from '@clerk/nextjs/server';
import { UserRoleContextProvider } from '@/utils/context/UserRoleContext.js';

export default async function UserRoleProvider({ children }) {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;
  console.log(role);

  let dashboardUrl = '/';
  if (role === 'student') dashboardUrl = '/studentdashboard';
  if (role === 'teacher') dashboardUrl = '/teacherdashboard';

  const contextValue = {
    role,
    dashboardUrl,
  };

  return <UserRoleContextProvider value={contextValue}>{children}</UserRoleContextProvider>;
}
