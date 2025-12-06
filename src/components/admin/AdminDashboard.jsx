import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery('admin-stats', async () => {
    const response = await axios.get('/api/admin/stats');
    return response.data;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
          <p className="text-3xl font-bold text-gray-800">{stats?.totalUsers || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-600">Active Jobs</h3>
          <p className="text-3xl font-bold text-gray-800">{stats?.activeJobs || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold text-gray-600">Pending Applications</h3>
          <p className="text-3xl font-bold text-gray-800">{stats?.pendingApplications || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-600">Onboarding</h3>
          <p className="text-3xl font-bold text-gray-800">{stats?.onboardingCount || 0}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/users"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-blue-600">Manage Users</h3>
            <p className="text-sm text-gray-600">View and manage system users</p>
          </Link>
          
          <Link
            to="/admin/applications"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-green-600">View Applications</h3>
            <p className="text-sm text-gray-600">Review job applications</p>
          </Link>
          
          <Link
            to="/admin/onboarding"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-purple-600">Onboarding</h3>
            <p className="text-sm text-gray-600">Manage onboarding processes</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {stats?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.timestamp}</span>
            </div>
          )) || (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;