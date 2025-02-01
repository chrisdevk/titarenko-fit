"use client";

import type { User } from "@/payload-types";
import { signup } from "@/utils/actions/auth/sign-up";
import { login as loginAction } from "@/utils/actions/auth/login";
import { logout as logoutAction } from "@/utils/actions/auth/logout";
import { getCurrentUser } from "@/utils/data/get-current-user";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ResetPassword = (args: {
  password: string;
  passwordConfirm: string;
  token: string;
}) => Promise<void>;

type ForgotPassword = (args: { email: string }) => Promise<void>;

type Create = (args: {
  name: string;
  email: string;
  password: string;
}) => Promise<void>;

type Login = (args: { email: string; password: string }) => Promise<User>;

type Logout = () => Promise<void>;

type AuthContext = {
  create: Create;
  forgotPassword: ForgotPassword;
  login: Login;
  logout: Logout;
  resetPassword: ResetPassword;
  setUser: (user: User | null) => void;
  status: "loggedIn" | "loggedOut" | undefined;
  user?: User | null;
};

const Context = createContext({} as AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>();
  const [status, setStatus] = useState<"loggedIn" | "loggedOut" | undefined>();

  const create = useCallback<Create>(async (args) => {
    try {
      const data = await signup({
        name: args.name,
        email: args.email,
        password: args.password,
      });

      setUser(data.user);
      setStatus("loggedIn");
    } catch (error: any) {
      throw new Error(error.message || "Signup failed");
    }
  }, []);

  const login = useCallback<Login>(async (args) => {
    try {
      const data = await loginAction({
        email: args.email,
        password: args.password,
      });

      setUser(data.user);
      setStatus("loggedIn");
      return data.user;
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  }, []);

  const logout = useCallback<Logout>(async () => {
    try {
      await logoutAction();
      setUser(null);
      setStatus("loggedOut");
    } catch (error: any) {
      throw new Error(error.message || "Logout failed");
    }
  }, []);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const { user } = await getCurrentUser();

        if (user) {
          setUser(user || null);
          setStatus(user ? "loggedIn" : undefined);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    void fetchMe();
  }, []);

  return (
    <Context.Provider
      value={{
        create,
        forgotPassword: async () => {},
        login,
        logout,
        resetPassword: async () => {},
        setUser,
        status,
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
};

type UseAuth<T = User> = () => AuthContext;
export const useAuth: UseAuth = () => useContext(Context);
