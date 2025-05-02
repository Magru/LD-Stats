import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./useAuth";

interface UserRoleContextType {
  role: string;
  setRole: (role: string) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [role, setRoleState] = useState<string>(user?.role || "admin");
  
  // Sync with auth context when user changes
  useEffect(() => {
    if (user?.role) {
      setRoleState(user.role);
    }
  }, [user?.role]);
  
  const setRole = (newRole: string) => {
    setRoleState(newRole);
    // In a real implementation, this would trigger a view switch
    // but would not actually change the user's role in the backend
  };

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  
  if (context === undefined) {
    // For development, return a default value
    return {
      role: "admin",
      setRole: () => {},
    };
    // In production, uncomment:
    // throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  
  return context;
}
