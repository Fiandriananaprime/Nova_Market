import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

export type UserRole = "admin" | null;

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const AppContext = createContext<AppContextType>(
  {} as AppContextType
);

const getStoredUserRole = (): UserRole => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    const parsedUser = JSON.parse(storedUser);

    return parsedUser?.role === "admin"
      ? "admin"
      : null;
  } catch {
    return null;
  }
};

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole, setUserRoleState] = useState<UserRole>(
    () => getStoredUserRole()
  );

  /**
   * Update admin role.
   */
  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
  };

  /**
   * Listen to authentication events.
   */
  useEffect(() => {
    const handleAuthLogout = () => {
      setUserRoleState(null);
    };

    const handleStoredSessionRestore = () => {
      setUserRoleState(getStoredUserRole());
    };

    window.addEventListener(
      "auth:logout",
      handleAuthLogout
    );

    window.addEventListener(
      "auth:session-restored",
      handleStoredSessionRestore
    );

    return () => {
      window.removeEventListener(
        "auth:logout",
        handleAuthLogout
      );

      window.removeEventListener(
        "auth:session-restored",
        handleStoredSessionRestore
      );
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);