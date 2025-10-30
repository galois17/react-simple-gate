'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  useCallback,
} from 'react';

// Define the Context Shape
type AccessCodeContextType = {
  isAuthorized: boolean;
  isLoading: boolean;
  login: (code: string) => boolean;
};

const AccessCodeContext = createContext<AccessCodeContextType | undefined>(
  undefined
);

// Define the Provider Prop
type AccessCodeProviderProps = PropsWithChildren<{
  /** The secret code to grant access. */
  accessCode: string;
  /** Optional: localStorage key to store session. */
  storageKey?: string;
  /** Optional: Session duration in hours. */
  expirationHours?: number;
}>;

// Default values
const DEFAULT_STORAGE_KEY = 'app_access_data';
const DEFAULT_EXPIRATION_HOURS = 8;

// The Provider Component
export function AccessCodeProvider({
  children,
  accessCode,
  storageKey = DEFAULT_STORAGE_KEY,
  expirationHours = DEFAULT_EXPIRATION_HOURS,
}: AccessCodeProviderProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const expirationTime = expirationHours * 60 * 60 * 1000;

  // Check for an active session on load
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(storageKey);
      if (storedData) {
        const { timestamp } = JSON.parse(storedData);
        const now = new Date().getTime();
        if (now - timestamp < expirationTime) {
          setIsAuthorized(true);
        } else {
          localStorage.removeItem(storageKey);
        }
      }
    } catch (e) {
      localStorage.removeItem(storageKey);
    }
    setIsLoading(false);
  }, [storageKey, expirationTime]);

  // Login function to be passed via context
  const login = useCallback(
    (code: string): boolean => {
      if (code === accessCode) {
        const dataToStore = { granted: true, timestamp: new Date().getTime() };
        localStorage.setItem(storageKey, JSON.stringify(dataToStore));
        setIsAuthorized(true);
        return true;
      }
      return false;
    },
    [accessCode, storageKey]
  );

  const value = { isAuthorized, isLoading, login };

  return (
    <AccessCodeContext.Provider value={value}>
      {children}
    </AccessCodeContext.Provider>
  );
}

// The Hook
/**
 * Hook to access the access code authorization state
 * and login functionn.
 *
 * Must be used within an `<AccessCodeProvider>`.
 */
export function useAccessCode() {
  const context = useContext(AccessCodeContext);
  if (context === undefined) {
    throw new Error(
      'useAccessCode must be used within an AccessCodeProvider'
    );
  }
  return context;
}