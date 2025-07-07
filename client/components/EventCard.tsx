import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar, Clock, MapPin, Users, Heart, Share2 } from "lucide-react";
import { cn } from "../lib/utils";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    description?: string;
    club: {
      id: number;
      name: string;
      avatar?: string;
    };
    date: string;
    time: string;
    location: string;
    attendees: number;
    maxAttendees?: number;
    image?: string;
    tags?: string[];
    price?: number;
    status?: "upcoming" | "ongoing" | "completed";
  };
  className?: string;
  showActions?: boolean;
}

export function EventCard({
  event,
  className,
  showActions = true,
}: EventCardProps) {
  const getStatusBadge = () => {
    switch (event.status) {
      case "ongoing":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Live
          </Badge>
        );
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  const isFullyBooked =
    event.maxAttendees && event.attendees >= event.maxAttendees;

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group",
        className,
      )}
    >
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-purple-400 to-blue-600 overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-blue-600 flex items-center justify-center">
            <Calendar className="w-12 h-12 text-white/80" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3">{getStatusBadge()}</div>

        {/* Price Badge */}
        {event.price !== undefined && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-white text-gray-900">
              {event.price === 0 ? "Free" : `$${event.price}`}
            </Badge>
          </div>
        )}

        {/* Quick Actions */}
        {showActions && (
          <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Club Info */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
            <Users className="w-3 h-3 text-purple-600" />
          </div>
          <Link
            to={`/clubs/${event.club.id}`}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            {event.club.name}
          </Link>
        </div>

        {/* Event Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Event Description */}
        {event.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{event.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>
              {event.attendees}
              {event.maxAttendees ? ` / ${event.maxAttendees}` : ""} attending
            </span>
          </div>

          <Link to={`/events/${event.id}`}>
            <Button
              size="sm"
              disabled={isFullyBooked}
              className={cn(isFullyBooked && "opacity-50 cursor-not-allowed")}
            >
              {isFullyBooked ? "Full" : "View Details"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
