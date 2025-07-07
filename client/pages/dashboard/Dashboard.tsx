import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Calendar,
  Users,
  TrendingUp,
  Bell,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Manage your events, applications, and club activities
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-2">
              <Button variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-brand-100 rounded-lg">
                <Calendar className="w-6 h-6 text-brand-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Events Created
                </p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Attendees
                </p>
                <p className="text-2xl font-bold text-gray-900">324</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Applications
                </p>
                <p className="text-2xl font-bold text-gray-900">56</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Club Members
                </p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Events */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">My Events</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Tech Innovation Summit
                  </h3>
                  <p className="text-sm text-gray-600">December 15, 2024</p>
                  <Badge variant="outline" className="mt-1">
                    124 attending
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Annual Coding Bootcamp
                  </h3>
                  <p className="text-sm text-gray-600">December 28, 2024</p>
                  <Badge variant="outline" className="mt-1">
                    156 attending
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Applications */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Pending Applications
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">John Smith</h3>
                  <p className="text-sm text-gray-600">
                    Applied to Tech Innovation Summit
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Reject
                  </Button>
                  <Button size="sm">Accept</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Sarah Johnson</h3>
                  <p className="text-sm text-gray-600">
                    Applied to Coding Bootcamp
                  </p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Reject
                  </Button>
                  <Button size="sm">Accept</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center"
            >
              <Plus className="w-6 h-6 mb-1" />
              Create New Event
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center"
            >
              <Users className="w-6 h-6 mb-1" />
              Manage Members
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center"
            >
              <Bell className="w-6 h-6 mb-1" />
              Send Announcement
            </Button>
          </div>
        </div>

        <div className="mt-8 bg-brand-50 border border-brand-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-brand-900 mb-2">
            Dashboard Placeholder
          </h3>
          <p className="text-brand-700">
            This is a placeholder dashboard page. The actual implementation
            would include:
          </p>
          <ul className="mt-2 text-brand-700 list-disc list-inside space-y-1">
            <li>Real-time analytics and metrics</li>
            <li>Event management tools</li>
            <li>Application review system</li>
            <li>Member management features</li>
            <li>Notification center</li>
            <li>Calendar integration</li>
            <li>Revenue tracking (for paid events)</li>
            <li>Communication tools</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
