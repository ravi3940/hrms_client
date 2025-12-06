import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const OnboardingTasks = () => {
  const [newTask, setNewTask] = useState('');
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery('onboarding-tasks', async () => {
    const response = await axios.get('/api/onboarding/tasks');
    return response.data;
  });

  const addTaskMutation = useMutation(
    (taskTitle) => axios.post('/api/onboarding/tasks', { title: taskTitle }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('onboarding-tasks');
        setNewTask('');
      }
    }
  );

  const updateTaskMutation = useMutation(
    ({ taskId, updates }) => axios.patch(`/api/onboarding/tasks/${taskId}`, updates),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('onboarding-tasks');
      }
    }
  );

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTaskMutation.mutate(newTask.trim());
    }
  };

  const handleTaskToggle = (taskId, completed) => {
    updateTaskMutation.mutate({
      taskId,
      updates: { completed: !completed }
    });
  };

  const handleDeleteTask = (taskId) => {
    updateTaskMutation.mutate({
      taskId,
      updates: { status: 'DELETED' }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const pendingTasks = tasks?.filter(task => !task.completed) || [];
  const completedTasks = tasks?.filter(task => task.completed) || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Onboarding Tasks</h1>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new onboarding task..."
            className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={addTaskMutation.isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {addTaskMutation.isLoading ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>

      {/* Pending Tasks */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Pending Tasks ({pendingTasks.length})
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {pendingTasks.map((task) => (
            <div key={task._id} className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskToggle(task._id, task.completed)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{task.title}</span>
              </div>
              
              <div className="flex space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                  task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          
          {pendingTasks.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No pending tasks. Great job!
            </div>
          )}
        </div>
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Completed Tasks ({completedTasks.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {completedTasks.map((task) => (
              <div key={task._id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleTaskToggle(task._id, task.completed)}
                    className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-500 line-through">{task.title}</span>
                </div>
                <span className="text-sm text-gray-500">
                  Completed on {new Date(task.updatedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingTasks;