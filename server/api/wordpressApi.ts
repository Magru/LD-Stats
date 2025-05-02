interface WordPressUser {
  id: number;
  username: string;
  email: string;
  role: string;
  displayName: string;
  avatar?: string;
}

export async function getCurrentUser(): Promise<WordPressUser | null> {
  // In a real implementation, this would fetch the current user from WordPress
  // based on authentication
  return {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    role: "administrator",
    displayName: "Admin User"
  };
}

export async function getUserById(id: number): Promise<WordPressUser | null> {
  // In a real implementation, this would fetch the user from WordPress
  if (id === 1) {
    return {
      id: 1,
      username: "admin",
      email: "admin@example.com",
      role: "administrator",
      displayName: "Admin User"
    };
  }
  
  return null;
}

export async function getUsersByRole(role: string): Promise<WordPressUser[]> {
  // In a real implementation, this would fetch users with the specified role from WordPress
  if (role === "administrator") {
    return [
      {
        id: 1,
        username: "admin",
        email: "admin@example.com",
        role: "administrator",
        displayName: "Admin User"
      }
    ];
  }
  
  if (role === "instructor") {
    return [
      {
        id: 2,
        username: "johnsmith",
        email: "john@example.com",
        role: "instructor",
        displayName: "John Smith"
      },
      {
        id: 3,
        username: "sarahjohnson",
        email: "sarah@example.com",
        role: "instructor",
        displayName: "Sarah Johnson"
      }
    ];
  }
  
  if (role === "student") {
    return [
      {
        id: 4,
        username: "michaelscott",
        email: "michael@example.com",
        role: "student",
        displayName: "Michael Scott"
      },
      {
        id: 5,
        username: "pambeesly",
        email: "pam@example.com",
        role: "student",
        displayName: "Pam Beesly"
      }
    ];
  }
  
  return [];
}

export async function isUserAuthenticated(): Promise<boolean> {
  // In a real implementation, this would check if the user is authenticated in WordPress
  return true;
}

export async function getAvailableUserRoles(): Promise<string[]> {
  // In a real implementation, this would fetch the available user roles from WordPress
  return ["administrator", "instructor", "student"];
}
