import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

interface Iprops {
  children: React.ReactNode;
}

export type AuthContextData = {
  authData?: UserCredential;
  loading: boolean;
  signIn(
    email: string,
    password: string
  ): Promise<
    | {
        valueAuth: UserCredential;
        error?: undefined;
      }
    | {
        error: any;
        valueAuth?: undefined;
      }
  >;
  signUp(
    email: string,
    password: string
  ): Promise<
    | {
        valueAuth: UserCredential;
        error?: undefined;
      }
    | {
        error: any;
        valueAuth?: undefined;
      }
  >;
  signOut(): void;
  isAuth(): Promise<void>;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const AuthProvider = ({ children }: Iprops) => {
  const [authData, setAuthData] = useState<UserCredential | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = async (email: string, password: string) => {
    try {
      const valueAuth = await signInWithEmailAndPassword(auth, email, password);
      const jsonValue = JSON.stringify(valueAuth);
      await AsyncStorage.setItem("auth", jsonValue);
      setAuthData(valueAuth);

      setTimeout(() => {
        setLoading(false);
      }, 2500);

      return { valueAuth };
    } catch (error: any) {
      setTimeout(() => {
        setLoading(false);
      }, 2500);

      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const valueAuth = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setTimeout(() => {
        setLoading(false);
      }, 2500);

      return { valueAuth };
    } catch (error: any) {
      setTimeout(() => {
        setLoading(false);
      }, 2500);

      return { error };
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.clear();
      setAuthData(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  const isAuth = async () => {
    try {
      const authData = await AsyncStorage.getItem("auth");

      if (authData !== null) {
        const _authData = JSON.parse(authData);
        setAuthData(_authData);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        setAuthData(undefined);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }

      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <AuthContext.Provider value={{ authData, loading, signIn, signOut, signUp, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
