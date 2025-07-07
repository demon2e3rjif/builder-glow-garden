import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { useState } from "react";

// Sidebar Component
function Sidebar() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulated auth state
  const [userType, setUserType] = useState<"user" | "club">("user");

  const isActive = (path: string) => location.pathname.startsWith(path);

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
      show: true,
    },
    {
      name: "Events",
      path: "/events",
      icon: "📅",
      show: true,
    },
    {
      name: "Clubs",
      path: "/clubs",
      icon: "👥",
      show: true,
    },
    {
      name: "My Applications",
      path: "/applications",
      icon: "📝",
      show: userType === "user",
    },
    {
      name: "Manage Events",
      path: "/manage-events",
      icon: "⚙️",
      show: userType === "club",
    },
    {
      name: "Members",
      path: "/members",
      icon: "👤",
      show: userType === "club",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👨‍💼",
      show: true,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "⚙️",
      show: true,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">EventHub</h1>
            <p className="text-xs text-muted-foreground">Event Management</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {navigationItems
            .filter((item) => item.show)
            .map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">
            J
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              John Doe
            </p>
            <p className="text-xs text-muted-foreground">
              {userType === "club" ? "Club Manager" : "Member"}
            </p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-muted-foreground hover:text-foreground"
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
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <main className="p-6">{children}</main>
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
      icon: "📅",
      color: "text-blue-600",
    },
    { label: "Clubs Joined", value: "3", icon: "👥", color: "text-green-600" },
    { label: "Applications", value: "5", icon: "📝", color: "text-yellow-600" },
    { label: "Connections", value: "48", icon: "🤝", color: "text-purple-600" },
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
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border border-border shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{stat.icon}</div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
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
              className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">🔍</span>
                <span className="font-medium">Browse Events</span>
              </div>
            </Link>
            <Link
              to="/clubs"
              className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">👥</span>
                <span className="font-medium">Find Clubs</span>
              </div>
            </Link>
            <Link
              to="/applications"
              className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">📝</span>
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
        "A full-day summit featuring the latest in tech innovation...",
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
        "Learn advanced photography techniques from professionals...",
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
      description: "Watch emerging startups pitch to investors...",
      price: 15,
      status: "Open",
    },
  ];

  const categories = ["Technology", "Arts", "Business", "Sports", "Education"];
  const locations = ["Downtown", "Brooklyn", "Austin", "Seattle", "Portland"];

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
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Create Event
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
            <input
              type="text"
              placeholder="Search events..."
              className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-secondary to-primary"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                    {event.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {event.attendees}/{event.maxAttendees} attending
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {event.title}
                </h3>

                <Link
                  to={`/clubs/${event.clubId}`}
                  className="text-sm text-secondary hover:text-secondary/80 mb-2 block"
                >
                  by {event.club}
                </Link>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
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
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
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
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
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
                    {event.location}
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
                <svg
                  className="w-5 h-5 text-muted-foreground"
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
                <div>
                  <p className="font-medium text-foreground">{event.date}</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-muted-foreground"
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
                <p className="text-foreground">{event.location}</p>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-muted-foreground"
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
                <p className="text-foreground">
                  {event.attendees} / {event.maxAttendees} attending
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-muted-foreground"
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

