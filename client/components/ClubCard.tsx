import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Users, Calendar, MapPin, Star, Heart, Share2 } from "lucide-react";
import { cn } from "../lib/utils";

interface ClubCardProps {
  club: {
    id: number;
    name: string;
    description?: string;
    category: string;
    location?: string;
    members: number;
    upcomingEvents: number;
    rating?: number;
    image?: string;
    tags?: string[];
    isVerified?: boolean;
    joinedAt?: string;
  };
  className?: string;
  showActions?: boolean;
  isJoined?: boolean;
}

export function ClubCard({
  club,
  className,
  showActions = true,
  isJoined = false,
}: ClubCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group",
        className,
      )}
    >
      {/* Club Header Image */}
      <div className="relative h-40 bg-gradient-to-br from-purple-400 to-blue-600 overflow-hidden">
        {club.image ? (
          <img
            src={club.image}
            alt={club.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-blue-600 flex items-center justify-center">
            <Users className="w-12 h-12 text-white/80" />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white text-gray-900 text-xs">
            {club.category}
          </Badge>
        </div>

        {/* Verified Badge */}
        {club.isVerified && (
          <div className="absolute top-3 right-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-white fill-current" />
            </div>
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

      {/* Club Content */}
      <div className="p-6">
        {/* Club Title */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
            {club.name}
          </h3>
          {club.rating && (
            <div className="flex items-center space-x-1 text-sm text-yellow-600">
              <Star className="w-4 h-4 fill-current" />
              <span>{club.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Club Description */}
        {club.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {club.description}
          </p>
        )}

        {/* Club Stats */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{club.members.toLocaleString()} members</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{club.upcomingEvents} upcoming events</span>
          </div>
          {club.location && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{club.location}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {club.tags && club.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {club.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {club.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{club.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Joined Status */}
        {isJoined && club.joinedAt && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
              <Users className="w-4 h-4" />
              <span>Joined {club.joinedAt}</span>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between">
          <Link to={`/clubs/${club.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>

          {!isJoined ? (
            <Button size="sm">Join Club</Button>
          ) : (
            <Button variant="secondary" size="sm">
              View Events
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
