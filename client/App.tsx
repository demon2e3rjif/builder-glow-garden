import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";

// Dark Mode Context
const ThemeContext = createContext<{
  isDark: boolean;
  toggleTheme: () => void;
}>({
  isDark: false,
  toggleTheme: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDark(saved ? saved === "dark" : prefersDark);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const useTheme = () => useContext(ThemeContext);

// Authentication Context
interface User {
  id: number;
  email: string;
  userType: "person" | "club";
  name: string;
  avatar?: string;
  ownsClub?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (
    email: string,
    password: string,
    userType?: "person" | "club",
  ) => Promise<boolean>;
  register: (data: any, userType: "person" | "club") => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider Component
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize with saved user or demo user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Demo user for development
      const mockUser: User = {
        id: 1,
        email: "john.doe@stanford.edu",
        userType: "person",
        name: "John Doe",
        avatar: "J",
        ownsClub: true,
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    userType?: "person" | "club",
  ): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login - in real app, this would call your API
      const mockUser: User = {
        id: 1,
        email: email,
        userType: userType || "person",
        name: userType === "club" ? "Tech Innovators Club" : "John Doe",
        avatar: userType === "club" ? "T" : "J",
        ownsClub: userType === "club" || Math.random() > 0.5,
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    data: any,
    userType: "person" | "club",
  ): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful registration
      const mockUser: User = {
        id: Math.floor(Math.random() * 1000),
        email: data.email,
        userType: userType,
        name:
          userType === "club"
            ? data.clubName
            : `${data.firstName} ${data.lastName}`,
        avatar:
          userType === "club"
            ? data.clubName.charAt(0)
            : data.firstName.charAt(0),
        ownsClub: userType === "club",
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Professional Icon Components
const HomeIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CogIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

// Top Navbar Component
function TopNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userType, setUserType] = useState<"user" | "club">("user");
  const [showNotifications, setShowNotifications] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* App Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary">EventHub</h1>
            </div>
          </div>

          {/* Right Side - Auth Controls */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors relative"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    {/* Notification badge */}
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-xs flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    </span>
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-border">
                        <h3 className="font-semibold text-foreground">
                          Notifications
                        </h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <div className="p-3 hover:bg-muted/50 border-b border-border">
                          <p className="text-sm font-medium text-foreground">
                            New event application
                          </p>
                          <p className="text-xs text-muted-foreground">
                            John Doe applied to Tech Summit
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            2 minutes ago
                          </p>
                        </div>
                        <div className="p-3 hover:bg-muted/50 border-b border-border">
                          <p className="text-sm font-medium text-foreground">
                            Event reminder
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Photography Workshop starts in 1 hour
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            1 hour ago
                          </p>
                        </div>
                      </div>
                      <div className="p-3 border-t border-border">
                        <button className="text-sm text-secondary hover:text-secondary/80 w-full text-center">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-2">
                  <span className="hidden sm:block text-sm text-muted-foreground">
                    {userType === "club" ? "Club Manager" : "Member"}
                  </span>
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer">
                    J
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Login/Signup */}
                <Link
                  to="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: HomeIcon,
      show: true,
    },
    {
      name: "Events",
      path: "/events",
      icon: CalendarIcon,
      show: true,
    },
    {
      name: "Clubs",
      path: "/clubs",
      icon: UsersIcon,
      show: true,
    },
    {
      name: "My Club",
      path: "/my-club",
      icon: CogIcon,
      show: user?.ownsClub || user?.userType === "club", // Only show if user owns a club
    },
    {
      name: "My Applications",
      path: "/applications",
      icon: DocumentIcon,
      show: user?.userType === "person" && !user?.ownsClub, // Hide if user owns a club
    },
    {
      name: "Profile",
      path: "/profile",
      icon: UserIcon,
      show: true,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: CogIcon,
      show: true,
    },
  ];

  return (
    <div className="fixed left-0 top-14 h-full w-64 bg-gray-900 border-r border-gray-700 shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">EventHub</h1>
            <p className="text-xs text-gray-400">Event Management</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {navigationItems
            .filter((item) => item.show)
            .map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <IconComponent />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-800/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">
            J
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-gray-400">
              {userType === "club" ? "Club Manager" : "Member"}
            </p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-gray-400 hover:text-white transition-colors"
            title="Logout"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Page Layout Wrapper
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

// Dashboard Page
function DashboardPage() {
  const stats = [
    {
      label: "Events Attended",
      value: "12",
      icon: CalendarIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Clubs Joined",
      value: "3",
      icon: UsersIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Applications",
      value: "5",
      icon: DocumentIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Connections",
      value: "48",
      icon: UserIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recentEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit",
      club: "Tech Innovators Club",
      date: "Dec 15, 2024",
      status: "Confirmed",
    },
    {
      id: 2,
      title: "Photography Workshop",
      club: "Creative Society",
      date: "Dec 18, 2024",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <IconComponent />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Recent Events
          </h2>
          <div className="space-y-4">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.club} • {event.date}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.status === "Confirmed"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/events"
            className="block mt-4 text-secondary hover:text-secondary/80 text-sm font-medium"
          >
            View all events →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/events"
              className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center space-x-3">
                <SearchIcon />
                <span className="font-medium">Browse Events</span>
              </div>
            </Link>
            <Link
              to="/clubs"
              className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center space-x-3">
                <UsersIcon />
                <span className="font-medium">Find Clubs</span>
              </div>
            </Link>
            <Link
              to="/applications"
              className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center space-x-3">
                <DocumentIcon />
                <span className="font-medium">My Applications</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Events Page with Advanced Filtering
function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [sortBy, setSortBy] = useState("date");
  const [showFilters, setShowFilters] = useState(false);

  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      club: "Tech Innovators Club",
      clubId: 1,
      date: "2024-12-15",
      time: "9:00 AM - 6:00 PM",
      location: "Convention Center",
      city: "San Francisco",
      university: "Stanford University",
      attendees: 124,
      maxAttendees: 200,
      tags: ["Technology", "Innovation", "Networking", "AI"],
      description:
        "A full-day summit featuring the latest in tech innovation, networking opportunities, and keynote speakers from industry leaders.",
      price: 0,
      status: "Open",
    },
    {
      id: 2,
      title: "Photography Masterclass",
      club: "Creative Lens Society",
      clubId: 2,
      date: "2024-12-18",
      time: "2:00 PM - 5:00 PM",
      location: "Art Studio",
      city: "Brooklyn",
      university: "NYU",
      attendees: 45,
      maxAttendees: 50,
      tags: ["Photography", "Arts", "Workshop", "Creative"],
      description:
        "Learn advanced photography techniques from professional photographers with hands-on workshops and real-world scenarios.",
      price: 25,
      status: "Open",
    },
    {
      id: 3,
      title: "Startup Pitch Night",
      club: "Entrepreneurs Network",
      clubId: 3,
      date: "2024-12-20",
      time: "7:00 PM - 10:00 PM",
      location: "Innovation Hub",
      city: "Austin",
      university: "UT Austin",
      attendees: 89,
      maxAttendees: 150,
      tags: ["Business", "Startup", "Pitch", "Investment"],
      description:
        "Watch emerging startups pitch their innovative ideas to a panel of experienced investors and industry experts.",
      price: 15,
      status: "Open",
    },
    {
      id: 4,
      title: "Machine Learning Workshop",
      club: "AI Research Club",
      clubId: 4,
      date: "2024-12-22",
      time: "10:00 AM - 4:00 PM",
      location: "Computer Science Building",
      city: "Seattle",
      university: "University of Washington",
      attendees: 67,
      maxAttendees: 80,
      tags: ["Technology", "Machine Learning", "AI", "Workshop"],
      description:
        "Comprehensive workshop covering machine learning fundamentals, practical applications, and hands-on coding sessions.",
      price: 50,
      status: "Open",
    },
    {
      id: 5,
      title: "Digital Marketing Seminar",
      club: "Marketing Professionals",
      clubId: 5,
      date: "2024-12-25",
      time: "1:00 PM - 5:00 PM",
      location: "Business Center",
      city: "Portland",
      university: "Portland State University",
      attendees: 92,
      maxAttendees: 120,
      tags: ["Business", "Marketing", "Digital", "Strategy"],
      description:
        "Explore the latest digital marketing trends, social media strategies, and conversion optimization techniques.",
      price: 35,
      status: "Open",
    },
    {
      id: 6,
      title: "Community Art Exhibition",
      club: "Local Artists Guild",
      clubId: 6,
      date: "2024-12-28",
      time: "6:00 PM - 9:00 PM",
      location: "City Gallery",
      city: "Chicago",
      university: "University of Chicago",
      attendees: 156,
      maxAttendees: 200,
      tags: ["Arts", "Exhibition", "Community", "Culture"],
      description:
        "Showcase of local talent featuring paintings, sculptures, and digital art with artist meet-and-greets.",
      price: 0,
      status: "Open",
    },
    {
      id: 7,
      title: "Sustainable Energy Conference",
      club: "Green Future Society",
      clubId: 7,
      date: "2025-01-05",
      time: "9:00 AM - 5:00 PM",
      location: "Engineering Hall",
      city: "Berkeley",
      university: "UC Berkeley",
      attendees: 203,
      maxAttendees: 300,
      tags: ["Environment", "Sustainability", "Energy", "Conference"],
      description:
        "Explore renewable energy solutions and sustainable technologies for a greener future.",
      price: 0,
      status: "Open",
    },
    {
      id: 8,
      title: "Cybersecurity Bootcamp",
      club: "InfoSec Club",
      clubId: 8,
      date: "2025-01-10",
      time: "10:00 AM - 6:00 PM",
      location: "Tech Hub",
      city: "Boston",
      university: "MIT",
      attendees: 78,
      maxAttendees: 100,
      tags: ["Technology", "Security", "Cybersecurity", "Workshop"],
      description:
        "Intensive bootcamp covering ethical hacking, penetration testing, and cybersecurity best practices.",
      price: 75,
      status: "Open",
    },
  ];

  const universities = [
    "Stanford University",
    "NYU",
    "UT Austin",
    "University of Washington",
    "Portland State University",
    "University of Chicago",
    "UC Berkeley",
    "MIT",
  ];

  const cities = [
    "San Francisco",
    "Brooklyn",
    "Austin",
    "Seattle",
    "Portland",
    "Chicago",
    "Berkeley",
    "Boston",
  ];

  const allTags = Array.from(new Set(events.flatMap((event) => event.tags)));

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUniversity =
      selectedUniversity === "all" || event.university === selectedUniversity;

    const matchesCity = selectedCity === "all" || event.city === selectedCity;

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => event.tags.includes(tag));

    const matchesDateRange =
      (!dateRange.start || event.date >= dateRange.start) &&
      (!dateRange.end || event.date <= dateRange.end);

    return (
      matchesSearch &&
      matchesUniversity &&
      matchesCity &&
      matchesTags &&
      matchesDateRange
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Discover Events
          </h1>
          <p className="text-muted-foreground">
            Find amazing events at universities and in your community
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-muted text-muted-foreground px-4 py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors flex items-center space-x-2 sm:hidden"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
              />
            </svg>
            <span>Filters</span>
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2 shadow-sm">
            <PlusIcon />
            <span>Create Event</span>
          </button>
        </div>
      </div>

      {/* Modern Search Bar */}
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search events, clubs, or descriptions..."
            className="w-full pl-12 pr-4 py-3 border-2 border-muted rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Advanced Filters */}
        <div
          className={`space-y-6 ${showFilters ? "block" : "hidden sm:block"}`}
        >
          {/* Primary Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                University
              </label>
              <select
                className="w-full px-3 py-2.5 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
              >
                <option value="all">All Universities</option>
                {universities.map((university) => (
                  <option key={university} value={university}>
                    {university}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                City
              </label>
              <select
                className="w-full px-3 py-2.5 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Start Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2.5 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                End Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2.5 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, end: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Tags ({selectedTags.length} selected)
            </label>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? "bg-secondary text-white shadow-md scale-105"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="mt-2 text-sm text-secondary hover:text-secondary/80 font-medium"
              >
                Clear all tags
              </button>
            )}
          </div>

          {/* Active Filters & Sort */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4 border-t border-muted">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Active filters:
              </span>
              {selectedUniversity !== "all" && (
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                  University: {selectedUniversity}
                  <button
                    onClick={() => setSelectedUniversity("all")}
                    className="hover:bg-blue-200 rounded p-0.5"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCity !== "all" && (
                <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                  City: {selectedCity}
                  <button
                    onClick={() => setSelectedCity("all")}
                    className="hover:bg-green-200 rounded p-0.5"
                  >
                    ×
                  </button>
                </span>
              )}
              {(dateRange.start || dateRange.end) && (
                <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                  Date Range
                  <button
                    onClick={() => setDateRange({ start: "", end: "" })}
                    className="hover:bg-purple-200 rounded p-0.5"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-muted-foreground">
                Sort by:
              </label>
              <select
                className="px-3 py-1.5 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="popularity">Popularity</option>
                <option value="price">Price</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          {filteredEvents.length} Events Found
        </h2>
        {/* Responsive Grid - 1 col on mobile, 2 on tablet, 3 on desktop, 4 on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-lg hover:border-secondary/20 transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-secondary to-primary relative">
                <div className="absolute top-3 left-3">
                  <div className="flex flex-wrap gap-1">
                    {event.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-white/90 backdrop-blur-sm text-secondary text-xs px-2 py-1 rounded font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {event.tags.length > 2 && (
                      <span className="inline-block bg-white/90 backdrop-blur-sm text-secondary text-xs px-2 py-1 rounded font-medium">
                        +{event.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs text-white/90 bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
                    {event.attendees}/{event.maxAttendees}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                  {event.title}
                </h3>

                <Link
                  to={`/clubs/${event.clubId}`}
                  className="text-sm text-secondary hover:text-secondary/80 mb-3 block font-medium"
                >
                  by {event.club}
                </Link>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <CalendarIcon />
                    <span className="ml-2">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon />
                    <span className="ml-2">{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <LocationIcon />
                    <span className="ml-2 truncate">
                      {event.location}, {event.city}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="ml-2 truncate text-xs">
                      {event.university}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">
                    {event.price === 0 ? "Free" : `$${event.price}`}
                  </span>
                  <div className="flex space-x-2">
                    <Link
                      to={`/events/${event.id}`}
                      className="bg-secondary text-white px-3 py-1 rounded text-sm hover:bg-secondary/90 transition-colors"
                    >
                      Details
                    </Link>
                    <button className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Clubs Page
function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const clubs = [
    {
      id: 1,
      name: "Tech Innovators Club",
      description:
        "A vibrant community of developers, designers, and tech enthusiasts passionate about innovation and cutting-edge technology. We organize workshops, hackathons, and networking events.",
      members: 1247,
      upcomingEvents: 8,
      category: "Technology",
      location: "San Francisco, CA",
      founded: "2020",
      isVerified: true,
    },
    {
      id: 2,
      name: "Creative Lens Society",
      description:
        "Professional and amateur photographers sharing knowledge, techniques, and passion for visual storytelling. Regular photo walks and exhibitions.",
      members: 892,
      upcomingEvents: 5,
      category: "Arts",
      location: "Brooklyn, NY",
      founded: "2019",
      isVerified: true,
    },
    {
      id: 3,
      name: "Entrepreneurs Network",
      description:
        "Connect with fellow entrepreneurs, share experiences, and build the next generation of innovative businesses. Monthly pitch nights and mentorship programs.",
      members: 2156,
      upcomingEvents: 12,
      category: "Business",
      location: "Austin, TX",
      founded: "2018",
      isVerified: true,
    },
    {
      id: 4,
      name: "AI Research Club",
      description:
        "Dedicated to advancing artificial intelligence research and applications. Weekly seminars, research collaborations, and industry partnerships.",
      members: 543,
      upcomingEvents: 6,
      category: "Technology",
      location: "Seattle, WA",
      founded: "2021",
      isVerified: false,
    },
    {
      id: 5,
      name: "Marketing Professionals",
      description:
        "Digital marketing experts sharing strategies, tools, and insights. Quarterly conferences and monthly skill-building workshops.",
      members: 1089,
      upcomingEvents: 9,
      category: "Business",
      location: "Portland, OR",
      founded: "2019",
      isVerified: true,
    },
    {
      id: 6,
      name: "Local Artists Guild",
      description:
        "Supporting local artists through exhibitions, collaborative projects, and community art initiatives. Painters, sculptors, and digital artists welcome.",
      members: 445,
      upcomingEvents: 4,
      category: "Arts",
      location: "Chicago, IL",
      founded: "2020",
      isVerified: false,
    },
    {
      id: 7,
      name: "Fitness Enthusiasts",
      description:
        "Community of fitness lovers organizing group workouts, nutrition workshops, and wellness challenges. All fitness levels welcome.",
      members: 723,
      upcomingEvents: 7,
      category: "Sports",
      location: "Miami, FL",
      founded: "2022",
      isVerified: false,
    },
    {
      id: 8,
      name: "Book Lovers Society",
      description:
        "Literary community discussing books, hosting author events, and organizing reading challenges. Monthly book club meetings and literary discussions.",
      members: 334,
      upcomingEvents: 3,
      category: "Education",
      location: "Boston, MA",
      founded: "2021",
      isVerified: true,
    },
  ];

  const categories = ["Technology", "Arts", "Business", "Sports", "Education"];

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clubs</h1>
          <p className="text-muted-foreground">
            Find communities that match your interests
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2">
          <PlusIcon />
          <span>Create Club</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Search Clubs
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search clubs..."
                className="w-full pl-10 pr-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Category
            </label>
            <select
              className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Sort By
            </label>
            <select className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent">
              <option value="members">Most Members</option>
              <option value="events">Most Events</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          {filteredClubs.length} Clubs Found
        </h2>
        {/* Responsive Grid - 1 col on mobile, 2 on tablet, 3 on desktop, 4 on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredClubs.map((club) => (
            <div
              key={club.id}
              className="bg-white rounded-xl border border-border shadow-sm p-6 hover:shadow-lg hover:border-secondary/20 transition-all duration-300"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0">
                  {club.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {club.name}
                    </h3>
                    {club.isVerified && <CheckIcon />}
                  </div>
                  <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded font-medium">
                    {club.category}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {club.description}
              </p>

              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <UsersIcon />
                    <span className="ml-1">
                      {club.members.toLocaleString()}
                    </span>
                  </span>
                  <span className="flex items-center">
                    <CalendarIcon />
                    <span className="ml-1">{club.upcomingEvents}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <LocationIcon />
                  <span className="ml-2 truncate">{club.location}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Founded {club.founded}
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/clubs/${club.id}`}
                  className="flex-1 bg-secondary text-white px-3 py-2 rounded-lg text-sm font-medium text-center hover:bg-secondary/90 transition-colors"
                >
                  View Club
                </Link>
                <button className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Event Details Page
function EventDetailsPage() {
  const { id } = useParams();

  const event = {
    id: 1,
    title: "Tech Innovation Summit 2024",
    club: "Tech Innovators Club",
    clubId: 1,
    date: "December 15, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Convention Center, Downtown",
    attendees: 124,
    maxAttendees: 200,
    category: "Technology",
    description:
      "Join us for a comprehensive day of tech innovation featuring keynote speakers, workshops, and networking opportunities. This summit brings together industry leaders, entrepreneurs, and tech enthusiasts to explore the latest trends and technologies shaping our future.",
    price: 0,
    status: "Open",
    agenda: [
      { time: "9:00 AM", title: "Registration & Coffee" },
      { time: "10:00 AM", title: "Keynote: Future of AI" },
      { time: "11:30 AM", title: "Workshop: React Best Practices" },
      { time: "1:00 PM", title: "Lunch & Networking" },
      { time: "2:30 PM", title: "Panel: Startup Success Stories" },
      { time: "4:00 PM", title: "Tech Demo Sessions" },
      { time: "5:30 PM", title: "Closing Remarks" },
    ],
    speakers: [
      {
        name: "Sarah Johnson",
        title: "CTO at TechCorp",
        topic: "AI Revolution",
      },
      {
        name: "Mike Chen",
        title: "Senior Engineer at Google",
        topic: "React Patterns",
      },
      {
        name: "Emily Davis",
        title: "Startup Founder",
        topic: "Scaling Tech Startups",
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/events"
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{event.title}</h1>
          <Link
            to={`/clubs/${event.clubId}`}
            className="text-secondary hover:text-secondary/80"
          >
            by {event.club}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Image */}
          <div className="h-64 bg-gradient-to-br from-secondary to-primary rounded-xl"></div>

          {/* Description */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              About This Event
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Agenda */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Event Agenda
            </h2>
            <div className="space-y-4">
              {event.agenda.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-20 text-sm font-medium text-muted-foreground">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Speakers */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Featured Speakers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.speakers.map((speaker, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white font-bold">
                    {speaker.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {speaker.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {speaker.title}
                    </p>
                    <p className="text-xs text-secondary">{speaker.topic}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Event Details Card */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Event Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CalendarIcon />
                <div>
                  <p className="font-medium text-foreground">{event.date}</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <LocationIcon />
                <p className="text-foreground">{event.location}</p>
              </div>
              <div className="flex items-center space-x-3">
                <UsersIcon />
                <p className="text-foreground">
                  {event.attendees} / {event.maxAttendees} attending
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">💰</span>
                <p className="text-foreground text-lg font-bold">
                  {event.price === 0 ? "Free" : `$${event.price}`}
                </p>
              </div>
            </div>

            <button className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Apply to Attend
            </button>
          </div>

          {/* Club Info Card */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Organized by
            </h3>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center text-white font-bold">
                T
              </div>
              <div className="flex-1">
                <Link
                  to={`/clubs/${event.clubId}`}
                  className="font-medium text-foreground hover:text-secondary"
                >
                  {event.club}
                </Link>
                <p className="text-sm text-muted-foreground">1,247 members</p>
              </div>
            </div>
            <Link
              to={`/clubs/${event.clubId}`}
              className="block w-full mt-4 bg-secondary text-white py-2 rounded-lg font-medium text-center hover:bg-secondary/90 transition-colors"
            >
              View Club
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Club Details Page
function ClubDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isOwner, setIsOwner] = useState(false); // This would come from auth

  // Mock data based on your database model
  const [clubData, setClubData] = useState({
    id: parseInt(id || "1"),
    user_id: 1,
    name: "Tech Innovators Club",
    university: "Stanford University",
    address: "1600 Amphitheatre Parkway, Mountain View, CA 94043",
    description:
      "A vibrant community of developers, designers, and tech enthusiasts passionate about innovation and cutting-edge technology. We organize workshops, hackathons, networking events, and technical talks to help our members grow professionally and personally. Join us to connect with like-minded individuals and advance your career in tech.",
    phone: "+1 (555) 123-4567",
    image_url: null,
    email: "contact@techinnovators.stanford.edu",
    founded: "2020",
    category: "Technology",
    isVerified: true,
    website: "https://techinnovators.com",
    socialMedia: {
      twitter: "@techinnovators",
      linkedin: "tech-innovators-club",
    },
  });

  const [editFormData, setEditFormData] = useState({ ...clubData });

  // Club statistics
  const clubStats = {
    totalMembers: 1247,
    totalEvents: 45,
    upcomingEvents: 8,
    activeApplications: 23,
  };

  // Members data
  const members = [
    {
      id: 1,
      name: "Alice Johnson",
      major: "Computer Science",
      year: 3,
      avatar: "A",
      role: "President",
    },
    {
      id: 2,
      name: "Bob Chen",
      major: "Software Engineering",
      year: 2,
      avatar: "B",
      role: "VP Technology",
    },
    {
      id: 3,
      name: "Carol Davis",
      major: "Data Science",
      year: 4,
      avatar: "C",
      role: "Event Coordinator",
    },
    {
      id: 4,
      name: "David Wilson",
      major: "Computer Science",
      year: 1,
      avatar: "D",
      role: "Member",
    },
    {
      id: 5,
      name: "Eva Martinez",
      major: "Information Systems",
      year: 3,
      avatar: "E",
      role: "Member",
    },
    {
      id: 6,
      name: "Frank Thompson",
      major: "AI/ML",
      year: 2,
      avatar: "F",
      role: "Member",
    },
  ];

  const clubEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      date: "2024-12-15",
      time: "9:00 AM - 5:00 PM",
      location: "Main Auditorium",
      attendees: 124,
      maxAttendees: 200,
      price: 0,
      status: "Open",
      tags: ["Technology", "Innovation", "Summit"],
      description:
        "Annual summit featuring the latest innovations in technology and startup ecosystem.",
    },
    {
      id: 4,
      title: "React Workshop: Advanced Patterns",
      date: "2024-12-22",
      time: "2:00 PM - 6:00 PM",
      location: "Computer Lab A",
      attendees: 67,
      maxAttendees: 80,
      price: 25,
      status: "Open",
      tags: ["React", "Workshop", "Frontend"],
      description:
        "Deep dive into advanced React patterns including hooks, context, and performance optimization.",
    },
    {
      id: 5,
      title: "AI & Machine Learning Meetup",
      date: "2025-01-08",
      time: "6:00 PM - 8:00 PM",
      location: "Innovation Hub",
      attendees: 45,
      maxAttendees: 100,
      price: 0,
      status: "Open",
      tags: ["AI", "Machine Learning", "Networking"],
      description:
        "Monthly meetup for AI enthusiasts to share projects and network with peers.",
    },
  ];

  const handleSave = () => {
    setClubData({ ...editFormData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditFormData({ ...clubData });
    setIsEditing(false);
  };

  const handleJoinLeave = () => {
    setIsMember(!isMember);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex items-center space-x-4">
          <Link
            to="/clubs"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon />
          </Link>
          <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold">
            {clubData.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-foreground">
                {clubData.name}
              </h1>
              {clubData.isVerified && <CheckIcon />}
            </div>
            <p className="text-muted-foreground">
              {clubData.university} • {clubStats.totalMembers} members • Founded{" "}
              {clubData.founded}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {isOwner && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-muted text-muted-foreground px-4 py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span>{isEditing ? "Cancel" : "Edit Club"}</span>
            </button>
          )}
          <button
            onClick={handleJoinLeave}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              isMember
                ? "bg-muted text-muted-foreground hover:bg-muted/80"
                : "bg-secondary text-white hover:bg-secondary/90"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMember
                    ? "M6 18L18 6M6 6l12 12"
                    : "M12 6v6m0 0v6m0-6h6m-6 0H6"
                }
              />
            </svg>
            <span>{isMember ? "Leave Club" : "Join Club"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {["overview", "events", "members", "about"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                activeTab === tab
                  ? "border-secondary text-secondary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Club Cover */}
            <div className="h-48 bg-gradient-to-br from-secondary to-primary rounded-xl relative">
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold">{clubData.name}</h2>
                <p className="text-white/90">
                  {clubData.category} • {clubData.university}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-border text-center">
                <p className="text-2xl font-bold text-secondary">
                  {clubStats.totalMembers}
                </p>
                <p className="text-sm text-muted-foreground">Members</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-border text-center">
                <p className="text-2xl font-bold text-secondary">
                  {clubStats.upcomingEvents}
                </p>
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-border text-center">
                <p className="text-2xl font-bold text-secondary">
                  {clubStats.totalEvents}
                </p>
                <p className="text-sm text-muted-foreground">Total Events</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-border text-center">
                <p className="text-2xl font-bold text-secondary">
                  {clubStats.activeApplications}
                </p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
            </div>

            {/* About */}
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                About
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {clubData.description}
              </p>
            </div>

            {/* Recent Events */}
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Recent Events
                </h2>
                <button
                  onClick={() => setActiveTab("events")}
                  className="text-secondary hover:text-secondary/80 text-sm font-medium"
                >
                  View all →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clubEvents.slice(0, 4).map((event) => (
                  <div
                    key={event.id}
                    className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium text-foreground mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(event.date).toLocaleDateString()} • {event.time}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                        {event.attendees}/{event.maxAttendees} attending
                      </span>
                      <Link
                        to={`/events/${event.id}`}
                        className="text-secondary hover:text-secondary/80 text-sm"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-muted-foreground text-sm">
                    {clubData.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-muted-foreground text-sm">
                    {clubData.phone}
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <LocationIcon />
                  <span className="text-muted-foreground text-sm">
                    {clubData.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Connect */}
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Connect
              </h3>
              <div className="space-y-3">
                <a
                  href={clubData.website}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-secondary transition-colors"
                >
                  <ExternalLinkIcon />
                  <span>Website</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-secondary transition-colors"
                >
                  <span className="w-4 h-4">🐦</span>
                  <span>{clubData.socialMedia.twitter}</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-secondary transition-colors"
                >
                  <span className="w-4 h-4">💼</span>
                  <span>{clubData.socialMedia.linkedin}</span>
                </a>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">
                    5 new members joined this week
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-muted-foreground">
                    Posted new event: React Workshop
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-muted-foreground">
                    Tech Summit applications are now open
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Club Events
            </h2>
            {isOwner && (
              <button className="bg-secondary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                Create Event
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clubEvents.map((event) => (
              <div
                key={event.id}
                className="border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === "Open"
                        ? "bg-success/10 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {event.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon />
                    <span>
                      {new Date(event.date).toLocaleDateString()} • {event.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <LocationIcon />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UsersIcon />
                    <span>
                      {event.attendees}/{event.maxAttendees} attending
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">💰</span>
                    <span className="font-medium">
                      {event.price === 0 ? "Free" : `$${event.price}`}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3 mb-4">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/events/${event.id}`}
                  className="block w-full bg-secondary text-white text-center py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "members" && (
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Members ({members.length})
            </h2>
            {isOwner && (
              <button className="bg-secondary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                Manage Members
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="border border-border rounded-lg p-4"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white font-bold">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.major}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.role === "President" ||
                      member.role === "VP Technology" ||
                      member.role === "Event Coordinator"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {member.role}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Year {member.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "about" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Club Information
              </h2>
              {isOwner && isEditing && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1.5 text-sm border border-muted rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3 py-1.5 text-sm bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Club Name
                </label>
                {isOwner && isEditing ? (
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                ) : (
                  <p className="text-foreground">{clubData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  University
                </label>
                {isOwner && isEditing ? (
                  <input
                    type="text"
                    value={editFormData.university}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        university: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                ) : (
                  <p className="text-foreground">{clubData.university}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                {isOwner && isEditing ? (
                  <input
                    type="tel"
                    value={editFormData.phone}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                ) : (
                  <p className="text-foreground">{clubData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Address
                </label>
                {isOwner && isEditing ? (
                  <textarea
                    value={editFormData.address}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        address: e.target.value,
                      })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                ) : (
                  <p className="text-foreground">{clubData.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                {isOwner && isEditing ? (
                  <textarea
                    value={editFormData.description}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                ) : (
                  <p className="text-foreground">{clubData.description}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Members</span>
                  <span className="font-medium text-secondary">
                    {clubStats.totalMembers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Events</span>
                  <span className="font-medium text-secondary">
                    {clubStats.totalEvents}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Upcoming Events</span>
                  <span className="font-medium text-secondary">
                    {clubStats.upcomingEvents}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Active Applications
                  </span>
                  <span className="font-medium text-secondary">
                    {clubStats.activeApplications}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {isOwner ? (
                  <>
                    <button className="w-full bg-secondary text-white py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                      Create Event
                    </button>
                    <button className="w-full bg-muted text-muted-foreground py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors">
                      Manage Applications
                    </button>
                    <button className="w-full bg-muted text-muted-foreground py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors">
                      View Analytics
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full bg-secondary text-white py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                      Browse Events
                    </button>
                    <button className="w-full bg-muted text-muted-foreground py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors">
                      Contact Club
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Profile Page with Person/Club support
function ProfilePage() {
  const [userType, setUserType] = useState<"person" | "club">("person"); // This would come from auth
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Mock data - this would come from API
  const [personData, setPersonData] = useState({
    id: 1,
    email: "john.doe@stanford.edu",
    fullName: "John Doe",
    university: "Stanford University",
    phone: "+1 (555) 123-4567",
    major: "Computer Science",
    year: 3,
    city: "Palo Alto",
    imageUrl: null,
    membershipCount: 3,
    applicationCount: 2,
  });

  const [clubData, setClubData] = useState({
    id: 1,
    email: "contact@techclub.stanford.edu",
    name: "Stanford Tech Club",
    university: "Stanford University",
    address: "1600 Amphitheatre Parkway, Mountain View, CA",
    description:
      "A community of technology enthusiasts at Stanford University. We organize hackathons, tech talks, and networking events.",
    phone: "+1 (555) 987-6543",
    imageUrl: null,
    memberCount: 156,
    eventCount: 12,
  });

  const [editFormData, setEditFormData] = useState(
    userType === "person" ? { ...personData } : { ...clubData },
  );

  const handleSave = () => {
    if (userType === "person") {
      setPersonData({ ...editFormData });
    } else {
      setClubData({ ...editFormData });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditFormData(
      userType === "person" ? { ...personData } : { ...clubData },
    );
    setIsEditing(false);
  };

  const currentData = userType === "person" ? personData : clubData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold">
            {userType === "person"
              ? personData.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : clubData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {userType === "person" ? personData.fullName : clubData.name}
            </h1>
            <p className="text-muted-foreground">
              {userType === "person"
                ? `${personData.major} • Year ${personData.year} • ${personData.university}`
                : `${clubData.university} • ${clubData.memberCount} members`}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-secondary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors flex items-center space-x-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {["profile", "activity", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                activeTab === tab
                  ? "border-secondary text-secondary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  {userType === "person"
                    ? "Personal Information"
                    : "Organization Information"}
                </h2>
                {isEditing && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1.5 text-sm border border-muted rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1.5 text-sm bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userType === "person" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.fullName || ""}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              fullName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      ) : (
                        <p className="text-foreground">{personData.fullName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <p className="text-foreground">{personData.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        University
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.university || ""}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              university: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      ) : (
                        <p className="text-foreground">
                          {personData.university}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Major
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.major || ""}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              major: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      ) : (
                        <p className="text-foreground">{personData.major}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Year
                      </label>
                      {isEditing ? (
                        <select
                          value={editFormData.year || ""}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              year: parseInt(e.target.value),
                            })
                          }
                          className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        >
                          <option value={1}>Year 1</option>
                          <option value={2}>Year 2</option>
                          <option value={3}>Year 3</option>
                          <option value={4}>Year 4</option>
                          <option value={5}>Year 5+</option>
                        </select>
                      ) : (
                        <p className="text-foreground">
                          Year {personData.year}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        City
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.city || ""}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              city: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      ) : (
                        <p className="text-foreground">{personData.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editFormData.phone || ""}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      ) : (
                        <p className="text-foreground">{personData.phone}</p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Organization Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.name || ""}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      ) : (
                        <p className="text-foreground">{clubData.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <p className="text-foreground">{clubData.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        University
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.university || ""}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              university: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      ) : (
                        <p className="text-foreground">{clubData.university}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editFormData.phone || ""}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      ) : (
                        <p className="text-foreground">{clubData.phone}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Address
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.address || ""}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              address: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      ) : (
                        <p className="text-foreground">{clubData.address}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Description
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editFormData.description || ""}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              description: e.target.value,
                            })
                          }
                          rows={4}
                          className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      ) : (
                        <p className="text-foreground">
                          {clubData.description}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Statistics
              </h3>
              <div className="space-y-4">
                {userType === "person" ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Club Memberships
                      </span>
                      <span className="font-medium text-secondary">
                        {personData.membershipCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Applications
                      </span>
                      <span className="font-medium text-secondary">
                        {personData.applicationCount}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Total Members
                      </span>
                      <span className="font-medium text-secondary">
                        {clubData.memberCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Events Hosted
                      </span>
                      <span className="font-medium text-secondary">
                        {clubData.eventCount}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {userType === "person" ? (
                  <>
                    <button className="w-full bg-secondary text-white py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                      Browse Clubs
                    </button>
                    <button className="w-full bg-muted text-muted-foreground py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors">
                      My Applications
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full bg-secondary text-white py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                      Create Event
                    </button>
                    <button className="w-full bg-muted text-muted-foreground py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors">
                      Manage Members
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Recent Activity
          </h2>
          <p className="text-muted-foreground">Activity feed coming soon...</p>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Account Settings
          </h2>
          <p className="text-muted-foreground">Settings panel coming soon...</p>
        </div>
      )}
    </div>
  );
}

// Applications Page
function ApplicationsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Mock applications data based on your database model
  const applications = [
    {
      id: 1,
      user_id: 1,
      event_id: 1,
      motivation:
        "I'm passionate about technology and innovation. This summit aligns perfectly with my career goals in software development. I want to network with like-minded individuals and learn from industry experts.",
      submitted_at: "2024-12-01T10:30:00Z",
      status: "PENDING",
      event: {
        title: "Tech Innovation Summit 2024",
        date: "2024-12-15",
        time: "9:00 AM - 5:00 PM",
        location: "Main Auditorium",
        club: "Tech Innovators Club",
        clubId: 1,
        price: 0,
      },
    },
    {
      id: 2,
      user_id: 1,
      event_id: 4,
      motivation:
        "I have 2 years of React experience and want to learn advanced patterns to improve my development skills. This workshop would help me advance in my career.",
      submitted_at: "2024-11-25T14:15:00Z",
      status: "ACCEPTED",
      event: {
        title: "React Workshop: Advanced Patterns",
        date: "2024-12-22",
        time: "2:00 PM - 6:00 PM",
        location: "Computer Lab A",
        club: "Tech Innovators Club",
        clubId: 1,
        price: 25,
      },
    },
    {
      id: 3,
      user_id: 1,
      event_id: 3,
      motivation:
        "As an aspiring entrepreneur, I'm looking for investment opportunities and mentorship. I have a tech startup idea that I'd love to pitch.",
      submitted_at: "2024-11-20T09:45:00Z",
      status: "REJECTED",
      event: {
        title: "Startup Pitch Competition",
        date: "2024-12-18",
        time: "7:00 PM - 10:00 PM",
        location: "Innovation Lab",
        club: "Entrepreneur Society",
        clubId: 3,
        price: 15,
      },
    },
    {
      id: 4,
      user_id: 1,
      event_id: 5,
      motivation:
        "I'm interested in AI and machine learning applications. This meetup would help me connect with others in the field and share knowledge.",
      submitted_at: "2024-12-05T16:20:00Z",
      status: "PENDING",
      event: {
        title: "AI & Machine Learning Meetup",
        date: "2025-01-08",
        time: "6:00 PM - 8:00 PM",
        location: "Innovation Hub",
        club: "AI Research Club",
        clubId: 4,
        price: 0,
      },
    },
    {
      id: 5,
      user_id: 1,
      event_id: 6,
      motivation:
        "I appreciate local art and want to support the community. This exhibition would be a great way to discover new artists and their work.",
      submitted_at: "2024-11-30T11:00:00Z",
      status: "ACCEPTED",
      event: {
        title: "Community Art Exhibition",
        date: "2024-12-28",
        time: "6:00 PM - 9:00 PM",
        location: "City Gallery",
        club: "Local Artists Guild",
        clubId: 6,
        price: 0,
      },
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-warning/10 text-warning border-warning/20";
      case "ACCEPTED":
        return "bg-success/10 text-success border-success/20";
      case "REJECTED":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return "⏳";
      case "ACCEPTED":
        return "✅";
      case "REJECTED":
        return "❌";
      default:
        return "📋";
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (activeFilter === "all") return true;
    return app.status.toLowerCase() === activeFilter.toLowerCase();
  });

  const statusCounts = {
    all: applications.length,
    pending: applications.filter((app) => app.status === "PENDING").length,
    accepted: applications.filter((app) => app.status === "ACCEPTED").length,
    rejected: applications.filter((app) => app.status === "REJECTED").length,
  };

  const handleWithdrawApplication = (applicationId) => {
    // This would make an API call to withdraw the application
    console.log("Withdrawing application:", applicationId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            My Applications
          </h1>
          <p className="text-muted-foreground">
            Track and manage your event applications
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-secondary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors flex items-center space-x-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Browse Events</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-border text-center">
          <p className="text-2xl font-bold text-secondary">
            {statusCounts.all}
          </p>
          <p className="text-sm text-muted-foreground">Total Applications</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-border text-center">
          <p className="text-2xl font-bold text-warning">
            {statusCounts.pending}
          </p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-border text-center">
          <p className="text-2xl font-bold text-success">
            {statusCounts.accepted}
          </p>
          <p className="text-sm text-muted-foreground">Accepted</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-border text-center">
          <p className="text-2xl font-bold text-destructive">
            {statusCounts.rejected}
          </p>
          <p className="text-sm text-muted-foreground">Rejected</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: "all", label: "All Applications", count: statusCounts.all },
            { key: "pending", label: "Pending", count: statusCounts.pending },
            {
              key: "accepted",
              label: "Accepted",
              count: statusCounts.accepted,
            },
            {
              key: "rejected",
              label: "Rejected",
              count: statusCounts.rejected,
            },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeFilter === filter.key
                  ? "bg-secondary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span>{filter.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.key
                    ? "bg-white/20 text-white"
                    : "bg-background text-muted-foreground"
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No applications found
              </h3>
              <p className="text-muted-foreground">
                {activeFilter === "all"
                  ? "You haven't submitted any applications yet."
                  : `No ${activeFilter} applications found.`}
              </p>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <div
                key={application.id}
                className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {application.event.title}
                        </h3>
                        <Link
                          to={`/clubs/${application.event.clubId}`}
                          className="text-sm text-secondary hover:text-secondary/80"
                        >
                          by {application.event.club}
                        </Link>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}
                      >
                        {getStatusIcon(application.status)} {application.status}
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon />
                          <span>
                            {new Date(
                              application.event.date,
                            ).toLocaleDateString()}{" "}
                            • {application.event.time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <LocationIcon />
                          <span>{application.event.location}</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>
                            Applied{" "}
                            {new Date(
                              application.submitted_at,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">💰</span>
                          <span>
                            {application.event.price === 0
                              ? "Free"
                              : `$${application.event.price}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Motivation */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Motivation
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg">
                        {application.motivation}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 min-w-[140px]">
                    <Link
                      to={`/events/${application.event_id}`}
                      className="bg-secondary text-white px-4 py-2 rounded-lg font-medium text-center hover:bg-secondary/90 transition-colors text-sm"
                    >
                      View Event
                    </Link>
                    {application.status === "PENDING" && (
                      <button
                        onClick={() =>
                          handleWithdrawApplication(application.id)
                        }
                        className="bg-muted text-muted-foreground px-4 py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors text-sm"
                      >
                        Withdraw
                      </button>
                    )}
                    {application.status === "ACCEPTED" && (
                      <span className="bg-success/10 text-success px-4 py-2 rounded-lg font-medium text-center text-sm">
                        Approved ✨
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Club Management Page
function ClubManagementPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditingClub, setIsEditingClub] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingApplications, setViewingApplications] = useState(null);
  const [editEventData, setEditEventData] = useState(null);
  const [newEventData, setNewEventData] = useState({
    name: "",
    event_type: "WORKSHOP",
    date_start: "",
    date_end: "",
    venue: "",
    description: "",
    content: "",
    status: "UPCOMING",
    maxAttendees: 100,
    price: 0,
  });

  // Mock club data based on database model
  const [clubData, setClubData] = useState({
    id: 1,
    user_id: 1,
    name: "Tech Innovators Club",
    university: "Stanford University",
    address: "1600 Amphitheatre Parkway, Mountain View, CA 94043",
    description:
      "A vibrant community of developers, designers, and tech enthusiasts passionate about innovation and cutting-edge technology.",
    phone: "+1 (555) 123-4567",
    image_url: null,
  });

  const [editClubData, setEditClubData] = useState({ ...clubData });

  // Club statistics
  const clubStats = {
    totalMembers: 247,
    totalEvents: 45,
    upcomingEvents: 8,
    pendingApplications: 23,
    thisMonthEvents: 3,
    totalRevenue: 2450,
  };

  // Mock events data based on Event model
  const [clubEvents, setClubEvents] = useState([
    {
      id: 1,
      name: "Tech Innovation Summit 2024",
      date_start: "2024-12-15T09:00:00Z",
      date_end: "2024-12-15T17:00:00Z",
      venue: "Main Auditorium",
      description:
        "Annual summit featuring the latest innovations in technology and startup ecosystem.",
      event_type: "CONFERENCE",
      content: "Technology",
      status: "UPCOMING",
      sheet: null,
      image_url: null,
      attendees: 124,
      maxAttendees: 200,
      price: 0,
      applications: 45,
    },
    {
      id: 2,
      name: "React Workshop: Advanced Patterns",
      date_start: "2024-12-22T14:00:00Z",
      date_end: "2024-12-22T18:00:00Z",
      venue: "Computer Lab A",
      description:
        "Deep dive into advanced React patterns including hooks, context, and performance optimization.",
      event_type: "WORKSHOP",
      content: "Frontend Development",
      status: "UPCOMING",
      sheet: null,
      image_url: null,
      attendees: 67,
      maxAttendees: 80,
      price: 25,
      applications: 89,
    },
    {
      id: 3,
      name: "Startup Pitch Night",
      date_start: "2024-11-30T19:00:00Z",
      date_end: "2024-11-30T22:00:00Z",
      venue: "Innovation Lab",
      description: "Monthly pitch competition for emerging startups.",
      event_type: "COMPETITION",
      content: "Entrepreneurship",
      status: "COMPLETED",
      sheet: null,
      image_url: null,
      attendees: 156,
      maxAttendees: 150,
      price: 15,
      applications: 78,
    },
  ]);

  // Mock applications data
  const [applications, setApplications] = useState([
    {
      id: 1,
      user_id: 5,
      event_id: 1,
      motivation:
        "I'm passionate about technology and innovation. This summit aligns perfectly with my career goals.",
      submitted_at: "2024-12-01T10:30:00Z",
      status: "PENDING",
      applicant: {
        name: "Sarah Johnson",
        email: "sarah.j@stanford.edu",
        major: "Computer Science",
        year: 3,
      },
      event: {
        name: "Tech Innovation Summit 2024",
        date: "2024-12-15",
      },
    },
    {
      id: 2,
      user_id: 6,
      event_id: 2,
      motivation:
        "I have 2 years of React experience and want to learn advanced patterns to improve my development skills.",
      submitted_at: "2024-11-25T14:15:00Z",
      status: "PENDING",
      applicant: {
        name: "Mike Chen",
        email: "mike.c@stanford.edu",
        major: "Software Engineering",
        year: 2,
      },
      event: {
        name: "React Workshop: Advanced Patterns",
        date: "2024-12-22",
      },
    },
    {
      id: 3,
      user_id: 7,
      event_id: 1,
      motivation:
        "As a senior CS student, I'm interested in the latest tech trends and networking opportunities.",
      submitted_at: "2024-12-02T09:45:00Z",
      status: "ACCEPTED",
      applicant: {
        name: "Emily Davis",
        email: "emily.d@stanford.edu",
        major: "Computer Science",
        year: 4,
      },
      event: {
        name: "Tech Innovation Summit 2024",
        date: "2024-12-15",
      },
    },
  ]);

  const handleAcceptApplication = (applicationId) => {
    setApplications((apps) =>
      apps.map((app) =>
        app.id === applicationId ? { ...app, status: "ACCEPTED" } : app,
      ),
    );
  };

  const handleRejectApplication = (applicationId) => {
    setApplications((apps) =>
      apps.map((app) =>
        app.id === applicationId ? { ...app, status: "REJECTED" } : app,
      ),
    );
  };

  const handleSaveClub = () => {
    setClubData({ ...editClubData });
    setIsEditingClub(false);
  };

  const handleCancelEditClub = () => {
    setEditClubData({ ...clubData });
    setIsEditingClub(false);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event.id);
    setEditEventData({ ...event });
  };

  const handleSaveEvent = () => {
    setClubEvents((events) =>
      events.map((event) =>
        event.id === editingEvent ? { ...editEventData } : event,
      ),
    );
    setEditingEvent(null);
    setEditEventData(null);
  };

  const handleCancelEditEvent = () => {
    setEditingEvent(null);
    setEditEventData(null);
  };

  const handleViewApplications = (eventId) => {
    setViewingApplications(eventId);
  };

  const handleCloseViewApplications = () => {
    setViewingApplications(null);
  };

  const handleCreateEvent = () => {
    const newEvent = {
      id: Math.max(...clubEvents.map((e) => e.id)) + 1,
      ...newEventData,
      club_id: clubData.id,
      attendees: 0,
      applications: 0,
      sheet: null,
      image_url: null,
    };

    setClubEvents((events) => [...events, newEvent]);
    setIsCreatingEvent(false);
    setNewEventData({
      name: "",
      event_type: "WORKSHOP",
      date_start: "",
      date_end: "",
      venue: "",
      description: "",
      content: "",
      status: "UPCOMING",
      maxAttendees: 100,
      price: 0,
    });
  };

  const handleCancelCreateEvent = () => {
    setIsCreatingEvent(false);
    setNewEventData({
      name: "",
      event_type: "WORKSHOP",
      date_start: "",
      date_end: "",
      venue: "",
      description: "",
      content: "",
      status: "UPCOMING",
      maxAttendees: 100,
      price: 0,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "UPCOMING":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "COMPLETED":
        return "bg-success/10 text-success border-success/20";
      case "CANCELLED":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getApplicationStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-warning/10 text-warning border-warning/20";
      case "ACCEPTED":
        return "bg-success/10 text-success border-success/20";
      case "REJECTED":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold">
            {clubData.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {clubData.name}
            </h1>
            <p className="text-muted-foreground">
              {clubData.university} • {clubStats.totalMembers} members
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsEditingClub(!isEditingClub)}
            className="bg-muted text-muted-foreground px-4 py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors flex items-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span>{isEditingClub ? "Cancel" : "Edit Club"}</span>
          </button>
          <button
            onClick={() => setIsCreatingEvent(true)}
            className="bg-secondary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors flex items-center space-x-2"
          >
            <PlusIcon />
            <span>Create Event</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {["dashboard", "events", "applications", "members", "settings"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? "border-secondary text-secondary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-xl border border-border text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <UsersIcon />
                </div>
                <p className="text-2xl font-bold text-secondary">
                  {clubStats.totalMembers}
                </p>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-xs text-success mt-1">↗ +12% this month</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-border text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CalendarIcon />
                </div>
                <p className="text-2xl font-bold text-secondary">
                  {clubStats.upcomingEvents}
                </p>
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
                <p className="text-xs text-success mt-1">↗ +3 scheduled</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-border text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-warning/5 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DocumentIcon />
                </div>
                <p className="text-2xl font-bold text-warning">
                  {clubStats.pendingApplications}
                </p>
                <p className="text-sm text-muted-foreground">
                  Pending Applications
                </p>
                <p className="text-xs text-warning mt-1">⏰ Needs review</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-border text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-success/5 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-6 h-6 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-success">
                  {clubStats.thisMonthEvents}
                </p>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-xs text-success mt-1">✓ All completed</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-border text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-secondary">
                  {clubStats.totalEvents}
                </p>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-xs text-secondary mt-1">📊 All time</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-border text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-success/5 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-6 h-6 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-success">
                  ${clubStats.totalRevenue}
                </p>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-xs text-success mt-1">💰 This year</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Event Performance Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Event Performance
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Member participation over time
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs bg-secondary text-white rounded-full">
                    6M
                  </button>
                  <button className="px-3 py-1 text-xs text-muted-foreground hover:bg-muted rounded-full">
                    1Y
                  </button>
                  <button className="px-3 py-1 text-xs text-muted-foreground hover:bg-muted rounded-full">
                    All
                  </button>
                </div>
              </div>

              {/* Simple Chart Representation */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Jan 2024</span>
                  <div className="flex-1 mx-4 bg-muted rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <span className="text-foreground font-medium">156</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Feb 2024</span>
                  <div className="flex-1 mx-4 bg-muted rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                  <span className="text-foreground font-medium">198</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Mar 2024</span>
                  <div className="flex-1 mx-4 bg-muted rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <span className="text-foreground font-medium">112</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Apr 2024</span>
                  <div className="flex-1 mx-4 bg-muted rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                  <span className="text-foreground font-medium">234</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">May 2024</span>
                  <div className="flex-1 mx-4 bg-muted rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <span className="text-foreground font-medium">189</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Jun 2024</span>
                  <div className="flex-1 mx-4 bg-muted rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: "88%" }}
                    ></div>
                  </div>
                  <span className="text-foreground font-medium">221</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                <span>Average attendance: 185 members</span>
                <span className="text-success">
                  ↗ 15% increase vs last period
                </span>
              </div>
            </div>

            {/* Member Activity Distribution */}
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Member Activity
              </h3>

              {/* Simple Pie Chart Representation */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-success rounded"></div>
                    <span className="text-sm text-foreground">Very Active</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    45%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-secondary rounded"></div>
                    <span className="text-sm text-foreground">Active</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    35%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-warning rounded"></div>
                    <span className="text-sm text-foreground">Moderate</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    15%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-muted rounded"></div>
                    <span className="text-sm text-foreground">Inactive</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    5%
                  </span>
                </div>
              </div>

              {/* Visual representation */}
              <div className="mt-6">
                <div className="flex rounded-full h-3 overflow-hidden">
                  <div className="bg-success" style={{ width: "45%" }}></div>
                  <div className="bg-secondary" style={{ width: "35%" }}></div>
                  <div className="bg-warning" style={{ width: "15%" }}></div>
                  <div className="bg-muted" style={{ width: "5%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Based on event attendance & engagement
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Events */}
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Recent Events
                </h2>
                <button
                  onClick={() => setActiveTab("events")}
                  className="text-secondary hover:text-secondary/80 text-sm font-medium"
                >
                  View all →
                </button>
              </div>
              <div className="space-y-3">
                {clubEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="flex justify-between items-center p-3 border border-border rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {event.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date_start).toLocaleDateString()} •{" "}
                        {event.attendees} attendees
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}
                    >
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Applications */}
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Pending Applications
                </h2>
                <button
                  onClick={() => setActiveTab("applications")}
                  className="text-secondary hover:text-secondary/80 text-sm font-medium"
                >
                  View all →
                </button>
              </div>
              <div className="space-y-3">
                {applications
                  .filter((app) => app.status === "PENDING")
                  .slice(0, 3)
                  .map((application) => (
                    <div
                      key={application.id}
                      className="flex justify-between items-center p-3 border border-border rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {application.applicant.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {application.event.name}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleAcceptApplication(application.id)
                          }
                          className="bg-success text-white px-2 py-1 rounded text-xs hover:bg-success/90"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleRejectApplication(application.id)
                          }
                          className="bg-destructive text-white px-2 py-1 rounded text-xs hover:bg-destructive/90"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Event Management
            </h2>
            <button
              onClick={() => setIsCreatingEvent(true)}
              className="bg-secondary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
            >
              Create Event
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {clubEvents.map((event) => (
              <div
                key={event.id}
                className="border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {event.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {event.event_type} • {event.content}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}
                  >
                    {event.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon />
                    <span>
                      {new Date(event.date_start).toLocaleDateString()} -{" "}
                      {new Date(event.date_end).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <LocationIcon />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UsersIcon />
                    <span>
                      {event.attendees}/{event.maxAttendees} attendees
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📋</span>
                    <span>{event.applications} applications</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="flex-1 bg-secondary text-white py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors text-sm"
                  >
                    Edit Event
                  </button>
                  <button
                    onClick={() => handleViewApplications(event.id)}
                    className="flex-1 bg-muted text-muted-foreground py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors text-sm"
                  >
                    View Applications
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "applications" && (
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Application Management
          </h2>
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="border border-border rounded-xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {application.applicant.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {application.applicant.email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {application.applicant.major} • Year{" "}
                          {application.applicant.year}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getApplicationStatusColor(application.status)}`}
                      >
                        {application.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground mb-1">
                        Event: {application.event.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Applied:{" "}
                        {new Date(
                          application.submitted_at,
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Motivation
                      </h4>
                      <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                        {application.motivation}
                      </p>
                    </div>
                  </div>

                  {application.status === "PENDING" && (
                    <div className="flex space-x-2 min-w-[200px]">
                      <button
                        onClick={() => handleAcceptApplication(application.id)}
                        className="flex-1 bg-success text-white py-2 rounded-lg font-medium hover:bg-success/90 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectApplication(application.id)}
                        className="flex-1 bg-destructive text-white py-2 rounded-lg font-medium hover:bg-destructive/90 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "members" && (
        <div className="space-y-6">
          {/* Members Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-border text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p className="text-2xl font-bold text-secondary">
                {clubStats.totalMembers}
              </p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-border text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-6 h-6 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <p className="text-2xl font-bold text-success">23</p>
              <p className="text-sm text-muted-foreground">New This Month</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-border text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-6 h-6 text-warning"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <p className="text-2xl font-bold text-warning">89%</p>
              <p className="text-sm text-muted-foreground">Active Rate</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <p className="text-2xl font-bold text-primary">15</p>
              <p className="text-sm text-muted-foreground">Organizers</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Club Members
              </h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search members..."
                    className="pl-10 pr-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all w-64"
                  />
                  <svg
                    className="w-4 h-4 text-muted-foreground absolute left-3 top-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <select className="px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary">
                  <option>All Roles</option>
                  <option>Organizers</option>
                  <option>Members</option>
                </select>
                <button className="bg-secondary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                  Add Member
                </button>
              </div>
            </div>

            {/* Enhanced Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[
                {
                  id: 1,
                  name: "Alice Johnson",
                  email: "alice.j@stanford.edu",
                  major: "Computer Science",
                  year: 3,
                  role: "President",
                  avatar: "A",
                  joinDate: "2023-09-15",
                  eventsAttended: 12,
                  status: "active",
                },
                {
                  id: 2,
                  name: "Bob Chen",
                  email: "bob.c@stanford.edu",
                  major: "Software Engineering",
                  year: 2,
                  role: "VP Technology",
                  avatar: "B",
                  joinDate: "2023-10-02",
                  eventsAttended: 8,
                  status: "active",
                },
                {
                  id: 3,
                  name: "Carol Davis",
                  email: "carol.d@stanford.edu",
                  major: "Data Science",
                  year: 4,
                  role: "Event Coordinator",
                  avatar: "C",
                  joinDate: "2023-08-20",
                  eventsAttended: 15,
                  status: "active",
                },
                {
                  id: 4,
                  name: "David Wilson",
                  email: "david.w@stanford.edu",
                  major: "Computer Science",
                  year: 1,
                  role: "Member",
                  avatar: "D",
                  joinDate: "2024-01-10",
                  eventsAttended: 3,
                  status: "active",
                },
                {
                  id: 5,
                  name: "Eva Martinez",
                  email: "eva.m@stanford.edu",
                  major: "Information Systems",
                  year: 3,
                  role: "Member",
                  avatar: "E",
                  joinDate: "2023-11-15",
                  eventsAttended: 7,
                  status: "active",
                },
                {
                  id: 6,
                  name: "Frank Thompson",
                  email: "frank.t@stanford.edu",
                  major: "AI/ML",
                  year: 2,
                  role: "Member",
                  avatar: "F",
                  joinDate: "2024-02-01",
                  eventsAttended: 2,
                  status: "inactive",
                },
                {
                  id: 7,
                  name: "Grace Lee",
                  email: "grace.l@stanford.edu",
                  major: "Cybersecurity",
                  year: 4,
                  role: "Security Lead",
                  avatar: "G",
                  joinDate: "2023-09-30",
                  eventsAttended: 11,
                  status: "active",
                },
                {
                  id: 8,
                  name: "Henry Kim",
                  email: "henry.k@stanford.edu",
                  major: "Web Development",
                  year: 2,
                  role: "Member",
                  avatar: "H",
                  joinDate: "2024-01-20",
                  eventsAttended: 4,
                  status: "active",
                },
              ].map((member) => (
                <div
                  key={member.id}
                  className="border border-border rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-secondary/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white font-bold">
                        {member.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {member.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${member.status === "active" ? "bg-success" : "bg-muted"}`}
                      title={member.status}
                    ></div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Major:</span>
                      <span className="font-medium text-foreground">
                        {member.major}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Year:</span>
                      <span className="font-medium text-foreground">
                        {member.year}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Events:</span>
                      <span className="font-medium text-secondary">
                        {member.eventsAttended}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Joined:</span>
                      <span className="font-medium text-foreground">
                        {new Date(member.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.role === "President" ||
                        member.role === "VP Technology" ||
                        member.role === "Event Coordinator" ||
                        member.role === "Security Lead"
                          ? "bg-secondary/10 text-secondary border border-secondary/20"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {member.role}
                    </span>

                    <div className="flex space-x-1">
                      <button
                        className="text-muted-foreground hover:text-secondary transition-colors p-1"
                        title="Edit member"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        title="Remove member"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-6">
              <button className="bg-muted text-muted-foreground px-6 py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors">
                Load More Members
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Club Settings
            </h2>
            {isEditingClub && (
              <div className="flex space-x-2">
                <button
                  onClick={handleCancelEditClub}
                  className="px-3 py-1.5 text-sm border border-muted rounded-lg hover:bg-muted/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveClub}
                  className="px-3 py-1.5 text-sm bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Club Name
              </label>
              {isEditingClub ? (
                <input
                  type="text"
                  value={editClubData.name}
                  onChange={(e) =>
                    setEditClubData({ ...editClubData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                />
              ) : (
                <p className="text-foreground">{clubData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                University
              </label>
              {isEditingClub ? (
                <input
                  type="text"
                  value={editClubData.university}
                  onChange={(e) =>
                    setEditClubData({
                      ...editClubData,
                      university: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                />
              ) : (
                <p className="text-foreground">{clubData.university}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone
              </label>
              {isEditingClub ? (
                <input
                  type="tel"
                  value={editClubData.phone}
                  onChange={(e) =>
                    setEditClubData({ ...editClubData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                />
              ) : (
                <p className="text-foreground">{clubData.phone}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Address
              </label>
              {isEditingClub ? (
                <input
                  type="text"
                  value={editClubData.address}
                  onChange={(e) =>
                    setEditClubData({
                      ...editClubData,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                />
              ) : (
                <p className="text-foreground">{clubData.address}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              {isEditingClub ? (
                <textarea
                  value={editClubData.description}
                  onChange={(e) =>
                    setEditClubData({
                      ...editClubData,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                />
              ) : (
                <p className="text-foreground">{clubData.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {editingEvent && editEventData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-foreground">
                  Edit Event
                </h2>
                <button
                  onClick={handleCancelEditEvent}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={editEventData.name}
                    onChange={(e) =>
                      setEditEventData({
                        ...editEventData,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Event Type
                  </label>
                  <select
                    value={editEventData.event_type}
                    onChange={(e) =>
                      setEditEventData({
                        ...editEventData,
                        event_type: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  >
                    <option value="CONFERENCE">Conference</option>
                    <option value="WORKSHOP">Workshop</option>
                    <option value="SEMINAR">Seminar</option>
                    <option value="COMPETITION">Competition</option>
                    <option value="NETWORKING">Networking</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={
                      editEventData.date_start
                        ? new Date(editEventData.date_start)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    onChange={(e) =>
                      setEditEventData({
                        ...editEventData,
                        date_start: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={
                      editEventData.date_end
                        ? new Date(editEventData.date_end)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    onChange={(e) =>
                      setEditEventData({
                        ...editEventData,
                        date_end: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Venue
                  </label>
                  <input
                    type="text"
                    value={editEventData.venue}
                    onChange={(e) =>
                      setEditEventData({
                        ...editEventData,
                        venue: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Content Category
                  </label>
                  <input
                    type="text"
                    value={editEventData.content}
                    onChange={(e) =>
                      setEditEventData({
                        ...editEventData,
                        content: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Status
                  </label>
                  <select
                    value={editEventData.status}
                    onChange={(e) =>
                      setEditEventData({
                        ...editEventData,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  >
                    <option value="UPCOMING">Upcoming</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Max Attendees
                  </label>
                  <input
                    type="number"
                    value={editEventData.maxAttendees}
                    onChange={(e) =>
                      setEditEventData({
                        ...editEventData,
                        maxAttendees: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={editEventData.description}
                  onChange={(e) =>
                    setEditEventData({
                      ...editEventData,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                />
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <button
                onClick={handleCancelEditEvent}
                className="px-4 py-2 border border-muted rounded-lg hover:bg-muted/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvent}
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Applications Modal */}
      {viewingApplications && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Event Applications
                  </h2>
                  <p className="text-muted-foreground">
                    {clubEvents.find((e) => e.id === viewingApplications)?.name}
                  </p>
                </div>
                <button
                  onClick={handleCloseViewApplications}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 flex space-x-2">
                <span className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm">
                  Pending:{" "}
                  {
                    applications.filter(
                      (app) =>
                        app.event_id === viewingApplications &&
                        app.status === "PENDING",
                    ).length
                  }
                </span>
                <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm">
                  Accepted:{" "}
                  {
                    applications.filter(
                      (app) =>
                        app.event_id === viewingApplications &&
                        app.status === "ACCEPTED",
                    ).length
                  }
                </span>
                <span className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm">
                  Rejected:{" "}
                  {
                    applications.filter(
                      (app) =>
                        app.event_id === viewingApplications &&
                        app.status === "REJECTED",
                    ).length
                  }
                </span>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {applications
                  .filter((app) => app.event_id === viewingApplications)
                  .map((application) => (
                    <div
                      key={application.id}
                      className="border border-border rounded-xl p-4"
                    >
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {application.applicant.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {application.applicant.email}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {application.applicant.major} • Year{" "}
                                {application.applicant.year}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium border ${getApplicationStatusColor(application.status)}`}
                            >
                              {application.status}
                            </span>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm text-muted-foreground">
                              Applied:{" "}
                              {new Date(
                                application.submitted_at,
                              ).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-foreground mb-2">
                              Motivation
                            </h4>
                            <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                              {application.motivation}
                            </p>
                          </div>
                        </div>

                        {application.status === "PENDING" && (
                          <div className="flex space-x-2 min-w-[160px]">
                            <button
                              onClick={() =>
                                handleAcceptApplication(application.id)
                              }
                              className="flex-1 bg-success text-white py-2 px-3 rounded-lg font-medium hover:bg-success/90 transition-colors text-sm"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleRejectApplication(application.id)
                              }
                              className="flex-1 bg-destructive text-white py-2 px-3 rounded-lg font-medium hover:bg-destructive/90 transition-colors text-sm"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                {applications.filter(
                  (app) => app.event_id === viewingApplications,
                ).length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No applications yet
                    </h3>
                    <p className="text-muted-foreground">
                      This event hasn't received any applications.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {isCreatingEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-foreground">
                  Create New Event
                </h2>
                <button
                  onClick={handleCancelCreateEvent}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    value={newEventData.name}
                    onChange={(e) =>
                      setNewEventData({ ...newEventData, name: e.target.value })
                    }
                    placeholder="Enter event name"
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Event Type *
                  </label>
                  <select
                    value={newEventData.event_type}
                    onChange={(e) =>
                      setNewEventData({
                        ...newEventData,
                        event_type: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  >
                    <option value="WORKSHOP">Workshop</option>
                    <option value="CONFERENCE">Conference</option>
                    <option value="SEMINAR">Seminar</option>
                    <option value="COMPETITION">Competition</option>
                    <option value="NETWORKING">Networking</option>
                    <option value="HACKATHON">Hackathon</option>
                    <option value="EXHIBITION">Exhibition</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Start Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={newEventData.date_start}
                    onChange={(e) =>
                      setNewEventData({
                        ...newEventData,
                        date_start: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    End Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={newEventData.date_end}
                    onChange={(e) =>
                      setNewEventData({
                        ...newEventData,
                        date_end: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Venue *
                  </label>
                  <input
                    type="text"
                    value={newEventData.venue}
                    onChange={(e) =>
                      setNewEventData({
                        ...newEventData,
                        venue: e.target.value,
                      })
                    }
                    placeholder="Enter venue location"
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Content Category
                  </label>
                  <input
                    type="text"
                    value={newEventData.content}
                    onChange={(e) =>
                      setNewEventData({
                        ...newEventData,
                        content: e.target.value,
                      })
                    }
                    placeholder="e.g., Technology, Business, Arts"
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Max Attendees
                  </label>
                  <input
                    type="number"
                    value={newEventData.maxAttendees}
                    onChange={(e) =>
                      setNewEventData({
                        ...newEventData,
                        maxAttendees: parseInt(e.target.value) || 0,
                      })
                    }
                    min="1"
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ticket Price ($)
                  </label>
                  <input
                    type="number"
                    value={newEventData.price}
                    onChange={(e) =>
                      setNewEventData({
                        ...newEventData,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    min="0"
                    step="0.01"
                    placeholder="0 for free events"
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Event Description *
                </label>
                <textarea
                  value={newEventData.description}
                  onChange={(e) =>
                    setNewEventData({
                      ...newEventData,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Describe what attendees can expect from this event..."
                  className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  required
                />
              </div>

              {/* Event Preview */}
              <div className="bg-secondary/5 border border-secondary/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span>Event Preview</span>
                </h3>
                <div className="text-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium text-foreground">
                      {newEventData.name || "Enter event name"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="text-secondary font-medium">
                      {newEventData.event_type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">When:</span>
                    <span className="font-medium text-foreground">
                      {newEventData.date_start
                        ? new Date(newEventData.date_start).toLocaleDateString()
                        : "Select date"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Where:</span>
                    <span className="font-medium text-foreground">
                      {newEventData.venue || "Enter venue"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-bold text-success">
                      {newEventData.price === 0
                        ? "Free"
                        : `$${newEventData.price}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="font-medium text-foreground">
                      {newEventData.maxAttendees} attendees
                    </span>
                  </div>
                </div>
              </div>

              {/* Validation messages */}
              {(!newEventData.name ||
                !newEventData.date_start ||
                !newEventData.date_end ||
                !newEventData.venue ||
                !newEventData.description) && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-warning"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <span className="text-sm text-warning">
                      Please fill in all required fields (marked with *)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <button
                onClick={handleCancelCreateEvent}
                className="px-4 py-2 border border-muted rounded-lg hover:bg-muted/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                disabled={
                  !newEventData.name ||
                  !newEventData.date_start ||
                  !newEventData.date_end ||
                  !newEventData.venue ||
                  !newEventData.description
                }
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Create Event</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <p className="text-muted-foreground">Settings page - coming soon</p>
      </div>
    </div>
  );
}

// Login page (outside of sidebar layout)
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login API call to POST /auth/login/
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <div className="flex items-center justify-center py-12 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-border">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground">
              Sign in to your EventHub account
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-muted-foreground">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-secondary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-secondary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Registration Page with Person/Club Selection
function RegisterPage() {
  const [step, setStep] = useState<"select-type" | "register">("select-type");
  const [userType, setUserType] = useState<"person" | "club" | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    clubName: "",
    description: "",
  });

  const handleTypeSelect = (type: "person" | "club") => {
    setUserType(type);
    setStep("register");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const endpoint =
      userType === "person" ? "/auth/register/person/" : "/auth/register/club/";

    const payload =
      userType === "person"
        ? {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
          }
        : {
            email: formData.email,
            password: formData.password,
            clubName: formData.clubName,
            description: formData.description,
          };

    // TODO: Implement API call to respective endpoint
    console.log(`Registration for ${userType}:`, { endpoint, payload });
  };

  if (step === "select-type") {
    return (
      <div className="min-h-screen bg-background">
        <TopNavbar />
        <div className="flex items-center justify-center py-12 px-4">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full border border-border">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Join EventHub
              </h2>
              <p className="text-muted-foreground">
                Choose your account type to get started
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Person Registration */}
              <button
                onClick={() => handleTypeSelect("person")}
                className="p-6 border-2 border-muted rounded-xl hover:border-secondary hover:bg-secondary/5 transition-all text-left group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <UserIcon />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Individual
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Personal Account
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Join as an individual to discover events, apply to attend, and
                  connect with clubs in your community.
                </p>
                <div className="mt-4 flex items-center text-xs text-secondary">
                  <CheckIcon />
                  <span className="ml-1">Browse & apply to events</span>
                </div>
                <div className="mt-1 flex items-center text-xs text-secondary">
                  <CheckIcon />
                  <span className="ml-1">Join clubs & communities</span>
                </div>
              </button>

              {/* Club Registration */}
              <button
                onClick={() => handleTypeSelect("club")}
                className="p-6 border-2 border-muted rounded-xl hover:border-secondary hover:bg-secondary/5 transition-all text-left group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <UsersIcon />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Club / Organization
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Organization Account
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Register your club to create and manage events, review
                  applications, and build your community.
                </p>
                <div className="mt-4 flex items-center text-xs text-secondary">
                  <CheckIcon />
                  <span className="ml-1">Create & manage events</span>
                </div>
                <div className="mt-1 flex items-center text-xs text-secondary">
                  <CheckIcon />
                  <span className="ml-1">Review applications</span>
                </div>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-secondary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <div className="flex items-center justify-center py-12 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-border">
          <div className="text-center mb-8">
            <button
              onClick={() => setStep("select-type")}
              className="flex items-center text-secondary hover:text-secondary/80 mb-4"
            >
              <ArrowLeftIcon />
              <span className="ml-1">Back</span>
            </button>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
              {userType === "person" ? <UserIcon /> : <UsersIcon />}
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Create {userType === "person" ? "Personal" : "Club"} Account
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {userType === "person" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Club Name
                  </label>
                  <input
                    type="text"
                    value={formData.clubName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        clubName: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Enter club name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Tell us about your club..."
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-secondary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="*"
            element={
              <PageLayout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/events/:id" element={<EventDetailsPage />} />
                  <Route path="/clubs" element={<ClubsPage />} />
                  <Route path="/clubs/:id" element={<ClubDetailsPage />} />
                  <Route path="/my-club" element={<ClubManagementPage />} />
                  <Route path="/applications" element={<ApplicationsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </PageLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
