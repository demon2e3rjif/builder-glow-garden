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
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userType, setUserType] = useState<"user" | "club">("user");

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
      name: "My Applications",
      path: "/applications",
      icon: DocumentIcon,
      show: userType === "user",
    },
    {
      name: "Manage Events",
      path: "/manage-events",
      icon: CogIcon,
      show: userType === "club",
    },
    {
      name: "Members",
      path: "/members",
      icon: UsersIcon,
      show: userType === "club",
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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      club: "Tech Innovators Club",
      clubId: 1,
      date: "Dec 15, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Convention Center, Downtown",
      attendees: 124,
      maxAttendees: 200,
      category: "Technology",
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
      date: "Dec 18, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Art Studio, Brooklyn",
      attendees: 45,
      maxAttendees: 50,
      category: "Arts",
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
      date: "Dec 20, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "Innovation Hub, Austin",
      attendees: 89,
      maxAttendees: 150,
      category: "Business",
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
      date: "Dec 22, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "University Campus, Seattle",
      attendees: 67,
      maxAttendees: 80,
      category: "Technology",
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
      date: "Dec 25, 2024",
      time: "1:00 PM - 5:00 PM",
      location: "Business Center, Portland",
      attendees: 92,
      maxAttendees: 120,
      category: "Business",
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
      date: "Dec 28, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "City Gallery, Chicago",
      attendees: 156,
      maxAttendees: 200,
      category: "Arts",
      description:
        "Showcase of local talent featuring paintings, sculptures, and digital art with artist meet-and-greets.",
      price: 0,
      status: "Open",
    },
  ];

  const categories = ["Technology", "Arts", "Business", "Sports", "Education"];
  const locations = [
    "Downtown",
    "Brooklyn",
    "Austin",
    "Seattle",
    "Portland",
    "Chicago",
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchesLocation =
      selectedLocation === "all" ||
      event.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground">
            Discover amazing events in your community
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2">
          <PlusIcon />
          <span>Create Event</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Filter Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
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
              Location
            </label>
            <select
              className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Sort By
            </label>
            <select
              className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="popularity">Popularity</option>
              <option value="price">Price</option>
            </select>
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
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-secondary text-xs px-2 py-1 rounded font-medium">
                    {event.category}
                  </span>
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
                    <span className="ml-2">{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon />
                    <span className="ml-2">{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <LocationIcon />
                    <span className="ml-2 truncate">{event.location}</span>
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

  const club = {
    id: 1,
    name: "Tech Innovators Club",
    description:
      "A vibrant community of developers, designers, and tech enthusiasts passionate about innovation and cutting-edge technology. We organize workshops, hackathons, networking events, and technical talks to help our members grow professionally and personally.",
    members: 1247,
    upcomingEvents: 8,
    category: "Technology",
    location: "San Francisco, CA",
    founded: "2020",
    isVerified: true,
    website: "https://techinnovators.com",
    socialMedia: {
      twitter: "@techinnovators",
      linkedin: "tech-innovators-club",
    },
    organizers: [
      { name: "Sarah Johnson", role: "President", avatar: "S" },
      { name: "Mike Chen", role: "VP Technology", avatar: "M" },
      { name: "Emily Davis", role: "Event Coordinator", avatar: "E" },
    ],
  };

  const clubEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      date: "Dec 15, 2024",
      time: "9:00 AM",
      attendees: 124,
      maxAttendees: 200,
    },
    {
      id: 4,
      title: "React Workshop: Advanced Patterns",
      date: "Dec 22, 2024",
      time: "2:00 PM",
      attendees: 67,
      maxAttendees: 80,
    },
    {
      id: 5,
      title: "AI & Machine Learning Meetup",
      date: "Jan 8, 2025",
      time: "6:00 PM",
      attendees: 45,
      maxAttendees: 100,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/clubs"
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon />
        </Link>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
            {club.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-foreground">
                {club.name}
              </h1>
              {club.isVerified && <CheckIcon />}
            </div>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <span>{club.category}</span>
              <span>•</span>
              <span>{club.location}</span>
              <span>•</span>
              <span>Founded {club.founded}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Club Cover */}
          <div className="h-48 bg-gradient-to-br from-secondary to-primary rounded-xl"></div>

          {/* About */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              About This Club
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {club.description}
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Upcoming Events ({clubEvents.length})
              </h2>
              <Link
                to="/events"
                className="text-secondary hover:text-secondary/80 text-sm"
              >
                View all events →
              </Link>
            </div>
            <div className="space-y-4">
              {clubEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <Link
                      to={`/events/${event.id}`}
                      className="font-medium text-foreground hover:text-secondary"
                    >
                      {event.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {event.attendees}/{event.maxAttendees} attending
                    </p>
                    <Link
                      to={`/events/${event.id}`}
                      className="text-secondary hover:text-secondary/80 text-sm"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organizers */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Club Organizers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {club.organizers.map((organizer, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white font-bold">
                    {organizer.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {organizer.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {organizer.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Club Stats */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Club Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Members</span>
                <span className="font-semibold text-foreground">
                  {club.members.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Upcoming Events</span>
                <span className="font-semibold text-foreground">
                  {club.upcomingEvents}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Founded</span>
                <span className="font-semibold text-foreground">
                  {club.founded}
                </span>
              </div>
            </div>

            <button className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Join Club
            </button>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Connect
            </h3>
            <div className="space-y-3">
              <a
                href={club.website}
                className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLinkIcon />
                <span>Website</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="w-5 h-5">🐦</span>
                <span>{club.socialMedia.twitter}</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="w-5 h-5">💼</span>
                <span>{club.socialMedia.linkedin}</span>
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
    </div>
  );
}

// Profile Page (simplified for space)
function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Profile</h1>
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <p className="text-muted-foreground">
          Profile page with tabs - coming soon
        </p>
      </div>
    </div>
  );
}

// Simple placeholder pages
function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <p className="text-muted-foreground">
          Applications management page - coming soon
        </p>
      </div>
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
