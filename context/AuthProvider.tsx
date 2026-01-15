import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, useEffect, useMemo, useState } from 'react';
import { SignInResponse } from '@/types/auth.types';

interface Props {
  children: React.ReactNode;
}

export type AuthContextType = {
  authData: string | undefined;
  signIn: (resData: SignInResponse) => Promise<void>;
  signOut: () => Promise<void>;
  isAuth: () => Promise<void>;
};

const authContextDefaultValues: AuthContextType = {
  authData: undefined,
  signIn: async (resData: SignInResponse) => {},
  signOut: async () => {},
  isAuth: async () => {},
};

export const AuthContext = createContext<AuthContextType>(
  authContextDefaultValues
);

const AuthProvider = ({ children }: Props) => {
  const [authData, setAuthData] = useState<string>();
  const router = useRouter();

  const signIn = async (resData: SignInResponse) => {
    try {
      const { token } = resData;

      // set token JWT to cookies
      Cookies.set('token', token, {
        expires: 7,
        secure: true,
      });

      // setAuthData(loggedInUser);
      router.replace('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      Cookies.remove('token');
      Cookies.remove('refresh_token');

      setAuthData(undefined);
      router.replace('/auth');
    } catch (error) {
      console.log(error);
    }
  };

  const isAuth = async () => {
    try {
      const loggedInUser = Cookies.get('token');

      if (loggedInUser) {
        setAuthData(loggedInUser);
      } else {
        setAuthData(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isAuth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valueContext = useMemo(
    () => ({
      authData,
      signIn,
      signOut,
      isAuth,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authData]
  );

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
