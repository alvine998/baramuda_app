import { useState, useEffect } from 'react';
import { isLoggedIn, getUserData, getAuthToken, AuthData } from '../services/storage';

/**
 * Custom hook to check authentication state
 * @returns Object with auth state and user data
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const loggedIn = await isLoggedIn();
      setIsAuthenticated(loggedIn);

      if (loggedIn) {
        const userData = await getUserData();
        const authToken = await getAuthToken();
        setUser(userData);
        setToken(authToken);
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    user,
    token,
    isLoading,
    refreshAuth: checkAuthStatus,
  };
};

export default useAuth;

