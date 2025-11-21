import { supabase } from "@/lib/supabase";
import { AuthContextType } from "@/types/interfaces";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an Auth Provider");
  }

  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const getSession = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw new Error(error.message);
      }

      setSession(data.session);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error((err as unknown as Error).message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    session,
    isLoading,
    error,
    refetchSession: getSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