// Clubs Page
function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const clubs = [
    {
      id: 1,
      name: "Tech Innovators Club",
      description:
        "A community of developers, designers, and tech enthusiasts passionate about innovation and cutting-edge technology.",
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
        "Professional and amateur photographers sharing knowledge, techniques, and passion for visual storytelling.",
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
        "Connect with fellow entrepreneurs, share experiences, and build the next generation of innovative businesses.",
      members: 2156,
      upcomingEvents: 12,
      category: "Business",
      location: "Austin, TX",
      founded: "2018",
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
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Create Club
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Search Clubs
            </label>
            <input
              type="text"
              placeholder="Search clubs..."
              className="w-full px-3 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="bg-white rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0">
                {club.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {club.name}
                  </h3>
                  {club.isVerified && (
                    <span className="text-secondary" title="Verified Club">
                      ✓
                    </span>
                  )}
                </div>
                <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded mb-2">
                  {club.category}
                </span>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {club.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                  <div>
                    <span className="font-medium">{club.members}</span> members
                  </div>
                  <div>
                    <span className="font-medium">{club.upcomingEvents}</span>{" "}
                    events
                  </div>
                  <div className="col-span-2">
                    📍 {club.location} • Founded {club.founded}
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
            </div>
          </div>
        ))}
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
              {club.isVerified && (
                <span className="text-secondary text-xl" title="Verified Club">
                  ✓
                </span>
              )}
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
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 9c-5 0-9-4-9-9m9 9c5 0 9-4 9-9m-9 9v-9m0 9c-5 0-9-4-9-9"
                  />
                </svg>
                <span>Website</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
                <span>{club.socialMedia.twitter}</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
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

// Profile Page
function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2023",
    bio: "Passionate software developer and tech enthusiast. Love attending tech meetups and learning about new technologies.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    skills: ["React", "Node.js", "Python", "Machine Learning"],
    clubs: [
      { name: "Tech Innovators Club", role: "Member", joinDate: "Jan 2023" },
      { name: "Creative Lens Society", role: "Member", joinDate: "Mar 2023" },
    ],
    events: [
      {
        name: "Tech Innovation Summit",
        date: "Dec 15, 2024",
        status: "Confirmed",
      },
      { name: "Photography Workshop", date: "Dec 18, 2024", status: "Pending" },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                {userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                {userProfile.name}
              </h2>
              <p className="text-muted-foreground">{userProfile.email}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Member since {userProfile.joinDate}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground">{userProfile.location}</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Website</h3>
                <a
                  href={userProfile.website}
                  className="text-secondary hover:text-secondary/80"
                >
                  {userProfile.website}
                </a>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-muted text-muted-foreground px-2 py-1 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full mt-6 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="bg-white rounded-xl border border-border shadow-sm">
            <div className="border-b border-border">
              <nav className="flex">
                {[
                  { id: "overview", name: "Overview" },
                  { id: "clubs", name: "My Clubs" },
                  { id: "events", name: "My Events" },
                  { id: "settings", name: "Settings" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      About
                    </h3>
                    <p className="text-muted-foreground">{userProfile.bio}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">
                        Recent Activity
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span className="text-sm text-muted-foreground">
                            Applied to Tech Innovation Summit
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-secondary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">
                            Joined Creative Lens Society
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-3">
                        Statistics
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Events Attended
                          </span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Clubs Joined
                          </span>
                          <span className="font-medium">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Applications
                          </span>
                          <span className="font-medium">5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "clubs" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    My Clubs
                  </h3>
                  {userProfile.clubs.map((club, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center text-white font-bold">
                          {club.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {club.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {club.role} • Joined {club.joinDate}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/clubs/${index + 1}`}
                        className="text-secondary hover:text-secondary/80"
                      >
                        View Club →
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "events" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    My Events
                  </h3>
                  {userProfile.events.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {event.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {event.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.status === "Confirmed"
                              ? "bg-success/10 text-success"
                              : "bg-warning/10 text-warning"
                          }`}
                        >
                          {event.status}
                        </span>
                        <Link
                          to={`/events/${index + 1}`}
                          className="text-secondary hover:text-secondary/80"
                        >
                          View Event →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Account Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Email Notifications
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            defaultChecked
                          />
                          <span className="text-sm text-muted-foreground">
                            Event reminders
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            defaultChecked
                          />
                          <span className="text-sm text-muted-foreground">
                            Application updates
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-muted-foreground">
                            Club newsletters
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Privacy
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            defaultChecked
                          />
                          <span className="text-sm text-muted-foreground">
                            Make profile public
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-muted-foreground">
                            Show attendance history
                          </span>
                        </label>
                      </div>
                    </div>

                    <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                      Save Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
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
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
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

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Enter your password"
            />
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
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
  );
}
