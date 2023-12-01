import { useAuth0 } from '@auth0/auth0-vue';

export default function authService() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

  
  return {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout,
  };
}
