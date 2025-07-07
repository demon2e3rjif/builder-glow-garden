import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Calendar,
      title: "Discover Events",
      description:
        "Find exciting events happening in your community and beyond.",
    },
    {
      icon: Users,
      title: "Join Clubs",
      description:
        "Connect with like-minded people and join clubs that match your interests.",
    },
    {
      icon: MapPin,
      title: "Easy Management",
      description:
        "Clubs can effortlessly create and manage events with our intuitive tools.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "500+", label: "Events Created" },
    { value: "200+", label: "Active Clubs" },
    { value: "50K+", label: "Connections Made" },
  ];

  const featuredEvents = [
    {
      id: 1,
      title: "Tech Meetup 2024",
      club: "Tech Innovators Club",
      date: "Dec 15, 2024",
      time: "6:00 PM",
      location: "Downtown Convention Center",
      attendees: 124,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Photography Workshop",
      club: "Creative Lens Society",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      location: "Studio Art Space",
      attendees: 45,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Startup Pitch Night",
      club: "Entrepreneurs Network",
      date: "Dec 20, 2024",
      time: "7:00 PM",
      location: "Innovation Hub",
      attendees: 89,
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Connect Through
                <span className="block text-brand-200">
                  Events & Communities
                </span>
              </h1>
              <p className="text-xl text-brand-100 mb-8 leading-relaxed">
                Join clubs, discover events, and build meaningful connections in
                your community. Whether you're organizing or attending, EventHub
                makes it seamless.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/register">
                  <Button
                    size="lg"
                    className="bg-white text-purple-700 hover:bg-purple-50 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/events">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Browse Events
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Tech Meetup Tonight</h3>
                      <p className="text-purple-200 text-sm">
                        124 people attending
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-purple-200">
                    <Clock className="w-4 h-4" />
                    <span>6:00 PM - 9:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-purple-200">
                    <MapPin className="w-4 h-4" />
                    <span>Downtown Convention Center</span>
                  </div>
                </div>
              </div>
              {/* Floating elements for visual appeal */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-300/30 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100"
              >
                <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to connect
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform brings together event organizers and attendees,
              making it easy to discover, create, and manage community events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mb-6 group-hover:from-purple-200 group-hover:to-purple-300 transition-all">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Featured Events
              </h2>
              <p className="text-xl text-gray-600">
                Don't miss these exciting upcoming events
              </p>
            </div>
            <Link to="/events">
              <Button variant="outline">
                View All Events
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-48 bg-gradient-to-br from-purple-400 via-purple-500 to-blue-600"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-brand-600 mb-2">
                    <Users className="w-4 h-4" />
                    <span>{event.club}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {event.attendees} attending
                    </span>
                    <Button size="sm">Learn More</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to start connecting?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of people already using EventHub to discover events
            and build communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button
                size="lg"
                className="bg-white text-purple-700 hover:bg-purple-50 shadow-lg"
              >
                Create Account
              </Button>
            </Link>
            <Link to="/clubs">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-700 shadow-lg"
              >
                Browse Clubs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
