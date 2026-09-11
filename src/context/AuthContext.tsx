import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AuroraUser = {
  id: string;
  name: string;
  email: string;
};

type StoredUser = AuroraUser & {
  password: string;
};

type AuthContextValue = {
  user: AuroraUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => { success: boolean; error?: string };
  signIn: (
    email: string,
    password: string
  ) => { success: boolean; error?: string };
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = "aurora-users";
const SESSION_KEY = "aurora-session";

function createUserId() {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadUsers(): StoredUser[] {
  try {
    const stored = localStorage.getItem(USERS_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadSession(): AuroraUser | null {
  try {
    const stored = localStorage.getItem(SESSION_KEY);

    if (!stored) {
      return null;
    }

    return JSON.parse(stored) as AuroraUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuroraUser | null>(loadSession);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const signUp = (
    name: string,
    email: string,
    password: string
  ): { success: boolean; error?: string } => {
    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      return {
        success: false,
        error: "Please enter your name.",
      };
    }

    if (!normalizedEmail) {
      return {
        success: false,
        error: "Please enter your email.",
      };
    }

    if (!normalizedEmail.includes("@")) {
      return {
        success: false,
        error: "Please enter a valid email address.",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters.",
      };
    }

    const users = loadUsers();

    const existingUser = users.find(
      (existing) => existing.email === normalizedEmail
    );

    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    const newUser: StoredUser = {
      id: createUserId(),
      name: trimmedName,
      email: normalizedEmail,
      password,
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    const sessionUser: AuroraUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return {
      success: true,
    };
  };

  const signIn = (
    email: string,
    password: string
  ): { success: boolean; error?: string } => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return {
        success: false,
        error: "Please enter your email and password.",
      };
    }

    const users = loadUsers();

    const existingUser = users.find(
      (storedUser) =>
        storedUser.email === normalizedEmail &&
        storedUser.password === password
    );

    if (!existingUser) {
      return {
        success: false,
        error: "Incorrect email or password.",
      };
    }

    const sessionUser: AuroraUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return {
      success: true,
    };
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      signUp,
      signIn,
      signOut,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}