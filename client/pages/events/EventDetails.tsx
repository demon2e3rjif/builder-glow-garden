import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Heart,
  Share2,
  ArrowLeft,
} from "lucide-react";

export default function EventDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
          <div className="text-center">
            <Badge className="mb-4">Technology</Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Tech Innovation Summit 2024
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us for a day of cutting-edge tech talks, networking, and
              innovation. Perfect for developers, entrepreneurs, and tech
              enthusiasts.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-full h-64 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg mb-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span>December 15, 2024</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span>Downtown Convention Center</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-500" />
                <span>124 / 200 attending</span>
              </div>
              <Badge variant="outline">Free Event</Badge>
            </div>

            <div className="flex justify-center space-x-4">
              <Button size="lg">Apply to Attend</Button>
              <Button variant="outline" size="lg">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2>About this Event</h2>
            <p>
              This is a placeholder page for event details. The actual
              implementation would include:
            </p>
            <ul>
              <li>Full event description and agenda</li>
              <li>Speaker information and bios</li>
              <li>Application form with custom questions</li>
              <li>Attendee list and networking features</li>
              <li>Club information and other events</li>
              <li>Comments and discussion section</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
