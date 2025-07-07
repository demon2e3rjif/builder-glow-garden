import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Users,
  Calendar,
  MapPin,
  Star,
  ArrowLeft,
  Heart,
  Share2,
} from "lucide-react";

export default function ClubDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clubs
          </Button>
          <div className="text-center">
            <div className="w-full h-48 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg mb-6"></div>
            <Badge className="mb-4">Technology</Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Tech Innovators Club
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              A community of developers, designers, and tech enthusiasts
              passionate about innovation and cutting-edge technology.
            </p>
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-500" />
                <span>1,247 members</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span>8 upcoming events</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span>4.8 rating</span>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Button size="lg">Join Club</Button>
              <Button variant="outline" size="lg">
                <Heart className="w-4 h-4 mr-2" />
                Follow
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="prose max-w-none">
            <h2>About This Club</h2>
            <p>
              This is a placeholder page for club details. The actual
              implementation would include:
            </p>
            <ul>
              <li>Full club description and mission</li>
              <li>Leadership team and organizers</li>
              <li>Upcoming events list</li>
              <li>Member directory and networking</li>
              <li>Club rules and guidelines</li>
              <li>Photo gallery and past events</li>
              <li>Discussion forums or chat</li>
              <li>Membership application process</li>
            </ul>

            <h3>Recent Activity</h3>
            <p>
              Show recent events, member joins, announcements, and other club
              activity.
            </p>

            <h3>Upcoming Events</h3>
            <p>List of upcoming events organized by this club.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
