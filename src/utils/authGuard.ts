import { Alert } from 'react-native';
import { isLoggedIn } from '../services/storage';

/**
 * Check if user is authenticated and prompt login if needed
 * @param navigation - Navigation object for redirecting to login
 * @param callback - Function to execute if user is authenticated or after login
 * @param message - Optional message to show when login is required
 * @returns Promise<boolean> - true if user is authenticated, false if not
 */
export const requireAuth = async (
  navigation: any,
  callback?: () => void,
  message: string = 'Fitur ini memerlukan login terlebih dahulu'
): Promise<boolean> => {
  const authenticated = await isLoggedIn();

  if (!authenticated) {
    Alert.alert(
      'Login Diperlukan',
      message,
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Masuk',
          onPress: () => {
            navigation.navigate('Login');
            // If callback is provided, execute it after navigation
            // Note: This will only work if user successfully logs in
            // You might want to use a navigation listener instead
            if (callback) {
              // Store callback to be executed after login
              // This is a simple approach; you might want a more robust solution
              setTimeout(() => {
                // This is a workaround - ideally use React Navigation state management
                callback();
              }, 500);
            }
          },
        },
      ],
      { cancelable: true }
    );
    return false;
  }

  // User is authenticated, execute callback if provided
  if (callback) {
    callback();
  }
  return true;
};

/**
 * Check if user is authenticated (simple check without prompt)
 * @returns Promise<boolean> - true if user is authenticated
 */
export const checkAuth = async (): Promise<boolean> => {
  return await isLoggedIn();
};

