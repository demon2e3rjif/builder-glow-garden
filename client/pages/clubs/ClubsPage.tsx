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
import { ClubCard } from "../../components/ClubCard";
import {
  Search,
  Users,
  MapPin,
  SlidersHorizontal,
  Plus,
  Star,
} from "lucide-react";

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("members");

  // Mock data - replace with actual API calls
  const clubs = [
    {
      id: 1,
      name: "Tech Innovators Club",
      description:
        "A community of developers, designers, and tech enthusiasts passionate about innovation and cutting-edge technology. We organize workshops, hackathons, and networking events.",
      category: "Technology",
      location: "San Francisco, CA",
      members: 1247,
      upcomingEvents: 8,
      rating: 4.8,
      tags: ["Programming", "AI", "Startups", "Networking"],
      isVerified: true,
    },
    {
      id: 2,
      name: "Creative Lens Society",
      description:
        "Professional and amateur photographers sharing knowledge, techniques, and passion for visual storytelling. Regular photo walks and exhibitions.",
      category: "Art & Culture",
      location: "Brooklyn, NY",
      members: 892,
      upcomingEvents: 5,
      rating: 4.6,
      tags: ["Photography", "Art", "Workshops", "Exhibitions"],
      isVerified: true,
    },
    {
      id: 3,
      name: "Entrepreneurs Network",
      description:
        "Connect with fellow entrepreneurs, share experiences, and build the next generation of innovative businesses. Monthly pitch nights and mentorship programs.",
      category: "Business",
      location: "Austin, TX",
      members: 2156,
      upcomingEvents: 12,
      rating: 4.9,
      tags: ["Startups", "Business", "Networking", "Mentorship"],
      isVerified: true,
    },
    {
      id: 4,
      name: "Mindful Living Community",
      description:
        "Promoting wellness, mindfulness, and healthy living through yoga, meditation, and wellness workshops. All levels welcome.",
      category: "Health & Wellness",
      location: "Portland, OR",
      members: 634,
      upcomingEvents: 6,
      rating: 4.7,
      tags: ["Yoga", "Meditation", "Wellness", "Mindfulness"],
      isVerified: false,
    },
    {
      id: 5,
      name: "Local Artists Guild",
      description:
        "Supporting local artists through exhibitions, collaborative projects, and community art initiatives. Painters, sculptors, and digital artists welcome.",
      category: "Art & Culture",
      location: "Chicago, IL",
      members: 445,
      upcomingEvents: 4,
      rating: 4.5,
      tags: ["Art", "Painting", "Sculpture", "Community"],
      isVerified: false,
    },
    {
      id: 6,
      name: "Data Science Collective",
      description:
        "Data scientists, analysts, and machine learning enthusiasts exploring the latest trends in data science and AI. Weekly study groups and industry talks.",
      category: "Technology",
      location: "Seattle, WA",
      members: 987,
      upcomingEvents: 7,
      rating: 4.8,
      tags: ["Data Science", "Machine Learning", "Analytics", "AI"],
      isVerified: true,
    },
    {
      id: 7,
      name: "Green Earth Initiative",
      description:
        "Environmental activists and sustainability advocates working together to create a greener future. Community cleanups and awareness campaigns.",
      category: "Environment",
      location: "Denver, CO",
      members: 756,
      upcomingEvents: 9,
      rating: 4.6,
      tags: ["Environment", "Sustainability", "Climate", "Community"],
      isVerified: false,
    },
    {
      id: 8,
      name: "Culinary Adventures Club",
      description:
        "Food lovers exploring culinary traditions, cooking techniques, and restaurant discoveries. Monthly potlucks and cooking classes.",
      category: "Food & Drink",
      location: "Miami, FL",
      members: 523,
      upcomingEvents: 3,
      rating: 4.4,
      tags: ["Cooking", "Food", "Culinary", "Culture"],
      isVerified: false,
    },
  ];

  const categories = [
    "Technology",
    "Art & Culture",
    "Business",
    "Health & Wellness",
    "Environment",
    "Food & Drink",
    "Education",
    "Sports & Fitness",
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

  const filteredClubs = clubs
    .filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "all" ||
        club.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesLocation =
        selectedLocation === "all" ||
        club.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesCategory && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "members":
          return b.members - a.members;
        case "events":
          return b.upcomingEvents - a.upcomingEvents;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Find Your Community
              </h1>
              <p className="mt-2 text-gray-600">
                Discover clubs and organizations that match your interests
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Club</span>
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
                  placeholder="Search clubs..."
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

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort by
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="members">Most members</SelectItem>
                  <SelectItem value="events">Most events</SelectItem>
                  <SelectItem value="rating">Highest rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredClubs.length} Clubs Found
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

        {/* Clubs Grid */}
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No clubs found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms to find clubs.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedLocation("all");
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
