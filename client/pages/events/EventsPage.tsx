import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { EventCard } from "../../components/EventCard";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  SlidersHorizontal,
  Plus,
} from "lucide-react";

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("all");

  // Mock data - replace with actual API calls
  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      description:
        "Join us for a day of cutting-edge tech talks, networking, and innovation. Perfect for developers, entrepreneurs, and tech enthusiasts.",
      club: { id: 1, name: "Tech Innovators Club" },
      date: "December 15, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Downtown Convention Center, San Francisco",
      attendees: 124,
      maxAttendees: 200,
      tags: ["Technology", "Networking", "Innovation"],
      price: 0,
      status: "upcoming" as const,
    },
    {
      id: 2,
      title: "Photography Masterclass",
      description:
        "Learn advanced photography techniques from professional photographers. Hands-on workshop with real-world shooting scenarios.",
      club: { id: 2, name: "Creative Lens Society" },
      date: "December 18, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Studio Art Space, Brooklyn",
      attendees: 45,
      maxAttendees: 50,
      tags: ["Photography", "Workshop", "Art"],
      price: 75,
      status: "upcoming" as const,
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      description:
        "Watch emerging startups pitch their ideas to a panel of investors. Network with entrepreneurs and investors after the event.",
      club: { id: 3, name: "Entrepreneurs Network" },
      date: "December 20, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "Innovation Hub, Austin",
      attendees: 89,
      maxAttendees: 150,
      tags: ["Startup", "Pitching", "Investment"],
      price: 25,
      status: "upcoming" as const,
    },
    {
      id: 4,
      title: "Yoga & Wellness Retreat",
      description:
        "A peaceful morning of yoga, meditation, and wellness workshops. Perfect for beginners and experienced practitioners alike.",
      club: { id: 4, name: "Mindful Living Community" },
      date: "December 22, 2024",
      time: "8:00 AM - 12:00 PM",
      location: "Riverside Park, Portland",
      attendees: 67,
      maxAttendees: 80,
      tags: ["Wellness", "Yoga", "Meditation"],
      price: 0,
      status: "upcoming" as const,
    },
    {
      id: 5,
      title: "Annual Coding Bootcamp",
      description:
        "Intensive 3-day coding workshop covering modern web development, mobile apps, and best practices.",
      club: { id: 1, name: "Tech Innovators Club" },
      date: "December 28, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Tech Campus, Seattle",
      attendees: 156,
      maxAttendees: 200,
      tags: ["Coding", "Web Development", "Mobile"],
      price: 150,
      status: "upcoming" as const,
    },
    {
      id: 6,
      title: "Community Art Exhibition",
      description:
        "Showcase of local artists featuring paintings, sculptures, and digital art. Opening night with artist meet and greets.",
      club: { id: 5, name: "Local Artists Guild" },
      date: "January 5, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "City Art Gallery, Chicago",
      attendees: 203,
      maxAttendees: 300,
      tags: ["Art", "Exhibition", "Community"],
      price: 0,
      status: "upcoming" as const,
    },
  ];

  const categories = [
    "Technology",
    "Art & Culture",
    "Business",
    "Health & Wellness",
    "Education",
    "Sports & Fitness",
    "Music",
    "Food & Drink",
  ];

  const locations = [
    "San Francisco",
    "New York",
    "Los Angeles",
    "Chicago",
    "Austin",
    "Seattle",
    "Boston",
    "Miami",
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      event.tags?.some((tag) =>
        tag.toLowerCase().includes(selectedCategory.toLowerCase()),
      );

    const matchesLocation =
      selectedLocation === "all" ||
      event.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Discover Events
              </h1>
              <p className="mt-2 text-gray-600">
                Find amazing events happening in your community
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Event</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search events..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location.toLowerCase()}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Any date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any date</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="this-week">This week</SelectItem>
                  <SelectItem value="this-month">This month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredEvents.length} Events Found
            </h2>
            {(searchTerm ||
              selectedCategory !== "all" ||
              selectedLocation !== "all") && (
              <div className="flex flex-wrap gap-2 mt-2">
                {searchTerm && (
                  <Badge
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <span>Search: {searchTerm}</span>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <span>Category: {selectedCategory}</span>
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedLocation !== "all" && (
                  <Badge
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <span>Location: {selectedLocation}</span>
                    <button
                      onClick={() => setSelectedLocation("all")}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms to find events.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedLocation("all");
                setSelectedDate("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
