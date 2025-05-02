import { useState, useEffect, createContext, useContext } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  displayName: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is authenticated when the app loads
  useEffect(() => {
    async function checkAuth() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/users/current", {
          credentials: "include"
        });
        
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await apiRequest("POST", "/api/auth/login", { username, password });
      const userData = await res.json();
      setUser(userData);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.displayName}!`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await apiRequest("POST", "/api/auth/logout", {});
      setUser(null);
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      
      toast({
        title: "Logout Failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    // For development, we'll auto-initialize with admin user
    return {
      user: {
        id: 1,
        username: "admin",
        email: "admin@example.com",
        role: "admin",
        displayName: "Admin User"
      },
      isLoading: false,
      isAuthenticated: true,
      login: async () => {},
      logout: async () => {},
    };
    // In production, uncomment:
    // throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
