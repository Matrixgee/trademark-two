// components/admin/PlanManagement.tsx

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  minInvestment: number;
  maxInvestment: number;
  returnRate: number;
  duration: number;
  durationUnit: 'days' | 'months' | 'years';
  description: string;
  status: 'Active' | 'Inactive';
  createdDate: string;
}

const PlanManagement = () => {
  const [plans, setPlans] = useState<Plan[]>([
    { id: 1, name: 'Starter', minInvestment: 100, maxInvestment: 5000, returnRate: 5, duration: 30, durationUnit: 'days', description: 'Perfect for beginners', status: 'Active', createdDate: '2024-01-10' },
    { id: 2, name: 'Professional', minInvestment: 5000, maxInvestment: 50000, returnRate: 8, duration: 90, durationUnit: 'days', description: 'For serious investors', status: 'Active', createdDate: '2024-01-05' },
    { id: 3, name: 'Elite', minInvestment: 50000, maxInvestment: 500000, returnRate: 12, duration: 6, durationUnit: 'months', description: 'Premium investment plan', status: 'Active', createdDate: '2023-12-25' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Plan>>({
    name: '',
    minInvestment: 0,
    maxInvestment: 0,
    returnRate: 0,
    duration: 0,
    durationUnit: 'days',
    description: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleOpenModal = (plan?: Plan) => {
    if (plan) {
      setFormData(plan);
      setEditingId(plan.id);
    } else {
      setFormData({
        name: '',
        minInvestment: 0,
        maxInvestment: 0,
        returnRate: 0,
        duration: 0,
        durationUnit: 'days',
        description: '',
      });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'status' ? value : (name.includes('Investment') || name.includes('Rate') || name === 'duration') ? Number(value) : value
    }));
  };

  const handleSavePlan = () => {
    if (editingId) {
      setPlans(plans.map(p => p.id === editingId ? { ...p, ...formData } : p));
    } else {
      const newPlan: Plan = {
        id: Math.max(...plans.map(p => p.id), 0) + 1,
        ...formData as Omit<Plan, 'id'>,
        status: 'Active',
        createdDate: new Date().toISOString().split('T')[0],
      };
      setPlans([...plans, newPlan]);
    }
    handleCloseModal();
  };

  const handleDeletePlan = (id: number) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setPlans(plans.map(p => p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Plans Management</h1>
          <p className="text-gray-600">Create and manage investment plans</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
        >
          <Plus size={20} /> Create New Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                plan.status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {plan.status}
              </span>
            </div>

            <div className="space-y-3 mb-6 py-4 border-t border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Min Investment:</span>
                <span className="font-semibold text-gray-900">${plan.minInvestment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Investment:</span>
                <span className="font-semibold text-gray-900">${plan.maxInvestment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Return Rate:</span>
                <span className="font-semibold text-green-600">{plan.returnRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold text-gray-900">{plan.duration} {plan.durationUnit}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleOpenModal(plan)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition border border-blue-200"
              >
                <Edit2 size={16} /> Edit
              </button>
              <button
                onClick={() => handleDeletePlan(plan.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition border border-red-200"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Plans Table View */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">All Plans</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Plan Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Investment Range</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Return Rate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{plan.name}</td>
                  <td className="px-6 py-4 text-gray-600">${plan.minInvestment.toLocaleString()} - ${plan.maxInvestment.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-green-600">{plan.returnRate}%</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{plan.duration} {plan.durationUnit}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(plan.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
                        plan.status === 'Active'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {plan.status}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenModal(plan)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition"
                      >
                        <Edit2 size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Plan Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingId ? 'Edit Plan' : 'Create New Plan'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., Starter, Professional, Elite"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Investment ($)</label>
                  <input
                    type="number"
                    name="minInvestment"
                    value={formData.minInvestment || 0}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Investment ($)</label>
                  <input
                    type="number"
                    name="maxInvestment"
                    value={formData.maxInvestment || 0}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Return Rate (%)</label>
                  <input
                    type="number"
                    name="returnRate"
                    value={formData.returnRate || 0}
                    onChange={handleInputChange}
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration || 0}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <select
                      name="durationUnit"
                      value={formData.durationUnit || 'days'}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  placeholder="Brief description of the plan"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSavePlan}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
              >
                {editingId ? 'Update Plan' : 'Create Plan'}
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanManagement;