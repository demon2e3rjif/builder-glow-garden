import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

// Header Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context
  const [userType, setUserType] = useState<"user" | "club" | null>("user"); // This would come from auth context
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-muted sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-2xl font-bold text-primary">EventHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`text-sm font-medium transition-colors ${
                isActive("/events")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Events
            </Link>
            <Link
              to="/clubs"
              className={`text-sm font-medium transition-colors ${
                isActive("/clubs")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Clubs
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              About
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events or clubs..."
                className="w-64 px-4 py-2 pl-10 pr-4 text-sm border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-muted-foreground"
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
            </div>
          </div>

          {/* Auth Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {userType === "club" && (
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Profile
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-primary"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-muted py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Home
              </Link>
              <Link
                to="/events"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Events
              </Link>
              <Link
                to="/clubs"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Clubs
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                About
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    Profile
                  </Link>
                  <button className="text-left text-sm font-medium text-muted-foreground hover:text-primary">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-medium text-primary"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-muted mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="text-xl font-bold text-primary">EventHub</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Connect clubs and communities through seamless event management.
              Discover events, join clubs, and build meaningful connections.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/events"
                  className="text-muted-foreground hover:text-primary"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  to="/clubs"
                  className="text-muted-foreground hover:text-primary"
                >
                  Find Clubs
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-muted-foreground hover:text-primary"
                >
                  Join Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 EventHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Home Page Component
function HomePage() {
  const featuredEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      club: "Tech Innovators Club",
      date: "Dec 15, 2024",
      time: "9:00 AM",
      location: "Convention Center",
      attendees: 124,
      image: null,
    },
    {
      id: 2,
      title: "Photography Workshop",
      club: "Creative Lens Society",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      location: "Art Studio",
      attendees: 45,
      image: null,
    },
    {
      id: 3,
      title: "Startup Pitch Night",
      club: "Entrepreneurs Network",
      date: "Dec 20, 2024",
      time: "7:00 PM",
      location: "Innovation Hub",
      attendees: 89,
      image: null,
    },
  ];

  const featuredClubs = [
    {
      id: 1,
      name: "Tech Innovators Club",
      description: "A community of developers and tech enthusiasts",
      members: 1247,
      events: 8,
    },
    {
      id: 2,
      name: "Creative Lens Society",
      description: "Photography and visual arts community",
      members: 892,
      events: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Connect Through Events & Communities
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join clubs, discover events, and build meaningful connections in
              your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                Get Started
              </Link>
              <Link
                to="/events"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-200"
              >
                Browse Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "500+", label: "Events Created" },
              { value: "200+", label: "Active Clubs" },
              { value: "50K+", label: "Connections Made" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-muted">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Events
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't miss these exciting upcoming events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-secondary to-primary"></div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-secondary mb-2">
                    <svg
                      className="w-4 h-4 mr-1"
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
                    {event.club}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {event.title}
                  </h3>
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
                      {event.date} at {event.time}
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
                    <span className="text-sm text-muted-foreground">
                      {event.attendees} attending
                    </span>
                    <Link
                      to={`/events/${event.id}`}
                      className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/events"
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Clubs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Clubs
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover communities that match your interests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {featuredClubs.map((club) => (
              <div
                key={club.id}
                className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    {club.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {club.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {club.description}
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                      <span>{club.members} members</span>
                      <span>{club.events} upcoming events</span>
                    </div>
                    <Link
                      to={`/clubs/${club.id}`}
                      className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
                    >
                      View Club
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/clubs"
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View All Clubs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Events Page Component
function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      club: "Tech Innovators Club",
      date: "Dec 15, 2024",
      time: "9:00 AM",
      location: "Convention Center",
      attendees: 124,
      maxAttendees: 200,
      category: "Technology",
      status: "upcoming" as const,
    },
    {
      id: 2,
      title: "Photography Workshop",
      club: "Creative Lens Society",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      location: "Art Studio",
      attendees: 45,
      maxAttendees: 50,
      category: "Arts",
      status: "upcoming" as const,
    },
    {
      id: 3,
      title: "Startup Pitch Night",
      club: "Entrepreneurs Network",
      date: "Dec 20, 2024",
      time: "7:00 PM",
      location: "Innovation Hub",
      attendees: 89,
      maxAttendees: 150,
      category: "Business",
      status: "upcoming" as const,
    },
  ];

  const categories = ["Technology", "Arts", "Business", "Sports", "Education"];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Discover Events
              </h1>
              <p className="mt-2 text-muted-foreground">
                Find amazing events happening in your community
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Link
                to="/events/create"
                className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Create Event
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg border border-border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Search Events
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title or club..."
                  className="w-full px-4 py-2 pl-10 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-muted-foreground"
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
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Category
              </label>
              <select
                className="w-full px-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
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

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Date Range
              </label>
              <select className="w-full px-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent">
                <option>Any Date</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Next Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {filteredEvents.length} Events Found
          </h2>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
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

                <div className="text-sm text-secondary mb-2">
                  by {event.club}
                </div>

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
                    {event.date} at {event.time}
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

                <div className="flex space-x-2">
                  <Link
                    to={`/events/${event.id}`}
                    className="flex-1 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-secondary/90 transition-colors"
                  >
                    View Details
                  </Link>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Clubs Page Component
function ClubsPage() {
  const clubs = [
    {
      id: 1,
      name: "Tech Innovators Club",
      description:
        "A community of developers, designers, and tech enthusiasts passionate about innovation.",
      members: 1247,
      events: 8,
      category: "Technology",
    },
    {
      id: 2,
      name: "Creative Lens Society",
      description:
        "Professional and amateur photographers sharing knowledge and passion for visual storytelling.",
      members: 892,
      events: 5,
      category: "Arts",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Find Your Community
              </h1>
              <p className="mt-2 text-muted-foreground">
                Discover clubs and organizations that match your interests
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Link
                to="/clubs/create"
                className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Create Club
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {club.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {club.name}
                    </h3>
                    <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                      {club.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {club.description}
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                    <span>{club.members} members</span>
                    <span>{club.events} upcoming events</span>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/clubs/${club.id}`}
                      className="flex-1 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-secondary/90 transition-colors"
                    >
                      View Club
                    </Link>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      Join
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

