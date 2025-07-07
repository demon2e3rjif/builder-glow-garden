import { BrowserRouter, Routes, Route } from "react-router-dom";

// Simple components to test routing first
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              EventHub
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Connect Through Events & Communities
          </p>
          <p className="text-lg text-purple-200 mb-12 max-w-2xl mx-auto">
            Join clubs, discover events, and build meaningful connections in
            your community. Whether you're organizing or attending, EventHub
            makes it seamless.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transform hover:scale-105 transition-all duration-200 shadow-xl">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-700 transform hover:scale-105 transition-all duration-200">
              Browse Events
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { value: "10K+", label: "Active Users" },
            { value: "500+", label: "Events Created" },
            { value: "200+", label: "Active Clubs" },
            { value: "50K+", label: "Connections Made" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
            >
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-purple-200 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Discover Events",
              description:
                "Find exciting events happening in your community and beyond.",
              icon: "📅",
            },
            {
              title: "Join Clubs",
              description:
                "Connect with like-minded people and join clubs that match your interests.",
              icon: "👥",
            },
            {
              title: "Easy Management",
              description:
                "Clubs can effortlessly create and manage events with our intuitive tools.",
              icon: "🎯",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-purple-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <p className="text-gray-600 text-center">Login page coming soon...</p>
      </div>
    </div>
  );
}

function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Discover Events</h1>
        <p className="text-gray-600">Events listing coming soon...</p>
      </div>
    </div>
  );
}

function ClubsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Find Clubs</h1>
        <p className="text-gray-600">Clubs listing coming soon...</p>
      </div>
    </div>
  );
}

// Simple navbar
function Navbar() {
  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">EventHub</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/events" className="text-gray-600 hover:text-purple-600">
              Events
            </a>
            <a href="/clubs" className="text-gray-600 hover:text-purple-600">
              Clubs
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a href="/login" className="text-gray-600 hover:text-gray-900">
              Sign in
            </a>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Get started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