// Simple pages for remaining routes
function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-border">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Sign In</h2>
          <p className="text-muted-foreground">Welcome back to EventHub</p>
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

function RegisterPage() {
  const [userType, setUserType] = useState<"user" | "club" | null>(null);

  if (!userType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full border border-border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Join EventHub
            </h2>
            <p className="text-muted-foreground">
              Choose your account type to get started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setUserType("user")}
              className="p-6 border-2 border-muted rounded-lg hover:border-secondary transition-colors text-left"
            >
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Individual
              </h3>
              <p className="text-muted-foreground">
                Join as an individual to discover events and connect with clubs
              </p>
            </button>

            <button
              onClick={() => setUserType("club")}
              className="p-6 border-2 border-muted rounded-lg hover:border-secondary transition-colors text-left"
            >
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Club / Organization
              </h3>
              <p className="text-muted-foreground">
                Register your club to create events and manage your community
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-border">
        <div className="text-center mb-8">
          <button
            onClick={() => setUserType(null)}
            className="text-secondary hover:underline mb-4"
          >
            ← Change account type
          </button>
          <h2 className="text-2xl font-bold text-foreground">
            Create {userType === "user" ? "Personal" : "Club"} Account
          </h2>
        </div>

        <form className="space-y-6">
          {userType === "user" ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Doe"
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
                  className="w-full px-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Enter club name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Tell us about your club..."
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
              placeholder="Create a password"
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
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About EventHub
          </h1>
          <p className="text-xl text-muted-foreground">
            Connecting communities through seamless event management
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground mb-6">
              EventHub is designed to bridge the gap between event organizers
              and attendees, making it easier than ever to discover, create, and
              manage community events.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">
              What We Offer
            </h2>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>• Easy event discovery and application process</li>
              <li>• Comprehensive club and organization management</li>
              <li>• Streamlined application review system</li>
              <li>• Community building tools</li>
              <li>• Real-time notifications and updates</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Contact Us
            </h2>
            <p className="text-muted-foreground">
              Have questions or feedback? We'd love to hear from you.
              <br />
              Email: hello@eventhub.com
              <br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
